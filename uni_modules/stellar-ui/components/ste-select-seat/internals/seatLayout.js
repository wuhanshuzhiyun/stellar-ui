"use strict";
exports.__esModule = true;
exports.getRowLabelTrackStyle = exports.buildRowLabelItems = exports.getScreenTranslateX = exports.getDefaultSeatViewport = exports.getSeatTranslateBounds = exports.clampSeatScale = exports.getFitScale = exports.getSeatContentSize = exports.getLabelWidth = exports.INTERNAL_MAX_SCALE = void 0;
exports.INTERNAL_MAX_SCALE = 3;
var getLabelWidth = function (showRowLabels, seatSize, seatGap) {
    return showRowLabels ? seatSize + seatGap : 0;
};
exports.getLabelWidth = getLabelWidth;
var getSeatContentSize = function (params) {
    var rows = params.rows, cols = params.cols, seatSize = params.seatSize, seatGap = params.seatGap, labelWidth = params.labelWidth;
    if (!rows || !cols)
        return { width: 0, height: 0 };
    return {
        width: labelWidth + cols * (seatSize + seatGap) + seatGap,
        height: rows * (seatSize + seatGap) + seatGap
    };
};
exports.getSeatContentSize = getSeatContentSize;
var getFitScale = function (params) {
    var width = params.width, height = params.height, contentWidth = params.contentWidth, contentHeight = params.contentHeight;
    if (!contentWidth || !contentHeight)
        return 1;
    return Math.min(1, width / contentWidth, height / contentHeight);
};
exports.getFitScale = getFitScale;
var clampSeatScale = function (scale, fitScale, maxScale) {
    if (maxScale === void 0) { maxScale = exports.INTERNAL_MAX_SCALE; }
    return Math.min(Math.max(scale, fitScale), maxScale);
};
exports.clampSeatScale = clampSeatScale;
var getSeatTranslateBounds = function (params) {
    var scale = params.scale, width = params.width, height = params.height, contentWidth = params.contentWidth, contentHeight = params.contentHeight;
    if (!contentWidth || !contentHeight) {
        return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }
    var scaledWidth = contentWidth * scale;
    var scaledHeight = contentHeight * scale;
    var centerX = (width / scale - contentWidth) / 2;
    var centerY = (height / scale - contentHeight) / 2;
    var marginX = width * 0.2 / scale;
    var marginY = height * 0.2 / scale;
    return {
        minX: scaledWidth > width ? width / scale - contentWidth - marginX : centerX - marginX,
        maxX: scaledWidth > width ? marginX : centerX + marginX,
        minY: scaledHeight > height ? height / scale - contentHeight - marginY : centerY - marginY,
        maxY: scaledHeight > height ? marginY : centerY + marginY
    };
};
exports.getSeatTranslateBounds = getSeatTranslateBounds;
var getDefaultSeatViewport = function (params) {
    var fitScale = params.fitScale, width = params.width, height = params.height, contentWidth = params.contentWidth, contentHeight = params.contentHeight, _a = params.maxScale, maxScale = _a === void 0 ? exports.INTERNAL_MAX_SCALE : _a;
    if (!contentWidth || !contentHeight) {
        return {
            scale: 1,
            translateX: 0,
            translateY: 0
        };
    }
    var scale = (0, exports.clampSeatScale)(fitScale, fitScale, maxScale);
    return {
        scale: scale,
        translateX: (width / scale - contentWidth) / 2,
        translateY: (height / scale - contentHeight) / 2
    };
};
exports.getDefaultSeatViewport = getDefaultSeatViewport;
var getScreenTranslateX = function (params) {
    var scale = params.scale, translateX = params.translateX, width = params.width, defaultViewport = params.defaultViewport;
    var anchorX = width / (2 * defaultViewport.scale) - defaultViewport.translateX;
    return (anchorX + translateX) * scale - width / 2;
};
exports.getScreenTranslateX = getScreenTranslateX;
var buildRowLabelItems = function (params) {
    var rows = params.rows, height = params.height, seatSize = params.seatSize, seatGap = params.seatGap, translateY = params.translateY, scale = params.scale;
    var rowHeight = seatSize * scale;
    var fontSize = Math.max(10, Math.min(13, rowHeight * 0.3));
    return Array.from({ length: rows }, function (_, row) {
        var top = (row * (seatSize + seatGap) + seatGap / 2 + translateY) * scale;
        return {
            row: row,
            top: top,
            rowHeight: rowHeight,
            style: {
                top: "".concat(top, "px"),
                height: "".concat(rowHeight, "px"),
                lineHeight: "".concat(rowHeight, "px"),
                fontSize: "".concat(fontSize, "px")
            }
        };
    }).filter(function (item) { return item.top + rowHeight > 0 && item.top < height; });
};
exports.buildRowLabelItems = buildRowLabelItems;
var getRowLabelTrackStyle = function (items, height) {
    if (!items.length) {
        return {
            display: 'none'
        };
    }
    var first = items[0];
    var last = items[items.length - 1];
    var padding = 8;
    var top = Math.max(0, first.top - padding);
    var bottom = Math.min(height, last.top + last.rowHeight + padding);
    return {
        top: "".concat(top, "px"),
        height: "".concat(Math.max(32, bottom - top), "px")
    };
};
exports.getRowLabelTrackStyle = getRowLabelTrackStyle;
