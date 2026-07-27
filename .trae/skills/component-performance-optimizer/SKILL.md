---
name: 'component-performance-optimizer'
description: '优化UniApp/Vue2组件性能，分析渲染、内存和交互瓶颈，确保多端兼容。当用户要求优化组件性能或改善应用响应速度时调用。'
---

# 组件性能优化器

为 UniApp/Vue2 组件提供全面的性能优化指导，帮助识别和解决渲染、内存和交互瓶颈，确保代码兼容 H5、微信小程序、App 等多端。

## 调用时机

-   用户要求优化组件性能
-   用户报告渲染缓慢或交互卡顿
-   用户希望提升应用响应速度
-   组件发布到生产环境前
-   审查组件代码的性能问题时

## 核心优化领域

### 1. 渲染性能

**常见问题：**

-   计算属性或监听器导致过度重渲染
-   v-for key 使用不当
-   不必要的 DOM 更新

**优化清单：**

-   [ ] 使用唯一标识符作为 v-for key（避免 index）
-   [ ] 对重计算的计算属性进行记忆化
-   [ ] 频繁切换使用 `v-show` 替代 `v-if`
-   [ ] 长列表实现虚拟滚动
-   [ ] 避免模板中使用内联函数
-   [ ] 批量 DOM 更新使用 `$nextTick`
-   [ ] 模板表达式避免可选链，使用逻辑与判断

**示例 - v-for Key 优化：**

```vue
<!-- 不好 -->
<view v-for="(item, index) in list" :key="index">

<!-- 好 -->
<view v-for="item in list" :key="item.id">
```

**示例 - 模板表达式兼容写法：**

```vue
<!-- Vue2 不支持可选链，避免以下写法 -->
<!-- <view>{{ obj?.field }}</view> -->

<!-- 正确写法 -->
<view>{{ obj && obj.field ? obj.field : '默认值' }}</view>
```

### 2. 内存管理

**常见问题：**

-   未清理的事件监听器
-   未释放的定时器/间隔器
-   组件分离后的内存泄漏

**优化清单：**

-   [ ] 在 `beforeDestroy` 中清理事件监听器（Vue2 使用 beforeDestroy）
-   [ ] 组件销毁前清除定时器和间隔器
-   [ ] 避免无清理的全局事件监听
-   [ ] 在生命周期钩子中取消订阅

**示例 - 定时器清理：**

```javascript
/**
 * 组件生命周期中定时器的正确使用方式
 * 关键要点：
 * 1. 在 mounted 钩子中创建定时器
 * 2. 在 beforeDestroy 钩子中清理定时器（Vue2 使用 beforeDestroy）
 * 3. 清理后将引用置为 null，防止内存泄漏
 */
export default {
	data() {
		return {
			// 定时器引用，用于后续清理
			timer: null,
		};
	},
	mounted() {
		// 组件挂载后启动定时器，每隔 1 秒执行一次
		this.timer = setInterval(() => {
			// 业务逻辑：如轮询数据、更新状态等
			/* logic */
		}, 1000);
	},
	beforeDestroy() {
		// 组件销毁前必须清理定时器，防止内存泄漏
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null; // 将引用置空，释放内存
		}
	},
};
```

**示例 - 事件监听器清理：**

```javascript
/**
 * 全局事件监听器的正确使用方式（多端兼容）
 * 关键要点：
 * 1. 使用 UniApp 条件编译区分平台
 * 2. 在 mounted 中添加监听器
 * 3. 在 beforeDestroy 中移除监听器
 * 4. 监听器回调使用 methods 中定义的方法，便于移除
 */
export default {
	mounted() {
		// #ifdef H5
		// H5 端：监听窗口 resize 事件，用于响应式布局调整
		window.addEventListener('resize', this.handleResize);
		// #endif

		// #ifdef APP
		// App 端：可监听页面显示/隐藏等原生事件
		// #endif
	},
	beforeDestroy() {
		// #ifdef H5
		// 组件销毁前移除监听器，防止内存泄漏
		window.removeEventListener('resize', this.handleResize);
		// #endif
	},
	methods: {
		/**
		 * 处理窗口大小变化
		 * @description 当窗口大小改变时，重新计算组件尺寸或布局
		 */
		handleResize() {
			// 响应式布局逻辑：如重新计算容器宽度、调整元素位置等
			// handle resize
		},
	},
};
```

### 3. 交互性能

**常见问题：**

-   主线程阻塞导致动画卡顿
-   频繁重排/重绘
-   未优化的触摸/鼠标事件处理

**优化清单：**

-   [ ] 动画使用 `requestAnimationFrame`
-   [ ] 动画元素添加 `will-change: transform`
-   [ ] 节流 scroll/touchmove 事件（最小 100ms）
-   [ ] 防抖 input/search 事件（300-500ms）
-   [ ] 使用 CSS transform 替代 width/height 变化

