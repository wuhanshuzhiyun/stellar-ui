# QRcode 二维码
能够将文本转换生成二维码的组件，支持自定义配色和 Logo 配置

---$

### 代码演示
#### 基础使用
```html
<ste-qrcode content="https://stellar-ui.intecloud.com.cn/mp/index/index" />
```

#### 自定义颜色
```html
<ste-qrcode
	content="https://stellar-ui.intecloud.com.cn/mp/index/index"
	foreground="#c11"
	background="#dad"
/>
```

#### 带logo
```html
<ste-qrcode
	content="https://stellar-ui.intecloud.com.cn/mp/index/index"
	foregroundImageSrc="https://image.whzb.com/chain/StellarUI/logo.png"
/>

```


---$
### API
#### Props
| 参数						| 说明								| 类型		| 默认值		| 可选值	| 支持版本	|
| ---						| ---								| ---		| ---		| ---	| ---		|
| `content`					| 二维码内容							| `String`	| -			| -		| `v1.35.4`			|
| `size`					| 二维码尺寸，单位`px`					| `Number`	| 200		| -		| `v1.35.4`    			|
| `background`				| 背景色								| `String`	| `#fff`	| -		| `v1.35.4`    			|
| `foreground`				| 前景色(二维码画笔颜色)				| `String`	| `#000`	| -		| `v1.35.4`    			|
| `foregroundImageSrc`		| 二维码中间logo图					| `String`	| -			| -		| `v1.35.4`    			|
| `foregroundImageWidth`	| logo图宽度, 默认二维码尺寸的四分之一	| `Number`	| `size/4`	| -		| `v1.35.4`    			|
| `foregroundImageHeight`	| logo图高度, 默认二维码尺寸的四分之一	| `Number`	| `size/4`	| -		| `v1.35.4`    			|

#### Events
|事件名			|说明				|事件参数	|支持版本		|
| ---			| ---				| ---	| ---		|
| `loadImage`	| `二维码获取图片数据`	| `src`	| `v1.35.4`	|

---$
{{fuyuwei}}