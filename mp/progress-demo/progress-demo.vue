<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="进度条"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Progress 进度条</view>
				<view class="cmp-desc">用于展示任务当前的进度。</view>
			</view>
			<view class="demo-item">
				<view class="title">背景色</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-progress :percentage="40"></ste-progress>
					</view>
					<view style="width: 100%">
						<ste-progress
							:percentage="45"
							activeBg="https://image.whzb.com/chain/StellarUI/image/p-red.png"
							inactiveBg="#CCCCCC"
						></ste-progress>
					</view>
					<view style="width: 100%">
						<ste-progress
							:percentage="50"
							activeBg="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
						></ste-progress>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">线条粗细</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-progress :percentage="40" strokeWidth="20"></ste-progress>
					</view>
					<view style="width: 100%">
						<ste-progress :percentage="45" strokeWidth="36"></ste-progress>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">禁用</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-progress :percentage="40" disabled></ste-progress>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">长度</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-progress :percentage="40" width="80%"></ste-progress>
					</view>
					<view style="width: 100%">
						<ste-progress :percentage="45" width="200"></ste-progress>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">动画时间</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-progress :percentage="p" :duration="0.5"></ste-progress>
					</view>
					<view>
						<ste-button :mode="100" @click="add">增加</ste-button>
					</view>
					<view><ste-button :mode="100" @click="subtract">减少</ste-button></view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义文字内容</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-progress :percentage="30" pivotText="已抢30%"></ste-progress>
					</view>
					<view style="width: 100%">
						<ste-progress :percentage="40" pivotText="已抢40%" textColor="#FF1E19"></ste-progress>
					</view>
					<view style="width: 100%">
						<ste-progress :percentage="45" pivotText="已抢45%" textAlign="left"></ste-progress>
					</view>
					<view style="width: 100%">
						<ste-progress :percentage="50" pivotText="已抢50%" textSize="20"></ste-progress>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">文本显示阈值</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-progress :percentage="14" :displayTextThreshold="15"></ste-progress>
					</view>
					<view style="width: 100%">
						<ste-progress :percentage="35" :displayTextThreshold="15"></ste-progress>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义内容</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-progress
							:percentage="50"
							strokeWidth="36"
							inactiveBg="#E8EDF3"
							activeBg="https://image.whzb.com/chain/StellarUI/image/p-blue.png"
						>
							<view class="c-progress-1">
								<text>已抢50%</text>
								<view class="icon-content">
									<view class="icon-box">
										<ste-icon color="#0090FF" code="&#xe696;" size="36"></ste-icon>
									</view>
								</view>
							</view>
						</ste-progress>
					</view>
					<view style="width: 100%; margin-top: 10rpx">
						<ste-progress
							:percentage="50"
							strokeWidth="16"
							inactiveBg="#F8E1E0"
							activeBg="https://image.whzb.com/chain/StellarUI/image/p-red.png"
						>
							<view class="c-progress-2">
								<text></text>
								<view class="p-content">
									<text>50%</text>
								</view>
							</view>
						</ste-progress>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			p: 30,
		};
	},
	created() {},
	methods: {
		subtract() {
			if (this.p >= 0) {
				this.p -= 10;
			}
		},
		add() {
			if (this.p <= 100) {
				this.p += 10;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				> view {
					margin: 0 16rpx 16rpx 0;

					.c-progress-1 {
						width: 100%;
						padding-left: 16rpx;

						font-size: 16rpx;
						color: #ffffff;

						display: flex;
						align-items: center;
						justify-content: space-between;

						.icon-content {
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 99999rpx;
							background-color: rgba(0, 0, 0, 0.15);

							padding: 8rpx;

							transform: translateX(30%);
						}

						.icon-box {
							border-radius: 99999rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 4rpx;
							background-color: #ffffff;
						}
					}

					.c-progress-2 {
						.p-content {
							padding: 0 16rpx;
							background-color: #ff0000;
							border-radius: 20rpx;

							color: #ffffff;
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
}
</style>
