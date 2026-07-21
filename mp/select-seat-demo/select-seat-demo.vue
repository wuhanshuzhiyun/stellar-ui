<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="选择框"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">SelectSeat 座位选择</view>
				<view class="cmp-desc">用于电影院、演出等场景的座位选择，支持缩放和拖拽。</view>
			</view>
		</view>

		<view class="demo-item">
			<view class="title">基础用法</view>
			<view class="desc">5 行 8 列座位</view>
			<view class="selected-info">已选: {{ basicSelected.length }} 个</view>
			<ste-select-seat v-model="basicSelected" :rows="rows" :cols="cols" :width="stageWidth" :height="stageHeight" @seat-click="onSeatClick" />
		</view>

		<view class="demo-item">
			<view class="title">自定义座位</view>
			<view class="desc">空位、禁用位、特殊色座位</view>
			<view class="selected-info">已选: {{ customSelected.length }} 个</view>
			<ste-select-seat v-model="customSelected" :rows="rows" :cols="cols" :width="stageWidth" :height="stageHeight" :seats="customSeats" selectedBgColor="#007aff" />
		</view>

		<view class="demo-item">
			<view class="title">预选座位</view>
			<view class="desc">初始带入已选中状态</view>
			<view class="selected-info">已选: {{ presetSelected.length }} 个</view>
			<ste-select-seat v-model="presetSelected" :rows="rows" :cols="cols" :width="stageWidth" :height="stageHeight" />
		</view>

		<view class="demo-item">
			<view class="title">重置位置</view>
			<view class="desc">拖拽缩放后可一键重置</view>
			<view class="selected-info">已选: {{ resetSelected.length }} 个</view>
			<ste-select-seat ref="resetCanvasRef" v-model="resetSelected" :rows="rows" :cols="cols" :width="stageWidth" :height="stageHeight" @seat-click="onSeatClick" />
			<ste-button class="reset-btn" @click="reset">重置位置</ste-button>
		</view>

		<view class="nav-list">
			<view class="nav-item" @click="goDemo5">
				<view>
					<text class="nav-title">电影院座位图</text>
					<view class="nav-desc">复杂示例保留独立页面展示</view>
				</view>
				<text class="nav-arrow">›</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			rows: 5,
			cols: 8,
			stageWidth: 340,
			stageHeight: 240,
			basicSelected: [],
			customSelected: [],
			presetSelected: [
				{ row: 1, col: 3 },
				{ row: 1, col: 4 },
				{ row: 2, col: 3 },
				{ row: 2, col: 4 },
			],
			resetSelected: [],
			customSeats: [
				{ row: 0, col: 2, empty: true },
				{ row: 0, col: 3, empty: true },
				{ row: 1, col: 0, disabled: true },
				{ row: 1, col: 1, disabled: true },
				{ row: 2, col: 4, bgColor: '#fff3e0', borderColor: '#ff9800', selectedBgColor: '#ff9800' },
				{ row: 2, col: 5, bgColor: '#fff3e0', borderColor: '#ff9800', selectedBgColor: '#ff9800' },
				{ row: 4, col: 0, empty: true },
				{ row: 4, col: 7, empty: true },
			],
		};
	},
	methods: {
		onSeatClick(seat) {
			console.log('座位点击:', seat);
		},
		goDemo5() {
			uni.navigateTo({ url: '/subPackages_demo_view/select-seat/demo/demo' });
		},
		reset() {
			this.$refs.resetCanvasRef.reset();
		},
	},
};
</script>

<style lang="scss" scoped>
.description {
	padding: 24rpx 32rpx 0;

	.cmp-name {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 8rpx;
	}

	.cmp-desc {
		font-size: 26rpx;
		color: #666;
	}
}

.demo-item {
	padding: 24rpx;
}

.title {
	font-size: 30rpx;
	color: #333;
	font-weight: 600;
	margin-bottom: 8rpx;
}

.desc {
	font-size: 24rpx;
	color: #666;
	margin-bottom: 12rpx;
}

.selected-info {
	font-size: 24rpx;
	color: #333;
	margin-bottom: 16rpx;
}

.reset-btn {
	margin-top: 20rpx;
}

.nav-list {
	margin: 0 24rpx 24rpx;
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
}

.nav-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 28rpx;
}

.nav-title {
	font-size: 28rpx;
	color: #333;
}

.nav-desc {
	margin-top: 8rpx;
	font-size: 24rpx;
	color: #999;
}

.nav-arrow {
	font-size: 36rpx;
	color: #ccc;
}
</style>
