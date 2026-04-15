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
				<view class="title">自定义容器样式</view>
				<view class="item-block">
					<ste-marquee
						:list="list"
						containerBg="#FBF8DC"
						containerPadding="20rpx"
						containerRadius="16rpx"
					></ste-marquee>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义消息项样式</view>
				<view class="item-block">
					<ste-marquee
						:list="list"
						containerBg="#f5f5f5"
						containerPadding="16rpx"
						containerRadius="16rpx"
						itemBg="#ffffff"
						itemPadding="16rpx 24rpx"
						itemRadius="8rpx"
						:gap="30"
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
.btn-group {
	display: flex;
	flex-direction: row;
	gap: 20rpx;
	margin-top: 20rpx;
}
.ctrl-btn {
	flex: 1;
	font-size: 28rpx;
	padding: 16rpx 0;
	border-radius: 8rpx;
	background: #ffffff;
	border: 1rpx solid #ddd;
}
.custom-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-right: 40rpx;
}
.custom-avatar {
	width: 48rpx;
	height: 48rpx;
	border-radius: 50%;
	margin-right: 12rpx;
}
.custom-text {
	font-size: 28rpx;
}
</style>
