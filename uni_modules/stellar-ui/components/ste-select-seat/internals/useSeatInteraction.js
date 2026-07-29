'use strict';
exports.__esModule = true;
exports.useSeatInteraction = void 0;
var useTouchCompat_1 = require('../useTouchCompat');
function useSeatInteraction(options) {
	var instance = options.instance,
		canvasId = options.canvasId,
		getShowRowLabels = options.getShowRowLabels,
		touchHandler = options.touchHandler,
		clampScale = options.clampScale,
		applyTranslateResistance = options.applyTranslateResistance,
		clampTranslate = options.clampTranslate,
		getTouchSeat = options.getTouchSeat,
		getTouchLocalPoint = options.getTouchLocalPoint,
		applyDefaultViewport = options.applyDefaultViewport,
		draw = options.draw,
		emitMove = options.emitMove,
		emitSeatClick = options.emitSeatClick,
		emitModelValue = options.emitModelValue,
		toggleSeat = options.toggleSeat;
	var panThreshold = 4;
	var reboundThreshold = 0.5;
	var reboundDuration = 180;
	var momentumMinVelocity = 0.02;
	var momentumDecayPerFrame = 0.92;
	var rowLabelsVisible = { value: getShowRowLabels() };
	var activeTouches = new Map();
	var dragMoved = false;
	var gestureMode = 'none';
	var panStartX = 0;
	var panStartY = 0;
	var panBaseTranslateX = 0;
	var panBaseTranslateY = 0;
	var pinchStartDistance = 0;
	var pinchStartScale = 1;
	var pinchStartCenterX = 0;
	var pinchStartCenterY = 0;
	var pinchLockedTranslateX = 0;
	var pinchLockedTranslateY = 0;
	var reboundTimer = null;
	var momentumTimer = null;
	var rowLabelTimer = null;
	var lastPanSampleTime = 0;
	var lastPanSampleX = 0;
	var lastPanSampleY = 0;
	var panVelocityX = 0;
	var panVelocityY = 0;
	var mouseDown = false;
	var mouseStartX = 0;
	var mouseStartY = 0;
	// ─── Touch State Sync ─────────────────────────────────────────────────────
	var syncActiveTouches = function (touches) {
		activeTouches.clear();
		touches.forEach(function (touch, index) {
			activeTouches.set((0, useTouchCompat_1.getTouchIdentifier)(touch, index), touch);
		});
	};
	var patchActiveTouches = function (touches) {
		touches.forEach(function (touch, index) {
			activeTouches.set((0, useTouchCompat_1.getTouchIdentifier)(touch, index), touch);
		});
	};
	var removeActiveTouches = function (touches) {
		touches.forEach(function (touch, index) {
			activeTouches['delete']((0, useTouchCompat_1.getTouchIdentifier)(touch, index));
		});
	};
	var getEventTouches = function (e, phase) {
		var touches = (0, useTouchCompat_1.toTouchArray)(e.touches);
		var changedTouches = (0, useTouchCompat_1.toTouchArray)(e.changedTouches);
		if (phase === 'end') {
			if (touches.length) {
				syncActiveTouches(touches);
			} else {
				removeActiveTouches(changedTouches);
				if (!activeTouches.size) {
					activeTouches.clear();
				}
			}
			return Array.from(activeTouches.values());
		}
		if (touches.length) {
			syncActiveTouches(touches);
		} else {
			patchActiveTouches(changedTouches);
		}
		return Array.from(activeTouches.values());
	};
	var getChangedTouches = function (e) {
		return (0, useTouchCompat_1.toTouchArray)(e.changedTouches);
	};
	// ─── Overlay State ────────────────────────────────────────────────────────
	var clearRowLabelTimer = function () {
		if (rowLabelTimer) {
			clearTimeout(rowLabelTimer);
			rowLabelTimer = null;
		}
	};
	var setRowLabelsVisible = function (visible) {
		clearRowLabelTimer();
		rowLabelsVisible.value = visible;
	};
	var showRowLabelOverlay = function () {
		clearRowLabelTimer();
		rowLabelsVisible.value = getShowRowLabels();
	};
	// ─── Motion State ─────────────────────────────────────────────────────────
	var resetPanVelocity = function () {
		panVelocityX = 0;
		panVelocityY = 0;
		lastPanSampleTime = 0;
		lastPanSampleX = 0;
		lastPanSampleY = 0;
	};
	var recordPanVelocity = function (x, y) {
		var now = Date.now();
		if (!lastPanSampleTime) {
			lastPanSampleTime = now;
			lastPanSampleX = x;
			lastPanSampleY = y;
			return;
		}
		var dt = Math.max(1, now - lastPanSampleTime);
		var nextVelocityX = (x - lastPanSampleX) / dt;
		var nextVelocityY = (y - lastPanSampleY) / dt;
		panVelocityX = panVelocityX * 0.35 + nextVelocityX * 0.65;
		panVelocityY = panVelocityY * 0.35 + nextVelocityY * 0.65;
		lastPanSampleTime = now;
		lastPanSampleX = x;
		lastPanSampleY = y;
	};
	var stopMomentum = function () {
		if (!momentumTimer) return;
		clearTimeout(momentumTimer);
		momentumTimer = null;
	};
	var stopRebound = function () {
		if (!reboundTimer) return;
		clearTimeout(reboundTimer);
		reboundTimer = null;
	};
	var stopMotion = function () {
		stopMomentum();
		stopRebound();
	};
	var updateBaseTransform = function () {
		touchHandler.baseScale = touchHandler.scale;
		touchHandler.baseTranslateX = touchHandler.translateX;
		touchHandler.baseTranslateY = touchHandler.translateY;
	};
	var applyTranslate = function (x, y, scale) {
		if (scale === void 0) {
			scale = touchHandler.scale;
		}
		var nextTranslate = applyTranslateResistance(x, y, scale);
		touchHandler.translateX = nextTranslate.x;
		touchHandler.translateY = nextTranslate.y;
	};
	var beginPan = function (touch, moved) {
		gestureMode = 'pan';
		dragMoved = moved;
		panStartX = (0, useTouchCompat_1.getTouchX)(touch);
		panStartY = (0, useTouchCompat_1.getTouchY)(touch);
		panBaseTranslateX = touchHandler.translateX;
		panBaseTranslateY = touchHandler.translateY;
		resetPanVelocity();
		recordPanVelocity(panStartX, panStartY);
	};
	var beginPinch = function (touches) {
		gestureMode = 'pinch';
		dragMoved = true;
		resetPanVelocity();
		pinchStartDistance = (0, useTouchCompat_1.getTouchDistance)(touches);
		pinchStartScale = touchHandler.scale;
		var center = (0, useTouchCompat_1.getTouchCenter)(touches);
		pinchStartCenterX = center.x;
		pinchStartCenterY = center.y;
		pinchLockedTranslateX = touchHandler.translateX;
		pinchLockedTranslateY = touchHandler.translateY;
	};
	// ─── Motion Animation ─────────────────────────────────────────────────────
	var reboundToBounds = function (onComplete) {
		stopMomentum();
		stopRebound();
		var fromX = touchHandler.translateX;
		var fromY = touchHandler.translateY;
		var target = clampTranslate(fromX, fromY);
		if (Math.abs(target.x - fromX) <= reboundThreshold && Math.abs(target.y - fromY) <= reboundThreshold) {
			touchHandler.translateX = target.x;
			touchHandler.translateY = target.y;
			updateBaseTransform();
			draw();
			emitMove();
			onComplete === null || onComplete === void 0 ? void 0 : onComplete();
			return;
		}
		var startTime = Date.now();
		var easeOutCubic = function (t) {
			return 1 - Math.pow(1 - t, 3);
		};
		var animate = function () {
			var elapsed = Date.now() - startTime;
			var progress = Math.min(1, elapsed / reboundDuration);
			var eased = easeOutCubic(progress);
			touchHandler.translateX = fromX + (target.x - fromX) * eased;
			touchHandler.translateY = fromY + (target.y - fromY) * eased;
			updateBaseTransform();
			draw();
			emitMove();
			if (progress >= 1) {
				touchHandler.translateX = target.x;
				touchHandler.translateY = target.y;
				updateBaseTransform();
				draw();
				emitMove();
				reboundTimer = null;
				onComplete === null || onComplete === void 0 ? void 0 : onComplete();
				return;
			}
			reboundTimer = setTimeout(animate, 16);
		};
		animate();
	};
	var startMomentum = function (onComplete) {
		stopMomentum();
		if (Math.abs(panVelocityX) < momentumMinVelocity && Math.abs(panVelocityY) < momentumMinVelocity) {
			reboundToBounds(onComplete);
			return;
		}
		var velocityX = panVelocityX;
		var velocityY = panVelocityY;
		var lastTime = Date.now();
		var animate = function () {
			var now = Date.now();
			var dt = Math.min(24, Math.max(8, now - lastTime));
			lastTime = now;
			var decay = Math.pow(momentumDecayPerFrame, dt / 16);
			velocityX *= decay;
			velocityY *= decay;
			var nextTranslate = applyTranslateResistance(touchHandler.translateX + velocityX * dt, touchHandler.translateY + velocityY * dt);
			touchHandler.translateX = nextTranslate.x;
			touchHandler.translateY = nextTranslate.y;
			updateBaseTransform();
			draw();
			emitMove();
			var clamped = clampTranslate(touchHandler.translateX, touchHandler.translateY);
			var outOfBounds = Math.abs(clamped.x - touchHandler.translateX) > reboundThreshold || Math.abs(clamped.y - touchHandler.translateY) > reboundThreshold;
			if ((Math.abs(velocityX) < momentumMinVelocity && Math.abs(velocityY) < momentumMinVelocity) || outOfBounds) {
				momentumTimer = null;
				panVelocityX = velocityX;
				panVelocityY = velocityY;
				reboundToBounds(onComplete);
				return;
			}
			momentumTimer = setTimeout(animate, 16);
		};
		animate();
	};
	var emitSeatSelection = function (seat) {
		console.log('[ste-select-seat] emitSeatSelection:', { seat: seat });
		emitSeatClick(seat);
		var newValue = toggleSeat(seat.row, seat.col);
		console.log('[ste-select-seat] toggleSeat returned:', { newValue: newValue, length: newValue.length });
		emitModelValue(newValue);
	};
	var selectSeatByPoint = function (x, y) {
		console.log('[ste-select-seat] selectSeatByPoint:', { x: x, y: y });
		var seat = getTouchSeat(x, y);
		console.log('[ste-select-seat] getTouchSeat returned:', { seat: seat });
		if (seat && !seat.disabled && !seat.empty) {
			emitSeatSelection(seat);
		}
	};
	var selectSeatFromTouch = function (touch) {
		// #ifdef H5
		var canvasElement = document.getElementById(canvasId);
		if (!canvasElement) {
			canvasElement = document.querySelector('canvas[canvas-id="'.concat(canvasId, '"]'));
		}
		if (!canvasElement) {
			canvasElement = document.querySelector('canvas.seat-canvas');
		}
		if (canvasElement) {
			var rect = canvasElement.getBoundingClientRect();
			var clientX = typeof touch.clientX === 'number' ? touch.clientX : typeof touch.pageX === 'number' ? touch.pageX : 0;
			var clientY = typeof touch.clientY === 'number' ? touch.clientY : typeof touch.pageY === 'number' ? touch.pageY : 0;
			var localX = clientX - rect.left;
			var localY = clientY - rect.top;
			// clientX/clientY 已经是 CSS 像素（逻辑像素），直接使用
			selectSeatByPoint(localX, localY);
			return;
		}
		// #endif
		uni.createSelectorQuery()
			['in'](instance)
			.select('#'.concat(canvasId))
			.boundingClientRect(function (rect) {
				if (!rect) return;
				var _a = getTouchLocalPoint(touch, rect),
					localX = _a.x,
					localY = _a.y;
				selectSeatByPoint(localX, localY);
			})
			.exec();
	};
	var selectSeatFromMouse = function (event) {
		var _a, _b;
		var rect = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect) === null || _b === void 0 ? void 0 : _b.call(_a);
		if (!rect) return;
		var localX = event.clientX - rect.left;
		var localY = event.clientY - rect.top;
		// clientX/clientY 已经是 CSS 像素（逻辑像素），直接使用
		selectSeatByPoint(localX, localY);
	};
	// ─── Pointer Events ───────────────────────────────────────────────────────
	var onTouchStart = function (e) {
		stopMotion();
		var touches = getEventTouches(e, 'start');
		var touchCount = touches.length;
		if (touchCount >= 2) {
			beginPinch(touches);
			return;
		}
		beginPan(touches[0], false);
	};
	var onTouchMove = function (e) {
		var touches = getEventTouches(e, 'move');
		var touchCount = touches.length;
		if (touchCount >= 2) {
			if (!pinchStartDistance) {
				beginPinch(touches);
			}
			var currentDistance = (0, useTouchCompat_1.getTouchDistance)(touches);
			var currentCenter = (0, useTouchCompat_1.getTouchCenter)(touches);
			if (pinchStartDistance > 0 && currentDistance > 0) {
				var nextScale = clampScale((currentDistance / pinchStartDistance) * pinchStartScale);
				touchHandler.scale = nextScale;
				var nextTranslateX = currentCenter.x / nextScale - pinchStartCenterX / pinchStartScale + pinchLockedTranslateX;
				var nextTranslateY = currentCenter.y / nextScale - pinchStartCenterY / pinchStartScale + pinchLockedTranslateY;
				applyTranslate(nextTranslateX, nextTranslateY, nextScale);
			}
			draw();
			emitMove();
			return;
		}
		if (gestureMode !== 'pan' || touchCount !== 1) return;
		var touch = touches[0];
		var currentX = (0, useTouchCompat_1.getTouchX)(touch);
		var currentY = (0, useTouchCompat_1.getTouchY)(touch);
		var dx = currentX - panStartX;
		var dy = currentY - panStartY;
		if (Math.abs(dx) > panThreshold || Math.abs(dy) > panThreshold) {
			dragMoved = true;
		}
		applyTranslate(panBaseTranslateX + dx, panBaseTranslateY + dy);
		recordPanVelocity(currentX, currentY);
		draw();
		emitMove();
	};
	var onTouchEnd = function (e) {
		var touches = getEventTouches(e, 'end');
		var changedTouches = getChangedTouches(e);
		var touchCount = touches.length;
		if (gestureMode === 'pinch') {
			touchHandler.scale = clampScale(touchHandler.scale);
			applyTranslate(touchHandler.translateX, touchHandler.translateY, touchHandler.scale);
			pinchStartDistance = 0;
		}
		updateBaseTransform();
		if (touchCount >= 2) {
			beginPinch(touches);
			draw();
			return;
		}
		if (touchCount === 1) {
			beginPan(touches[0], true);
		} else if (touchCount === 0) {
			gestureMode = 'none';
		}
		draw();
		if (touchCount === 0 && dragMoved) {
			startMomentum(function () {
				return showRowLabelOverlay();
			});
		} else if (touchCount === 0 || gestureMode === 'pinch') {
			reboundToBounds(function () {
				if (touchCount === 0) showRowLabelOverlay();
			});
		}
		if (!dragMoved && changedTouches.length === 1) {
			selectSeatFromTouch(changedTouches[0]);
		}
	};
	var onMouseDown = function (e) {
		stopMotion();
		mouseDown = true;
		dragMoved = false;
		mouseStartX = e.clientX;
		mouseStartY = e.clientY;
		resetPanVelocity();
		recordPanVelocity(mouseStartX, mouseStartY);
	};
	var onMouseMove = function (e) {
		if (!mouseDown) return;
		var dx = e.clientX - mouseStartX;
		var dy = e.clientY - mouseStartY;
		if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
			dragMoved = true;
		}
		applyTranslate(touchHandler.baseTranslateX + dx, touchHandler.baseTranslateY + dy);
		recordPanVelocity(e.clientX, e.clientY);
		draw();
		emitMove();
	};
	var onMouseUp = function (e) {
		if (!mouseDown) return;
		mouseDown = false;
		updateBaseTransform();
		if (dragMoved) {
			startMomentum(function () {
				return showRowLabelOverlay();
			});
		} else {
			reboundToBounds(function () {
				return showRowLabelOverlay();
			});
		}
		if (!dragMoved) {
			selectSeatFromMouse(e);
		}
	};
	// ─── Public API ───────────────────────────────────────────────────────────
	var reset = function () {
		stopMotion();
		showRowLabelOverlay();
		activeTouches.clear();
		touchHandler.reset();
		gestureMode = 'none';
		dragMoved = false;
		pinchStartDistance = 0;
		pinchStartScale = 1;
		pinchStartCenterX = 0;
		pinchStartCenterY = 0;
		pinchLockedTranslateX = 0;
		pinchLockedTranslateY = 0;
		panStartX = 0;
		panStartY = 0;
		panBaseTranslateX = 0;
		panBaseTranslateY = 0;
		resetPanVelocity();
		applyDefaultViewport();
		draw();
	};
	return {
		rowLabelsVisible: rowLabelsVisible,
		setShowRowLabelsVisible: setRowLabelsVisible,
		onTouchStart: onTouchStart,
		onTouchMove: onTouchMove,
		onTouchEnd: onTouchEnd,
		onMouseDown: onMouseDown,
		onMouseMove: onMouseMove,
		onMouseUp: onMouseUp,
		reset: reset,
	};
}
exports.useSeatInteraction = useSeatInteraction;
