<template>
	<view
		class="ste-navbar-root"
		:style="[pageStyle, { paddingTop: `${navbarTop}rpx`, backgroundColor: backgroundColor }]"
		data-test="navbar"
	>
		<view class="nav" :style="{ width: `${navbarWidth}rpx`, height: `${navbarHeight}rpx` }">
			<view class="back-box">
				<view
					v-if="autoBack"
					class="back"
					:style="{
						backgroundColor: backBackgroundColor,
						borderColor: backBorderColor,
						opacity: backOpacity,
					}"
				>
					<ste-icon :code="backCode" weight="bold" :size="28" :color="backColor"></ste-icon>
				</view>
				<view @click="backClick" class="back-click-hot" />
			</view>

			<view v-if="title && titleAlignment == 1" class="title" :style="{ color: titleColor }">{{ title }}</view>
			<view class="title slot-default"><slot name="default"></slot></view>
		</view>
		<view
			v-if="title && titleAlignment == 2"
			class="title-center"
			:style="{
				color: titleColor,
				height: `${navbarHeight}rpx`,
				lineHeight: `${navbarHeight}rpx`,
				paddingTop: `${navbarTop}rpx`,
			}"
		>
			{{ title }}
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils';

/**
 * ste-navbar 导航栏
 * @description 导航栏组件，支持标题、返回按钮、安全区域适配等功能
 * @tutorial https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui&menu=%E7%BB%84%E4%BB%B6&active=ste-navbar
 * @property {Boolean} autoBack 是否显示返回按钮 默认 true
 * @property {String} backColor 返回按钮图标颜色 默认 #000
 * @property {String} backCode 返回按钮图标编码 默认 &#xe673;
 * @property {String} backBackgroundColor 返回按钮背景颜色 默认 transparent
 * @property {String} backBorderColor 返回按钮边框颜色 默认 transparent
 * @property {Number} backOpacity 返回按钮透明度 默认 1
 * @property {Boolean} stopNavigateBack 是否阻止默认返回行为 默认 false
 * @property {String} title 标题文本 默认 空字符串
 * @property {String} titleColor 标题颜色 默认 #181818
 * @property {Number} titleAlignment 标题对齐方式 默认 1
 * @value 1 左对齐 {Number}
 * @value 2 居中对齐 {Number}
 * @property {Boolean} fixed 是否固定定位 默认 false
 * @property {Boolean} safeAreaInsetTop 是否适配安全区域顶部 默认 true
 * @property {Number} zIndex 层级 默认 10
 * @property {String} backgroundColor 背景颜色 默认 transparent
 * @property {Number|String} colorType 颜色类型 默认 1
 * @event {Function} backClick 返回按钮点击事件
 */
export default {
	group: '业务组件',
	title: 'Navbar 导航栏',
	name: 'ste-navbar',
	props: {
		autoBack: { type: Boolean, default: true },
		backColor: { type: String, default: '#000' },
		backCode: { type: String, default: '&#xe673;' },
		backBackgroundColor: { type: String, default: 'transparent' },
		backBorderColor: { type: String, default: 'transparent' },
		backOpacity: { type: Number, default: 1 },
		stopNavigateBack: { type: Boolean, default: false },
		title: { type: String, default: '' },
		titleColor: { type: String, default: '#181818' },
		titleAlignment: { type: Number, default: 1 },
		fixed: { type: Boolean, default: false },
		safeAreaInsetTop: { type: Boolean, default: true },
		zIndex: { type: Number, default: 10 },
		backgroundColor: { type: String, default: 'transparent' },
		colorType: { type: [Number, String], default: 1 },
	},
	data() {
		return {
			navbarTop: utils.px2rpx(16),
			navbarWidth: utils.px2rpx(281),
			navbarHeight: utils.px2rpx(26),
		};
	},
	computed: {
		pageStyle() {
			const { safeArea } = utils.System.getWindowInfo();

			const style = {
				zIndex: this.zIndex,
			};
			if (this.safeAreaInsetTop) {
				// #ifdef APP
				style.marginTop = safeArea.top ? safeArea.top + 'px' : 0;
				// #endif
			}
			if (this.fixed) {
				style.position = 'fixed';
				style.top = 0;
			}

			return style;
		},
	},
	created() {
		this.initNavbarInfo();
	},
	methods: {
		initNavbarInfo() {
			// #ifdef MP-WEIXIN || MP-ALIPAY
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			const addHeight = 16;
			this.navbarTop = utils.px2rpx(menuButtonInfo.top - uni.upx2px(addHeight));
			this.navbarWidth = utils.px2rpx(menuButtonInfo.left);
			this.navbarHeight = utils.px2rpx(menuButtonInfo.height + uni.upx2px(addHeight * 2));
			// #endif

			if (!this.safeAreaInsetTop) {
				this.navbarTop = 0;
			}
		},
		backClick() {
			this.$emit('backClick');
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-navbar-root {
	position: relative;
}

.nav {
	display: flex;
	align-items: center;
	padding-left: 8rpx;
	overflow: hidden;
	.back-box {
		padding-right: 10rpx;
		display: flex;
		align-items: center;
		position: relative;
		.back {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 50rpx;
			height: 50rpx;
			border-radius: 25rpx;
			border-width: 1px;
			border-style: solid;
		}
		.back-click-hot {
			position: absolute;
			z-index: 99;
			width: 90rpx;
			height: 90rpx;
			transform: translateX(-30rpx);
		}
	}
	.slot-default {
		display: flex;
		align-items: center;
		flex: 1;
	}
}
.title-center {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
	width: 100%;
	font-size: 32rpx;
	text-align: center;
	font-weight: bold;
}

.title {
	font-size: 32rpx;
	font-weight: bold;
	margin-right: 10rpx;
	line-height: 1;
}
</style>
