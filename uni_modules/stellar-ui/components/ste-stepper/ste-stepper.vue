<template>
	<view class="ste-stepper-root" :style="[cmpStyle]">
		<ste-button v-if="theme != 'add'" :rootStyle="cmpLeftButtonStyle" @click="minus" :disabled="cmpDisableMinus">
			<ste-icon
				code="&#xe67c;"
				:size="btnSize / 2"
				:color="cmpDisableMinus ? '#cccccc' : theme == 'line' ? '#000000' : mainColor"
			></ste-icon>
		</ste-button>
		<view v-if="theme != 'add'" class="input" :style="[cmpInputStyle]">
			<input
				v-if="precision"
				type="digit"
				:value="Number(Number(value).toFixed(precision))"
				@blur="blur"
				@focus="focus"
				:disabled="disabled || disableInput"
			/>
			<input
				v-else
				type="number"
				:value="Number(Number(value).toFixed(precision))"
				@blur="blur"
				@focus="focus"
				:disabled="disabled || disableInput"
			/>
		</view>
		<ste-button v-if="theme != 'add'" :rootStyle="cmpRightButtonStyle" @click="plus" :disabled="cmpDisablePlus">
			<ste-icon
				code="&#xe67e;"
				:size="btnSize / 2"
				:color="theme != 'line' ? '#ffffff' : theme == 'line' && cmpDisablePlus ? '#cccccc' : '#000000'"
			></ste-icon>
		</ste-button>
		<ste-badge
			v-else
			:content="value"
			:background="background"
			:showDot="showDot"
			:position="position"
			:offsetX="offsetX"
			:offsetY="offsetY"
			:showZero="showZero"
			:max="badgeMax"
		>
			<ste-button :rootStyle="cmpRightButtonStyle" @click="plus" :disabled="cmpDisablePlus">
				<ste-icon
					code="&#xe67e;"
					:size="btnSize / 2"
					:color="theme != 'line' ? '#ffffff' : theme == 'line' && cmpDisablePlus ? '#cccccc' : '#000000'"
				></ste-icon>
			</ste-button>
		</ste-badge>
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
 * @property {String} mainColor 主色 默认 #0090FF
 * @property {Boolean} disabled 是否禁用步进器 默认 false
 * @property {Boolean} disablePlus 是否禁用增加按钮 默认 false
 * @property {Boolean} disableMinus 是否禁用减少按钮 默认 false
 * @property {Boolean} disableInput 是否禁用输入框 默认 false
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
 * @property {Number} badgeMax 徽标最大显示值 默认 99
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
		precision: {
			type: Number,
			default: 0,
		},
		theme: {
			type: String,
			default: 'card',
		},
		mainColor: {
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
		badgeMax: {
			type: Number,
			default: 99,
		},
	},
	model: {
		prop: 'value',
		// 派发事件名，更新父组件数据
		event: 'input',
	},
	data() {
		return {
			clickTask: null, // click完成任务和allowStopStatus搭配使用
			allowStopStatus: false, // 允许阻止后续的事件触发
		};
	},
	created() {},
	computed: {
		cmpButtonStyle() {
			let style = {};
			style['width'] = utils.rpx2px(this.btnSize);
			style['height'] = utils.rpx2px(this.btnSize);
			style['padding'] = '0';
			// #ifdef H5
			style['cursor'] = this.disabled || this.cmpDisablePlus ? 'not-allowed' : 'pointer';
			// #endif
			style['borderRadius'] = utils.rpx2px(16);
			style['border'] = 'none';
			if (this.theme == 'line') {
				style['borderRadius'] = '0';
			}
			return style;
		},
		cmpLeftButtonStyle() {
			let style = {};
			if (this.theme == 'card') {
				style['border'] = `${utils.rpx2px('2')} solid ${
					(this.cmpDisableMinus ? '#cccccc' : this.mainColor) + '80'
				}`;
			}
			if (this.theme == 'line') {
				style['border'] = `none`;
			}
			style['background'] = '#ffffff';
			style['backgroundColor'] = '#ffffff';
			// #ifdef H5
			style['cursor'] = this.cmpDisableMinus ? 'not-allowed' : 'pointer';
			// #endif
			return utils.deepMerge(utils.deepClone(this.cmpButtonStyle), style);
		},
		cmpRightButtonStyle() {
			let style = {};
			style['background'] = this.cmpDisablePlus ? '#cccccc' : this.mainColor;
			style['backgroundColor'] = this.cmpDisablePlus ? '#cccccc' : this.mainColor;
			if (this.theme == 'line') {
				style['background'] = '#ffffff';
				style['backgroundColor'] = '#ffffff';
			}
			return utils.deepMerge(utils.deepClone(this.cmpButtonStyle), style);
		},
		cmpInputStyle() {
			let style = {};
			style['width'] = utils.rpx2px(this.inputWidth);
			style['height'] = utils.rpx2px(this.btnSize);
			style['margin'] = `0 ${utils.rpx2px(4)}`;
			style['color'] = this.disabled || this.disableInput ? '#cccccc' : '#000000';
			// #ifdef H5
			style['cursor'] = this.disabled || this.cmpDisablePlus ? 'not-allowed' : 'pointer';
			// #endif
			if (this.theme == 'line') {
				style['borderLeft'] = `${utils.rpx2px('2')} solid #EEEEEE`;
				style['borderRight'] = `${utils.rpx2px('2')} solid #EEEEEE`;
				style['margin'] = `0`;
				style['padding'] = `0 ${utils.rpx2px(8)}`;
				style['width'] = utils.rpx2px(this.inputWidth + 16);
			}
			return style;
		},
		cmpDisablePlus() {
			if (this.disabled || this.disablePlus) {
				return true;
			} else {
				return this.value >= this.max;
			}
		},
		cmpDisableMinus() {
			if (this.disabled || this.disableMinus) {
				return true;
			} else {
				return this.value <= this.min;
			}
		},
		cmpStyle() {
			let style = {};
			if (this.theme == 'line') {
				style['border'] = `${utils.rpx2px('0.6')} solid #EEEEEE`;
				style['borderRadius'] = utils.rpx2px(24);
				style['overflow'] = 'hidden';
			}
			return style;
		},
	},
	methods: {
		handleValue(value) {
			// 处理最大和最小值
			if (value <= this.min) {
				value = this.min;
			}
			if (value >= this.max) {
				value = this.max;
			}
			return Number(Number(value).toFixed(this.precision));
		},
		blur(event) {
			let { value } = event.detail ?? 0;
			// 解决实际值没有变化 显示值不刷新的问题
			this.$emit('input', value);
			value = this.handleValue(value);
			this.$nextTick(() => {
				this.$emit('input', value);
				event.detail.value = value;
				this.$emit('blur', event);
			});
		},
		focus(event) {
			this.$emit('focus', event);
		},
		async plus() {
			if (!this.disabled && !this.cmpDisablePlus) {
				this.allowStopStatus = false;
				this.clickTask = null;
				this.clickTask = new Promise((resolve) => {
					this.$emit('plus', this.value, this.allowStop, resolve);
				});
				if (this.allowStopStatus) {
					await this.clickTask;
				}
				let value = this.handleValue(this.value + this.step);
				this.$emit('input', value);
				this.$emit('change', value);
			}
		},
		async minus() {
			if (!this.disabled && !this.cmpDisableMinus) {
				this.allowStopStatus = false;
				this.clickTask = null;
				this.clickTask = new Promise((resolve) => {
					this.$emit('minus', this.value, this.allowStop, resolve);
				});
				if (this.allowStopStatus) {
					await this.clickTask;
				}
				let value = this.handleValue(this.value - this.step);
				this.$emit('input', value);
				this.$emit('change', value);
			}
		},
		// 允许阻止后续操作
		allowStop() {
			this.allowStopStatus = true;
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-stepper-root {
	display: flex;

	.input {
		font-weight: bold;
		color: #000000;
		text-align: center;
		input {
			height: 100%;
			font-size: 28rpx;
		}
	}
}
</style>
