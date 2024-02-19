import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import highlight from 'markdown-it-highlightjs';
import 'highlight.js/styles/default.css';

const md = new MarkdownIt();
// 使用锚点插件
md.use(markdownItAnchor, { permalink: false, permalinkBefore: true, permalinkSymbol: '#' });
// 使用 markdown-it-highlightjs 插件
md.use(highlight);

/**
 * @param {string} mdstr md的内容字符串
 * @return {HTMLAnchorElement}
 */
export default function (mdstr) {
	return md.render(mdstr);
}
