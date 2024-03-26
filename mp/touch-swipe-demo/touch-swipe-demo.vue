<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-touch-swipe>
						<ste-touch-swipe-item>1</ste-touch-swipe-item>
						<ste-touch-swipe-item>2</ste-touch-swipe-item>
						<ste-touch-swipe-item>3</ste-touch-swipe-item>
					</ste-touch-swipe>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				display: block;
				margin-bottom: 12rpx;
			}
		}
	}
}
</style>
