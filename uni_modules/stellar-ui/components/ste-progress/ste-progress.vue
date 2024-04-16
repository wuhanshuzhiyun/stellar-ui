<template>
	<view class="ste-progress-root" :style="[cmpRootCssVar]">
		<view class="inactive-box" :style="[cmpInactiveStyle]"></view>
		<view class="active-box line" :style="[cmpActiveStyle]" v-if="realPercentage > 0">
			<slot v-if="haveSlot"></slot>
			<text class="text" v-else>{{ cmpActiveText }}</text>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-progress 进度条
 * @description 进度条组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-progress
 * @property {String} activeBg 进度条激活部分的背景	 默认值 #0090ff
 * @property {String} inactiveBg 进度条未激活部分的背景	 默认值 #eeeeee
 * @property {Number} percentage 进度条百分比	默认值 0
 * @property {Number|String} strokeWidth 进度条的粗细，默认单位rpx	默认值 24
 * @property {Boolean} disabled 是否禁用状态 默认 false
 * @property {Number|String} width 进度条宽度 默认值 100%
 * @property {Number} duration 进度条动画执行时间，单位秒，设置为 0 可以禁用动画 	默认值 0.3
 * @property {String} pivotText 进度文字内容
 * @property {String} textColor 进度文字颜色		默认 #ffffff
 * @property {String} textAlign 文本对齐方式		默认 right
 * @property {String} textSize 文本字体大小，默认单位rpx		默认 16
 * @property {Number} textSize 默认文本显示阈值	默认 0
 */
const MIN = 0;
const MAX = 100;
export default {
	group: '数据组件',
	title: 'Progress 进度条',
	name: 'ste-progress',
	props: {
		activeBg: {
			type: String,
			default: '#0090ff',
		},
		inactiveBg: {
			type: String,
			default: '#eeeeee',
		},
		percentage: {
			type: Number,
			default: 0,
		},
		strokeWidth: {
			type: [String, Number],
			default: 24,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		width: {
			type: [String, Number],
			default: '100%',
		},
		duration: {
			type: Number,
			default: 0.3,
		},
		pivotText: {
			type: String,
			default: '',
		},
		textColor: {
			type: String,
			default: '#ffffff',
		},
		textAlign: {
			type: String,
			default: 'right',
		},
		textSize: {
			type: [String, Number],
			default: 16,
		},
		displayTextThreshold: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			realPercentage: 0,
			haveSlot: false,
		};
	},
	created() {},
	mounted() {
		this.haveSlot = this.$slots.default;
	},
	computed: {
		cmpRootCssVar() {
			const style = {
				'--progress-width': utils.addUnit(this.width),
				'--progress-height': utils.addUnit(this.strokeWidth),
				// #ifdef MP-WEIXIN || MP-ALIPAY
				'--progress-padding': this.$slots.default ? '0' : '0 16rpx',
				// #endif
				// #ifdef H5
				'--progress-padding': this.$slots.default ? '0' : '0 8px',
				// #endif
				'--active-width': this.realPercentage + '%',
				'--active-text-align': this.textAlign == 'right' ? 'flex-end' : this.textAlign,
				'--active-text-color': this.textColor,
				'--active-text-font-size': utils.addUnit(this.textSize),
				'--active-transition-duration': `${this.duration}s`,
			};
			return style;
		},
		cmpInactiveStyle() {
			let style = {};
			if (this.disabled) {
				style.backgroundColor = '#eeeeee';
			} else {
				const bg = utils.bg2style(this.inactiveBg);
				style = { ...style, ...bg };
			}
			return style;
		},
		cmpActiveStyle() {
			let style = {};
			if (this.disabled) {
				style.backgroundColor = '#cccccc';
			} else {
				const bg = utils.bg2style(this.activeBg);
				style = { ...style, ...bg };
			}
			return style;
		},
		cmpActiveText() {
			let str = this.pivotText ? this.pivotText : this.realPercentage <= MIN ? '' : `${this.realPercentage}%`;
			if (this.displayTextThreshold > 0 && this.realPercentage < this.displayTextThreshold) {
				return '';
			}
			return str;
		},
	},
	watch: {
		percentage: {
			handler(val) {
				if (this.percentage >= MAX) {
					this.realPercentage = MAX;
				} else if (this.percentage <= MIN) {
					this.realPercentage = MIN;
				} else {
					this.realPercentage = val;
				}
			},
			immediate: true,
		},
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.ste-progress-root {
	position: relative;
	width: var(--progress-width);
	height: var(--progress-height);

	> view {
		width: var(--progress-width);
		height: var(--progress-height);
		border-radius: 24rpx;

		background-repeat: repeat;
		background-size: contain;
	}

	.active-box {
		width: var(--active-width);
		position: absolute;
		left: 0;
		top: 0;

		display: flex;
		align-items: center;
		justify-content: var(--active-text-align);
		padding: var(--progress-padding);

		transition: width var(--active-transition-duration) ease;

		.text {
			color: var(--active-text-color);
			font-size: var(--active-text-font-size);
			vertical-align: middle;
			line-height: 0;
		}
	}
}
</style>
