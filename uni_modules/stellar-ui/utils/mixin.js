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
		mounted() {
			this.parent = this[parentName]?.getParent();
			this.getParentData();
		},
		methods: {
			getParentData() {
				if (this.parent.children && this.parent.children.indexOf(this) === -1) {
					this.parent.children.push(this);
				}
			},
		},
	};
}
