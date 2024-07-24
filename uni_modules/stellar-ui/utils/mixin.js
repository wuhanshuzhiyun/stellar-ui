/**
 * 父组件混入对象
 * @param {String} name 父组件名称
 */
export function parentMixin(name) {
	return {
		provide() {
			return {
				[name]: { getParent: () => this },
			};
		},
		data() {
			return {
				children: [],
			};
		},
	};
}

/**
 * 子组件混入对象
 * @param {String} parentName 父组件名称
 */
export function childMixin(parentName) {
	return {
		options: {
			virtualHost: true,
		},
		inject: [parentName],
		data() {
			return {
				parent: {},
			};
		},
		created() {
			this.parent = this[parentName]?.getParent();
			this.getParentData();
		},
		beforeDestroy() {
			// 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
			// 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
			if (this.parent && Array.isArray(this.parent.children)) {
				// 组件销毁时，移除父组件中的children数组中对应的实例
				this.parent.children.map((child, index) => {
					// 如果相等，则移除
					if (child === this) {
						this.parent.children.splice(index, 1);
					}
				});
			}
		},
		methods: {
			getParentData() {
				if (this.parent?.children && this.parent.children.indexOf(this) === -1) {
					this.parent.children.push(this);
				}
			},
		},
	};
}
