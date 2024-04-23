<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="轮播图"></page-nav>
		<view class="content">
			<ste-swiper>
				<ste-swiper-item :index="0">
					<view class="item-1">111</view>
				</ste-swiper-item>
				<ste-swiper-item :index="1">
					<view class="item-2">222</view>
				</ste-swiper-item>
			</ste-swiper>
		</view>
	</view>
</template>

<script></script>
<style lang="scss" scoped>
.page {
	.content {
		.item-1 {
			background-color: #007aff;
		}
		.item-2 {
			background-color: #ffa700;
		}
	}
}
</style>
