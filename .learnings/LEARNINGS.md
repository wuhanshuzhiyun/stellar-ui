# Learnings

Corrections, insights, and knowledge gaps captured during development.

**Categories**: correction | insight | knowledge_gap | best_practice

---

## [LRN-20260730-001] correction

**Logged**: 2026-07-30T18:00:00+08:00
**Priority**: critical
**Status**: pending
**Area**: frontend

### Summary

uni-app Vue2 中 `:style` 绑定必须使用数组语法 `:style="[obj]"` 而非 `:style="obj"`

### Details

在优化 ste-badge 组件时，将模板中 `:style="[rootStyle, { display: ... }]"` 改为 `:style="cmpRootStyle"`（直接绑定对象），导致背景色和自定义颜色属性全部失效。

原因：uni-app 在小程序端（MP-WEIXIN、MP-ALIPAY 等）对 `:style` 的处理要求使用数组语法才能正确应用样式。直接绑定对象 `:style="obj"` 在 H5 端可以工作，但在小程序端样式不会生效。

同样，`for...in` + `hasOwnProperty` 循环在 uni-app 小程序运行时中无法正确枚举对象属性，必须使用 ES6 展开运算符 `...`。

### Suggested Action

1. uni-app 组件中所有 `:style` 绑定统一使用数组语法：`:style="[styleObj]"`
2. 对象属性合并使用展开运算符 `{ ...obj }`，不要用 `for...in` + `hasOwnProperty`
3. 修改样式绑定后必须在多平台（H5 + 小程序）验证

### Metadata

-   Source: user_feedback
-   Related Files: uni_modules/stellar-ui/components/ste-badge/ste-badge.vue
-   Tags: uni-app, vue2, style-binding, mini-program, cross-platform
-   Pattern-Key: uni-app.style_binding
-   Recurrence-Count: 1
-   First-Seen: 2026-07-30
-   Last-Seen: 2026-07-30

---

## [LRN-20260731-001] correction

**Logged**: 2026-07-31T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary

Vue2 prop 类型包含 Boolean 时，空字符串/空属性会被强制转换为布尔 true，导致显示异常

### Details

在 ste-badge 组件中，`content` prop 声明为 `type: [String, Number, Boolean, null]`。

当用户写 `<ste-badge content="" />` 或 `<ste-badge content />` 时，Vue2 的 Boolean 类型转换规则会把空字符串/空属性转换成布尔值 `true`（而非空字符串 `''`）。

这导致：

-   `cmpShowContent` = `!!(true && true != '0')` = `true` → 徽标显示
-   `cmpContent` = `String(true)` = `'true'` → 显示文字 "true"

用户期望 content 为空时不显示徽标，但实际显示了 "true"。

### Suggested Action

当 prop 类型包含 `Boolean` 时，计算属性必须显式处理布尔类型：

1. `cmpShowContent`：`if (typeof this.content === 'boolean') return false;`
2. `cmpContent`：`if (typeof content === 'boolean') return '';`

或者，如果不需要布尔语义，从 prop 的 type 数组中移除 `Boolean`。

### Metadata

-   Source: user_feedback
-   Related Files: uni_modules/stellar-ui/components/ste-badge/ste-badge.vue
-   Tags: vue2, prop, boolean-casting, type-coercion, uni-app
-   Pattern-Key: vue2.prop_boolean_casting
-   Recurrence-Count: 1
-   First-Seen: 2026-07-31
-   Last-Seen: 2026-07-31

---

## [LRN-20260731-002] correction

**Logged**: 2026-07-31T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary

Vue prop 默认值为 truthy 时会阻塞条件渲染，background 默认值应设为 null 让 CSS class 兜底

### Details

在 ste-badge 组件中，`background` prop 默认值设为 `'#ee0a24'`（truthy）。当徽标元素的 `v-if` 条件为 `showDot || cmpShowContent || $slots.content` 时，即使 content 为空也不会显示徽标（这是正确的）。

但当需要支持"有背景图但无文字"的场景时，将 `background` 加入 `v-if` 条件 `|| background`，由于默认值是 truthy 的 `'#ee0a24'`，导致 **没有设置任何 props 时徽标也会显示**。

解决方案：将 `background` 默认值改为 `null`，CSS class 中已有 `background-color: #ee0a24` 作为兜底。这样：

