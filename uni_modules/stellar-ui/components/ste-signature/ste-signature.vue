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
/**
 * ste-signature 签名
 * @description 签名组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-signature
 * @property {String} customClass 自定义 class
 * @property {Number} lineWidth 线条的宽度
 * @property {String} strokeColor 线条颜色，支持 rgb，rgba，hex，hsl，hsla，颜色名称等格式
 * @property {String} type 保存图片类型
 * @value png 默认
 * @value jpg
 * @property {String|Number} width 宽度,单位rpx
 * @property {String|Number} height 高度,单位rpx
 * @event {Function} start 开始签名事件
 * @event {Function} signing 正在签名事件（指某次笔画进行中）
 * @event {Function} end 结束签名事件
 */
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
		background: {
			type: String,
			default: () => '#f8f8f8',
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
			canvasId: utils.guid(8),
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
		this.load = true;
		this.$nextTick(() => {
			this.initCanvas();
		});
	},
	methods: {
		clear() {
			this.strokes = [];
			this.drawStrokes();
		},
		back() {
			this.strokes.pop();
			this.drawStrokes();
		},
		async save(callback, error) {
			if (!this.strokes.length) {
				if (error) error('请绘制签名');
				return;
			}
			const canvas = await utils.querySelector(`.ste-signature-root`, this);
			uni.canvasToTempFilePath(
				{
					canvasId: this.canvasId,
					width: canvas.width,
					height: canvas.height,
					destWidth: canvas.width * 2, // 设置导出图片的宽度，这里设置为canvas宽度的两倍
					destHeight: canvas.height * 2, // 设置导出图片的高度，这里设置为canvas高度的两倍
					fileType: this.type, // 设置导出图片的类型，如'png'、'jpg'等
					success: (res) => {
						if (callback) callback(res.tempFilePath);
					},
					fail: (err) => {
						console.log(err, 'err');
					},
				},
				this
			);
		},
		async initCanvas() {
			this.ctx = uni.createCanvasContext(this.canvasId, this);
			// 设置线条圆角
			this.ctx.setLineCap('round');
			this.ctx.setStrokeStyle(this.strokeColor); // 设置线颜色为黑色
			this.ctx.setLineWidth(this.lineWidth); // 设置线宽
			this.drawStrokes();
		},
		drawStrokes(ctx = this.ctx) {
			ctx.clearRect(0, 0, 1920, 1080);
			ctx.setFillStyle(this.background);
			ctx.fillRect(0, 0, 1920, 1080);
			ctx.draw();
			if (!this.strokes?.length) {
				ctx.stroke();
				ctx.draw(true);
				return;
			}

			this.strokes.forEach((stroke) => {
				if (!stroke.length) return;
				ctx.beginPath();
				ctx.moveTo(stroke[0].x, stroke[0].y);
				stroke.forEach(({ x, y }, index) => {
					if (index == 0) return;
					ctx.lineTo(x, y);
				});
				ctx.stroke();
				ctx.draw(true);
			});
		},
		drawStrokeing(ctx = this.ctx) {
			const length = this.strokeing?.length;
			if (!length) return;
			ctx.beginPath();
			const end = this.strokeing[length - 1];
			const start = this.strokeing[length - 2] || end;
			ctx.moveTo(start.x, start.y);
			ctx.lineTo(end.x, end.y);
			ctx.stroke();
			ctx.draw(true);
		},
		onTouchStart(e) {
			// #ifdef MP
			this.strokeing = [{ x: e.changedTouches[0].x, y: e.changedTouches[0].y }];
			// #endif
			// #ifdef H5
			this.strokeing = [this.getH5MousePosition(e)];
			// #endif
			this.drawStrokeing();
			this.$emit('start');
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
			this.$emit('signing');
		},
		onTouchEnd(e) {
			this.strokes.push(this.strokeing);
			this.strokeing = [];
			this.$emit('end');
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
}
</style>
