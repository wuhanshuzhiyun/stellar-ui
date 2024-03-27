# Input 输入框

{{compatibility}}

### 代码演示
#### 属性
属性描述

```html
<ste-input />
```

### API
#### 组件属性(Props)

|属性名				|说明												|类型				|默认值				|可选值																																																																		|支持版本	|
|---				|---												|---				|---				|---																																																																		|---		|
| `value`			| 初始内容，支持双向绑定								| `String/Number`	| -					| -																																																																			| -			|
| `type`			| 输入框类型											| `String`			| `text`			| text 纯文本输入<br/>textarea 文本域<br/>tel 电话输入<br/>number 数字输入<br/>idcard 身份证输入键盘<br/>digit-带小数点的数字键盘<br/>password 密码类型<br/>nickname 昵称输入(微信小程序)<br/>numberpad(支付宝小程序)<br/>digitpad(支付宝小程序)<br/>idcardpad(支付宝小程序)<br/>	| -			|
| `placeholder`		| 占位符												| `String`			| -					| -																																																																			| -			|
| `placeholderStyle`| 指定placeholder的样式								| `String`			| -					| -																																																																			| -			|
| `placeholderClass`| 指定placeholder的类								| `String/Number`	| -					| -																																																																			| -			|
| `disabled`		| 是否禁用											| `Boolean`			| `false`			| -																																																																			| -			|
| `clearable`		| 是否可清除											| `Boolean`			| `true`			| -																																																																			| -			|
| `maxlength`		| 最大长度											| `Number`			| `-1`(不限制长度)	| -																																																																			| -			|
| `showWordLimit`	| 是否显示输入字数统计，只在type ="textarea"时有效	| `Boolean`			| `false`			| -																																																																			| -			|
| `confirmType`		| 设置右下角按钮的文字								| `String`			| `done`			| send：右下角按钮为“发送”<br/>search：右下角按钮为“搜索”<br/>next：右下角按钮为“下一个”<br/>go：右下角按钮为“前往”<br/>done：右下角按钮为“完成”																														| -			|
| `focus`			| 获取焦点，支持双向绑定								| `Boolean`			| `false`			| -																																																																			| -			|
| `inputAlign`		| 输入框内容对齐方式（光标对齐和文本对齐一致）			| `String`			| `left`			|left(居左)<br/>right(居右)<br/>center(居中)																																																									| -			|
| `fontSize`		| 输入框字体大小，单位rpx								| `String/Number`	| `24`				| -																																																																			| -			|
| `fontColor`		| 输入框字体颜色										| `String`			| `#000000`			| -																																																																			| -			|
| `readonly`		| 是否只读，与禁用不同，只读不会置灰					| `Boolean`			| `false`			| -																																																																			| -			|
| `shape`			| 输入框形状											| `String`			| `square`			| line 线性<br/>circle 圆形<br/>square 方形																																																									| -			|
| `border`			| 是否有边框											| `Boolean`			| `false`			| -																																																																			| -			|
| `borderColor`		| 边框颜色											| `String`			| -					| -																																																																			| -			|
| `background`		| 输入框背景											| `String`			| -					| -																																																																			| -			|

#### 组件事件(Events)

|事件名		|说明					|	事件参数		|支持版本	|
|---		|---					|---			|---		|
|`blur`		|输入框失去焦点时触发		|value：内容值	|-			|
|`focus`	|输入框聚焦时触发		|value：内容值	|-			|
|`confirm`	|点击键盘右下角按钮时触发	|value：内容值	|-			|
|`change`	|内容发生变化触发此事件	|value：内容值	|-			|
|`clear`	|点击清空内容			|-				|-			|

#### 组件插槽(Solts)

|插槽名	|说明			|插槽参数	|支持版本	|
|---	|---			|---		|---		|
|prefix	|输入框前置内容	|-			|-			|
|suffix	|输入框后置内容	|-			|-			|

{{fuyuwei}}