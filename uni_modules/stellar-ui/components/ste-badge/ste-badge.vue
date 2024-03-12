<template>
	<view class="ste-badge--root">
		<view
			class="ste-badge--content"
			:style="[cmpContentStyle]"
			:class="'ste-badge--' + position"
			v-if="cmpShowContent"
		>
			<view v-if="showDot" class="dot-box" />
			<view v-else class="content-box">
				<slot name="content">
					<text class="ste-badge--content-text">{{ content }}</text>
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
 * @property {Number|String} content 徽标内容
 * @property {String} background 背景 默认 #ee0a24
 * @property {Boolean} showDot 是否展示为小红点 默认 true
 * @property {Number|String} offsetX x轴偏移量 默认 auto
 * @property {Number|String} offsetY y轴偏移量 默认 auto
 * @property {Boolean} showZero 当 content 为数字 0 或字符串 '0' 时，是否展示徽标 默认 true
 * @property {String} position 徽标位置 默认 topRight
 * @value topRight 上右 {String}
 * @value topLeft 上左 {String}
 * @value bottomLeft 下左 {String}
 * @value bottomRight 下右 {String}
 */

// v-if="this.showZero ? true : this.content && this.content != 0"
export default {
	group: '基础组件',
	title: 'Badge 徽标',
	name: 'ste-badge',
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
			default: true,
		},
		offsetX: {
			type: [String, Number],
			default: undefined,
		},
		offsetY: {
			type: [String, Number],
			default: undefined,
		},
		showZero: {
			type: Boolean,
			default: true,
		},
		position: {
			type: String,
			default: 'topRight',
		},
	},
	data() {
		return {};
	},
	created() {},
	computed: {
		cmpContentStyle() {
			let style = utils.bg2style(this.background);
			if (this.offsetX || this.offsetY || this.offsetX == 0 || this.offsetY == 0) {
				style.transform = 'translate(0,0)';
				style.left = utils.addUnit(this.offsetX);
				style.top = utils.addUnit(this.offsetY);
			}

			return style;
		},
		cmpShowContent() {
			return this.showZero ? true : this.content && this.content != 0;
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
.ste-badge--root {
	position: relative;

	.ste-badge--content {
		display: inline-block;
		position: absolute;
		font-size: 24rpx;
		color: #ffffff;
		background-color: #ee0a24;
		border-radius: 999rpx;
		width: fit-content;
		line-height: 0;
		.content-box {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 26rpx;
			width: auto;
			min-width: 26rpx;

			padding: 0 4rpx;
			line-height: 0;
		}

		.dot-box {
			height: 12rpx;
			width: 12rpx;
		}

		&-text {
			font-size: 22rpx;
			color: #ffffff;
			line-height: 0;

			position: relative;
			top: -1rpx;
		}
	}

	.ste-badge-- {
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