**示例 - 节流处理（使用组件库 utils.thro）：**

组件库内部已提供 `utils.thro(fn, arg1, arg2, {delay: 500})` 节流函数，参数格式说明：

-   `fn`: 要节流的函数
-   `arg1, arg2, ...`: 传递给函数的参数
-   `{delay: 500}`: 配置对象，`delay` 为节流间隔时间（毫秒），默认为 500ms

```javascript
// 导入组件库工具函数
import utils from '../../utils/utils.js';

/**
 * 滚动事件节流处理示例
 * @description 使用组件库内置的 utils.thro 实现节流，
 *              避免滚动事件触发过于频繁导致性能问题
 */
export default {
	data() {
		return {};
	},
	methods: {
		/**
		 * 滚动事件入口函数
		 * @param {Object} e - 滚动事件对象
		 * @description 调用 utils.thro 进行节流，delay 设置为 100ms，
		 *              即每 100ms 最多执行一次 handleScroll
		 */
		onScroll(e) {
			// 使用组件库内置节流函数，delay 设为 100ms
			// 参数：回调函数、事件对象、配置选项
			utils.thro(this.handleScroll, e, { delay: 100 });
		},
		/**
		 * 实际处理滚动逻辑的函数
		 * @param {Object} e - 滚动事件对象
		 * @description 执行具体的滚动处理逻辑，如加载更多数据、更新滚动位置等
		 */
		handleScroll(e) {
			// 滚动处理逻辑：如加载更多数据、更新滚动位置等
			/* handle scroll */
		},
	},
};
```

**示例 - 防抖处理（使用组件库 utils.debounce）：**

组件库内部已提供 `utils.debounce(fn, arg1, arg2, {delay: 500})` 防抖函数，参数格式说明：

-   `fn`: 要防抖的函数
-   `arg1, arg2, ...`: 传递给函数的参数
-   `{delay: 500}`: 配置对象，`delay` 为防抖延迟时间（毫秒），默认为 500ms

```javascript
// 导入组件库工具函数
import utils from '../../utils/utils.js';

/**
 * 搜索输入防抖处理示例
 * @description 使用组件库内置的 utils.debounce 实现防抖，
 *              避免输入过程中频繁触发搜索请求
 */
export default {
	data() {
		return {};
	},
	methods: {
		/**
		 * 搜索输入事件入口函数
		 * @param {Object} e - 输入事件对象
		 * @description 调用 utils.debounce 进行防抖，delay 设置为 300ms，
		 *              即停止输入 300ms 后才执行 handleSearch
		 */
		onSearch(e) {
			// 使用组件库内置防抖函数，delay 设为 300ms
			// 参数：回调函数、事件对象、配置选项
			utils.debounce(this.handleSearch, e, { delay: 300 });
		},
		/**
		 * 实际执行搜索的函数
		 * @param {Object} e - 输入事件对象
		 * @description 执行具体的搜索逻辑，如发起 API 请求、过滤数据等
		 */
		handleSearch(e) {
			// 搜索处理逻辑：如发起 API 请求、过滤本地数据等
			/* handle search */
		},
	},
};
```

### 4. 数据处理

**常见问题：**

-   O(n²) 或更差的算法复杂度
-   冗余的数据转换
-   缺乏缓存/记忆化

**优化清单：**

-   [ ] 使用对象映射实现 O(1) 查找，替代 Array.find()（兼容旧版运行时）
-   [ ] 使用 watch + data 模式缓存计算结果（computed 中不应修改 data）
-   [ ] 批量数据更新
-   [ ] 大数据集使用懒加载
-   [ ] 实现分页/无限滚动

**示例 - 对象映射查找优化（兼容写法）：**

```javascript
/**
 * 数据查找性能优化对比
 * @description 通过构建对象映射将 O(n) 查找优化为 O(1) 查找
 *              适用于需要频繁查找的场景，如表格选中状态管理、树节点查找等
 */

// O(n) 查找 - 性能差
// 每次查找都需要遍历整个数组，数据量大时性能明显下降
var item = list.find(function (item) {
	return item.id === targetId;
});

// O(1) 查找 - 性能好
// 先构建对象映射，后续查找直接通过键访问，时间复杂度为 O(1)
var itemMap = {}; // 初始化对象映射
list.forEach(function (item) {
	// 将数组元素按 id 作为键存储到对象中
	itemMap[item.id] = item;
});
// 直接通过 id 访问，无需遍历数组
var item = itemMap[targetId];
```

**示例 - 深度比较优化（使用组件库 utils.deepEqual）：**

组件库内部已提供 `utils.deepEqual(obj1, obj2, ignoreKeys)` 深度比较函数，参数格式说明：

-   `obj1`: 第一个比较对象
-   `obj2`: 第二个比较对象
-   `ignoreKeys`: 可选参数，数组类型，指定需要忽略比较的键名

