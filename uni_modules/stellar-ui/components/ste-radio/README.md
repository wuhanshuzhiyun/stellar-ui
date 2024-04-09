# Radio 单选框

在一组备选项中进行单选。

{{compatibility}}

### 代码演示
JavaScript后面的演示代码中涉及到的变量和方法都使用本javasaript代码
```javascript
export default {
	data() {
		return {
			value1: 'a',
			value2: 'a',
			value3: 'a',
			value4: 'a',
			value5: 'a',
			value6: 'a',
			value7: 'a',
			value8: '',
			value9: 'a',
			value10: 'a',
			value11: '',
			value12: '',
			value13: '',
			value14: '',
			value15: '',
		};
	},
	created() {},
	methods: {
		click1(value) {
			uni.showToast({
				icon: 'none',
				title: `点击：${value} 单选框的值`,
			});
		},
		click2(value, allowStop, resolve) {
			uni.showToast({
				icon: 'none',
				title: `点击：${value} 单选框的值`,
			});
			// 阻止change事件
			allowStop();
		},
		change(value) {
			setTimeout(() => {
				uni.showToast({
					icon: 'none',
					title: `改变：${value} 单选框的值`,
				});
			}, 1000);
		},
	},
};
```

#### 基础用法
通过`value`绑定值当前选中项的 name 。
```
<ste-radio v-model="value1" name="a">单选框a</ste-radio>
<ste-radio v-model="value1" name="b">单选框b</ste-radio>
```

#### 禁用  
通过设置 `disabled` 属性可以禁用单选框， 默认`false`。 
```
<ste-radio v-model="value2" name="a" disabled>单选框a</ste-radio>
<ste-radio v-model="value2" name="b" disabled>单选框b</ste-radio>
```

#### 只读  
通过设置 `readonly` 属性可以禁用单选框，样式不置灰， 默认`false`。 
```
<ste-radio v-model="value3" name="a" readonly>单选框a</ste-radio>
<ste-radio v-model="value3" name="b" readonly>单选框b</ste-radio>
```

#### 自定义形状  
通过设置`shape`为`square`或者`circle`，将单选框设置为方形或者圆形，默认`circle`。
```
<ste-radio v-model="value4" name="a">圆形</ste-radio>
<ste-radio v-model="value4" name="b" shape="square">方形</ste-radio>
```

#### 自定义图标大小  
通过设置 `iconSize` 属性可以自定义图标的大小，单位`rpx`，默认`36`。 
```
<ste-radio v-model="value5" name="a" iconSize="60">60rpx</ste-radio>
<ste-radio v-model="value5" name="b" iconSize="60">60rpx</ste-radio>
```

#### 自定义图标颜色  
通过设置 `checkedColor` 属性可以自定义图标的颜色（填充色和边框色），默认`#0090FF`。 
```
<ste-radio v-model="value6" name="a" checkedColor="#ee0a24">红色</ste-radio>
<ste-radio v-model="value6" name="b" checkedColor="#ee0a24">红色</ste-radio>
```
#### 自定义图标  
通过 `icon` 插槽自定义图标，可以通过 `slotProps`下`checked`判断是否为选中状态,`disabled`判断是否为禁止状态。
```
<ste-radio v-model="value7" name="a">
	<template #icon="{ slotProps }">
		<ste-icon
			code="&#xe677;"
			size="50"
			:color="slotProps.checked ? '#ee0a24' : '#000000'"
		></ste-icon>
	</template>
	自定义图标
</ste-radio>
<ste-radio v-model="value7" name="b">
	<template #icon="{ slotProps }">
		<ste-icon
			code="&#xe677;"
			size="50"
			:color="slotProps.checked ? '#ee0a24' : '#000000'"
		></ste-icon>
	</template>
	自定义图标
</ste-radio>
```

#### 左侧文本  
将 `textPosition` 属性设置为 `left`，可以将文本位置调整到单选框左侧。
```
<ste-radio v-model="value8" name="a">右边</ste-radio>
<ste-radio v-model="value8" name="b" textPosition="left">左边</ste-radio>
```

#### 自定义文本  
- 通过设置 `textSize` 属性可以自定义文本的大小，单位`rpx`，默认`28`。
- 通过设置 `textInactiveColor` 属性可以自定义文本未选中颜色，默认`#000000`。
- 通过设置 `textActiveColor` 属性可以自定义文本选中颜色，默认`#000000`。
```
<ste-radio
	v-model="value9"
	name="a"
	textSize="50"
	textInactiveColor="green"
	textActiveColor="#d276a3"
>
	单选框
</ste-radio>
<ste-radio
	v-model="value9"
	name="b"
	textSize="50"
	textInactiveColor="green"
	textActiveColor="#d276a3"
>
	单选框
</ste-radio>
```

#### 回调事件  
-  `click`  点击单选框时触发的事件（可拦截change事件），`value`：改变后的分值,`allowStop`：允许阻止后续的事件触发,：`resolve`：后续的事件执行。
-  `change` 当绑定值变化时触发的事件，`value`:改变后的分值。
```
<ste-radio v-model="value11" name="a" @click="click1" @change="change">单选框</ste-radio>
<ste-radio v-model="value11" name="b" @click="click1" @change="change">单选框</ste-radio>
<text>在click事件后，执行change事件</text>
<ste-radio v-model="value12" name="a" @click="click2" @change="change">单选框</ste-radio>
<ste-radio v-model="value12" name="b" @click="click2" @change="change">单选框</ste-radio>
<text>在click事件后，阻止change事件</text>
```

