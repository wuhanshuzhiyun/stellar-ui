'use strict';
exports.__esModule = true;
exports.isSeatInBounds = exports.getSafeGridSize = exports.isPositiveInteger = exports.isInteger = void 0;
var isInteger = function (value) {
	return typeof value === 'number' && Number.isInteger(value);
};
exports.isInteger = isInteger;
var isPositiveInteger = function (value) {
	return (0, exports.isInteger)(value) && value > 0;
};
exports.isPositiveInteger = isPositiveInteger;
var getSafeGridSize = function (rows, cols) {
	return {
		rows: (0, exports.isPositiveInteger)(rows) ? rows : 0,
		cols: (0, exports.isPositiveInteger)(cols) ? cols : 0,
	};
};
exports.getSafeGridSize = getSafeGridSize;
var isSeatInBounds = function (row, col, rows, cols) {
	return row >= 0 && row < rows && col >= 0 && col < cols;
};
exports.isSeatInBounds = isSeatInBounds;
