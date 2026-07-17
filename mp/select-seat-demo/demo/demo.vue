<template>
	<page-layout title="电影院座位图">
		<view class="demo-item">
			<view class="legend">
				<view class="legend-item">
					<view class="legend-dot seat-normal" />
					<text>可选</text>
				</view>
				<view class="legend-item">
					<view class="legend-dot seat-selected" />
					<text>已选</text>
				</view>
				<view class="legend-item">
					<view class="legend-dot seat-sold" />
					<text>已售</text>
				</view>
				<view class="legend-item">
					<view class="legend-dot seat-vip" />
					<text>优选区</text>
				</view>
				<view class="legend-item">
					<view class="legend-dot seat-couple" />
					<text>情侣座</text>
				</view>
			</view>

			<view class="seat-stage-shell">
				<view class="seat-stage">
					<view class="screen-floating" :class="{ 'is-visible': screenVisible }" :style="screenStyle">银幕中央</view>
					<ste-select-seat
						v-model="selected"
						:rows="rows"
						:cols="cols"
						:width="stageWidth"
						:height="stageHeight"
						:seats="seats"
						:seat-size="seatSize"
						:seat-gap="seatGap"
						:border-radius="8"
						selected-bg-color="#2d6cdf"
						@move="onMove"
					/>
				</view>
			</view>

			<view class="summary">
				<view class="summary-title">已选 {{ selected.length }} 个座位</view>
				<view class="summary-text">{{ selectedLabels || '请在座位图中选择座位' }}</view>
			</view>
		</view>
	</page-layout>
</template>

<script>
export default {
	data() {
		return {
			rows: 12,
			cols: 20,
			stageWidth: 340,
			stageHeight: 200,
			seatSize: 30,
			seatGap: 6,
			screenWidth: 168,
			screenHeight: 28,
			screenFixedTop: -40,
			selected: [
				{ row: 6, col: 7 },
				{ row: 6, col: 8 },
			],
			viewport: {
				translateX: 0,
				translateY: 0,
				scale: 1,
				screenTranslateX: 0,
			},
			screenVisible: true,
			screenTimer: null,
		};
	},
	computed: {
		soldSeatCoords() {
			return [
				{ row: 2, col: 3 },
				{ row: 2, col: 4 },
				{ row: 2, col: 7 },
				{ row: 2, col: 12 },
				{ row: 2, col: 15 },
				{ row: 2, col: 16 },
				{ row: 4, col: 2 },
				{ row: 4, col: 6 },
				{ row: 4, col: 13 },
				{ row: 4, col: 17 },
				{ row: 5, col: 4 },
				{ row: 5, col: 7 },
				{ row: 5, col: 12 },
				{ row: 5, col: 15 },
				{ row: 7, col: 1 },
				{ row: 7, col: 5 },
				{ row: 7, col: 14 },
				{ row: 7, col: 18 },
				{ row: 8, col: 3 },
				{ row: 8, col: 7 },
				{ row: 8, col: 12 },
				{ row: 8, col: 16 },
				{ row: 9, col: 2 },
				{ row: 9, col: 6 },
				{ row: 9, col: 13 },
				{ row: 9, col: 17 },
			];
		},
		vipSeatCoords() {
			return [
				{ row: 6, col: 6 },
				{ row: 6, col: 7 },
				{ row: 6, col: 8 },
				{ row: 6, col: 11 },
				{ row: 6, col: 12 },
				{ row: 6, col: 13 },
			];
		},
		coupleSeatCoords() {
			return [
				{ row: 10, col: 5 },
				{ row: 10, col: 6 },
				{ row: 10, col: 13 },
				{ row: 10, col: 14 },
				{ row: 11, col: 5 },
				{ row: 11, col: 6 },
				{ row: 11, col: 13 },
				{ row: 11, col: 14 },
			];
		},
		soldSeatSet() {
			return this.createSeatKeySet(this.soldSeatCoords);
		},
		vipSeatSet() {
			return this.createSeatKeySet(this.vipSeatCoords);
		},
		coupleSeatSet() {
			return this.createSeatKeySet(this.coupleSeatCoords);
		},
		seats() {
			var list = [];
			for (var row = 0; row < this.rows; row++) {
				for (var col = 0; col < this.cols; col++) {
					if (this.isEmptySeat(row, col)) {
						list.push({ row: row, col: col, empty: true });
						continue;
					}
					if (this.isSoldSeat(row, col)) {
						list.push({
							row: row,
							col: col,
							disabled: true,
							bgColor: '#cfd4dc',
							borderColor: '#cfd4dc',
						});
						continue;
					}
					if (this.isVipSeat(row, col)) {
						list.push({
							row: row,
							col: col,
							bgColor: '#fff4d6',
							borderColor: '#ffb400',
							selectedBgColor: '#ffb400',
						});
						continue;
					}
					if (this.isCoupleSeat(row, col)) {
						list.push({
							row: row,
							col: col,
							bgColor: '#ffe4ea',
							borderColor: '#ff7a9d',
							selectedBgColor: '#ff5c8a',
						});
						continue;
					}
					list.push({
						row: row,
						col: col,
						bgColor: '#ffffff',
						borderColor: '#d8dee9',
						selectedBgColor: '#2d6cdf',
					});
				}
			}
			return list;
		},
		selectedLabels() {
			return this.selected.map(function(item) {
				return String.fromCharCode(65 + item.row) + '排' + (item.col + 1) + '座';
			}).join('、');
		},
		screenStyle() {
			return {
				left: this.stageWidth / 2 - this.screenWidth / 2 + 'px',
				top: this.screenFixedTop + 'px',
				width: this.screenWidth + 'px',
				height: this.screenHeight + 'px',
				lineHeight: this.screenHeight + 'px',
				transform: 'translateX(' + this.viewport.screenTranslateX + 'px)',
			};
		},
	},
	methods: {
		toSeatKey(coord) {
			return coord.row + '-' + coord.col;
		},
		createSeatKeySet(coords) {
			var set = new Set();
			for (var i = 0; i < coords.length; i++) {
				set.add(this.toSeatKey(coords[i]));
			}
			return set;
		},
		isAisleCol(col) {
			return col === 9 || col === 10;
		},
		isFrontSideGap(row, col) {
			return (row === 0 || row === 1) && (col <= 1 || col >= 18);
		},
		isBackCornerGap(row, col) {
			return row === 11 && (col === 0 || col === 19);
		},
		isEmptySeat(row, col) {
			return this.isAisleCol(col) || this.isFrontSideGap(row, col) || this.isBackCornerGap(row, col);
		},
		isSoldSeat(row, col) {
			return this.soldSeatSet.has(this.toSeatKey({ row: row, col: col }));
		},
		isVipSeat(row, col) {
			return this.vipSeatSet.has(this.toSeatKey({ row: row, col: col }));
		},
		isCoupleSeat(row, col) {
			return this.coupleSeatSet.has(this.toSeatKey({ row: row, col: col }));
		},
		onMove(event) {
			this.viewport = event;
		},
	},
};
</script>