-   用户没设 background → prop 为 null → `v-if` 中 background 为 falsy → 不会因 background 显示徽标
-   用户设 background → prop 有值 → `v-if` 中 background 为 truthy → 徽标显示且使用自定义背景

### Suggested Action

1. prop 默认值不要设为 truthy 的值，如果该 prop 需要参与 `v-if` 条件判断
2. CSS class 中的默认样式可以兜底（如 `.ste-badge-content { background-color: #ee0a24 }`）
3. `v-if` 条件要同时考虑：元素是否有内容（showDot/content/slots）和元素是否有意义（background 有值）

### Metadata

-   Source: user_feedback
-   Related Files: uni_modules/stellar-ui/components/ste-badge/ste-badge.vue
-   Tags: vue2, prop-default, v-if, conditional-rendering, uni-app
-   Pattern-Key: vue2.prop_default_vif
-   Recurrence-Count: 1
-   First-Seen: 2026-07-31
-   Last-Seen: 2026-07-31

---

## [LRN-20260731-003] best_practice

**Logged**: 2026-07-31T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: frontend

### Summary

uni-app 子元素设背景图时必须清除父级背景色，否则背景图会被纯色覆盖

### Details

在 ste-badge 组件中，徽标子元素 `.ste-badge-content` 的 CSS 有默认 `background-color: #ee0a24`。当用户传入 `background` 为图片 URL 时，`bg2style()` 返回 `{ backgroundImage: 'url(...)' }`，通过内联 style 覆盖。

但如果不先把 `backgroundColor` 设为 `'transparent'`，内联 style 中同时存在 `backgroundColor`（CSS 默认色）和 `backgroundImage`（用户设置），在某些平台（尤其是小程序端）背景图无法显示，被纯色覆盖。

**原代码**（正确）：

```js
style = { backgroundColor: 'transparent', ...utils.bg2style(this.background) };
```

**错误做法**（之前 for...in 版本丢失了 backgroundColor: 'transparent'）：

```js
// 丢失了 backgroundColor: 'transparent'，背景图被覆盖
```

### Suggested Action

1. 子元素需要动态设置背景图时，必须先用 `backgroundColor: 'transparent'` 清除 CSS class 的默认背景色
2. `bg2style()` 返回的对象只有 `backgroundColor`/`backgroundImage` 等属性，不包含清除逻辑，调用方需自行处理
3. 使用展开运算符 `{ backgroundColor: 'transparent', ...obj }` 确保清除逻辑在最前

### Metadata

-   Source: code_review
-   Related Files: uni_modules/stellar-ui/components/ste-badge/ste-badge.vue, uni_modules/stellar-ui/utils/utils.js
-   Tags: uni-app, background-image, inline-style, css-conflict
-   Pattern-Key: uni-app.background_image_override
-   Recurrence-Count: 1
-   First-Seen: 2026-07-31
-   Last-Seen: 2026-07-31

---

## [LRN-20260731-004] correction

**Logged**: 2026-07-31T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary

uni-app 中不能用 `e.stopPropagation()` 替代模板 `.stop` 修饰符，小程序端事件对象可能不支持该方法

### Details

在优化 ste-button 组件时，将两个 button（`v-if` + `.stop` / `v-else` 无 `.stop`）合并为单个 button，用 `e.stopPropagation()` 动态控制冒泡。

但小程序端（微信/支付宝）的事件对象不是原生 DOM Event，可能没有 `stopPropagation()` 方法。而 `.stop` 修饰符是 uni-app 编译器识别的指令，会为每个平台生成对应的阻止冒泡代码，跨端兼容性有保障。

### Suggested Action

1. 在 uni-app 中，阻止冒泡必须使用模板 `.stop` 修饰符，不能用手动 `e.stopPropagation()`
2. 当需要条件性阻止冒泡时（如 `stopPropagation` prop），只能用 `v-if/v-else` 两个元素分别绑定 `@click.stop` 和 `@click`
3. 不要为了减少模板代码量而牺牲多端兼容性

### Metadata

-   Source: user_feedback
-   Related Files: uni_modules/stellar-ui/components/ste-button/ste-button.vue
-   Tags: uni-app, stopPropagation, event-modifier, mini-program, cross-platform
-   Pattern-Key: uni-app.stop_modifier
-   Recurrence-Count: 1
-   First-Seen: 2026-07-31
-   Last-Seen: 2026-07-31

---

## [LRN-20260731-005] correction

