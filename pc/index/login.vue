<template>
	<view class="pc-login-body">
		<view class="login-form">
			<view class="title">扫码登录</view>
			<view class="qr-image">
				<image :src="qrImage" mode=""></image>
				<div class="status-message" v-if="status === 1">
					<div>已扫码</div>
					<div>请确认登录</div>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
import { setToken } from '../../common/token.js';
import { isLogin } from '@/common/account.js';
import SSE from './sse.js';
import config from '@/common/config.js';
export default {
	data() {
		return {
			uuid: '',
			sse: null,
			status: 0,
		};
	},
	computed: {
		qrImage() {
			if (!this.uuid) return '';
			return `${config.BASE_URL}/api/wxcode?uuid=${this.uuid}`;
		},
	},
	async onShow() {
		const token = await isLogin();
		if (token) {
			console.log('已登录');
			// 跳转到首页
			this.$nextTick(() => {
				uni.redirectTo({
					url: '/pages/index/index',
				});
			});
			return;
		}
		const uuid = this.initUUID();
		this.uuid = uuid;
		this.initSSE();
	},
	methods: {
		initUUID() {
			let uuid = uni.getStorageSync('uuid');
			if (uuid) return uuid;
			uuid = Date.now().toString(32);
			for (let i = 0; i < 10; i++) {
				uuid += Math.floor(Math.random() * 32).toString(32);
			}
			uni.setStorageSync('uuid', uuid);
			return uuid;
		},
		initSSE() {
			const sse = new SSE();
			sse.onmessage((data) => {
				if (data === 'open-login') {
					// 微信已扫码
					this.status = 1;
				} else if (data && typeof data === 'string') {
					// 微信已确认登录
					setToken(data);
					sse.close();
					this.$nextTick(() => {
						uni.redirectTo({
							url: '/pages/index/index',
						});
					});
				}
			});
		},
	},
};
</script>

<style lang="scss">
.pc-login-body {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background: linear-gradient(45deg, #3f3f3f, #1990ff, #3f3f3f);

	.login-form {
		width: 300px;
		height: 360px;
		background-color: #fff;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 12px;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
		.title {
			height: 60px;
			line-height: 60px;
			font-size: 20px;
			font-weight: bold;
			text-align: center;
			color: #1990ff;
		}
		.qr-image {
			width: 100%;
			height: calc(100% - 60px);
			border-top: 1px solid #1990ff80;
			padding: 30px;
			position: relative;
			image {
				width: 100%;
				height: 100%;
			}
			.status-message {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background: rgba(0, 0, 0, 0.7);
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-size: 24px;
				font-weight: bold;
			}
		}
	}
}
</style>
