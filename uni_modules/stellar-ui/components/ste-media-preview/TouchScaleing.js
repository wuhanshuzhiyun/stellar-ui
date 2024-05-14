export default class TouchScaleing {
	identifiers = [];

	startParam = {
		x1: null,
		y1: null,
		x2: null,
		y2: null,
	};

	scale = 1;

	rotate = 0;

	translateX = 0;
	translateY = 0;

	_getTouchPosition() {
		const [m1, m2] = this.identifiers;
		const x1 = m1?.pageX || null;
		const y1 = m1?.pageY || null;
		const x2 = m2?.pageX || null;
		const y2 = m2?.pageY || null;
		return [x1, y1, x2, y2];
	}
	touchStart(changedTouches) {
		if (this.identifiers.length < 2) {
			changedTouches.forEach((item) => {
				if (this.identifiers.findIndex((m) => m.identifier === item.identifier) === -1) this.identifiers.push(item);
			});
		}

		const [x1, y1, x2, y2] = this._getTouchPosition();
		if (x1 !== null && y1 !== null) {
			this.startParam.x1 = x1;
			this.startParam.y1 = y1;
		}
		if (x2 !== null && y2 !== null) {
			this.startParam.x2 = x2;
			this.startParam.y2 = y2;
		}
	}
	touchMove(changedTouches) {
		if (this.identifiers.length < 2) return false;
		this.identifiers.forEach((item) => {
			const newData = changedTouches.find((item2) => item2.identifier === item.identifier);
			if (newData) Object.assign(item, newData);
		});
		const param = this.startParam;
		const [startX1, startY1, startX2, startY2] = [param.x1, param.y1, param.x2, param.y2];
		const [x1, y1, x2, y2] = this._getTouchPosition();

		this.scale =
			Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) /
			Math.sqrt(Math.pow(startX2 - startX1, 2) + Math.pow(startY2 - startY1, 2));
		this.rotate =
			(Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI -
			(Math.atan2(startY2 - startY1, startX2 - startX1) * 180) / Math.PI;
		this.translateX = (x1 + x2) / 2 - (startX1 + startX2) / 2;
		this.translateY = (y1 + y2) / 2 - (startY1 + startY2) / 2;
		return true;
	}
	touchEnd(changedTouches) {
		changedTouches.forEach((item) => {
			const index = this.identifiers.findIndex((m) => m.identifier === item.identifier);
			if (index !== -1) {
				this.identifiers.splice(index, 1);
			}
		});
		const [x1, y1, x2, y2] = this._getTouchPosition();
		if (x1 !== null && y1 !== null) {
			this.startParam.x1 = null;
			this.startParam.y1 = null;
		}
		if (x2 !== null && y2 !== null) {
			this.startParam.x2 = null;
			this.startParam.y2 = null;
		}
		return !this.identifiers.lenth;
	}
}
