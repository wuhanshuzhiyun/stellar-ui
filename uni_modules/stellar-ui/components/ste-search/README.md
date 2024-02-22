# Search 搜索
搜索组件，集成了常见搜索框所需功能，用户可以一键引入，开箱即用。

### 兼容性
#### VUE支持 
|VUE2        | VUE3        |
|---        |---        |
|√                | ×                |
#### 平台支持
|App|H5应用	|微信小程序	|支付宝小程序	|百度小程序	|字节小程序	|QQ小程序	|
|:-:|:-:		|:-:			|:-:				|:-:			|:-:			|:-:			|
|x	|×			|√				|×					|×				|×				|×				|

### 基本使用
- 通过`placeholder`参数设置占位内容。
- 通过`v-model`双向绑定一个变量值，设置初始化时搜索框的值，如果初始内容为空，那么请绑定一个值为空字符的变量。

**说明:** 因为是双向绑定的，所以当组件内容输入框内容变化时，也会实时的反映到绑定的`keyword`变量，这意味着，您无需监听`change`事件， 也能实时的得知输入框的内容。

```html
<template>
	<ste-search placeholder="请搜索" v-model="keyword"></ste-search>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '手机'
			}
		}
	}
</script>
```

### 设置输入框形状
通过`shape`设置输入框两端的形状，`square`-方形带圆角，`round`(默认)-半圆形
```html
<ste-search shape="round"></ste-search>
```

### 是否开启清除控件
`clearabled`(默认为`true`)设置为`true`的话，输入框有内容时，右边会显示一个清除的图标
```html
<ste-search :clearabled="true"></ste-search>
```

### 是否开启右边控件
该控件为类似按钮形式，可以设置为"搜索"或者"取消"等内容
- `showAction`配置是否开启右边按钮控件
- `actionText`配置控件内容

> 右侧控件的默认文字为"搜索"(它本意为控件，碰巧内容为"搜索"二字，并非说它就是一个搜索按钮)，点击它的时候触发的是`custom`事件，而不是`search`事件

```html
<ste-search :showAction="true" actionText="搜索" ></ste-search>
```

### 自定义样式
- 通过`inputAlign`设置输入框内容的对其方式，和`css`的`text-align`同理
- 通过`borderColor`设置整个搜索组件的边框，只要配置了颜色，才会出现边框
- 通过`height`设置组件高度
- 通过`disabled`设置是否禁用输入框
- 通过`bgColor`设置是搜索组件背景颜色
```html
<ste-search inputAlign="center" height="70"></ste-search>
```

### API
#### Props
| 参数				| 说明																				| 类型		| 默认值			| 可选值			|说明	|
|---				|---																				|---		|---			|---			|---	|
| v-model			| 双向绑定输入框搜索值																| String	| -				| -				|		|
| shape				| 搜索框形状，round-圆形，square-方形													| String	| round			| square		|		|
| bgColor			| 搜索框背景颜色																		| String	| #f2f2f2		| -				|		|
| placeholder		| 占位文字内容																		| String	| 请输入关键字	| -				|		|
| clearabled		| 是否启用清除控件																	| Boolean	| true			| false			|		|
| focus				| 是否自动获得焦点																	| Boolean	| false			| true			|		|
| showAction		| 是否显示右侧控件(右侧的"搜索"按钮)													| Boolean	| true			| false			|		|
| actionStyle		| 右侧控件的样式，对象形式															| Object	| -				| -				|		|
| actionText		| 右侧控件文字																		| String	| 搜索			| -				|		|
| inputAlign		| 输入框内容水平对齐方式																| String	| left			| center / right|		|
| inputStyle		| 自定义输入框样式，对象形式															| Object	| -				| -				|		|
| disabled			| 是否启用输入框																		| Boolean	| false			| true			|		|
| borderColor		| 边框颜色，配置了颜色，才会有边框													| String	| transparent	| -				|		|
| searchIconColor	| 搜索图标的颜色，默认同输入框字体颜色												| String	| #909399		| -				|		|
| searchIconSize	| 搜索图标的大小																		| Number	| 22			| -				|		|
| color				| 输入框字体颜色																		| String	| #606266		| -				|		|
| placeholderColor	| placeholder的颜色																	| String	| #909399		| -				|		|
| searchIcon		| 输入框左侧的图标，可以为uView图标名称或图片路径										| String	| search		| -				|		|
| margin			| 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30rpx"、"30rpx 20rpx"等写法	| String	| 0				| -				|		|
| value				| 输入框初始值																		| String	| -				| -				|		|
| maxlength			| 输入框最大能输入的长度，-1为不限制长度												| String \	| Number		| -1			| -		|
| height			| 输入框高度，单位rpx																| String \	| Number		| 64			| -		|
| label				| 搜索左侧文本信息																	| String \	| Number		| -				| -		|


#### Events
您可以通过监听`change`事件，在回调中将返回的结果绑定一个变量去获得用户的输入内容。
但如"基本使用"中的说明一样，您双向绑定了一个变量后，无需监听`change`事件也是可以的。
| 属性名         | 说明                                   | 事件参数类型 | 参数说明                 |
|--------------|----------------------------------------|--------------|--------------------------|
| input        | 输入触发事件                           | string       | 输入框的文本             |
| search       | 点击搜索按钮触发事件                   | string       | 输入框的文本             |
| navAddress   | 导航事件当typeStyle值为2时，点击任意区域触发 | -          | -                        |

