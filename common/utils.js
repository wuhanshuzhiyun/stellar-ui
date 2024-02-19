let utils = {
	/**px转rpx*/
	px2rpx(px) {
		let windowWidth = uni.getSystemInfoSync().windowWidth;
		let rpx = (px * 750) / windowWidth;
		return rpx;
	},
	/**rpx转px 比uni.upx2px精度更高*/
	rpx2px(rpx) {
		let windowWidth = uni.getSystemInfoSync().windowWidth;
		let px = (rpx * windowWidth) / 750;
		return px;
	},
	/**兼容css中的单位
	 * 如果值为数字，则拼接 'rpx'，否则直接返回字符串的值
	 */
	addUnit(val) {
		if (this.isNumber(val)) {
			return val + 'rpx';
		} else {
			return val;
		}
	},
	/**字符串是否为数字
	 *@value 要判断的字符串
	 */
	isNumber(value) {
		return !isNaN(parseFloat(value)) && isFinite(value);
	},
};

export default utils;
