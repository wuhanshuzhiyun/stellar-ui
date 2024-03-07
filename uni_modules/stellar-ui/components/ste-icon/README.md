# Icon 图标
基于字体的图标集，包含了大多数常见场景的图标

{{compatibility}}

## 代码演示

### 基础用法

通过 `code` 属性来指定需要使用的图标，Stellar组件使用[iconfont做图标库](https://at.alicdn.com/t/c/font_4041637_ufl38b5x4g.json?spm=a313x.manage_type_myprojects.i1.24.28273a814UZfaX&file=font_4041637_ufl38b5x4g.json)，
可以直接传入对应的编码来使用

```html
<ste-icon code="&#xe653;"></ste-icon>
```

### 图标颜色

通过 `color` 属性来设置图标的颜色

```html
<ste-icon code="&#xe64b;" color="#1989fa"></ste-icon>
<ste-icon code="&#xe64b;" color="#ee0a24"></ste-icon>
```

### 图标大小

通过 `size` 属性来设置图标的尺寸大小，单位为rpx，默认`28`
```html
<ste-icon code="&#xe628;"></ste-icon>
<ste-icon code="&#xe628;" size="50"></ste-icon>
<ste-icon code="&#xe628;" size="70"></ste-icon>
```

### 图标是否粗体

通过 `bold` 属性来设置图标是否粗体，默认`false`
```html
<ste-icon code="&#xe628;"></ste-icon>
<ste-icon code="&#xe628;" bold></ste-icon>
```

### API
#### Props
|属性名			| 说明				|类型			|默认值	| 可选值	|支持版本	|
| -----			|-----				|-----			|-----	|-----	|-----		|
| `code`		|图标编码			|`String`		|必填	|	-	|-			|
| `color`		|图标颜色			|`String`		|-		|	-	|-			|
| `size`		|图标大小（单位rpx）	|`Number/String`|`28`	|	-	|-			|
| `bold`		|图标是否粗体			|`Boolean`		|`false`|	-	|-			|
| `marginLeft`	|左外边距（单位rpx）	|`Number/String`|`0`	|	-	|-			|
| `marginRight`	|右外边距（单位rpx）	|`Number/String`|`0`	|	-	|-			|
| `marginTop`	|上外边距（单位rpx）	|`Number/String`|`0`	|	-	|-			|
| `marginBottom`|下外边距（单位rpx）	|`Number/String`|`0`	|	-	|-			|


#### Events
| 属性名	| 说明			|类型		|默认值	|可选值	|支持版本	|
| -----		| -----			|-----		|-----	|-----	|-----		|
| `click`	|图标点击回调事件	|`Handler`	|-		|-		|-			|

{{zyy}}

{{qinpengfei}}