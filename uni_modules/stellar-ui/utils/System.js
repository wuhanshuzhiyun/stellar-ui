export default class System {
	static systemInfo = uni.getSystemInfoSync();
	static navbarBottom = null;
	static windowWidth = null;

	/**
	 * 获取屏幕宽度
	 */
	static getWindowWidth() {
		if (System.windowWidth === null) {
			System.windowWidth = System.systemInfo.windowWidth;
		}
		return System.windowWidth;
	}

	/**
	 * 获取手机顶部安全区域距离顶部的距离（状态栏高度）
	 */
	static getStatusBarHeight() {
		return System.systemInfo.statusBarHeight;
	}
	
	/**
	 * 获取导航栏底部安全区域距离底部的距离（底部安全区距离状态栏的距离）
	 */
	static getNavbarBottom() {
		if (System.navbarBottom === null) {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			System.navbarBottom = menuButtonInfo.bottom + 8;
		}
		return System.navbarBottom;
	}
}