```javascript
// 导入组件库工具函数
import utils from '../../utils/utils.js';

/**
 * 深度比较两个对象是否相等
 * @description 使用组件库的 utils.deepEqual 进行深度比较，
 *              可以忽略指定的字段（如 rowIndex、key 等内部属性）
 * @example 比较两行数据是否相等，忽略 rowIndex 和 key 字段
 */
var isEqual = utils.deepEqual(row1, row2, ['rowIndex', 'key']);

/**
 * 在 watch 中使用 deepEqual 避免不必要的更新
 * @description 通过深度比较判断数据是否真正变化，
 *              只有数据确实变化时才执行更新逻辑，减少不必要的重渲染
 */
export default {
	watch: {
		// 监听 propsData 的变化
		propsData: {
			/**
			 * 属性变化处理器
			 * @param {Object} newVal - 新值
			 * @param {Object} oldVal - 旧值
			 * @description 使用 utils.deepEqual 比较新旧值，
			 *              只有真正变化时才调用 updateData
			 */
			handler(newVal, oldVal) {
				// 使用深度比较判断数据是否真正变化
				if (!utils.deepEqual(newVal, oldVal)) {
					// 数据真正变化时才更新，避免不必要的重渲染
					this.updateData(newVal);
				}
			},
			deep: true, // 启用深度监听
		},
	},
};
```

**示例 - 计算属性记忆化（Vue2 正确写法）：**

```javascript
/**
 * 计算属性记忆化模式（Vue2 正确写法）
 * @description 使用 watch + data 模式缓存计算结果，
 *              避免在 computed 中修改 data 导致无限重计算警告
 *              适用于需要复杂计算的场景，如数据格式化、树形结构转换等
 */
export default {
	data() {
		return {
			// 原始数据列表
			list: [],
			// 缓存处理后的数据，避免重复计算
			processedListCache: [],
		};
	},
	computed: {
		/**
		 * 处理后的数据列表（只读）
		 * @description computed 只负责读取缓存数据，不修改 data，
		 *              保持计算属性的纯净性
		 */
		processedList() {
			return this.processedListCache;
		},
	},
	watch: {
		/**
		 * 监听原始数据列表的变化
		 * @description 当 list 变化时，更新缓存的处理后数据
		 */
		list: {
			/**
			 * 数据变化处理器
			 * @description 调用 processListData 处理数据，
			 *              将结果存入缓存
			 */
			handler() {
				// 当 list 变化时，重新计算并更新缓存
				this.processedListCache = this.processListData();
			},
			deep: true, // 深度监听，检测数组/对象内部变化
			immediate: true, // 组件初始化时立即执行一次
		},
	},
	methods: {
		/**
		 * 处理原始数据
		 * @description 执行耗时的计算逻辑，如数据格式化、字段转换等
		 * @returns {Array} 处理后的数据数组
		 */
		processListData() {
			// 耗时计算：如数据格式化、复杂转换逻辑等
			return this.list.map(function (item) {
				return {
					id: item.id,
					name: item.name,
					// 复杂转换逻辑：如日期格式化、状态映射等
				};
			});
		},
	},
};
```

---

## StellarUI 组件特定优化

### ste-table

-   使用唯一行标识作为 key，避免 index
-   大数据集实现虚拟滚动
-   缓存 `deepEqual` 比较结果到 row 对象（使用组件库 `utils.deepEqual`）
-   移除 `$forceUpdate()`，使用细粒度状态更新
-   Vue2 响应式注意：使用 `this.$delete` 删除对象属性，使用 `this.$set` 添加属性

**优化示例：**

```javascript
/**
 * ste-table 优化 - 缓存选中状态查找（Vue2 响应式兼容）
 * @description 使用对象映射替代数组查找，将选中状态查询从 O(n) 优化为 O(1)
 *              同时确保 Vue2 响应式系统能正确检测状态变化
 */
import utils from '../../utils/utils.js';

export default {
	data() {
		return {
			/**
			 * 选中状态映射表
			 * @type {Object}
			 * @description 使用对象映射存储选中状态，key 为行索引，value 为布尔值
			 *              相比数组查找，对象查找的时间复杂度为 O(1)
			 */
			checkStatesMap: {}, // 使用对象映射替代数组查找，O(1) 查询
		};
	},
	methods: {
		/**
		 * 处理行选中事件
		 * @param {Object} row - 行数据对象
		 * @description 切换行的选中状态，使用 Vue2 响应式 API 更新状态映射表
		 */
		handleCheck(row) {
			// 获取当前行的索引
			var rowIndex = row.rowIndex;
			// 通过对象映射快速查询当前行的选中状态（O(1) 查询）
			var isChecked = !!this.checkStatesMap[rowIndex];

			if (isChecked) {
				// Vue2 必须使用 $delete 删除属性才能触发响应式更新
				// 直接使用 delete 操作符无法触发视图更新
				this.$delete(this.checkStatesMap, rowIndex);
			} else {
				// Vue2 必须使用 $set 添加新属性才能触发响应式更新
				// 直接赋值新属性无法触发视图更新
				this.$set(this.checkStatesMap, rowIndex, true);
			}

			// 将对象映射转换为数组格式，供外部使用（如提交表单）
			this.checkStates = Object.keys(this.checkStatesMap).map(function (k) {
				return parseInt(k, 10); // 将字符串 key 转换为数字
			});

			// 移除 $forceUpdate，直接更新相关状态（calcAllState 计算全选状态）
			this.calcAllState();
		},
	},
};
```

