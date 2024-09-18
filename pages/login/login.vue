<template>
	<view class="code-page">
		<!-- #ifdef MP-WEIXIN -->
		<page-nav :autoBack="false" backColor="#000" titleAlignment="2" title="扫码登录"></page-nav>
		<view class="code-message">授权后，将在电脑端登录，若非本人操作，请忽略申请</view>
		<view class="button-box">
			<view class="button" :class="{ loading }" @click="login">
				{{ loading ? '登录中...' : '授权登录' }}
			</view>
			<view class="cancel-button" @click="cancel">取消</view>
		</view>
		<view class="uuid-text">UUID:{{ uuid }}</view>
		<!-- #endif -->
	</view>
</template>

<script>
import { getToken } from '../../common/token';
import Color from '../../uni_modules/stellar-ui/utils/Color';
import { isLogin, login } from '@/common/account.js';
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
		// #ifdef MP-WEIXIN
		if (scene) {
			this.uuid = scene;
			this.open(this.uuid);
		}
		// #endif
	},
	mounted() {},
	methods: {
		async open(uuid) {
			try {
				const { code } = await wx.login();
				await request('/api/openLogin', { uuid, code });
			} catch (e) {
				//TODO handle the exception
				console.error(e);
			}
		},
		async login() {
			// #ifdef MP-WEIXIN
			if (!this.uuid) return;
			if (this.loading) return;
			this.loading = true;
			try {
				let token = await isLogin();
				if (!token) {
					await login();
				}
				await request('/api/wechatLogin', { uuid: this.uuid }, 'POST');
				uni.switchTab({ url: '/mp/index/index' });
			} catch (e) {
				//TODO handle the exception
			}
			this.loading = false;
			// #endif
		},
		cancel() {
			uni.switchTab({ url: '/mp/index/index' });
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
	.code-message {
		width: 600rpx;
		text-align: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 28rpx;
		color: #666666;
		position: absolute;
		bottom: 480rpx;
		left: 75rpx;
	}
	.button-box {
		width: 100%;
		position: absolute;
		bottom: 240rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.button {
			width: 600rpx;
			height: 90rpx;
			line-height: 90rpx;
			background-color: #0090ff;
			border-radius: 12rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 30rpx;
			color: #ffffff;
			margin: 0 auto;
			&.loading {
				background-color: #66bbff;
			}
		}
		.cancel-button {
			margin-top: 30rpx;
			width: 240rpx;
			height: 60rpx;
			line-height: 60rpx;
			color: #0090ff;
		}
	}
	.uuid-text {
		position: absolute;
		bottom: 156rpx;
		width: 100%;
		text-align: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 30rpx;
		color: #666666;
		line-height: 0rpx;
	}
}
</style>
