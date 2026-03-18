/**
 * 父组件混入对象
 * @param {String} name 父组件名称
 */
export function parentMixin(name) {
	return {
		provide() {
			return {
				[name]: {
					getParent: () => this,
				},
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
export function childMixin(parentName, methodNames = []) {
	return {
		options: {
			virtualHost: true,
		},
		inject: {
			[parentName]: {
				value: parentName,
				default: null,
			},
		},
		data() {
			return {
				parent: {
					children: [],
				},
			};
		},
		created() {
			if (this[parentName] && this[parentName]?.getParent) {
				this.parent = this[parentName].getParent();
				this.setParentData();
			}
		},
		beforeDestroy() {
			// 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
			// 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
			const ids = this.parent.children.map((item) => item._uid);
			if (ids.indexOf(this._uid) !== -1) {
				this.parent.children.splice(ids.indexOf(this._uid), 1);
			}
		},
		methods: {
			setParentData() {
				const child = Object.assign({ _uid: this._uid }, this.$props);
				methodNames.forEach((name) => {
					child[name] = (...a) => {
						if (this[name]) {
							return this[name](...a);
						}
					};
				});
				const ids = this.parent.children.map((item) => item._uid);
				if (ids.indexOf(child._uid) === -1) {
					this.parent.children.push(child);
				}
			},
		},
	};
}
