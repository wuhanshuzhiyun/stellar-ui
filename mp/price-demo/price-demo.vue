<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="按钮"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">金额单位</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" />
					</view>
					<view>
						<ste-price value="95" valueUnit="yuan" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">金额文字尺寸</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" fontSize="50" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">文字颜色</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" color="green" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">划线价 & 划线价颜色</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" isSuggestPrice />
					</view>
					<view>
						<ste-price value="9527" isSuggestPrice linePriceColor="#666666" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">金额样式</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" :styleType="1" />
					</view>
					<view>
						<ste-price value="9527" :styleType="2" />
					</view>
					<view>
						<ste-price value="9527" :styleType="3" />
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
	created() {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				> view {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
