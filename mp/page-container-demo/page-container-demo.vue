<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="PageContainer 页面容器"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">PageContainer 页面容器</view>
				<view class="cmp-desc">微信端使用 page-container，其他端使用 ste-popup 兼容</view>
			</view>

			<view class="type-block"><view>01 基础示例</view></view>
			<view class="demo-item">
				<view class="title">基础弹出</view>
				<view class="item-block">
					<ste-button @click="showBottom = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">底部弹出</ste-button>
					<ste-button @click="showCenter = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">居中弹出</ste-button>
					<ste-button @click="showRight = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">右侧弹出</ste-button>
				</view>
			</view>

			<view class="type-block"><view>02 交互示例</view></view>
			<view class="demo-item">
				<view class="title">事件监听</view>
				<view class="item-block">
					<ste-button @click="showEventDemo = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">打开并监听事件</ste-button>
					<view class="tips">最近事件：{{ eventLog || '暂无' }}</view>
				</view>
			</view>

			<view class="type-block"><view>03 平台差异</view></view>
			<view class="demo-item">
				<view class="title">微信专属属性</view>
				<view class="item-block">
					<ste-button @click="showWxOnly = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">
						closeOnSlideDown / overlayStyle
					</ste-button>
					<!-- #ifndef MP-WEIXIN -->
					<view class="tips">当前不是微信小程序：微信专属属性不会生效</view>
					<!-- #endif -->
				</view>
			</view>
		</view>

		<ste-page-container :show.sync="showBottom" position="bottom" :round="true" customStyle="height: 50vh;">
			<view class="box">
				<view class="box-title">底部容器</view>
				<ste-button @click="showBottom = false" :mode="200" width="220" :round="false">关闭</ste-button>
			</view>
		</ste-page-container>

		<ste-page-container :show.sync="showCenter" position="center" :round="true" customStyle="width: 70vw; height: 320rpx;">
			<view class="box">
				<view class="box-title">居中容器</view>
				<ste-button @click="showCenter = false" :mode="200" width="220" :round="false">关闭</ste-button>
			</view>
		</ste-page-container>

		<ste-page-container :show.sync="showRight" position="right" customStyle="width: 100vw; height: 15vh;">
			<view class="page-container-box">
				<view class="search-box">
					<view class="search-icon"><icon-font code="&#xe66d;" size="40"></icon-font></view>
					<view class="search-input">
						<ste-input type="text" :fontSize="32" :clearable="false" background="#fff0" placeholderStyle="color:#999999" confirmType="search"></ste-input>
					</view>
				</view>
				<view class="search-btn"><text>搜索</text></view>
			</view>
		</ste-page-container>

		<ste-page-container
			:show.sync="showEventDemo"
			position="bottom"
			customStyle="height: 40vh;"
			@beforeenter="logEvent('beforeenter')"
			@enter="logEvent('enter')"
			@afterenter="logEvent('afterenter')"
			@beforeleave="logEvent('beforeleave')"
			@leave="logEvent('leave')"
			@afterleave="logEvent('afterleave')"
			@clickoverlay="logEvent('clickoverlay')"
		>
			<view class="box">
				<view class="box-title">打开/关闭观察事件顺序</view>
				<ste-button @click="showEventDemo = false" :mode="200" width="220" :round="false">关闭</ste-button>
			</view>
		</ste-page-container>

		<ste-page-container :show.sync="showWxOnly" position="bottom" customStyle="height: 40vh;" :closeOnSlideDown="true" overlayStyle="background: rgba(0, 144, 255, 0.45);">
			<view class="box">
				<view class="box-title">微信下可下滑关闭 + 自定义遮罩样式</view>
				<ste-button @click="showWxOnly = false" :mode="200" width="220" :round="false">关闭</ste-button>
			</view>
		</ste-page-container>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showBottom: false,
			showCenter: false,
			showRight: false,
			showEventDemo: false,
			showWxOnly: false,
			eventLog: '',
		};
	},
	methods: {
		logEvent(name) {
			this.eventLog = name;
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.tips {
			margin-top: 12rpx;
			font-size: 24rpx;
			color: #666;
		}
		.item-block {
			display: block;
			> view {
				margin: 0 16rpx 16rpx 0;
			}
			> button,
			> .ste-button {
				margin-bottom: 16rpx;
			}
		}
	}
	.page-container-box {
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		bottom: 14rpx;
		left: 0;
		width: 100vw;
		.search-box {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 66rpx;
			width: 600rpx;
			border-radius: 40rpx;
			background-color: #f4f5f6;
			.search-icon {
				margin-left: 15rpx;
			}

			.search-input {
				width: 400rpx;
				margin-left: -9rpx;
			}
		}
		.search-btn {
			color: #181818;
		}
	}
	.box {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 24rpx;
		padding: 24rpx;
		box-sizing: border-box;
	}

	.box-title {
		font-size: 28rpx;
		color: #333;
		text-align: center;
	}
}
</style>
