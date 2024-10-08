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
		enableCrossPagePrompt: false,
		timer: [],
	},
}).state;

function useSteToast() {
	return {
		/*打开弹窗*/
		showToast(params) {
			// 默认持续时间
			let defaultDuration = 1500;
			// 关闭前面的弹窗
			$state.openBegin = false;
			// 关闭系统的弹窗
			uni.hideToast();
			// 提示队列
			let time = 0;
			if (params.order) {
				// 先取上一次存的值 如果为空 则为第一个值
				let toastLastParams = uni.getStorageSync('toastLastParams');
				// 等待的时间 第一个没有等待时间 后面的都是前面的持续时间的合
				if (typeof toastLastParams == 'object') {
					time = toastLastParams.time;
				}
				// 存当前的等待时间 加100ms 以防没有打开中间的提示
				params.time = time + (params.duration ?? defaultDuration) + 100;
				uni.setStorageSync('toastLastParams', params);
			} else {
				// 遇到非队列数据 则清空队列时间
				uni.removeStorageSync('toastLastParams');
			}
			let timer = setTimeout(() => {
				$state.openBegin = true;
				$state.title = params.title ?? '';
				$state.icon = params.icon ?? 'success';
				$state.image = params.image ?? '';
				$state.duration = params.duration ?? defaultDuration;
				$state.mask = params.mask ?? false;
				$state.success = params.success ?? function () {};
				$state.fail = params.fail ?? function () {};
				$state.complete = params.complete ?? function () {};
				$state.close = params.close ?? function () {};
				$state.enableCrossPagePrompt = params.enableCrossPagePrompt ?? false;
			}, time);
			$state.timer.push(timer);
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
