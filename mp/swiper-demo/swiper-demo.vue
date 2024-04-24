<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="轮播图"></page-nav>
		<view class="content">
			<ste-swiper :current="2">
				<ste-swiper-item v-for="(m, index) in list" :index="index" :key="index">
					<view class="item">{{ m }}</view>
				</ste-swiper-item>
			</ste-swiper>
			<swiper
				style="width: 100%; height: 360rpx; margin-top: 24rpx"
				next-margin="60rpx"
				previous-margin="60rpx"
				circular
			>
				<swiper-item v-for="(m, index) in list" :key="index">
					<view class="item">{{ m }}</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: ['1111', '2222', '3333', '4444'],
		};
	},
};
</script>
<style lang="scss" scoped>
.page {
	.content {
		.item {
			padding: 30rpx;
			height: 300rpx;
			color: #fff;
			background-image: linear-gradient(90deg, #3478f6, #6f8743);
		}
	}
}
</style>
