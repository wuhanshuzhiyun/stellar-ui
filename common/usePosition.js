// 位置钩子函数
import utils from '@/common/utils.js';

let pxMenuButtonTop = -1; // 胶囊按钮top 单位 px
let pxMenuBottonBottom = -1; // 胶囊按钮bottom 单位 px
let pxMenuButtonHeight = -1; // 胶囊按钮height 单位 px
let pxMenuButtonWidth = -1; // 胶囊按钮width 单位 px
let pxMenuButtonLeft = -1; // 胶囊按钮left 单位 px
let pxMenuBottomRight = -1; // 胶囊按钮right 单位 px
let navbarHeight = -1; // 自定义导航栏高度 单位 rpx
let navbarWidth = -1; // 自定义导航栏宽度 单位 rpx
let navbarTop = -1; // 自定义导航栏顶部到屏幕顶部的高度 单位 rpx
let navbarBottom = -1; // 自定义导航栏底部到屏幕顶部的高度 单位 rpx

let tabbarHeight = -1;

let safeAreaInsetBottom = -1; // 底部安全距离

let addHeight = 16; // 加宽的高度，自定义导航的加宽的总高度为 addHeight * 2 单位rpx

let backgroundControlledHeight = 40; //背景图片可控距离 单位40rpx,背景图片会多做40px的高度

// ui设计图上使用的参考胶囊按钮bottom位置 单位rpx
// 设计图使用的iphone 13机型 px单位为83px，159.6153846153846为在iphone13下的rpx值
let designedMenuBottonBottom = 159.6153846153846;
let backgroundPositionY = -1; // 背景图片精确适配胶囊按钮后的 background-position ypos的值，单位rpx

let systemInfo = uni.getSystemInfoSync();
// 手机可使用区域的高度 单位rpx
let windowHeight = utils.px2rpx(systemInfo.windowHeight);
// 手机可使用区域的高度 单位px
let pxWindowHeight = systemInfo.windowHeight;
// 手机可使用区域的宽度 单位rpx
let windowWidth = utils.px2rpx(systemInfo.windowWidth);
// 手机可使用区域的宽度 单位px
let pxWindowWidth = systemInfo.windowWidth;
let flag = false;
function getData(menuButtonInfo) {
	if (pxMenuButtonTop === -1) {
		// #ifdef H5

		pxMenuButtonTop = 55;
		pxMenuBottonBottom = 92;
		pxMenuButtonWidth = 87;
		pxMenuButtonHeight = 26;
		pxMenuButtonLeft = 281;
		pxMenuBottomRight = 368;
		// #endif

		// #ifdef MP
		pxMenuButtonTop = menuButtonInfo.top;
		pxMenuBottonBottom = menuButtonInfo.bottom;
		pxMenuButtonWidth = menuButtonInfo.width;
		pxMenuButtonHeight = menuButtonInfo.height;
		pxMenuButtonLeft = menuButtonInfo.left;
		pxMenuBottomRight = menuButtonInfo.right;
		// #endif
		// 支付宝开发工具的胶囊按钮数据是错误的，使用固定数据适配开发工具
		// #ifdef MP-ALIPAY
		if (systemInfo.platform === 'devtools') {
			pxMenuButtonTop = 55;
			pxMenuBottonBottom = 92;
			pxMenuButtonWidth = 87;
			pxMenuButtonHeight = 26;
			pxMenuButtonLeft = 281;
			pxMenuBottomRight = 368;
		}
		// #endif

		navbarTop = utils.px2rpx(pxMenuButtonTop - uni.upx2px(addHeight));
		navbarWidth = utils.px2rpx(pxMenuButtonLeft);
		navbarHeight = utils.px2rpx(pxMenuButtonHeight + uni.upx2px(addHeight * 2));
		navbarBottom = utils.px2rpx(pxMenuBottonBottom + uni.upx2px(addHeight));
		if (systemInfo.safeAreaInsets == null || systemInfo.safeAreaInsets.bottom == 0) {
			safeAreaInsetBottom = 20;
		} else {
			safeAreaInsetBottom = utils.px2rpx(systemInfo.safeAreaInsets.bottom);
		}
		// 计算tabbar的总高度，包含安全距离 单位 rpx
		tabbarHeight = 0;
		tabbarHeight += 94;
		tabbarHeight += safeAreaInsetBottom;
		// 背景图片精确适配胶囊按钮后的 background-position ypos的值，单位rpx
		backgroundPositionY = -backgroundControlledHeight + utils.px2rpx(pxMenuBottonBottom) - designedMenuBottonBottom;
	}
}
// 仅支付宝用，支付宝偶尔会在第一时间拿不到数据，通过延迟方法得到数据
function refreshData(pageThis) {
	setTimeout(() => {
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		if (menuButtonInfo.error == 1111) {
			// 支付宝有可能得不到胶囊按钮信息
			refreshData(pageThis);
		} else {
			getData(menuButtonInfo);
			pageThis.navbarTop = navbarTop;
			pageThis.navbarBottom = navbarBottom;
			pageThis.navbarWidth = navbarWidth;
			pageThis.navbarHeight = navbarHeight;
			pageThis.safeAreaInsetBottom = safeAreaInsetBottom;
			pageThis.backgroundPositionY = backgroundPositionY;
			pageThis.tabbarHeight = tabbarHeight;
			pageThis.windowHeight = windowHeight;
			pageThis.windowWidth = windowWidth;
		}
	}, 100);
}

let usePosition = function () {
	if (pxMenuButtonTop === -1) {
		let menuButtonInfo = null;
		// #ifdef H5
		getData(menuButtonInfo);
		// #endif
		// #ifdef MP-WEIXIN
		menuButtonInfo = wx.getMenuButtonBoundingClientRect();
		getData(menuButtonInfo);
		// #endif

		// #ifdef MP-ALIPAY
		menuButtonInfo = my.getMenuButtonBoundingClientRect();
		if (menuButtonInfo.error == 1111) {
			// 支付宝有可能得不到胶囊按钮信息
		} else {
			getData(menuButtonInfo);
		}
		// #endif
	}
	return {
		/**自定义导航栏高度 单位 rpx*/
		navbarHeight,
		/**自定义导航栏宽度 单位 rpx*/
		navbarWidth,
		/**自定义导航栏顶部到屏幕顶部的高度 单位 rpx*/
		navbarTop,
		/**自定义导航栏底部到屏幕顶部的高度 单位 rpx*/
		navbarBottom,
		/**安全距离*/
		safeAreaInsetBottom,
		/**背景图片精确适配胶囊按钮后的 background-position ypos的值，单位rpx*/
		backgroundPositionY,
		/**计算tabbar的总高度，包含安全距离 单位 rpx*/
		tabbarHeight,
		/**手机可使用区域的高度 单位rpx*/
		windowHeight,
		/**手机可使用区域的高度 单位px*/
		pxWindowHeight,
		/**手机可使用区域的宽度 单位rpx*/
		windowWidth,
		/**手机可使用区域的宽度 单位px*/
		pxWindowWidth,
		/**支付宝专用方法 刷新数据
		/*@pageThis 将this传进入，会将所有this上和pos上名称一致的属性，自动赋值
		*/
		refreshData,
	};
};

export default usePosition;
