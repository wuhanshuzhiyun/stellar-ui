<template>
	<view class="page">button demo</view>
</template>
<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {},
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
	background-color: red;
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
