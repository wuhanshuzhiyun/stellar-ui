<template>
	<view class="ste-switch--root"></view>
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
			ttype: [String, Number],
			default: 78,
		},
		activeColor: {
			ttype: String,
			default: '#0090FF',
		},
		inactiveColor: {
			ttype: String,
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
		cmpListStyle() {
			let style = {};
			style['columnGap'] = this.gutter + 'rpx';
			// #ifdef H5
			if (this.disabled || this.readonly) {
				style['cursor'] = 'not-allowed';
			} else {
				style['cursor'] = 'pointer';
			}
			// #endif
			return style;
		},
		cmpCount() {
			// 兼容浏览器和微信 对数字循环的处理不同
			return Array.from({ length: this.count }, (_, index) => index);
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
		getWidth(index) {
			let value = (index + 1) * this.score;
			let diff = this.value - value;
			if (diff >= 0) {
				return '100%';
			} else if (Math.abs(diff) > 0 && Math.abs(diff) < this.score) {
				return (1 - Math.abs(diff) / this.score).toFixed(2) * 100 + '%';
			} else {
				return 0;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-switch--root {
}
</style>