# Button 按钮
基于字体的图标集，包含了大多数常见场景的图标。

{{compatibility}}

## 代码演示

### 基础用法

通过 `code` 属性来指定需要使用的图标，Stellar组件使用iconfont做图标库，地址：
[https://at.alicdn.com/t/c/font_4041637_pivqtx3f1mq.json?spm=a313x.manage_type_myprojects.i1.49.f7ba3a81fFvJ6W&file=font_4041637_pivqtx3f1mq.json](https://at.alicdn.com/t/c/font_4041637_pivqtx3f1mq.json?spm=a313x.manage_type_myprojects.i1.49.f7ba3a81fFvJ6W&file=font_4041637_pivqtx3f1mq.json)
可以直接传入对应的名称来使用。

```html
<ste-icon code="&#e6fa;"></ste-icon>
```

### 图标颜色

通过 `color` 属性来设置图标的颜色。

```html
<ste-icon code="&#xe6fa;" color="#1989fa"></ste-icon>
<ste-icon code="&#xe6fa;" color="#ee0a24"></ste-icon>
```

### 图标大小

通过 `size` 属性来设置图标的尺寸大小， 单位为rpx。
```html
<!--默认size 28-->
<ste-icon code="&#xe6fa;"></ste-icon>
<ste-icon code="&#xe6fa;" size="100"></ste-icon>
```
### 图标粗细

通过 `weight` 属性来设置图标的粗细。
```html
<!--默认weight normal-->
<ste-icon code="&#xe6fa;" ></ste-icon>
<ste-icon code="&#xe6fa;" weight="bold"></ste-icon>
```
### 图标边距

通过 `marginLeft marginRight marginTop marginBottom` 属性来设置图标的边距。
```html
<ste-icon code="&#xe6fa;" marginTop="30"></ste-icon>
<ste-icon code="&#xe6fa;" marginRight="30"></ste-icon>
<ste-icon code="&#xe6fa;" marginBottom="30"></ste-icon>
<ste-icon code="&#xe6fa;" marginLeft="30"></ste-icon>
```
### 内嵌文字

通过 `text` 属性来设置图标的内嵌文字。
```html
<ste-icon code="&#xe6fa;" text="图标"></ste-icon>
```
### 内嵌文字颜色

通过 `textColor` 属性来设置图标的内嵌文字颜色。
```html
<ste-icon code="&#xe6fa;" text="图标" textColor="red"></ste-icon>
```

### 内嵌字体大小

通过 `textSize` 属性来设置图标的内嵌字体大小， 单位为rpx。
```html
<!--默认textSize 24-->
<ste-icon code="&#xe6fa;" text="图标" ></ste-icon>
<ste-icon code="&#xe6fa;" text="图标" textSize="30"></ste-icon>
```

### 内嵌字体粗细

通过 `textWeight` 属性来设置图标的粗细。
```html
<!--默认textWeight normal-->
<ste-icon code="&#xe6fa;" text="图标" ></ste-icon>
<ste-icon code="&#xe6fa;" text="图标" textWeight="bold"></ste-icon>
```

### API
#### Props
|属性名			| 说明					|类型			|默认值	| 可选值		|支持版本	|
| -----			|-----					|-----			|-----	|-----		|-----		|
| code			|图标名称				|String			|-		|		-	|-			|
| color			|图标颜色				|String			|-		|	-		|-			|
| size			|图标大小（单位rpx）		|Number String	|28		|	-		|-			|
| weight		|图标粗细				|Number String	|normal	|normal/bold|-			|
| marginLeft	|左外边距（单位rpx）		|Number String	|0		|	-		|-			|
| marginRight	|右外边距（单位rpx）		|Number String	|0		|	-		|-			|
| marginTop		|上外边距（单位rpx）		|Number String	|0		|	-		|-			|
| marginBottom	|下外边距（单位rpx）		|Number String	|0		|	-		|-			|
| text			|内嵌文字				|String			|-		|	-		|-			|
| textColor		|内嵌文字颜色				|String			|#fff	|	-		|-			|
| textSize		|内嵌字体大小	（单位rpx）	|Number String	|24		|	-		|-			|
| textWeight	|内嵌字体粗细				|String			|normal	|normal/bold|-			|


#### Events
| 属性名| 说明			|类型	|默认值	|可选值	|支持版本	|
| -----	| -----			|-----	|-----	|-----	|-----		|
| click	|图标点击回调事件	|Handler|-		|-		|-			|