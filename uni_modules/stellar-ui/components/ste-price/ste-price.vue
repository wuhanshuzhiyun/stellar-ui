<template>
	<view class="ste-price" :style="[computedPagePriceStyle]">
		<span v-if="iconShow" class="unit" :style="[computedUnitStyle]">￥</span>
		<text class="yuan-price" :style="[computedYuanPriceStyle]">{{ computedYuanValue }}</text>
		<text v-if="dataStyleType === 2" class="fen-price" :style="[computedFenPriceStyle]">
			{{ computedFenValue }}
		</text>
	</view>
</template>

<script>
import utils from '@/common/utils.js';
/**
 * @description 金额组件，用来通过金额尺寸，匹配出相对应的单位尺寸，当 fontSize > 34，金额单位fontSize 28,当 28 <= fontSize <= 34，金额单位fontSize 20，当fontSize < 28，金额单位fontSize 16
 * @property {String,Number} value 金额
 * @property {String} valueUnit = [fen|yuan] 金额单位，当为fen（分）时，值除以100
 * @property {String} color 文字颜色
 * @property {String} linePriceColor 划线价文字颜色
 * @property {Number, String} fontSize 尺寸
 * @property {Number, String} lineWeight 行高，默认值为-1，当为-1是，line-height:1
 * @property {Boolean} isSuggestPrice 是否划线价
 */
