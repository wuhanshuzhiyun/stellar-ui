/**
 * DemoAutoRegisterPlugin
 *
 * 在 webpack 编译前自动完成两件事：
 *  1. 扫描 mp/ 目录，将所有 {name}-demo/{name}-demo 路由全量生成到 pages.json 的锚点区域
 *  2. 读取各组件 uni_modules/stellar-ui/components/ste-{name}/config.json，
 *     将组件入口全量生成到 mp/index/index.vue 的 AUTO-REGISTER 区域
 *
 * 使用方式（vue.config.js）：
 *   const DemoAutoRegisterPlugin = require('./scripts/demo-auto-register');
 *   plugins: [new DemoAutoRegisterPlugin()]
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ─── 常量 ──────────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const MP_DIR = path.join(ROOT, 'mp');
const PAGES_JSON = path.join(ROOT, 'pages.json');
const INDEX_VUE = path.join(ROOT, 'mp/index/index.vue');
const COMPONENTS_DIR = path.join(ROOT, 'uni_modules/stellar-ui/components');

/** pages.json 中 demo 路由的固定 style 模板 */
const DEMO_PAGE_STYLE = {
    navigationStyle: 'custom',
    'mp-alipay': {
        transparentTitle: 'always',
        titlePenetrate: 'YES',
        allowsBounceVertical: 'NO',
        navigationBarTitleText: '',
    },
};

/** pages.json 中自动管理区域的锚点注释 */
const PAGES_ANCHOR_START = '/* AUTO-REGISTER-DEMO-START */';
const PAGES_ANCHOR_END = '/* AUTO-REGISTER-DEMO-END */';

/** index.vue 中自动管理区域的锚点注释 */
const INDEX_ANCHOR_START = '<!-- AUTO-REGISTER:START -->';
const INDEX_ANCHOR_END = '<!-- AUTO-REGISTER:END -->';

// ─── 工具函数 ──────────────────────────────────────────────────────────────────

/**
 * 统一换行符：将文件内容的 CRLF 统一为 LF 处理，写回时自动还原
 * @returns {{ normalized: string, restore: (s: string) => string }}
 */
function normalizeLineEndings(content) {
    const hasCRLF = content.includes('\r\n');
    return {
        normalized: hasCRLF ? content.replace(/\r\n/g, '\n') : content,
        restore: (s) => (hasCRLF ? s.replace(/\n/g, '\r\n') : s),
    };
}

/**
 * 简单解析 JSONC（带注释的 JSON），去掉单行/多行注释后 JSON.parse
 * 同时保留原始字符串，供后续按字符串替换而非完整重写（避免破坏条件编译注释）
 */
function readJsonc(filePath) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const stripped = raw
        .replace(/\/\*[\s\S]*?\*\//g, '')   // 多行注释
        .replace(/\/\/[^\n]*/g, '')           // 行注释
        .replace(/,(\s*[}\]])/g, '$1');       // 末尾多余逗号容错
    return { raw, parsed: JSON.parse(stripped) };
}

/**
 * 扫描 mp/ 目录，返回所有 demo 目录下的 .vue 页面路径列表
 * 格式：[{ demoName, dirName, pagePath, isMain }, ...]
 * 排除 index/
 */
function scanMpPages() {
    const results = [];
    const dirs = fs.readdirSync(MP_DIR, { withFileTypes: true });
    for (const dirent of dirs) {
        if (!dirent.isDirectory()) continue;
        const dirName = dirent.name;
        if (dirName === 'index') continue;
        if (!dirName.endsWith('-demo')) continue;
        const demoName = dirName.slice(0, -5); // 去掉 '-demo'
        const demoDir = path.join(MP_DIR, dirName);
        const files = fs.readdirSync(demoDir).filter((f) => f.endsWith('.vue'));
        for (const file of files) {
            const pageName = file.slice(0, -4); // 去掉 .vue
            const pagePath = `mp/${dirName}/${pageName}`;
            const isMain = pageName === dirName;
            results.push({ demoName, dirName, pagePath, isMain });
        }
    }
    return results;
}

/**
 * 读取组件 config.json，返回 { group, title, icon } 或 null
 */
