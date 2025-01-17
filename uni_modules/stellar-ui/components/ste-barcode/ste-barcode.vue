<template>
	<view class="ste-barcode-root">
		<!-- #ifdef H5 -->
		<canvas
			:style="{ width: width + 'px', height: height + 'px' }"
			:canvas-id="canvasId"
			:id="canvasId"
			class="h5-canvas"
		></canvas>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
		<canvas
			type="2d"
			:id="canvasId"
			:style="{ width: width + 'px', height: height + 'px' }"
			class="mp-canvas"
		></canvas>
		<!-- #endif -->
	</view>
</template>

<script>
/**
 * ste-barcode 条形码
 * @description 条形码组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-barcode
 * @property {String} content 条形码内容(仅支持数字和字母)
 * @property {Number} width 条形码宽度，单位`px`
 * @property {Number} height 条形码高度，单位`px`
 * @property {String} background 背景色
 * @property {String} foreground 前景色(条形码画笔颜色)
 * @event {Function} loadImage 加载完成后返回条形码对应的图片数据
 */
import utils from '../../utils/utils';
import { PATTERNS, stringToCode128 } from './encode2';

export default {
	group: '展示组件',
	name: 'ste-barcode',
	title: 'Barcode 条形码',
	options: {
		virtualHost: true,
	},
	props: {
		content: {
			type: String,
			required: true,
		},
		width: {
			type: Number,
			default: 300,
		},
		height: {
			type: Number,
			default: 100,
		},
		background: {
			type: String,
			default: '#FFFFFF',
		},
		foreground: {
			type: String,
			default: '#000000',
		},
	},

	data() {
		return {
			canvasId: 'ste-barcode-' + utils.guid(8),
		};
	},

	mounted() {
		this.initCanvas();
	},
	watch: {
		content: {
			handler(newVal) {
				if (!newVal) return;
				this.initCanvas();
			},
		},
	},
	methods: {
		initCanvas() {
			const canvas = utils.getCanvasContext(this.canvasId, this).then((res) => {
				console.log('*** barcode , ', res);
				// #ifndef H5
				const context = res.getContext('2d');
				const dpr = utils.System.getWindowInfo().pixelRatio;
				res.width = this.width * dpr;
				res.height = this.height * dpr;
				context.scale(dpr, dpr);
				this.drawBarcodeMP(context, res);

				// #endif

				// #ifdef H5
				this.drawBarcodeH5(res);
				// #endif
			});
		},
		// 将 PATTERNS 码序列转换为二进制序列
		patternsToBinary(codes) {
			let binary = '';
			for (let i = 0; i < codes.length; i++) {
				const pattern = PATTERNS[codes[i]];
				for (let j = 0; j < 8; j += 2) {
					// 添加黑色条
					binary += '1'.repeat(pattern[j]);
					// 添加白色空格
					if (j + 1 < 8) {
						binary += '0'.repeat(pattern[j + 1]);
					}
				}
			}
			return binary;
		},
		// H5环境下的绘制方法
		drawBarcodeH5(context) {
			if (!this.content) return;
			// 生成编码数据
			const codes = stringToCode128(this.content);
			if (!codes || codes.length === 0) {
				return;
			}

			// 转换为二进制序列
			const barcodeData = this.patternsToBinary(codes);

			// 清空画布
			context.setFillStyle(this.background);
			context.fillRect(0, 0, this.width, this.height);

			// 设置条码颜色
			context.setFillStyle(this.foreground);

			// 直接使用画布宽度，不考虑边距
			const unitWidth = this.width / barcodeData.length;

			// 绘制条码
			let x = 0;
			for (let i = 0; i < barcodeData.length; i++) {
				if (barcodeData[i] === '1') {
					context.fillRect(x, 0, Math.ceil(unitWidth), this.height);
				}
				x += unitWidth;
			}

			context.draw();
			uni.canvasToTempFilePath({
				canvasId: this.canvasId,
				canvas: context,
				complete: (res) => {
					if (!res || !res.tempFilePath) {
						console.error('图片生成失败');
					} else {
						this.$emit('loadImage', res.tempFilePath);
					}
				},
			});
		},

		// 小程序环境下的绘制方法
		drawBarcodeMP(context, canvas) {
			if (!context || !this.content) return;

			const codes = stringToCode128(this.content);
			if (!codes || codes.length === 0) return;

			// 清空画布
			context.fillStyle = this.background;
			context.fillRect(0, 0, this.width, this.height);

			const barWeight = this.width / ((codes.length - 3) * 11 + 35);
			let x = 0;

			// 绘制条码
			context.fillStyle = this.foreground;
			for (let i = 0; i < codes.length; i++) {
				const pattern = PATTERNS[codes[i]];
				for (let bar = 0; bar < 8; bar += 2) {
					const barW = pattern[bar] * barWeight;
					if (barW > 0) {
						context.fillRect(x, 0, barW, this.height);
					}
					x += barW + pattern[bar + 1] * barWeight;
				}
			}

			uni.canvasToTempFilePath({
				canvas: canvas,
				complete: (res) => {
					if (!res || !res.tempFilePath) {
						console.error('图片生成失败');
					} else {
						this.$emit('loadImage', res.tempFilePath);
					}
				},
			});
		},
	},
};
</script>

<style>
.ste-barcode-root {
	width: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
