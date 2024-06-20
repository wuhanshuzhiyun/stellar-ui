<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="轻提示"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>

				<button @click="show = true" id="button">基础提示</button>

				<ste-tour :show.sync="show" :steps="steps"></ste-tour>
			</view>
			<view class="demo-item">
				<view class="title">偏移量</view>
				<button id="button-2" @click="show2 = true">描述位置偏移</button>
				<ste-tour :show.sync="show2" :steps="steps2" :offset="[100, 10]"></ste-tour>
			</view>
			<view class="demo-item">
				<view class="title">多步骤</view>
				<button @click="show3 = true">多步骤</button>
				<view style="display: inline-block; padding: 6rpx 20rpx" id="button-2">
					<button size="mini" id="step-1">步骤1</button>
					<button size="mini" id="step-2">步骤2</button>
					<button size="mini" id="step-3">步骤3</button>
				</view>
				<ste-tour :show.sync="show3" :steps="steps3"></ste-tour>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			steps: [{ message: '点这里', target: 'button' }],
			show2: false,
			steps2: [{ message: '点这里', target: 'button-2' }],
			show3: false,
			steps3: [
				{ title: '步骤1', message: '先点这里', target: 'step-1' },
				{ title: '步骤2', message: '再点这里', target: 'step-2' },
				{ title: '步骤3', message: '然后点这里', target: 'step-3' },
			],
		};
	},
	computed: {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
		}
	}
}
</style>
