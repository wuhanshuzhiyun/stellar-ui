export const isInteger = (value) => {
    return typeof value === 'number' && Number.isInteger(value);
};

export const isPositiveInteger = (value) => {
    return isInteger(value) && value > 0;
};

export const getSafeGridSize = (rows, cols) => {
    return {
        rows: isPositiveInteger(rows) ? rows : 0,
        cols: isPositiveInteger(cols) ? cols : 0,
    };
};

export const isSeatInBounds = (row, col, rows, cols) => {
    return row >= 0 && row < rows && col >= 0 && col < cols;
};