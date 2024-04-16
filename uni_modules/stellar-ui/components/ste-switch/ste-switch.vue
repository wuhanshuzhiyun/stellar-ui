<template>
	<view class="ste-switch-root" :style="[cmpStyle]" @click="click">
		<view class="switch-node" :style="[cmpNodeStyle]">
			<view v-if="loading" class="switch-loading" :style="[cmpLoadingStyle]"></view>
		</view>
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
 * @property {Number|String} size 开关大小，单位rpx 默认 52
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
			default: 52,
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
		return {
			clickTask: null, // click完成任务和allowStopStatus搭配使用
			allowStopStatus: false, // 允许阻止后续的事件触发
		};
	},
	computed: {
		cmpStyle() {
			let style = {};
			style['width'] = utils.rpx2px(Number(this.size) * 2 + 4);
			style['height'] = utils.rpx2px(Number(this.size) + 4);
			style['borderRadius'] = utils.rpx2px(this.size);
			style['background'] = this.value ? this.activeColor : this.inactiveColor;
			style['opacity'] = this.disabled ? '0.6' : '1';
			// #ifdef H5
			style['cursor'] = this.disabled || this.readonly ? 'not-allowed' : 'pointer';
			// #endif
			return style;
		},
		cmpNodeStyle() {
			let style = {};
			style['width'] = utils.rpx2px(Number(this.size));
			style['height'] = utils.rpx2px(Number(this.size));
			if (this.value) {
				style['transform'] = `translatex(${utils.rpx2px(Number(this.size))})`;
			} else {
				style['marginLeft'] = utils.rpx2px(4);
			}
			return style;
		},
		cmpLoadingStyle() {
			let style = {};
			style['borderColor'] = '#eeeeee '.repeat(3) + (this.value ? this.activeColor : this.inactiveColor);
			return style;
		},
	},
	methods: {
		async click() {
			if (!this.disabled && !this.readonly && !this.loading) {
				this.allowStopStatus = false;
				this.clickTask = new Promise((resolve) => {
					this.$emit('click', this.value, this.allowStop, resolve);
				});
				if (this.allowStopStatus) {
					await this.clickTask;
				}
				this.$emit('input', !this.value);
				this.$emit('change', !this.value);
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
.ste-switch-root {
	display: inline-flex;
	align-items: center;
	transition: background-color 0.3s;
	.switch-node {
		border-radius: 50%;
		background: #ffffff;
		box-shadow: 9rpx 6rpx 18rpx 3rpx rgba(0, 0, 0, 0.12);
		transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
		cursor: inherit;
		display: inline-flex;
		justify-content: center;
		align-items: center;

		.switch-loading {
			width: 50%;
			height: 50%;
			border: 3rpx solid;
			border-radius: 50%;
			animation: ste-rotate 1s linear infinite;
		}
	}
	@keyframes ste-rotate {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(1turn);
		}
	}
}
</style>
