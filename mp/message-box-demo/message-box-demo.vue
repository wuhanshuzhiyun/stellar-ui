<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="弹框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view style="width: 100%">
						<!-- <ste-button :mode="100">打开弹框</ste-button> -->
						<!-- <ste-message-box></ste-message-box> -->
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">使用</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-button :mode="100" @click="click1">打开1</ste-button>
					</view>
					<view>
						<ste-button :mode="100" @click="click2">打开2</ste-button>
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
	created() {},
	methods: {
		click1() {
			this.showToast({
				title: '提示内容',
				duration: 1500,
				mask: true,
			});
		},
		click2() {
			this.showMsgBox({
				title: '你好',
				content: '你真的好吗',
				// editable: true,
				icon: 'error',
				confirm: (v) => {
					console.log('点击了确认', v);
				},
				cancel: (v) => {
					console.log('点击了取消', v);
				},
				complete: (v) => {
					console.log('弹框完成', v);
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		// background: rgba(15, 15, 15, 0.7);
		.demo-item {
			.item-block {
				> view {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
