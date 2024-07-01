<template>
	<view class="ste-icon-root" :style="[cmpCssVar]" @click="handleClick">
		{{ cmpCode }}
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-icon 图标
 * @description  图标组件 基于字体的图标集，包含了大多数常见场景的图标
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-icon
 * @property {String} code 图标名称
 * @property {String} color 图标颜色
 * @property {Number|String} size 图标大小，单位rpx，默认28
 * @property {Boolean} bold 图标是否粗体，默认false
 * @property {Number|String} marginLeft 左外边距，单位rpx，默认0
 * @property {Number|String} marginRight 右外边距，单位rpx，默认0
 * @property {Number|String} marginTop 上外边距，单位rpx，默认0
 * @property {Number|String} marginBottom 下外边距，单位rpx，默认0
 * @property {String} fontFamily 字体名 默认''
 * @property {Boolean} inlineBlock 容器对齐方式  默认true
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
			required: true,
		},
		// 字体大小
		size: {
			type: [Number, String],
			default: 28,
		},
		scale: {
			type: Number,
			default: 1,
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
		fontFamily: {
			type: String,
			default: '',
		},
		showBorder: {
			type: Boolean,
			default: false,
		},
		// 容器对齐方式 true inline-block false inline-flex
		inlineBlock: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			defaultFontFamily: 'ste-iconfont-1709689042473', // 和iconfont项目中的字体名保持一致
		};
	},
	mounted() {},
	computed: {
		cmpCode() {
			// unicode编码转字符
			return String.fromCharCode(this.code.replace('&#', '0').replace(';', ''));
		},
		cmpCssVar() {
			return {
				'--border': this.showBorder ? '1px' : '0px',
				'--color': this.color,
				'--size': utils.formatPx(this.size),
				'--weight': this.bold ? 'bold' : 'normal',
				'--margin-left': utils.formatPx(this.marginLeft),
				'--margin-right': utils.formatPx(this.marginRight),
				'--margin-top': utils.formatPx(this.marginTop),
				'--margin-bottom': utils.formatPx(this.marginBottom),
				'--font-family': this.fontFamily === '' ? this.defaultFontFamily : this.fontFamily,
				'--display': this.inlineBlock ? 'inline-block' : 'inline-flex',
			};
		},
	},
	methods: {
		handleClick() {
			this.$emit('click');
		},
	},
};
</script>

<style lang="scss"></style>
<style lang="scss" scoped>
@import './iconfont.css';
.ste-icon-root {
	display: var(--display);
	justify-content: center;
	align-items: center;
	vertical-align: baseline;
	border-width: var(--border);
	border-color: #bbb;
	border-style: solid;

	margin-left: var(--margin-left) !important;
	margin-right: var(--margin-right) !important;
	transform: translateY(calc(var(--margin-bottom) - var(--margin-top))) !important ;

	// height: calc(var(--size)) !important;
	width: calc(var(--size)) !important;
	line-height: calc(var(--size) - var(--border) * 2) !important;
	font-family: var(--font-family) !important;
	font-size: calc(var(--size) - var(--border) * 2) !important;
	color: var(--color);
	font-weight: var(--weight) !important;
}
</style>
