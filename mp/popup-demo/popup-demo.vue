<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="弹出层"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Popup 弹窗层</view>
				<view class="cmp-desc">由其他控件触发，屏幕滑出或弹出一块自定义内容区域</view>
			</view>
			<view class="type-block">
				<view>01 组件类型</view>
			</view>
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block block">
					<view>
						<ste-button
							@click="showTop = true"
							:mode="200"
							width="100%"
							:round="false"
							background="#ffffff"
							border-color="#0091FF"
							color="#0091FF"
						>
							顶部弹出
						</ste-button>
					</view>
					<view>
						<ste-button
							@click="showBottom = true"
							:mode="200"
							width="100%"
							:round="false"
							background="#ffffff"
							border-color="#0091FF"
							color="#0091FF"
						>
							底部弹出
						</ste-button>
					</view>
					<view>
						<ste-button
							@click="show = true"
							:mode="200"
							width="100%"
							:round="false"
							background="#ffffff"
							border-color="#0091FF"
							color="#0091FF"
						>
							中间弹出
						</ste-button>
					</view>
					<view>
						<ste-button
							@click="showLeft = true"
							:mode="200"
							width="100%"
							:round="false"
							background="#ffffff"
							border-color="#0091FF"
							color="#0091FF"
						>
							左侧弹出
						</ste-button>
					</view>
					<view>
						<ste-button
							@click="showRight = true"
							:mode="200"
							width="100%"
							:round="false"
							background="#ffffff"
							border-color="#0091FF"
							color="#0091FF"
						>
							右侧弹出
						</ste-button>
					</view>
				</view>
			</view>
			<view class="type-block">
				<view>02 组件样式</view>
			</view>
			<view class="demo-item">
				<view class="title">背景色</view>
				<view class="item-block">
					<ste-button
						@click="bgShow = true"
						:mode="200"
						width="100%"
						:round="false"
						background="#ffffff"
						border-color="#0091FF"
						color="#0091FF"
					>
						背景色弹窗
					</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">大小</view>
				<view class="item-block">
					<view>
						<ste-button
							@click="sizeShow1 = true"
							:mode="200"
							width="100%"
							:round="false"
							background="#ffffff"
							border-color="#0091FF"
							color="#0091FF"
						>
							宽: 300 高：500
						</ste-button>
					</view>
					<view>
						<ste-button
							@click="sizeShow2 = true"
							:mode="200"
							width="100%"
							:round="false"
							background="#ffffff"
							border-color="#0091FF"
							color="#0091FF"
						>
							宽: '100vw' 高：300
						</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">圆角</view>
				<view class="item-block">
					<ste-button
						@click="roundShow = true"
						:mode="200"
						width="100%"
						:round="false"
						background="#ffffff"
						border-color="#0091FF"
						color="#0091FF"
					>
						圆角弹窗
					</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">偏移</view>
				<view class="item-block">
					<ste-button
						@click="offsetShow = true"
						:mode="200"
						width="100%"
						:round="false"
						background="#ffffff"
						border-color="#0091FF"
						color="#0091FF"
					>
						偏移
					</ste-button>
				</view>
			</view>
			<view class="type-block">
				<view>03 组件状态</view>
			</view>
			<view class="demo-item">
				<view class="title">是否遮罩关闭</view>
				<view class="item-block">
					<view>
						<ste-button
							@click="maskShow1 = true"
							:mode="200"
							width="100%"
							:round="false"
							background="#ffffff"
							border-color="#0091FF"
							color="#0091FF"
						>
							遮罩可关闭
						</ste-button>
					</view>
					<view>
						<ste-button
							@click="maskShow2 = true"
							:mode="200"
							width="100%"
							:round="false"
							background="#ffffff"
							border-color="#0091FF"
							color="#0091FF"
						>
							遮罩不可关闭
						</ste-button>
					</view>
				</view>
			</view>

			<view class="demo-item">
				<view class="title">动画执行时间</view>
				<view class="item-block">
					<ste-button
						@click="durationShow = true"
						:mode="200"
						width="100%"
						:round="false"
						background="#ffffff"
						border-color="#0091FF"
						color="#0091FF"
					>
						动画执行时间
					</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">异步关闭</view>
				<view class="item-block">
					<ste-button
						@click="syncShow = true"
						:mode="200"
						width="100%"
						:round="false"
						background="#ffffff"
						border-color="#0091FF"
						color="#0091FF"
					>
						异步关闭
					</ste-button>
				</view>
			</view>
		</view>
		<!-- ******************** -->
		<!-- 弹窗 -->
		<ste-popup :show.sync="show" width="300" height="300">
			<view class="popup-content"></view>
		</ste-popup>
		<!-- 背景色 -->
		<ste-popup :show.sync="bgShow" width="300" height="300" backgroundColor="#eff3dd">
			<view class="popup-content">背景色</view>
		</ste-popup>
		<!-- 遮罩 -->
		<ste-popup :show.sync="maskShow1" width="300" height="300">
			<view class="popup-content">遮罩可关闭</view>
		</ste-popup>
		<ste-popup :show.sync="maskShow2" width="300" height="300" :isMaskClick="false">
			<view class="popup-content">遮罩不可关闭</view>
		</ste-popup>
		<!-- 大小 -->
		<ste-popup :show.sync="sizeShow1" width="300" height="500">
			<view class="popup-content">300*500</view>
		</ste-popup>
		<ste-popup :show.sync="sizeShow2" width="100vw" height="300">
			<view class="popup-content">100vw*300</view>
		</ste-popup>
		<!-- 位置 -->
		<ste-popup :show.sync="showTop" height="300" width="100vw" position="top">
			<view class="popup-content"></view>
		</ste-popup>
		<ste-popup :show.sync="showBottom" height="300" width="100vw" position="bottom" round>
			<view class="popup-content"></view>
		</ste-popup>
		<ste-popup :show.sync="showLeft" width="300" height="100vh" position="left">
			<view class="popup-content"></view>
		</ste-popup>
		<ste-popup :show.sync="showRight" width="300" height="100vh" position="right">
			<view class="popup-content"></view>
		</ste-popup>
		<!-- 圆角 -->
		<ste-popup :show.sync="roundShow" width="300" height="300" round>
			<view class="popup-content">圆角</view>
		</ste-popup>
		<!-- 偏移 -->
		<ste-popup :show.sync="offsetShow" width="300" height="300" offsetX="50" offsetY="-50">
			<view class="popup-content">偏移</view>
		</ste-popup>
		<!-- 动画执行时间 -->
		<ste-popup :show.sync="durationShow" width="300" height="300" :duration="800" :keepContent="false">
			<view class="popup-content">动画执行时间</view>
		</ste-popup>
		<!-- 异步关闭 -->
		<ste-popup :show.sync="syncShow" width="100vw" height="300" @close="syncClose" position="bottom">
			<view class="popup-content">异步关闭</view>
		</ste-popup>
	</view>
</template>
<script>
export default {
	data() {
		return {
			show: false,
			bgShow: false,
			maskShow1: false,
			maskShow2: false,
			sizeShow1: false,
			sizeShow2: false,
			showTop: false,
			showBottom: false,
			showLeft: false,
			showRight: false,
			roundShow: false,
			offsetShow: false,
			durationShow: false,
			syncShow: false,
		};
	},
	created() {
		// this.show1 = true;
	},
	methods: {
		click2() {},
		syncClose(allowStop, resolve) {
			allowStop();
			this.showToast({
				title: '加载中...',
				icon: 'loading',
				duration: 2500,
			});
			setTimeout(() => {
				this.hideToast();
				resolve();
			}, 2000);
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.popup-content {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 100%;
		width: 100%;
	}
	.content {
		.demo-item {
			.item-block {
				display: block;
				&.block {
					display: block;
				}
				> view {
					margin: 0 16rpx 16rpx 0;
				}
			}
		}
	}
}
</style>
