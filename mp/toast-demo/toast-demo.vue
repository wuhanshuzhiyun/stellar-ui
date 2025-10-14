<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="轻提示"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Toast 轻提示</view>
				<view class="cmp-desc">用于轻量级反馈或提示，不会打断用户操作。</view>
			</view>
			<view class="demo-item">
				<view class="title">文字提示</view>
				<view class="item-block item-rate">
					<ste-button @click="click1" :width="400">提示内容</ste-button>
					<ste-button @click="click2" :width="400">多行内容</ste-button>
					<ste-button @click="click3" :width="400">手动换行</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">提示类型</view>
				<view class="item-block item-rate">
					<ste-button @click="click4" :width="400">成功</ste-button>
					<ste-button @click="click5" :width="400">失败</ste-button>
					<ste-button @click="click6" :width="400">加载</ste-button>
					<ste-button @click="click7" :width="400">无</ste-button>
					<ste-button @click="click8" :width="400">自定义</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">遮罩层</view>
				<view class="item-block item-rate">
					<ste-button @click="click9" :width="400">遮罩层</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">延迟时间</view>
				<view class="item-block item-rate">
					<ste-button @click="click10" :width="400">延迟时间</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">提示队列</view>
				<view class="item-block item-rate">
					<ste-button @click="click14" :width="400">提示队列</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">回调事件</view>
				<view class="item-block item-rate">
					<ste-button @click="click11" :width="400">成功</ste-button>
					<ste-button @click="click12" :width="400">结束</ste-button>
					<ste-button @click="click13" :width="400">关闭</ste-button>
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
	mounted() {},
	methods: {
		click1() {
			uni.showToast({
				title: '提示内容',
			});
		},
		click2() {
			uni.showToast({
				title: '多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，',
			});
		},
		click3() {
			uni.showToast({
				title: '换行\n内容',
			});
		},
		click4() {
			uni.showToast({
				title: '提示内容',
			});
		},
		click5() {
			uni.showToast({
				title: '提示内容',
				icon: 'error',
			});
		},
		click6() {
			uni.showToast({
				title: '提示内容',
				icon: 'loading',
			});
			setTimeout(() => {
				this.hideToast();
			}, 4000);
		},
		click7() {
			uni.showToast({
				title: '提示内容',
				icon: 'none',
			});
		},
		click8() {
			uni.showToast({
				title: '提示内容',
				image: 'https://image.whzb.com/chain/StellarUI/组件图标/loading.png',
			});
		},
		click9() {
			uni.showToast({
				title: '提示内容',
				mask: true,
				duration: 5000,
			});
		},
		click10() {
			uni.showToast({
				title: '提示内容',
				duration: 5000,
			});
		},
		click11() {
			uni.showToast({
				title: '提示内容',
				success() {
					setTimeout(() => {
						uni.showToast({
							title: '成功',
							icon: 'none',
						});
					}, 2000);
				},
			});
		},
		click12() {
			uni.showToast({
				title: '提示内容',
				complete() {
					setTimeout(() => {
						uni.showToast({
							title: '结束',
							icon: 'none',
						});
					}, 2000);
				},
			});
		},
		click13() {
			uni.showToast({
				title: '提示内容',
				close() {
					uni.showToast({
						title: '关闭',
						icon: 'none',
					});
				},
			});
		},
		click14() {
			uni.showToast({
				title: '队列1',
				order: true,
			});
			uni.showToast({
				title: '队列2',
				duration: 4000,
				order: true,
			});
			uni.showToast({
				title: '队列3',
				order: true,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.item-rate {
		flex-direction: column;
		align-items: baseline;
		row-gap: 20rpx;
	}
}
</style>
