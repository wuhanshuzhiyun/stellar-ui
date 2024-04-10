<template>
	<view class="ste-stepper--root">
		<ste-button>
			<ste-icon code="&#xe67c;" :size="btnSize / 2"></ste-icon>
		</ste-button>
		<ste-input></ste-input>
		<ste-button>
			<ste-icon code="&#xe67e;" :size="btnSize / 2"></ste-icon>
		</ste-button>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';

/**
 * ste-stepper 步进器
 * @description 步进器组件,步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=stepper
 * @property {Number} value 当前输入的值，支持双向绑定 默认 1
 * @property {Number} min 最小值 默认 0
 * @property {Number} max 最大值 默认 Infinity
 * @property {Number} step 步长，每次加或减的值 默认 1
 * @property {Number|String} inputWidth 输入框宽度，默认单位为rpx 默认 64
 * @property {Number|String} btnSize 按钮大小以及输入框高度，默认单位为rpx 默认 48
 * @property {Number} precision 数值精度 默认 0
 * @property {String} theme 样式风格 默认 card
 * @value card 面型 {String}
 * @value line 线型 {String}
 * @value add 纯加购按钮 {String}
 * @property {String} btnBgColor 按钮背景色 默认 #0090FF
 * @property {Boolean} disabled 是否禁用步进器 默认 false
 * @property {Boolean} disablePlus 是否禁用增加按钮 默认 false
 * @property {Boolean} disableMinus 是否禁用减少按钮 默认 false
 * @property {Boolean} disableInput 是否禁用输入框 默认 false
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
 * @event {Function} change 当绑定值变化时触发的事件 `value`:改变后的绑定值
 * @event {Function} plus 点击增加按钮时触发（可拦截change事件）`value`：改变后的绑定值,`allowStop`：允许阻止后续的事件触发,：`resolve`：后续的事件执行
 * @event {Function} minus 点击减少按钮时触发（可拦截change事件）`value`：改变后的绑定值,`allowStop`：允许阻止后续的事件触发,：`resolve`：后续的事件执行
 * @event {Function} focus 输入框聚焦时触发
 * @event {Function} blur 输入框失焦时触发
 */

export default {
	group: '表单组件',
	title: 'Stepper 步进器',
	name: 'ste-stepper',
	props: {
		value: {
			type: Number,
			default: 1,
		},
		min: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: Infinity,
		},
		step: {
			type: Number,
			default: 1,
		},
		inputWidth: {
			type: [Number, String],
			default: 64,
		},
		btnSize: {
			type: [Number, String],
			default: 48,
		},
		theme: {
			type: String,
			default: 'card',
		},
		btnBgColor: {
			type: String,
			default: '#0090FF',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		disablePlus: {
			type: Boolean,
			default: false,
		},
		disableMinus: {
			type: Boolean,
			default: false,
		},
		disableInput: {
			type: Boolean,
			default: false,
		},
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
	},
	data() {
		return {};
	},
	created() {},
};
</script>

<style lang="scss" scoped>
.ste-stepper--root {
}
</style>
