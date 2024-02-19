<template>
	<view class="page">
		<page-nav title="Stellar UI" :autoBack="true" backColor="#000"></page-nav>
		<view class="top">Stellar UI 1.0.0</view>
		<view class="group-title">基础组件</view>
		<view class="com-box">
			<view class="com-title">button 按钮</view>
			<view class="com-arrow" @click="nav('button')">></view>
		</view>
		<view class="group-title">表单组件</view>
		<view class="com-box">
			<view class="com-title">search 按钮</view>
			<view class="com-arrow" @click="nav('search')">></view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		nav(routerName) {
			const path = '/mp/' + routerName + '-demo/' + routerName + '-demo';
			console.log(path);
			uni.navigateTo({
				url: path,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.top {
	font-size: 48rpx;
	font-weight: bold;
	text-align: center;
	height: 160rpx;
	line-height: 160rpx;
	width: 100%;
}
.group-title {
	margin-top: 40rpx;
	margin-bottom: 20rpx;
	padding-left: 20rpx;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 40rpx;
	border-bottom: 1px solid #eee;
}
.com-box {
	display: flex;
	height: 80rpx;
	line-height: 80rpx;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #eee;
	padding-left: 20rpx;
	padding-right: 20rpx;
	.com-title {
		flex: 1;
	}
	.com-arrow {
	}
}
</style>
