# Button 按钮
- 这是一个基础按钮组件

## 兼容性
#### VUE支持 
|VUE2        | VUE3        |
|---        |---        |
|√                | ×                |
#### 平台支持
|App|H5应用	|微信小程序	|支付宝小程序	|百度小程序	|字节小程序	|QQ小程序	|
|:-:|:-:	|:-:		|:-:			|:-:		|:-:		|:-:		|
|x	|×		|√			|×				|×			|×			|×			|


## 基本使用

```
<ste-button>按钮</ste-button>
```

## 设置按钮的多种形态
- ```mode```值可选有```small```(默认)、```mini```、```middle```、```large```
- ```type```值设置为```line```为线性，设置为```disabled```为禁用
- 通过```backgroundColor```设置背景色或线性按钮线的颜色
- 通过```color```设置文字颜色
```

<template>
	<view style="padding: 20px;">
		<ste-button type="primary" >确定</ste-button>
		<ste-button type="primary" :plain="true" >镂空</ste-button>
		<ste-button type="primary" :plain="true" :hairline="true" >细边</ste-button>
		<ste-button type="primary" :disabled="disabled" >禁用</ste-button>
		<ste-button type="primary" shape="circle" >按钮形状</ste-button>
		<ste-button  color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))">渐变色按钮</ste-button>
		<ste-button type="primary" size="small" >大小尺寸</ste-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			disabled: true
		};
	}
};
</script>


```

## API
### Props
| 属性名	| 说明									|类型			|默认值		| 可选值										|说明			|
| ------	| -----------							|	-----------	|-----------|-----------								|	---------	|
| hairline	|是否显示按钮的细边框						|Boolean		|true		|false										|				|
| type		|按钮的样式类型							|String			|info		|info / primary / error/ warning / success	|				|
| size		|按钮的大小								|String			|normal		|info，primary，error，warning，success		|				|
| shape		|按钮外观形状							|String			|square		|	circle									|				|
| plain		|按钮是否镂空，背景色透明					|Boolean		|false		|true										|				|
| disabled	|是否禁用								|Boolean		|false		|true										|				|
| color		|按钮颜色，支持传入linear-gradient渐变色	|String			|-			|-											|				|

### Events
| 属性名| 说明			|类型			|默认值		| 可选值		|说明			|
| ------| -----------	|	-----------	|-----------|-----------|	---------	|
| click	|按钮点击		|Handler		|-			|-			|				|