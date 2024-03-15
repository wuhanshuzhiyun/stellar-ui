import config from './config.js';

let throLast = 0; // 节流方法用变量
let throTimer = null; // 节流方法用的变量

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
	/**拼接image的src
	 * val 图片地址
	 * isTheme 是否包含皮肤
	 * systemThemeBaseUrl 系统皮肤路径
	 */
	joinSrc(val, isTheme = false, systemTheme = null) {
		if (val === '' || val == null) {
			val = '空图片/空图片.png';
			// val = 'none'
		}
		// 如果图片地址包含http https前缀，则不拼接全局图片前缀
		let baseUrl = '';
		systemTheme = systemTheme ?? config.IMAGE_SYSTEM_THENE;
		if (/^(data:image|wxfile:)/g.test(val)) {
			return val;
		} else if (/^(http:|https:)/g.test(val)) {
			return val + '?' + new Date().getTime();
		} else {
			baseUrl = config.IMAGE_BASE_URL;
			baseUrl += isTheme ? systemTheme : config.IMAGE_COMMON;
			return baseUrl + val + '?' + new Date().getTime();
		}
	},
	/**拼接background的url，支持 joinUrl('图片.png no-repeat cover/100% 100%')完整写法
	 * val 图片地址
	 * isTheme 是否包含皮肤
	 * systemThemeBaseUrl 系统皮肤路径
	 */
	joinUrl(val, isTheme = false, systemTheme = null) {
		if (val === '' || val == null) {
			// val = '空图片/空图片.png'
			return 'none';
		}
		// 如果图片地址包含http https前缀，则不拼接全局图片前缀
		let baseUrl = '';
		systemTheme = systemTheme ?? config.IMAGE_SYSTEM_THENE;
		if (/^(http:|https:)/g.test(val) === false) {
			baseUrl = config.IMAGE_BASE_URL;
			baseUrl += isTheme ? systemTheme : config.IMAGE_COMMON;
		}

		// 第一个空格后面的内容，拼接到url外面去
		let index = val.indexOf(' ');
		let str = '';
		let url = '';
		let other = '';
		if (index > 0) {
			url = val.substr(0, index) + '?' + new Date().getTime();
			other = val.substr(index + 1);
			str = `url('${baseUrl}${url}') ${other}`;
		} else {
			url = val + '?' + new Date().getTime();
			str = `url('${baseUrl}${url}')`;
		}
		return str;
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
	/**
	 * 替换html默认样式
	 * @html 要替换的文本
	 * @tag 标签名
	 * @checkProperties 检测的样式属性，如果存在该属性，则不添加样式，支持字符串和数组
	 * @replaceProperty 替换后的样式属性值
	 */
	richTextTagAddStyle(html, tag, checkProperties, replaceProperty) {
		// 如果checkProperties为字符串，转成字符串数组
		if (Object.prototype.toString.call(checkProperties) === '[object String]') {
			checkProperties = [checkProperties];
		}
		// 构建正则表达式模式
		var pattern = new RegExp(`<${tag}\\b((?:[^>]*\\s+)?style="[^"]*")?[^>]*>`, 'gi');

		// 查找匹配的标签
		var matches = html.match(pattern);
		// 遍历匹配的标签并替换属性样式
		if (matches) {
			for (var i = 0; i < matches.length; i++) {
				var match = matches[i];
				var styleMatch = match.match(/style="([^"]+)"/i); // 提取标签中的style属性

				if (styleMatch) {
					var styleValue = styleMatch[1];
					var styleProperties = styleValue.split(';');

					// 检查样式属性是否符合要求
					var hasMatchingProperty = false;
					for (var j = 0; j < styleProperties.length; j++) {
						var styleProperty = styleProperties[j].trim();

						// 检查属性名是否完全匹配
						var attributeName = styleProperty.split(':')[0].trim();
						if (checkProperties.includes(attributeName)) {
							hasMatchingProperty = true;
							break;
						}
					}

					// 如果标签匹配且样式属性不符合要求，则替换或添加指定属性的样式
					if (!hasMatchingProperty) {
						var replacedMatch = match.replace(/(style="[^"]*)(")/, `$1${replaceProperty}"`);
						html = html.replace(match, replacedMatch);
					}
				} else {
					// 如果标签中没有样式属性，则添加指定属性的样式
					var replacedMatch = match.replace('>', ` style="${replaceProperty}">`);
					html = html.replace(match, replacedMatch);
				}
			}
		}

		// 返回替换后的HTML文本
		return html;
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
