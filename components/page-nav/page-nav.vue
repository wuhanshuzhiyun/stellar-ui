<template>
	<div class="nav-box" :style="[pageStyle, { paddingTop: navbarTop + 'rpx' }]">
		<div class="nav" :style="{ width: navbarWidth + 'rpx', height: navbarHeight + 'rpx' }">
			<!-- #ifdef MP-WEIXIN || H5 -->
			<div v-if="autoBack" class="back-box">
				<div
					class="back"
					:style="{ backgroundColor: backBackgroundColor, borderColor: backBorderColor, opacity: opacity }"
				>
					<icon-font
						v-if="isFirstPage"
						code="&#xe665;"
						weight="bold"
						:size="28"
						:color="backColor"
					></icon-font>
					<icon-font v-else code="&#xe688;" weight="bold" :size="28" :color="backColor"></icon-font>
				</div>
				<div class="back-click-hot" @click="navBack"></div>
			</div>
			<div v-else style="width: 20rpx"></div>
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY -->
			<div class="ali-back-box"></div>
			<!-- #endif -->
			<div v-if="title && titleAlignment === '1'" class="title" :style="{ color: titleColor }">{{ title }}</div>
			<div class="slot-default"><slot name="default"></slot></div>
		</div>
		<div
			v-if="title && titleAlignment === '2'"
			class="title-center"
			:style="{
				color: titleColor,
				height: navbarHeight + 'rpx',
				lineHeight: navbarHeight + 'rpx',
				paddingTop: navbarTop + 'rpx',
			}"
		>
			{{ title }}
		</div>
	</div>
</template>
<script>
import usePosition from '@/common/usePosition.js';
import utils from '@/common/utils.js';
let pos = usePosition();
export default {
	name: 'page-nav',
	props: {
		// 是否显示返回按钮
		autoBack: {
			type: Boolean,
			default: true,
		},
		// 返回按钮颜色
		backColor: {
			type: String,
			default: '#fff',
		},
		// 返回按钮的背景颜色
		backBackgroundColor: {
			type: String,
			default: 'transparent',
			// default: 'orange',
		},
		opacity: {
			type: Number,
			default: 1,
		},
		// 返回按钮的边框颜色
		backBorderColor: {
			type: String,
			default: 'transparent',
		},
		// 阻止点击返回按钮后，返回到上一页，但仍会抛出 navBack 事件
		stopNavigateBack: {
			type: Boolean,
			default: false,
		},
		// 标题文本
		title: {
			type: String,
			default: '',
		},
		// 标题颜色
		titleColor: {
			type: String,
			default: '#181818',
		},
		// 文本对齐方式
		titleAlignment: {
			type: [Number, String],
			default: '1',
		},
		// 是否仅显示返回按钮并fixed定位
		fixedBack: {
			type: Boolean,
			default: false,
		},
		zIndex: {
			type: Number,
			default: 10,
		},
		// 1 黑色 2 白色
		colorType: {
			type: [Number, String],
			default: 1,
		},
	},
	data() {
		return {
			navbarTop: pos.navbarTop, // 自定义导航栏 top
			navbarBottom: pos.navbarBottom, // 自定义导航栏 bottom
			navbarWidth: pos.navbarWidth, // 自定义导航栏 width
			navbarHeight: pos.navbarHeight, // 自定义导航栏 height
			isFirstPage: false, // 是否为页面栈第一页
			startX: 0,
			touchRule: '左右左右左右', // 秘笈规则
			curTouchRule: '', // 当前点击的秘笈
			ruleI: -1, // 清除秘笈settimeout的i
		};
	},
	created() {},
	mounted() {
		// #ifdef MP-ALIPAY
		pos.refreshData(this);
		// #endif
		const pages = getCurrentPages();
		this.isFirstPage = pages.length === 1;
		// #ifdef MP-ALIPAY
		if (this.colorType == 1) {
			my.setNavigationBar({
				backgroundColor: '#ffffff',
			});
		} else {
			my.setNavigationBar({
				frontColor: '#ffffff',
				backgroundColor: '#000000',
			});
		}
		// #endif
	},
	methods: {
		// 返回上一页
		async navBack() {
			if (!this.stopNavigateBack) {
				uni.navigateBack();
			}
			this.$emit('navBack');
		},
	},
	computed: {
		pageStyle() {
			let style = {
				zIndex: this.zIndex,
			};
			if (this.fixedBack) {
				style.position = 'fixed';
				style.top = 0;
				style.width = '80rpx';
			}

			return style;
		},
	},
};
</script>

<style lang="scss" scoped>
.nav-box {
	position: relative;
}

.nav {
	display: flex;
	align-items: center;
	padding-left: 8rpx;
	// padding-right: 10rpx;
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
			z-index: 2;
			width: 90rpx;
			height: 90rpx;
			// background-color: rgba(255, 0, 0, 0.1);
			transform: translateX(-30rpx);
		}
	}

	.ali-back-box {
		width: 50rpx;
		height: 50rpx;
		padding-right: 10rpx;
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
