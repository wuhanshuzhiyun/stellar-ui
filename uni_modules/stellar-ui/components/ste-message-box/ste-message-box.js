import Vue from 'vue';

const DEFAULT_KEY = '$steMsgBoxKey';
const DEFAULT_CONFIG = {
	title: '',
	content: '',
	showCancel: true,
	icon: '',
	cancelText: '取消',
	cancelColor: '#333333',
	confirmText: '确认',
	confirmColor: '',
	editable: false,
	placeholderText: '',
	success: null,
	fail: null,
	complete: null,
};

const stateMap = Vue.observable({});

function useSteMsgBox(key) {
	key = key ?? DEFAULT_KEY;
	// 初始化状态
	if (!stateMap[key]) {
		Vue.set(stateMap, key, {
			selector: key,
			openBegin: false,
			...DEFAULT_CONFIG,
		});
	}

	return {
		// 显示消息弹框
		showMsgBox(params = {}) {
			Object.assign(stateMap[key], {
				...DEFAULT_CONFIG,
				...params,
				confirm: params.confirm ?? function() {},
				cancel: params.cancel ?? function() {},
				complete: params.complete ?? function() {},
				openBegin: true,
			});
		},
		// 关闭消息弹框
		hideMsgBox() {
			Object.assign(stateMap[key], {
				openBegin: false,
			});
		},
		// 响应式数据
		$state: stateMap[key],
	};
}

export default useSteMsgBox;
export {
	DEFAULT_KEY
};