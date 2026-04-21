import Vue from 'vue';

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

/**
 * 「配置继承型」父组件混入
 * 完全兼容 parentMixin，可直接替换使用
 *
 * 与 parentMixin 的区别：
 *   - 额外暴露 proxyProps（Vue.observable）让子组件精准追踪字段
 *   - 暴露 updateValue 方法用于子组件触发父组件 input 事件
 *
 * @param {String} name       provide / inject 使用的注入键名
 * @param {String[]} propKeys 需要透传给子组件的 prop 名称列表（可选，用于 proxyProps）
 */
export function configParentMixin(name, propKeys = []) {
	return {
		provide() {
			const self = this;

			// 创建浅层响应式代理对象，字段通过 getter 惰性映射父组件 prop
			// 子组件 computed 只依赖具体字段，不会因父组件无关数据变化而触发全量重算
			let proxyProps = null;
			if (propKeys && propKeys.length > 0) {
				proxyProps = Vue.observable(
					propKeys.reduce((acc, key) => {
						Object.defineProperty(acc, key, {
							get() {
								return self[key];
							},
							enumerable: true,
							configurable: true,
						});
						return acc;
					}, {})
				);
			}

			return {
				[name]: {
					// 兼容旧方法：子组件通过 getParent() 获取父实例
					getParent: () => self,
					// 新增：proxyProps 用于精准响应式
					proxyProps,
					// 新增：快捷方法，子组件可触发父组件的 input 事件
					updateValue: (...args) => self.$emit('input', ...args),
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
 * 「配置继承型」子组件混入
 * 完全兼容 childMixin，可直接替换使用
 *
 * 与 childMixin 的区别：
 *   - 提供 $parentProxyProps computed 读取父组件 proxyProps
 *   - 提供 getParentProp() 方法自动回退：自身 prop -> 父 proxyProps -> 默认值
 *   - 提供 updateParentValue() 快捷方法触发父组件 input
 *   - 不需要传入 methodNames，自动通过 getParent() 获取父实例
 *
 * @param {String} parentName inject 键名，与父组件 configParentMixin 的 name 保持一致
 * @param {String[]} methodNames 需要代理到 children 列表的子组件方法名（可选，保留兼容性）
 */
export function configChildMixin(parentName, methodNames = []) {
	return {
		options: {
			virtualHost: true,
		},
		inject: {
			[parentName]: {
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
		computed: {
			// 父组件的 proxyProps，子组件 computed 应优先通过此对象读取父组件配置
			$parentProxyProps() {
				return this[parentName]?.proxyProps || null;
			},
			// 是否存在父组件
			$hasParent() {
				return !!this[parentName];
			},
		},
		created() {
			if (this[parentName]?.getParent) {
				this.parent = this[parentName].getParent();
				this.setParentData();
			}
		},
		beforeDestroy() {
			// 兼容 childMixin 的清理逻辑
			if (this.parent && this.parent.children) {
				const ids = this.parent.children.map((item) => item._uid);
				const idx = ids.indexOf(this._uid);
				if (idx !== -1) {
					this.parent.children.splice(idx, 1);
				}
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
			/**
			 * 通用 prop 回退方法：优先使用子组件自身 prop，否则读 proxyProps，最后取默认值
			 * @param {String} key prop 名
			 * @param {*} defaultValue 默认值
			 */
			getParentProp(key, defaultValue) {
				const selfVal = this[key];
				if (selfVal != null) return selfVal;
				const parentVal = this.$parentProxyProps?.[key];
				if (parentVal != null) return parentVal;
				return defaultValue;
			},
			/**
			 * 触发父组件 input/change 事件（radio-group 等场景使用）
			 */
			updateParentValue(value) {
				if (this[parentName]?.updateValue) {
					this[parentName].updateValue(value);
				}
			},
		},
	};
}
