<template>
	<view class="ste-image-root" :style="[cmpStyle]">
		<view class="loading-icon" v-if="!hiddenLoading && status === 0">
			<slot name="loading">
				<ste-icon code="&#xe693;" :size="iconSize" />
			</slot>
		</view>

		<image
			class="content"
			:style="{ opacity: status === 1 ? '1' : '0' }"
			:src="src"
			:mode="mode"
			:lazy-load="lazyLoad"
			:show-menu-by-longpress="showMenuByLongpress"
			@load="onLoadOver"
			@error="onFault"
			@click="click"
		></image>

		<view class="loading-icon" v-if="!hiddenError && status === 2">
			<slot name="error">
				<ste-icon code="&#xe692;" :size="iconSize" />
			</slot>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-image 图片
 * @description 图片组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-image
 * @property {String}			src										图片地址
 * @property {String}			mode									图片裁剪、缩放的模式 默认值：scaleToFill
 * @value scaleToFill 缩放（默认）：不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素 {String}
 * @value aspectFit 	缩放：保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来 {String}
 * @value aspectFill 	缩放：保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取 {String}
 * @value widthFix 		缩放：宽度不变，高度自动变化，保持原图宽高比不变 {String}
 * @value heightFix 	缩放：高度不变，宽度自动变化，保持原图宽高比不变 App 和 H5 平台 HBuilderX 2.9.3+ 支持、微信小程序需要基础库 2.10.3 {String}
 * @property {String|Number}	width									宽度：（默认值100%）Number-单位rpx，String-同原生
 * @property {String|Number}	height								高度：（默认值100%）Number-单位rpx，String-同原生
 * @property {String|Number}	radius								圆角：（默认值0）Number-单位rpx，String-同原生
 * @property {Boolean}				hiddenLoading					是否隐藏图片加载中内容
 * @property {Boolean}				hiddenError						是否隐藏加载失败的内容
 * @property {Boolean}				showMenuByLongpress		长按图片显示发送给朋友、收藏、保存图片、搜一搜、打开名片/前往群聊/打开小程序（若图片中包含对应二维码或小程序码）的菜单。
 * @property {Boolean}				lazyLoad							图片懒加载，在即将进入一定范围（上下三屏）时才开始加载
 * @event {Function}			click 点击事件
 * @event {Function}			load 加载成功事件
 * @event {Function}			error 加载失败事件
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
		hiddenLoading: {
			type: Boolean,
			default: () => false,
		},
		hiddenError: {
			type: Boolean,
			default: () => false,
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
			iconSize: 60,
		};
	},
	computed: {
		cmpStyle() {
			let width = isNaN(this.width) ? this.width : utils.formatPx(this.width);
			let height = isNaN(this.height) ? this.height : utils.formatPx(this.height);
			if (this.mode === 'widthFix') {
				if (this.status !== 1) {
					height = width;
				} else {
					height = 'auto';
				}
			} else if (this.mode === 'heightFix') {
				if (this.status !== 1) {
					width = height;
				} else {
					width = 'auto';
				}
			}
			return {
				'--image-root-width': width,
				'--image-root-height': height,
				'--image-root-radius': utils.formatPx(this.radius),
				'--image-root-background-color': this.status === 1 ? 'none' : 'rgba(127,127,127,.05)',
			};
		},
	},
	watch: {
		src() {
			this.status = 0;
		},
	},
	mounted() {
		this.setIconSize();
	},
	methods: {
		click(e) {
			this.$emit('click', e);
		},
		onLoadOver(e) {
			this.status = 1;
			this.$emit('load', e);
		},
		onFault(e) {
			this.status = 2;
			this.$emit('error', e);
		},
		setIconSize() {
			this.$nextTick(async () => {
				const dom = await utils.querySelector('.ste-image-root', this);
				const size = dom.width <= dom.height ? dom.width : dom.height;
				if (size <= 30) this.iconSize = 12 * 2;
				else if (size <= 50) this.iconSize = 20 * 2;
				else if (size <= 100) this.iconSize = 30 * 2;
				else if (size <= 150) this.iconSize = 50 * 2;
				else this.iconSize = 70 * 2;
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-image-root {
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
	vertical-align: top;
	position: relative;
	& > image {
		width: var(--image-root-width);
		height: var(--image-root-height);
	}
	.loading-icon {
		position: absolute;
		z-index: 2;
	}
}
</style>
