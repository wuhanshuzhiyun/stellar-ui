<template>
	<view class="ste-switch--root" :style="[cmpStyle]">
		<view class="switch-node" :style="[cmpNodeStyle]"></view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-switch 开关
 * @description 开关组件,表示两种相互对立的状态间的切换，多用于触发「开/关」。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=switch
 * @property {Boolean} value 开关状态（支持v-model双向绑定）默认 false
 * @property {Boolean} disabled 禁用 默认 false
 * @property {Boolean} readonly 只读（不置灰） 默认 false
 * @property {Number|String} size 开关大小，单位rpx 默认 78
 * @property {String} activeColor 激活时颜色 默认 #0090FF
 * @property {String} inactiveColor 未激活颜色 默认 #bbbbbb
 * @property {Boolean} loading 加载中 默认 false
 * @event {Function} click 点击开关时触发的事件（可拦截change事件）`value`：改变后的绑定值,`allowStop`：允许阻止后续的事件触发,：`resolve`：后续的事件执行
 * @event {Function} change 当绑定值变化时触发的事件
 */

export default {
	group: '表单组件',
	title: 'Switch 开关',
	name: 'ste-switch',
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		size: {
			type: [String, Number],
			default: 78,
		},
		activeColor: {
			type: String,
			default: '#0090FF',
		},
		inactiveColor: {
			type: String,
			default: '#bbbbbb',
		},
		loading: {
			type: Boolean,
			default: false,
		},
	},
	model: {
		prop: 'value',
		// 派发事件名，更新父组件数据
		event: 'input',
	},
	data() {
		return {};
	},
	computed: {
		cmpStyle() {
			let style = {};
			style['width'] = this.size * 2 + 4 + 'rpx';
			style['height'] = this.size + 4 + 'rpx';
			style['borderRadius'] = this.size + 'rpx';
			style['background'] = this.value ? this.activeColor : this.inactiveColor;
			style['opacity'] = this.disabled || this.readonly ? '0.6' : '1';
			// #ifdef H5
			style['opacity'] = this.disabled || this.readonly ? 'not-allowed' : 'pointer';
			// #endif
			return style;
		},
		cmpNodeStyle() {
			let style = {};
			style['width'] = this.size + 'rpx';
			style['height'] = this.size + 'rpx';
			return style;
		},
	},
	methods: {
		onSelect(index) {
			if (!this.disabled && !this.readonly) {
				let value = (index + 1) * this.score;
				if (this.value != value) {
					// 更新 model
					this.$emit('input', value);
					// change回调
					this.$emit('change', value);
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-switch--root {
	display: inline-flex;
	align-items: center;

	.switch-node {
		margin-left: 4rpx;
		border-radius: 50%;
		background: #ffffff;
		box-shadow: 9rpx 6rpx 18rpx 3rpx rgba(0, 0, 0, 0.12);
	}
}
</style>
