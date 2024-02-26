# Button 按钮
该组件内部实现以uni-app的```button```组件为基础，进行二次封装，主要区别在于：
- 按钮```type```值有更多的主题颜色
- 按钮```size```值有更多的尺寸可选

{{compatibility}}


### 代码演示
#### 按钮类型
通过`type`设置按钮的类型，主要区别是按钮的颜色，默认值是`info`
```html
<ste-button >默认按钮</ste-button>
<ste-button type="success" >成功按钮</ste-button>
<ste-button type="error" >危险按钮</ste-button>
<ste-button type="primary" >主要按钮</ste-button>
<ste-button type="warning" >警告按钮</ste-button>
```

#### 镂空按钮
通过`plain`设置按钮是否镂空，默认值是`false`
```html
<ste-button plain>镂空按钮</ste-button>
<ste-button plain type="success" >成功按钮</ste-button>
<ste-button plain type="error" >危险按钮</ste-button>
<ste-button plain type="primary" >主要按钮</ste-button>
<ste-button plain type="warning" >警告按钮</ste-button>
```

#### 禁用按钮
通过`disabled`设置按钮是否禁用，默认值是`false`
```html
<ste-button disabled>禁用按钮</ste-button>
<ste-button disabled type="success" >成功按钮</ste-button>
<ste-button disabled type="error" >危险按钮</ste-button>
<ste-button disabled type="primary" >主要按钮</ste-button>
<ste-button disabled type="warning" >警告按钮</ste-button>
```

#### 按钮形状 & 按钮图标
- 通过`shape`设置按钮的形状，`square`(默认)方形带圆角，`circle`半圆形
- 通过自定义按钮内部的内容来实现自定义图标
```html
<ste-button type="warning" plain shape="circle">
	<ste-icon code="&#xe63b;" color="#f9ae3d" />
	<text style="margin-left: 8px">按钮图标</text>
</ste-button>

<ste-button type="success" plain shape="circle" >按钮形状</ste-button>
```

#### 自定义颜色
```html
<ste-button color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))">渐变色按钮</ste-button>
<ste-button color="linear-gradient(to right, rgb(220, 194, 11), rgb(4, 151, 99))">渐变色按钮</ste-button>
<ste-button color="rgb(10, 185, 156)"">青绿色按钮</ste-button>
```

#### 自定义大小
通过`size`设置按钮的大小，默认值是`normal`
```html
<ste-button size="large" type="success" >超大尺寸</ste-button>
<ste-button size="normal" type="error" >普通尺寸</ste-button>
<ste-button size="small" type="primary" >小型尺寸</ste-button>
<ste-button size="mini" type="warning" >超小尺寸</ste-button>
```

### API
#### Props
| 属性名		|说明									|类型		|默认值		|可选值										|
| -----------	|-----------							|-----------|-----------|-----------								|
| hairline		|是否显示按钮的细边框						|Boolean	|true		|true / false								|
| type			|按钮的样式类型							|String		|info		|info / success / error/ primary / warning	|
| size			|按钮的大小								|String		|normal		|large / normal / small / mini				|
| shape			|按钮外观形状								|String		|square		|circle / square							|
| plain			|按钮是否镂空，背景色透明					|Boolean	|false		|true / false								|
| disabled		|是否禁用								|Boolean	|false		|true / false								|
| color			|按钮颜色，支持传入linear-gradient渐变色	|String		|-			|-											|

#### Events
| 事件名| 说明			|类型			|默认值		| 可选值		|
| ------| -----------	|	-----------	|-----------|-----------|
| click	|按钮点击回调事件	|Handler		|-			|-			|

#### Solts
| 名称		| 说明			|
| ------	| -----------	|
| default	|按钮内容		|