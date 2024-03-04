# Image 图片
图片组件，对原生`image`组件进行了扩展。

{{compatibility}}

### 代码演示


#### 基础用法
- 通过`src`属性设置图片地址
- 通过`width`属性设置图片宽度
- 通过`height`属性设置图片高度

```html
<ste-image src="https://image.whzb.com/chain/StellarUI/背景1.png" width="200" height="200" />
```

#### 加载效果
- 通过`showLoading`设置图片展示加载中效果

```html
<template>
	<view>
		<ste-image :src="imgUrl" width="200" height="200" style="margin-right: 12rpx" />
		<ste-image :src="imgUrl" showLoading width="200" height="200" style="margin-right: 12rpx" />
		<ste-image :src="errorImg" showLoading width="200" height="200" />
	</view>
</template>
<script>
export default {
	data() {
		return {
			imgUrl: '',
			errorUrl: '',
		};
	},
	watch: {},
	mounted() {
		setTimeout(() => {
			this.imgUrl = 'https://image.whzb.com/chain/StellarUI/logo.png';
			this.errorUrl = 'https://image.whzb.com/chain/StellarUI/logo-1.png';
		}, 1500);
	},
};
</script>
```
#### 具名插槽
- 通过`loading`具名插槽可以自定义加载中内容
- 通过`error`具名插槽可以自定义加载失败内容

```html
<ste-image :src="errorUrl" showLoading width="200" height="200">
	<template v-slot:loading>Loading...</template>
	<template v-slot:error>Error</template>
</ste-image>
```


### API
#### Props
| 属性名					| 说明																		| 类型			| 默认值				| 可选值																	|支持版本	|
| -----						|-----																	|-----		|-----				|-----																	|-----		|
| type						| 组件类型																| String	| "default"		| `"default"`:正常搜索<br/>`"nav"`:导航栏	|-				|
| value						| 输入框默认值，支持`v-model`双向绑定			| String	| ""					| -																			|-				|
| placeholder			| 占位提示符															| String	| ""					| -																			|-				|
| hotWords				| 热词列表																| String[]| []					| -																			|-				|
| interval				| 热词列表自动切换时间间隔，单位`ms`				| Number	| 3000				| -																			|-				|
| disabled				| 是否禁用状态														| Boolean	| false				| -																			|-				|
| hiddenLine			| 是否隐藏分割线													| Boolean	| false				| -																			|-				|
| hiddenBtn				| 是否隐藏按钮，同时也会隐藏分割线					| Boolean	| false				| -																			|-				|
| btnText					| 按钮文本内容														| String	| "搜索"				| -																			|-				|
| hiddenInput			| 是否隐藏输入框													| Boolean	| false				| -																			|-				|
| clearable				| 是否可清空内容													| Boolean	| true				| -																			|-				|
| height					| 搜索框高度，单位`rpx`										| Number	| 64					| -																			|-				|
| radius					| 圆角弧度，单位`rpx`											| Number	| 32					| -																			|-				|
| borderColor			| 边框颜色																| String	| "#EEEEEE66"	| -																			|-				|
| background			| 背景，可直接传颜色值或者图片							| String	|"#FFFFFF"		| -																			|-				|| placeholderColor| 占位符文本颜色	| String| "#BBBBBB"	| -	|-|
| prefixIconColor	| 前缀图标颜色														| String	| "#BBBBBB"		| -																			|-				|
| inputTextColor	| 输入框文本颜色													| String	| "#000000"		| -																			|-				|
| clearIconColor	| 清除图标颜色														| String	| "#BBBBBB"		| -																			|-				|
| btnTextColor		| 搜索按钮文本颜色，分割线会跟随文本颜色变化	| String	| "#0090FF"		| -																			|-				|
| btnBackground		| 搜索按钮背景，可直接传颜色值或者图片				| String	| -						| -																			|-				|



#### Events
您可以通过监听`input`事件，在回调中将返回的结果绑定一个变量去获得用户的输入内容。
但如"基本使用"中的说明一样，您双向绑定了一个变量后，无需监听`input`事件也是可以的。
| 事件名| 说明							| 回调参数	| 支持版本	|
|-----	|-----						|-----		|-----		|
| load	| 图片加载成功触发	| event		| -				|
| error	| 图片加载失败触发	| event		| -				|

{{xuyajun}}
