<template>
	<view class="ste-qrcode-root">
		<!-- #ifdef H5 -->
		<canvas :style="[compCanvasStyle]" :canvas-id="canvasId" :id="canvasId" class="h5-canvas"></canvas>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
		<canvas type="2d" :id="canvasId" :style="[compCanvasStyle]" class="mp-canvas"></canvas>
		<!-- #endif -->
	</view>
</template>

<script>
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
			};
		},
	},
	watch: {
		content: {
			handler() {
				this.$nextTick(() => {
					this.initCanvas();
				});
			},
			immediate: true,
		},
	},
	methods: {
		initCanvas() {
			const canvas = utils.getCanvasContext(this.canvasId, this).then((res) => {
				let context = res;
				// #ifndef H5
				context = res.getContext('2d');
				const dpr = utils.System.getWindowInfo().pixelRatio;
				res.width = this.size * dpr;
				res.height = this.size * dpr;
				context.scale(dpr, dpr);
				// #endif

				this.draw(context, res);
			});
		},
		draw(ctx, canvas) {
			const qr = new UQRCode();
			// qr.useDynamicSize = true;

			qr.backgroundColor = this.background;
			qr.foregroundColor = this.foreground;
			qr.foregroundImageSrc = this.foregroundImageSrc;
			this.foregroundImageWidth ? (qr.foregroundImageWidth = this.foregroundImageWidth) : '';
			this.foregroundImageHeight ? (qr.foregroundImageHeight = this.foregroundImageHeight) : '';
			// 设置二维码内容
			qr.data = this.content;
			// 设置二维码大小，必须与canvas设置的宽高一致
			qr.size = this.size;
			// 调用制作二维码方法
			qr.make();

			// 设置uQRCode实例的canvas上下文
			qr.canvasContext = ctx;
			// 调用绘制方法将二维码图案绘制到canvas上
			qr.drawCanvas();
			qr.loadImage().then(() => {
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
			});
		},
	},
};
</script>

<style>
.ste-qrcode-root {
	width: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>