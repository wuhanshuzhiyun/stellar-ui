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
		};
	},
	mounted() {
		this.imgUrl = `https://image.whzb.com/chain/StellarUI/gialab/${this?.$Route?.query?.name ?? ''}.png`;
	},
	methods: {
		goToHome() {
			// #ifdef H5
			uni.redirectTo({
				url: '/pc/index/index',
			});
			// #endif
			// #ifdef MP-WEIXIN
			uni.switchTab({
				url: '/mp/index/index',
			});
			// #endif
			// #ifndef MP-WEIXIN
			uni.redirectTo({
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
