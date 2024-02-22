function requireAll(requre, isHandbooks) {
	const map = {};
	requre.keys().forEach((path) => {
		let key = path.replace(/^.*\/(.+)\/[\w\-]+\.(md|vue)+$/, '$1');
		// 如果是开发指南，则没有上级文件夹，直接读取文件名
		if (isHandbooks) {
			key = path.replace(/\.\/(\d+\-)?(.+)\.md$/, '$2');
		}
		const model = requre(path);
		map[key] = model;
	});

	return map;
}

/** ====================== 组件markdown文件 Start ====================== */
const _comMds = require.context('@/uni_modules/stellar-ui/components/', true, /README\.md$/);
const comMdMap = requireAll(_comMds);
/** ====================== 组件markdown文件 End ====================== */

/** ====================== 组件VUE文件 Start ====================== */
const vues = require.context('@/uni_modules/stellar-ui/components/', true, /ste\-\w+\.vue$/);
export const vueMap = requireAll(vues);
/** ====================== 组件VUE文件 End ====================== */

/** ====================== 组装组件数据 Start ====================== */
const comGroups = {};
const components = Object.keys(comMdMap).map((key) => {
	const obj = vueMap[key]?.default || {};
	const { group, title, name } = obj;

	comGroups[group] = group || '其他';

	return { title, name: name || key, key, group };
});

const componentsData = Object.keys(comGroups).map((group) => {
	return {
		title: group && group !== 'undefined' ? group : '其他',
		children: components.filter((data) => String(data.group) === group),
	};
});
/** ====================== 组装组件数据 End ====================== */

/** ====================== 开发指南markdown文件 Start ====================== */
const handbookMds = require.context('@/pc/handbook/', true, /.+\.md$/);
const handbookMdMap = requireAll(handbookMds, true);
const handbooks = Object.keys(handbookMdMap).map((key) => ({ title: key, key }));
/** ====================== 开发指南markdown文件 End ====================== */

function sortData() {
	const dataSort = ['基础组件', '表单组件'];

	const result = [{ title: '开发指南', children: handbooks }];

	console.log(result);

	dataSort.forEach((title) => {
		const data = componentsData.find((g) => title === g.title);
		if (data) {
			result.push(data);
		}
	});

	const r = componentsData.filter((g) => dataSort.indexOf(g.title) === -1);

	return result.concat(r);
}

export const datas = sortData();

export const mdMap = { ...comMdMap, ...handbookMdMap };
