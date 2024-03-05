<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="图片"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-image src="https://image.whzb.com/chain/StellarUI/logo.png" width="200" height="200" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">加载效果</view>
				<view class="item-block">
					<ste-image :src="imgUrl" width="200" height="200" style="margin-right: 12rpx" />
					<ste-image :src="imgUrl" showLoading width="200" height="200" style="margin-right: 12rpx" />
					<ste-image :src="errorUrl" showLoading width="200" height="200" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">具名插槽</view>
				<view class="item-block">
					<ste-image :src="errorUrl" showLoading width="200" height="200">
						<template v-slot:loading>Loading...</template>
						<template v-slot:error>Error</template>
					</ste-image>
				</view>
			</view>
			<ste-button @click="onloading" width="100%" :mode="300">重新加载</ste-button>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			imgUrl: '',
			errorUrl: '',
		};
	},
	watch: {},
	mounted() {
		this.onloading();
	},
	methods: {
		onloading() {
			this.imgUrl = '';
			this.errorUrl = '';
			setTimeout(() => {
				this.imgUrl = 'https://image.whzb.com/chain/StellarUI/logo.png';
				this.errorUrl = 'https://image.whzb.com/chain/StellarUI/logo-1.png';
			}, 1500);
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				display: block;
				margin-bottom: 12rpx;
				& > .ste-search {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
