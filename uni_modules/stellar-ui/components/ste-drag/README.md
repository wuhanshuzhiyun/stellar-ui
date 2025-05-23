# Drag 拖拽
用于拖拽的容器

---$


### 代码演示
####  自由拖拽
```html
<ste-drag>
	<ste-button>拖拽按钮</ste-button>
</ste-drag>
```

#### 固定方向
```html
<ste-drag direction="x">
	<ste-button>横向固定</ste-button>
</ste-drag>

<ste-drag direction="y">
	<ste-button>竖向固定</ste-button>
</ste-drag>
```

#### 贴边
会根据元素移动结束时到左右边界距离来进行贴边
```html
<ste-drag attract>
	<ste-button>贴边</ste-button>
</ste-drag>
```

#### 边界
- 数据结构是 `{top: 0, right: 0, bottom: 0, left: 0}`，分别代表距离屏幕上、右、下、左的距离(单位px)
- 可按照样例中的做法，根据屏幕大小动态边界值

```html
<template>
<view style="width: 300px; height: 150px; border: solid 1px red" class="boundary-box">
	<ste-drag :boundary="boundary">
		<ste-button>边界</ste-button>
	</ste-drag>
</view>
</template>
<script>
import utils from '@/common/utils.js';
export default {
	data() {
		return {
			boundary: null,
		}
	},
	mounted() {
		const boundary = { left: 22, top: 354 };
		const systemInfo = utils.getWindowInfo();
		boundary.right = systemInfo.windowWidth - 22 - 300;
		boundary.bottom = systemInfo.windowHeight - 354 - 150;
		this.boundary = boundary;
	}
}
</script>
<style>
.boundary-box {
	width: 300px;
	height: 150px;
	border: solid 1px red;
	
	position: fixed;
	left: 22px;
	top: 354px;
}
</style>

```

---$
### API
#### Props

| 参数			| 说明											| 类型		| 默认值										| 可选值													| 支持版本	|
| ---			| ---											| ---		| ---										| ---													| ---		|
| `attract`		| 是否开启自动吸边（根据 screenWidth 进行吸边）	| `Boolean`	| `false`									|														|			|
| `direction`	| 拖拽元素的拖拽方向限制							| `String`	| `all`										| `all`：不限制方向<br/>`x`：横向拖拽<br/>`y`：竖向拖拽	|			|
| `boundary`	| 拖拽元素的拖拽边界 默认屏幕为边界				| `Object`	| `{top: 0, right: 0, bottom: 0, left: 0}`	|														|			|


#### Events

| 事件名	| 说明		| 事件参数	| 支持版本	|
| ---		| ---		| ---		| ---		|
| `start`	| 拖拽开始	| -			| -			|
| `end`		| 拖拽结束	| -			| -			|


#### Slots

|插槽名		|说明		|插槽参数	|支持版本	|
| ---		| ---		| ---		| ---		|
| `default`	| 拖拽内容	|-			| -			|

---$
{{fuyuwei}}