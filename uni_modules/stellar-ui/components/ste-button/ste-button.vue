<template>
	<button
		class="root"
		:class="comRootClass"
		:hover-class="!disabled ? 'root-active' : ''"
		@click="handleClick"
		:style="[comBtnCss]"
	>
		<view class="btn-box">
			<slot></slot>
		</view>
	</button>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-button 按钮
 * @description 按钮组件
 * @tutorial http://172.16.114.51:5050/pc/index/index?name=ste-button
 * @property {Number} mode 尺寸
 * @value 100 Number 小
 * @value 200 Number 中
 * @value 300 Number 大
 * @value 400 Number 超大
 * @property {String} color 文本颜色
 * @property {String} background 背景
 * @property {String} borderColor 边框颜色
 * @property {Number|String} width 宽度
 * @value auto String 自适应宽度
 * @value 100% String 填满
 * @value {{Number}} Number 自适应宽度，单位rpx
 * @property {Boolean} round 是否圆角按钮
 * @property {Boolean} disabled 是否禁用状态
 * @property {Boolean} loading 是否加载中状态
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
		comRootClass() {
			const classArr = [];
			if ([100, 200, 300, 400].includes(this.mode)) {
				classArr.push(`root-${this.mode}`);
			} else {
				classArr.push('root-200');
			}

			if (this.disabled) {
				classArr.push(`root-disabled`);
			}

			if (this.loading) {
				classArr.push(`root-loading`);
			}

			if (this.round) {
				classArr.push(`root-round`);
			}
			return classArr;
		},
		comBtnCss() {
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
				// 判断是否为图片路径
				if (this.background.startsWith('http') || this.background.startsWith('/')) {
					style.backgroundImage = `url(${this.background})`;
				}
				// 判断是否为渐变色
				else if (this.background.includes('gradient')) {
					style.backgroundImage = this.background;
				}
				// 默认为纯颜色
				else {
					style.backgroundColor = this.background;
				}

				// style = { ...style, ...utils.bg2style(this.background) };
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
				this.$emit('click', e);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.root {
	position: relative;
	align-items: center;
	justify-content: center;
	display: inline-flex;
	flex-direction: row;
	box-sizing: border-box;
	flex-direction: row;

	background-size: cover;

	.btn-box {
		// display: inline-flex;
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
		height: 58rpx;
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
		font-size: 60rpx;
	}
}
</style>