### 单选框组
需要与`ste-radio-group`一起使用，通过`value`绑定在`ste-radio-group`，`value`即为选中的`ste-radio`的`name`属性设置的值。
```
<ste-radio-group v-model="value12">
	<ste-radio name="a">单选框a</ste-radio>
	<ste-radio name="b">单选框b</ste-radio>
	<ste-radio name="c">单选框c</ste-radio>
</ste-radio-group>
```

### 单选框组属性和单选框属性
属性优先级：`ste-radio`组件上配置的属性 > `ste-radio-group`组件上配置的属性 > `ste-radio`组件默认属性
```
<ste-radio-group v-model="value13" shape="square" textPosition="left">
	<ste-radio name="a">单选框a</ste-radio>
	<ste-radio name="b" disabled>单选框b</ste-radio>
	<ste-radio name="c" shape="circle">单选框c</ste-radio>
</ste-radio-group>
```
### 水平排列
将 `direction` 属性设置为 `row` 后，单选框组会变成水平排列。
```
<ste-radio-group v-model="value14" direction="row">
	<ste-radio name="a">单选框a</ste-radio>
	<ste-radio name="b">单选框b</ste-radio>
	<ste-radio name="c">单选框c</ste-radio>
</ste-radio-group>
```

### API
#### Radio组件属性(Props)

| 参数					| 说明							| 类型				| 默认值		| 可选值								| 支持版本	|
| ---					| ---							| ---				| ---		| ---								| ---		|
| `value`				|当前选中值（支持v-model双向绑定）	| `String`			| ``		| -									| -			|
| `name`				| 选项的值						| `Number/String`	| -			| -									| -			|
| `disabled`			| 是否禁用						| `Boolean`			| `false`	| -									| -			|
| `readonly`			| 只读 (不置灰)					| `Boolean`			| `false`	| -									| -			|
| `shape`				| 形状							| `String`			| `circle`	| `circle`：圆形 <br/>`squar`：方形	| -			|
| `iconSize`			| 图标大小，单位rpx				| `Number/String`	| `36`		| -									| -			|
| `checkedColor`		| 选中状态的图标颜色				| `String`			| `#0090FF`	| -									| -			|
| `textPosition`		| 文本的位置						| `String`			| `right`	| `right`：右 <br/>`left`：左		| -			|
| `textSize`			| 文本字体大小，单位rpx			| `Number/String`	| `25`		| -									| -			|
| `textlnactiveColor`	| 未选中文本颜色					| `String`			| `#000000`	| -									| -			|
| `textActiveColor`		| 选中文本颜色					| `String`			| `#000000`	| -									| -			|
| `textDisabled`		| 禁用文本点击					| `Boolean`			| `false`	| -									| -			|

#### RadioGroup 组件属性(Props)

| 参数					| 说明							| 类型				| 默认值		| 可选值								| 支持版本	|
| ---					| ---							| ---				| ---		| ---								| ---		|
| `value`				|当前选中值（支持v-model双向绑定）	| `String`			| ``	| -									| -			|
| `direction`			| 排列方式						| `String`			| `row`		|  `column`：横向 <br/>`row`：纵向	| -			|
| `disabled`			| 是否禁用						| `Boolean`			| `false`	| -									| -			|
| `readonly`			| 只读 (不置灰)					| `Boolean`			| `false`	| -									| -			|
| `shape`				| 形状							| `String`			| `circle`	| `circle`：圆形 <br/>`squar`：方形	| -			|
| `iconSize`			| 图标大小，单位rpx				| `Number/String`	| `36`		| -									| -			|
| `checkedColor`		| 选中状态的图标颜色				| `String`			| `#0090FF`	| -									| -			|
| `textPosition`		| 文本的位置						| `String`			| `right`	| `right`：右 <br/>`left`：左		| -			|
| `textSize`			| 文本字体大小，单位rpx			| `Number/String`	| `25`		| -									| -			|
| `textlnactiveColor`	| 未选中文本颜色					| `String`			| `#000000`	| -									| -			|
| `textActiveColor`		| 选中文本颜色					| `String`			| `#000000`	| -									| -			|
| `textDisabled`		| 禁用文本点击					| `Boolean`			| `false`	| -									| -			|


#### Radio Events
|事件名		|说明									|事件参数																		|支持版本	|
|---		|---									|---																			|---		|
| `click`	|点击单选框时触发的事件（可拦截change事件）	|`value`：当前的绑定值,`allowStop`：允许阻止后续的事件触发,：`resolve`：后续的事件执行	| -			|
| `change`	|当绑定值变化时触发的事件					|`value`：改变后的绑定值															| -			|

#### RadioGroup Events
|事件名		|说明									|事件参数																			|支持版本	|
|---		|---									|---																				|---		|
| `change`	|当绑定值变化时触发的事件					|`value`：改变后的绑定值																| -			|


#### Radio Solts
|插槽名		|说明			|插槽参数									|支持版本	|
| ---		| ---			| ---										| ---		|
| `default`	| 单选框文本内容	|`{ checked: boolean, disabled: boolean }`	| -			|
| `icon`	| 单选框图标		|`{ checked: boolean, disabled: boolean }`	| -			|

{{qinpengfei}}