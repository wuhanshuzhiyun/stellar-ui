<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="走马灯"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Marquee 走马灯</view>
				<view class="cmp-desc">用于展示滚动公告、中奖名单等水平滚动信息。</view>
			</view>
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-marquee :list="list"></ste-marquee>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">调整滚动速度</view>
				<view class="item-block">
					<ste-marquee :list="list" :speed="100"></ste-marquee>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">透明背景</view>
				<view class="item-block">
					<ste-marquee
						:list="list"
						containerBg="transparent"
						containerPadding="0rpx"
						containerRadius="0rpx"
					></ste-marquee>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">卡片样式</view>
				<view class="item-block">
					<ste-marquee
						:list="list"
						containerBg="#f5f5f5"
						containerPadding="20rpx"
						containerRadius="16rpx"
						itemBg="#ffffff"
						itemPadding="12rpx 20rpx"
						itemRadius="8rpx"
						:gap="24"
					></ste-marquee>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">带图标</view>
				<view class="item-block">
					<ste-marquee :list="listWithIcon"></ste-marquee>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">点击事件</view>
				<view class="item-block">
					<ste-marquee :list="list" @click="onItemClick"></ste-marquee>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">播放控制</view>
				<view class="item-block">
					<ste-marquee ref="marqueeRef" :list="list"></ste-marquee>
					<view class="btn-group">
						<button class="ctrl-btn" @click="$refs.marqueeRef.play()">播放</button>
						<button class="ctrl-btn" @click="$refs.marqueeRef.pause()">暂停</button>
						<button class="ctrl-btn" @click="$refs.marqueeRef.stop()">停止</button>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义插槽</view>
				<view class="item-block">
					<ste-marquee :list="listWithIcon" containerBg="#f5f5f5" containerPadding="16rpx" containerRadius="16rpx">
						<template #item="{ item }">
							<view class="custom-item">
								<image class="custom-avatar" :src="item.icon" mode="aspectFit" />
								<text class="custom-text" :style="{ color: item.color || '#333' }">{{ item.text }}</text>
							</view>
						</template>
					</ste-marquee>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{ id: 1, text: '恭喜用户138****1234获得一等奖' },
				{ id: 2, text: '恭喜用户139****5678获得二等奖' },
				{ id: 3, text: '恭喜用户137****9012获得三等奖' },
				{ id: 4, text: '恭喜用户136****3456获得三等奖' },
			],
			listWithIcon: [
				{ id: 1, icon: 'https://image.whzb.com/chain/StellarUI/头像/秦鹏飞.png', text: '张三获得了超级大奖', color: '#ff5722' },
				{ id: 2, icon: 'https://image.whzb.com/chain/StellarUI/头像/秦鹏飞.png', text: '李四赢得了特等奖', color: '#2196f3' },
				{ id: 3, icon: 'https://image.whzb.com/chain/StellarUI/头像/秦鹏飞.png', text: '王五中了一等奖', color: '#4caf50' },
			],
		};
	},
	methods: {
		onItemClick(item, index) {
			uni.showToast({
				title: `点击了：${item.text}`,
				icon: 'none',
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	background: #f9f9f9;
}

.item-block {
	& > view {
		margin-bottom: 20rpx;
		&:last-child {
			margin-bottom: 0;
		}
	}
}

.btn-group {
	display: flex;
	flex-direction: row;
	gap: 20rpx;
	margin-top: 20rpx;
}

.ctrl-btn {
	// 布局
	flex: 1;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	
	// 尺寸
	padding: 0 24rpx;
	margin: 0;
	min-height: 72rpx;
	
	// 文字
	font-size: 28rpx;
	color: #333;
	line-height: 1;
	
	// 外观
	background: #ffffff;
	border: 1rpx solid #ddd;
	border-radius: 8rpx;
	
	// 点击态
	&:active {
		opacity: 0.7;
	}
	
	// 重置 button 默认样式（小程序）
	&::after {
		display: none;
		border: none;
	}
}

.custom-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 8rpx 16rpx;
	background: #fff;
	border-radius: 8rpx;
	margin-right: 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.custom-avatar {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	margin-right: 12rpx;
}

.custom-text {
	font-size: 26rpx;
	font-weight: 500;
}
</style>
