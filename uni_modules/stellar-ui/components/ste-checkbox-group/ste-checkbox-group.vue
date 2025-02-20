<template>
	<view class="ste-checkbox-group-root" data-test="checkbox-group" :style="[cmpStyle]">
		<slot></slot>
	</view>
</template>

<script>
/**
 * ste-checkbox-group 复选框组
 * @description 复选框组组件,内部由多个checkbox组成。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-checkbox
 * @property {Array} value 当前选中值（支持v-model双向绑定）
 * @property {String} direction 排列方式 默认 column
 * @value row 横向 默认 {{String}}
 * @value  column 纵向 {{String}}
 * @property {Boolean} disabled 禁用 默认 false
 * @property {Boolean} readonly 只读（不置灰） 默认 false
 * @property {String} shape 形状 默认 circle
 * @value circle 圆形 默认 {{String}}
 * @value square 方形 {{String}}
 * @property {Number|String} iconSize 图标大小，单位rpx 默认 36
 * @property {String} checkedColor 选中状态的图标颜色 默认 #0090FF
 * @property {String} textPosition 文本的位置 默认 right
 * @value right 右 默认 {{String}}
 * @value left 左 {{String}}
 * @property {Number|String} textSize 文本字体大小，单位rpx 默认 28
 * @property {String} textInactiveColor 未选中的文本颜色 默认 #000000
 * @property {String} textActiveColor 选中的文本颜色 默认 #000000
 * @property {Boolean} textDisabled 禁用文本点击 默认 false
 * @property {Boolean} max 最大可选数，0为无限制 默认 0
 * @property {Number|String} marginLeft 左边距，单位rpx 默认 0
 * @property {Number|String} marginRight 右边距，单位rpx 默认 0
 * @property {Number|String} columnGap 复选框和文本间距，单位rpx 默认 16
 * @event {Function} change 当绑定值变化时触发的事件
 */
export default {
	name: 'ste-checkbox-group',
	props: {
		value: {
			type: [Array, null],
			default: [],
		},
		direction: {
			type: [String, null],
			default: 'column',
		},
		disabled: {
			type: [Boolean, null],
			default: false,
		},
		readonly: {
			type: [Boolean, null],
			default: false,
		},
		shape: {
			type: [String, null],
			default: 'circle',
		},
		iconSize: {
			type: [Number, String, null],
			default: 36,
		},
		checkedColor: {
			type: [String, null],
			default: '',
		},
		textPosition: {
			type: [String, null],
			default: 'right',
		},
		textSize: {
			type: [Number, String, null],
			default: 28,
		},
		textInactiveColor: {
			type: [String, null],
			default: '#000000',
		},
		textActiveColor: {
			type: [String, null],
			default: '#000000',
		},
		textDisabled: {
			type: [Boolean, null],
			default: false,
		},
		max: {
			type: [Number, null],
			default: 0,
		},
		marginLeft: {
			type: [Number, String, null],
			default: null,
		},
		marginRight: {
			type: [Number, String, null],
			default: null,
		},
		columnGap: {
			type: [Number, String, null],
			default: null,
		},
	},
	model: {
		prop: 'value',
		// 派发事件名，更新父组件数据
		event: 'input',
	},
	provide() {
		return {
			checkboxGroup: this,
		};
	},
	data() {
		return {};
	},
	computed: {
		cmpStyle() {
			let style = {};
			style['flexDirection'] = this.direction;
			return style;
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-checkbox-group-root {
	display: flex;
	column-gap: 16rpx;
	row-gap: 16rpx;
}
</style>
