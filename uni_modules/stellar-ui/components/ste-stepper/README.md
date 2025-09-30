# Stepper 步进器

步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。

---$

### 代码演示
JavaScript后面的演示代码中涉及到的变量和方法都使用本javasaript代码
```javascript
export default {
	data() {
		return {
			value1: 10,
			value2: 7,
			value3: 2,
			value4: 5.8,
			value5: 5,
			value6: 6,
			value7: 7,
			value8: 8,
			value9: 9,
			value10: 10,
			value11: 11,
			value12: 12,
			value13: 13,
			value14: 14,
			value15: 15,
			value16: 16,
			value17: 17,
			value18: 18,
			value19: 19,
		};
	},
	methods: {
		blur(event) {
			this.showToast({
				icon: 'none',
				title: `失焦事件`,
			});
		},
		focus() {
			this.showToast({
				icon: 'none',
				title: `聚焦事件`,
			});
		},
		click1(value) {
			this.showToast({
				icon: 'none',
				title: `点击按钮：${value} 输入值`,
			});
		},
		click2(value, allowStop, resolve) {
			this.showToast({
				icon: 'none',
				title: `点击按钮：${value} 输入值`,
			});
			// 阻止change事件
			allowStop();
		},
		change(value) {
			setTimeout(() => {
				this.showToast({
					icon: 'none',
					title: `改变：${value} 输入值`,
				});
			}, 1000);
		},
	},
};
```

#### 基础用法
通过`value`属性，双向绑定，设置输入值
```
<ste-stepper v-model="value1"></ste-stepper>
```

#### 限制输入范围
通过 `min` 和 `max` 属性限制输入值的范围，默认超出范围后会自动校正最大值(默认值：`Infinity`)或最小值(默认值：`0`)
```
<ste-stepper v-model="value2" :min="5" :max="15"></ste-stepper>
```

#### 步长设置
通过 `step` 属性设置每次点击增加或减少按钮时变化的值，默认为 1。
```
<ste-stepper v-model="value3" :step="2"></ste-stepper>
```

#### 数值精度
通过 `precision` 属性设置输入值的小数位，默认为 1。
```
<ste-stepper v-model="value4" :precision="1"></ste-stepper>
```

#### 自定义大小
通过 `inputWidth` 属性设置输入框宽度，通过 `buttonSize` 属性设置按钮大小和输入框高度。
```
<ste-stepper v-model="value5" inputWidth="100" btnSize="70"></ste-stepper>
```

#### 主色
通过 `mainColor` 属性设置步进器的主色，对`theme`为`line`时无效。
```
<ste-stepper v-model="value5" inputWidth="100" btnSize="70"></ste-stepper>
```

#### 禁用
- 通过 `disabled` 属性设置禁用步进器，默认为 `false`。 
- 通过 `disablePlus` 属性设置禁用增加按钮，默认为 `false`。 
- 通过 `disableMinus` 属性设置禁用减少按钮，默认为 `false`。 
- 通过 `disableInput` 属性设置禁用输入框，默认为 `false`。 
```
<ste-stepper v-model="value7" disabled></ste-stepper>
<ste-stepper v-model="value8" disablePlus></ste-stepper>
<ste-stepper v-model="value9" disableInput></ste-stepper>
<ste-stepper v-model="value10" disableMinus></ste-stepper>
```

#### 样式风格：线性风格
通过 `theme` 属性设置步进器的样式风格，设置为线性 `line`，默认为 `card`。
```
<ste-stepper v-model="value11" theme="line"></ste-stepper>
<ste-stepper v-model="value12" theme="line" disabled></ste-stepper>
<ste-stepper v-model="value13" theme="line" disablePlus></ste-stepper>
<ste-stepper v-model="value14" theme="line" disableInput></ste-stepper>
<ste-stepper v-model="value15" theme="line" disableMinus></ste-stepper>
```

---$
### API
#### 组件属性(Props)

| 参数			| 说明																| 类型				| 默认值								| 可选值																								| 支持版本	|
| ---			| ---																| ---				| ---								| ---																								| ---		|
| `value`		| 当前输入的值，支持双向绑定											| `Number`			| `1`								| -																									| -			|
| `min`			| 最小值																| `Number`			| `0`								| -																									| -			|
| `max`			| 最大值																| `Number`			| `Infinity`						| -																									| -			|
| `step`		| 步长，每次加或减的值													| `Number`			| `1`								| -																									| -			|
| `precision`	| 数值精度															| `Number`			| `0`								| -																									| -			|
| `inputWidth`	| 输入框宽度，默认单位为`rpx`											| `Number/String`	| `64`								| -																									| -			|
| `btnSize`		| 按钮大小以及输入框高度，默认单位为`rpx`,`theme`为`line`时 高为宽的80%	| `Number/String`	| `card` : `48`	</br> `line` : `60`	| -																									| -			|
| `mainColor`	| 主色，对`theme`为`line`时无效										| `String`			| `#0090FF`							| -																									| -			|
| `disabled`	| 是否禁用步进器														| `Boolean`			| `false`							| -																									| -			|
| `disablePlus`	| 是否禁用增加按钮														| `Boolean`			| `false`							| -																									| -			|
| `disableMinus`| 是否禁用减少按钮														| `Boolean`			| `false`							| -																									| -			|
| `disablelnput`| 是否禁用输入框														| `Boolean`			| `false`							| -																									| -			|
| `theme`		| 是否禁用输入框														| `String`			| `card`							| `card`：面型</br>`line`：线型</br>`add`：纯加购按钮</br>`simple`：图标显示模式</br>`circle`：圆形按钮显示	| -			|
徽标属性
| `background`	| 背景																				| `String`			| `#ee0a24`	| -																			| -	|
| `showDot`		| 是否展示为小红点																	| `Boolean`			| `true`	| -																			| -	|
| `position`	| 徽标位置																			| `String`			| `topRight`| topRight：上右<br/>topLeft：上左<br/>bottomLeft：下左<br/>bottomRight：下右	| -	|
| `offsetX`		| x轴偏移量																			| `Number/String`	| `auto`	| -																			| -	|
| `offsetY`		| y轴偏移量																			| `Number/String`	| `auto`	| -																			| -	|
| `showZero`	| 当 content 为数字 0 或字符串 '0' 时，是否展示徽标										| `Boolean`			| `true`	| -																			| -	|
| `badgeMax`	| 最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效，当 content 为数字 0 时不处理	| `Number`			| `99`		| 0：当 content 为数字 0 时不处理<br/>{{Number}}：超过最大值会显示 {max}+		| -	|


#### Events
|事件名		|说明								|事件参数																			|支持版本	|
|---		|---								|---																				|---		|
| `change`	|当绑定值变化时触发的事件				| `value`:改变后的绑定值																| -			|
| `plus`	|点击增加按钮时触发（可拦截change事件）	| `value`：当前的绑定值,`allowStop`：允许阻止后续的事件触发,：`resolve`：后续的事件执行	| -			|
| `minus`	|点击减少按钮时触发（可拦截change事件）	| `value`：当前的绑定值,`allowStop`：允许阻止后续的事件触发,：`resolve`：后续的事件执行	| -			|
| `focus`	|输入框聚焦时触发						| `event`																			| -			|
| `blur`	|输入框失焦时触发						| `event`																			| -			|

---$
{{qinpengfei}}