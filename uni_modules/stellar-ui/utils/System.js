export default class System {
	static getSystemInfoSync() {
		if (systemInfoSync == null) {
			// #ifdef MP-WEIXIN
			let systemSetting = wx.getSystemSetting();
			let appAuthorizeSetting = wx.getAppAuthorizeSetting();
			let deviceInfo = wx.getDeviceInfo();
			let windowInfo = wx.getWindowInfo();
			let appBaseInfo = wx.getAppBaseInfo();
			// #endif
			systemInfoSync = {
				...systemSetting,
				...appAuthorizeSetting,
				...deviceInfo,
				...windowInfo,
				...appBaseInfo,
			};
			// #ifndef MP-WEIXIN
			systemInfoSync = uni.getSystemInfoSync();
			// #endif
		}
		return systemInfoSync;
	}
	/**
	 * 获取屏幕宽度
	 */
	static getWindowWidth() {
		return System.getSystemInfoSync().windowWidth;
	}
	/**
	 * 获取屏幕高度
	 */
	static getWindowHeight() {
		return System.getSystemInfoSync().windowHeight;
	}

	/**
	 * 获取手机顶部安全区域距离顶部的距离（状态栏高度）
	 */
	static getStatusBarHeight() {
		return System.getSystemInfoSync().statusBarHeight;
	}

	/**
	 * 获取导航栏底部安全区域距离底部的距离（底部安全区距离状态栏的距离）
	 */
	static getNavbarBottom() {
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		return menuButtonInfo.bottom + 8;
	}

	static getElementBoundary(el) {
		const vw = System.getWindowWidth(); // 计算vw单位
		const vh = System.getWindowHeight(); // 计算vh单位
		return {
			top: el.top,
			left: el.left,
			bottom: vh - el.bottom,
			right: vw - el.right,
		};
	}
}