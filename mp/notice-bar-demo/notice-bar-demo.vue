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
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: ['中百集团提醒您：请勿在非中百官方渠道购卡，请勿相信任何非中百卡官方渠道'],
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
