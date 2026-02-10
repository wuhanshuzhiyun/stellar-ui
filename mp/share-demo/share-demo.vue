<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="选择框"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Share 分享</view>
				<view class="cmp-desc">分享组件。</view>
			</view>
			<view class="type-block">
				<view>01 组件类型</view>
			</view>
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-button @click="open = true">分享</ste-button>
				<ste-share :open="open" @close="open = false" @share="share"></ste-share>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			open: false,
		};
	},
	methods: {
		share(type) {
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneTimeline',
				type: 0,
				href: 'http://uniapp.dcloud.io/',
				title: 'uni-app分享',
				summary: '我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！',
				imageUrl: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png',
				success: function (res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function (err) {
					console.log('fail:' + JSON.stringify(err));
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
			}
		}
	}
}
</style>
