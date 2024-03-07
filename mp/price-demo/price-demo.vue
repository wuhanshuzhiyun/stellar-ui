<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="价格"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">金额单位</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" fontWeight="bold" />
					</view>
					<view>
						<ste-price value="9527" valueUnit="yuan" />
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
				<view class="title">金额文字颜色</view>
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
				<view class="title">行高</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" lineHeight="50" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">金额样式</view>
				<view class="item-block" style="display: block">
					<view>
						<ste-price value="9527" :styleType="1" fontSize="20" marginRight="30" />
						<ste-price value="9527" :styleType="1" fontSize="40" marginRight="30" />
						<ste-price value="9527" :styleType="1" fontSize="60" />
					</view>
					<view>
						<ste-price value="9527" :styleType="2" fontSize="28" marginRight="30" />
						<ste-price value="9527" :styleType="2" fontSize="40" marginRight="30" />
						<ste-price value="9527" :styleType="2" fontSize="60" />
					</view>
					<view>
						<ste-price value="9527" :styleType="3" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">金额字重</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" fontWeight="bold" fontSize="50" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">格式化内容</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" :formatter="formatter" />
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
	methods: {
		formatter(price) {
			// 入参是传入的value值
			return (price / 100).toFixed(3);
		},
	},
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
