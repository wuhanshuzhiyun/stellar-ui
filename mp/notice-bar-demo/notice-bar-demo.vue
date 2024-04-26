<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="公告栏"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-notice-bar :list="list"></ste-notice-bar>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义样式</view>
				<view class="item-block">
					<ste-notice-bar :list="list" background="#FBF8DC" color="red" :width="400"></ste-notice-bar>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">垂直滚动</view>
				<view class="item-block">
					<ste-notice-bar :list="list" background="#FBF8DC" color="red" :width="400"></ste-notice-bar>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">滚动速率/滚动的速度</view>
				<view class="item-block">
					<ste-notice-bar :list="list" background="#FBF8DC" color="red" :width="400"></ste-notice-bar>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: ['第一条:1111111111111111111111111111', '第二条:2222222222222222222222', '第三条:3333333333333'],
		};
	},
	mounted() {},
};
</script>

<style lang="scss" scoped>
.page {
	background: #00000080;
}
</style>
