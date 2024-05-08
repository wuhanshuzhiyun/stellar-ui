<template>
	<view class="ste-loading-root" :style="[cmpStyle]"></view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-loading 加载动画
 * @description 加载动画组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-loading
 * @property {String} color 图标颜色，默认#999999
 * @property {String} text 提示文字内容
 * @property {String} textColor 提示文本颜色，默认和图标颜色同步
 * @property {Number} textSize 文本大小，单位rpx，默认28
 * @property {Number} type 类型，默认1
 * @value 1  类型1  逐渐减淡的颜色为主色的透明度变化 透明度以10%的差距逐渐递减{{Number}}
 * @value 2  类型2  动态转圈展示{{Number}}
 * @property {Number} size 大小，单位rpx，默认60
 */
export default {
	group: '展示组件',
	title: 'Loading 加载动画',
	name: 'ste-loading',
	props: {
		color: {
			type: String,
			default: () => '#999999',
		},
		text: {
			type: String,
			default: () => '',
		},
		textColor: {
			type: String,
			default: () => '',
		},
		textSize: {
			type: Number,
			default: () => 28,
		},
		type: {
			type: Number,
			default: () => 1,
		},
		size: {
			type: Number,
			default: () => 60,
		},
	},
	computed: {
		cmpStyle() {
			let style = {};
			style['width'] = utils.formatPx(this.size);
			style['height'] = utils.formatPx(this.size);
			return style;
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-loading-root {
	display: inline-flex;
}
</style>
