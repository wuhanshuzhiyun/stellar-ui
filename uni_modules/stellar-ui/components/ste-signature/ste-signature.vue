<template>
	<view
		v-if="load"
		class="ste-signature-root"
		:style="[cmpRootStyle]"
		:class="customClass"
		@mousedown="onTouchStart"
		@mousemove="onTouchMove"
		@mouseup="onTouchEnd"
		@mosueleave="onTouchEnd"
	>
		<canvas
			disable-scroll
			:id="canvasId"
			:canvas-id="canvasId"
			:style="[cmpRootStyle]"
			@touchstart="onTouchStart"
			@touchmove="onTouchMove"
			@touchend="onTouchEnd"
		/>
	</view>
</template>

<script>
import utils from '../../utils/utils';
export default {
	group: '表单组件',
	title: 'Signature 签名',
	name: 'ste-signature',
	props: {
		customClass: {
			type: String,
			default: () => '',
		},
		lineWidth: {
			type: [Number, String],
			default: () => 3,
		},
		strokeColor: {
			type: String,
			default: () => 'black',
		},
		type: {
			type: String,
			default: () => 'png',
		},
		width: {
			type: [Number, String],
			default: () => '100%',
		},
		height: {
			type: [Number, String],
			default: () => '100%',
		},
	},
	data() {
		return {
			canvasId: 'ste-signature',
			load: false,
			ctx: null,
			strokes: [],
			strokeing: [],
		};
	},
	computed: {
		cmpRootStyle() {
			return {
				width: utils.formatPx(this.width),
				height: utils.formatPx(this.height),
			};
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.initCanvas();
		});
	},
	methods: {
		back() {
			this.strokes.pop();
			this.drawAll();
		},
		clear() {
			this.ctx.clearRect(0, 0, this.width, this.height);
		},
		save(callback) {},
		async initCanvas() {
			this.load = true;
			this.ctx = uni.createCanvasContext(this.canvasId, this);
			// 设置线条圆角
			this.ctx.setLineCap('round');
			this.ctx.setStrokeStyle(this.strokeColor); // 设置线颜色为黑色
			this.ctx.setLineWidth(this.lineWidth); // 设置线宽
			this.drawAll();
		},
		// 画图
		drawAll(ctx = this.ctx) {
			// 清除画布
			this.clear();
			this.strokes.forEach((stroke) => {
				if (!stroke.length) return;
				ctx.beginPath();
				ctx.moveTo(stroke[0].x, stroke[0].y); // 移动到起始点
				stroke.forEach(({ x, y }, index) => {
					ctx.lineTo(x, y); // 结束点坐标
				});
			});
			ctx.stroke(); // 进行绘制
			ctx.draw(true); // 执行绘制操作
		},
		drawStrokeing(ctx = this.ctx) {
			const length = this.strokeing?.length;
			if (!length) return;
			ctx.beginPath();
			const end = this.strokeing[length - 1];
			const start = this.strokeing[length - 2] || end;
			ctx.moveTo(start.x, start.y); // 移动到起始点
			ctx.lineTo(end.x, end.y); // 结束点坐标
			ctx.stroke(); // 进行绘制
			ctx.draw(true); // 执行绘制操作
		},
		onTouchStart(e) {
			// #ifdef MP
			this.strokeing = [{ x: e.changedTouches[0].x, y: e.changedTouches[0].y }];
			// #endif
			// #ifdef H5
			this.strokeing = [this.getH5MousePosition(e)];
			// #endif
			this.drawStrokeing();
		},
		onTouchMove(e) {
			if (!this.strokeing?.length) return;
			// #ifdef MP
			this.strokeing.push({ x: e.changedTouches[0].x, y: e.changedTouches[0].y });
			// #endif
			// #ifdef H5
			this.strokeing.push(this.getH5MousePosition(e));
			// #endif
			this.drawStrokeing();
		},
		onTouchEnd(e) {
			this.strokes.push(this.strokeing);
			this.strokeing = [];
		},

		// #ifdef H5
		getH5MousePosition(e) {
			return {
				x: e.clientX - e.target.offsetLeft,
				y: e.clientY - e.target.offsetTop,
			};
		},
		// #endif
	},
};
</script>

<style scoped lang="scss">
.ste-signature-root {
	border: 1px solid #000;
}
</style>
