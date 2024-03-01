<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="按钮"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">按钮类型</view>
				<view class="item-block">
					<view>
						<ste-button :mode="400" @click="handleClick('超大按钮')">超大按钮</ste-button>
					</view>
					<view>
						<ste-button :mode="300" @click="handleClick('大按钮')">大按钮</ste-button>
					</view>
					<view>
						<ste-button :mode="200" @click="handleClick('中按钮')">中按钮</ste-button>
					</view>
					<view>
						<ste-button :mode="100" @click="handleClick('小按钮')">小按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">非圆角按钮</view>
				<view class="item-block">
					<view>
						<ste-button :round="false" @click="handleClick('非圆角按钮')">非圆角按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">镂空按钮</view>
				<view class="item-block">
					<view>
						<ste-button
							background="transparent"
							borderColor="#0091FF"
							color="#0091FF"
							@click="handleClick('镂空按钮')"
						>
							镂空按钮
						</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">禁止按钮</view>
				<view class="item-block">
					<view>
						<ste-button disabled @click="handleClick('禁止按钮')">禁止按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自适应宽度</view>
				<view class="item-block">
					<ste-button width="100%" @click="handleClick('自适应宽度')">自适应宽度</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">超长文字</view>
				<view class="item-block">
					<view style="width: 40%">
						<ste-button width="100%" @click="handleClick('文字超长按钮')">
							提交-按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮
						</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义背景</view>
				<view class="item-block">
					<view>
						<ste-button background="#FF1E19" @click="handleClick('领取')">领取</ste-button>
					</view>
					<view>
						<ste-button
							type="line"
							background="transparent"
							borderColor="#FF1E19"
							color="#FF1E19"
							@click="handleClick('领取')"
						>
							领取
						</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">带图标按钮</view>
				<view class="item-block">
					<view>
						<ste-button
							background="transparent"
							borderColor="#0091FF"
							color="#0091FF"
							@click="handleClick('图标按钮')"
						>
							<ste-icon code="&#xe6ae;" :size="28" color="#0090FF" :marginRight="8"></ste-icon>
							<text>购卡</text>
						</ste-button>
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
	onLoad() {},
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
			.item-block {
				> view {
					margin: 0 8px 8px 0;

					.loading-icon-box {
						.iconfont {
							animation: ste-roatae 1s linear infinite;
						}
					}
				}
			}
		}
	}

	@keyframes ste-roatae {
		0% {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(1turn);
		}
	}
}
</style>
