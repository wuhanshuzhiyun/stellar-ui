<template>
	<div class="gitlab" @click="goToHome">
		<ste-image :src="imgUrl" width="100%" mode="widthFix"></ste-image>
	</div>
</template>

<script>
export default {
	data() {
		return {
			imgUrl: '',
			type: 'vue2',
		};
	},
	mounted() {
		this.imgUrl = `https://image.whzb.com/chain/StellarUI/gialab/${this?.$Route?.query?.name ?? ''}.png`;
		this.type = this?.$Route?.query?.type ?? 'vue2';
	},
	methods: {
		goToHome() {
			// #ifdef H5
			if (this.type == 'vue3') {
				window.location.href = 'https://stellar-ui.intecloud.com.cn/plus/#/';
			} else {
				uni.redirectTo({
					url: '/pc/index/index',
				});
			}
			// #endif
			// #ifdef MP-WEIXIN
			uni.switchTab({
				url: '/mp/index/index',
			});
			// #endif
		},
	},
};
</script>

<style lang="scss" scoped>
.gitlab {
	width: 100vw;
	min-height: 100vh;
	cursor: pointer;

	image {
		width: 100vw;
	}
}
</style>
