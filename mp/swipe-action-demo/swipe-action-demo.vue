<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="滑动单元格"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-swipe-action @open="onOpen" @close="onClose">
						<view class="content-view">内容区域</view>
						<template v-slot:right>
							<div class="test-btn">删除</div>
						</template>
					</ste-swipe-action>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">调用方法打开或关闭</view>
				<view class="item-block">
					<ste-swipe-action ref="swipe">
						<view class="content-view">内容区域</view>
						<template v-slot:right>
							<div class="test-btn">删除</div>
						</template>
					</ste-swipe-action>
					<view style="margin-top: 12rpx">
						<ste-button mode="200" @click="openSwipe">打开</ste-button>
						<ste-button mode="200" @click="closeSwipe">关闭</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">滑动方向,滑动按钮</view>
				<view class="item-block">
					<ste-swipe-action mode="all" @open="onOpen" @close="onClose" leftIcon rightIcon>
						<template v-slot:left>
							<div class="test-btn">收藏</div>
						</template>
						<view class="content-view">内容区域</view>
						<template v-slot:right>
							<div class="test-btn">删除</div>
						</template>
					</ste-swipe-action>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">单元格组</view>
				<view class="item-block">
					<ste-swipe-action-group @open="onOpen" @close="onClose" ref="swipeGroup">
						<ste-swipe-action>
							<view class="content-view">11111</view>
							<template v-slot:right>
								<div class="test-btn">删除</div>
							</template>
						</ste-swipe-action>
						<ste-swipe-action>
							<view class="content-view">22222</view>
							<template v-slot:right>
								<div class="test-btn">删除</div>
							</template>
						</ste-swipe-action>
					</ste-swipe-action-group>
					<view style="margin-top: 12rpx">
						<ste-button mode="200" @click="openSwipeGroup(0)">打开第1行</ste-button>
						<ste-button mode="200" @click="closeSwipeGroup(0)">关闭第1行</ste-button>
						<ste-button mode="200" @click="openSwipeGroup(1)">打开第2行</ste-button>
						<ste-button mode="200" @click="closeSwipeGroup(1)">关闭第2行</ste-button>
					</view>
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
	methods: {
		openSwipe() {
			this.$refs.swipe.open();
		},
		closeSwipe() {
			this.$refs.swipe.close();
		},
		openSwipeGroup(index) {
			this.$refs.swipeGroup.open('right', index);
		},
		closeSwipeGroup(index) {
			this.$refs.swipeGroup.close(index);
		},
		onOpen(direction, index) {
			this.showToast({
				title: index || index === 0 ? `第${index + 1}条的打开方向:${direction}` : `打开方向：${direction}`,
				icon: 'none',
			});
		},
		onClose(index) {
			this.showToast({
				title: index || index === 0 ? `关闭第${index + 1}条` : '关闭',
				icon: 'none',
			});
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
				.content-view {
					height: 90rpx;
					border-bottom: 1px solid #fff;
					background-color: #f5f5f5;
				}
				.test-btn {
					background-color: #dd524d;
					color: #fff;
					line-height: 90rpx;
					text-align: center;
					width: 100rpx;
					height: 100%;
				}
			}
		}
	}
}
</style>
