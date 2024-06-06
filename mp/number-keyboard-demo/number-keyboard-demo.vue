<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="数字键盘"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="test-input" @click="show1 = true">
					<text v-if="value1">{{ value1 }}</text>
					<text class="placeholder" v-else>请输入</text>
				</view>
				<ste-number-keyboard v-model="value1" :show.sync="show1" />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value1: '',
			show1: false,
		};
	},
	methods: {
		beforeinput(v, suspend, next, stop) {
			suspend();
			if (v === '0') {
				stop();
			} else {
				next();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 30rpx;
	.test-input {
		height: 66rpx;
		line-height: 66rpx;
		background-color: #f5f5f5;
		padding: 0 18rpx;
		font-size: 24rpx;
		.placeholder {
			color: #999;
		}
	}
}
</style>
