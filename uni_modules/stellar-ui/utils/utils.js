import Color from "./Color.js"
let throLast = 0; // 节流方法用变量
let throTimer = null; // 节流方法用的变量
let windowWidth = null;

let utils = {
	Color,
	rpx2px(rpx) {
		if (!rpx) return '0';
		if (windowWidth == null) {
			windowWidth = uni.getSystemInfoSync().windowWidth;
		}
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
		let newVal;
		if (this.isNumber(val)) {
			newVal = val + 'rpx';
		} else {
			newVal = val;
		}

		// #ifdef H5
		if (newVal.indexOf('rpx') >= 0) {
			newVal = this.rpx2px(newVal);
		}
		// #endif
		return newVal;
	},
	/**字符串是否为数字
	 *@value 要判断的字符串
	 */
	isNumber(value) {
		return !isNaN(parseFloat(value)) && isFinite(value);
	},
	/**分转元
	 *@val 传入的分
	 *@digits 精度，-1 不使用精度 0 保留0位小数 1 保留1位小数 2保留2位小数
	 *@defaultVal 默认值
	 *@part 取值部分 0 取全部值 1 取元部分 2取角分部分
	 */
	fenToYuan(val, digits = -1, defaultVal = '', part = 0) {
		let part1 = Math.floor(val / 100); // 元部分
		let part2 = val % 100; // 角分部分
		let newVal = '';
		if (val == null || val === '') {
			newVal = defaultVal;
		} else {
			if (digits === -1) {
				newVal = val / 100;
			} else {
				newVal = (val / 100).toFixed(digits);
			}
		}
		newVal = String(newVal);
		// 取全部
		if (part === 0) {
			return newVal;
			// 取元部分
		} else if (part === 1) {
			return newVal.split('.')[0];
			// 取角分部分
		} else if (part === 2) {
			if (newVal.split('.').length > 1) {
				return '.' + newVal.split('.')[1];
			} else {
				return '';
			}
		}
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
	querySelector(selectors, component, all = false) {
		const selectFn = all ? 'selectAll' : 'select';
		return new Promise((resolve, reject) => {
			try {
				uni.createSelectorQuery()
					.in(component)[selectFn](selectors)
					.boundingClientRect((data) => {
						resolve(data);
					})
					.exec();
			} catch (e) {
				reject(e);
			}
		});
	},
	scrollViewX({
		viewLeft, // 要显示的元素左侧位置
		viewRight, // 要显示的元素右侧位置
		boxLeft = 0, // 视图区域左侧位置
		boxRight = uni.getSystemInfoSync().windowWidth, // 视图区域右侧位置
		prevWidth = 0, // 前一个元素的宽度
		nextWidth = 0, // 后一个元素的宽度
		scrollLeft = 0, // 当前已经滑动的距离
	}) {
		const left = viewLeft - prevWidth;
		const right = viewRight + nextWidth;
		if (left < boxLeft) {
			return (scrollLeft += left - boxLeft);
		}
		if (right > boxRight) {
			return (scrollLeft += right - boxRight);
		}
		return scrollLeft;
	},
};

export default utils;