**Logged**: 2026-07-31T00:00:00+08:00
**Priority**: critical
**Status**: pending
**Area**: frontend

### Summary

**兼容性必须放在所有代码修改的第一位**，这是 StellarUI 项目的核心准则

### Details

在优化 ste-badge 和 ste-button 组件时，多次因为追求"代码简洁"或"减少模板体积"而牺牲了 uni-app 的多端兼容性：

1. 用 `:style="obj"` 替代 `:style="[obj]"` → 小程序端样式失效
2. 用 `for...in` + `hasOwnProperty` 替代展开运算符 → 小程序端属性遍历失效
3. 用 `e.stopPropagation()` 替代 `.stop` 修饰符 → 小程序端事件冒泡控制失效

这些问题的共同点：H5 端行为正常，但小程序端（MP-WEIXIN、MP-ALIPAY）因运行时差异导致功能异常。

**根本原因**：修改前没有充分验证 uni-app 的跨端兼容性，先改代码再测试，而不是先确认兼容性再改代码。

### Suggested Action

**任何代码修改必须遵循以下优先级顺序**：

1. **兼容性验证**（最高优先级）：确认修改方案在 H5、微信小程序、支付宝小程序、APP 四端均能正常工作
2. **功能正确性**：修改后功能逻辑正确
3. **性能优化**：在兼容性和正确性保障后，再考虑性能优化
4. **代码简洁性**：最后考虑代码是否优雅

**具体操作规范**：

-   修改前先确认 uni-app 对该 API/语法的跨端支持情况
-   涉及事件处理、样式绑定、DOM 操作的修改必须在多平台验证
-   不要为了减少代码量而使用未验证的跨端方案
-   每次修改后必须说明：哪些已验证兼容，哪些存在风险

### Metadata

-   Source: user_feedback
-   Related Files: uni_modules/stellar-ui/components/ste-badge/ste-badge.vue, uni_modules/stellar-ui/components/ste-button/ste-button.vue
-   Tags: uni-app, cross-platform, compatibility, principle, workflow
-   Pattern-Key: uni-app.compatibility_first
-   Recurrence-Count: 3
-   First-Seen: 2026-07-31
-   Last-Seen: 2026-07-31

---

## [LRN-20260731-006] correction

**Logged**: 2026-07-31T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: frontend

### Summary

uni-app 会自动转译 ES6+（如 `let`/`const`），不需要手动降级为 `var`

### Details

在优化 ste-button 组件时，错误地将 `let` 改为 `var`，理由是"提升兼容性"。

但实际上 uni-app 编译器会自动将 `let`/`const` 转译为小程序兼容的 `var`，手动转换没有任何收益，反而：

1. 丢失了 `let` 的块级作用域语义
2. 代码风格与原项目不一致
3. 属于过度优化，违反"兼容性放在第一位"的原则（本 case 中 `let` 已经兼容，无需修改）

### Suggested Action

1. 不要手动将 `let`/`const` 改为 `var`，uni-app 编译器自动处理
2. 只有在确认编译器无法处理的情况下（如某些特殊语法），才考虑手动降级
3. 保持与原项目的代码风格一致

### Metadata

-   Source: user_feedback
-   Related Files: uni_modules/stellar-ui/components/ste-button/ste-button.vue
-   Tags: uni-app, let, var, es6, transpile, over-optimization
-   Pattern-Key: uni-app.dont_downgrade_let
-   Recurrence-Count: 1
-   First-Seen: 2026-07-31
-   Last-Seen: 2026-07-31

---

## [LRN-20260731-007] correction

**Logged**: 2026-07-31T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary

不要用展开运算符替代 `utils.deepMerge`，后者支持嵌套对象合并

### Details

在优化 ste-button 组件时，将 `utils.deepMerge(style, rootStyle)` 替换为 `{ ...style, ...rootStyle }`。

虽然展开运算符在大多数情况下能正确合并扁平样式对象，但 `deepMerge` 支持嵌套对象的深度合并，这在处理复杂的 `rootStyle` 时是必要的（如 `borderRadius: { topLeft: '10rpx', bottomRight: '0' }`）。

此外，`deepMerge` 已经在项目中被广泛使用并验证过跨端兼容性，不应随意替换。

### Suggested Action

1. `rootStyle` 合并应使用 `utils.deepMerge(style, rootStyle)`，而非展开运算符
2. 只有在确定对象为纯扁平结构时，才可使用展开运算符
3. 不要随意替换已验证过的工具函数调用，除非确认其确实有问题

