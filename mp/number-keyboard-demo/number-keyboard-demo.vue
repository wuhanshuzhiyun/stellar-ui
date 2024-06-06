<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="数字键盘"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="test-input" @click="show1 = true">
					<text v-if="value1">{{ value1 }}</text>
					<text v-else class="placeholder">请输入</text>
				</view>
				<ste-number-keyboard v-model="value1" :show.sync="show1" />
			</view>
			<view class="demo-item">
				<view class="title">隐藏右侧功能键</view>
				<view class="test-input" @click="show2 = true">
					<text v-if="value2">{{ value2 }}</text>
					<text v-else class="placeholder">请输入</text>
				</view>
				<ste-number-keyboard :rightKeys="false" v-model="value2" :show.sync="show2" />
			</view>
			<view class="demo-item">
				<view class="title">隐藏清除按钮</view>
				<view class="test-input" @click="show3 = true">
					<text v-if="value3">{{ value3 }}</text>
					<text v-else class="placeholder">请输入</text>
				</view>
				<ste-number-keyboard :showClear="false" v-model="value3" :show.sync="show3" />
			</view>
			<view class="demo-item">
				<view class="title">自定义按键（建议不超过两个）</view>
				<view class="test-input" @click="show4 = true">
					<text v-if="value4">{{ value4 }}</text>
					<text v-else class="placeholder">请输入</text>
				</view>
				<ste-number-keyboard :customKeys="['00', '.']" v-model="value4" :show.sync="show4" />
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
			value2: '',
			show2: false,
			value3: '',
			show3: false,
			value4: '',
			show4: false,
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
