<template>
	<view class="ste-select-seat-root" :style="canvasStyle">
		<!-- #ifdef H5 -->
		<canvas
			:canvas-id="canvasId"
			:id="canvasId"
			:style="canvasStyle"
			class="seat-canvas"
			disable-scroll
			@touchstart="onTouchStart"
			@touchmove.stop.prevent="onTouchMove"
			@touchend="onTouchEnd"
			@mousedown="onMouseDown"
			@mousemove="onMouseMove"
			@mouseup="onMouseUp"
			@mouseleave="onMouseUp"
		/>
		<!-- #endif -->
		<!-- #ifdef APP -->
		<canvas
			:canvas-id="canvasId"
			:id="canvasId"
			:style="canvasStyle"
			class="seat-canvas"
			disable-scroll
			@touchstart="onTouchStart"
			@touchmove="onTouchMove"
			@touchend="onTouchEnd"
			@touchcancel="onTouchEnd"
		/>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
		<canvas
			type="2d"
			:id="canvasId"
			:style="canvasStyle"
			class="seat-canvas"
			disable-scroll
			@touchstart="onTouchStart"
			@touchmove.stop.prevent="onTouchMove"
			@touchend="onTouchEnd"
			@touchcancel="onTouchEnd"
		/>
		<!-- #endif -->
		<view v-if="showRowLabels" class="row-label-overlay" :class="{ 'is-visible': rowLabelsVisible }">
			<view class="row-label-track" :style="rowLabelTrackStyle" />
			<view v-for="item in rowLabelItems" :key="item.row" class="row-label-item" :style="item.style">
				{{ item.row + 1 }}
			</view>
		</view>
	</view>
</template>

<script>
import propsData from './props';
import { useData } from './useData';
import useColor from '../../config/color.js';
import utils from '../../utils/utils.js';
import TouchScaleing from '../ste-media-preview/TouchScaleing';
import { drawRoundRect, drawCheck } from './canvasUtils';
import { getSafeGridSize } from './internals/gridUtils';
import {
	INTERNAL_MAX_SCALE,
	buildRowLabelItems,
	clampSeatScale,
	getDefaultSeatViewport,
	getFitScale,
	getLabelWidth,
	getRowLabelTrackStyle,
	getScreenTranslateX as getSeatScreenTranslateX,
	getSeatContentSize,
	getSeatTranslateBounds,
} from './internals/seatLayout';
import { useSeatInteraction } from './internals/useSeatInteraction';
import { getTouchX, getTouchY, getTouchLocalPoint } from './useTouchCompat';

var color = useColor();
var themeColor = color.getColor()?.steThemeColor || '#0090FF';