### Metadata

-   Source: user_feedback
-   Related Files: uni_modules/stellar-ui/components/ste-button/ste-button.vue, uni_modules/stellar-ui/utils/utils.js
-   Tags: deepMerge, spread-operator, style-merge, nested-object, uni-app
-   Pattern-Key: uni-app.use_deepMerge_for_styles
-   Recurrence-Count: 1
-   First-Seen: 2026-07-31
-   Last-Seen: 2026-07-31

---

## [LRN-20260812-001] best_practice

**Logged**: 2026-08-12T14:00:00+08:00
**Priority**: critical
**Status**: pending
**Area**: frontend

### Summary

同一文件的多个 Edit 必须串行执行，并行编辑会导致后写的覆盖先写的（race condition）

### Details

在优化 ste-drag-sort 组件时，一次性对同一文件发起了 5 个并行 Edit 调用（created hook、syncList、resetDragState、getItemDisabled、getReorderPreview）。每个 Edit 读取文件、替换字符串、写回。并行执行时各 Edit 基于同一原始内容，最后一个写入的"赢"，其余被覆盖。

结果：5 个编辑中仅 1 个（created hook）生效，其余 4 个全部丢失。后续又触发了 prettier 格式化，进一步覆盖了模板编辑。

### Suggested Action

1. 对同一文件的多个 Edit 必须**串行执行**（一个完成后再发下一个）
2. 不同文件的 Edit 可以并行
3. 如果改动量大，考虑用 Write 一次性写入完整文件（但需先 Read 确认）
4. 编辑后用 Grep 验证关键标记是否存在，确认未被覆盖

### Metadata

-   Source: error
-   Related Files: uni_modules/stellar-ui/components/ste-drag-sort/ste-drag-sort.vue
-   Tags: edit, race-condition, parallel, file-write
-   Pattern-Key: tools.edit_sequential_same_file
-   Recurrence-Count: 1
-   First-Seen: 2026-08-12
-   Last-Seen: 2026-08-12

---

## [LRN-20260812-002] correction

**Logged**: 2026-08-12T14:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: frontend

### Summary

`utils.guid()` 在 Vue2 computed 中使用是可接受的，不需要改为 data 字段

### Details

在优化 ste-drag 组件时，将 `cmpRootId` 从 computed 移到 data，理由是"computed 中调用 `utils.guid()` 写法脆弱"。

用户反馈：`utils.guid()` 这个方法就可以了，不用其他的。

Vue2 computed 在没有响应式依赖时只求值一次并缓存，`utils.guid()` 不会被重复调用。虽然写法不够规范，但功能正确，不属于性能问题。不应过度修改非问题代码。

### Suggested Action

1. 不要修改功能正确的非问题代码
2. `utils.guid()` 在 computed 中可接受（Vue2 无依赖时缓存）
3. 优化应聚焦于真正的性能瓶颈，而非代码风格偏好

### Metadata

-   Source: user_feedback
-   Related Files: uni_modules/stellar-ui/components/ste-drag/ste-drag.vue
-   Tags: vue2, computed, guid, over-engineering
-   Pattern-Key: vue2.computed_guid_acceptable
-   Recurrence-Count: 1
-   First-Seen: 2026-08-12
-   Last-Seen: 2026-08-12

---

## [LRN-20260812-003] best_practice

**Logged**: 2026-08-12T14:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary

Vue2 拖拽/交互组件性能优化的 5 大模式：拆分 computed、memoize 循环内重计算、缓存状态数组、GPU 加速、销毁清理

### Details

在 ste-drag-sort 和 ste-drag 组件优化中总结出的可复用模式：

1. **拆分混合频率的 computed**：当一个 computed 同时依赖高频变化数据（offsetX/Y，每帧变）和低频数据（dragIndex/insertIndex，偶尔变），拆为两个 computed。高频部分仅 O(1) 重算，低频部分不被高频触发。ste-drag-sort: `itemStyles` → `baseItemStyles` + `dragItemStyle`，touchmove 从 O(N) 降到 O(1)。

2. **Memoize 循环内重计算**：computed 内 `list.map((_, i) => fn(i))` 中 `fn` 如果每次都全量计算，N 次调用就是 O(N²)。用实例变量缓存 `fn` 结果，key 为参数组合，首次计算后其余命中缓存。ste-drag-sort: `getReorderPreview` memoize，O(N²) 降到 O(N)。

