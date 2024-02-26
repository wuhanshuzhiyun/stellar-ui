<template>
	<view class="page">
		<view class="top">
			<view class="top-1">
				<image :src="joinSrc('中百钱包/payment/logo.png')" style="width: 100rpx" mode="widthFix" />
				<view class="title">
					<view class="title-1">Stellar UI {{ version }}</view>
					<view class="title-2">微信平台快速开发的UI框架</view>
				</view>
			</view>
			<view class="top-2">
				<text>Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。</text>
			</view>
		</view>

		<view class="group-title">基础组件</view>
		<view class="com-box" @click="nav('button')">
			<view class="com-title">
				<image :src="joinSrc('img/button.png')" style="width: 18px" mode="widthFix" />
				<text>Button 按钮</text>
			</view>
			<view class="com-arrow"><image :src="joinSrc('img/r-arrow.png')" mode="widthFix" /></view>
		</view>
		<view class="com-box" @click="nav('icon')">
			<view class="com-title">
				<image :src="joinSrc('img/icon.png')" style="width: 18px" mode="widthFix" />
				<text>Icon 图标</text>
			</view>
			<view class="com-arrow"><image :src="joinSrc('img/r-arrow.png')" mode="widthFix" /></view>
		</view>
		<!-- ***表单组件*** -->
		<view class="group-title">表单组件</view>
		<view class="com-box" @click="nav('search')">
			<view class="com-title">
				<image :src="joinSrc('img/search.png')" style="width: 18px" mode="widthFix" />
				<text>Search 搜索</text>
			</view>
			<view class="com-arrow"><image :src="joinSrc('img/r-arrow.png')" mode="widthFix" /></view>
		</view>
	</view>
</template>
<script>
import utils from '@/common/utils';
import config from '@/uni_modules/stellar-ui/package.json';
export default {
	data() {
		return {
			version: config.version ?? '',
		};
	},
	created() {},
	methods: {
		joinSrc: utils.joinSrc, // 拼接图片src地址
		nav(routerName) {
			const path = '/mp/' + routerName + '-demo/' + routerName + '-demo';
			uni.navigateTo({
				url: path,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	padding: 46px 20px 20px;
}
.top {
	padding-bottom: 28rpx;
	.top-1 {
		display: flex;
		image {
			margin-right: 28rpx;
		}

		.title {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.title-1 {
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 10rpx;
		}
		.title-2 {
			color: #909193;
			font-size: 28rpx;
		}
	}

	.top-2 {
		margin-top: 28rpx;
		color: #606266;
		font-size: 28rpx;
	}
}
.group-title {
	padding: 32rpx 0;
	padding-bottom: 8rpx;
	border-bottom: 1px solid #eee;
	font-weight: bold;
}
.com-box {
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #eee;
	padding: 20rpx 0;
	.com-title {
		flex: 1;

		font-size: 28rpx;
		display: flex;
		align-items: center;
		image {
			margin-right: 12rpx;
		}
		line-height: 100%;
	}
	.com-arrow {
		image {
			width: 32rpx;
			position: relative;
			top: 6rpx;
		}
	}
}
</style>
