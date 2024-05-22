# IndexList 索引列表

通过折叠面板收纳内容区域。

{{compatibility}}

#### 基础用法

```html
<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="索引列表"></page-nav>
		<view class="content">
			<ste-index-list>
				<ste-index-item v-for="item in data" :key="item.title" :title="item.title">
					<view class="row-item" v-for="(m, i) in item.list" :key="i">{{ m }}</view>
				</ste-index-item>
			</ste-index-list>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data: [
				{
					title: '',
					list: ['列表1', '列表2', '列表3', '列表4', '列表5', '列表6', '列表7', '列表8'],
				},
				{
					title: 'A',
					list: ['列表A1', '列表A2', '列表A3', '列表A4', '列表A5', '列表A6', '列表A7', '列表A8'],
				},
				{
					title: 'B',
					list: ['列表B1', '列表B2', '列表B3', '列表B4', '列表B5', '列表B6', '列表B7', '列表B8'],
				},
				{
					title: 'C',
					list: ['列表C1', '列表C2', '列表C3', '列表C4', '列表C5', '列表C6', '列表C7', '列表C8'],
				},
				{
					title: 'D',
					list: ['列表D1', '列表D2', '列表D3', '列表D4', '列表D5', '列表D6', '列表D7', '列表D8'],
				},
				{
					title: 'E',
					list: ['列表E1', '列表E2', '列表E3', '列表E4', '列表E5', '列表E6', '列表E7', '列表E8'],
				},
				{
					title: 'F',
					list: ['列表F1', '列表F2', '列表F3', '列表F4', '列表F5', '列表F6', '列表F7', '列表F8'],
				},
				{
					title: 'G',
					list: ['列表G1', '列表G2', '列表G3', '列表G4', '列表G5', '列表G6', '列表G7', '列表G8'],
				},
			],
		};
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		background: #fbfbfc;
		padding: 0;
		.row-item {
			height: 90rpx;
			line-height: 90rpx;
			padding: 0 24rpx;
			& + .row-item {
				border-top: 1px solid #ddd;
			}
		}
	}
}
</style>
```



### API

#### ScrollTo Props

| 属性名	| 说明																						|类型								|默认值		|可选值	| 支持版本	|
| ---			|---																						| ---								| ---			| ---		| ---			|
| `active`| 当前激活的索引下标，支持sync双向绑定，默认值0	| `Number`					| `0`			| -			| -				|
| `height`| 高度，默认值100%																| `String`/`Number`	| `"100%"`| -			| -				|
| `sticky`| 默认`title`是否粘性布局												| `Boolean`					| `true`	| -			| -				|

#### ScrollTo Events
| 事件名		|说明						|事件参数										|支持版本	|
|---			|---						|---												|---			|
| `change`| 滚动锚点时触发	| `active`: 当前激活的锚点下标	| -				|

#### ScrollTo Method
| 方法名| 说明															|支持版本	|
| ---		| ---															|---			|
| `init`| 初始化锚点信息，在渲染完成后调用	| -				|
{{xuyajun}}
