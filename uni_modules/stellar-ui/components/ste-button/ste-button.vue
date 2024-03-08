<template>
	<button
		class="ste-button--root"
		:hover-class="!disabled && !loading ? 'ste-button--root-active' : ''"
		@click.stop="handleClick"
		:style="[cmpBtnStyle]"
	>
		<view class="btn-box">
			<text v-if="loading">加载中.......</text>
			<slot v-else></slot>
		</view>
	</button>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-button 按钮
 * @description 按钮组件
 * @tutorial http://172.16.114.51:5050/pc/index/index?name=ste-button
 * @property {Number} mode 尺寸 默认值 200
 * @value 100 小 {Number}
 * @value 200 中 {Number}
 * @value 300 大 {Number}
 * @value 400 超大 {Number}
 * @property {String} color 文本颜色 默认值 #ffffff
 * @property {String} background 背景 默认值 #0091ff
 * @property {String} borderColor 边框颜色
 * @property {Number|String} width 宽度 默认值 auto
 * @value auto 自适应宽度 {String}
 * @value 100% 填满 {String}
 * @value {{Number}}  自适应宽度，单位rpx {Number}
 * @property {Boolean} round 是否圆角按钮 默认 true
 * @property {Boolean} disabled 是否禁用状态 默认 false
 * @property {Boolean} loading 是否加载中状态 默认 false
 * @event {Function} click 非禁止并且非加载中，才能点击
 */
export default {
	group: '基础组件',
	title: 'Button 按钮',
	name: 'ste-button',
	props: {
		mode: {
			type: Number,
			default: 200,
		},
		color: {
			type: String,
			default: '#ffffff',
		},
		background: {
			type: String,
			default: '#0091FF',
		},
		borderColor: {
			type: String,
			default: '',
		},
		width: {
			type: [String, Number],
			default: 'auto',
		},
		round: {
			type: Boolean,
			default: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		loading: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {};
	},
	created() {},
	computed: {
		cmpBtnStyle() {
			let style = {};
			// 为解决支付宝动态类名时不兼容，尽量使用内联样式

			// 圆角 round
			if (this.round) {
				style.borderRadius = utils.addUnit(48);
			}

			// 宽度 width
			if (this.width == '100%' || this.width == 'auto') {
				style.width = this.width;
			} else {
				style.width = utils.addUnit(this.width);
			}

			// 边框色 borderColor
			if (this.borderColor) {
				style.border = 'solid 2rpx';
				style.borderColor = this.borderColor;
			}

			// 类型 mode
			switch (this.mode) {
				case 100:
					style.padding = '0 30rpx';
					style.height = '48rpx';
					style.fontSize = '24rpx';
					break;
				case 300:
					style.padding = '0 72rpx';
					style.height = '80rpx';
					style.fontSize = '32rpx';
					break;
				case 400:
					style.padding = '0 72rpx';
					style.height = '96rpx';
					style.fontSize = '36rpx';
					break;
				default:
					style.padding = '0 40rpx';
					style.height = '68rpx';
					style.fontSize = '28rpx';
					break;
			}

			// 背景色 & 字体色
			style = { ...style, ...utils.bg2style(this.background) };
			style.color = this.color;

			// 禁用 disabled
			if (this.disabled) {
				if (this.background == '#0091FF') {
					style.backgroundColor = '#666666';
				}
				style.color = '#ffffff';
				style.cursor = 'not-allowed';
			}

			// 加载 loading
			if (this.loading) {
				style.cursor = 'not-allowed';
			}

			return style;
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
.ste-button--root {
	position: relative;
	align-items: center;
	justify-content: center;
	display: inline-flex;
	flex-direction: row;
	box-sizing: border-box;
	flex-direction: row;
	background-size: cover;
	border-radius: 10rpx;

	.btn-box {
		width: 100%;
		white-space: nowrap;
		line-height: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&:before {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		border: inherit;
		border-radius: inherit;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		opacity: 0;
		content: ' ';
		background-color: #000;
		border-color: #000;
	}

	&-disabled {
		background: #666666;
		color: #ffffff;

		cursor: not-allowed;
	}

	&-loading {
		cursor: not-allowed;
	}

	&-active {
		&:before {
			opacity: 0.15;
		}
	}

	&-100 {
		padding: 0 30rpx;
		height: 48rpx;
		font-size: 24rpx;
	}

	&-200 {
		padding: 0 40rpx;
		height: 68rpx;
		font-size: 28rpx;
	}

	&-300 {
		padding: 0 72rpx;
		height: 80rpx;
		font-size: 32rpx;
	}

	&-400 {
		padding: 0 72rpx;
		height: 96rpx;
		font-size: 36rpx;
	}
}
</style>
