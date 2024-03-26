export default class TouchEvent {
	startX = null;
	startY = null;
	// 滑动的最小距离
	minDis = 50;
	timeout = null;

	constructor(minDis = 50) {
		this.minDis = minDis
	}

	_getInfo(e) {
		return e.changedTouches?.length ? e.changedTouches[0] : e
	}

	// 滑动开始
	touchStart(e) {
		const {
			pageX,
			pageY
		} = this._getInfo(e);
		this.startX = pageX;
		this.startY = pageY;
	}
	touchMove(e) {
		if (this.startX === null || this.startY === null) return null
		const {
			pageX,
			pageY
		} = this._getInfo(e);
		const moveX = pageX - this.startX;
		const moveY = pageY - this.startY;

		return {
			moveX,
			moveY
		}
	}
	// 滑动结束
	touchEnd(e) {
		if (this.startX === null || this.startY === null) {
			return {
				direction: null,
				moveX: 0,
				moveY: 0
			}
		}
		const {
			pageX,
			pageY
		} = this._getInfo(e);
		const moveX = pageX - this.startX;
		const moveY = pageY - this.startY;

		let direction = null
		if (Math.abs(moveX) > Math.abs(moveY) && Math.abs(moveX) > this.minDis) {
			if (moveX > 0) {
				direction = "right"
			} else {
				direction = "left"
			}
		}
		if (Math.abs(moveY) > Math.abs(moveX) && Math.abs(moveY) > this.minDis) {
			if (moveY > 0) {
				direction = "down"
			} else {
				direction = "up"
			}
		}
		this.startX = null;
		this.startY = null;
		return {
			direction,
			moveX,
			moveY
		}
	}
}