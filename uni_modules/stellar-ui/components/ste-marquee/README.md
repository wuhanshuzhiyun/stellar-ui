# Marquee 走马灯

用于展示滚动公告、中奖名单等水平滚动信息。

---$

### 代码演示
JavaScript后面的演示代码中涉及到的变量和方法都使用本javascript代码
```javascript
export default {
	data() {
		return {
			list: [
				{ id: 1, text: '恭喜用户138****1234获得一等奖' },
				{ id: 2, text: '恭喜用户139****5678获得二等奖' },
				{ id: 3, text: '恭喜用户137****9012获得三等奖' },
			],
		};
	},
	methods: {
		onItemClick(item, index) {
			console.log('点击了:', item.text, '下标:', index);
		},
	},
};
```

#### 基础用法
通过 `list` 数组设置需要滚动的内容，自动无缝循环滚动。
```
<ste-marquee :list="list"></ste-marquee>
```

#### 调整滚动速度
通过 `speed` 属性设置滚动速率 `(px/s)`，默认 `50`。
```
<ste-marquee :list="list" :speed="100"></ste-marquee>
```

#### 自定义容器样式
通过 `containerBg`、`containerPadding`、`containerRadius` 设置容器的背景、内边距和圆角。
```
<ste-marquee
	:list="list"
	containerBg="#f5f5f5"
	containerPadding="20rpx"
	containerRadius="16rpx"
></ste-marquee>
```

#### 自定义消息项样式
通过 `itemBg`、`itemPadding`、`itemRadius` 设置每个消息项的样式。
```
<ste-marquee
	:list="list"
	itemBg="#ffffff"
	itemPadding="16rpx 24rpx"
	itemRadius="8rpx"
></ste-marquee>
```

#### 悬停暂停
通过 `pauseOnHover` 控制鼠标悬停或触摸时是否暂停，默认 `true`。
```
<ste-marquee :list="list" :pauseOnHover="false"></ste-marquee>
```

#### 点击事件
通过 `@click` 监听消息项点击事件，参数为 `item` 和 `index`。
```
<ste-marquee :list="list" @click="onItemClick"></ste-marquee>
```

#### 播放控制
通过 `ref` 调用组件方法控制走马灯的播放、暂停和停止。
```
<ste-marquee ref="marqueeRef" :list="list"></ste-marquee>
<button @click="$refs.marqueeRef.play()">播放</button>
<button @click="$refs.marqueeRef.pause()">暂停</button>
<button @click="$refs.marqueeRef.stop()">停止</button>
```

#### 使用插槽自定义内容
通过 `item` 插槽自定义每个消息项的渲染内容，插槽参数为 `item` 和 `index`。
```
<ste-marquee :list="list">
	<template #item="{ item, index }">
		<view class="custom-item">
			<image :src="item.icon" class="avatar" mode="aspectFit" />
			<text>{{ item.text }}</text>
		</view>
	</template>
</ste-marquee>
```

#### 带图标的消息项
在 `list` 数据中设置 `icon` 字段，默认插槽会自动渲染图标。
```javascript
export default {
	data() {
		return {
			listWithIcon: [
				{ id: 1, icon: 'https://example.com/avatar1.png', text: '张三获得了奖励' },
				{ id: 2, icon: 'https://example.com/avatar2.png', text: '李四获得了奖励' },
			],
		};
	},
};
```
```
<ste-marquee :list="listWithIcon"></ste-marquee>
```

---$
### API
#### 组件属性(Props)

| 参数					| 说明							| 类型		| 默认值				| 可选值	| 支持版本	|
| ---					| ---							| ---		| ---				| ---	| ---		|
| `list`				| 数据列表						| `Array`	| `[]`				| -		| -			|
| `speed`				| 滚动速度 (px/s)				| `Number`	| `50`				| -		| -			|
| `pauseOnHover`		| 悬停/触摸时是否暂停			| `Boolean`	| `true`			| -		| -			|
| `loop`				| 是否循环播放					| `Boolean`	| `true`			| -		| -			|
| `gap`					| 消息项间距 (rpx)				| `Number`	| `20`				| -		| -			|
| `height`				| 容器高度						| `String`	| `auto`			| -		| -			|
| `fillScreen`			| 是否填满屏幕					| `Boolean`	| `false`			| -		| -			|
| `clickable`			| 是否可点击						| `Boolean`	| `true`			| -		| -			|
| `containerBg`			| 容器背景色						| `String`	| `transparent`		| -		| -			|
| `containerPadding`	| 容器内边距						| `String`	| `0rpx`			| -		| -			|
| `containerRadius`		| 容器圆角						| `String`	| `0rpx`			| -		| -			|
| `itemBg`				| 消息项背景色					| `String`	| `transparent`		| -		| -			|
| `itemPadding`			| 消息项内边距					| `String`	| `0rpx 20rpx`		| -		| -			|
| `itemRadius`			| 消息项圆角						| `String`	| `0rpx`			| -		| -			|

#### 组件事件(Events)

| 事件名		| 说明					| 事件参数						| 支持版本	|
| ---		| ---					| ---							| ---		|
| `click`	| 点击消息项时触发		| `item`：消息项数据，`index`：下标	| -			|

#### 组件插槽(Slots)

| 插槽名		| 说明				| 插槽参数						| 支持版本	|
| ---		| ---				| ---							| ---		|
| `item`	| 自定义消息项内容	| `item`：消息项数据，`index`：下标	| -			|

#### 组件方法(Methods)

| 方法名		| 说明					| 参数	| 支持版本	|
| ---		| ---					| ---	| ---		|
| `play`	| 开始/恢复播放			| -		| -			|
| `pause`	| 暂停播放				| -		| -			|
| `resume`	| 恢复播放				| -		| -			|
| `stop`	| 停止并重置到起始位置	| -		| -			|

#### MarqueeItem 数据结构

| 字段			| 说明				| 类型				| 必填	|
| ---			| ---				| ---				| ---	|
| `id`			| 唯一标识			| `String\|Number`	| 是	|
| `text`		| 显示文本			| `String`			| 是	|
| `icon`		| 图标URL			| `String`			| 否	|
| `color`		| 文本颜色			| `String`			| 否	|
| `background`	| 消息项背景色		| `String`			| 否	|
| `data`		| 自定义扩展数据		| `Any`				| 否	|

---$
{{qinpengfei}}
