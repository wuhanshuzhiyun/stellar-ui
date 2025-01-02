# RichText 富文本

富文本，增加文本换行功能，解决两张图片中间有空隙的问题。

---$

#### 一张图片

```html
<ste-rich-text :text="node1"></ste-rich-text>
```

#### 两张图片

```html
<ste-rich-text :text="node2"></ste-rich-text>
```

---$
### API

#### Props

|属性名			|说明			|类型		|默认值		|可选值																							| 支持版本	|
| ---			|---			| ---		| ---		| ---																							| ---		|
| `text`		| 富文本值		| `String`	| -			| -																								| -			|
| `space`		| 显示连续空格	| `String`	| `"nbsp"`	| `"ensp"`：中文字符空格一半大小 <br/> `"emsp"`：中文字符空格大小<br/>`"nbsp"`：根据字体设置的空格大小	| -			|
| `userSelect`	| 文本是否可选	| `Boolean`	| `false`	| -																								| -			|

---$
{{zyy}}
