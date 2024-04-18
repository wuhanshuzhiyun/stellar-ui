<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="输入框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-media-preview :urls="medias" :show="show" />
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
			show: true,
			medias: [
				'https://image.whzb.com/chain/StellarUI/图片.jpg',
				'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
				'https://image.whzb.com/chain/StellarUI/验证码背景.png',
				'https://image.whzb.com/chain/StellarUI/bg4.jpg',
				'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
				'https://image.whzb.com/chain/StellarUI/bg3.jpg',
			],
		};
	},
};
</script>
<style lang="scss" scoped>
.page {
	.content {
		background: #fbfbfc;
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
