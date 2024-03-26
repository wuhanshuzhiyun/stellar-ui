<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="复选框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block"></view>
			</view>
		</view>
	</view>
</template>
<script></script>

<style lang="scss" scoped>
.page {
	.item-rate {
		display: flex;
		flex-direction: column;

		text {
			font-size: 30rpx;
		}
	}
}
</style>