export default {
	group: '基础组件',
	name: 'ste-price',
	title: 'Price 价格',
	props: {
		// 金额
		value: {
			type: [Number, String],
			default: 0,
		},
		// 金额单位，fen | yuan，当为fen（分）时，值除以100
		valueUnit: {
			type: String,
			default: 'fen',
		},
		// 金额尺寸
		fontSize: {
			type: [Number, String],
			default: 30,
		},
		// 文字颜色
		color: {
			type: String,
			default: '#FF1E19',
		},
		// 划线价颜色
		linePriceColor: {
			type: String,
			default: '#999999',
		},
		// 行高，默认值为-1，当为-1是，line-height:1
		lineWeight: {
			type: [Number, String],
			default: -1,
		},
		// 是否是划线价
		isSuggestPrice: {
			type: Boolean,
			default: false,
		},
		// 左margin
		marginLeft: {
			type: [Number, String],
			default: 0,
		}, // 右margin
		marginRight: {
			type: [Number, String],
			default: 0,
		},
		// 上margin
		marginTop: {
			type: [Number, String],
			default: 0,
		}, // 下margin
		marginBottom: {
			type: [Number, String],
			default: 0,
		},
		// 金额单位和金额尺寸是否一致
		unitFontSize: {
			type: [Number, String],
			default: 'auto',
		},
		// 金额样式 0 跟随信息配置 1 元和角分大小相等（特殊价格） 2 角分小于元（常规价格）
		styleType: {
			type: Number,
			default: 0,
		},
		// 精度，-2 跟随信息配置 -1 不使用精度 0 保留0位小数 1 保留1位小数 2保留2位小数
		digits: {
			type: Number,
			default: -2,
		},
		// 字体是否加粗
		fontWeight: {
			type: String,
			default: 'bold',
		},
		iconShow: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			version: '1.0',
			// 金额样式
			dataStyleType: 1,
			// 精度
			dataDigits: 2,
		};
	},
	created() {
		this.getDataStyleType();
		this.getDataDigits();
	},
	methods: {
		getDataStyleType() {
			// 暂不使用信息配置
			// if (this.styleType === 0) {
			// 	this.dataStyleType = globalData.getSystemProperties().priceStyleType;
			// } else {
			// 	this.dataStyleType = this.styleType;
			// }
			if (![1, 2].includes(this.styleType)) {
				this.dataStyleType = 2;
			} else {
				this.dataStyleType = this.styleType;
			}
		},
		getDataDigits() {
			// 暂不使用信息配置
			// if (this.digits === -2) {
			// 	this.dataDigits = globalData.getSystemProperties().priceStyleDigits;
			// } else {
			// 	this.dataDigits = this.digits;
			// }
			if (this.digits < -1) {
				this.dataDigits = -1;
			} else {
				this.dataDigits = this.digits;
			}
		},
		calcFontSize() {
			let size = utils.addUnit(this.fontSize);
			if (this.dataStyleType == 2) {
				// 常规 - 分元不一致
				if (this.fontSize > 28 && this.fontSize <= 40) {
					size = utils.addUnit(20);
				} else if (this.fontSize > 40) {
					size = utils.addUnit(this.fontSize - 20);
				}
			} else {
				if (this.fontSize <= 40) {
					size = utils.addUnit(20);
				} else {
					size = utils.addUnit(this.fontSize - 20);
				}
			}
			return size;
		},
	},
	computed: {
		computedYuanValue() {
			if (this.valueUnit === 'fen') {
				return utils.fenToYuan(this.value, this.dataDigits, '', this.dataStyleType === 1 ? 0 : 1);
			} else {
				return this.value;
			}
		},
		computedFenValue() {
			if (this.valueUnit === 'fen') {
				return utils.fenToYuan(this.value, this.dataDigits, '', 2);
			} else {
				return this.value;
			}
		},
		computedPagePriceStyle() {
			return {
				// fontSize: utils.addUnit(this.fontSize),
				// textDecoration: this.isSuggestPrice ? 'line-through' : 'none',
				fontWeight: this.isSuggestPrice ? 'normal !important' : this.fontWeight + ' !important',
				lineHeight: this.lineWeight === -1 ? 1 : utils.addUnit(this.lineWeight),
				color: (this.isSuggestPrice ? this.linePriceColor : this.color) + ' !important',
				marginLeft: utils.addUnit(this.marginLeft),
				marginRight: utils.addUnit(this.marginRight),
				marginTop: utils.addUnit(this.marginTop),
				marginBottom: utils.addUnit(this.marginBottom),
			};
		},
		computedUnitStyle() {
			const size = Number(this.fontSize);
			let style = {
				textDecoration: this.isSuggestPrice ? 'line-through' : 'none',
				color: (this.isSuggestPrice ? this.linePriceColor : this.color) + ' !important',
				fontWeight: this.isSuggestPrice ? 'normal !important' : this.fontWeight + ' !important',
			};

			if (this.isSuggestPrice) {
				style.color = this.linePriceColor;
				style.fontWeight = 'normal !important';
				style.fontSize = size + 'rpx';
			} else {
				style.fontSize = this.calcFontSize();
				// if (this.unitFontSize == 'auto') {
				// 	style.fontWeight = this.fontWeight + ' !important';
				// 	style.color = this.color;
				// 	if (size > 34) {
				// 		style.fontSize = '28rpx';
				// 	} else if (size >= 28 && size <= 34) {
				// 		style.fontSize = '20rpx';
				// 	} else {
				// 		style.fontSize = '16rpx';
				// 	}
				// } else {
				// 	style.fontWeight = this.fontWeight + ' !important';
				// 	style.color = this.color;
				// 	style.fontSize = utils.addUnit(this.unitFontSize);
				// }
			}
			return style;
		},
		computedYuanPriceStyle() {
			return {
				fontSize: utils.addUnit(this.fontSize),
				textDecoration: this.isSuggestPrice ? 'line-through' : 'none',
			};
		},
		computedFenPriceStyle() {
			let fontSize = 0;
			if (this.isSuggestPrice) {
				fontSize = utils.addUnit(this.fontSize);
			} else {
				fontSize = this.calcFontSize();
			}
			return {
				fontSize: fontSize,
				textDecoration: this.isSuggestPrice ? 'line-through' : 'none',
			};
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-price {
	display: inline-block;
	vertical-align: middle;
	overflow: hidden; // 解决ios会产生文字高亮等兼容性问题，导致color样式失效问题
	.unit {
		vertical-align: baseline;
	}
	.yuan-price {
	}
}
</style>
