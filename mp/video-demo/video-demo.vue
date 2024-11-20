<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="视频"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Video 视频</view>
				<view class="cmp-desc">用于播放视频</view>
			</view>
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-video
							title="视频标题视频标题"
							src="https://zboa.whzb.com/newapp_cc_img_dev/blade/upload/20240617/be8318a4ed5a2ab58130fde96decf696.mp4"
						></ste-video>
					</view>
				</view>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="demo-item">
				<view class="title">可选择清晰度</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-video title="视频标题视频标题" :resolution="resolutionConfigArr"></ste-video>
					</view>
				</view>
			</view>
			<!-- #endif -->
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
