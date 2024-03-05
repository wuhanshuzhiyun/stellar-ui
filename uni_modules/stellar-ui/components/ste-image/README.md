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
| 属性名							| 说明																																																				| 类型						| 默认值						| 可选值																																																																																																																																																																																																																										|支持版本	|
| -----								|-----																																																			|-----					|-----						|-----																																																																																																																																																																																																																										|-----		|
| src									| 图片源，同原生																																															| String				| -								| -																																																																																																																																																																																																																												|-				|
| mode								| 图片裁剪、缩放的模式																																													| String				| `"scaleToFill"`	| `"scaleToFill"`缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满`image`元素<br/>`"aspectFit"`缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来<br/>`"aspectFill"`缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取<br/>`"widthFix"`缩放模式，宽度不变，高度自动变化，保持原图宽高比不变<br/>`"heightFix"`缩放模式，高度不变，宽度自动变化，保持原图宽高比不变	|-				|
| width								| 宽度																																																				| Number/String	| `"100%"`				| "Number"：单位rpx<br/>"String"：同原生																																																																																																																																																																																																										|-				|
| height							| 高度																																																				| Number/String	| `"100%"`				| "Number"：单位rpx<br/>"String"：同原生																																																																																																																																																																																																										|-				|
| showLoading					| 是否展示图片未加载的占位内容																																									| Boolean				| `false`					| -																																																																																																																																																																																																																												|-				|
| showError						| 是否加载失败的内容																																														| Boolean				| `true`					| -																																																																																																																																																																																																																												|-				|
| showMenuByLongpress	| 长按图片显示发送给朋友、收藏、保存图片、搜一搜、打开名片/前往群聊/打开小程序（若图片中包含对应二维码或小程序码）的菜单	| Boolean				| `false`					| -																																																																																																																																																																																																																												|-				|
| lazyLoad						| 图片懒加载，在即将进入一定范围（上下三屏）时才开始加载																														| Boolean				| `false`					| -																																																																																																																																																																																																																												|-				|



#### Events
您可以通过监听`input`事件，在回调中将返回的结果绑定一个变量去获得用户的输入内容。
但如"基本使用"中的说明一样，您双向绑定了一个变量后，无需监听`input`事件也是可以的。
| 事件名| 说明							| 回调参数	| 支持版本	|
|-----	|-----						|-----		|-----		|
| load	| 图片加载成功触发	| event		| -				|
| error	| 图片加载失败触发	| event		| -				|


#### Solts
| 插槽中文名		| 插槽英文名	| 插槽参数	| 备注							|
| ---					| ---				| ---			| ---							|
| 加载中插槽		| loading		|-				| 加载中展示内容		|
| 加载失败插槽	| error			|-				| 加载失败展示内容	|


{{xuyajun}}