function readComponentConfig(demoName) {
    const configPath = path.join(COMPONENTS_DIR, `ste-${demoName}`, 'config.json');
    if (!fs.existsSync(configPath)) return null;
    try {
        return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } catch {
        return null;
    }
}

// ─── pages.json 同步 ──────────────────────────────────────────────────────────

/**
 * 将扫描到的 demo 路由全量生成到 pages.json 的锚点区域
 * - 使用 AUTO-REGISTER-DEMO-START/END 标记管理区域
 * - 区域内内容每次全量重新生成（幂等）
 * - 区域外内容（非 demo 页面、条件编译等）完全保留
 */
function syncPagesJson(mpPages) {
    const raw = fs.readFileSync(PAGES_JSON, 'utf-8');
    const { normalized, restore } = normalizeLineEndings(raw);
    let content = normalized;

    // 只处理主 demo 页（isMain === true）
    const mainPages = mpPages.filter((p) => p.isMain);

    // 生成 demo 路由条目（缩进与 pages.json 保持一致）
    // 原文件缩进规则：
    // - 页面条目: 2 tabs
    // - path/style 键: 3 tabs
    // - style 内部: 4 tabs
    // - mp-alipay 内部: 5 tabs
    const demoEntries = mainPages.map((page) => {
        const styleLines = [
            '\t\t\t"style": {',
            '\t\t\t\t"navigationStyle": "custom",',
            '\t\t\t\t"mp-alipay": {',
            '\t\t\t\t\t"transparentTitle": "always",',
            '\t\t\t\t\t"titlePenetrate": "YES",',
            '\t\t\t\t\t"allowsBounceVertical": "NO",',
            '\t\t\t\t\t"navigationBarTitleText": ""',
            '\t\t\t\t}',
            '\t\t\t}'
        ];
        return `\t\t{\n\t\t\t"path": "${page.pagePath}",\n${styleLines.join('\n')}\n\t\t}`;
    });

    const autoBlock =
        demoEntries.length > 0
            ? `${PAGES_ANCHOR_START}\n${demoEntries.join(',\n')}\n\t${PAGES_ANCHOR_END}`
            : `${PAGES_ANCHOR_START}\n\t${PAGES_ANCHOR_END}`;

    const autoStart = content.indexOf(PAGES_ANCHOR_START);
    const autoEnd = content.indexOf(PAGES_ANCHOR_END);

    if (autoStart !== -1 && autoEnd !== -1) {
        // 已有锚点区域，直接替换
        const before = content.slice(0, autoStart);
        const after = content.slice(autoEnd + PAGES_ANCHOR_END.length);
        const newContent = before + autoBlock + after;
        if (newContent === content) {
            console.log('[DemoAutoRegisterPlugin] pages.json 无变化，跳过');
            return;
        }
        fs.writeFileSync(PAGES_JSON, restore(newContent), 'utf-8');
        console.log(`[DemoAutoRegisterPlugin] pages.json 已更新（${mainPages.length} 个 demo 路由）`);
    } else {
        // 首次运行：在 pages 数组末尾（\n\t]）前插入锚点
        const anchorIdx = content.lastIndexOf('\n\t]');
        if (anchorIdx === -1) {
            console.warn('[DemoAutoRegisterPlugin] 无法定位 pages.json 插入点，请手动在 pages 数组末尾添加锚点注释');
            return;
        }
        const insertStr = ',\n\t' + autoBlock;
        const newContent = content.slice(0, anchorIdx) + insertStr + content.slice(anchorIdx);
        fs.writeFileSync(PAGES_JSON, restore(newContent), 'utf-8');
        console.log(`[DemoAutoRegisterPlugin] pages.json 首次注入锚点（${mainPages.length} 个 demo 路由）`);
    }
}

// ─── mp/index/index.vue 同步 ──────────────────────────────────────────────────

/**
 * 根据扫描结果全量生成 mp/index/index.vue 中的导航入口
 *
 * 策略：
 * - 使用 <!-- AUTO-REGISTER:START --> / <!-- AUTO-REGISTER:END --> 标记管理区域
 * - 区域内内容每次全量重新生成（幂等）
 * - 仅对 isMain === true 且有 config.json 的页面生成入口
 * - 按 group 分组，自动生成分组标题
 * - 检测并清理锚点区域之外的重复内容
 */
