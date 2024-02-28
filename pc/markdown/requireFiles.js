function requireFiles(requre, path2key) {
	const map = {};
	requre.keys().forEach((path) => {
		let key = path2key ? path2key(path) : path;
		const model = requre(path);
		map[key] = model;
	});

	return map;
}

/**
 * 获取组件内容
 */
export function componentFiles() {
	/** ====================== 父级markdown Start ====================== */
	const templateMds = require.context('@/uni_modules/stellar-ui/template/', true, /.+\.md$/);
	const templateMap = requireFiles(templateMds, (path) => path.replace(/\.\/(.+)\.md$/, '$1'));
	/** ====================== 父级markdown End ====================== */

	const queryComponentName = (path) => path.replace(/^.*\/(.+)\/[\w\-]+\.(md|vue)+$/, '$1');
	/** ====================== 组件markdown文件 Start ====================== */
	const _comMds = require.context('@/uni_modules/stellar-ui/components/', true, /README\.md$/);
	const comMdMap = requireFiles(_comMds, queryComponentName);
	/** ====================== 组件markdown文件 End ====================== */

	/** ====================== 组件VUE文件 Start ====================== */
	const vues = require.context('@/uni_modules/stellar-ui/components/', true, /ste\-\w+\.vue$/);
	const vueMap = requireFiles(vues, queryComponentName);
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

	return { templateMap, comMdMap, vueMap, componentsData };
}

/**
 * 获取其他文档内容
 */
export function restsFiles() {
	const deg = /\.\/(\w+)\/(\d+)?\-?(.+)\.(md|json)$/;

	const mds = require.context('@/pc/markdown/', true, /.+\.md$/);
	const mdMap = requireFiles(mds);
	const restsMdMap = {};
	const restsList = Object.keys(mdMap).map((path) => {
		const group = path.replace(deg, '$1');
		const sort = path.replace(deg, '$2') || 1000;
		const title = path.replace(deg, '$3');
		const key = path.replace(deg, '$1-$3');
		restsMdMap[key] = mdMap[path];
		return { group, title, key, sort };
	});
	const jsons = require.context('@/pc/markdown/', true, /.+\.json$/);
	const jsonMap = requireFiles(jsons, (path) => path.replace(deg, '$1'));
	console.log(restsList);
	const restsData = Object.keys(jsonMap)
		.map((key) => {
			const { group, sort } = jsonMap[key];
			return {
				title: group,
				sort,
				children: restsList.filter((item) => item.group === key).sort((a, b) => a.sort - b.sort),
			};
		})
		.sort((a, b) => a.sort - b.sort);

	return { restsData, restsMdMap };
}
