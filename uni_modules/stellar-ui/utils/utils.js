let throLast = 0; // 节流方法用变量
let throTimer = null; // 节流方法用的变量

let utils = {
	rpx2px(rpx) {
		let windowWidth = uni.getSystemInfoSync().windowWidth;
		let px = (parseInt(rpx) * windowWidth) / 750;
		return `${px}px`;
	},
	/**
	 * 背景值转样式
	 * @param {String} value
	 */
	bg2style(value) {
		const result = {};
		const colorReg = /^(\#|rgba?)/;
		const colorsReg = /^linear\-gradient/;
		const imgReg = /^(https?\:\/\/|data\:image\/)/;
		if (colorReg.test(value)) {
			// 纯色
			result.backgroundColor = value;
		} else if (colorsReg.test(value)) {
			// 渐变色
			result.backgroundImage = value;
		} else if (imgReg.test(value)) {
			// 图片
			result.backgroundImage = `url(${value})`;
		}
		return result;
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
	/**节流
	 *@fn 要节流的方法
	 *@args 要节流方法的参数，如果最后一个参数是 {delay:2000}，则该参数为节流时间参数，不记入方法参数
	 */
	thro(fn, ...args) {
		let delay = 500;
		let lastArgs = null;
		if (args.length > 0) {
			lastArgs = args[args.length - 1];
			if (lastArgs?.delay != null) {
				delay = lastArgs.delay;
				args.pop();
			}
		}
		let now = new Date().getTime();
		if (throLast === 0 || now - throLast > delay) {
			clearTimeout(throTimer);
			fn.call(this, ...args);
			throLast = now;
			throTimer = setTimeout(() => {
				throLast = 0;
			}, delay);
		}
	},
};

export default utils;
