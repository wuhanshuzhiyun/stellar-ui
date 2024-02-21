<template>
	<button :class="bemClass" :hover-class="!disabled ? 'ste-button--active' : ''" :style="[baseColor]">
		<view class="u-button__text" :style="[{ fontSize: textSize + 'px' }]">
			<slot></slot>
		</view>
	</button>
</template>

<script>
import utils from '@/common/utils';
import props from './props.js';
import mixin from '../../libs/mixin/mixin.js';

/**
 * 按钮组件
 * @description 按钮组件
 * @tutorial pc/index/index?name=ste-button
 * @event {(e:MouseEvent)=>void} click 点击事件
 * @example <ste-button>按钮</ste-button>
 *
 **/
export default {
	group: '基础组件',
	title: 'Button 按钮',
	name: 'ste-button',
	mixins: [mixin, props],
	created() {},
	computed: {
		// 生成bem风格的类名
		bemClass() {
			// this.bem为一个computed变量，在mixin中
			return this.bem('button', ['type', 'shape', 'size'], ['disabled', 'plain', 'hairline']);
		},
		textSize() {
			let fontSize = 14,
				{ size } = this;
			if (size === 'large') fontSize = 16;
			if (size === 'normal') fontSize = 14;
			if (size === 'small') fontSize = 12;
			if (size === 'mini') fontSize = 10;
			return fontSize;
		},
		baseColor() {
			let style = {};
			if (this.color) {
				// 针对自定义了color颜色的情况，镂空状态下，就是用自定义的颜色
				style.color = this.plain ? this.color : 'white';
				if (!this.plain) {
					// 非镂空，背景色使用自定义的颜色
					style['background-color'] = this.color;
				}
				if (this.color.indexOf('gradient') !== -1) {
					// 如果自定义的颜色为渐变色，不显示边框，以及通过backgroundImage设置渐变色
					// weex文档说明可以写borderWidth的形式，为什么这里需要分开写？
					// 因为weex是阿里巴巴为了部门业绩考核而做的你懂的东西，所以需要这么写才有效
					style.borderTopWidth = 0;
					style.borderRightWidth = 0;
					style.borderBottomWidth = 0;
					style.borderLeftWidth = 0;
					if (!this.plain) {
						style.backgroundImage = this.color;
					}
				} else {
					// 非渐变色，则设置边框相关的属性
					style.borderColor = this.color;
					style.borderWidth = '1px';
					style.borderStyle = 'solid';
				}
			}
			return style;
		},
	},
	methods: {
		click(e) {
			if (this.computedType != 'disabled') {
				this.$emit('click', e);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-button {
	height: 40px;
	position: relative;
	align-items: center;
	justify-content: center;
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
	flex-direction: row;

	width: 100%;

	&::after {
		border: none;
	}

	&__text {
		white-space: nowrap;
		line-height: 1;
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

	&--active {
		&:before {
			opacity: 0.15;
		}
	}

	&--large {
		width: 100%;
		height: 50px;
		padding: 0 15px;
	}

	&--normal {
		padding: 0 12px;
		font-size: 14px;
	}

	&--small {
		min-width: 60px;
		height: 30px;
		padding: 0 8px;
		font-size: 12px;
	}

	&--mini {
		height: 22px;
		font-size: 10px;
		min-width: 50px;
		padding: 0 8px;
	}

	&--disabled {
		opacity: 0.5;
	}

	&--info {
		color: #323233;
		background-color: #fff;

		border: 1px;
		border-color: #ebedf0;
		border-style: solid;
	}

	&--success {
		color: #fff;
		background-color: #5ac725;

		border: 1px solid #5ac725;
	}

	&--primary {
		color: #fff;
		background-color: #3c9cff;

		border: 1px solid #3c9cff;
	}

	&--error {
		color: #fff;
		background-color: #f56c6c;

		border: 1px solid #f56c6c;
	}

	&--warning {
		color: #fff;
		background-color: #f9ae3d;

		border: 1px solid #f9ae3d;
	}

	&--square {
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	&--circle {
		border-top-right-radius: 100px;
		border-top-left-radius: 100px;
		border-bottom-left-radius: 100px;
		border-bottom-right-radius: 100px;
	}

	&--plain {
		background-color: #fff;
	}

	&--hairline {
		border-width: 0.5px !important;
	}

	&--plain {
		&.ste-button--primary {
			color: #3c9cff;
		}
	}

	&--plain {
		&.ste-button--info {
			color: #909399;
		}
	}

	&--plain {
		&.ste-button--success {
			color: #5ac725;
		}
	}

	&--plain {
		&.ste-button--error {
			color: #f56c6c;
		}
	}

	&--plain {
		&.ste-button--warning {
			color: #f9ae3d;
		}
	}
}
</style>
