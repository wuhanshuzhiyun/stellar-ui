import MarkdownIt from 'markdown-it';
import highlight from 'markdown-it-highlightjs';
import 'highlight.js/styles/default.css';
import { templateMap } from './mdFiles.js';

const md = new MarkdownIt({
	html: true,
	xhtmlOut: true,
});
const parser = new DOMParser();

// 使用 markdown-it-highlightjs 插件
md.use(highlight);

/**
 * @param {string} mdstr md的内容字符串
 * @return {string} str类型的html字符串
 */
export default async function (mdstr) {
	let str = mdstr;
	try {
		str = await insetTemplateMdStr(mdstr);
	} catch (e) {
		//TODO handle the exception
		console.error('插入公共元素失败', e);
	}
	const htmlStr = md.render(str);
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

// 插入公共模版文档内容
async function insetTemplateMdStr(mdStr) {
	const kReg = /\{\{.+\}\}/;
	let result = mdStr;
	// 查找所有的{{}}
	while (kReg.test(result)) {
		let key = result.match(kReg);
		key = key[0].replace(/\{\{(.+)\}\}/, '$1');
		const url = templateMap[key];
		if (!url) {
			console.error(`${key}公共文件不存在，请检查语法！`);
			return result;
		}
		result = result.replace(kReg, (await uni.request({ url })).data);
	}
	return result;
}
