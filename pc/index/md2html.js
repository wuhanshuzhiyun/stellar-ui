import MarkdownIt from 'markdown-it';
import highlight from 'markdown-it-highlightjs';
import 'highlight.js/styles/default.css';
import {
    templateMap
} from '../markdown/index.js';

// 创建 MarkdownIt 实例
const md = new MarkdownIt({
    html: true,
    xhtmlOut: true,
});

// 使用 markdown-it-highlightjs 插件
md.use(highlight);

// #ifdef H5
const parser = new DOMParser();
// #endif

/**
 * @param {string} mdstr md的内容字符串
 * @return {string} str类型的html字符串
 */
function _md2html(mdstr) {
    const htmlStr = md.render(mdstr);
    // #ifndef H5
    return htmlStr;
    // #endif

    // #ifdef H5
    const doc = parser.parseFromString(htmlStr, 'text/html');
    const pres = doc.querySelectorAll('body>pre');
    pres.forEach((pre) => {
        const codedom = pre.querySelector('code');
        const code = codedom.textContent;
        const btn = document.createElement('button');
        btn.innerText = '复制';
        btn.setAttribute('content', code);
        btn.classList.add('code-copy-button');
        pre.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('code-body-box');
        div.appendChild(codedom);
        pre.appendChild(div);
        pre.appendChild(btn);
    });
    const tables = doc.querySelectorAll('table');
    tables.forEach((table) => {
        table.setAttribute('border', '1');
    });
    // 返回转换后的html
    return doc.body.innerHTML;
    // #endif
}

// 插入公共模版文档内容
async function insetTemplateMdStr(htmlStr) {
    const kReg = /\<p\>\{\{(\w+)\}\}\<\/p\>/;
    let result = htmlStr;
    // #ifdef H5
    // 查找所有的{{}}
    while (kReg.test(result)) {
        let key = result.match(kReg);
        key = key[0].replace(kReg, '$1');
        const url = templateMap[key];
        if (!url) {
            console.error(`${key}公共文件不存在，请检查语法！`);
            return result;
        }
        const md = await uni.request({
            url
        });
        result = result.replace(kReg, _md2html(md.data));
    }
    // #endif
    return result;
}


/** 
 * 拆分组件文档md文件，方便分块显示调整样式
 * @param {string} content 组件文档的内容
 */
export async function splitCompMarkdown(content) {
    // 定义正则表达式
    const compatibilityRegex = /\{\{[^}]+\}\}/;
    const apiMarker = '### API';

    // 分割内容
    const parts = [];

    // 查找第一个 {{xxx}} 的位置
    const firstMatch = content.match(compatibilityRegex);
    if (!firstMatch) {
        throw new Error('Cannot find {{xxx}} marker');
    }

    // 第一部分：从开始到第一个标记之前
    const firstPart = content.slice(0, firstMatch.index);
    parts.push(firstPart);

    // 查找 API 标记的位置
    const apiIndex = content.indexOf(apiMarker);
    if (apiIndex === -1) {
        throw new Error('Cannot find ### API marker');
    }

    // 第二部分：从第一个标记后到 API 前
    const secondPart = content.slice(firstMatch.index + firstMatch[0].length, apiIndex);
    parts.push(secondPart);

    // 获取 API 后的内容
    const afterApiContent = content.slice(apiIndex);

    // 在 API 后的内容中找到最后一个 | 符号
    const afterApiBracketIndex = afterApiContent.lastIndexOf('|');

    // 第三部分：从 API 到最后一个 | 之前
    const thirdPart = afterApiContent.slice(0, afterApiBracketIndex);
    parts.push(thirdPart);

    // 第四部分：表格结束后 到 所有内容
    const fourthPart = afterApiContent.slice(afterApiBracketIndex + 1);
    parts.push(fourthPart);


    // 渲染每个部分为HTML
    console.log('xuanran')
    const htmlParts = [];
    htmlParts.push(await _md2html(parts[0].trim())); // 组件名称部分
    htmlParts.push(await _md2html(parts[1].trim())); // 组件示例部分
    htmlParts.push(await _md2html(parts[2].trim())); // 组件API部分

    // 兼容性 + 贡献者部分
    let customStr = `{{compatibility}} \n\t\n `;
    customStr += `\n\t\n ### 贡献者 \n\t\n   <div class="con-box"> \n\t\n ${parts[3].trim()} \n\t\n </div>`
    htmlParts.push(await md2html(customStr));
    return htmlParts
}


/**
 * 最终的 MD 转 HTML 函数
 * @param {string} mdstr
 * @returns {Promise<string>}
 */
export default async function md2html(mdstr) {
    const htmlStr = await _md2html(mdstr);
    return insetTemplateMdStr(htmlStr);
}