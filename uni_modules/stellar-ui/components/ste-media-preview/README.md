# MediaPreview 媒体预览

用于页面上显示价格的组件

{{compatibility}}

### 代码演示
#### 基础用法
- `show`属性控制是否展示预览弹窗，支持`sync`双向绑定
- `urls`属性为要预览的媒体URL数组
```html
<template>
	<ste-button @click="show = true">基础预览</ste-button>
	<view style="width: 100%">
		<ste-media-preview :urls="medias" :show.sync="show" />
	</view>
</template>

<script>
export default{
	data(){
		return{
			medias: [
				'https://image.whzb.com/chain/StellarUI/图片.jpg',
				'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
				'https://image.whzb.com/chain/StellarUI/验证码背景.png',
				'https://image.whzb.com/chain/StellarUI/bg4.jpg',
				'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
				'https://image.whzb.com/chain/StellarUI/bg3.jpg',
			],
			show: false,
		}
	}
}
</script>
```

#### 自动轮播
- `autoplay`属性控制自动轮播间隔时间，单位为毫秒，为`0`时不轮播
```html
<template>
	<ste-button @click="show1 = true">自动轮播</ste-button>
	<view style="width: 100%">
		<ste-media-preview :urls="medias" :show.sync="show1" :autoplay="3000" />
	</view>
</template>

<script>
export default{
	data(){
		return{
			show1: false,
		}
	}
}
</script>
```
#### 前后衔接循环播放
- `loop`属性可开启前后衔接循环播放
```html
<template>
	<ste-button @click="show2 = true">自动轮播</ste-button>
	<view style="width: 100%">
		<ste-media-preview :urls="medias" :show.sync="show2" loop />
	</view>
</template>

<script>
export default{
	data(){
		return{
			show2: false,
		}
	}
}
</script>
```
#### 默认展示下标为2的媒体资源
- `index`属性可控制从第几页开始展示
```html
<template>
	<ste-button @click="show3 = true">自动轮播</ste-button>
	<view style="width: 100%">
		<ste-media-preview :urls="medias" :show.sync="show3" :index="2" />
	</view>
</template>

<script>
export default{
	data(){
		return{
			show3: false,
		}
	}
}
</script>
```
#### 隐藏左下角索引标签
- `showIndex`属性可控制左下角页签显示
```html
<template>
	<ste-button @click="show4 = true">自动轮播</ste-button>
	<view style="width: 100%">
		<ste-media-preview :urls="medias" :show.sync="show4" :showIndex="false" />
	</view>
</template>

<script>
export default{
	data(){
		return{
			show4: false,
		}
	}
}
</script>
```
#### 双指缩放
- `scale`属性可开启双指缩放功能
```html
<template>
	<ste-button @click="show5 = true">自动轮播</ste-button>
	<view style="width: 100%">
		<ste-media-preview :urls="medias" :show.sync="show5" scale />
	</view>
</template>

<script>
export default{
	data(){
		return{
			show5: false,
		}
	}
}
</script>
```
#### 长按触发事件
- 事件`longpress`在用户长按时触发
```html
<template>
	<ste-button @click="show6 = true">自动轮播</ste-button>
	<view style="width: 100%">
		<ste-media-preview :urls="medias" :show.sync="show6" @longpress="onLongpress" />
	</view>
</template>

<script>
export default{
	data(){
		return{
			show6: false,
		}
	},
	methods:{
		onLongpress(index) {
			uni.showToast({
				title: `长按了第【${index + 1}】个媒体资源`,
				icon: 'none',
			});
		},
	}
}
</script>
```
#### 关闭前/后事件
- 事件`beforeClose`在关闭前被触发
- 事件`close`在关闭后被触发
```html
<template>
	<ste-button @click="show7 = true">自动轮播</ste-button>
	<view style="width: 100%">
		<ste-media-preview :urls="medias" :show.sync="show7" @beforeClose="onBeforeClose" @close="onClose" />
	</view>
</template>

<script>
export default{
	data(){
		return{
			show7: false,
		}
	},
	methods:{
		onBeforeClose(stop, next, prevent) {
			stop();
			uni.showModal({
				title: '确定关闭弹窗吗？',
				success({ cancel, confirm }) {
					if (confirm) {
						console.log('点了确定');
						next();
					}
					if (cancel) {
						console.log('点了取消');
						prevent();
					}
				},
				fail() {
					prevent();
				},
			});
		},
		onClose() {
			uni.showToast({
				title: '弹窗关闭了',
				icon: 'none',
			});
		},
	}
}
</script>
```



### API
#### Props

| 属性名			| 说明																| 类型							| 默认值		| 可选值	| 支持版本	|
| ---					| ---																| ---							| ---			| ---		| ---			|
| `show`			| 是否显示														| `Boolean`				| `false`	| -			| -				|
| `urls`			| 预览的媒体URL数组									| `Array<string>`	| `[]`		| -			| -				|
| `autoplay`	| 自动轮播时长，为0不自动轮播，单位ms	| `Number`				| `0`			| -			| -				|
| `loop`			| 是否前后衔接播放										| `Boolean`				| `false`	| -			| -				|
| `index`			| 默认展示的资源下标									| `Number`				| `0`			| -			| -				|
| `showIndex`	| 是否显示左下角索引									| `Boolean`				| `true`	| -			| -				|
| `scale`			| 是否支持双指缩放										| `Boolean`				| `false`	| -			| -				|

#### Event

|事件名					|说明				|事件参数							|支持版本	|
|---						|---				|---									|---			|
| `beforeClose`	| 关闭前触发	| -										| -				|
| `close`				| 关闭后触发	| -										| -				|
| `change`			| 切换时触发	| `index`:切换后的下标	| -				|
| `longpress`		| 长按时触发	| `index`:当前下标			| -				|


{{xuyajun}}