function syncIndexVue(mpPages) {
    const raw = fs.readFileSync(INDEX_VUE, 'utf-8');
    const { normalized, restore } = normalizeLineEndings(raw);
    let content = normalized;

    // 检测锚点区域之外是否存在重复的组件内容
     const anchorStartPos = content.indexOf(INDEX_ANCHOR_START);
     const anchorEndPos = content.indexOf(INDEX_ANCHOR_END);
     
     if (anchorStartPos !== -1 && anchorEndPos !== -1 && anchorEndPos > anchorStartPos) {
         // 检查锚点之前的内容是否有重复组件
         const beforeContent = content.slice(0, anchorStartPos);
         const badgeCount = (beforeContent.match(/Badge 徽标/g) || []).length;
         const buttonCount = (beforeContent.match(/Button 按钮/g) || []).length;
         
         if (badgeCount > 0 || buttonCount > 0) {
             console.warn('[DemoAutoRegisterPlugin] 检测到锚点区域之外存在重复组件内容，将进行清理');
             
             // 找到模板部分的结束位置（scroll-box 结束）
             const scrollBoxEnd = beforeContent.lastIndexOf('\t\t</view>\n\t</view>');
             if (scrollBoxEnd !== -1) {
                 // 提取模板的头部部分（不包含重复的组件内容）
                 const templateHeader = beforeContent.slice(0, scrollBoxEnd);
                 const afterContent = content.slice(anchorEndPos + INDEX_ANCHOR_END.length);
                 
                 // 创建清理后的内容结构
                 const cleanContent = templateHeader + 
                                     '\n\t\t\t' + INDEX_ANCHOR_START + '\n' + 
                                     '\t\t\t' + INDEX_ANCHOR_END + '\n' + 
                                     '\t\t</view>\n\t</view>' + 
                                     afterContent;
                 
                 fs.writeFileSync(INDEX_VUE, restore(cleanContent), 'utf-8');
                 console.log('[DemoAutoRegisterPlugin] 已清理锚点区域之外的重复内容');
                 
                 // 重新读取清理后的文件
                 return syncIndexVue(mpPages);
             }
         }
     }
 
     // 过滤出主 demo 页，且有 config.json
     const mainPages = mpPages
        .filter((p) => p.isMain)
        .map((p) => ({ ...p, config: readComponentConfig(p.demoName) }))
        .filter((p) => p.config !== null);

    // 按分组聚合
    const groupMap = new Map();
    for (const page of mainPages) {
        const group = page.config.group || '其他';
        if (!groupMap.has(group)) groupMap.set(group, []);
        groupMap.get(group).push(page);
    }

    // 按分组名称排序（可选：让分组顺序稳定）
    const sortedGroups = Array.from(groupMap.keys()).sort();

    // 构建自动区域内容（全量生成）
    const lines = [];
    for (const group of sortedGroups) {
        const pages = groupMap.get(group);
        lines.push(`\t\t\t<!-- ***${group}*** -->`);
        lines.push(`\t\t\t<view class="group-title">${group}</view>`);

        for (const page of pages) {
            const { demoName, config } = page;
            let iconName = `${demoName}.png`;
            try {
                const iconUrl = config.icon || '';
                if (iconUrl) iconName = decodeURIComponent(iconUrl.split('/').pop());
            } catch { /* keep default */ }

            lines.push(`\t\t\t<view class="com-box" @click="nav('${demoName}')">`);
            lines.push(`\t\t\t\t<view class="com-title">`);
            lines.push(`\t\t\t\t\t<ste-image :src="joinSrc('组件图标/${iconName}')" :width="36" :height="36" />`);
            lines.push(`\t\t\t\t\t<text>${config.title}</text>`);
            lines.push(`\t\t\t\t</view>`);
            lines.push(`\t\t\t\t<view class="com-arrow">`);
            lines.push(`\t\t\t\t\t<ste-image :src="joinSrc('组件图标/r-arrow.png')" :width="32" :height="32" />`);
            lines.push(`\t\t\t\t</view>`);
            lines.push(`\t\t\t</view>`);
        }
    }

    const autoBlock =
        lines.length > 0
            ? `${INDEX_ANCHOR_START}\n${lines.join('\n')}\n\t\t\t${INDEX_ANCHOR_END}`
            : `${INDEX_ANCHOR_START}\n\t\t\t${INDEX_ANCHOR_END}`;

    const autoStart = content.indexOf(INDEX_ANCHOR_START);
    const autoEnd = content.indexOf(INDEX_ANCHOR_END);

    // 检查是否存在重复的锚点标记
    const autoStartCount = (content.match(new RegExp(INDEX_ANCHOR_START, 'g')) || []).length;
    const autoEndCount = (content.match(new RegExp(INDEX_ANCHOR_END, 'g')) || []).length;

    if (autoStartCount > 1 || autoEndCount > 1) {
        console.warn('[DemoAutoRegisterPlugin] 检测到重复的锚点标记，将清理并重新生成内容');
        // 清理重复的锚点区域，只保留第一个有效的锚点对
        const firstStart = content.indexOf(INDEX_ANCHOR_START);
        const firstEnd = content.indexOf(INDEX_ANCHOR_END);
        
        if (firstStart !== -1 && firstEnd !== -1 && firstEnd > firstStart) {
            // 保留第一个锚点对，删除其他内容
            const before = content.slice(0, firstStart);
            const after = content.slice(firstEnd + INDEX_ANCHOR_END.length);
            const cleanContent = before + INDEX_ANCHOR_START + '\n' + INDEX_ANCHOR_END + after;
            fs.writeFileSync(INDEX_VUE, restore(cleanContent), 'utf-8');
            console.log('[DemoAutoRegisterPlugin] 已清理重复的锚点标记');
            // 重新读取清理后的文件
            return syncIndexVue(mpPages);
        }
    }

    // 强制清理并重新生成内容，确保不会保留旧内容
    if (autoStart !== -1 && autoEnd !== -1 && autoEnd > autoStart) {
        // 已有锚点区域，直接替换
        const before = content.slice(0, autoStart);
        const after = content.slice(autoEnd + INDEX_ANCHOR_END.length);
        const newContent = before + autoBlock + after;
        if (newContent === content) {
            console.log('[DemoAutoRegisterPlugin] mp/index/index.vue 无变化，跳过');
            return;
        }
        fs.writeFileSync(INDEX_VUE, restore(newContent), 'utf-8');
        console.log(`[DemoAutoRegisterPlugin] mp/index/index.vue 已更新（${mainPages.length} 个组件入口）`);
    } else {
        // 首次运行：在 scroll-box 末尾（\t\t</view>\n\t</view> 前）插入锚点
        const scrollBoxEnd = content.lastIndexOf('\t\t</view>\n\t</view>');
        if (scrollBoxEnd === -1) {
            console.warn('[DemoAutoRegisterPlugin] 无法定位 index.vue 插入点，请手动在 scroll-box 末尾添加锚点注释');
            return;
        }
        const insertStr = '\n\t\t\t' + autoBlock + '\n';
        const newContent = content.slice(0, scrollBoxEnd) + insertStr + content.slice(scrollBoxEnd);
        fs.writeFileSync(INDEX_VUE, restore(newContent), 'utf-8');
        console.log(`[DemoAutoRegisterPlugin] mp/index/index.vue 首次注入锚点（${mainPages.length} 个组件入口）`);
    }
}

// ─── Webpack Plugin 入口 ──────────────────────────────────────────────────────

class DemoAutoRegisterPlugin {
    /**
     * @param {Object} [options]
     */
    constructor(options = {}) {
        this.options = options;
    }

    apply(compiler) {
        // beforeRun：普通编译前执行
        compiler.hooks.beforeRun.tap('DemoAutoRegisterPlugin', () => this._run());
        // watchRun：watch 模式下文件变化重编译前执行
        compiler.hooks.watchRun.tap('DemoAutoRegisterPlugin', () => this._run());
    }

    _run() {
        try {
            console.log('[DemoAutoRegisterPlugin] 开始扫描 mp/ 目录...');
            const mpPages = scanMpPages();
            console.log(`[DemoAutoRegisterPlugin] 扫描到 ${mpPages.length} 个页面`);
            syncPagesJson(mpPages);
            syncIndexVue(mpPages);
            console.log('[DemoAutoRegisterPlugin] 完成');
        } catch (err) {
            console.error('[DemoAutoRegisterPlugin] 执行出错：', err);
        }
    }
}

module.exports = DemoAutoRegisterPlugin;
