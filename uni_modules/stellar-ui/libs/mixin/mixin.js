module.exports = {
	// 定义每个组件都可能需要用到的外部样式以及类名
	computed: {
		/**
		 * 生成bem规则类名
		 * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
		 * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
		 * @param {String} name 组件名称
		 * @param {Array} fixed 一直会存在的类名
		 * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
		 * @returns {Array|string}
		 */
		bem() {
			return function(name, fixed, change) {
				console.log('类型 类名')
				// 类名前缀
				const prefix = `ste-${name}--`
				const classes = {}
				classes['ste-' + name] = true;
				if (fixed) {
					fixed.map((item) => {
						// 这里的类名，会一直存在
						classes[prefix + this[item]] = true
					})
				}
				if (change) {
					change.map((item) => {
						// 这里的类名，会根据this[item]的值为true或者false，而进行添加或者移除某一个类
						this[item] ? (classes[prefix + item] = this[item]) : (delete classes[prefix +
							item])
					})
				}

				return Object.keys(classes)
					// 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
					// #ifdef MP-ALIPAY || MP-TOUTIAO || MP-LARK
					.join(' ')
				// #endif
			}
		}
	},
	methods: {
		// 阻止事件冒泡
		preventEvent(e) {
			e && typeof(e.stopPropagation) === 'function' && e.stopPropagation()
		},
		// 空操作
		noop(e) {
			this.preventEvent(e)
		}
	},
}