3. **缓存状态数组**：`getItemDisabled` 的属性链访问、`hitTestIndex` 的 `Object.keys()` 调用，在 touchmove 热路径中每帧执行。预计算为普通数组（`_disabledCache`、`_rectKeys`），在 `syncList`/`measureItemPositions` 时构建，热路径直接索引访问。非响应式实例变量（`this._xxx`）避免 Vue2 响应式开销。

4. **GPU 加速**：~~拖拽/动画元素添加 `will-change: transform`~~ — **用户明确要求不要使用 `will-change`，见 LRN-20260812-005**。

5. **beforeDestroy 清理**：所有 setTimeout/setInterval/window.addEventListener 必须在 beforeDestroy 中清理。非响应式定时器引用存 `this._timer`，在 created 中初始化。

### Suggested Action

按以下优先级排查项目中的其他交互组件：

1. 有 touchmove + setTimeout 但无 beforeDestroy 的组件（内存泄漏 + 性能）
2. computed 中 `list.map` 循环调用重计算函数的组件（O(N²) 风险）
3. 热路径中调用 `Object.keys()` 或属性链访问的组件
4. ~~缺少 `will-change` 的拖拽/动画组件~~ — **不要使用 `will-change`，见 LRN-20260812-005**

### Metadata

-   Source: code_review
-   Related Files: uni_modules/stellar-ui/components/ste-drag-sort/ste-drag-sort.vue, uni_modules/stellar-ui/components/ste-drag/ste-drag.vue
-   Tags: vue2, performance, drag, computed-split, memoize, gpu, beforeDestroy
-   Pattern-Key: vue2.drag_perf_patterns
-   Recurrence-Count: 1
-   First-Seen: 2026-08-12
-   Last-Seen: 2026-08-12

---

## [LRN-20260812-005] correction

**Logged**: 2026-08-12T17:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary

不要使用 `will-change: transform` CSS 属性

### Details

在优化 9 个组件时添加了 `will-change: transform` 用于 GPU 加速。用户明确要求不要使用此属性。

可能原因：`will-change` 会持续占用 GPU 内存（不会自动释放），在低端设备或长列表中可能导致内存压力。在 UniApp 多端编译环境下行为不一致，小程序/App 端可能无法正确处理。

### Suggested Action

1. 不要添加 `will-change: transform` 或任何 `will-change` 属性
2. GPU 加速应通过 `transform: translate3d()` / `transform: translateZ(0)` 间接触发（如需要）
3. 已添加的 `will-change` 已全部移除（14 处，9 个文件）

### Metadata

-   Source: user_feedback
-   Related Files: ste-drag-sort, ste-drag, ste-swipe-action, ste-popup, ste-touch-swipe, ste-tour, ste-select, ste-media-preview, ste-dropdown-menu
-   Tags: css, will-change, gpu, over-engineering
-   Pattern-Key: css.will_change_do_not_use
-   Recurrence-Count: 1
-   First-Seen: 2026-08-12
-   Last-Seen: 2026-08-12

---

## [LRN-20260812-004] correction

**Logged**: 2026-08-12T16:30:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary

可选链 `?.` 在 App/小程序中不存在兼容性问题，不应作为优化项移除

### Details

在优化 8 个 P0 组件时，将 `?.` 列为"兼容性风险"并移除了 23 处。用户纠正：`?.` 在 App 和小程序中都没有兼容性问题。所谓的"兼容性问题"指的是 App/小程序平台特有的行为差异（如条件编译、API 可用性、CSS 支持差异等），而非 JS 语法兼容性。

UniApp 编译器会将 `?.` 转译为兼容代码，无需手动替换。

### Suggested Action

1. 不要移除 `?.` — 它是合法语法，UniApp/Babel 会处理兼容性
2. "兼容性问题"指 App/小程序平台差异（条件编译、平台 API、CSS 支持），不是 JS 语法
3. 已移除的 `?.` 可以选择性还原，但不影响功能

### Metadata

-   Source: user_feedback
-   Related Files: 多个组件
-   Tags: optional-chaining, compatibility, over-engineering
-   Pattern-Key: js.optional_chaining_compatible
-   Recurrence-Count: 1
-   First-Seen: 2026-08-12
-   Last-Seen: 2026-08-12

---
