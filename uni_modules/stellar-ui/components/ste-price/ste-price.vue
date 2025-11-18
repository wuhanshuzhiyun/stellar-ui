<template>
	<view class="ste-price-root">
		<view class="content" :style="[cmpPriceStyle]">
			<text v-if="showUnit" class="unit" :style="[cmpUnitStyle]">{{ unitSymbol }}</text>
			<text class="yuan-price" :style="[cmpYuanPriceStyle]">{{ cmpYuanValue }}</text>
			<text v-if="valueUnit === 'fen'" class="fen-price" :style="[cmpFenPriceStyle]">
				{{ cmpFenValue }}
			</text>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-price 价格
 * @description 金额组件
 * @tutorial https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui&menu=%E7%BB%84%E4%BB%B6&active=ste-price
 * @property {Number|String} value 金额 默认值 0
 * @property {String} valueUnit 金额单位
 * @value fen 分(默认值){String}
 * @value yuan 元{String}
 * @property {Boolean} showUnit 是否显示符号
 * @property {String} unitSymbol 符号标记，默认值 ¥
 * @property {Number} digits 精度 默认值 -1
 * @value -1 不处理（默认值）{Number}
 * @value 0 取整（四舍五入）{Number}
 * @value 1 保留1位小数（四舍五入）{Number}
 * @value 2 保留2位小数（四舍五入）{Number}
 * @property {Number|String} fontSize 金额文字尺寸 默认值 30
 * @property {String} color 文字颜色 默认值 #ff1e19
 * @property {String} linePriceColor 划线价文字颜色 默认值 #999999
 * @property {Number|String} lineHeight 行高，Number，单位rpx，String，同原生 默认值 1
 * @property {Boolean} isSuggestPrice 是否划线价 默认值 false
 * @property {Number|String} marginLeft 左边距	 默认值 0
 * @property {Number|String} marginRight 右边距	 默认值 0
 * @property {Number|String} marginTop 上边距	 默认值 0
 * @property {Number|String} marginBottom 下边距	 默认值 0
 * @property {Number} styleType 金额样式	 默认值 2
 * @property {Boolean} bold 是否加粗 默认值 false
 * @property {Function(value)} formatter 用来格式化内容
 */
