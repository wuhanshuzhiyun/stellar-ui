<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="图标"></page-nav>
		<view class="wrapper">
			<view class="demo-block">
				<view class="title">基础用法</view>
				<view class="block-content">
					<ste-search @search="onSearch" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			keyword: 'RTX4090 Ti',
		};
	},
	onLoad() {},
	methods: {
		onSearch(v) {
			console.log('search', v);
			uni.showToast({
				icon: 'none',
				title: `搜索：${v}`,
			});
		},
	},
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
