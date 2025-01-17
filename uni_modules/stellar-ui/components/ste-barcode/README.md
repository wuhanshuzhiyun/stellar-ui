# Barcode 条形码
能够将数字和字母转换生成条形码的组件，支持自定义配色

---$

### 代码演示
#### 基础使用
```html
<ste-barcode content="123456abc123" />
```

#### 自定义颜色
```html
<ste-barcode content="123456abc123" foreground="#c11" background="#dad" />
```



---$
### API
#### Props
| 参数			| 说明					| 类型		| 默认值	| 可选值	| 支持版本	|
| ---			| ---					| ---		| ---	| ---	| ---		|
| `content`		| 条形码内容				| `String`	| -		| -		| `v1.35.4`    			|
| `width`		| 条形码宽度，单位`px`		| `Number`	| 300	| -		| `v1.35.4`    			|
| `height`		| 条形码高度，单位`px`		| `Number`	| 100	| -		| `v1.35.4`    			|
| `background`	| 背景色					| `String`	| `#fff`| -		| `v1.35.4`    			|
| `foreground`	| 前景色(条形码画笔颜色)	| `String`	| `#000`| -		| `v1.35.4`    			|

#### Events
|事件名			|说明								|事件参数	|支持版本		|
| ---			| ---								| ---	| ---		|
| `loadImage`	| `加载完成后返回条形码对应的图片数据`	| `src`	| `v1.35.4`	|

---$
{{fuyuwei}}