> **注意：** Vue2 的响应式系统无法检测 Set/Map 的变化，因此避免使用 Set/Map 存储需要响应式更新的数据，改用普通对象。

### ste-calendar

-   使用 watch + data 模式缓存日历数据，避免每次访问 computed 都重新生成
-   仅渲染可见月份，实现虚拟渲染
-   优化日期范围计算算法，避免逐天循环

**优化示例：**

```javascript
/**
 * ste-calendar 优化 - 记忆化计算（Vue2 正确写法）
 * @description 使用 watch + data 模式缓存日历数据，
 *              避免每次访问 computed 都重新生成日历数据
 *              适用于日历组件切换月份时的性能优化
 */
import utils from '../../utils/utils.js';

export default {
	data() {
		return {
			/**
			 * 缓存的日历数据
			 * @type {Array}
			 * @description 存储已计算的日历数据，避免重复计算
			 */
			cachedCalendarData: null,
			/**
			 * 缓存的视图日期键
			 * @type {String}
			 * @description 格式为 'YYYY-MM'，用于判断是否需要重新计算日历数据
			 */
			cachedViewDate: null,
			/**
			 * 当前视图日期
			 * @type {Object}
			 * @description 使用组件库的 dayjs 实例，提供日期格式化和计算功能
			 */
			viewDate: utils.dayjs(),
		};
	},
	computed: {
		/**
		 * 日历数据计算属性（只读）
		 * @description computed 只负责读取缓存数据，不修改 data，
		 *              保持计算属性的纯净性
		 */
		cmpDates() {
			return this.cachedCalendarData;
		},
	},
	watch: {
		/**
		 * 监听视图日期变化
		 * @description 当视图日期变化时，判断是否需要重新计算日历数据
		 */
		viewDate: {
			/**
			 * 日期变化处理器
			 * @description 生成日期键，判断是否与缓存的日期键相同，
			 *              只有不同时才重新计算日历数据
			 */
			handler() {
				// 生成日期键（格式：YYYY-MM），用于缓存判断
				var dateKey = this.viewDate.format('YYYY-MM');

				// 只有日期键变化时才重新计算日历数据
				if (this.cachedViewDate !== dateKey) {
					// 调用日历数据生成函数，传入相关参数
					this.cachedCalendarData = getCalendarData(
						this.minDate, // 最小日期
						this.maxDate, // 最大日期
						this.viewDate, // 当前视图日期
						this.monthCount, // 显示月份数量
						this.formatter, // 日期格式化器
						this.signs // 标记数据
					);
					// 更新缓存的日期键
					this.cachedViewDate = dateKey;
				}
			},
			deep: true, // 深度监听，检测日期对象内部变化
			immediate: true, // 组件初始化时立即执行一次
		},
	},
};
```

### ste-swiper / ste-touch-swipe

-   缓存容器尺寸，避免重复查询
-   滑动时使用 `utils.thro` 节流缩放计算
-   使用 GPU 加速 transform

### ste-select-seat (Canvas)

-   实现视口裁剪，只绘制可见区域
-   使用脏矩形渲染，只重绘变化部分
-   缓存频繁访问的状态

### ste-tree

-   使用 `utils.flattenTree` 构建扁平索引快速查找
-   深树实现懒加载
-   使用 watch + data 模式缓存树格式化结果

**优化示例 - 使用组件库 utils.flattenTree 构建索引：**

