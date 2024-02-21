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
		<ste-button mode="large">超大型按钮</ste-button>
		<ste-button mode="middle">中型按钮</ste-button>
		<ste-button mode="small">常规按钮</ste-button>
		<ste-button mode="mini">小型按钮</ste-button>
		
		<ste-button mode="middle">默认按钮</ste-button>
		<ste-button type="line" mode="middle">线性按钮</ste-button>
		<ste-button type="disabled" mode="middle">禁止按钮</ste-button>
		
		<ste-button mode="small" backgroundColor="#FF1E19">领取</ste-button>
		<ste-button type="line" mode="small" backgroundColor="#FF1E19">领取</ste-button>

		<ste-button mode="small" color="#000000">已领完</ste-button>
		<ste-button type="line" mode="small" color="#000000">已领完</ste-button>

		<ste-button
			mode="small"
			backgroundColor="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
		>
			渐变
		</ste-button>
		
		<ste-button mode="middle" :auto="true">自适应宽度</ste-button>
		
		<ste-button mode="middle" :auto="true">
			文字超长-提交-按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮
		</ste-button>
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
| 属性名			| 说明			|类型			|默认值		| 可选值					|说明															|
| ------			| -----------	|	-----------	|-----------|-----------			|	---------													|
| mode				|设置按钮的大小	|String			|middle		|mini / small / large	|																|
| color				|文本颜色		|String			|```#fff```	|-						|																|
| fontWeight		|文本字体字重	|String			|bold		|-						|																|
| marginTop			|上边距			|Number			|0			|						|	给按钮内容添加margin-top，如果垂直无法对齐，使用负值进行对齐	|
| disabled			|是否禁用按钮	|Boolean		|false		|true					|																|
| auto				|是否自适应		|Boolean		|false		|true					|																|
| backgroundColor	|背景颜色		|String			|#0090FF	|-						|																|
| borderRadius		|圆角			|Number			|48			|-						|																|

### Events
| 属性名| 说明			|类型			|默认值		| 可选值		|说明			|
| ------| -----------	|	-----------	|-----------|-----------|	---------	|
| click	|按钮点击		|Handler		|-			|-			|				|