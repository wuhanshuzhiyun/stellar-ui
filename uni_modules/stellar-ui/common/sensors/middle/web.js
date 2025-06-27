// 原生SDK提供的API
import sensors from '../jssdk/web.js';
import utils from '@/common/utils.js';
// 提供各端一致的公共API
const systemInfo = utils.getSystemInfoSync();
let sa = {
	// 提供扩展性
	instance: sensors,
	// 提供初始化和配置参数
	init: (para) => {
		para = para || sa.para;
		let defaultValue = {
			is_track_single_page: true,
		};
		Object.assign(defaultValue, para);
		sensors.init.call(sensors, defaultValue);

		var _ = sensors._;
		if (para && _.isObject(para.global_properties)) {
			sensors.registerPage(para.global_properties);
		}
	},
	setPara: (para) => {
		if (typeof para === 'object') {
			sa.para = para;
		}
	},
	// 各端通用的常用API
	getDistinctID: sensors.store.getDistinctId.bind(sensors.store),
	getAnonymousID: () => {
		return sensors.quick('getAnonymousID');
	},

	// 获取 ID-Mapping 3.0 绑定信息
	getIdentities: () => {
		return sensors.getPresetProperties() && sensors.getPresetProperties().identities;
	},

	register: sensors.registerPage.bind(sensors),
	clearRegister: () => {
		console.log('web 中不支持此方法 - clearRegister');
	},
	quick: (event, para) => {
		sensors.quick(event, para);
	},
};

export default sa;
