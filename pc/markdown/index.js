import { requireFiles, componentFiles, restsFiles } from './requireFiles.js';

const { restsData, restsMdMap } = restsFiles();

export const { templateMap, comMdMap, vueMap, componentsData } = componentFiles();

function sortData() {
	const dataSort = ['基础组件', '表单组件'];
	const result = [...restsData];

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

export const mdMap = { ...comMdMap, ...restsMdMap };
