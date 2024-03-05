<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="图片"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<view class="image-box">
						<ste-image :src="demoUrl" width="200" height="200" />
					</view>
					<view class="image-box">
						<ste-image :src="demoUrl" width="200" height="200" mode="aspectFit" />
					</view>
					<view class="image-box">
						<ste-image :src="demoUrl" width="200" height="200" mode="aspectFill" />
					</view>
					<view class="image-box">
						<ste-image :src="demoUrl" width="200" height="200" mode="widthFix" />
					</view>
					<view class="image-box">
						<ste-image :src="demoUrl" width="200" height="200" mode="heightFix" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">圆角</view>
				<view class="item-block">
					<ste-image :src="demoUrl" radius="50%" width="200" height="200" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">加载效果</view>
				<view class="item-block">
					<view class="image-box">
						<ste-image :src="imgUrl" width="200" height="200" />
					</view>
					<view class="image-box">
						<ste-image :src="imgUrl" showLoading width="200" height="200" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">加载失败</view>
				<view class="item-block">
					<view class="image-box">
						<ste-image :src="errorUrl" showLoading width="200" height="200" />
					</view>
					<view class="image-box">
						<ste-image :src="errorImg" :showError="false" width="200" height="200" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">具名插槽</view>
				<view class="item-block">
					<ste-image :src="errorUrl" showLoading width="200" height="200">
						<view class="image-box">
							<template v-slot:loading>Loading...</template>
						</view>
						<view class="image-box">
							<template v-slot:error>Error</template>
						</view>
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
			demoUrl: 'https://image.whzb.com/chain/StellarUI/图片.jpg',
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
				this.imgUrl = 'https://image.whzb.com/chain/StellarUI/图片.jpg';
				this.errorUrl = 'https://image.whzb.com/chain/StellarUI/error.png';
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
				& > .image-box {
					margin: 0 8px 8px 0;
					display: inline-block;
				}
			}
		}
	}
}
</style>