export default {
	group: '电商组件',
	title: 'Price 价格',
	name: 'ste-price',
	props: {
		// 金额
		value: {
			type: [Number, String, null],
			default: 0,
		},
		// 金额单位，fen | yuan，当为fen（分）时，值除以100
		valueUnit: {
			type: [String, null],
			default: 'fen',
		},
		// 精度 -1 不使用精度 0 保留0位小数 1 保留1位小数 2保留2位小数
		digits: {
			type: [Number, null],
			default: -1,
		},
		// 是否显示单位符号
		showUnit: {
			type: [Boolean, null],
			default: true,
		},
		// 单位符号
		unitSymbol: {
			type: [String, null],
			default: '¥',
		},
		// 金额文字尺寸
		fontSize: {
			type: [Number, String, null],
			default: 30,
		},
		// 金额文字颜
		color: {
			type: [String, null, null],
			default: '#FF1E19',
		},
		// 划线价颜色
		linePriceColor: {
			type: [String, null, null],
			default: '#999999',
		},
		// 行高，默认值为-1，当为-1是，line-height:1
		lineHeight: {
			type: [Number, String, null],
			default: -1,
		},
		// 是否是划线价
		isSuggestPrice: {
			type: [Boolean, null],
			default: false,
		},
		// 左margin
		marginLeft: {
			type: [Number, String, null],
			default: 0,
		}, // 右margin
		marginRight: {
			type: [Number, String, null],
			default: 0,
		},
		// 上margin
		marginTop: {
			type: [Number, String, null],
			default: 0,
		}, // 下margin
		marginBottom: {
			type: [Number, String, null],
			default: 0,
		},
		// 金额样式 1 元和角分大小相等（特殊价格） 2 角分小于元（常规价格）3 价格符号和角，分相等
		styleType: {
			type: [Number, null],
			default: 2,
		},
		bold: {
			type: [Boolean, null],
			default: false,
		},
		// 过滤器
		formatter: {
			type: [Function, null],
			default: undefined,
		},
	},
	data() {
		return {};
	},
	computed: {
		cmpValue() {
			if (this.formatter && typeof this.formatter === 'function') {
				return this.formatter(this.value);
			}

			let value = this.value;
			if (this.valueUnit == 'fen') {
				value = utils.fenToYuan(this.value, -1, '', 0);
			}
			if (this.digits == -1) {
				value = Number.parseFloat(Number(value)).toString();
			} else {
				value = Number(value).toFixed(this.digits).toString();
			}
			return value;
		},
		cmpYuanValue() {
			if (this.cmpValue) {
				if (this.cmpValue.indexOf('.') > -1) {
					return this.cmpValue.split('.')[0];
				} else {
					return this.cmpValue;
				}
			} else {
				return utils.fenToYuan(this.value, -1, '', 1);
			}
		},
		cmpFenValue() {
			if (this.cmpValue) {
				if (this.cmpValue.indexOf('.') > -1) {
					return '.' + this.cmpValue.split('.')[1];
				}
				return '';
			} else {
				return utils.fenToYuan(this.value, -1, '', 2);
			}
		},
		cmpPriceStyle() {
			return {
				lineHeight: this.lineHeight === -1 ? 0.8 : utils.formatPx(this.lineHeight),
				color: (this.isSuggestPrice ? this.linePriceColor : this.color) + ' !important',
				marginLeft: utils.formatPx(this.marginLeft),
				marginRight: utils.formatPx(this.marginRight),
				marginTop: utils.formatPx(this.marginTop),
				marginBottom: utils.formatPx(this.marginBottom),
				fontWeight: this.bold ? 'bold' : 'normal',
			};
		},
		cmpUnitStyle() {
			let style = {
				textDecoration: this.isSuggestPrice ? 'line-through' : 'none',
				color: (this.isSuggestPrice ? this.linePriceColor : this.color) + ' !important',
			};

			if (this.isSuggestPrice) {
				style.color = this.linePriceColor;
				style.fontSize = utils.formatPx(this.fontSize);
			} else {
				style.fontSize = this.calcFontSize();
			}
			return style;
		},
		cmpYuanPriceStyle() {
			return {
				fontSize: utils.formatPx(this.fontSize),
				textDecoration: this.isSuggestPrice ? 'line-through' : 'none',
			};
		},
		cmpFenPriceStyle() {
			let fontSize = 0;
			if (this.isSuggestPrice) {
				fontSize = utils.formatPx(this.fontSize);
			} else {
				if (this.styleType == 2) {
					fontSize = this.calcFontSize();
				} else {
					fontSize = utils.formatPx(this.fontSize);
				}
			}
			return {
				fontSize,
				textDecoration: this.isSuggestPrice ? 'line-through' : 'none',
			};
		},
	},
	methods: {
		calcFontSize() {
			let size = utils.formatPx(this.fontSize);
			if (this.styleType == 1) {
				if (this.fontSize <= 40) {
					size = utils.formatPx(20);
				} else {
					size = utils.formatPx(this.fontSize - 20);
				}
			} else if (this.styleType == 3) {
				size = utils.formatPx(this.fontSize);
			} else {
				// 常规 - 分元不一致
				if (this.fontSize > 28 && this.fontSize <= 40) {
					size = utils.formatPx(20);
				} else if (this.fontSize > 40) {
					size = utils.formatPx(this.fontSize - 20);
				}
			}
			return size;
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-price-root {
	display: inline-flex;
	.content {
		display: inline-block;
		vertical-align: bottom;
	}
	.unit {
		vertical-align: baseline;
	}
	.yuan-price {
	}
}
</style>
