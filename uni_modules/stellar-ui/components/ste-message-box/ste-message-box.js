import store from '../../utils/store.js';
import Vuex from 'vuex';
const DEFAULT_CONFIG = {
	title: '',
	content: '',
	showCancel: true,
	icon: '',
	cancelText: '取消',
	cancelColor: '#333333',
	confirmText: '确认',
	confirmColor: '#0090ff',
	editable: false,
	placeholderText: '',
	success: null,
	fail: null,
	complete: null,
}

let $state = new Vuex.Store({
	state: {
		openBegin: false,
		...DEFAULT_CONFIG,
	},
}).state;

function useSteMsgBox() {
	return {
		/*打开弹窗*/
		showMsgBox(params) {
			// 关闭前面的弹窗
			$state.openBegin = false;
			// 关闭系统的弹窗
			uni.hideToast();
			setTimeout(() => {
				$state.openBegin = true;
				$state.title = params.title ?? DEFAULT_CONFIG.title;
				$state.content = params.content ?? DEFAULT_CONFIG.content;
				$state.icon = params.icon ?? DEFAULT_CONFIG.icon;
				$state.showCancel = params.showCancel ?? DEFAULT_CONFIG.showCancel;
				$state.cancelText = params.cancelText ?? DEFAULT_CONFIG.cancelText;
				$state.cancelColor = params.cancelColor ?? DEFAULT_CONFIG.cancelColor;
				$state.confirmText = params.confirmText ?? DEFAULT_CONFIG.confirmText;
				$state.confirmColor = params.confirmColor ?? DEFAULT_CONFIG.confirmColor;
				$state.editable = params.editable ?? DEFAULT_CONFIG.editable;
				$state.placeholderText = params.placeholderText ?? DEFAULT_CONFIG.placeholderText;

				$state.confirm = params.confirm ?? function() {};
				$state.cancel = params.cancel ?? function() {};
				$state.complete = params.complete ?? function() {};

			});
		},
		/*关闭弹窗*/
		hideMsgBox() {
			$state.openBegin = false;
		},
		/**响应式数据*/
		$state,
	};
}
export default useSteMsgBox;