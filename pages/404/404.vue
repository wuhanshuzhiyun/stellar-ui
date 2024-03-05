<template>
	<view class="page">
		<image :src="imageUrl"></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imageUrl: require('@/static/404.png'),
		};
	},
};
</script>
<style lang="scss" scoped>
.page {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	image {
		width: 50vw;
		height: 50vh;
	}
}
</style>
