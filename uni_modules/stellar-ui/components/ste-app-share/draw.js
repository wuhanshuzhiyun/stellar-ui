/**
 * @param {UniApp.CanvasContext} ctx
 * @param {{background:string;title:string;message:string;qrcode:string}} poster
 * @param {{page: string;image: string;name: string;desc: string;price:string}} data
 */
export function drawPoster(ctx, poster, data) {
	return new Promise(async (resolve, reject) => {
		const { width, height } = ctx;
		// 清空
		ctx.clearRect(0, 0, width, height);
		// 绘制白色背景
		ctx.setFillStyle(poster.background || '#ffffff');
		ctx.fillRect(0, 0, width, height);
		// 居中绘制标题
		if (poster.title) {
			ctx.setFontSize(14);
			ctx.setFillStyle('#333333');
			ctx.setTextAlign('center');
			ctx.fillText(poster.title, width / 2, 30);
		}
		// 绘制宽高一致的图片
		if (data.image) {
			try {
				const image = await uni.getImageInfo({ src: data.image });
				ctx.drawImage(image.path, 0, 40, width, width);
			} catch (e) {
				console.error(e);
			}
		}
		// 绘制加粗文本name
		if (data.name) {
			ctx.setFontSize(16);
			ctx.setFillStyle('#333333');
			ctx.setTextAlign('left');
			ctx.fillText(data.name, 10, width + 80);
		}
		// 绘制message
		if (data.desc) {
			ctx.setFontSize(14);
			ctx.setFillStyle('#666666');
			ctx.setTextAlign('left');
			ctx.fillText(data.desc, 10, width + 100);
		}
		// 绘制价格
		if (data.price) {
			ctx.setFontSize(20);
			ctx.setFillStyle('#ff0000');
			ctx.setTextAlign('left');
			ctx.fillText(`￥${data.price}`, 10, width + 125);
		}

		// 绘制文字
		if (poster.message) {
			ctx.setFontSize(12);
			ctx.setFillStyle('#666666');
			ctx.setTextAlign('left');
			ctx.fillText(poster.message, 10, height - 20);
		}
		// 绘制qrcode
		if (poster.qrcode) {
			try {
				const qrcode = await uni.getImageInfo({ src: poster.qrcode });
				ctx.drawImage(qrcode.path, width - 80, width + 80, 70, 70);
			} catch (e) {
				console.error(e);
			}
		}
		// 绘制完成
		ctx.draw(false, () => {
			resolve();
		});
	});
}
