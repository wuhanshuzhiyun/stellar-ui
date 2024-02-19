function requireAll(requre) {
	const map = {};
	requre.keys().forEach((path) => {
		const key = path.replace(/^.*\/(.+)\/[\w\-]+\.(md|vue)+$/, '$1');
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
const vueMap = requireAll(vues);
/** ====================== 组件VUE文件 End ====================== */

/** ====================== 组装组件数据 Start ====================== */
const comGroups = {};
const components = Object.keys(comMdMap).map((key) => {
	const group = vueMap[key]?.default?.group;
	comGroups[group] = group || '其他';

	return { name: key, key, group };
});

const componentsData = Object.keys(comGroups).map((group) => {
	return {
		name: group,
		children: components.filter((data) => data.group === group),
	};
});
/** ====================== 组装组件数据 End ====================== */

/** ====================== 开发指南markdown文件 Start ====================== */
const handbookMds = require.context('@/pc/handbook/', true, /.+\.md$/);
const handbookMdMap = requireAll(handbookMds);
const handbooks = Object.keys(handbookMdMap).map((key) => {
	return { name: key.replace(/\.\/(\d\-)?(.+)\.md$/, '$2'), key };
});
/** ====================== 开发指南markdown文件 End ====================== */

export const datas = [{ name: '开发指南', children: handbooks }, ...componentsData];

export const mdMap = { ...comMdMap, ...handbookMdMap };
