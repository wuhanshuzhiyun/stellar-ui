<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="吸顶"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Sticky 吸顶</view>
				<view class="cmp-desc">用于常驻页面顶部的信息、操作展示。</view>
			</view>
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="message">滚动页面,即可看到下方的按钮会吸顶。</view>

				<ste-sticky @fixed="onFixed" @unfixed="onUnfixed">
					<ste-button :round="false">粘性布局的按钮</ste-button>
				</ste-sticky>

				<view class="content-view"></view>
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
		onFixed() {
			console.log('吸顶状态时触发');
		},
		onUnfixed() {
			console.log('非吸顶状态时触发');
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				display: block;
			}
			.message {
				margin-bottom: 12rpx;
			}
			.content-view {
				margin-top: 12rpx;
				height: 200vh;
			}
		}
	}
}
</style>
