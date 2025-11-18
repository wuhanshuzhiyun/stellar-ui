<template>
	<view class="ste-qrcode-root" :style="{ width: `${size}px`, height: `${size}px` }">
		<view class="canvas-wrapper">
			<!-- #ifdef H5 || APP -->
			<canvas :style="[compCanvasStyle]" :canvas-id="canvasId" :id="canvasId" class="h5-canvas"></canvas>
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
			<canvas type="2d" :id="canvasId" :style="[compCanvasStyle]" class="mp-canvas"></canvas>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
/**
 * ste-qrcode 二维码
 * @description 二维码组件
 * @tutorial https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui&menu=%E7%BB%84%E4%BB%B6&active=ste-qrcode
 * @property {String} content 二维码内容
 * @property {Number} size 二维码尺寸，单位`px`
 * @property {String} background 背景色
 * @property {String} foreground 前景色(条形码画笔颜色)
 * @property {String} foregroundImageSrc 二维码中间logo图
 * @property {String} foregroundImageWidth logo图宽度, 默认二维码尺寸的四分之一
 * @property {String} foregroundImageHeight logo图高度, 默认二维码尺寸的四分之一
 * @event {Function} loadImage 加载完成后返回条形码对应的图片数据
 */
import UQRCode from './uqrcode';
import utils from '../../utils/utils';

export default {
	group: '展示组件',
	name: 'ste-qrcode',
	title: 'QRcode 二维码',
	options: {
		virtualHost: true,
	},
	props: {
		// 二维码内容
		content: {
			type: String,
			required: true,
		},
		// 二维码尺寸
		size: {
			type: Number,
			default: 100,
		},
		// 背景色
		background: {
			type: String,
			default: '#FFFFFF',
		},
		// 前景色
		foreground: {
			type: String,
			default: '#000000',
		},
		// 二维码logo
		foregroundImageSrc: {
			type: String,
			default: '',
		},
		// logo尺寸 默认画布尺寸四分之一
		foregroundImageWidth: {
			type: Number,
			default: null,
		},
		// logo尺寸 默认画布尺寸四分之一
		foregroundImageHeight: {
			type: Number,
			default: null,
		},
	},

	data() {
		return {
			canvasId: 'ste-qrcode-' + utils.guid(8),
			canvasWidth: this.size,
			canvasHeight: this.size,
		};
	},
	mounted() {
		this.initCanvas();
	},
	computed: {
		compCanvasStyle() {
			let style = {};
			return {
				width: this.canvasWidth + 'px',
				height: this.canvasHeight + 'px',
				transform: `scale(${this.size / this.canvasWidth}, ${this.size / this.canvasHeight})`,
			};
		},
	},
	watch: {
		content: {
			handler() {
				this.initCanvas();
			},
			immediate: true,
		},
	},
	methods: {
		initCanvas() {
			if (!this.content) return;
			this.$nextTick(() => {
				const canvas = utils.getCanvasContext(this.canvasId, this).then((res) => {
					let context = res;
					// #ifndef H5 || APP
					context = res.getContext('2d');
					// #endif

					this.draw(context, res);
				});
			});
		},
		draw(ctx, canvas) {
			const qr = new UQRCode();
			qr.useDynamicSize = true;

			qr.backgroundColor = this.background;
			qr.foregroundColor = this.foreground;
			qr.foregroundImageSrc = this.foregroundImageSrc ? `${this.foregroundImageSrc}?${new Date().getTime()}` : '';
			this.foregroundImageWidth ? (qr.foregroundImageWidth = this.foregroundImageWidth) : '';
			this.foregroundImageHeight ? (qr.foregroundImageHeight = this.foregroundImageHeight) : '';
			// 设置二维码内容
			qr.data = this.content;
			// 设置二维码大小，必须与canvas设置的宽高一致
			qr.size = this.size;
			// 调用制作二维码方法
			qr.make();

			// #ifdef MP-WEIXIN || MP-ALIPAY

			const dpr = utils.System.getWindowInfo().pixelRatio;
			canvas.width = qr.dynamicSize * dpr;
			canvas.height = qr.dynamicSize * dpr;
			ctx.scale(dpr, dpr);

			qr.loadImage = (src) => {
				// 需要返回Promise对象，小程序下获取网络图片信息需先配置download域名白名单才能生效
				return new Promise((resolve, reject) => {
					var img = canvas.createImage();
					img.src = src;
					img.onload = () => {
						// resolve返回img
						resolve(img);
					};
					img.onerror = (err) => {
						// reject返回错误信息
						reject(err);
					};
				});
			};
			// #endif

			// #ifdef H5 || APP
			this.canvasWidth = qr.dynamicSize;
			this.canvasHeight = qr.dynamicSize;

			qr.loadImage = (src) => {
				// 需要返回Promise对象
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src,
						success: (res) => {
							resolve(res.path);
						},
						fail: (err) => {
							// reject返回错误信息
							reject(err);
						},
					});
				});
			};

			// #endif

			// 设置uQRCode实例的canvas上下文
			qr.canvasContext = ctx;
			// 调用绘制方法将二维码图案绘制到canvas上
			setTimeout(() => {
				qr.drawCanvas().then(() => {
					setTimeout(() => {
						uni.canvasToTempFilePath({
							canvas: canvas,
							canvasId: this.canvasId,

							complete: (res) => {
								if (!res || !res.tempFilePath) {
									console.error('图片生成失败');
								} else {
									this.$emit('loadImage', res.tempFilePath);
								}
							},
						});
					}, 1500);
				});
			}, 300);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-qrcode-root {
	// width: fit-content;
	// display: flex;
	// justify-content: center;
	// align-items: center;
	position: relative;
	.h5-canvas {
		transform-origin: top left;
	}
}
</style>
