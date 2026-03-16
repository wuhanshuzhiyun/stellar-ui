# PageContainer 页面容器

### 说明
`ste-page-container` 在不同平台的实现方式：

- `MP-WEIXIN`：使用微信小程序原生 `page-container`
- 其他平台：基于 `ste-popup` 兼容实现
- 微信单页限制：原生 `page-container` 同一页面仅允许 1 个实例，因此 `ste-page-container` 在微信小程序环境下也仅支持单实例使用

为保持 API 一致，组件对外暴露 `page-container` 常用属性和事件。

---$

### 代码演示

#### 微信小程序
```vue
<template>
	<ste-page-container
		:show.sync="show"
		position="bottom"
		:overlay="true"
		:round="true"
		custom-style="height: 60vh;"
	>
		<view class="content">内容区域</view>
	</ste-page-container>
</template>

<script>
export default {
	data() {
		return {
			show: false,
		};
	},
};
</script>
```

#### 其他平台
```vue
<template>
	<ste-page-container
		:show.sync="show"
		position="bottom"
		:overlay="true"
		:round="true"
		custom-style="height: 60vh;"
	>
		<view class="content">内容区域</view>
	</ste-page-container>
</template>

<script>
export default {
	data() {
		return {
			show: false,
		};
	},
};
</script>
```

#### 方法调用
```vue
<template>
	<ste-page-container ref="pc" :show.sync="show">
		<view>内容区域</view>
	</ste-page-container>
</template>

<script>
export default {
	data() {
		return {
			show: false,
		};
	},
	methods: {
		openBox() {
			this.$refs.pc.open();
		},
		closeBox() {
			this.$refs.pc.close();
		},
	},
};
</script>
```

#### 事件监听
```vue
<ste-page-container
	:show.sync="show"
	@beforeenter="onEvent('beforeenter')"
	@afterenter="onEvent('afterenter')"
	@clickoverlay="onEvent('clickoverlay')"
>
	<view>内容区域</view>
</ste-page-container>
```

#### 微信专属属性
```vue
<ste-page-container
	:show.sync="show"
	:closeOnSlideDown="true"
	overlayStyle="background: rgba(0, 144, 255, 0.45);"
	customStyle="height: 50vh;"
>
	<view>微信小程序下支持下滑关闭和自定义遮罩样式</view>
</ste-page-container>
```

---$

### API

#### Props

| 属性名 | 说明 | 类型 | 默认值 | 平台支持 |
| --- | --- | --- | --- | --- |
| `show` | 是否显示容器 | `Boolean` | `false` | 全平台 |
| `duration` | 动画时长，单位 ms | `Number` | `300` | 全平台 |
| `zIndex` | 层级 | `Number/String` | `100` | 全平台 |
| `overlay` | 是否显示遮罩 | `Boolean` | `true` | 全平台 |
| `position` | 弹出位置：`top`/`bottom`/`right`/`center` | `String` | `bottom` | 全平台 |
| `round` | 是否展示圆角 | `Boolean` | `false` | 全平台 |
| `customStyle` | 容器样式 | `String` | `''` | 全平台 |
| `safeAreaInsetBottom` | 是否适配底部安全区 | `Boolean` | `false` | 全平台（非微信为兼容实现） |
| `closeOnSlideDown` | 是否允许下滑关闭 | `Boolean` | `false` | 仅微信小程序 |
| `overlayStyle` | 遮罩层样式 | `String` | `''` | 仅微信小程序 |

#### Events

| 事件名 | 说明 | 平台支持 |
| --- | --- | --- |
| `beforeenter` | 进入前触发 | 全平台（非微信为兼容模拟） |
| `enter` | 进入中触发 | 全平台（非微信为兼容模拟） |
| `afterenter` | 进入结束触发 | 全平台 |
| `beforeleave` | 离开前触发 | 全平台（非微信为兼容模拟） |
| `leave` | 离开中触发 | 全平台（非微信为兼容模拟） |
| `afterleave` | 离开结束触发 | 全平台（非微信为兼容模拟） |
| `clickoverlay` | 点击遮罩触发 | 全平台 |
| `update:show` | 显隐双向绑定事件 | 全平台 |

#### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `open` | 打开容器 | - |
| `close` | 关闭容器 | - |

### 非微信平台兼容差异

以下能力在非微信平台基于 `ste-popup` 兼容，无法完全等效原生 `page-container`：

- `closeOnSlideDown`：不支持
- `overlayStyle`：不支持
- 原生手势与生命周期细节存在实现差异
- `position="right"` 默认按侧页语义处理，兼容实现默认宽度为 `80vw`，可通过 `customStyle` 覆盖

微信端使用限制：

- 同一页面只允许存在 1 个 `ste-page-container`
- 若同时渲染多个实例，可能触发原生组件限制报错

---$
{{fuyuwei}}
