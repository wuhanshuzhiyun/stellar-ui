<template>
	<view class="ste-image--root" :style="[cmpStyle]">
		<view v-if="showLoading && status === 0"><slot name="loading">加载中</slot></view>

		<image
			class="content"
			:style="{ display: status === 1 ? 'block' : 'none' }"
			:src="src"
			:mode="mode"
			:lazy-load="lazyLoad"
			:show-menu-by-longpress="showMenuByLongpress"
			@load="onLoadOver"
			@error="onFault"
		></image>
		<view v-if="status === 2"><slot name="error">加载失败</slot></view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-image 图片
 * @description 图片组件
 * @tutorial http://172.16.114.51:5050/pc/index/index?name=ste-image
 * @property {String}			src										图片地址
 * @property {String}			mode									图片裁剪、缩放的模式 默认值：scaleToFill
 * @value scaleToFill 缩放：不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素 {String}
 * @value aspectFit 	缩放：保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来 {String}
 * @value aspectFill 	缩放：保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取 {String}
 * @value widthFix 		缩放：宽度不变，高度自动变化，保持原图宽高比不变 {String}
 * @value heightFix 	缩放：高度不变，宽度自动变化，保持原图宽高比不变 App 和 H5 平台 HBuilderX 2.9.3+ 支持、微信小程序需要基础库 2.10.3 {String}
 * @width {String|Number}	width									宽度：Number-单位rpx，String-同原生
 * @width {String|Number}	height								高度：Number-单位rpx，String-同原生
 * @width {String|Number}	radius								圆角：Number-单位rpx，String-同原生
 * @width {Boolean}				showLoading						是否展示图片加载中内容
 * @width {Boolean}				showError							是否加载失败的内容
 * @width {Boolean}				showMenuByLongpress		长按图片显示发送给朋友、收藏、保存图片、搜一搜、打开名片/前往群聊/打开小程序（若图片中包含对应二维码或小程序码）的菜单。
 * @width {Boolean}				lazyLoad							图片懒加载，在即将进入一定范围（上下三屏）时才开始加载
 * @event {Function}			load 点击事件
 * @event {Function}			error 点击事件
 * @event {Function}			click 点击事件
 */
export default {
	group: '基础组件',
	title: 'Image 图片',
	name: 'ste-image',
	props: {
		src: {
			type: String,
			default: () => '',
		},
		mode: {
			type: String,
			default: () => 'scaleToFill',
		},
		width: {
			type: [Number, String],
			default: () => '100%',
		},
		height: {
			type: [Number, String],
			default: () => '100%',
		},
		radius: {
			type: [Number, String],
			default: () => 0,
		},

		showLoading: {
			type: Boolean,
			default: () => false,
		},
		showError: {
			type: Boolean,
			default: () => true,
		},
		showMenuByLongpress: {
			type: Boolean,
			default: () => false,
		},
		lazyLoad: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			status: 0,
		};
	},
	computed: {
		cmpStyle() {
			return {
				'--image-root-width': isNaN(this.width) ? this.width : utils.rpx2px(this.width),
				'--image-root-height': isNaN(this.height) ? this.height : utils.rpx2px(this.height),
				'--image-root-radius': isNaN(this.radius) ? this.radius : utils.rpx2px(this.radius),
				'--image-root-background-color': this.status === 1 ? 'none' : 'rgba(127,127,127,.05)',
			};
		},
	},
	watch: {
		src() {
			this.status = 0;
		},
	},
	methods: {
		onLoadOver(e) {
			this.status = 1;
			this.$emit('load', e);
		},
		onFault(e) {
			this.status = 2;
			this.$emit('error', e);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-image--root {
	width: var(--image-root-width);
	height: var(--image-root-height);
	display: inline-flex;
	font-size: 24rpx;
	color: #bbbbbb;
	justify-content: center;
	align-items: center;
	background-color: var(--image-root-background-color);
	border-radius: var(--image-root-radius);
	overflow: hidden;
	line-height: 1;
	vertical-align: middle;
	& > image {
		width: var(--image-root-width);
		height: var(--image-root-height);
	}
}
</style>
