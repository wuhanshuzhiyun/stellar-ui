<template>
	<view class="test-demo">
		<ste-upload></ste-upload>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
		};
	},
	mounted() {
		setTimeout(() => {
			this.list = [];
		}, 2000);
	},
};
</script>

<style scoped>
.test-demo {
	padding-top: 120rpx;
}
</style>