```javascript
/**
 * ste-tree 优化 - 使用组件库工具函数构建扁平索引
 * @description 使用 utils.flattenTree 将树形结构转换为扁平数组，
 *              并构建对象映射实现 O(1) 查找
 *              适用于树组件的节点查找、选中状态管理等场景
 */
import utils from '../../utils/utils.js';

export default {
	data() {
		return {
			/**
			 * 树形数据
			 * @type {Array}
			 * @description 原始的树形结构数据，包含 children 字段
			 */
			treeData: [],
			/**
			 * 节点索引映射表
			 * @type {Object}
			 * @description 使用对象映射存储节点，key 为节点 value，value 为节点对象
			 *              实现 O(1) 时间复杂度的节点查找
			 */
			nodeIndex: {}, // 扁平索引，O(1) 查找
		};
	},
	watch: {
		/**
		 * 监听树形数据变化
		 * @description 当树形数据变化时，重新构建扁平索引
		 */
		treeData: {
			/**
			 * 树形数据变化处理器
			 * @description 使用组件库的 flattenTree 将树形结构扁平化，
			 *              然后构建对象映射索引
			 */
			handler() {
				// 使用组件库 flattenTree 将树形结构转换为扁平数组
				// flattenTree 参数：树形数组、childrenKey（默认为 'children'）、filterFunc（过滤函数）
				var flatNodes = utils.flattenTree(this.treeData);

				// 构建对象映射索引
				var index = {};
				flatNodes.forEach(function (node) {
					// 将节点按 value 作为键存储到索引中
					index[node.value] = node;
				});

				// 更新索引映射表
				this.nodeIndex = index;
			},
			deep: true, // 深度监听，检测树形结构内部变化
			immediate: true, // 组件初始化时立即执行一次
		},
	},
	methods: {
		/**
		 * 根据 value 查找节点
		 * @param {String|Number} value - 节点的值
		 * @returns {Object|null} 找到的节点对象，未找到返回 null
		 * @description 通过对象映射实现 O(1) 时间复杂度的查找
		 */
		findNode(value) {
			// O(1) 查找：直接通过 value 访问索引映射表
			return this.nodeIndex[value];
		},
	},
};
```

---

## UniApp 专项优化

### 多端兼容注意事项

**条件编译：**

```javascript
// #ifdef H5
// H5 端特有代码
// #endif

// #ifdef MP-WEIXIN
// 微信小程序特有代码
// #endif

// #ifdef APP
// App 端特有代码
// #endif
```

**模板条件编译：**

```vue
<!-- #ifdef H5 -->
<view class="h5-only">H5 专用</view>
<!-- #endif -->

<!-- #ifdef MP-WEIXIN -->
<view class="mp-only">小程序专用</view>
<!-- #endif -->
```

**样式条件编译：**

```css
/* #ifdef H5 */
.h5-style {
	/* H5 样式 */
}
/* #endif */

/* #ifdef MP-WEIXIN */
.mp-style {
	/* 小程序样式 */
}
/* #endif */
```

### 性能优化清单

-   [ ] 使用 `scroll-view` 的 `scroll-with-animation`
-   [ ] 避免在热点路径中使用 `wx.createSelectorQuery`
-   [ ] 尽可能使用原生组件（picker、swiper 等）
-   [ ] 图片加载优化使用 `mode="aspectFit"`
-   [ ] 减少条件编译块，保持代码简洁
-   [ ] 使用 `show-menu-by-longpress` 替代自定义长按处理
-   [ ] 使用 `uni.createCanvasContext` 替代直接操作 DOM
-   [ ] 列表渲染使用 `scroll-view` + 分页，避免一次性渲染大量数据

### Vue2 语法规范

-   [ ] 使用 Options API（data、computed、methods、watch）
-   [ ] 模板表达式避免可选链 (`?.`) 和空值合并 (`??`)
-   [ ] 使用 `this.$set` 更新响应式对象属性
-   [ ] 使用 `this.$delete` 删除响应式对象属性
-   [ ] 使用 `this.$nextTick` 批量 DOM 更新
-   [ ] 监听数组变化使用 `watch` 的 `deep: true`
-   [ ] 避免在模板中使用箭头函数
-   [ ] 避免在模板中使用解构赋值
-   [ ] computed 中只读取数据，不修改 data（使用 watch + data 模式）
-   [ ] 避免使用 Set/Map 存储需要响应式更新的数据

**示例 - Vue2 响应式更新：**

