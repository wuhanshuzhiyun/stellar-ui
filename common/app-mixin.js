import useSteToast from '@/uni_modules/stellar-ui/components/ste-toast/ste-toast.js';
import useSteMsgBox from '@/uni_modules/stellar-ui/components/ste-message-box/ste-message-box.js';
let steToast = useSteToast();
let steMsgBox = useSteMsgBox();
export default {
	data() {
		return {
			onShowStatus: 0, // onShow事件状态，0 第一次显示onShow状态，1 非第一次显示onShow状态，用来适配支付宝的onPageShow状态
		};
	},
	methods: {
		showToast(params) {
			// 是否开启提示跨页面功能配置
			params.enableCrossPagePrompt = false;
			steToast.showToast(params);
		},
		hideToast: steToast.hideToast,
		showMsgBox: steMsgBox.showMsgBox,
		hideMsgBox: steMsgBox.hideMsgBox,
	},
	onShow() {
		// #ifdef MP-ALIPAY || H5
		// 兼容支付宝小程序的onPageShow

		if (this.onShowStatus === 0) {
			this.onShowStatus = 1;
		} else {
			emitOnPageShow(this.$children);
		}

		function emitOnPageShow(children) {
			children.forEach((item) => {
				if (item.$options.onPageShow != null) {
					item.$options.onPageShow.forEach((func) => {
						func.bind(item)();
					});
				}
				emitOnPageShow(item.$children);
			});
		}
		// #endif
	},
	onHide() {
		// #ifdef MP-ALIPAY || H5
		// 兼容支付宝小程序的onPageHide
		emitOnPageHide(this.$children);

		function emitOnPageHide(children) {
			children.forEach((item) => {
				if (item.$options.onPageHide != null) {
					item.$options.onPageHide.forEach((func) => {
						func.bind(item)();
					});
				}
				emitOnPageHide(item.$children);
			});
		}
		// #endif
	},
};
