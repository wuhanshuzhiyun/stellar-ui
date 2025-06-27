import { requireFiles, componentFiles, restsFiles } from './requireFiles.js';

import config from '@/common/config.js';

const { restsData, restsMdMap } = restsFiles();

export const { templateMap, comMdMap, vueMap, componentsData } = componentFiles();
const dataSort = ['基础组件', '表单组件'];

function sortData() {
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

function getGroupData() {
	const dataObj = {};
	const [devData, devGroupData] = restsData;
	dataObj[config.NAV_KEY_DEV] = [devData];
	dataObj[config.NAV_KEY_DEV_GROUP] = [devGroupData];

	const compData = componentsData.sort((a, b) => {
		const indexA = dataSort.indexOf(a.title);
		const indexB = dataSort.indexOf(b.title);

		// 如果 a.title 和 b.title 都在 dataSort 中，则按照 dataSort 中的顺序排序
		if (indexA !== -1 && indexB !== -1) {
			return indexA - indexB;
		}
		// 如果只有 a.title 在 dataSort 中，则 a 排在前面
		if (indexA !== -1) {
			return -1;
		}
		// 如果只有 b.title 在 dataSort 中，则 b 排在前面
		if (indexB !== -1) {
			return 1;
		}
		// 如果 a.title 和 b.title 都不在 dataSort 中，则保持原顺序 (或者你可以根据其他规则排序)
		return 0;
	});
	dataObj[config.NAV_KEY_COMP] = compData;
	return dataObj;
}

export const datas = sortData();

export const groupData = getGroupData();

export const mdMap = {
	...comMdMap,
	...restsMdMap,
};
