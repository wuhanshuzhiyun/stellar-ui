# Badge 徽标

在右上角展示徽标数字或小红点。

{{compatibility}}

### 代码演示
#### 徽标内容
通过`content`属性，设置子元素的右上角的徽标
```html
<ste-badge content="1" :showDot="false">
	<view class="child"></view>
</ste-badge>
<ste-badge content="99+" :showDot="false">
	<view class="child"></view>
</ste-badge>
<ste-badge content="hot" :showDot="false">
	<view class="child"></view>
</ste-badge>


<style>
.child {
	height: 80rpx;
	width: 80rpx;
	border-radius: 8rpx;
	background-color: #f2f3f5;
}
</style>

```

#### 背景
通过`background`属性，设置徽标内容的背景
- 支持纯色、渐变色、背景图

```html
<ste-badge content="1" background="rgb(25, 137, 250)" :showDot="false">
	<view class="avator"></view>
</ste-badge>
<ste-badge content="99+" background="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" :showDot="false">
	<view class="avator"></view>
</ste-badge>
<ste-badge content="" background="https://img95.699pic.com/xsj/0a/5y/dc.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast" :showDot="false">
	<view class="avator"></view>
</ste-badge>


<style>
.child {
	height: 80rpx;
	width: 80rpx;
	border-radius: 8rpx;
	background-color: #f2f3f5;
}
</style>
```

#### 小红点
通过`showDot`属性，设置是否显示小红点

```html
<ste-badge>
	<view class="avator"></view>
</ste-badge>
<ste-badge background="rgb(25, 137, 250)">
	<view class="avator"></view>
</ste-badge>

<style>
.child {
	height: 80rpx;
	width: 80rpx;
	border-radius: 8rpx;
	background-color: #f2f3f5;
}
</style>
```

#### 偏移
当设置了`offsetX`或`offsetY`值时，徽标会基于原点（左上角）进行偏移
- `offsetX`为正值时向右偏移，`offsetX`为负值时向左偏移，`offsetX`为零时不偏移
- `offsetY`为正值时向下偏移，`offsetY`为负值时向上偏移，`offsetY`为零时不偏移

```html
<ste-badge content="1" :showDot="false" :offsetX="10" :offsetY="10">
	<view class="avator"></view>
</ste-badge>
<ste-badge content="1" :showDot="false" :offsetX="0" :offsetY="-20">
	<view class="avator"></view>
</ste-badge>
<ste-badge content="1" :showDot="false" :offsetX="-20" :offsetY="-30">
	<view class="avator"></view>
</ste-badge>

<style>
.child {
	height: 80rpx;
	width: 80rpx;
	border-radius: 8rpx;
	background-color: #f2f3f5;
}
</style>
```

#### 徽标位置
通过`position`属性，设置徽标的位置

```html
<ste-badge content="1" :showDot="false">
	<view class="avator"></view>
</ste-badge>
<ste-badge content="1" :showDot="false" position="topLeft">
	<view class="avator"></view>
</ste-badge>
<ste-badge content="1" :showDot="false" position="bottomLeft">
	<view class="avator"></view>
</ste-badge>
<ste-badge content="1" :showDot="false" position="bottomRight">
	<view class="avator"></view>
</ste-badge>

<style>
.child {
	height: 80rpx;
	width: 80rpx;
	border-radius: 8rpx;
	background-color: #f2f3f5;
}
</style>
```

#### 自定义内容
通过`content`插槽，自定义徽标的内容
```html
<ste-badge :showDot="false">
	<template slot="content">
		<ste-icon code="&#xe667;" size="10"></ste-icon>
	</template>
	<view class="avator"></view>
</ste-badge>
<ste-badge :showDot="false">
	<template slot="content">
		<ste-icon code="&#xe6a7;" size="14"></ste-icon>
	</template>
	<view class="avator"></view>
</ste-badge>

<style>
.child {
	height: 80rpx;
	width: 80rpx;
	border-radius: 8rpx;
	background-color: #f2f3f5;
}
</style>
```

### API
#### 组件属性(Props)

| 参数			| 说明												| 类型				| 默认值		| 可选值																		| 支持版本	|
| ---			| ---												| ---				| ---		| ---																		| ---		|
| `content`		| 徽标内容											| `Number/String`	| -			| -																			| -			|
| `background`	| 背景												| `String`			| `#ee0a24`	| -																			| -			|
| `showDot`		| 是否展示为小红点									| `Boolean`			| `true`	| -																			| -			|
| `offsetX`		| x轴偏移量											| `Number/String`	| `auto`	| -																			| -			|
| `offsetY`		| y轴偏移量											| `Number/String`	| `auto`	| -																			| -			|
| `showZero`	| 当 content 为数字 0 或字符串 '0' 时，是否展示徽标	| `Boolean`			| `true`	| -																			| -			|
| `position`	| 徽标位置											| `String`			| `topRight`| topRight：上右<br/>topLeft：上左<br/>bottomLeft：下左<br/>bottomRight：下右	| -			|


#### 组件插槽(Solts)

|名称	|说明			|支持版本	|
|---	|---			|---		|
|default|默认插槽		|-			|
|content|自定义徽标内容	|-			|

{{fuyuwei}}