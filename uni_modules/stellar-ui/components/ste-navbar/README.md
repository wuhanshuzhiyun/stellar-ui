# Navbar 导航栏

提供导航功能，常用于页面顶部。

---$

## 代码演示

### 基本使用

通过 `title`设置导航栏标题，插槽`default`设置导航栏内容

```html
<template>
    <ste-navbar title="标题">插槽</ste-navbar>
</template>
```

### 返回按钮配置

- 通过 `autoBack` 属性来设置是否显示返回按钮，默认`true`
- 通过 `backColor` 属性来设置返回按钮颜色，默认`#000`
- 通过 `backCode` 属性来设置返回按钮icon的code，默认`&#xe673;`
- 通过 `backBackgroundColor` 属性来设置返回按钮的背景颜色，默认`transparent`
- 通过 `backBorderColor` 属性来设置返回返回按钮的边框颜色，默认`transparent`
- 通过 `backOpacity` 属性来设置返回按钮透明度，默认`1`

```html
<template>
    <ste-navbar title="隐藏返回按钮" :autoBack="false"></ste-navbar>
    <ste-navbar title="返回按钮各配置" backColor="red" backCode="&#xe68d;" backBackgroundColor="green" backBorderColor="blue" :backOpacity="0.4"></ste-navbar>
</template>
```

### 标题配置

- 通过 `title` 属性来设置标题文本，默认`''`
- 通过 `titleColor` 属性来设置标题颜色，默认`#181818`
- 通过 `titleAlignment` 属性来设置标题对齐方式，`1` ：居左，`2`：居中，默认`1`

```html
<template>
    <ste-navbar title="标题各配置" titleColor="red" :titleAlignment="2" :zIndex="100"></ste-navbar>
</template>
```

### 导航栏配置

- 通过 `fixed` 属性来设置是否固定到顶部，默认`false`
- 通过 `safeAreaInsetTop` 属性来设置是否开启顶部安全区适配，默认`true`
- 通过 `zIndex` 属性来设置导航栏 z-index，默认`10`
- 通过 `backgroundColor` 属性来设置导航栏背景色，默认`transparent`
- 通过 `colorType` 属性来设置支付宝小程序专属属性，导航栏背景色，`1` ：黑色，`2`：白色，默认`1`

```html
<template>
    <ste-navbar title="导航栏配置" backgroundColor="red"></ste-navbar>
</template>
```

### 回调事件

通过 `backClick` 获取返回按钮点击事件

```html
<template>
    <ste-navbar title="事件" @backClick="backClick"></ste-navbar>
</template>

<script>
export default {
	data() {
		return {};
	},
	created() {},
	methods: {
		backClick() {
			this.$showToast({
				icon: 'none',
				title: '导航栏点击事件',
			});
		},
	},
};
</script>
```

---$

### API

#### Props
| 属性名 | 说明  | 类型 | 默认值  | 可选值 | 支持版本 |
| ----- | ----- | --- | ------- | ------ | -------- |
| `autoBack` | 是否显示返回按钮 | `Boolean` | `true` | - | - |
| `backColor` | 返回按钮颜色 | `String` | `#000` | - | - |
| `backCode` | 返回按钮icon的code | `String` | `&#xe673;` | - | - |
| `backCode` | 返回按钮icon的code | `String` | `&#xe673;` | - | - |
| `backBackgroundColor` | 返回按钮的背景颜色 | `String` | `transparent` | - | - |
| `backBorderColor` | 返回按钮的边框颜色 | `String` | `transparent` | - | - |
| `backOpacity` | 返回按钮透明度 | `Number` | `1` | - | - |
| `stopNavigateBack` | 是否阻止点击返回按钮后，返回到上一页 | `Boolean` | `false` | - | - |
| `title` | 标题文本 | `String` | `` | - | - |
| `titleColor` | 标题颜色 | `String` | `#181818` | - | - |
| `titleAlignment` | 标题对齐方式 | `Number` | `1` | `1`：居左<br/>`2`：居中 | - |
| `fixed` | 是否固定到顶部 | `Boolean` | `false` | - | - |
| `safeAreaInsetTop` | 是否开启顶部安全区适配 | `Boolean` | `true` | - | - |
| `zIndex` | 导航栏 z-index | `Number` | `10` | - | - |
| `backgroundColor` | 导航栏背景色 | `String` | `transparent` | - | - |
| `colorType` | 标题对齐方式 | `Number/String` | `left` | `1`：黑色<br/>`2`：白色 | - |


#### Events
| 事件名		| 说明			| 事件参数	| 支持版本	|
| -----			| -----			| -------	| --------	|
| `backClick`	| 返回按钮点击	| -			| -			|

#### Slots

| 插槽名    | 说明       | 插槽参数 | 支持版本 |
| --------- | ---------- | -------- | -------- |
| `default` | 导航栏内容 | -        | -        |

---$
{{fuyuwei}}
