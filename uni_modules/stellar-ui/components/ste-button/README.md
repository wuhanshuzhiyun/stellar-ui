# Button 按钮
该组件内部实现以uni-app的```button```组件为基础，进行二次封装，主要区别在于：
- 按钮```type```值有更多的主题颜色
- 按钮```size```值有更多的尺寸可选

### 兼容性
#### VUE支持 
|VUE2        | VUE3        |
|---        |---        |
|√                | ×                |
#### 平台支持
|App|H5应用	|微信小程序	|支付宝小程序	|百度小程序	|字节小程序	|QQ小程序	|
|:-:|:-:	|:-:		|:-:			|:-:		|:-:		|:-:		|
|x	|×		|√			|×				|×			|×			|×			|


### 代码演示
#### 按钮类型

```html
<ste-button >默认按钮</ste-button>
<ste-button type="success" >成功按钮</ste-button>
<ste-button type="error" >危险按钮</ste-button>
<ste-button type="primary" >主要按钮</ste-button>
<ste-button type="warning" >警告按钮</ste-button>
```

#### 镂空按钮

```html
<ste-button plain>镂空按钮</ste-button>
<ste-button plain type="success" >成功按钮</ste-button>
<ste-button plain type="error" >危险按钮</ste-button>
<ste-button plain type="primary" >主要按钮</ste-button>
<ste-button plain type="warning" >警告按钮</ste-button>
```

#### 禁用按钮

```html
<ste-button disabled>禁用按钮</ste-button>
<ste-button disabled type="success" >成功按钮</ste-button>
<ste-button disabled type="error" >危险按钮</ste-button>
<ste-button disabled type="primary" >主要按钮</ste-button>
<ste-button disabled type="warning" >警告按钮</ste-button>
```

#### 按钮形状 & 按钮图标

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

```html
<ste-button size="large" type="success" >超大尺寸</ste-button>
<ste-button size="large" type="error" >普通尺寸</ste-button>
<ste-button size="large" type="primary" >小型尺寸</ste-button>
<ste-button size="large" type="warning" >超小尺寸</ste-button>
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
| 属性名| 说明			|类型			|默认值		| 可选值		|
| ------| -----------	|	-----------	|-----------|-----------|
| click	|按钮点击回调事件	|Handler		|-			|-			|

#### Solts
| 名称		| 说明			|
| ------	| -----------	|
| default	|按钮内容		|