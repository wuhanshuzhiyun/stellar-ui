<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="视频"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-video
							title="视频标题视频标题"
							src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
						></ste-video>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">可选择清晰度</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-video title="视频标题视频标题" :resolution="resolutionConfigArr"></ste-video>
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
			resolutionConfigArr: [
				{ text: '流畅', url: 'https://image.whzb.com/chain/StellarUI/video/demo1.mp4' },
				{ text: '高清', url: 'https://image.whzb.com/chain/StellarUI/video/demo2.mp4' },
			],
		};
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
					// margin: 0 36px 36px 0;
					margin-bottom: 36rpx;
				}
			}
		}
	}
}
</style>
