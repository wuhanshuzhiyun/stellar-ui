/**
 * @param {UniApp.CanvasContext} ctx
 * @param {string} title
 * @param {String} message
 * @param {{page: string,
				image: string,
				name: string,
				desc: string,
				qrcode: string,}} data
 */
export function drawPoster(ctx, title, message, data) {
	return new Promise((resolve, reject) => {
		const { width, height } = ctx;
		// 绘制白色背景
		ctx.setFillStyle('#f5f5f5');
		ctx.fillRect(0, 0, width, height);
		// 居中绘制标题
		ctx.setFontSize(14);
		ctx.setFillStyle('#333333');
		ctx.setTextAlign('center');
		ctx.fillText(title, width / 2, 30);

		// 绘制宽高一致的图片，都为width
		ctx.drawImage(data.image, 0, 40, width, width);
		// 绘制加粗文本name
		ctx.setFontSize(16);
		ctx.setFillStyle('#333333');
		ctx.setTextAlign('left');
		ctx.fillText(data.name, 10, width + 70);
		// 绘制message
		ctx.setFontSize(12);
		ctx.setFillStyle('#666666');
		ctx.setTextAlign('left');
		ctx.fillText(data.desc, 10, width + 95);
		// 绘制qrcode
		ctx.drawImage(data.qrcode, width - 80, width + 40, 70, 70);
		ctx.draw(false, () => {
			console.log('??????');
			resolve();
		});
	});
}
