<template>
	<view class="ste-checkbox--root"></view>
</template>

<script>
/**
 * ste-checkbox 复选框
 * @description 复选框组件,在一组备选项中进行多选。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-checkbox
 * @property {Array} value 选中的值（支持v-model双向绑定）
 * @property {Boolean} disabled 禁用 默认 false
 * @property {Boolean} readonly 只读（不置灰） 默认 false
 * @property {String} shape 形状 默认 circle
 * @value circle 圆形 {{String}}
 * @value shape 方形 {{String}}
 * @property {String} textPosition 文本的位置 默认 right
 * @value right 右 默认{{String}}
 * @value left 左 默认{{String}}
 * @property {Number|String} icon 复选框的图标对应的code
 * @property {Number|String} iconSize 图标大小，单位rpx 默认 60
 * @property {String} iconInactiveColor 未选中图标的颜色 默认 #dddddd
 * @property {String} iconActiveColor 选中的图标颜色 默认 #fa5014
 * @property {Number|String} textSize 文本字体大小，单位rpx 默认 42
 * @property {String} textInactiveColor 未选中的文本颜色 默认 #dddddd
 * @property {String} textActiveColor 选中的文本颜色 默认 #fa5014
 * @event {Function} click 点击复选框时触发的事件
 * @event {Function} change 当绑定值变化时触发的事件
 */

export default {
	group: '表单组件',
	title: 'Checkbox 复选框',
	name: 'ste-checkbox',
	props: {
		value: {
			type: Array,
			default: [],
		},
	},
	model: {
		prop: 'value',
		// 派发事件名，更新父组件数据
		event: 'input',
	},
};
</script>

<style lang="scss" scoped></style>
