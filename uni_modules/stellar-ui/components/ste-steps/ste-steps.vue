<template>
	<view class="ste-steps-root">
		<slot></slot>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-steps 步骤条
 * @description 步骤条组件,拆分展示某项流程的步骤，引导用户按流程完成任务或向用户展示当前状态。。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-steps
 * @property {Number} active 步骤进度默认 0
 * @property {Boolean} vertical 垂直方向 默认 false
 * @property {Boolean} dot 点状步骤条 默认 false
 * @property {Number|String} space 步骤条间距，默认为自动计算，单位为rpx
 * @property {Boolean} alignCenter 是否水平居中，只对横向步骤条有效 默认 false
 * @event {Function} clickStep 点击步骤的标题或图标时触发
 */

export default {
	group: '展示组件',
	title: 'Steps 步骤条',
	name: 'steps',
	props: {
		active: {
			type: Number,
			default: 0,
		},
		vertical: {
			type: Boolean,
			default: false,
		},
		dot: {
			type: Boolean,
			default: false,
		},
		space: {
			type: [Number, String],
			default: '',
		},
		alignCenter: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		cmpStyle() {
			let style = {};
			style['columnGap'] = utils.formatPx(this.gutter);
			// #ifdef H5
			if (this.disabled || this.readonly) {
				style['cursor'] = 'not-allowed';
			} else {
				style['cursor'] = 'pointer';
			}
			// #endif
			return style;
		},
	},
};
</script>

<style></style>
