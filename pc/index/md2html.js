import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import highlight from 'markdown-it-highlightjs';
import 'highlight.js/styles/default.css';

const md = new MarkdownIt();
const parser = new DOMParser();
// 使用锚点插件
md.use(markdownItAnchor, { permalink: false, permalinkBefore: true, permalinkSymbol: '#' });
// 使用 markdown-it-highlightjs 插件
md.use(highlight);

/**
 * @param {string} mdstr md的内容字符串
 * @return {HTMLAnchorElement}
 */
export default function (mdstr) {
	const htmlStr = md.render(mdstr);
	const doc = parser.parseFromString(htmlStr, 'text/html');
	const pres = doc.querySelectorAll('body>pre');
	pres.forEach((pre) => {
		const codedom = pre.querySelector('code');
		const code = codedom.textContent;
		const btn = document.createElement('button');
		btn.innerText = '复制';
		btn.setAttribute('content', code);
		btn.classList.add('code-copy-button');
		pre.appendChild(btn);
	});
	const tables = doc.querySelectorAll('table');
	tables.forEach((table) => {
		table.setAttribute('border', '1');
	});
	// 返回转换后的html
	return doc.body.innerHTML;
}
