<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="二维码"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">QRcode 二维码</view>
				<view class="cmp-desc">能够将文本转换生成二维码的组件，支持自定义配色和 Logo 配置</view>
			</view>
			<view class="type-block">
				<view>01 组件类型</view>
			</view>
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view>
						<ste-qrcode :content="content" />
					</view>
				</view>
			</view>
			<view class="type-block">
				<view>02 组件样式</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义颜色</view>
				<view class="item-block">
					<view>
						<ste-qrcode :content="content" foreground="#c11" background="#dad" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">带logo</view>
				<view class="item-block">
					<view>
						<ste-qrcode
							:content="content"
							foregroundImageSrc="https://image.whzb.com/chain/StellarUI/logo.png"
						/>
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
			content: '',
		};
	},
	created() {},
	onReady() {
		setTimeout(() => {
			this.content = 'https://stellar-ui.intecloud.com.cn/mp/index/index';
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
