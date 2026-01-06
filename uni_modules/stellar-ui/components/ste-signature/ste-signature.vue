<template>
	<view v-if="load" class="ste-signature-root" :style="[cmpRootStyle]" :class="customClass" @mousedown="onTouchStart" @mousemove="onTouchMove" @mouseup="onTouchEnd" @mosueleave="onTouchEnd">
		<canvas disable-scroll :id="canvasId" :canvas-id="canvasId" :style="[cmpRootStyle]" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" />
		<!-- #ifdef APP -->
		<canvas style="pointer-events: none; opacity: 0" :style="[cmpRootStyle]" id="ste-signature-app-canvas-output" canvas-id="ste-signature-app-canvas-output" />
		<!-- #endif -->
	</view>
</template>

<script>
import utils from '../../utils/utils';
/**
 * 工具：将角度转为弧度
 */
const toRad = (deg) => (Math.PI * deg) / 180;

/**
 * ste-signature 签名
 * @description 签名组件
 * @tutorial https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui&menu=%E7%BB%84%E4%BB%B6&active=ste-signature
 * @property {String} customClass 自定义 class
 * @property {Number} lineWidth 线条的宽度
 * @property {String} strokeColor 线条颜色，支持 rgb，rgba，hex，hsl，hsla，颜色名称等格式
 * @property {String} background 图片背景色
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
			type: [String, null],
			default: () => '',
		},
		lineWidth: {
			type: [Number, String, null],
			default: () => 3,
		},
		strokeColor: {
			type: [String, null],
			default: () => 'black',
		},
		background: {
			type: [String, null],
			default: () => 'none',
		},
		type: {
			type: [String, null],
			default: () => 'png',
		},
		width: {
			type: [Number, String, null],
			default: () => '100%',
		},
		height: {
			type: [Number, String, null],
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
			canvasWidth: 0,
			canvasHeight: 0,
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
			// 没有回调函数无需执行
			if (!callback) return;
			const canvas = await utils.querySelector(`.ste-signature-root`, this);
			this.canvasWidth = canvas.width;
			this.canvasHeight = canvas.height;
			uni.canvasToTempFilePath(
				{
					canvasId: this.canvasId,
					width: canvas.width,
					height: canvas.height,
					destWidth: canvas.width, // 设置导出图片的宽度，这里设置为canvas宽度的两倍
					destHeight: canvas.height, // 设置导出图片的高度，这里设置为canvas高度的两倍
					fileType: this.type, // 设置导出图片的类型，如'png'、'jpg'等
					success: (res) => {
						callback(res.tempFilePath);
					},
					fail: (err) => {
						if (error) error(err);
						console.error(err, 'err');
					},
				},
				this
			);
		},
		/**
		 * 输出图片
		 * @param {Object} options
		 * @param {'up'|'down'|'right'|'left'|'up-mirrored'|'down-mirrored'|'left-mirrored'|'right-mirrored'} options.orientation 输出方向
		 * @param {Function} options.success 成功回调
		 * @param {Function} options.fail 失败回调
		 */
		output({ orientation = 'up', success, fail } = {}) {
			if (!success) return;
			this.save((path) => {
				// #ifdef MP-WEIXIN
				this.rotateImageByWx({ path, orientation, success, fail });
				// #endif
				// #ifdef H5 | WEB
				this.rotateImageByWeb({ path, orientation, success, fail });
				// #endif
				// #ifdef APP
				this.rotateImageByApp({ path, orientation, success, fail });
				// #endif
			}, fail);
		},

		// #ifdef MP-WEIXIN
		rotateImageByWx({ path, orientation = 'up', success, fail } = {}) {
			const validOrientations = ['up', 'down', 'left', 'right', 'up-mirrored', 'down-mirrored', 'left-mirrored', 'right-mirrored'];
			if (!validOrientations.includes(orientation)) {
				return fail && fail(new Error(`Invalid orientation: ${orientation}`));
			}
			if (orientation === 'up') {
				success(path);
				return;
			}
			const { canvasWidth: w, canvasHeight: h } = this;
			const is90or270 = ['left', 'right', 'left-mirrored', 'right-mirrored'].includes(orientation);
			const width = is90or270 ? h : w;
			const height = is90or270 ? w : h;

			// 创建离屏canvas
			let canvas;
			try {
				canvas = uni.createOffscreenCanvas({ type: '2d', width, height });
			} catch (e) {
				return fail && fail(new Error('微信小程序创建离屏Canvas失败：' + e.message));
			}
			const ctx = canvas.getContext('2d');

			const img = canvas.createImage();
			img.onload = () => {
				try {
					ctx.clearRect(0, 0, width, height);
					ctx.save();

					// 统一：顺时针为正方向
					switch (orientation) {
						case 'down':
							ctx.rotate(toRad(180)); // 180°
							ctx.translate(-width, -height);
							break;
						case 'left':
							ctx.rotate(toRad(270)); // 顺时针270° = Math.PI * 270 / 180;等价于-90°
							ctx.translate(-height, 0);
							break;
						case 'right':
							ctx.rotate(toRad(90)); // 90°
							ctx.translate(0, -width);
							break;
						case 'up-mirrored':
							ctx.scale(1, -1);
							ctx.translate(0, -height);
							break;
						case 'down-mirrored':
							ctx.rotate(toRad(180));
							ctx.scale(1, -1);
							ctx.translate(-width, 0);
							break;
						case 'left-mirrored':
							ctx.rotate(toRad(270));
							ctx.scale(1, -1);
							ctx.translate(-height, -width);
							break;
						case 'right-mirrored':
							ctx.rotate(toRad(90));
							ctx.scale(1, -1);
							break;
					}
					ctx.drawImage(img, 0, 0, w, h);
					ctx.restore();
					setTimeout(() => {
						const base64 = canvas.toDataURL();
						success(base64);
					});
				} catch (e) {
					fail && fail(new Error('微信小程序旋转图片失败：' + e.message));
				}
			};
			img.onerror = () => {
				fail && fail(new Error('微信小程序加载图片失败：' + path));
			};
			img.src = path;
		},
		// #endif

		// #ifdef H5 | WEB
		rotateImageByWeb({ path, orientation = 'up', success, fail } = {}) {
			const validOrientations = ['up', 'down', 'left', 'right', 'up-mirrored', 'down-mirrored', 'left-mirrored', 'right-mirrored'];
			if (!validOrientations.includes(orientation)) {
				return fail && fail(new Error(`Invalid orientation: ${orientation}`));
			}
			if (orientation === 'up') {
				success(path);
				return;
			}

			const img = new Image();
			img.crossOrigin = 'anonymous';
			img.onload = () => {
				try {
					const { width: sw, height: sh } = img;
					const is90or270 = ['left', 'right', 'left-mirrored', 'right-mirrored'].includes(orientation);
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d');
					canvas.width = is90or270 ? sh : sw;
					canvas.height = is90or270 ? sw : sh;

					ctx.save();
					ctx.translate(canvas.width / 2, canvas.height / 2);

					// 统一：顺时针为正方向，镜像配合 translate 保证与小程序一致
					switch (orientation) {
						case 'down':
							ctx.rotate(toRad(180)); // 180°
							break;
						case 'left':
							ctx.rotate(toRad(-90)); // -90°
							break;
						case 'right':
							ctx.rotate(toRad(90)); // 90°
							break;
						case 'up-mirrored':
							ctx.scale(1, -1);
							break;
						case 'down-mirrored':
							ctx.rotate(toRad(180));
							ctx.scale(1, -1);
							break;
						case 'left-mirrored':
							ctx.rotate(toRad(270));
							ctx.scale(1, -1);
							break;
						case 'right-mirrored':
							ctx.rotate(toRad(90));
							ctx.scale(1, -1);
							break;
					}
					ctx.drawImage(img, -sw / 2, -sh / 2, sw, sh);
					ctx.restore();
					setTimeout(() => {
						const mimeType = 'image/png';
						const base64 = canvas.toDataURL(mimeType);
						success && success(base64);
					});
				} catch (e) {
					fail && fail(new Error('H5 旋转图片失败：' + e.message));
				}
			};
			img.onerror = () => {
				fail && fail(new Error('H5 加载图片失败：' + path));
			};
			img.src = path.startsWith('data:') ? path : path;
		},
		// #endif
		// #ifdef APP | APP-PLUS
		async rotateImageByApp({ path, orientation = 'up', success, fail } = {}) {
			const validOrientations = ['up', 'down', 'left', 'right', 'up-mirrored', 'down-mirrored', 'left-mirrored', 'right-mirrored'];
			if (!validOrientations.includes(orientation)) {
				return fail && fail(new Error(`Invalid orientation: ${orientation}`));
			}
			if (orientation === 'up') {
				success && success(path);
				return;
			}
			/**
			 * 工具：获取图片信息（尺寸等）
			 */
			const getImageInfo = (src) => {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src,
						success: resolve,
						fail: reject,
					});
				});
			};

			try {
				const imgInfo = await getImageInfo(path);
				const { width: originalWidth, height: originalHeight } = imgInfo;

				// 根据方向确定旋转后图片的尺寸
				const is90or270 = ['left', 'right', 'left-mirrored', 'right-mirrored'].includes(orientation);
				const canvasWidth = is90or270 ? originalHeight : originalWidth;
				const canvasHeight = is90or270 ? originalWidth : originalHeight;

				const canvas = uni.createCanvasContext('ste-signature-app-canvas-output', this);
				// 设置canvas尺寸
				canvas.width = canvasWidth;
				canvas.height = canvasHeight;

				// 绘制白色背景，避免透明背景导致的空白问题
				if (this.background !== 'none') {
					canvas.setFillStyle(this.background);
				}

				canvas.save();
				canvas.translate(canvasWidth / 2, canvasHeight / 2);

				// 统一：顺时针为正方向，镜像配合 translate 保证与小程序一致
				switch (orientation) {
					case 'down':
						canvas.rotate(toRad(180)); // 180°
						break;
					case 'left':
						canvas.rotate(toRad(-90)); // -90°
						break;
					case 'right':
						canvas.rotate(toRad(90)); // 90°
						break;
					case 'up-mirrored':
						canvas.scale(1, -1);
						break;
					case 'down-mirrored':
						canvas.rotate(toRad(180));
						canvas.scale(1, -1);
						break;
					case 'left-mirrored':
						canvas.rotate(toRad(270));
						canvas.scale(1, -1);
						break;
					case 'right-mirrored':
						canvas.rotate(toRad(90));
						canvas.scale(1, -1);
						break;
				}
				canvas.drawImage(path, -originalWidth / 2, -originalHeight / 2, originalWidth, originalHeight);
				canvas.restore();
				// 确保绘制完成
				canvas.draw(false, () => {
					// 导出临时文件路径
					uni.canvasToTempFilePath({
						canvasId: 'ste-signature-app-canvas-output',
						width: canvasWidth,
						height: canvasHeight,
						destWidth: canvasWidth,
						destHeight: canvasHeight,
						fileType: this.type,
						success: (res) => {
							success && success(res.tempFilePath);
						},
						fail: (err) => {
							fail && fail(new Error('APP 导出旋转图片失败：' + (err.errMsg || err.message)));
						},
					});
				});
			} catch (e) {
				fail && fail(new Error('APP 旋转图片失败：' + e.message));
			}
		},
		// #endif
		async initCanvas() {
			this.ctx = uni.createCanvasContext(this.canvasId, this);
			this.drawStrokes();
		},
		drawStrokes(ctx = this.ctx) {
			// 设置线条圆角
			ctx.setLineCap('round');
			ctx.setStrokeStyle(this.strokeColor); // 设置线颜色为黑色
			ctx.setLineWidth(this.lineWidth); // 设置线宽
			ctx.clearRect(0, 0, 1920, 1080);
			if (this.background !== 'none') {
				ctx.setFillStyle(this.background);
				ctx.fillRect(0, 0, 1920, 1080);
			}
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
		async onTouchStart(e) {
			// #ifdef MP || APP
			this.strokeing = [{ x: e.changedTouches[0].x, y: e.changedTouches[0].y }];
			// #endif
			// #ifdef H5
			this.strokeing = [await this.getH5MousePosition(e)];
			// #endif
			this.drawStrokeing();
			this.$emit('start');
		},
		async onTouchMove(e) {
			if (!this.strokeing?.length) return;
			// #ifdef MP || APP
			this.strokeing.push({ x: e.changedTouches[0].x, y: e.changedTouches[0].y });
			// #endif
			// #ifdef H5
			this.strokeing.push(await this.getH5MousePosition(e));
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
		async getH5MousePosition(e) {
			const canvas = await utils.querySelector(`#${this.canvasId}`, this);
			return {
				x: e.clientX - canvas.left,
				y: e.clientY - canvas.top,
			};
		},
		// #endif
	},
};
</script>

<style scoped lang="scss">
.ste-signature-root {
	position: relative;
}
</style>
