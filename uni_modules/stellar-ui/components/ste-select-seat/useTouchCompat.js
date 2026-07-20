export var getTouchX = function(touch) {
    if (!touch) return 0;
    if (typeof touch.x === 'number') return touch.x;
    if (typeof touch.pageX === 'number') return touch.pageX;
    if (typeof touch.clientX === 'number') return touch.clientX;
    return 0;
};

export var getTouchY = function(touch) {
    if (!touch) return 0;
    if (typeof touch.y === 'number') return touch.y;
    if (typeof touch.pageY === 'number') return touch.pageY;
    if (typeof touch.clientY === 'number') return touch.clientY;
    return 0;
};

export var toTouchArray = function(touches) {
    if (!touches) return [];
    if (typeof touches.length !== 'number') {
        return Object.keys(touches)
            .filter(function(k) { return !isNaN(Number(k)); })
            .map(function(k) { return touches[k]; })
            .filter(Boolean);
    }
    return Array.from({ length: touches.length }, function(_, index) { return touches[index]; }).filter(Boolean);
};

export var getTouchIdentifier = function(touch, index) {
    if (touch && typeof touch.identifier === 'number') return touch.identifier;
    return 'touch-' + index;
};

export var getTouchDistance = function(touches) {
    if (touches.length < 2) return 0;
    var dx = getTouchX(touches[0]) - getTouchX(touches[1]);
    var dy = getTouchY(touches[0]) - getTouchY(touches[1]);
    return Math.sqrt(dx * dx + dy * dy);
};

export var getTouchCenter = function(touches) {
    if (touches.length < 2) {
        return { x: getTouchX(touches[0]), y: getTouchY(touches[0]) };
    }
    return {
        x: (getTouchX(touches[0]) + getTouchX(touches[1])) / 2,
        y: (getTouchY(touches[0]) + getTouchY(touches[1])) / 2,
    };
};

export var getTouchLocalPoint = function(touch, rect) {
    if (!touch) return { x: 0, y: 0 };
    if (typeof touch.x === 'number' && typeof touch.y === 'number') {
        return { x: touch.x, y: touch.y };
    }
    return {
        x: getTouchX(touch) - (rect && rect.left != null ? rect.left : 0),
        y: getTouchY(touch) - (rect && rect.top != null ? rect.top : 0),
    };
};