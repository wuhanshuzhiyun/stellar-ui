<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="图片"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Image 图片</view>
				<view class="cmp-desc">用于展示图片素材。</view>
			</view>
			<view class="type-block">
				<view>01 组件类型</view>
			</view>
			<view class="demo-item">
				<view class="title">不同填充模式的图片</view>
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
						<ste-image :src="demoUrl" width="200" mode="widthFix" />
					</view>
					<view class="image-box">
						<ste-image :src="demoUrl" height="200" mode="heightFix" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">圆角</view>
				<view class="item-block">
					<ste-image :src="demoUrl" radius="50%" width="200" height="200" />
				</view>
			</view>
			<view class="type-block">
				<view>02 组件状态</view>
			</view>
			<view class="demo-item">
				<view class="title">加载效果</view>
				<view class="item-block">
					<view class="image-box">
						<ste-image :src="imgUrl" width="200" height="200" />
						<view class="msg">加载中提示</view>
					</view>
					<view class="image-box">
						<ste-image :src="imgUrl" hiddenLoading width="200" height="200" />
						<view class="msg">隐藏加载中提示</view>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">加载失败</view>
				<view class="item-block">
					<view class="image-box">
						<ste-image :src="errorUrl" width="200" height="200" />
						<view class="msg">加载失败提示</view>
					</view>
					<view class="image-box">
						<ste-image :src="errorUrl" hiddenError width="200" height="200" />
						<view class="msg">隐藏加载失败提示</view>
					</view>
				</view>
			</view>
			<view class="type-block">
				<view>02 组件自定义</view>
			</view>
			<view class="demo-item">
				<view class="title">具名插槽</view>
				<view class="item-block">
					<ste-image :src="errorUrl" width="200" height="200">
						<template v-slot:loading>Loading...</template>
						<template v-slot:error>Error</template>
					</ste-image>
				</view>
			</view>
			<view class="bottom-box">
				<ste-button @click="onloading" width="660" :mode="300">重新加载</ste-button>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			demoUrl: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
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
		padding-bottom: 86rpx;
		.demo-item {
			.item-block {
				display: block;
				margin-bottom: 12rpx;
				& > .image-box {
					margin: 0 16rpx 16rpx 0;
					display: inline-block;
				}
				.msg {
					font-size: 24rpx;
					color: #bbbbbb;
					text-align: center;
				}
			}
		}

		.bottom-box {
			width: calc(100% - 80rpx);
			position: absolute;
			z-index: 99999;
			bottom: 0;
			padding-bottom: 26rpx;
		}
	}
}
</style>
