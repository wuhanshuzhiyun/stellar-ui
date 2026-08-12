#!/usr/bin/env node

/**
 * ai-verify-hook.js  ——  第二道代码审查（AI / LLM 深度审查）
 *
 * 作为 stellar-ui 的 pre-commit 第二道关卡：先由 compat-check.js 做本地规则校验，
 * 本脚本再把「git 暂存的 diff」发送给 verify-server 的 /api/verify/review，
 * 由其实行「规则引擎 + 可选 LLM 深度审查」。当 verify-server 在 .env 中配置了
 * VERIFY_LLM_BASE_URL / VERIFY_LLM_API_KEY 时，LLM 深度审查才会真正生效。
 *
 * 依赖：verify-server 已启动（由 stellar-server 的 main.ts fork 拉起，默认端口 3002）。
 *       零三方依赖，使用 Node 内置 http/https 发送请求。
 *
 * 环境变量（均可选，带默认值）：
 *   VERIFY_SERVER_URL         默认 http://localhost:3002
 *   VERIFY_API_TOKEN          若 verify-server 设置了 VERIFY_API_TOKEN，须填一致
 *   AI_VERIFY_BLOCK           默认 1 —— AI 发现 error 级问题时阻断提交（0 = 仅警告）
 *   AI_VERIFY_REQUIRE_SERVER  默认 0 —— 服务器不可达时仅警告放行（1 = 强制阻断）
 *   AI_VERIFY_TIMEOUT         默认 90000 (ms)
 *   AI_VERIFY_MAX_DIFF        默认 200000 (字符) —— 超过则截断，避免超出模型上下文
 */

'use strict';

const { execSync } = require('child_process');
const http = require('http');
const https = require('https');
const url = require('url');

const SERVER_URL = process.env.VERIFY_SERVER_URL || 'http://localhost:3002';
const API_TOKEN = process.env.VERIFY_API_TOKEN || '';
const BLOCK_ON_ERROR = (process.env.AI_VERIFY_BLOCK || '1') !== '0';
const REQUIRE_SERVER = (process.env.AI_VERIFY_REQUIRE_SERVER || '0') === '1';
const TIMEOUT = parseInt(process.env.AI_VERIFY_TIMEOUT || '90000', 10);
const MAX_DIFF = parseInt(process.env.AI_VERIFY_MAX_DIFF || '200000', 10);

const COLORS = !!process.stdout.isTTY;
const c = {
  reset: COLORS ? '\x1b[0m' : '',
  red: COLORS ? '\x1b[31m' : '',
  yellow: COLORS ? '\x1b[33m' : '',
  cyan: COLORS ? '\x1b[36m' : '',
  gray: COLORS ? '\x1b[90m' : '',
  bold: COLORS ? '\x1b[1m' : '',
};

function log(msg) {
  console.log(c.bold + '[ai-verify] ' + c.reset + msg);
}

function runGit(args) {
  try {
    return execSync('git ' + args, { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 }).trim();
  } catch (e) {
    return null;
  }
}

function getStagedDiff() {
  return runGit('diff --cached');
}

function hasReviewableFiles(diff) {
  // 只看是否包含代码类文件的改动（与 verify-server 的 isReviewable 对齐）
  return /\+\+\+ b\/.+\.(vue|js|jsx|mjs|cjs|ts|tsx|css|scss|less)(\s|$)/.test(diff);
}

function getBranch() {
  return runGit('rev-parse --abbrev-ref HEAD') || '';
}

function getCommit() {
  return runGit('rev-parse HEAD') || '';
}

function postReview(diff) {
  return new Promise((resolve, reject) => {
    const parsed = url.parse(SERVER_URL);
    const lib = parsed.protocol === 'https:' ? https : http;

    const payload = {
      diff,
      platforms: ['MP-WEIXIN', 'H5', 'APP-PLUS', 'APP'],
      context: {
        repo: 'stellar-ui',
        branch: getBranch(),
        commit: getCommit(),
      },
    };
    const body = JSON.stringify(payload);

    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    };
    if (API_TOKEN) headers['x-verify-token'] = API_TOKEN;

    const req = lib.request(
      {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port,
        path: '/api/verify/review',
        method: 'POST',
        headers,
        timeout: TIMEOUT,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve({ status: res.statusCode, json });
          } catch (e) {
            reject(new Error('响应解析失败: ' + e.message + ' | raw=' + data.slice(0, 200)));
          }
        });
      }
    );

    req.on('timeout', () => req.destroy(new Error('请求超时 (' + TIMEOUT + 'ms)')));
    req.on('error', (e) => reject(e));
    req.write(body);
    req.end();
  });
}

