<template></template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-toast 轻提示
 * @description 在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-toast
 * @property {String} title 提示的内容
 * @property {String} icon 图标 默认值：success
 * @value success 显示成功图标 {String}
 * @value error 显示失败图标 {String}
 * @value loading 显示加载图标 {String}
 * @value none 无图标 {String}
 * @property {String} image 自定义图标的路径，image的优先级高于icon
 * @property {Number} duration 提示的延迟时间，单位ms 默认值：1500
 * @property {Boolean} mask 是否显示透明蒙层，防止触摸穿透 默认值：false
 */
export default {
	group: '展示组件',
	title: 'Toast 轻提示',
	name: 'ste-toast',
	props: {
		title: {
			type: String,
			default: '',
		},
		icon: {
			type: String,
			default: 'success',
		},
		image: {
			type: String,
			default: '',
		},
		Number: {
			type: Number,
			default: 1500,
		},
		mask: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped></style>