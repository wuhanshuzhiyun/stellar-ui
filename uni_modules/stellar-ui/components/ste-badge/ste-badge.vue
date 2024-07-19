<template>
	<view class="ste-badge-root" :style="[rootStyle, { display: isInline ? 'inline-block' : 'block' }]">
		<view
			class="ste-badge-content"
			:style="[cmpContentStyle]"
			:class="'ste-badge-' + position"
			v-if="showDot || cmpShowContent || $slots.content"
		>
			<view v-if="showDot" class="dot-box" />
			<view
				v-else
				class="content-box"
				:class="{ 'no-padding': $slots.content || (content && (content.length == 1 || content < 10)) }"
			>
				<slot name="content">
					<view class="ste-badge-content-text">{{ cmpContent }}</view>
				</slot>
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-badge 徽标
 * @description 徽标组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-badge
 * @property {Number|String} content 徽标内容
 * @property {String} background 背景 默认 #ee0a24
 * @property {Boolean} showDot 是否展示为小红点 默认 false
 * @property {Number|String} offsetX 根据徽标位置,设置x轴偏移量 默认 auto
 * @property {Number|String} offsetY 根据徽标位置,设置y轴偏移量 默认 auto
 * @property {Boolean} showZero 当 content 为数字 0，是否展示徽标，默认 false
 * @property {String} position 徽标位置 默认 topRight
 * @value topRight 上右 {String}
 * @value topLeft 上左 {String}
 * @value bottomLeft 下左 {String}
 * @value bottomRight 下右 {String}
 * @property {Number} max 徽标最大显示值 默认 99
 * @property {Boolean} showBorder 是否显示边框 默认 false
 * @property {String} borderColor 边框颜色
 * @property {Number} zIndex 层级 默认 2
 * @property {Boolean} isInline display属性是否为inline-block 默认 false
 */

export default {
	group: '基础组件',
	title: 'Badge 徽标',
	name: 'ste-badge',
	options: {
		virtualHost: true,
	},
	props: {
		content: {
			type: [String, Number],
			default: '',
		},
		background: {
			type: String,
			default: '#ee0a24',
		},
		showDot: {
			type: Boolean,
			default: false,
		},
		offsetX: {
			type: [String, Number],
			default: 'auto',
		},
		offsetY: {
			type: [String, Number],
			default: 'auto',
		},
		showZero: {
			type: Boolean,
			default: false,
		},
		position: {
			type: String,
			default: 'topRight',
		},
		max: {
			type: Number,
			default: 99,
		},
		showBorder: {
			type: Boolean,
			default: false,
		},
		borderColor: {
			type: String,
			default: '#fff',
		},
		zIndex: {
			type: Number,
			default: 2,
		},
		isInline: {
			type: Boolean,
			default: false,
		},
		rootStyle: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {};
	},
	created() {},
	computed: {
		cmpContentStyle() {
			let style = {};
			if (this.background) {
				style = { backgroundColor: 'transparent', ...utils.bg2style(this.background) };
			}
			if (this.offsetX != 'auto' || this.offsetY != 'auto' || this.offsetX == 0 || this.offsetY == 0) {
				style.transform = 'translate(0,0)';

				switch (this.position) {
					case 'topLeft':
						style.left = utils.addUnit(this.offsetX);
						style.top = utils.addUnit(this.offsetY);
						break;
					case 'bottomLeft':
						style.left = utils.addUnit(this.offsetX);
						style.bottom = utils.addUnit(this.offsetY);
						break;
					case 'bottomRight':
						style.right = utils.addUnit(this.offsetX);
						style.bottom = utils.addUnit(this.offsetY);
						break;
					default:
						style.right = utils.addUnit(this.offsetX);
						style.top = utils.addUnit(this.offsetY);
						break;
				}
			}
			if (this.showBorder) {
				style.border = 'solid 1px ' + this.borderColor;
			}
			style['z-index'] = this.zIndex;

			return style;
		},
		cmpShowContent() {
			return this.showZero ? true : this.content && this.content != '0';
		},
		cmpContent() {
			if (utils.isNumber(this.content) && this.content > this.max) {
				return `${this.max}+`;
			} else {
				return String(this.content);
			}
		},
	},
	methods: {
		handleClick(e) {
			if (!this.disabled && !this.loading) {
				this.$emit('click');
			}
		},
	},
};
</script>

<style lang="scss" scoped>
$default-size: 28rpx;
.ste-badge-root {
	position: relative;

	.ste-badge-content {
		display: inline-block;
		position: absolute;
		font-size: 24rpx;
		color: #ffffff;
		background-color: #ee0a24;
		border-radius: 99999rpx;
		width: fit-content;
		background-size: cover;

		.content-box {
			display: flex;
			align-items: center;
			justify-content: center;
			height: $default-size;
			max-height: $default-size;
			min-height: $default-size;
			width: auto;
			min-width: $default-size;
			overflow: hidden;

			padding: 0 8rpx;
			line-height: 0;

			&.no-padding {
				padding: 0;
			}
		}

		.dot-box {
			height: 12rpx;
			width: 12rpx;
		}

		&-text {
			font-size: 22rpx;
			color: #ffffff;
			line-height: $default-size;
			vertical-align: middle;
			position: relative;
			// #ifdef  H5
			top: -0.5rpx;
			// #endif
			// #ifdef  MP-WEIXIN
			// top: -0.5rpx;
			// #endif
			// #ifdef  MP-ALIPAY
			// top: 0.5rpx;
			// #endif
		}
	}

	.ste-badge- {
		&topRight {
			top: 0;
			right: 0;
			transform: translate(50%, -50%);
		}
		&topLeft {
			top: 0;
			left: 0;
			transform: translate(-50%, -50%);
		}
		&bottomLeft {
			bottom: 0;
			left: 0;
			transform: translate(-50%, 50%);
		}
		&bottomRight {
			bottom: 0;
			right: 0;
			transform: translate(50%, 50%);
		}
	}
}
</style>
