# Popup 弹出层

---$

### 代码演示
#### 基础使用
- 通过属性`show`来控制弹出层的显隐，使用`sync`修饰符来双向绑定
- 弹出位置支持上(`top`)、下(`bottom`)、左(`left`)、右(`right`)、中(`center`)，默认弹出位置为中(`center`)
```
<ste-popup :show.sync="show" width="300" height="300">
	<view class="popup-content"></view>
</ste-popup>
<ste-popup :show.sync="showTop" height="300" width="100vw" position="top">
	<view class="popup-content">上</view>
</ste-popup>
<ste-popup :show.sync="showBottom" height="300" width="100vw" position="bottom">
	<view class="popup-content">下</view>
</ste-popup>
<ste-popup :show.sync="showLeft" width="300" height="100vh" position="left">
	<view class="popup-content">左</view>
</ste-popup>
<ste-popup :show.sync="showRight" width="300" height="100vh" position="right">
	<view class="popup-content">右</view>
</ste-popup>
```

#### 背景色
```
<ste-popup :show.sync="bgShow" width="300" height="300" backgroundColor="#eff3dd">
	<view class="popup-content">背景色</view>
</ste-popup>
```

#### 大小
- 默认弹出层的内容区域是没有高度的，如果不设置宽高则会由内容撑开
- 支持具体数值(单位为rpx)、百分比
```
<ste-popup :show.sync="sizeShow1" width="300" height="500">
	<view class="popup-content">300*500</view>
</ste-popup>
<ste-popup :show.sync="sizeShow2" width="100vw" height="300">
	<view class="popup-content">100vw*300</view>
</ste-popup>
```


#### 圆角
- 若组件圆角不满足需求，可以不设置圆角，在插槽内容中自己设置圆角
```
<ste-popup :show.sync="roundShow" width="300" height="300" round>
	<view class="popup-content">圆角</view>
</ste-popup>
```

#### 偏移
```
<ste-popup :show.sync="offsetShow" width="300" height="300" offsetX="50" offsetY="-50">
	<view class="popup-content">偏移</view>
</ste-popup>
```


#### 是否遮罩关闭
默认可点击遮罩关闭弹窗
```
<ste-popup :show.sync="maskShow1" width="300" height="300">
	<view class="popup-content">遮罩可关闭</view>
</ste-popup>
<ste-popup :show.sync="maskShow2" width="300" height="300" :isMaskClick="false">
	<view class="popup-content">遮罩不可关闭</view>
</ste-popup>
```



#### 动画执行时间
```
<ste-popup :show.sync="durationShow" width="300" height="300" :duration="800">
	<view class="popup-content">动画执行时间</view>
</ste-popup>
```

#### 异步关闭
监听关闭事件，通过执行事件抛出的`allowStop`方法阻止关闭，等待异步操作完成后，当可关闭时再执行`resolve`方法
```
<template>
	<ste-popup :show.sync="syncShow" width="100vw" height="300" @close="syncClose" position="bottom">
		<view class="popup-content">异步关闭</view>
	</ste-popup>
</template>
<script>
export default {
	methods: {
		syncClose(allowStop, resolve) {
			allowStop();
			this.showToast({
				title: '加载中...',
				icon: 'loading',
				duration: 2500,
			});
			setTimeout(() => {
				this.hideToast();
				resolve();
			}, 2000);
		},
	}
}
</script>
```

---$
### API
#### 组件属性(Props)

| 属性名		| 说明										| 类型				| 默认值		| 可选值							| 支持版本	|
| ---			| ---										| ---				| ---		| ---							| ---		|
| `show`		| 是否显示弹出层,使用`sync`修饰符来双向绑定	| `Boolean`			| `false`	| -								| -			|
| `backGround`	| 内容容器的背景色							| `String`			| `#ffffff`	| -								| -			|
| `showMask`	| 是否显示遮罩								| `Boolean`			| `true`	| -								| -			|
| `isMaskClick`	| 是否可以点击遮罩层关闭						| `Boolean`			| `true`	| -								| -			|
| `width`		| 内容区宽度									| `Number/String`	| `auto`	| -								| -			|
| `height`		| 内容区高度									| `Number/String`	| `auto`	| -								| -			|
| `position`	| 弹出位置									| `String`			| `center`	| `top` `bottom` `left` `right`	| -			|
| `round`		| 是否圆角									| `Boolean`			| `false`	| -								| -			|
| `showClose`	| 是否右上角显示关闭图标						| `Boolean`			| `true`	| -								| -			|
| `offsetX`		| 根据弹出位置，设置X轴偏移量，单位px			| `Number/String`	| `0`		| -								| -			|
| `offsetY`		| 根据弹出位置，设置Y轴偏移量，单位px			| `Number/String`	| `0`		| -								| -			|
| `duration`	| 动画持续时间								| `Number`			| `200`		| -								| -			|
| `zIndex`		| 弹窗层级z-index							| `Number`			| `1000`	| -								| -			|
| `keepContent`	| 隐藏后是否不销毁弹窗内容元素				| `Boolean`			| `true`	| -								| `v1.10.1`	|

#### 组件事件(Events)

| 事件名		| 说明						| 事件参数																		|支持版本	|
|---			|---						|---																			|---		|
| `close`		| 关闭弹框时触发(可拦截关闭)	| `value`:当前的绑定值,`alowStop`:允许阻止后续的事件触发,`resolve`:后续的事件执行	|-			|
| `open-after`	| 打开弹框动画结束后触发		| -																				| `v1.10.1`	|
| `clickMask`	| 点击遮罩时触发				| -																				|-			|


#### 组件插槽(Slots)

|插槽名		|说明			|插槽参数	|支持版本	|
|---		|---			|---		|---		|
| default	| 内容部分插槽	|-			|-			|

---$
{{fuyuwei}}