```javascript
/**
 * Vue2 响应式更新示例
 * @description Vue2 的响应式系统基于 Object.defineProperty 实现，
 *              存在以下限制：
 *              1. 无法检测对象属性的添加和删除
 *              2. 无法检测数组索引直接赋值
 *              解决方案：使用 this.$set 添加属性，this.$delete 删除属性
 */
export default {
	data() {
		return {
			/**
			 * 表单数据对象
			 * @type {Object}
			 * @description 包含嵌套属性，需要使用 $set 更新
			 */
			form: {
				name: '',
				age: 0,
			},
			/**
			 * 列表数据
			 * @type {Array}
			 * @description Vue2 可以检测数组的 push/pop/shift/unshift/splice 等方法
			 *              但无法检测直接索引赋值
			 */
			list: [],
			/**
			 * 设置对象
			 * @type {Object}
			 * @description 动态添加/删除属性时需要使用 $set/$delete
			 */
			settings: {},
		};
	},
	methods: {
		/**
		 * 更新数据示例
		 * @description 演示 Vue2 中各种响应式更新的正确方式
		 */
		updateForm() {
			/**
			 * 使用 $set 更新嵌套属性
			 * @reason Vue2 无法检测对象已存在属性的修改（除了直接赋值），
			 *         但对于嵌套对象的深层属性，建议使用 $set 确保响应式
			 * @params {Object} object - 目标对象
			 * @params {String} key - 属性名
			 * @params {*} value - 属性值
			 */
			this.$set(this.form, 'name', '新名称');

			/**
			 * 数组操作：使用 push 方法
			 * @reason Vue2 重写了数组的 push/pop/shift/unshift/splice/sort/reverse 方法，
			 *         这些方法可以触发响应式更新
			 */
			this.list.push({ id: 1, name: 'item' });

			/**
			 * 数组操作：使用 $set 更新指定索引
			 * @reason Vue2 无法检测数组索引直接赋值（如 this.list[0] = ...），
			 *         必须使用 $set 或 splice 方法
			 */
			this.$set(this.list, 0, { id: 1, name: 'updated' });

			/**
			 * 使用 $set 添加新属性
			 * @reason Vue2 无法检测对象新属性的添加，
			 *         必须使用 $set 才能触发响应式更新
			 */
			this.$set(this.settings, 'theme', 'dark');

			/**
			 * 使用 $delete 删除属性
			 * @reason Vue2 无法检测对象属性的删除，
			 *         必须使用 $delete 才能触发响应式更新
			 */
			this.$delete(this.settings, 'theme');
		},
	},
};
```

---

## 文件大小控制

### 组件文件拆分策略

-   [ ] 单文件超过 500 行时应拆分，提取通用逻辑到 mixins
-   [ ] 渲染层拆分为子组件，降低主组件复杂度
-   [ ] 工具函数优先复用 `utils` 内部函数，减少重复代码
-   [ ] 条件编译代码块尽量精简，避免平台特定代码膨胀

### 重复代码提取

-   [ ] 将跨组件共用的逻辑提取到 `utils.js`
-   [ ] 使用 mixins 复用生命周期钩子和计算属性
-   [ ] 样式使用 SCSS mixins 和变量统一管理

**示例 - mixins 提取通用逻辑：**

```javascript
/**
 * 搜索逻辑 mixin
 * @description 提取通用的防抖搜索逻辑到 mixin，
 *              多个组件可以复用此逻辑，减少代码重复
 *              使用组件库的 utils.debounce 实现防抖
 */
var searchMixin = {
	data() {
		return {
			/**
			 * 搜索关键词
			 * @type {String}
			 * @description 用户输入的搜索内容
			 */
			searchKeyword: '',
		};
	},
	methods: {
		/**
		 * 搜索输入事件处理
		 * @param {Object} e - 输入事件对象
		 * @description 获取用户输入的关键词，调用防抖函数处理搜索
		 */
		onSearchInput(e) {
			// 更新搜索关键词
			this.searchKeyword = e.detail.value;
			// 使用组件库的防抖函数，延迟 300ms 执行搜索
			this.$utils.debounce(this.handleSearch, this.searchKeyword, { delay: 300 });
		},
		/**
		 * 执行搜索（由具体组件实现）
		 * @param {String} keyword - 搜索关键词
		 * @description 抽象方法，由使用此 mixin 的组件实现具体搜索逻辑
		 */
		handleSearch(keyword) {
			// 搜索逻辑：由具体组件实现
		},
	},
};

export default searchMixin;
```

**使用方式：**

```javascript
/**
 * 商品列表组件（使用 searchMixin）
 * @description 通过 mixins 数组引入 searchMixin，复用搜索逻辑
 */
import searchMixin from '../mixins/searchMixin.js';

export default {
	// 引入搜索 mixin
	mixins: [searchMixin],
	data() {
		return {
			// 组件特有数据
			goodsList: [], // 商品列表数据
		};
	},
	methods: {
		/**
		 * 实现具体的搜索逻辑
		 * @param {String} keyword - 搜索关键词
		 * @description 根据关键词搜索商品，更新商品列表
		 */
		handleSearch(keyword) {
			// 具体搜索逻辑：如发起 API 请求、过滤本地数据等
			this.goodsList = this.filterGoods(keyword);
		},
		/**
		 * 过滤商品数据
		 * @param {String} keyword - 搜索关键词
		 * @returns {Array} 过滤后的商品列表
		 */
		filterGoods(keyword) {
			// 过滤逻辑
			return [];
		},
	},
};
```

---

## 测试验证流程

### 强制要求

每次优化后必须执行以下验证步骤：

1. **运行完整测试套件：**

    ```bash
    npm run test:build
    ```

2. **确认目标组件测试通过：**

    - 目标组件对应的 test 文件必须全部通过
    - 禁止跳过或注释掉失败用例
    - 若测试失败，必须修复代码而非修改测试

3. **验证多端兼容性：**
    - H5 端构建测试：`npm run build:h5`
    - 微信小程序构建测试：`npm run build:mp-weixin`
    - App 端构建测试：`npm run build:app`

