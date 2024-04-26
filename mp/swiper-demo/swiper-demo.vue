<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="轮播图"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法（必须固定高度，默认100%）</view>
				<view class="item-view">
					<ste-swiper>
						<ste-swiper-item v-for="(m, index) in list1" :index="index" :key="index">
							<view class="item">{{ m }}</view>
						</ste-swiper-item>
					</ste-swiper>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">纵向轮播（必须固定高度，默认100%）</view>
				<view class="item-view">
					<ste-swiper direction="vertical" height="300rpx">
						<ste-swiper-item v-for="(m, index) in list1" :index="index" :key="index">
							<view class="item">{{ m }}</view>
						</ste-swiper-item>
					</ste-swiper>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">首尾衔接轮播</view>
				<view class="item-view">
					<ste-swiper circular>
						<ste-swiper-item v-for="(m, index) in list1" :index="index" :key="index">
							<view class="item">{{ m }}</view>
						</ste-swiper-item>
					</ste-swiper>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自动轮播</view>
				<view class="item-view">
					<ste-swiper circular autoplay>
						<ste-swiper-item v-for="(m, index) in list1" :index="index" :key="index">
							<view class="item">{{ m }}</view>
						</ste-swiper-item>
					</ste-swiper>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">显示指示器</view>
				<view class="item-view">
					<ste-swiper circular autoplay indicatorDots>
						<ste-swiper-item v-for="(m, index) in list1" :index="index" :key="index">
							<view class="item">{{ m }}</view>
						</ste-swiper-item>
					</ste-swiper>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">指示器颜色</view>
				<view class="item-view">
					<ste-swiper circular autoplay indicatorDots indicatorColor="#0f0" indicatorActiveColor="#f00">
						<ste-swiper-item v-for="(m, index) in list1" :index="index" :key="index">
							<view class="item">{{ m }}</view>
						</ste-swiper-item>
					</ste-swiper>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">同时显示前后页</view>
				<view class="item-view">
					<ste-swiper circular autoplay previousMargin="60rpx" nextMargin="60rpx" >
						<ste-swiper-item v-for="(m, index) in list2" :index="index" :key="index">
							<view class="item">{{ m }}</view>
						</ste-swiper-item>
					</ste-swiper>
				</view>
			</view>
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
