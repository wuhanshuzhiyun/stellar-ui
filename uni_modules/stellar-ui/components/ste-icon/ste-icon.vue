<template>
	<view class="ste-icon-root" :style="[cmpCssVar]" @click="handleClick" data-test="icon">
		{{ cmpCode }}
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-icon 图标
 * @description  图标组件 基于字体的图标集，包含了大多数常见场景的图标
 * @tutorial https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui&menu=%E7%BB%84%E4%BB%B6&active=ste-icon
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
			type: [String, null],
			required: true,
		},
		// 字体大小
		size: {
			type: [Number, String, null],
			default: 28,
		},
		// 颜色
		color: {
			type: [String, null],
			default: '',
		},
		// 图标是否粗体
		bold: {
			type: [Boolean, null],
			default: false,
		},
		// 左外边距
		marginLeft: {
			type: [Number, String, null],
			default: 0,
		},
		// 右外边距
		marginRight: {
			type: [Number, String, null],
			default: 0,
		},
		// 上外边距
		marginTop: {
			type: [Number, String, null],
			default: 0,
		},
		// 下外边距
		marginBottom: {
			type: [Number, String, null],
			default: 0,
		},
		fontFamily: {
			type: [String, null],
			default: '',
		},
		showBorder: {
			type: [Boolean, null],
			default: false,
		},
		// 容器对齐方式 true inline-block false inline-flex
		inlineBlock: {
			type: [Boolean, null],
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

	width: calc(var(--size)) !important;
	line-height: calc(var(--size) - var(--border) * 2) !important;
	font-family: var(--font-family) !important;
	font-size: calc(var(--size) - var(--border) * 2) !important;
	color: var(--color);
	font-weight: var(--weight) !important;
}
</style>
