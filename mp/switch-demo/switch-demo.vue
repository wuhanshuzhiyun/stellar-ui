<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="开关"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Switch 开关</view>
				<view class="cmp-desc">用于控制某个功能的开启和关闭。</view>
			</view>
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-switch v-model="value1"></ste-switch>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">只读</view>
				<view class="item-block">
					<ste-switch v-model="value2" readonly></ste-switch>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">禁用</view>
				<view class="item-block">
					<ste-switch v-model="value2" disabled></ste-switch>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义大小</view>
				<view class="item-block">
					<ste-switch v-model="value3" size="100"></ste-switch>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义颜色</view>
				<view class="item-block">
					<ste-switch v-model="value4" activeColor="#13CE66" inactiveColor="#FF4949"></ste-switch>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">加载状态</view>
				<view class="item-block">
					<ste-switch v-model="value2" loading></ste-switch>
					<view style="margin: 0 20rpx"></view>
					<ste-switch v-model="value5" loading></ste-switch>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">回调事件</view>
				<view class="item-block switch-box">
					<ste-switch v-model="value6" @click="click1" @change="change"></ste-switch>
					<text>在click事件后，执行change事件</text>
					<ste-switch v-model="value7" @click="click2" @change="change"></ste-switch>
					<text>在click事件后，阻止change事件</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			value1: false,
			value2: true,
			value3: false,
			value4: false,
			value5: false,
			value6: false,
			value7: false,
		};
	},
	methods: {
		click1(value) {
			this.showToast({
				icon: 'none',
				title: `点击：${value} 开关的值`,
			});
		},
		click2(value, allowStop, resolve) {
			this.showToast({
				icon: 'none',
				title: `点击：${value} 开关的值`,
			});
			// 阻止change事件
			allowStop();
		},
		change(value) {
			setTimeout(() => {
				this.showToast({
					icon: 'none',
					title: `改变：${value} 开关的值`,
				});
			}, 1000);
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.switch-box {
		flex-direction: column !important;
		row-gap: 20rpx;
		align-items: flex-start !important;
		justify-content: center;
	}
}
</style>
