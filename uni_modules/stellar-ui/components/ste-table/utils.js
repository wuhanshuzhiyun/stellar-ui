function getStyleOrClass(fun, params, isStyle = true) {
	if (isStyle) {
		if (typeof fun === 'function') {
			return fun.call(null, params);
		}
	} else {
		if (typeof fun === 'string') {
			return fun;
		} else if (typeof fun === 'function') {
			return fun.call(null, params)
		}
	}

}

export {
	getStyleOrClass
}