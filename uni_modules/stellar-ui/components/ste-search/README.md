# Search 搜索
搜索组件，集成了常见搜索框所需功能。

{{compatibility}}

### 代码演示
**JavaScript**
```javascript
export default {
	data() {
		return {
			value: 'RTX4060Ti',
			hotWords: ['RTX4060', 'RTX4070', 'RTX4080', '小米电视', '华为手机'],
		};
	},
	watch: {
		text(v) {
			console.log('watch', v);
		},
	},
	created() {},
	methods: {
		onInput(v) {
			console.log('input', v);
		},
		onSearch(v) {
			console.log('search', v);
			uni.showToast({
				icon: 'none',
				title: `搜索：${v}`,
			});
		},
		onClick() {
			uni.showToast({
				icon: 'none',
				title: '点击触发',
			});
		},
	},
};
```

#### 基础用法
- 使用`v-model`属性进行输入框内容的双向绑定。
- 使用`placeholder`属性设置输入框的占位符。
- 通过`search`事件可以捕获用户点击`搜索按钮`或`软键盘上的回车`行为，参数为输入的value内容。

```html
<ste-search  v-model="value" placeholder="搜索商品" @search="onSearch" />
```

#### 热词列表
- 可以通过`hotWords`属性传入热词列表。
- 可以通过`interval`属性设置热词切换间隔，单位为毫秒。

```html
<ste-search placeholder="搜索商品" @input="onInput" @search="onSearch" />
<ste-search :hotWords="hotWords" :interval="1000" @input="onInput" @search="onSearch" />
```

#### 隐藏分割线以及按钮
- 可以通过`hiddenLine`属性隐藏分割线
- 可以通过`hiddenBtn`属性隐藏按钮，隐藏按钮时也会隐藏分割线

```html
<ste-search hiddenLine @input="onInput" @search="onSearch" />
<ste-search hiddenBtn @input="onInput" @search="onSearch" />
```
#### 自定义颜色
- 可以通过`border-color`属性设置边框颜色
- 可以通过`background`属性设置背景颜色或者背景图片
- 可以通过`before-icon-color`属性设置左侧图标颜色
- 可以通过`placeholder-color`属性设置占位符颜色
- 可以通过`input-color`属性设置输入框文字颜色
- 可以通过`clear-icon-color`属性设置清除按钮图标颜色
- 可以通过`btn-bg`属性设置搜索按钮背景颜色或者背景图片
- 可以通过`btn-text-color`属性设置搜索按钮文字颜色

```html
<ste-search
	placeholder="搜索商品"
	border-color="#F00"
	background="#000"
	before-icon-color="#a55"
	placeholder-color="#a55"
	input-color="#fff"
	clear-icon-color="#a55"
	btn-bg="#fff"
	btn-text-color="#000"
	@input="onInput"
	@search="onSearch"
/>
```

#### 导航模式
- 可以通过`type`属性设置`nav`开启导航模式；开启后，点击搜索框任意区域都会触发`click`事件，其他功能失效。
```
<ste-search type="nav" @click="onClick" />
```


### API
#### Props
| 属性名			| 说明												| 类型		| 默认值			| 可选值									|支持版本	|
| -----				|-----												|-----		|-----			|-----									|-----		|
| type				| 组件类型											| String	| "default"		| `"default"`:正常搜索<br/>`"nav"`:导航栏	|-			|
| value				| 输入框默认值，支持`v-model`双向绑定					| String	| ""			| -										|-			|
| placeholder		| 占位提示符											| String	| ""			| -										|-			|
| hotWords			| 热词列表											| String[]	| []			| -										|-			|
| interval			| 热词列表自动切换时间间隔，单位`ms`					| Number	| 3000			| -										|-			|
| disabled			| 是否禁用状态										| Boolean	| false			| -										|-			|
| hiddenLine		| 是否隐藏分割线										| Boolean	| false			| -										|-			|
| hiddenBtn			| 是否隐藏按钮，同时也会隐藏分割线						| Boolean	| false			| -										|-			|
| btnText			| 按钮文本内容										| String	| "搜索"			| -										|-			|
| hiddenInput		| 是否隐藏输入框										| Boolean	| false			| -										|-			|
| clearable			| 是否可清空内容										| Boolean	| true			| -										|-			|
| height			| 搜索框高度，单位`rpx`								| Number	| 64			| -										|-			|
| radius			| 圆角弧度，单位`rpx`									| Number	| 32			| -										|-			|
| borderColor		| 边框颜色											| String	| "#EEEEEE66"	| -										|-			|
| background		| 背景，可直接传颜色值，或者`url(...)`格式的图片			| String	|"#FFFFFF"		| -										|-			|| placeholderColor	| 占位符文本颜色	| String| "#BBBBBB"	| -	|-	|
| prefixIconColor	| 前缀图标颜色										| String	| "#BBBBBB"		| -										|-			|
| inputTextColor	| 输入框文本颜色										| String	| "#000000"		| -										|-			|
| clearIconColor	| 清除图标颜色										| String	| "#BBBBBB"		| -										|-			|
| btnTextColor		| 搜索按钮文本颜色，分割线会跟随文本颜色变化				| String	| "#0090FF"		| -										|-			|
| btnBackground		| 搜索按钮背景，可直接传颜色值，或者`url(...)`格式的图片	| String	| -				| -										|-			|



#### Events
您可以通过监听`input`事件，在回调中将返回的结果绑定一个变量去获得用户的输入内容。
但如"基本使用"中的说明一样，您双向绑定了一个变量后，无需监听`input`事件也是可以的。
| 事件名| 说明																														| 回调参数					| 支持版本	|
|-----	|-----																													|-----						|-----		|
| input	| 监听用户输入事件																								| value: 输入框的值	| -				|
| search| 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发	| value: 输入框的值	| -				|
| focus	| 输入框获取焦点时触发																							| value: 输入框的值	| -				|
| blur	| 输入框失去焦点时触发																							| value: 输入框的值	| -				|
| clear	| 配置了clearabled后，清空内容时会发出此事件												| -								| -				|
| click	| 点击任意区域触发																								| value: 输入框的值	| -				|

{{xuyajun}}
