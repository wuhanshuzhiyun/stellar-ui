import Color from './Color.js';
let throLast = 0; // 节流方法用变量
let throTimer = null; // 节流方法用的变量
let windowWidth = null;

let utils = {
	Color,
	/**
	 * 格式化像素单位为px
	 * @param value {Number | String} 像素单位值
	 * @param restype {"str" | "num"} 返回值类型
	 */
	formatPx(value, restype = "str") {
		let format = value ? value : 0;
		if (format && isNaN(format)) {
			if (/^\d+px$/i.test(format)) {
				return format;
			} else if (/^\d+rpx/i.test(format)) {
				format = Number(format.slice(0, -3));
			} else {
				return format;
			}
		}
		let px = 0;
		if (format !== 0) {
			if (windowWidth == null) {
				windowWidth = uni.getSystemInfoSync().windowWidth;
			}
			px = (format * windowWidth) / 750;
		}
		return restype === "num" ? px : `${px}px`;
	},
	/**
	 * 背景值转样式
	 * @param {String} value
	 */
	bg2style(value) {
		const result = {};
		const colorReg = /^(\#|rgba?)/i;
		const colorsReg = /^linear\-gradient/i;
		const imgReg = /^(https?\:\/\/|data\:image\/)/i;
		if (colorReg.test(value)) {
			// 纯色
			result.backgroundColor = value;
		} else if (colorsReg.test(value)) {
			// 渐变色
			result.backgroundImage = value;
		} else if (imgReg.test(value)) {
			// 图片
			result.backgroundImage = `url(${value})`;
		} else {
			// 其他原生值
			result.background = value;
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
			newVal = this.formatPx(newVal);
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
	getChildrenProps(component, chilName) {
		let propsList = [];
		// #ifdef MP-WEIXIN | MP-ALIPAY
		const children = component.$children?.filter((tab) => tab.$options.name === chilName) || [];
		children.forEach((tab) =>
			propsList.push({
				...tab.$props,
			})
		);
		// #endif
		// #ifdef H5
		const children = component.$slots.default || [];
		children.forEach((tab) =>
			propsList.push({
				...tab.componentOptions.propsData,
			})
		);
		// #endif
		return propsList;
	},
	/**深拷贝
		/* obj 深拷贝对象
		/* keySort 是否对字段进行排序
		*/
	deepClone(obj, keySort = false) {
		if (obj === null || typeof obj !== 'object') {
			return obj;
		}

		let clone = Array.isArray(obj) ? [] : {};

		let keys = Object.keys(obj);

		if (keySort) {
			keys.sort();
		}

		for (let key of keys) {
			// if (obj.hasOwnProperty(key)) {
			clone[key] = this.deepClone(obj[key], keySort);
			// }
		}

		return clone;
	},
	/**对象深度合并
	 * 用source上的数据覆盖掉target上的数据，返回target
	 * */
	deepMerge(target, source) {
		// 遍历 source 的所有属性
		for (const prop in source) {
			// 判断是否为自身属性
			if (source.hasOwnProperty(prop)) {
				// 判断属性是否为对象，如果是则递归合并
				if (typeof source[prop] === 'object' && !Array.isArray(source[prop]) && source[prop] !== null) {
					// 如果 target 对应的属性不是对象，则新建一个空对象
					if (typeof target[prop] !== 'object' || target[prop] === null) {
						target[prop] = {};
					}
					this.deepMerge(target[prop], source[prop]);
				} else {
					// 如果属性不是对象，直接赋值
					target[prop] = source[prop];
				}
			}
		}
		return target;
	},
	/**得到媒体文件类型*/
	getMediaFileType(filePath, compatible = 1) {
		//compatible 1 安卓或者ios 2 安卓且ios 3 安卓 4 ios
		let filePathList = filePath.split('.');
		let type = filePathList[filePathList.length - 1];
		let videoType = [];
		let audioType = [];
		if (compatible === 1) {
			videoType = ['mp4', 'mov', 'm4v', '3gp', 'avim', '3u8', 'webm'];
			audioType = ['flac', 'm4a', 'ogg', 'ape', 'amr', 'wma', 'wav', 'mp3', 'mp4', 'aac', 'aiff', 'caf'];
		}
		if (compatible === 2) {
			videoType = ['mp4', '3gp', 'm3u8'];
			audioType = ['m4a', 'wav', 'mp3', 'aac'];
		}
		if (compatible === 3) {
			videoType = ['mp4', '3gp', 'm3u8', 'webm'];
			audioType = ['flac', 'm4a', 'ogg', 'ape', 'amr', 'wma', 'wav', 'mp3', 'mp4', 'aac'];
		}
		if (compatible === 4) {
			videoType = ['mp4', 'mov', 'm4v', '3gp', 'avim', '3u8'];
			audioType = ['flac', 'm4a', 'wav', 'mp3', 'aac', 'aiff', 'caf'];
		}
		let imageType = ['jpg', 'png', 'svg', 'webp', 'gif', 'bmp'];
		if (videoType.includes(type)) {
			return 'video';
		}
		if (audioType.includes(type)) {
			return 'audio';
		}
		if (imageType.includes(type)) {
			return 'image';
		}
		return -1;
	},

};

export default utils;