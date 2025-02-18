<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="弹框"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">MessageBox 弹窗</view>
				<view class="cmp-desc">一种打断当前操作的模态视图，用于显示重要提示或请求用户进行重要操作</view>
			</view>
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view>
						<ste-button @click="msgBox">提示</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">带图标</view>
				<view class="item-block">
					<view>
						<ste-button @click="msgBoxIcon1">图标1</ste-button>
					</view>
					<view>
						<ste-button @click="msgBoxIcon2">图标2</ste-button>
					</view>
					<view>
						<ste-button @click="msgBoxIcon3">图标3</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义按钮</view>
				<view class="item-block">
					<view>
						<ste-button @click="msgBoxBtn1">按钮文字</ste-button>
					</view>
					<view>
						<ste-button @click="msgBoxBtn2">按钮颜色</ste-button>
					</view>
					<view>
						<ste-button @click="msgBoxBtn3">无取消按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">带输入框</view>
				<view class="item-block">
					<view>
						<ste-button @click="msgBoxInput">输入框</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">插槽</view>
				<view class="item-block">
					<view>
						<ste-button @click="customClick">插槽</ste-button>
						<ste-message-box selector="myMsgBox">
							<view style="display: flex; justify-content: center; padding-bottom: 48rpx; width: 570rpx">
								<ste-rate v-model="rate"></ste-rate>
							</view>
						</ste-message-box>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">回调事件</view>
				<view class="item-block">
					<view>
						<ste-button @click="msgBoxCallback1">取消</ste-button>
					</view>
					<view>
						<ste-button @click="msgBoxCallback2">确认</ste-button>
					</view>
					<view>
						<ste-button @click="msgBoxCallback3">完成</ste-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import useSteMsgBox from '@/uni_modules/stellar-ui/components/ste-message-box/ste-message-box.js';
const msgBox = useSteMsgBox('myMsgBox');
export default {
	data() {
		return {
			rate: 0,
		};
	},
	created() {},
	methods: {
		customClick() {
			msgBox.showMsgBox({
				title: '评分',
			});
		},
		msgBox() {
			this.showMsgBox({
				title: '确认删除订单吗？',
			});
		},
		msgBoxIcon1() {
			this.showMsgBox({
				title: '提示1',
				icon: 'info',
			});
		},
		msgBoxIcon2() {
			this.showMsgBox({
				title: '提示2',
				icon: 'success',
			});
		},
		msgBoxIcon3() {
			this.showMsgBox({
				title: '提示3',
				icon: 'error',
			});
		},
		msgBoxBtn1() {
			this.showMsgBox({
				title: '提示1',
				content: '确认删除订单吗1？',
				cancelText: '算了',
				confirmText: '删吧',
			});
		},
		msgBoxBtn2() {
			this.showMsgBox({
				title: '提示2',
				content: '确认删除订单吗2？',
				cancelColor: '#e1e',
				confirmColor: '#a8ae1e',
			});
		},
		msgBoxBtn3() {
			this.showMsgBox({
				title: '提示3',
				content: '确认删除订单吗3？',
				showCancel: false,
			});
		},
		msgBoxInput() {
			this.showMsgBox({
				title: '提示',
				content: '确认删除订单吗？',
				editable: true,
				placeholderText: '请输入',
			});
		},
		msgBoxCallback1() {
			this.showMsgBox({
				title: '提示1',
				cancel: () => {
					this.$showToast({
						title: '点击了取消',
					});
				},
			});
		},
		msgBoxCallback2() {
			this.showMsgBox({
				title: '提示2',
				confirm: () => {
					this.$showToast({
						title: '点击了确认',
					});
				},
			});
		},
		msgBoxCallback3() {
			this.showMsgBox({
				title: '提示3',
				complete: () => {
					this.$showToast({
						title: '弹框完成',
					});
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
					margin: 0 16rpx 16rpx 0;
				}
			}
		}
	}
}
</style>
