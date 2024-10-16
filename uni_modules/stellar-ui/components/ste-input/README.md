# Input 输入框

{{compatibility}}

### 代码演示
#### 文本输入框
- 通过`value`给输入框初始值
- 支持通过`v-model`双向绑定
```html
<ste-input value="输入"/>
```

#### 密码输入框
```html
<ste-input type="password" />
``` 

#### 数字输入框
```html
<ste-input type="number" />
``` 

#### 占位符
- 支持`placeholderStyle`给占位符指定样式
- 支持`placeholderClass`给占位符指定类名
> 非H5平台上需要在类名前添加`/deep/`才生效
```html
<ste-input placeholder="请输入" />
<ste-input placeholder="请输入" placeholderStyle="color: #f00" />
<ste-input placeholder="请输入" placeholderClass="my-input-holder" />
```

#### 禁用&只读
```html
<ste-input disabled value="禁用" />
<ste-input readonly value="只读" />
<ste-input disabled shape="line" value="禁用" />
<ste-input shape="line" readonly value="只读" />
```

#### 字数统计
- `showWordLimit`值为`true`时在右下角显示字数统计
- 当`type`值为`textarea`并且`maxlength`大于0时才会显示
```html
<ste-input type="textarea" :maxlength="140" showWordLimit />
<ste-input shape="line" type="textarea" :maxlength="140" showWordLimit />
```

#### 焦点
通过 `focus`值来控制输入框的焦点，支持双向绑定
```html
<ste-input :focus.sync="focus"/>
```

#### 文本对齐方式
```html
<ste-input placeholder="请输入" inputAlign="center" />
<ste-input placeholder="请输入" inputAlign="right" />
```

#### 输入框字体
```html
<ste-input value="字体大小" fontSize="36" />
<ste-input value="字体颜色" fontColor="#f00" />
```

#### 输入框形状
```html
<ste-input shape="circle" />
<ste-input shape="line" />
```

#### 输入框边框
```html
<ste-input border />
<ste-input border borderColor="#f00" />
```

#### 背景色
```html
<ste-input background="linear-gradient(to right, #aaaaaa, #aaa000)" />
<ste-input background="https://image.whzb.com/chain/StellarUI/背景1.png" />
```

#### 前后插槽
```html
<ste-input placeholder="请输入内容" confirmType="next" rootClass="root-my-input" shape="line">
	<view slot="prefix" style="margin-right: 28rpx">
		<ste-icon code="&#xe68c;" size="28" />
		<text>文本</text>
	</view>
	<view slot="suffix">
		<ste-icon code="&#xe672;" size="28" />
	</view>
</ste-input>
```

### API
#### 组件属性(Props)

|属性名				|说明														|类型				|默认值				|可选值																																																															|支持版本		|
|---				|---														|---				|---				|---																																																															|---		|
| `value`			| 初始内容，支持双向绑定										| `String/Number`	| -					| -																																																																| -			|
| `type`			| 输入框类型													| `String`			| `text`			| text 纯文本输入<br/>textarea 文本域<br/>tel 电话输入<br/>number 数字输入<br/>idcard 身份证输入键盘<br/>digit-带小数点的数字键盘<br/>password 密码类型<br/>nickname 昵称输入(微信小程序)<br/>numberpad(支付宝小程序)<br/>digitpad(支付宝小程序)<br/>idcardpad(支付宝小程序)<br/>	| -			|
| `placeholder`		| 占位符														| `String`			| -					| -																																																																| -			|
| `placeholderStyle`| 指定placeholder的样式										| `String`			| -					| -																																																																| -			|
| `placeholderClass`| 指定placeholder的类											| `String/Number`	| -					| -																																																																| -			|
| `disabled`		| 是否禁用													| `Boolean`			| `false`			| -																																																																| -			|
| `clearable`		| 是否可清除													| `Boolean`			| `true`			| -																																																																| -			|
| `maxlength`		| 最大长度													| `Number`			| `-1`(不限制长度)	| -																																																																| -			|
| `showWordLimit`	| 是否显示输入字数统计，只在type ="textarea"时有效				| `Boolean`			| `false`			| -																																																																| -			|
| `confirmType`		| 设置右下角按钮的文字											| `String`			| `done`			| send：右下角按钮为“发送”<br/>search：右下角按钮为“搜索”<br/>next：右下角按钮为“下一个”<br/>go：右下角按钮为“前往”<br/>done：右下角按钮为“完成”																														| -			|
| `focus`			| 获取焦点，支持双向绑定										| `Boolean`			| `false`			| -																																																																| -			|
| `inputAlign`		| 输入框内容对齐方式（光标对齐和文本对齐一致）						| `String`			| `left`			|left(居左)<br/>right(居右)<br/>center(居中)																																																						| -			|
| `fontSize`		| 输入框字体大小，单位rpx										| `String/Number`	| `24`				| -																																																																| -			|
| `fontColor`		| 输入框字体颜色												| `String`			| `#000000`			| -																																																																| -			|
| `readonly`		| 是否只读，与禁用不同，只读不会置灰								| `Boolean`			| `false`			| -																																																																| -			|
| `shape`			| 输入框形状													| `String`			| `square`			| line 线性<br/>circle 圆形<br/>square 方形																																																						| -			|
| `border`			| 是否有边框													| `Boolean`			| `false`			| -																																																																| -			|
| `borderColor`		| 边框颜色													| `String`			| -					| -																																																																| -			|
| `background`		| 输入框背景													| `String`			| -					| -																																																																| -			|
| `rootClass`		| 自定义输入框类名												| `String`			| -					| -																																																																| -			|
| `cursorSpacing`	| 指定光标与键盘的距离											| `Number`			| 0					| -																																																																| -			|
| `allowSpace`		| 是否允许输入空格（为`false`时输入事件的返回值会去掉所有的空格）	| `Boolean`			| `true`			|-																																																																| -			|

#### 组件事件(Events)

|事件名		|说明					|	事件参数		|支持版本	|
|---		|---					|---			|---		|
| `blur`	| 输入框失去焦点时触发		| value：内容值	| -			|
| `focus`	| 输入框聚焦时触发		| value：内容值	| -			|
| `confirm`	| 点击键盘右下角按钮时触发	| value：内容值	| -			|
| `change`	| 内容发生变化触发此事件	| value：内容值	| -			|
| `clear`	| 点击清空内容			| -				| -			|
| `input`	| 内容输入事件			| value：内容值	| -			|

#### 组件插槽(Slots)

|插槽名		|说明			|插槽参数	|支持版本	|
|---		|---			|---		|---		|
| `prefix`	| 输入框前置内容	| -			| -			|
| `suffix`	| 输入框后置内容	| -			| -			|

{{fuyuwei}}