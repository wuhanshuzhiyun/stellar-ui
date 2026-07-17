export const INTERNAL_MAX_SCALE = 3;

export const getLabelWidth = (showRowLabels, seatSize, seatGap) => {
    return showRowLabels ? seatSize + seatGap : 0;
};

export const getSeatContentSize = (params) => {
    const { rows, cols, seatSize, seatGap, labelWidth } = params;
    if (!rows || !cols) return { width: 0, height: 0 };
    return {
        width: labelWidth + cols * (seatSize + seatGap) + seatGap,
        height: rows * (seatSize + seatGap) + seatGap,
    };
};

export const getFitScale = (params) => {
    const { width, height, contentWidth, contentHeight } = params;
    if (!contentWidth || !contentHeight) return 1;
    return Math.min(1, width / contentWidth, height / contentHeight);
};

export const clampSeatScale = (scale, fitScale, maxScale = INTERNAL_MAX_SCALE) => {
    return Math.min(Math.max(scale, fitScale), maxScale);
};

export const getSeatTranslateBounds = (params) => {
    const { scale, width, height, contentWidth, contentHeight } = params;
    if (!contentWidth || !contentHeight) {
        return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }
    const scaledWidth = contentWidth * scale;
    const scaledHeight = contentHeight * scale;
    const centerX = (width / scale - contentWidth) / 2;
    const centerY = (height / scale - contentHeight) / 2;
    const marginX = width * 0.2 / scale;
    const marginY = height * 0.2 / scale;
    return {
        minX: scaledWidth > width ? width / scale - contentWidth - marginX : centerX - marginX,
        maxX: scaledWidth > width ? marginX : centerX + marginX,
        minY: scaledHeight > height ? height / scale - contentHeight - marginY : centerY - marginY,
        maxY: scaledHeight > height ? marginY : centerY + marginY,
    };
};

export const getDefaultSeatViewport = (params) => {
    const { fitScale, width, height, contentWidth, contentHeight, maxScale = INTERNAL_MAX_SCALE } = params;
    if (!contentWidth || !contentHeight) {
        return {
            scale: 1,
            translateX: 0,
            translateY: 0,
        };
    }
    const scale = clampSeatScale(fitScale, fitScale, maxScale);
    return {
        scale,
        translateX: (width / scale - contentWidth) / 2,
        translateY: (height / scale - contentHeight) / 2,
    };
};

export const getScreenTranslateX = (params) => {
    const { scale, translateX, width, defaultViewport } = params;
    const anchorX = width / (2 * defaultViewport.scale) - defaultViewport.translateX;
    return (anchorX + translateX) * scale - width / 2;
};

export const buildRowLabelItems = (params) => {
    const { rows, height, seatSize, seatGap, translateY, scale } = params;
    const rowHeight = seatSize * scale;
    const fontSize = Math.max(10, Math.min(13, rowHeight * 0.3));
    return Array.from({ length: rows }, (_, row) => {
        const top = (row * (seatSize + seatGap) + seatGap / 2 + translateY) * scale;
        return {
            row,
            top,
            rowHeight,
            style: {
                top: `${top}px`,
                height: `${rowHeight}px`,
                lineHeight: `${rowHeight}px`,
                fontSize: `${fontSize}px`,
            },
        };
    }).filter(item => item.top + rowHeight > 0 && item.top < height);
};

export const getRowLabelTrackStyle = (items, height) => {
    if (!items.length) {
        return {
            display: 'none',
        };
    }
    const first = items[0];
    const last = items[items.length - 1];
    const padding = 8;
    const top = Math.max(0, first.top - padding);
    const bottom = Math.min(height, last.top + last.rowHeight + padding);
    return {
        top: `${top}px`,
        height: `${Math.max(32, bottom - top)}px`,
    };
};