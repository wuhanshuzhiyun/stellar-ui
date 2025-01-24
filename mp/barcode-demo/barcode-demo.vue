<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="条形码"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Barcode 条形码</view>
				<view class="cmp-desc">能够将数字和字母转换生成条形码的组件，支持自定义配色</view>
			</view>
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view>
						<ste-barcode :content="content1" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义颜色</view>
				<view class="item-block">
					<view>
						<ste-barcode :content="content2" foreground="#c11" background="#dad" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			content1: '',
			content2: '',
		};
	},
	created() {},
	onReady() {
		setTimeout(() => {
			this.content1 = '123987456abc';
			this.content2 = '123456abc123';
		}, 500);
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				> view {
					margin: 0 36rpx 36rpx 0;
				}
			}
		}
	}
}
</style>