export default {
	name: 'ste-select-seat',
	group: '表单组件',
	title: 'SelectSeat 座位选择',
	props: propsData,
	model: {
		prop: 'modelValue',
		event: 'update:modelValue',
	},
	data() {
		return {
			canvasId: 'ste-select-seat-' + utils.guid(8),
			touchHandler: new TouchScaleing(),
			canvasCtx: null,
			dpr: 1,
			viewportTranslateY: 0,
			viewportScale: 1,
			rowLabelsVisible: this.showRowLabels,
			dataManager: null,
			interactionHandler: null,
			_localSelected: [],
		};
	},
	computed: {
		seatSizePx() {
			return utils.formatPx(this.seatSize, 'num');
		},
		seatGapPx() {
			return utils.formatPx(this.seatGap, 'num');
		},
		borderRadiusPx() {
			return utils.formatPx(this.borderRadius, 'num');
		},
		safeGrid() {
			return getSafeGridSize(this.rows, this.cols);
		},
		safeRows() {
			return this.safeGrid.rows;
		},
		safeCols() {
			return this.safeGrid.cols;
		},
		labelWidthPx() {
			return getLabelWidth(this.showRowLabels, this.seatSizePx, this.seatGapPx);
		},
		rowLabelTrackWidthPx() {
			return 18;
		},
		labelOverlayWidth() {
			return this.rowLabelTrackWidthPx + 'px';
		},
		canvasStyle() {
			return {
				width: this.width + 'px',
				height: this.height + 'px',
			};
		},
		fitScale() {
			var contentSize = this.getContentSize();
			return getFitScale({
				width: this.width,
				height: this.height,
				contentWidth: contentSize.width,
				contentHeight: contentSize.height,
			});
		},
		effectiveMinScale() {
			return this.fitScale;
		},
		rowLabelItems() {
			if (!this.showRowLabels) return [];
			return buildRowLabelItems({
				rows: this.safeRows,
				height: this.height,
				seatSize: this.seatSizePx,
				seatGap: this.seatGapPx,
				translateY: this.viewportTranslateY,
				scale: this.viewportScale,
			});
		},
		rowLabelTrackStyle() {
			return getRowLabelTrackStyle(this.rowLabelItems, this.height);
		},
	},
	watch: {
		showRowLabels(value) {
			this.setShowRowLabelsVisible(value);
		},
		modelValue: {
			handler(value) {
				this._localSelected = value || [];
				if (this.canvasCtx) this.draw();
			},
			deep: true,
			immediate: true,
		},
		seats: {
			handler() {
				if (this.dataManager) this.dataManager.initSeats();
				if (this.canvasCtx) this.draw();
			},
			deep: true,
		},
		rows() {
			if (this.dataManager) this.dataManager.initSeats();
			if (this.canvasCtx) this.draw();
		},
		cols() {
			if (this.dataManager) this.dataManager.initSeats();
			if (this.canvasCtx) this.draw();
		},
		width() {
			if (this.canvasCtx) this.draw();
		},
		height() {
			if (this.canvasCtx) this.draw();
		},
		seatSize() {
			if (this.canvasCtx) this.draw();
		},
		seatGap() {
			if (this.canvasCtx) this.draw();
		},
		borderRadius() {
			if (this.canvasCtx) this.draw();
		},
		borderWidth() {
			if (this.canvasCtx) this.draw();
		},
		bgColor() {
			if (this.canvasCtx) this.draw();
		},
		borderColor() {
			if (this.canvasCtx) this.draw();
		},
		selectedBgColor() {
			if (this.canvasCtx) this.draw();
		},
		selectedColor() {
			if (this.canvasCtx) this.draw();
		},
		disabledBgColor() {
			if (this.canvasCtx) this.draw();
		},
	},
	created() {
		this.dataManager = useData(this);
		this.dataManager.initSeats();
	},
	mounted() {
		this.initCanvas();
	},
	methods: {
		getContentSize() {
			return getSeatContentSize({
				rows: this.safeRows,
				cols: this.safeCols,
				seatSize: this.seatSizePx,
				seatGap: this.seatGapPx,
				labelWidth: this.labelWidthPx,
			});
		},
		clampScale(scale) {
			return clampSeatScale(scale, this.effectiveMinScale, INTERNAL_MAX_SCALE);
		},
		draw() {
			var ctx = this.canvasCtx;
			if (!ctx) return;

			var userScale = this.clampScale(this.touchHandler.scale);
			this.viewportTranslateY = this.touchHandler.translateY;
			this.viewportScale = userScale;
			var tx = this.touchHandler.translateX;
			var ty = this.touchHandler.translateY;
			var size = this.seatSizePx;
			var gap = this.seatGapPx;
			var radius = this.borderRadiusPx;
			var labelWidth = this.labelWidthPx;
			var defaultSelectedBg = this.selectedBgColor || themeColor;

			ctx.clearRect(0, 0, this.width, this.height);

			console.log('[ste-select-seat] draw: scale=' + userScale + ', tx=' + tx + ', ty=' + ty + ', _localSelected=' + JSON.stringify(this._localSelected));

			// #ifndef APP
			ctx.save();
			ctx.translate(tx * userScale, ty * userScale);
			ctx.scale(userScale, userScale);
			// #endif

			for (var r = 0; r < this.safeRows; r++) {
				for (var c = 0; c < this.safeCols; c++) {
					var seat = this.dataManager.getSeat(r, c);
					if (!seat || seat.empty) continue;

					var selected = this._localSelected.some(function (v) {
						return v.row === r && v.col === c;
					});

					if (selected) {
						console.log(
							'[ste-select-seat] draw: seat(' +
								r +
								',' +
								c +
								') is selected, drawing at canvas (' +
								(tx + labelWidth + c * (size + gap) + gap / 2) +
								',' +
								(ty + r * (size + gap) + gap / 2) +
								')'
						);
					}

					// #ifndef APP
					var x = labelWidth + c * (size + gap) + gap / 2;
					var y = r * (size + gap) + gap / 2;
					var w = size;
					var h = size;
					var r_ = radius;
					// #endif
					// #ifdef APP
					var x = tx * userScale + (labelWidth + c * (size + gap) + gap / 2) * userScale;
					var y = ty * userScale + (r * (size + gap) + gap / 2) * userScale;
					var w = size * userScale;
					var h = size * userScale;
					var r_ = radius * userScale;
					// #endif

					if (seat.disabled) {
						ctx.fillStyle = this.disabledBgColor;
					} else if (selected) {
						ctx.fillStyle = seat.selectedBgColor || defaultSelectedBg;
					} else {
						ctx.fillStyle = seat.bgColor || this.bgColor;
					}

					drawRoundRect(ctx, x, y, w, h, r_);
					ctx.fill();

					if (!seat.disabled && !selected) {
						ctx.strokeStyle = seat.borderColor || this.borderColor;
						ctx.lineWidth = this.borderWidth;
						drawRoundRect(ctx, x, y, w, h, r_);
						ctx.stroke();
					}

					if (selected && !seat.disabled) {
						drawCheck(ctx, x + w / 2, y + h / 2, w, seat.selectedColor || this.selectedColor);
					}
				}
			}

			// #ifndef APP
			ctx.restore();
			// #endif

			// #ifdef H5 || APP
			if (ctx.draw) ctx.draw(true);
			// #endif
		},
		initCanvas() {
			var self = this;
			this.$nextTick(function () {
				// #ifdef H5 || APP
				self.canvasCtx = uni.createCanvasContext(self.canvasId, self);
				self.dpr = 1;
				self.applyDefaultViewport();
				self.draw();
				// #endif

				// #ifdef MP-WEIXIN || MP-ALIPAY
				uni.createSelectorQuery()
					.in(self)
					.select('#' + self.canvasId)
					.node(function (res) {
						if (!res || !res.node) return;
						var canvasNode = res.node;
						self.dpr = utils.System.getWindowInfo().pixelRatio;
						canvasNode.width = self.width * self.dpr;
						canvasNode.height = self.height * self.dpr;
						self.canvasCtx = canvasNode.getContext('2d');
						self.canvasCtx.scale(self.dpr, self.dpr);
						self.applyDefaultViewport();
						self.draw();
					})
					.exec();
				// #endif
			});
		},
		getTouchSeat(touchX, touchY) {
			var scale = this.clampScale(this.touchHandler.scale);
			var size = this.seatSizePx;
			var gap = this.seatGapPx;
			var labelWidth = this.labelWidthPx;
			var tx = this.touchHandler.translateX;
			var ty = this.touchHandler.translateY;

			var col = Math.floor((touchX / scale - tx - labelWidth - gap / 2) / (size + gap));
			var row = Math.floor((touchY / scale - ty - gap / 2) / (size + gap));

			var seatLeft = (tx + labelWidth + col * (size + gap) + gap / 2) * scale;
			var seatTop = (ty + row * (size + gap) + gap / 2) * scale;
			console.log(
				'[ste-select-seat] getTouchSeat: touch(' +
					touchX +
					',' +
					touchY +
					'), scale=' +
					scale +
					', seat(' +
					row +
					',' +
					col +
					') at screen (' +
					seatLeft +
					',' +
					seatTop +
					') to (' +
					(seatLeft + size * scale) +
					',' +
					(seatTop + size * scale) +
					')'
			);

			if (row < 0 || row >= this.safeRows || col < 0 || col >= this.safeCols) return null;
			return this.dataManager.getSeat(row, col) || null;
		},
		getTouchLocalPoint(touch, rect) {
			return getTouchLocalPoint(touch, rect);
		},
		getScreenTranslateX(scale, translateX) {
			if (scale == null) scale = this.clampScale(this.touchHandler.scale);
			if (translateX == null) translateX = this.touchHandler.translateX;
			return getSeatScreenTranslateX({
				scale: scale,
				translateX: translateX,
				width: this.width,
				defaultViewport: this.getDefaultViewport(),
			});
		},
		emitMove() {
			var scale = this.clampScale(this.touchHandler.scale);
			this.$emit('move', {
				translateX: this.touchHandler.translateX,
				translateY: this.touchHandler.translateY,
				scale: scale,
				screenTranslateX: this.getScreenTranslateX(scale, this.touchHandler.translateX),
			});
		},
		getTranslateBounds(scale) {
			if (scale == null) scale = this.touchHandler.scale;
			var contentSize = this.getContentSize();
			return getSeatTranslateBounds({
				scale: this.clampScale(scale),
				width: this.width,
				height: this.height,
				contentWidth: contentSize.width,
				contentHeight: contentSize.height,
			});
		},
		applyAxisResistance(value, min, max) {
			var overscrollResistance = 0.35;
			if (value < min) {
				return min + (value - min) * overscrollResistance;
			}
			if (value > max) {
				return max + (value - max) * overscrollResistance;
			}
			return value;
		},
		applyTranslateResistance(x, y, scale) {
			if (scale == null) scale = this.touchHandler.scale;
			var bounds = this.getTranslateBounds(scale);
			return {
				x: this.applyAxisResistance(x, bounds.minX, bounds.maxX),
				y: this.applyAxisResistance(y, bounds.minY, bounds.maxY),
			};
		},
		clampTranslate(x, y, scale) {
			if (scale == null) scale = this.touchHandler.scale;
			var bounds = this.getTranslateBounds(scale);
			return {
				x: Math.min(bounds.maxX, Math.max(bounds.minX, x)),
				y: Math.min(bounds.maxY, Math.max(bounds.minY, y)),
			};
		},
		getDefaultViewport() {
			var contentSize = this.getContentSize();
			return getDefaultSeatViewport({
				fitScale: this.fitScale,
				width: this.width,
				height: this.height,
				contentWidth: contentSize.width,
				contentHeight: contentSize.height,
				maxScale: INTERNAL_MAX_SCALE,
			});
		},
		applyDefaultViewport() {
			var viewport = this.getDefaultViewport();
			this.touchHandler.scale = viewport.scale;
			this.touchHandler.baseScale = viewport.scale;
			this.touchHandler.translateX = viewport.translateX;
			this.touchHandler.translateY = viewport.translateY;
			this.touchHandler.baseTranslateX = viewport.translateX;
			this.touchHandler.baseTranslateY = viewport.translateY;
		},
		setShowRowLabelsVisible(value) {
			this.rowLabelsVisible = value;
		},
		onTouchStart(e) {
			this.interactionHandler.onTouchStart(e);
		},
		onTouchMove(e) {
			this.interactionHandler.onTouchMove(e);
		},
		onTouchEnd(e) {
			this.interactionHandler.onTouchEnd(e);
		},
		onMouseDown(e) {
			this.interactionHandler.onMouseDown(e);
		},
		onMouseMove(e) {
			this.interactionHandler.onMouseMove(e);
		},
		onMouseUp(e) {
			this.interactionHandler.onMouseUp(e);
		},
		reset() {
			this.interactionHandler.reset();
		},
		setSeat(row, col, data) {
			this.dataManager.setSeat(row, col, data);
			var self = this;
			this.$nextTick(function () {
				self.draw();
			});
		},
		getSeats() {
			return this.dataManager.getSeats();
		},
	},
	beforeMount() {
		var self = this;
		this.interactionHandler = useSeatInteraction({
			instance: this,
			canvasId: this.canvasId,
			getShowRowLabels: function () {
				return self.showRowLabels;
			},
			touchHandler: this.touchHandler,
			clampScale: function (scale) {
				return self.clampScale(scale);
			},
			applyTranslateResistance: function (x, y, scale) {
				return self.applyTranslateResistance(x, y, scale);
			},
			clampTranslate: function (x, y, scale) {
				return self.clampTranslate(x, y, scale);
			},
			getTouchSeat: function (x, y) {
				return self.getTouchSeat(x, y);
			},
			getTouchLocalPoint: function (touch, rect) {
				return self.getTouchLocalPoint(touch, rect);
			},
			applyDefaultViewport: function () {
				self.applyDefaultViewport();
			},
			draw: function () {
				self.draw();
			},
			emitMove: function () {
				self.emitMove();
			},
			emitSeatClick: function (seat) {
				self.$emit('seat-click', seat);
			},
			emitModelValue: function (value) {
				self._localSelected = value;
				self.$emit('update:modelValue', value);
			},
			toggleSeat: function (row, col) {
				return self.dataManager.toggleSeat(row, col);
			},
		});
	},
};
</script>

<style lang="scss" scoped>
.ste-select-seat-root {
	overflow: hidden;
	position: relative;
	touch-action: none;
	user-select: none;
}

.seat-canvas {
	display: block;
}

.row-label-overlay {
	position: absolute;
	left: 6px;
	top: 0;
	bottom: 0;
	width: v-bind(labelOverlayWidth);
	pointer-events: none;
	opacity: 0;
	transform: translateX(-4px);
	transition: opacity 160ms ease, transform 160ms ease;
}

.row-label-overlay.is-visible {
	opacity: 1;
	transform: translateX(0);
}

.row-label-track {
	position: absolute;
	left: 0;
	width: 100%;
	border-radius: 999px;
	background: rgba(199, 199, 199, 0.68);
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.24);
	transition: opacity 160ms ease, transform 160ms ease;
}

.row-label-item {
	position: absolute;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	color: rgba(255, 255, 255, 0.98);
	font-weight: 400;
	letter-spacing: 0;
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
	transition: opacity 160ms ease, transform 160ms ease;
}
</style>
