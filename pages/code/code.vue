<template>
	<view class="code-page">
		<!-- #ifdef MP-WEIXIN -->
		<page-nav :autoBack="false" backColor="#000" titleAlignment="2" title="验证码"></page-nav>
		<view class="uuid-text">UUID:{{ uuid }}</view>
		<view class="code-title">验证码</view>
		<view class="code-text">{{ code }}</view>
		<view style="margin-top: 12rpx">
			<ste-button mode="300" @click="getCode(uuid)" :loading="loading">刷新验证码</ste-button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
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
	mounted() {
		this.getUserInfo();
	},
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
		getUserInfo() {
			// #ifdef MP-WEIXIN
			console.log(":!!!!!!!!")
			wx.getUserProfile({
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: (res) => {
					console.log('????????????????');
				},
			});
			// #endif
		},
	},
};
</script>

<style lang="scss" scoped>
.code-page {
	text-align: center;
	.uuid-text {
		width: 100%;
		font-size: 24rpx;
		color: #999;
	}
	.code-title {
		font-size: 42rpx;
		margin-top: 24rpx;
	}
	.code-text {
		display: inline-block;
		font-size: 90rpx;
		height: 120rpx;
		line-height: 120rpx;
		font-weight: bold;
		border: 1px solid #ddd;
		padding: 0 24rpx;
		border-radius: 12rpx;
		margin-top: 12rpx;
		min-width: 450rpx;
	}
}
</style>
