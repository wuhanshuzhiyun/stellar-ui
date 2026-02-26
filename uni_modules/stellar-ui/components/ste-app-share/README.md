# AppShare 分享
- APP分享组件
- 仅支持APP端

---$

### 代码演示
#### 基础用法
```html
<template>
	<ste-app-share :open="open" @close="open = false" :data="data" :poster="poster" :miniProgram="miniProgram"></ste-app-share>
</template>
<script>
let num = 0;
export default {
	data() {
		return {
			open: false,
			poster: {
				qrcode: 'https://image.whzb.com/chain/StellarUI/头像/邻里购.png',
				background: '#ffffff',
				title: '推荐一个宝贝给你，快来看看吧~',
				message: '请及时购买，价格具有时效性',
			},
			data: {
				price: '100.00',
				image: 'https://image.whzb.com/chain/image/1c/1cd2/1cd27514a2516b146e317fa3b538f4f4/6976279890175-1.jpg',
				name: '中百福嘉白干子 200g/份',
				desc: '豆香浓郁|家常百搭',
			},
			miniProgram: {
				id: 'gh_c9b7b9786694',
				path: 'pages/tabbar/tabbar',
				type: 0,
				webUrl: 'https://image.whzb.com/chain/StellarUI/头像/邻里购.png',
			},
		};
	},
	methods: {
		headOpen() {
			if (num % 2 === 0) {
				this.data.image = 'https://image.whzb.com/chain/image/1c/1cd2/1cd27514a2516b146e317fa3b538f4f4/6976279890175-1.jpg';
			} else {
				this.data.image = 'https://image.whzb.com/chain/StellarUI/image/test.jpg';
			}
			num++;
			this.open = true;
		},
	},
};
</script>
```

---$
### API

| 属性名				| 说明					| 类型						| 默认值																																																								| 可选值	| 支持版本	|
| -----					| -----				| ---						| -------																																																							| ------| --------|
| `open`				| 打开分享			| `boolean`			| `false`																																																							| -			| -				|
| `viewPoster`	| 是否显示海报	| `boolean`			| `true`																																																							| -			| -				|
| `poster`			| 海报参数			| `Poster`			| `{ background: '#ffffff', title: '推荐一个宝贝给你，快来看看吧~', message: '请及时购买，价格具有时效性', qrcode: '' }`	| -			| -				|
| `miniProgram`	| 小程序参数		| `MiniProgram`	| `{ id: '', path: '', type: 0, webUrl: '' }`																																					| -			| -				|
| `data`				| 分享数据			| `Data`				| `{ price: '', image: '', name: '', desc: '' }`																																			| -			| -				|

#### Poster 海报参数
| 属性名			| 说明			| 类型			| 默认值													| 可选值	| 支持版本	|
| -----				| -----		| ---			| -------												| ------| --------|
| `background`| 背景色		| `string`| `#ffffff`											| -			| -				|
| `title`			| 顶部标题	| `string`| `推荐一个宝贝给你，快来看看吧~`	| -			| -				|
| `message`		| 底部提示	| `string`| `请及时购买，价格具有时效性`		| -			| -				|
| `qrcode`		| 二维码		| `string`| -															| -			| -				|

#### MiniProgram 小程序参数
| 属性名	| 说明																																	| 类型			| 默认值		| 可选值	| 支持版本	|
| -----		| -----																																| ---			| -------	| ------| --------|
| `id`		| 微信小程序原始id																											| `string`| -				| -			| -				|
| `path`	| 点击链接进入的页面																										| `string`| -				| -			| -				|
| `type`	| 微信小程序版本类型，可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0	| `string`| `0`			| -			| -				|
| `webUrl`| 兼容低版本的网页链接																									| `string`| -				| -			| -				|

#### Data 分享数据
| 属性名	| 说明			| 类型			| 默认值		| 可选值	| 支持版本	|
| -----		| -----		| ---			| -------	| ------| --------|
| `price`	| 价格			| `string`| -				| -			| -				|
| `image`	| 图片链接	| `string`| -				| -			| -				|
| `name`	| 商品名称	| `string`| -				| -			| -				|
| `desc`	| 商品描述	| `string`| -				| -			| -				|

---$
{{xuyajun}}