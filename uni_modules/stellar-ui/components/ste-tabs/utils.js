export function getChildrenProps(component, chilName) {
	let propsList = [];
	// #ifdef MP-WEIXIN | MP-ALIPAY
	const children = component.$children?.filter((tab) => tab.$options.name === chilName) || [];
	children.forEach((tab) =>
		propsList.push({
			...tab.$props,
		})
	);
	// #endif
	// #ifdef H5
	const children = component.$slots.default || [];
	children.forEach((tab) =>
		propsList.push({
			...tab.componentOptions.propsData,
		})
	);
	// #endif
	return propsList
}