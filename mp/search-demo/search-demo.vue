<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
		<view class="wrapper">
			<view class="demo-block">
				<view class="title">基础用法</view>
				<view class="block-content">
					<ste-search @search="onSearch" />
				</view>
			</view>
			<view class="demo-block">
				<view class="title">双向绑定</view>
				<view class="block-content">
					<ste-search v-model="keyword" @search="onSearch" />
				</view>
			</view>
			<view class="demo-block">
				<view class="title">隐藏清除图标</view>
				<view class="block-content">
					<ste-search :show-clear="0" @search="onSearch" />
				</view>
			</view>
			<view class="demo-block">
				<view class="title">禁用</view>
				<view class="block-content">
					<ste-search disabled />
				</view>
			</view>
			<view class="demo-block">
				<view class="title">隐藏分割线</view>
				<view class="block-content">
					<ste-search :show-line="0" @search="onSearch" />
				</view>
			</view>
			<view class="demo-block">
				<view class="title">隐藏按钮</view>
				<view class="block-content">
					<ste-search :show-button="0" />
				</view>
			</view>
			<view class="demo-block">
				<view class="title">自定义按钮文字</view>
				<view class="block-content">
					<ste-search button-text="查询" @search="onSearch" />
				</view>
			</view>
			<view class="demo-block">
				<view class="title">自定义占位符</view>
				<view class="block-content">
					<ste-search placeholder="自定义占位符" @search="onSearch" />
				</view>
			</view>
			<view class="demo-block">
				<view class="title">热词列表</view>
				<view class="block-content">
					<ste-search :hot-words="hotWords" @search="onSearch" />
				</view>
			</view>
			<view class="demo-block">
				<view class="title">导航</view>
				<view class="block-content">
					<ste-search :style-type="2" @nav-address="onNavAddress" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			keyword: '一夜暴富',
			hotWords: ['中百集团', '数智云科技', '一夜暴富'],
		};
	},
	onLoad() {},
	methods: {
		onSearch(v) {
			uni.showToast({
				icon: 'none',
				title: `搜索：${v}`,
			});
		},
		onNavAddress() {
			uni.showToast({
				icon: 'none',
				title: '触发导航',
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.wrapper {
		padding: 16rpx;

		.demo-block {
			margin-bottom: 16rpx;

			.title {
				font-size: 30rpx;
				color: #8f9ca2;
				margin-bottom: 8rpx;
			}

			.block-content {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;

				> * {
					margin: 0 16rpx 16rpx 0;
				}
			}
		}
	}
}
</style>
