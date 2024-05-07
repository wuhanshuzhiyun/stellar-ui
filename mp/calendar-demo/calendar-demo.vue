<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="日历"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="demo-code">
					<ste-calendar defaultDate="2024-07-01" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {};
	},
	created() {},
	methods: {
		handleClick(v) {
			uni.showToast({
				title: '点击按钮' + ' ' + v,
				icon: 'none',
				duration: 1500,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.demo-code {
				width: 100%;
				height: 720rpx;
			}
		}
	}
}
</style>
