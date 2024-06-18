<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="视频"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table></ste-table>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.page {
	background-color: #ffffff;
	.content {
		padding: 0 20rpx;
		.demo-item {
			.item-block {
				> view {
					margin-bottom: 36rpx;
				}
			}
		}
	}
}
</style>
