export default class TouchEvent {
	startX = null;
	startY = null;
	// 滑动的最小距离
	minDis = 50;
	timeout = null;

	constructor(minDis = 50) {
		this.minDis = minDis
	}

	// 滑动开始
	touchStart(e) {
		// #ifdef H5
		this.startX = e.pageX;
		this.startY = e.pageY;
		// #endif
		// #ifdef MP-WEIXIN | MP-ALIPAY
		this.startX = e.changedTouches[0].pageX;
		this.startY = e.changedTouches[0].pageY;
		// #endif
	}
	touchMove(e) {
		if (this.startX === null || this.startY === null) return null
		// #ifdef H5
		const moveX = e.pageX - this.startX;
		const moveY = e.pageY - this.startY;
		// #endif
		// #ifdef MP-WEIXIN | MP-ALIPAY
		const moveX = e.changedTouches[0].pageX - this.startX;
		const moveY = e.changedTouches[0].pageY - this.startY;
		// #endif
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
		// #ifdef H5
		const moveX = e.pageX - this.startX;
		const moveY = e.pageY - this.startY;
		// #endif
		// #ifdef MP-WEIXIN | MP-ALIPAY
		const moveX = e.changedTouches[0].pageX - this.startX;
		const moveY = e.changedTouches[0].pageY - this.startY;
		// #endif
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