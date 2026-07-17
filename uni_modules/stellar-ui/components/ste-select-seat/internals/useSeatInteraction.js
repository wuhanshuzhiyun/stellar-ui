import { getTouchCenter, getTouchDistance, getTouchIdentifier, getTouchX, getTouchY, toTouchArray } from '../useTouchCompat';

export function useSeatInteraction(options) {
    const {
        instance,
        canvasId,
        getShowRowLabels,
        touchHandler,
        clampScale,
        applyTranslateResistance,
        clampTranslate,
        getTouchSeat,
        getTouchLocalPoint,
        applyDefaultViewport,
        draw,
        emitMove,
        emitSeatClick,
        emitModelValue,
        toggleSeat,
    } = options;

    const panThreshold = 4;
    const reboundThreshold = 0.5;
    const reboundDuration = 180;
    const momentumMinVelocity = 0.02;
    const momentumDecayPerFrame = 0.92;

    let rowLabelsVisible = getShowRowLabels();
    const activeTouches = {};
    let dragMoved = false;
    let gestureMode = 'none';
    let panStartX = 0;
    let panStartY = 0;
    let panBaseTranslateX = 0;
    let panBaseTranslateY = 0;
    let pinchStartDistance = 0;
    let pinchStartScale = 1;
    let pinchStartCenterX = 0;
    let pinchStartCenterY = 0;
    let pinchLockedTranslateX = 0;
    let pinchLockedTranslateY = 0;
    let reboundTimer = null;
    let momentumTimer = null;
    let rowLabelTimer = null;
    let lastPanSampleTime = 0;
    let lastPanSampleX = 0;
    let lastPanSampleY = 0;
    let panVelocityX = 0;
    let panVelocityY = 0;
    let mouseDown = false;
    let mouseStartX = 0;
    let mouseStartY = 0;

    const syncActiveTouches = (touches) => {
        Object.keys(activeTouches).forEach(key => delete activeTouches[key]);
        touches.forEach((touch, index) => {
            activeTouches[getTouchIdentifier(touch, index)] = touch;
        });
    };

    const patchActiveTouches = (touches) => {
        touches.forEach((touch, index) => {
            activeTouches[getTouchIdentifier(touch, index)] = touch;
        });
    };

    const removeActiveTouches = (touches) => {
        touches.forEach((touch, index) => {
            delete activeTouches[getTouchIdentifier(touch, index)];
        });
    };

    const getEventTouches = (e, phase) => {
        const touches = toTouchArray(e.touches);
        const changedTouches = toTouchArray(e.changedTouches);
        if (phase === 'end') {
            if (touches.length) {
                syncActiveTouches(touches);
            } else {
                removeActiveTouches(changedTouches);
                if (!Object.keys(activeTouches).length) {
                    Object.keys(activeTouches).forEach(key => delete activeTouches[key]);
                }
            }
            return Object.values(activeTouches);
        }
        if (touches.length) {
            syncActiveTouches(touches);
        } else {
            patchActiveTouches(changedTouches);
        }
        return Object.values(activeTouches);
    };

    const getChangedTouches = (e) => toTouchArray(e.changedTouches);

    const clearRowLabelTimer = () => {
        if (rowLabelTimer) {
            clearTimeout(rowLabelTimer);
            rowLabelTimer = null;
        }
    };

    const setRowLabelsVisible = (visible) => {
        clearRowLabelTimer();
        rowLabelsVisible = visible;
    };

    const showRowLabelOverlay = () => {
        clearRowLabelTimer();
        rowLabelsVisible = getShowRowLabels();
    };

    const resetPanVelocity = () => {
        panVelocityX = 0;
        panVelocityY = 0;
        lastPanSampleTime = 0;
        lastPanSampleX = 0;
        lastPanSampleY = 0;
    };

    const recordPanVelocity = (x, y) => {
        const now = Date.now();
        if (!lastPanSampleTime) {
            lastPanSampleTime = now;
            lastPanSampleX = x;
            lastPanSampleY = y;
            return;
        }
        const dt = Math.max(1, now - lastPanSampleTime);
        const nextVelocityX = (x - lastPanSampleX) / dt;
        const nextVelocityY = (y - lastPanSampleY) / dt;
        panVelocityX = panVelocityX * 0.35 + nextVelocityX * 0.65;
        panVelocityY = panVelocityY * 0.35 + nextVelocityY * 0.65;
        lastPanSampleTime = now;
        lastPanSampleX = x;
        lastPanSampleY = y;
    };

    const stopMomentum = () => {
        if (!momentumTimer) return;
        clearTimeout(momentumTimer);
        momentumTimer = null;
    };

    const stopRebound = () => {
        if (!reboundTimer) return;
        clearTimeout(reboundTimer);
        reboundTimer = null;
    };

    const stopMotion = () => {
        stopMomentum();
        stopRebound();
    };

    const updateBaseTransform = () => {
        touchHandler.baseScale = touchHandler.scale;
        touchHandler.baseTranslateX = touchHandler.translateX;
        touchHandler.baseTranslateY = touchHandler.translateY;
    };

    const applyTranslate = (x, y, scale = touchHandler.scale) => {
        const nextTranslate = applyTranslateResistance(x, y, scale);
        touchHandler.translateX = nextTranslate.x;
        touchHandler.translateY = nextTranslate.y;
    };

    const beginPan = (touch, moved) => {
        gestureMode = 'pan';
        dragMoved = moved;
        panStartX = getTouchX(touch);
        panStartY = getTouchY(touch);
        panBaseTranslateX = touchHandler.translateX;
        panBaseTranslateY = touchHandler.translateY;
        resetPanVelocity();
        recordPanVelocity(panStartX, panStartY);
    };

    const beginPinch = (touches) => {
        gestureMode = 'pinch';
        dragMoved = true;
        resetPanVelocity();
        pinchStartDistance = getTouchDistance(touches);
        pinchStartScale = touchHandler.scale;
        const center = getTouchCenter(touches);
        pinchStartCenterX = center.x;
        pinchStartCenterY = center.y;
        pinchLockedTranslateX = touchHandler.translateX;
        pinchLockedTranslateY = touchHandler.translateY;
    };

    const reboundToBounds = (onComplete) => {
        stopMomentum();
        stopRebound();
        const fromX = touchHandler.translateX;
        const fromY = touchHandler.translateY;
        const target = clampTranslate(fromX, fromY);
        if (Math.abs(target.x - fromX) <= reboundThreshold && Math.abs(target.y - fromY) <= reboundThreshold) {
            touchHandler.translateX = target.x;
            touchHandler.translateY = target.y;
            updateBaseTransform();
            draw();
            emitMove();
            onComplete && onComplete();
            return;
        }
        const startTime = Date.now();
        const easeOutCubic = (t) => 1 - (1 - t) ** 3;
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(1, elapsed / reboundDuration);
            const eased = easeOutCubic(progress);
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
                onComplete && onComplete();
                return;
            }
            reboundTimer = setTimeout(animate, 16);
        };
        animate();
    };

    const startMomentum = (onComplete) => {
        stopMomentum();
        if (Math.abs(panVelocityX) < momentumMinVelocity && Math.abs(panVelocityY) < momentumMinVelocity) {
            reboundToBounds(onComplete);
            return;
        }
        let velocityX = panVelocityX;
        let velocityY = panVelocityY;
        let lastTime = Date.now();
        const animate = () => {
            const now = Date.now();
            const dt = Math.min(24, Math.max(8, now - lastTime));
            lastTime = now;
            const decay = Math.pow(momentumDecayPerFrame, dt / 16);
            velocityX *= decay;
            velocityY *= decay;
            const nextTranslate = applyTranslateResistance(
                touchHandler.translateX + velocityX * dt,
                touchHandler.translateY + velocityY * dt,
            );
            touchHandler.translateX = nextTranslate.x;
            touchHandler.translateY = nextTranslate.y;
            updateBaseTransform();
            draw();
            emitMove();
            const clamped = clampTranslate(touchHandler.translateX, touchHandler.translateY);
            const outOfBounds =
                Math.abs(clamped.x - touchHandler.translateX) > reboundThreshold ||
                Math.abs(clamped.y - touchHandler.translateY) > reboundThreshold;
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

    const emitSeatSelection = (seat) => {
        emitSeatClick(seat);
        emitModelValue(toggleSeat(seat.row, seat.col));
    };

    const selectSeatByPoint = (x, y) => {
        console.log('[ste-select-seat] selectSeatByPoint called, x=' + x + ', y=' + y);
        const seat = getTouchSeat(x, y);
        console.log('[ste-select-seat] selectSeatByPoint: seat=' + JSON.stringify(seat));
        if (seat && !seat.disabled && !seat.empty) {
            emitSeatSelection(seat);
            console.log('[ste-select-seat] selectSeatByPoint: row=' + seat.row + ', col=' + seat.col);
            draw();
        } else {
            console.log('[ste-select-seat] selectSeatByPoint: seat is null, disabled, or empty');
        }
    };

    const selectSeatFromTouch = (touch) => {
        console.log('[ste-select-seat] selectSeatFromTouch called, touch.x=' + touch.x + ', touch.y=' + touch.y);
        uni.createSelectorQuery()
            .in(instance)
            .select(`#${canvasId}`)
            .boundingClientRect((rect) => {
                console.log('[ste-select-seat] boundingClientRect callback, rect=' + JSON.stringify(rect));
                if (!rect) return;
                const { x: localX, y: localY } = getTouchLocalPoint(touch, rect);
                console.log('[ste-select-seat] localX=' + localX + ', localY=' + localY);
                selectSeatByPoint(localX, localY);
            })
            .exec();
    };

    const selectSeatFromMouse = (event) => {
        const rect = event.target?.getBoundingClientRect?.();
        if (!rect) return;
        selectSeatByPoint(event.clientX - rect.left, event.clientY - rect.top);
    };

    const onTouchStart = (e) => {
        stopMotion();
        const touches = getEventTouches(e, 'start');
        const touchCount = touches.length;
        if (touchCount >= 2) {
            beginPinch(touches);
            return;
        }
        beginPan(touches[0], false);
    };

    const onTouchMove = (e) => {
        const touches = getEventTouches(e, 'move');
        const touchCount = touches.length;
        if (touchCount >= 2) {
            if (!pinchStartDistance) {
                beginPinch(touches);
            }
            const currentDistance = getTouchDistance(touches);
            const currentCenter = getTouchCenter(touches);
            if (pinchStartDistance > 0 && currentDistance > 0) {
                const nextScale = clampScale((currentDistance / pinchStartDistance) * pinchStartScale);
                touchHandler.scale = nextScale;
                const nextTranslateX = currentCenter.x / nextScale - pinchStartCenterX / pinchStartScale + pinchLockedTranslateX;
                const nextTranslateY = currentCenter.y / nextScale - pinchStartCenterY / pinchStartScale + pinchLockedTranslateY;
                applyTranslate(nextTranslateX, nextTranslateY, nextScale);
            }
            draw();
            emitMove();
            return;
        }
        if (gestureMode !== 'pan' || touchCount !== 1) return;
        const touch = touches[0];
        const currentX = getTouchX(touch);
        const currentY = getTouchY(touch);
        const dx = currentX - panStartX;
        const dy = currentY - panStartY;
        if (Math.abs(dx) > panThreshold || Math.abs(dy) > panThreshold) {
            dragMoved = true;
        }
        applyTranslate(panBaseTranslateX + dx, panBaseTranslateY + dy);
        recordPanVelocity(currentX, currentY);
        draw();
        emitMove();
    };

    const onTouchEnd = (e) => {
        const touches = getEventTouches(e, 'end');
        const changedTouches = getChangedTouches(e);
        const touchCount = touches.length;
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
            startMomentum(() => showRowLabelOverlay());
        } else if (touchCount === 0 || gestureMode === 'pinch') {
            reboundToBounds(() => {
                if (touchCount === 0) showRowLabelOverlay();
            });
        }
        if (!dragMoved && changedTouches.length === 1) {
            selectSeatFromTouch(changedTouches[0]);
        }
    };

    const onMouseDown = (e) => {
        stopMotion();
        mouseDown = true;
        dragMoved = false;
        mouseStartX = e.clientX;
        mouseStartY = e.clientY;
        resetPanVelocity();
        recordPanVelocity(mouseStartX, mouseStartY);
    };

    const onMouseMove = (e) => {
        if (!mouseDown) return;
        const dx = e.clientX - mouseStartX;
        const dy = e.clientY - mouseStartY;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
            dragMoved = true;
        }
        applyTranslate(touchHandler.baseTranslateX + dx, touchHandler.baseTranslateY + dy);
        recordPanVelocity(e.clientX, e.clientY);
        draw();
        emitMove();
    };

    const onMouseUp = (e) => {
        if (!mouseDown) return;
        mouseDown = false;
        updateBaseTransform();
        if (dragMoved) {
            startMomentum(() => showRowLabelOverlay());
        } else {
            reboundToBounds(() => showRowLabelOverlay());
        }
        if (!dragMoved) {
            selectSeatFromMouse(e);
        }
    };

    const reset = () => {
        stopMotion();
        showRowLabelOverlay();
        Object.keys(activeTouches).forEach(key => delete activeTouches[key]);
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
        rowLabelsVisible,
        setShowRowLabelsVisible: setRowLabelsVisible,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        reset,
    };
}