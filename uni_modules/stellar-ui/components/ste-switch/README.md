# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

{{compatibility}}

### 代码演示
JavaScript后面的演示代码中涉及到的变量和方法都使用本javasaript代码
```javascript
export default {
	data() {
		return {
			value1: false,
			value2: true,
			value3: false,
			value4: false,
			value5: false,
			value6: false,
			value7: false,
		};
	},
	methods: {
		click1(value) {
			this.showToast({
				icon: 'none',
				title: `点击：${value} 开关的值`,
			});
		},
		click2(value, allowStop, resolve) {
			this.showToast({
				icon: 'none',
				title: `点击：${value} 开关的值`,
			});
			// 阻止change事件
			allowStop();
		},
		change(value) {
			setTimeout(() => {
				this.showToast({
					icon: 'none',
					title: `改变：${value} 开关的值`,
				});
			}, 1000);
		},
	},
};
```

#### 基础用法
通过`value`属性，双向绑定，绑定开关的选中状态，`true` 表示开，`false` 表示关。
```
<ste-switch v-model="value1"></ste-switch>
```

#### 只读  
通过`readonly `属性，设置只读，不可切换，样式不置灰 默认`false`。 
```
<ste-switch v-model="value2" readonly></ste-switch>
```

#### 禁用  
通过`disabled`属性，设置禁用，不可切换，样式置灰，默认`false`。 
```
<ste-switch v-model="value2" disabled></ste-switch>
```

#### 自定义大小  
通过 `size` 属性自定义开关的大小，默认`52`。 
```
<ste-switch v-model="value3" size="100"></ste-switch>
```

#### 自定义颜色  
通过 `activeColor` 属性自定义开关的激活颜色，默认`#0090FF`。 
通过 `inactiveColor` 属性自定义开关的激活颜色，默认`#bbbbbb`。 
```
<ste-switch v-model="value4" activeColor="#13CE66" inactiveColor="#FF4949"></ste-switch>
```

#### 加载状态  
通过 `loading` 属性设置开关为加载状态，加载状态下开关不可点击，默认`false`。
```
<ste-switch v-model="value2" loading></ste-switch>
<ste-switch v-model="value5" loading></ste-switch>
```

### API
#### 组件属性(Props)

| 参数				| 说明								| 类型				| 默认值		| 可选值	| 支持版本	|
| ---				| ---								| ---				| ---		| ---	| ---		|
| `value`			| 开关状态（支持`v-model`双向绑定）	| `Boolean`			| `false`	| -		| -			|
| `disabled`		| 是否禁用							| `Boolean`			| `false`	| -		| -			|
| `readonly`		| 只读（不置灰）						| `Boolean`			| `false`	| -		| -			|
| `size`			| 开关大小,单位`rpx`					| `Number/String`	| `52`		| -		| -			|
| `activeColor`		| 激活时颜色							| `String`			| `#0090FF`	| -		| -			|
| `inactiveColor`	| 未激活颜色							| `String`			| `#bbbbbb`	| -		| -			|
| `loading`			| 加载中								| `Boolean`			| `false`	| -		| -			|


#### Events
|事件名		|说明									|事件参数																			|支持版本	|
|---		|---									|---																				|---		|
| `click`	|点击开关时触发的事件（可拦截change事件）	|`value`：当前的绑定值,`allowStop`：允许阻止后续的事件触发,：`resolve`：后续的事件执行	| -			|
| `change`	|当绑定值变化时触发的事件					|`value`：改变后的绑定值																| -			|


{{qinpengfei}}