### 测试用例编写规范

-   [ ] 测试用例必须覆盖核心功能
-   [ ] 使用 `@vue/test-utils` 的 `mount` 方法挂载组件
-   [ ] 使用 `nextTick` 等待异步更新
-   [ ] 测试断言使用 `expect().toBe()` 或 `expect().toEqual()`

**示例 - 标准测试用例结构：**

```javascript
/**
 * ste-button 组件测试用例
 * @description 测试 ste-button 组件的核心功能，包括属性设置、样式验证等
 * @dependencies @vue/test-utils: Vue 组件测试工具库
 * @dependencies vue: Vue 框架核心库
 * @dependencies ste-button: 组件库的按钮组件
 */

// 导入测试工具
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
// 导入要测试的组件（使用组件库内部组件）
import steButton from '../../uni_modules/stellar-ui/components/ste-button/ste-button.vue';

/**
 * 测试套件：Test Button
 * @description 包含 ste-button 组件的所有测试用例
 */
describe('Test Button', () => {
	/**
	 * 测试用例：mode 属性
	 * @description 测试按钮的 mode 属性是否正确影响按钮样式
	 * @async 异步测试，需要等待 DOM 更新
	 */
	test('mode', async () => {
		// 挂载组件（无 props，使用默认值）
		const wrapper = mount(steButton);

		// 获取按钮根元素
		let rootEl = wrapper.get('.ste-button--root');

		// 断言：默认 mode 为 200，应包含对应的样式类
		expect(rootEl.classes()).toContain('ste-button--mode-200');

		// 设置 props：将 mode 改为 100
		await wrapper.setProps({ mode: 100 });

		// 重新获取根元素（确保引用最新）
		rootEl = wrapper.get('.ste-button--root');

		// 断言：修改后的 mode 为 100，应包含对应的样式类
		expect(rootEl.classes()).toContain('ste-button--mode-100');
	});
});
```

**示例 - 使用组件库内部组件（优先使用组件库组件）：**

```vue
<template>
	<view class="container">
		<!-- 优先使用组件库的 ste-button 组件，而非原生按钮 -->
		<!-- ste-button 已内置样式优化、点击反馈、加载状态等功能 -->
		<ste-button :loading="loading" :disabled="disabled" @click="handleSubmit">提交</ste-button>

		<!-- 优先使用组件库的 ste-loading 组件，而非自定义 loading -->
		<!-- ste-loading 已内置动画优化、多端兼容等功能 -->
		<ste-loading v-if="loading" />

		<!-- 优先使用组件库的 ste-toast 组件，而非 uni.showToast -->
		<!-- ste-toast 已内置样式统一、动画效果等功能 -->
		<ste-toast :show="showToast" :message="toastMessage" />
	</view>
</template>

<script>
/**
 * 示例组件：展示优先使用组件库内部组件
 * @description 在性能优化场景中，优先使用组件库提供的组件，
 *              这些组件已经过性能优化和多端兼容处理，
 *              避免重复造轮子，减少代码体积，提高开发效率
 */

// 导入组件库的组件
import steButton from '../../uni_modules/stellar-ui/components/ste-button/ste-button.vue';
import steLoading from '../../uni_modules/stellar-ui/components/ste-loading/ste-loading.vue';
import steToast from '../../uni_modules/stellar-ui/components/ste-toast/ste-toast.vue';

export default {
	// 注册组件库组件
	components: {
		steButton,
		steLoading,
		steToast,
	},
	data() {
		return {
			loading: false, // 加载状态
			disabled: false, // 禁用状态
			showToast: false, // 提示显示状态
			toastMessage: '', // 提示消息
		};
	},
	methods: {
		/**
		 * 处理提交事件
		 * @description 使用防抖处理提交，避免重复提交
		 *              调用组件库的 utils.debounce 实现防抖
		 */
		handleSubmit: utils.debounce(function () {
			// 设置加载状态
			this.loading = true;

			// 模拟 API 请求
			setTimeout(() => {
				this.loading = false;
				this.showToast = true;
				this.toastMessage = '提交成功';

				// 3 秒后隐藏提示
				setTimeout(() => {
					this.showToast = false;
				}, 3000);
			}, 1000);
		}, 500), // 防抖延迟 500ms
	},
};
</script>
```

---

## 性能测试清单

-   [ ] 测量首屏绘制时间
-   [ ] 检查动画卡顿（目标 < 16ms/帧）
-   [ ] 测试长时间内存使用
-   [ ] 验证 60fps 滚动性能
-   [ ] 检查包体积和懒加载
-   [ ] 监控网络请求和缓存
-   [ ] 在各端（H5、小程序、App）验证兼容性

## 优化数据报告

### 性能指标定义