<style lang="scss" scoped>
.demo-item {
	padding: 24rpx;
}

.legend {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx 24rpx;
	margin-bottom: 20rpx;
	padding: 20rpx 24rpx;
	background: #fff;
	border-radius: 20rpx;
}

.legend-item {
	display: flex;
	align-items: center;
	gap: 10rpx;
	font-size: 24rpx;
	color: #58677a;
}

.legend-dot {
	width: 22rpx;
	height: 22rpx;
	border-radius: 8rpx;
	border: 1px solid transparent;
}

.seat-normal {
	background: #fff;
	border-color: #d8dee9;
}

.seat-selected {
	background: #2d6cdf;
}

.seat-sold {
	background: #cfd4dc;
}

.seat-vip {
	background: #fff4d6;
	border-color: #ffb400;
}

.seat-couple {
	background: #ffe4ea;
	border-color: #ff7a9d;
}

.seat-stage-shell {
	width: 340px;
	margin: 0 auto;
	padding-top: 42px;
}

.seat-stage {
	position: relative;
	width: 340px;
	height: 200px;
	overflow: visible;
}

.screen-floating {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
	text-align: center;
	font-size: 14px;
	color: #5e6b7a;
	border-radius: 999px 999px 16px 16px;
	background: linear-gradient(180deg, #eef4ff 0%, #ffffff 100%);
	box-shadow: 0 8px 20px rgba(45, 108, 223, 0.12);
	pointer-events: none;
	opacity: 0;
	transition: opacity 160ms ease;
}

.screen-floating.is-visible {
	opacity: 1;
}

.summary {
	margin-top: 24rpx;
	padding: 24rpx;
	background: #fff;
	border-radius: 20rpx;
}

.summary-title {
	font-size: 28rpx;
	font-weight: 600;
	color: #25313d;
}

.summary-text {
	margin-top: 10rpx;
	font-size: 24rpx;
	line-height: 1.6;
	color: #5e6b7a;
}
</style>