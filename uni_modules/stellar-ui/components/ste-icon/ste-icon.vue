<template>
	<div class="ste-icon--root" :style="[cmpCssVar]" @click="handleClick">
		<view class="iconfont">{{ cmpCode }}</view>
	</div>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-icon 图标
 * @description  图标组件 基于字体的图标集，包含了大多数常见场景的图标
 * @tutorial http://172.16.114.51:5050/pc/index/index?name=ste-icon
 * @property {String} code 图标名称
 * @property {String} color 图标颜色
 * @property {Number|String} size 图标大小，单位rpx，默认28
 * @property {Boolean} bold 图标是否粗体，默认false
 * @property {Number|String} marginLeft 左外边距，单位rpx，默认0
 * @property {Number|String} marginRight 右外边距，单位rpx，默认0
 * @property {Number|String} marginTop 上外边距，单位rpx，默认0
 * @property {Number|String} marginBottom 下外边距，单位rpx，默认0
 * @event {Function} click 图标点击回调事件
 */
export default {
	group: '基础组件',
	title: 'Icon 图标',
	name: 'ste-icon',
	props: {
		// iconfont unicode
		code: {
			type: String,
			required: true,
		},
		// 字体大小
		size: {
			type: [Number, String],
			default: 28,
		},
		// 颜色
		color: {
			type: String,
			default: '',
		},
		// 图标是否粗体
		bold: {
			type: Boolean,
			default: false,
		},
		// 左外边距
		marginLeft: {
			type: [Number, String],
			default: 0,
		},
		// 右外边距
		marginRight: {
			type: [Number, String],
			default: 0,
		},
		// 上外边距
		marginTop: {
			type: [Number, String],
			default: 0,
		},
		// 下外边距
		marginBottom: {
			type: [Number, String],
			default: 0,
		},
	},
	data() {
		return {};
	},
	computed: {
		cmpCode() {
			// unicode编码转字符
			return String.fromCharCode(this.code.replace('&#', '0').replace(';', ''));
		},
		cmpCssVar() {
			return {
				'--color': this.color,
				'--size': this.rpx2px(this.size),
				'--weight': this.bold ? 'bold' : 'normal',
				'--margin-left': this.rpx2px(this.marginLeft),
				'--margin-right': this.rpx2px(this.marginRight),
				'--margin-top': this.rpx2px(this.marginTop),
				'--margin-bottom': this.rpx2px(this.marginBottom),
			};
		},
	},
	methods: {
		rpx2px: utils.rpx2px,
		handleClick() {
			this.$emit('click');
		},
	},
};
</script>

<style lang="scss" scoped>
@import './iconfont.css';
.ste-icon--root {
	display: flex;
	align-items: center;

	.iconfont {
		display: inline-block;
		vertical-align: bottom;
		font-family: 'iconfont' !important;
		font-style: normal;
		width: var(--size) !important;
		height: var(--size) !important;
		line-height: var(--size) !important;
		font-size: var(--size) !important;
		color: var(--color);
		font-weight: var(--weight) !important;
		margin-left: var(--margin-left) !important;
		margin-right: var(--margin-right) !important;
		margin-top: var(--margin-top) !important;
		margin-bottom: var(--margin-bottom) !important;
	}
}
</style>
