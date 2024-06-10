import store from '../../utils/store.js';
import Vuex from 'vuex';
let $state = new Vuex.Store({
	state: {
		openBegin: false,
		title: '',
		icon: '',
		image: '',
		duration: 1500,
		mask: false,
		success: null,
		fail: null,
		complete: null,
		close: null,
	},
}).state;

function useSteToast() {
	return {
		/*打开弹窗*/
		showToast(params) {
			// 关闭前面的弹窗
			$state.openBegin = false;
			setTimeout(() => {
				$state.openBegin = true;
				$state.title = params.title ?? '';
				$state.icon = params.icon ?? 'success';
				$state.image = params.image ?? '';
				$state.duration = params.duration ?? 1500;
				$state.mask = params.mask ?? false;
				$state.success = params.success ?? function () {};
				$state.fail = params.fail ?? function () {};
				$state.complete = params.complete ?? function () {};
				$state.close = params.close ?? function () {};
			});
		},
		/*关闭弹窗*/
		hideToast() {
			$state.openBegin = false;
		},
		/**响应式数据*/
		$state,
	};
}
export default useSteToast;
