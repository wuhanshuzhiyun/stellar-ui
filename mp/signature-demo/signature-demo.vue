<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="签名"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="signature-box">
					<ste-signature ref="signature" type="jpg" />
				</view>
				<ste-button @click="clear">清除</ste-button>
				<ste-button @click="upstep">上一步</ste-button>
				<ste-button @click="save">保存并预览</ste-button>
				<ste-media-preview :show.sync="show" :urls="urls"></ste-media-preview>
			</view>
			<view class="demo-item">
				<view class="title">画笔颜色和线宽</view>
				<view class="signature-box">
					<ste-signature strokeColor="#f0f" lineWidth="1" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			urls: '',
		};
	},
	methods: {
		clear() {
			this.$refs.signature.clear();
		},
		upstep() {
			this.$refs.signature.back();
		},
		save() {
			this.$refs.signature.save(
				(base64) => {
					this.urls = [base64];
					this.show = true;
				},
				(err) => {
					uni.showToast({
						title: err,
						icon: 'none',
					});
				}
			);
		},
	},
};
</script>
<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.signature-box {
				width: 100%;
				height: 300rpx;
				background-color: #f5f5f5;
				margin-bottom: 30rpx;
			}
		}
	}
}
</style>
