<template>
	<view class="code-page">
		<!-- #ifdef MP-WEIXIN -->
		<page-nav :autoBack="false" backColor="#000" titleAlignment="2" title="验证码"></page-nav>
		<view class="code-text">{{ code }}</view>
		<view class="code-message">验证码只能使用一次</view>
		<view class="button-box">
			<view class="button" :class="{ loading }" @click="getCode(uuid)">
				{{ loading ? '加载中' : '刷新验证码' }}
			</view>
		</view>
		<view class="uuid-text">UUID:{{ uuid }}</view>

		<!-- #endif -->
	</view>
</template>

<script>
import Color from '../../uni_modules/stellar-ui/utils/Color';
import request from '@/common/request.js';
export default {
	data() {
		return {
			uuid: '',
			code: '',
			loading: false,
		};
	},
	onLoad({ scene }) {
		if (scene) {
			this.uuid = scene;
			uni.setStorageSync('code-uuid', scene);
		} else {
			const uuid = uni.getStorageSync('code-uuid');
			if (uuid) {
				this.uuid = uuid;
			}
		}
		this.getCode(this.uuid);
	},
	mounted() {},
	methods: {
		getCode(uuid) {
			if (!this.uuid) return;
			// #ifdef MP-WEIXIN
			if (this.loading) return;
			this.loading = true;
			setTimeout(async () => {
				try {
					const { code } = await wx.login();
					this.code = await request(`/api/getwxcode?code=${code}&uuid=${uuid}`);
					this.loading = false;
				} catch (e) {
					//TODO handle the exception
					this.loading = false;
				}
			});
			// #endif
		},
	},
};
</script>

<style lang="scss" scoped>
.code-page {
	text-align: center;
	background-image: url(https://image.whzb.com/chain/StellarUI/验证码背景.png);
	background-size: 100% auto;
	width: 100vw;
	height: 100vh;
	background-color: #f6f9ff;
	position: relative;

	.code-text {
		width: 100%;
		text-align: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: bold;
		font-size: 80rpx;
		color: #000000;
		line-height: 114rpx;
		height: 114rpx;
		position: absolute;
		bottom: 582rpx;
	}
	.code-message {
		width: 100%;
		height: 50rpx;
		text-align: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 36rpx;
		color: #666666;
		position: absolute;
		bottom: 524rpx;
	}
	.button-box {
		width: 100%;
		position: absolute;
		bottom: 372rpx;
		.button {
			width: 438rpx;
			height: 96rpx;
			line-height: 96rpx;
			background-color: #0090ff;
			border-radius: 48rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 36rpx;
			color: #ffffff;
			margin: 0 auto;
			&.loading {
				background-color: #66bbff;
			}
		}
	}
	.uuid-text {
		position: absolute;
		bottom: 156rpx;
		width: 100%;
		text-align: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 36rpx;
		color: #666666;
		line-height: 0rpx;
	}
}
</style>
