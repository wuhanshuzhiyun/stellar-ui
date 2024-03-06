<template>
	<button
		class="ste-button--root"
		:class="cmpRootClass"
		:hover-class="!disabled && !loading ? 'ste-button--root-active' : ''"
		@click="handleClick"
		:style="[cmpBtnCss]"
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
		cmpRootClass() {
			const classArr = [];
			const prefix = 'ste-button--root';
			if ([100, 200, 300, 400].includes(this.mode)) {
				classArr.push(`${prefix}-${this.mode}`);
			} else {
				classArr.push(`${prefix}-200`);
			}

			if (this.disabled) {
				classArr.push(`${prefix}-disabled`);
			}

			if (this.loading) {
				classArr.push(`${prefix}-loading`);
			}

			if (this.round) {
				classArr.push(`${prefix}-round`);
			}
			return (
				classArr
					// #ifdef MP-ALIPAY || MP-TOUTIAO || MP-LARK
					.join(' ')
			);
			// #endif
		},
		cmpBtnCss() {
			let style = {};

			if (this.round) {
				style.borderRadius = utils.addUnit(48);
			}

			if (this.width == '100%' || this.width == 'auto') {
				style.width = this.width;
			} else {
				style.width = utils.addUnit(this.width);
			}

			if (!this.disabled) {
				style = { ...style, ...utils.bg2style(this.background) };
				style.color = this.color;
			}

			if (this.borderColor) {
				style.border = 'solid 2rpx';
				style.borderColor = this.borderColor;
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
