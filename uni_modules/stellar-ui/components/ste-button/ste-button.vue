<template>
	<button
		:class="btnClass"
		:hover-class="!disabled ? 'ste-button--active' : ''"
		:style="[baseColor]"
		:open-type="openType"
		@tap="thro(handleClick, { delay: throttleTime })"
	>
		<view class="ste-button-text" :style="[{ fontSize: textSize + 'px' }]">
			<slot></slot>
		</view>
	</button>
</template>

<script>
import utils from '@/common/utils';
/**
 * button 按钮
 * @description Button 按钮
 * @tutorial /pc/index/index?name=ste-button
 *
 * @property {Boolean}			hairline				是否显示按钮的细边框 (默认 true )
 * @property {String}			type					按钮的预置样式，info，primary，error，warning，success (默认 'info' )
 * @property {String}			size					按钮尺寸，large，normal，mini （默认 normal）
 * @property {String}			shape					按钮形状，circle（两边为半圆），square（带圆角） （默认 'square' ）
 * @property {Boolean}			plain					按钮是否镂空，背景色透明 （默认 false）
 * @property {Boolean}			disabled				是否禁用 （默认 false）
 * @property {String}			color					按钮颜色，支持传入linear-gradient渐变色
 *
 * @event {Function}	click			非禁止并且非加载中，才能点击
 * @example <ste-button>按钮</ste-button>
 */
export default {
	group: '基础组件',
	title: 'Button 按钮',
	name: 'ste-button',
	props: {
		// 是否细边框
		hairline: {
			type: [Boolean, String],
			default: true,
		},
		// 按钮的预置样式，info，primary，error，warning，success
		type: {
			type: String,
			default: 'info',
		},
		// 按钮尺寸，large，normal，small，mini
		size: {
			type: String,
			default: 'normal',
		},
		// 按钮形状，circle（两边为半圆），square（带圆角）
		shape: {
			type: String,
			default: 'square',
		},
		// 按钮是否镂空
		plain: {
			type: [Boolean, String],
			default: false,
		},
		// 是否禁止状态
		disabled: {
			type: [Boolean, String],
			default: false,
		},
		// 按钮颜色，支持传入linear-gradient渐变色
		color: {
			type: String,
			default: '',
		},
		// 开放能力，具体请看uniapp稳定关于button组件部分说明
		// https://uniapp.dcloud.io/component/button
		openType: {
			type: String,
			default: '',
		},
		// 节流，一定时间内只能触发一次
		throttleTime: {
			type: [String, Number],
			default: 0,
		},
	},
	data() {
		return {};
	},
	created() {},
	computed: {
		btnClass() {
			const prefix = 'ste-button';
			const classArr = [prefix, `${prefix}-${this.type}`, `${prefix}-${this.shape}`, `${prefix}-${this.size}`];
			if (this.disabled) {
				classArr.push(`${prefix}-disabled`);
			}
			if (this.hairline) {
				classArr.push(`${prefix}-hairline`);
			}
			if (this.plain) {
				classArr.push(`${prefix}-plain`);
			}
			return classArr;
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
		thro: utils.thro,
		handleClick(e) {
			if (!this.disabled) {
				this.$emit('click', e);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
$ste-success-color: #5ac725;
$ste-error-color: #f56c6c;
$ste-primary-color: #3c9cff;
$ste-warning-color: #f9ae3d;

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

	&-text {
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

	&-large {
		width: 100%;
		height: 50px;
		padding: 0 15px;
	}

	&-normal {
		padding: 0 12px;
		font-size: 14px;
	}

	&-small {
		min-width: 60px;
		height: 30px;
		padding: 0 8px;
		font-size: 12px;
	}

	&-mini {
		height: 22px;
		font-size: 10px;
		min-width: 50px;
		padding: 0 8px;
	}

	&-disabled {
		opacity: 0.5;
	}

	&-info {
		color: #323233;
		background-color: #fff;

		border: 1px;
		border-color: #ebedf0;
		border-style: solid;
	}

	&-success {
		color: #fff;
		background-color: $ste-success-color;

		border: 1px solid $ste-success-color;
	}

	&-primary {
		color: #fff;
		background-color: $ste-primary-color;

		border: 1px solid $ste-primary-color;
	}

	&-error {
		color: #fff;
		background-color: $ste-error-color;

		border: 1px solid $ste-error-color;
	}

	&-warning {
		color: #fff;
		background-color: $ste-warning-color;

		border: 1px solid $ste-warning-color;
	}

	&-square {
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	&-circle {
		border-top-right-radius: 100px;
		border-top-left-radius: 100px;
		border-bottom-left-radius: 100px;
		border-bottom-right-radius: 100px;
	}

	&-plain {
		background-color: #fff;
	}

	&-hairline {
		border-width: 0.5px !important;
	}

	&-plain {
		&.ste-button-primary {
			color: $ste-primary-color;
		}
	}

	&-plain {
		&.ste-button-info {
			color: #909399;
		}
	}

	&-plain {
		&.ste-button-success {
			color: $ste-success-color;
		}
	}

	&-plain {
		&.ste-button-error {
			color: $ste-error-color;
		}
	}

	&-plain {
		&.ste-button-warning {
			color: $ste-warning-color;
		}
	}
}
</style>
