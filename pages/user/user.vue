<template>
	<view class="user-body">
		<view class="user-info" v-if="userInfo">
			<image class="user-avatar" :src="userInfo.avatar_url" mode="widthFix"></image>
			<view class="user-account">{{ userInfo.account.toLocaleUpperCase() }}</view>
			<view class="user-name">{{ userInfo.nickname }}</view>
			<view class="button" @click="outlogin">退出登录</view>
		</view>
		<view class="not-info" v-else>
			<view class="button" @click="login">{{ isAjax ? '登录中...' : '微信一键登录' }}</view>
		</view>
	</view>
</template>

<script>
import { removeToken } from '../../common/token';
import { getInfo, login, logout } from '@/common/account.js';
export default {
	data() {
		return {
			isAjax: false,
			userInfo: null,
		};
	},
	onLoad() {
		this.getInfo();
	},
	methods: {
		async getInfo() {
			const info = await getInfo();
			if (info) {
				this.userInfo = info;
			}
		},
		async login() {
			try {
				this.isAjax = true;
				await login();
				this.userInfo = await this.getInfo();
			} catch (e) {}
			this.isAjax = false;
		},
		// 退出登录
		outlogin() {
			uni.showModal({
				title: '提示',
				content: '确定退出登录吗？',
				success: async (res) => {
					if (res.confirm) {
						await logout();
						this.userInfo = null;
					}
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.user-body {
	width: 100vw;
	height: 100vh;
	.user-info {
		margin-top: 240rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.user-avatar {
			width: 240rpx;
			height: 240rpx;
			border-radius: 50%;
			margin: 0 auto;
			margin-top: 100rpx;
		}
		.user-account {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 30rpx;
			color: #999;
		}
		.user-name {
			width: 100%;
			font-size: 40rpx;
			text-align: center;
		}
		.button {
			background-color: red;
		}
	}
	.not-info {
		width: 100%;
		height: 100%;
		background-image: url(https://image.whzb.com/chain/StellarUI/验证码背景.png);
		background-size: 100% auto;
		position: relative;
		.button {
			background-color: #0090ff;
		}
	}
	.button {
		width: 690rpx;
		height: 90rpx;
		position: absolute;
		left: 30rpx;
		bottom: 100rpx;
		background-color: #0090ff;
		color: #fff;
		border-radius: 10rpx;
		font-size: 30rpx;
		text-align: center;
		line-height: 90rpx;
	}
}
</style>
