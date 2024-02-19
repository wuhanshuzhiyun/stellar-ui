<template>
	<view class="page">loading</view>
</template>
<script>
import md from './test.md';
import md2html from '@/utils/md2html.js';
export default {
	data() {
		return {
			html: 'Hello',
		};
	},
	onLoad() {
		// #ifdef H5
		uni.redirectTo({
			url: '/pc/index/index',
		});
		// #endif
		// #ifdef MP
		uni.redirectTo({
			url: '/mp/index/index',
		});
		// #endif
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.top {
	font-size: 48rpx;
	font-weight: bold;
	text-align: center;
	height: 160rpx;
	line-height: 160rpx;
	width: 100%;
}
</style>