| 指标             | 定义                           | 测量方式                           |
| ---------------- | ------------------------------ | ---------------------------------- |
| **首屏渲染时间** | 从页面加载到内容完全渲染的时间 | `performance.timing` / 开发者工具  |
| **FPS**          | 每秒帧数                       | Chrome DevTools Performance        |
| **内存占用**     | 组件运行时内存使用量           | Chrome DevTools Memory             |
| **重渲染次数**   | 组件响应式更新导致的渲染次数   | Vue DevTools Performance           |
| **函数执行时间** | 关键函数的平均执行时间         | `console.time()` / performance API |
| **包体积**       | 组件编译后文件大小             | `ls -lh` / webpack-bundle-analyzer |

### 优化前后对比数据模板

> **注意：** 以下为报告模板，实际使用时请替换为真实测量数据，严禁虚构数值。

```markdown
## 优化数据报告

### 1. 性能指标对比

| 指标             | 优化前     | 优化后     | 提升幅度   |
| ---------------- | ---------- | ---------- | ---------- |
| 首屏渲染时间     | `<测量值>` | `<测量值>` | `<计算值>` |
| 平均 FPS         | `<测量值>` | `<测量值>` | `<计算值>` |
| 内存占用         | `<测量值>` | `<测量值>` | `<计算值>` |
| 重渲染次数/分钟  | `<测量值>` | `<测量值>` | `<计算值>` |
| 关键函数执行时间 | `<测量值>` | `<测量值>` | `<计算值>` |
| 组件包体积       | `<测量值>` | `<测量值>` | `<计算值>` |

### 2. 优化内容明细

| 优化项               | 优化类型 | 影响指标                 | 预期收益              |
| -------------------- | -------- | ------------------------ | --------------------- |
| v-for key 优化       | 渲染性能 | 首屏渲染时间、重渲染次数 | 减少不必要的 DOM 更新 |
| 对象映射替代数组查找 | 数据处理 | 关键函数执行时间         | O(n) → O(1)           |
| 节流/防抖事件处理    | 交互性能 | FPS、内存占用            | 减少事件触发频率      |
| 计算属性记忆化       | 渲染性能 | 重渲染次数、函数执行时间 | 避免重复计算          |
| 定时器/监听器清理    | 内存管理 | 内存占用                 | 防止内存泄漏          |
| 文件拆分与逻辑复用   | 包体积   | 包体积                   | 减少重复代码          |

### 3. 优化效果说明

**渲染性能提升：**

-   通过 `v-for` key 优化，列表更新时 DOM 复用率从 `<优化前>` 提升到 `<优化后>`
-   计算属性记忆化后，相同数据访问的计算耗时减少 `<百分比>`

**交互性能提升：**

-   滚动事件节流后，主线程阻塞时间从 `<优化前>` 降低到 `<优化后>`
-   搜索防抖后，API 请求次数减少 `<百分比>`

**内存优化效果：**

-   定时器清理后，组件销毁时内存释放率从 `<优化前>` 提升到 `<优化后>`
-   事件监听器及时移除，避免长期内存占用

### 4. 验证结果

-   ✅ 目标组件测试用例全部通过
-   ✅ H5 端构建成功
-   ✅ 微信小程序构建成功
-   ✅ App 端构建成功
-   ✅ 各端功能验证通过

> **备注：** 项目存在 4 个历史遗留测试失败（steps、video 组件），与本次优化无关。

### 5. 未来优化方向

-   [ ] 实现虚拟滚动，支持 1000+ 条数据渲染
-   [ ] 组件按需加载，进一步减小包体积
-   [ ] Web Worker 处理复杂计算逻辑
-   [ ] 缓存策略优化，减少重复网络请求
```

### 关键优化项预期收益

| 优化项                      | 预期性能提升            | 实现难度 | 优先级 |
| --------------------------- | ----------------------- | -------- | ------ |
| 使用唯一 key 作为 v-for key | 渲染速度提升 30-50%     | 低       | 高     |
| 对象映射替代数组查找        | 查找速度提升 90%+       | 低       | 高     |
| 节流滚动事件                | FPS 提升 30-50%         | 低       | 高     |
| 防抖搜索事件                | API 请求减少 60-80%     | 低       | 高     |
| 计算属性记忆化              | 计算耗时减少 70-90%     | 中       | 中     |
| 定时器清理                  | 内存占用减少 20-40%     | 低       | 中     |
| 组件拆分                    | 包体积减少 10-30%       | 中       | 中     |
| 虚拟滚动                    | 大数据渲染性能提升 10x+ | 高       | 低     |

---

## 输出格式

完成优化任务时提供：

1. **发现的问题汇总** - 列出所有性能问题及严重程度
2. **修改内容的前后对比** - 代码片段对比
3. **优化数据报告** - 性能指标对比表
4. **多端兼容性验证结果** - 各端构建和功能验证状态
5. **未来优化建议** - 后续可优化方向
