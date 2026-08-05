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
