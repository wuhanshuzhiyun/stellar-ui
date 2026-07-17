export const drawRoundRect = (ctx, x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
};

export const drawCheck = (ctx, cx, cy, size, color) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1.4, size * 0.1);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const s = size * 0.34;
    ctx.moveTo(cx - s * 0.62, cy - s * 0.02);
    ctx.lineTo(cx - s * 0.14, cy + s * 0.42);
    ctx.lineTo(cx + s * 0.62, cy - s * 0.36);
    ctx.stroke();
};