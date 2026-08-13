#!/usr/bin/env node

/**
 * ai-verify-push-hook.js  ——  pre-push 通知钩子（不阻塞 push）
 *
 * 聚合本次 push 的全部 commit，将合并后的 diff 发送给 verify-server 做代码质量评审，
 * 再由后端（配置 VERIFY_WECOM_* 后）把评审结果作为「一条」消息推送到企业微信群机器人。
 *
 * 与 pre-commit（ai-verify-hook.js，发现 error 会阻断提交）不同：本钩子**永远不阻断 push**。
 * 任何异常（服务器不可达、推送失败、stdin 读取失败等）仅告警并放行，确保开发者推送不被卡住。
 *
 * 依赖：verify-server 已启动；企微 webhook 在 stellar-server 的 .env 配置。
 * 安装：由 scripts/setup-compat-hook.js 在 npm install 时自动装入 .git/hooks/pre-push。
 * 跳过：git push --no-verify
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const http = require('http');
const https = require('https');

/**
 * 加载客户端持久化配置（与 ai-verify-hook.js 同优先级）。
 */
function loadClientConfig() {
  const dir = __dirname;
  const files = ['ai-verify.config.json', 'ai-verify.config.local.json'];
  let merged = {};
  for (const name of files) {
    const p = path.join(dir, name);
    try {
      const parsed = JSON.parse(fs.readFileSync(p, 'utf-8'));
      if (parsed && typeof parsed === 'object') merged = Object.assign(merged, parsed);
    } catch (e) {
      // 文件不存在或 JSON 非法：忽略
    }
  }
  return merged;
}

const CLIENT = loadClientConfig();
const SERVER_URL = process.env.VERIFY_SERVER_URL || CLIENT.serverUrl || 'http://localhost:3002/api/verify/review';
const API_TOKEN = process.env.VERIFY_API_TOKEN || (CLIENT.apiToken != null ? CLIENT.apiToken : '');
const TIMEOUT = parseInt(process.env.AI_VERIFY_TIMEOUT || String(CLIENT.timeout != null ? CLIENT.timeout : 90000), 10);
const MAX_DIFF = parseInt(process.env.AI_VERIFY_MAX_DIFF || String(CLIENT.maxDiff != null ? CLIENT.maxDiff : 200000), 10);

const COLORS = !!process.stdout.isTTY;
const c = {
  reset: COLORS ? '\x1b[0m' : '',
  cyan: COLORS ? '\x1b[36m' : '',
  yellow: COLORS ? '\x1b[33m' : '',
  gray: COLORS ? '\x1b[90m' : '',
  bold: COLORS ? '\x1b[1m' : '',
};
function log(msg) {
  console.log(c.bold + '[ai-verify-push] ' + c.reset + msg);
}

function runGit(args) {
  try {
    return execSync('git ' + args, { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 }).trim();
  } catch (e) {
    return null;
  }
}

// git 空树哈希，用于新建分支（remote-sha 全 0）时 diff 的基准
const EMPTY_TREE = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';

/**
 * pre-push 从 stdin 读取推送的 ref 列表，每行：
 *   <local-ref> <local-sha> <remote-ref> <remote-sha>
 */
function readStdinRefs() {
  let input = '';
  try {
    input = fs.readFileSync(0, 'utf-8');
  } catch (e) {
    return [];
  }
  return input
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/\s+/);
      return { localRef: parts[0], localSha: parts[1], remoteRef: parts[2], remoteSha: parts[3] };
    });
}

function isZero(sha) {
  return !sha || /^0+$/.test(sha);
}

function combinedDiff(localSha, remoteSha) {
  const base = isZero(remoteSha) ? EMPTY_TREE : remoteSha;
  return runGit(`diff ${base} ${localSha}`);
}

function commitList(localSha, remoteSha) {
  const range = isZero(remoteSha) ? localSha : `${remoteSha}..${localSha}`;
  const out = runGit(`log ${range} --oneline`);
  return out ? out.split('\n').filter(Boolean) : [];
}

function hasReviewableFiles(diff) {
  return /\+\+\+ b\/.+\.(vue|js|jsx|mjs|cjs|ts|tsx|css|scss|less)(\s|$)/.test(diff);
}

function getBranch() {
  return runGit('rev-parse --abbrev-ref HEAD') || '';
}

function postReview(diff, ctx) {
  return new Promise((resolve, reject) => {
    const lib = /^https:/i.test(SERVER_URL) ? https : http;
    const platformsRaw =
      process.env.AI_VERIFY_PLATFORMS ||
      (Array.isArray(CLIENT.platforms) ? CLIENT.platforms.join(',') : '') ||
      'MP-WEIXIN,H5,APP-PLUS,APP';
    const payload = {
      diff,
      notify: true,
      platforms: platformsRaw.split(',').map((s) => s.trim()).filter(Boolean),
      context: ctx,
    };
    const body = JSON.stringify(payload);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    };
    if (API_TOKEN) headers['x-verify-token'] = API_TOKEN;

    const req = lib.request(
      SERVER_URL,
      { method: 'POST', headers, timeout: TIMEOUT },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, json: JSON.parse(data) });
          } catch (e) {
            reject(new Error('响应解析失败: ' + (e instanceof Error ? e.message : e)));
          }
        });
      }
    );
    req.on('timeout', () => req.destroy(new Error('请求超时')));
    req.on('error', (e) => reject(e));
    req.write(body);
    req.end();
  });
}

async function main() {
  // 只处理分支推送，跳过 tag / 删除分支等噪声
  const refs = readStdinRefs().filter((r) => r.localRef && r.localRef.startsWith('refs/heads/'));
  if (!refs.length) {
    process.exit(0);
  }
  const branch = getBranch();
  let notified = 0;
  for (const r of refs) {
    let diff = combinedDiff(r.localSha, r.remoteSha);
    if (!diff || !diff.trim()) continue;
    if (!hasReviewableFiles(diff)) continue;
    if (diff.length > MAX_DIFF) diff = diff.slice(0, MAX_DIFF);

    const commits = commitList(r.localSha, r.remoteSha).map((line) => {
      const sp = line.indexOf(' ');
      return sp === -1 ? { hash: line, message: '' } : { hash: line.slice(0, sp), message: line.slice(sp + 1) };
    });
    const ctx = {
      repo: 'stellar-ui',
      branch,
      commitRange:
        (isZero(r.remoteSha) ? 'init' : r.remoteSha.slice(0, 8)) + '..' + r.localSha.slice(0, 8),
      commits,
      pusher: process.env.USER || process.env.USERNAME || '',
    };

    log(`分支 ${branch} 本次 push ${commits.length} 个提交，调用 verify-server 做评审并推送企微...`);
    try {
      await postReview(diff, ctx);
      notified++;
    } catch (e) {
      log(c.yellow + '⚠ 推送评审失败（不阻塞 push）：' + (e && e.message ? e.message : e) + c.reset);
    }
  }
  log(`本次 push 处理完成，已发起 ${notified} 条企微评审推送（详情见企微群）。`);
  process.exit(0);
}

main().catch((e) => {
  log(c.yellow + '⚠ pre-push 通知异常，放行 push（不阻断）：' + (e && e.message ? e.message : e) + c.reset);
  process.exit(0);
});
