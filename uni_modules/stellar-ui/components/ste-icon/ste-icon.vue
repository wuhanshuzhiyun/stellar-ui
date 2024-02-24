<template>
	<div class="page-iconfont" :style="[computedCssVar]" @click="handleClick">
		<view class="iconfont">{{ computedCode }}</view>
		<div class="text">{{ text }}</div>
	</div>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-icon 图标
 * @description  图标组件 基于字体的图标集，包含了大多数常见场景的图标
 * @tutorial http://172.16.114.51:5050/pc/index/index?name=ste-icon
 * @property {String}			code				图标名称
 * @property {String}			color				图标颜色
 * @property {String}			size				图标大小（单位rpx）（默认28）
 * @property {Number|String}	weight				图标粗细（默认 normal）
 * @value normal 默认值
 * @value bold 加粗
 * @property {Number|String}	marginLeft			左外边距（单位rpx）（默认0）
 * @property {Number|String}	marginRight			右外边距（单位rpx）（默认0）
 * @property {Number|String}	marginTop			上外边距（单位rpx）（默认0）
 * @property {Number|String}	marginBottom		下外边距（单位rpx）（默认0）
 * @property {String}			text				内嵌文字
 * @property {String}	        textColor			内嵌文字颜色（默认 #fff）
 * @property {Number|String}	textSize			内嵌字体大小（单位rpx）（默认24）
 * @property {String}	        textWeight			内嵌字体粗细（默认 normal）
 * @event {Function} click 图标点击回调事件
 */
export default {
	group: '基础组件',
	title: 'Icon 图标',
	name: 'ste-icon',
	options: {
		virtualHost: true,
	},
	props: {
		// iconfont unicode
		code: {
			type: String,
			default: '',
		},
		// 颜色
		color: {
			type: String,
			default: '',
		},
		// 字体大小
		size: {
			type: [Number, String],
			default: 28,
		},
		// 字体粗细
		weight: {
			type: [Number, String],
			default: 'normal',
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
		// 内嵌文字
		text: {
			type: String,
			default: '',
		},
		// 内嵌文字颜色
		textColor: {
			type: String,
			default: '#fff',
		},
		// 内嵌字体大小
		textSize: {
			type: [Number, String],
			default: 24,
		},
		// 内嵌字体粗细
		textWeight: {
			type: [Number, String],
			default: 'normal',
		},
	},
	data() {
		return {};
	},
	methods: {
		rpx2px: utils.rpx2px,
		handleClick() {
			this.$emit('click');
		},
	},
	computed: {
		computedCode() {
			// unicode编码转字符
			return String.fromCharCode(this.code.replace('&#', '0').replace(';', ''));
		},
		computedCssVar() {
			return {
				'--color': this.color,
				'--size': this.rpx2px(this.size),
				'--weight': this.weight,
				'--margin-left': this.rpx2px(this.marginLeft),
				'--margin-right': this.rpx2px(this.marginRight),
				'--margin-top': this.rpx2px(this.marginTop),
				'--margin-bottom': this.rpx2px(this.marginBottom),
				'--text-color': this.textColor,
				'--text-size': this.rpx2px(this.textSize),
				'--text-weight': this.textWeight,
			};
		},
	},
};
function formatPx() {}
</script>

<style lang="scss" scoped>
@import './iconfont.css';
.page-iconfont {
	position: relative;
	display: inline-block;
	width: calc(var(--size) + var(--margin-left) + var(--margin-right)) !important;
	height: var(--size) !important;
	line-height: var(--size) !important;
}

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

.text {
	position: absolute;
	left: 0;
	top: 0;
	width: var(--size) !important;
	height: var(--size) !important;
	line-height: var(--size) !important;
	margin-left: var(--margin-left) !important;
	margin-right: var(--margin-right) !important;
	margin-top: var(--margin-top) !important;
	margin-bottom: var(--margin-bottom) !important;
	text-align: center;
	color: var(--text-color) !important;
	font-size: var(--text-size) !important;
	font-weight: var(--text-weight) !important;
}
</style>
