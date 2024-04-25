<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="轮播图"></page-nav>
		<view class="content">
			<ste-swiper indicator-dots autoplay>
				<ste-swiper-item v-for="(m, index) in list1" :index="index" :key="index">
					<view class="item">{{ m }}</view>
				</ste-swiper-item>
			</ste-swiper>
			<view style="margin-top: 24rpx"></view>
			<ste-swiper indicator-dots autoplay>
				<ste-swiper-item v-for="(m, index) in list2" :index="index" :key="index">
					<view class="item">{{ m }}</view>
				</ste-swiper-item>
			</ste-swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list1: ['1111', '2222'],
			list2: ['1111', '2222', '3333', '4444'],
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
