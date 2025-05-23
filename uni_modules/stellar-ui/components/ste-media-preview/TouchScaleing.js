export default class TouchScaleing {
	identifiers = [];

	startParam = {
		id1: null,
		x1: null,
		y1: null,
		id2: null,
		x2: null,
		y2: null,
	};

	scale = 1;

	rotate = 0;

	translateX = 0;
	translateY = 0;

	_setData(changedTouches) {
		changedTouches.forEach((newData) => {
			const data = this.identifiers.find((item) => item.identifier === newData.identifier);
			if (data) {
				Object.assign(data, newData);
			} else {
				this.identifiers.push(newData);
				if (this.identifiers.length > 2) {
					this.identifiers.shift();
					this.startParam.id1 = this.startParam.id2;
					this.startParam.x1 = this.startParam.x2;
					this.startParam.y1 = this.startParam.y2;
					this.startParam.id2 = newData.identifier;
					this.startParam.x2 = newData.pageX;
					this.startParam.y2 = newData.pageY;
				}
			}
		});
	}

	_getTouchPosition() {
		const [m1, m2] = this.identifiers;
		const x1 = m1?.pageX || null;
		const y1 = m1?.pageY || null;
		const x2 = m2?.pageX || null;
		const y2 = m2?.pageY || null;
		const id1 = m1?.identifier || null;
		const id2 = m2?.identifier || null;
		return [x1, y1, x2, y2, id1, id2];
	}
	touchStart(changedTouches) {
		this._setData(changedTouches);

		const [x1, y1, x2, y2, id1, id2] = this._getTouchPosition();
		if (x1 !== null && y1 !== null) {
			this.startParam.x1 = x1;
			this.startParam.y1 = y1;
			this.startParam.id1 = id1;
		}
		if (x2 !== null && y2 !== null) {
			this.startParam.x2 = x2;
			this.startParam.y2 = y2;
			this.startParam.id2 = id2;
		}
		return [x1, y1, x2, y2];
	}
	touchMove(changedTouches) {
		if (changedTouches.length < 2) return false;
		this._setData(changedTouches);

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
		return !this.identifiers.length;
	}
}
