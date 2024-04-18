# MediaPreview 媒体预览

用于页面上显示价格的组件

{{compatibility}}

### 代码演示
#### 金额单位
- 默认金额单位为分，会将`value`值除以`100`
- 金额单位为元时，`valueUnit`赋值`yuan`，此时将只显示元的部分
```html
<ste-price value="9527" />
<ste-price value="9527" valueUnit="yuan"/>
```


### API
#### 组件属性(Props)

| 属性名			| 说明											| 类型				| 默认值			| 可选值																| 支持版本	|
| ---				| ---											| ---				| ---			| ---																| ---		|
| `value`			| 金额											| `Number/String`	| `0`			| -																	| -			|

{{xuyajun}}