function sevLabel(severity) {
  if (severity === 'error') return c.red + '[ERROR]' + c.reset;
  if (severity === 'warning') return c.yellow + '[WARN] ' + c.reset;
  return c.cyan + '[INFO] ' + c.reset;
}

function printResult(result) {
  console.log('');
  console.log(c.bold + '========== AI 代码审查结果 ==========' + c.reset);
  if (result.llmEnabled) {
    console.log('AI 深度审查: ' + c.cyan + '已启用（LLM 生效）' + c.reset);
  } else {
    console.log(
      'AI 深度审查: ' +
        c.yellow +
        '未启用（verify-server 未配置 VERIFY_LLM_*，仅规则引擎生效）' +
        c.reset
    );
    console.log(
      c.gray + '  → 启用 AI 核查：在 stellar-server 的 .env 填 VERIFY_LLM_BASE_URL + VERIFY_LLM_API_KEY，并启动 stellar-server。' + c.reset
    );
  }
  if (result.summary) console.log(result.summary);

  const issues = result.issues || [];
  if (!issues.length) return;

  console.log('');
  console.log('问题清单（' + issues.length + '）：');
  for (const it of issues) {
    const loc = it.file ? (it.line ? it.file + ':' + it.line : it.file) : '(全局)';
    console.log('  ' + sevLabel(it.severity) + ' ' + c.bold + loc + c.reset);
    if (it.message) console.log('      ' + it.message);
    if (it.rule) console.log('      ' + c.gray + '规则: ' + it.rule + c.reset);
    if (it.suggestion) console.log('      ' + c.gray + '建议: ' + it.suggestion + c.reset);
  }
  console.log('');
}

async function main() {
  const diff = getStagedDiff();
  if (!diff || !diff.trim()) {
    log('无暂存改动，跳过 AI 核查。');
    process.exit(0);
  }
  if (!hasReviewableFiles(diff)) {
    log('暂存改动不含可审查的代码文件，跳过 AI 核查。');
    process.exit(0);
  }
  if (diff.length > MAX_DIFF) {
    log('diff 过大 (' + diff.length + ' > ' + MAX_DIFF + ')，已截断前 ' + MAX_DIFF + ' 字符以避免超出模型上下文。');
    diff = diff.slice(0, MAX_DIFF);
  }

  log('连接 verify-server (' + SERVER_URL + ') 进行 AI 深度审查...');

  let resp;
  try {
    resp = await postReview(diff);
  } catch (e) {
    if (REQUIRE_SERVER) {
      log('verify-server 不可达，已设置 AI_VERIFY_REQUIRE_SERVER=1，提交被阻断：' + e.message);
      log('  如需继续：临时设为 0，或 git commit --no-verify 跳过本次 AI 核查。');
      process.exit(1);
    }
    log(c.yellow + '⚠ verify-server 不可达，跳过 AI 核查：' + e.message + c.reset);
    log(c.gray + '  提示：启动 stellar-server 使其 fork 出 verify-server；或在 .env 配置 VERIFY_LLM_* 后重启。' + c.reset);
    log(c.gray + '  如需强制要求服务器在线：设置 AI_VERIFY_REQUIRE_SERVER=1。' + c.reset);
    process.exit(0);
  }

  const { status, json } = resp;
  if (status !== 200 || !json || json.code !== 0) {
    if (REQUIRE_SERVER) {
      log('verify-server 返回错误 (HTTP ' + status + ')：' + (json && json.message ? json.message : '') + '，提交被阻断。');
      process.exit(1);
    }
    log(c.yellow + '⚠ verify-server 返回异常 (HTTP ' + status + ')：' + (json && json.message ? json.message : '') + '，跳过 AI 核查。' + c.reset);
    process.exit(0);
  }

  const result = json.data || {};
  printResult(result);

  const errorCount = (result.stats && result.stats.errorCount) || 0;
  if (errorCount > 0 && BLOCK_ON_ERROR) {
    log(c.red + '发现 ' + errorCount + ' 个 error 级 AI 审查问题，提交被阻断。' + c.reset);
    log('  修复后重新提交，或使用 git commit --no-verify 跳过本次 AI 核查（AI_VERIFY_BLOCK=0 可改为仅警告）。');
    process.exit(1);
  }

  log('AI 核查通过，未阻断提交。');
  process.exit(0);
}

main().catch((e) => {
  log(c.yellow + '⚠ AI 核查脚本异常，放行提交（不阻断）：' + (e && e.message ? e.message : e) + c.reset);
  process.exit(0);
});
