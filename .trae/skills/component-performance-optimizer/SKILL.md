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
export default {
	data() {
		return { timer: null };
	},
	mounted() {
		this.timer = setInterval(() => {
			/* logic */
		}, 1000);
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	},
};
```

**示例 - 事件监听器清理：**

```javascript
export default {
	mounted() {
		// #ifdef H5
		window.addEventListener('resize', this.handleResize);
		// #endif
	},
	beforeDestroy() {
		// #ifdef H5
		window.removeEventListener('resize', this.handleResize);
		// #endif
	},
	methods: {
		handleResize() {
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

组件库内部已提供 `utils.thro` 节流函数，参数格式为 `utils.thro(fn, arg1, arg2, {delay: 500})`，最后一个参数为配置对象，`delay` 默认为 500ms。

```javascript
import utils from '../../utils/utils.js';

export default {
	data() {
		return {};
	},
	methods: {
		onScroll(e) {
			// 使用组件库内置节流函数，delay 设为 100ms
			utils.thro(this.handleScroll, e, { delay: 100 });
		},
		handleScroll(e) {
			/* handle scroll */
		},
	},
};
```

**示例 - 防抖处理（使用组件库 utils.debounce）：**

组件库内部已提供 `utils.debounce` 防抖函数，参数格式为 `utils.debounce(fn, arg1, arg2, {delay: 500})`，最后一个参数为配置对象，`delay` 默认为 500ms。

```javascript
import utils from '../../utils/utils.js';

export default {
	data() {
		return {};
	},
	methods: {
		onSearch(e) {
			// 使用组件库内置防抖函数，delay 设为 300ms
			utils.debounce(this.handleSearch, e, { delay: 300 });
		},
		handleSearch(e) {
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
// O(n) 查找 - 性能差
var item = list.find(function (item) {
	return item.id === targetId;
});

// O(1) 查找 - 性能好
var itemMap = {};
list.forEach(function (item) {
	itemMap[item.id] = item;
});
var item = itemMap[targetId];
```

**示例 - 深度比较优化（使用组件库 utils.deepEqual）：**

组件库内部已提供 `utils.deepEqual(obj1, obj2, ignoreKeys)` 深度比较函数，第三个参数可指定忽略比较的 key。

```javascript
import utils from '../../utils/utils.js';

// 比较两个对象是否相等，忽略 rowIndex 和 key 字段
var isEqual = utils.deepEqual(row1, row2, ['rowIndex', 'key']);

// 示例：在 watch 中使用 deepEqual 避免不必要的更新
export default {
	watch: {
		propsData: {
			handler(newVal, oldVal) {
				if (!utils.deepEqual(newVal, oldVal)) {
					// 数据真正变化时才更新
					this.updateData(newVal);
				}
			},
			deep: true,
		},
	},
};
```

**示例 - 计算属性记忆化（Vue2 正确写法）：**

```javascript
// 使用 watch + data 模式，避免在 computed 中修改 data
export default {
	data() {
		return {
			list: [],
			processedListCache: [],
		};
	},
	computed: {
		// computed 只负责读取，不修改 data
		processedList() {
			return this.processedListCache;
		},
	},
	watch: {
		// 监听依赖变化，在 watch 中更新缓存
		list: {
			handler() {
				this.processedListCache = this.processListData();
			},
			deep: true,
			immediate: true,
		},
	},
	methods: {
		processListData() {
			// 耗时计算
			return this.list.map(function (item) {
				return {
					id: item.id,
					name: item.name,
					// 复杂转换逻辑
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
// ste-table 优化 - 缓存选中状态查找（Vue2 响应式兼容）
import utils from '../../utils/utils.js';

export default {
	data() {
		return {
			checkStatesMap: {}, // 使用对象映射替代数组查找，O(1) 查询
		};
	},
	methods: {
		handleCheck(row) {
			var rowIndex = row.rowIndex;
			var isChecked = !!this.checkStatesMap[rowIndex];
			if (isChecked) {
				// Vue2 必须使用 $delete 删除属性才能触发响应式更新
				this.$delete(this.checkStatesMap, rowIndex);
			} else {
				// Vue2 必须使用 $set 添加新属性才能触发响应式更新
				this.$set(this.checkStatesMap, rowIndex, true);
			}
			// 转换为数组供外部使用
			this.checkStates = Object.keys(this.checkStatesMap).map(function (k) {
				return parseInt(k, 10);
			});
			// 移除 $forceUpdate，直接更新相关状态
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
// ste-calendar 优化 - 记忆化计算（Vue2 正确写法）
import utils from '../../utils/utils.js';

export default {
	data() {
		return {
			cachedCalendarData: null,
			cachedViewDate: null,
			viewDate: utils.dayjs(),
		};
	},
	computed: {
		// computed 只读取，不修改 data
		cmpDates() {
			return this.cachedCalendarData;
		},
	},
	watch: {
		// 在 watch 中更新缓存
		viewDate: {
			handler() {
				var dateKey = this.viewDate.format('YYYY-MM');
				if (this.cachedViewDate !== dateKey) {
					this.cachedCalendarData = getCalendarData(this.minDate, this.maxDate, this.viewDate, this.monthCount, this.formatter, this.signs);
					this.cachedViewDate = dateKey;
				}
			},
			deep: true,
			immediate: true,
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
import utils from '../../utils/utils.js';

export default {
	data() {
		return {
			treeData: [],
			nodeIndex: {}, // 扁平索引，O(1) 查找
		};
	},
	watch: {
		treeData: {
			handler() {
				// 使用组件库 flattenTree 构建扁平索引
				var flatNodes = utils.flattenTree(this.treeData);
				var index = {};
				flatNodes.forEach(function (node) {
					index[node.value] = node;
				});
				this.nodeIndex = index;
			},
			deep: true,
			immediate: true,
		},
	},
	methods: {
		findNode(value) {
			// O(1) 查找
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
export default {
	data() {
		return {
			form: {
				name: '',
				age: 0,
			},
			list: [],
			settings: {},
		};
	},
	methods: {
		updateForm() {
			// 正确：使用 $set 更新嵌套属性
			this.$set(this.form, 'name', '新名称');

			// 正确：数组操作
			this.list.push({ id: 1, name: 'item' });
			// 或
			this.$set(this.list, 0, { id: 1, name: 'updated' });

			// 正确：使用 $set 添加新属性
			this.$set(this.settings, 'theme', 'dark');

			// 正确：使用 $delete 删除属性
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
// 提取通用的防抖搜索逻辑到 mixins
var searchMixin = {
	data() {
		return {
			searchKeyword: '',
		};
	},
	methods: {
		onSearchInput(e) {
			this.searchKeyword = e.detail.value;
			this.$utils.debounce(this.handleSearch, this.searchKeyword, { delay: 300 });
		},
		handleSearch(keyword) {
			// 搜索逻辑
		},
	},
};

export default searchMixin;
```

**使用方式：**

```javascript
import searchMixin from '../mixins/searchMixin.js';

export default {
	mixins: [searchMixin],
	data() {
		return {
			// 组件特有数据
		};
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
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steButton from '../../uni_modules/stellar-ui/components/ste-button/ste-button.vue';

describe('Test Button', () => {
	test('mode', async () => {
		const wrapper = mount(steButton);
		let rootEl = wrapper.get('.ste-button--root');
		expect(rootEl.classes()).toContain('ste-button--mode-200');

		await wrapper.setProps({ mode: 100 });
		rootEl = wrapper.get('.ste-button--root');
		expect(rootEl.classes()).toContain('ste-button--mode-100');
	});
});
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

## 输出格式

完成优化任务时提供：

1. 发现的问题汇总
2. 修改内容的前后对比
3. 预期性能提升
4. 多端兼容性验证结果
5. 未来优化建议
