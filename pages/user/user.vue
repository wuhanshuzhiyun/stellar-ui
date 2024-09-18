<template>
	<view class="user-body">
		<view class="user-info" v-if="userInfo">
			<ste-upload
				v-model="fileList"
				maxCount="1"
				:deletable="false"
				preview-width="240"
				preview-height="240"
			></ste-upload>
			<view class="user-account">{{ userInfo.account }}</view>
			<input class="user-name" type="text" v-model="userInfo.nickname" placeholder="请输入昵称" />
			<view class="button update" @click="save">保存信息</view>
			<view class="button" @click="outlogin">退出登录</view>
		</view>
		<view class="not-info" v-else>
			<view class="button" @click="login">{{ isAjax ? '登录中...' : '微信一键登录' }}</view>
		</view>
	</view>
</template>

<script>
import { removeToken } from '../../common/token';
import uploadFile from '../../common/uploadFile';
import { getInfo, login, logout } from '@/common/account.js';
import request from '@/common/request.js';
export default {
	data() {
		return {
			isAjax: false,
			userInfo: null,
			fileList: [],
		};
	},
	watch: {
		fileList(val) {
			if (val && val[0] && val[0].status === 'uploading') {
				this.uploadFile(val[0]);
			}
		},
	},
	onLoad() {
		this.getInfo();
	},
	methods: {
		async getInfo(pull = false) {
			const info = await getInfo(pull);
			if (info) this.setUserInfo(info);
		},
		async login() {
			try {
				this.isAjax = true;
				await login();
				const info = await this.getInfo();
				if (info) this.setUserInfo(info);
			} catch (e) {}
			this.isAjax = false;
		},
		setUserInfo(info) {
			this.userInfo = Object.assign({}, info, { account: info.account.toLocaleUpperCase() });
			this.fileList = [{ url: info.avatar_url }];
		},
		uploadFile(file) {
			uploadFile(file.path).then((url) => {
				const newInfo = { ...this.userInfo, avatar_url: url };
				this.setUserInfo(newInfo);
			});
		},
		save() {
			request('/api/account/update', this.userInfo, 'POST').then(() => {
				uni.showToast({
					title: '保存成功',
					icon: 'none',
				});
				this.getInfo(true);
			});
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
		padding-top: 240rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
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
			&.update {
				background-color: green;
				bottom: 220rpx;
			}
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
