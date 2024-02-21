<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="价格"></page-nav>
		<view class="wrapper">
			<view class="demo-block">
				<view class="title">常规价格</view>
				<view class="block-content">
					<ste-price :value="120 * 100" :fontSize="26" styleType="2" :digits="2"></ste-price>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import stePrice from '@/uni_modules/stellar-ui/components/ste-price/ste-price.vue';

export default {
	components: {
		stePrice,
	},
	data() {
		return {};
	},
	onLoad() {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.wrapper {
		padding: 16rpx;

		.demo-block {
			margin-bottom: 16rpx;

			.title {
				font-size: 30rpx;
				color: #8f9ca2;
				margin-bottom: 8rpx;
			}

			.block-content {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;

				> * {
					margin: 0 16rpx 16rpx 0;
				}
			}
		}
	}
}
</style>
