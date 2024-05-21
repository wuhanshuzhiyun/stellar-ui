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
		mounted() {},
		methods: {},
	};
}

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
