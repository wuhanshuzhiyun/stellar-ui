# Rate 徽标

用于对事物进行评级操作。

---$

### 代码演示
JavaScript后面的演示代码中涉及到的变量和方法都使用本javasaript代码
```javascript
export default {
	data() {
		return {
			value: 2,
			value1: 2,
			value2: 3,
			value3: 2.6,
			value4: 2.5,
		};
	},
	created() {},
	methods: {
		change(value) {
			console.log('value', value);
		},
	},
};
```
#### 基础用法
通过`value`属性，双向绑定，设置评分的值
```
<ste-rate v-model="value"></ste-rate>
```
#### 自定义图标
- 通过`inactiveCode`属性，设置未选中的图标code，默认`&#xe681;`。  
- 通过`activeCode`属性，设置选中的图标code，默认`&#xe684;`。  
- 使用自定义code时，图标内容应该撑满盒子，避免内容距盒子距离太大，导致选中的颜色计算有偏差。
```
<!--选中和未选中 图标一样-->
<ste-rate v-model="value1" inactiveCode="&#xe685;" activeCode="&#xe685;"></ste-rate>
<!--选中和未选中 图标不一样-->
<ste-rate v-model="value1" inactiveCode="&#xe685;" activeCode="&#xe687;"></ste-rate>
```

#### 自定义样式
- 通过`inactiveColor`属性，设置未选中的颜色，默认`#dddddd`。  
- 通过`activeColor`属性，设置选中的颜色，默认`#fa5014`。
- 通过`size`属性，设置评分图标的大小，单位`rpx`，默认`44`。
- 通过`gutter`属性，设置每个图标之间的距离，单位`rpx`，默认`10`。

```
<ste-rate v-model="value2" inactiveColor="#F8D5D5" activeColor="#d276a3" size="80" :gutter="20"></ste-rate>
```

#### 只读  
通过`readonly `属性，设置只读，不可切换评分，样式不置灰，可部分星， 默认`false`。 
```
<ste-rate v-model="value3" readonly></ste-rate>
```
#### 禁用  
通过`disabled`属性，设置禁用，不可切换评分，样式置灰，可部分星，默认`false`。 
```
<ste-rate v-model="value3" disabled></ste-rate>
```

#### 自定义数量和自定义分值  
- 通过`count`属性，设置图标总数，默认`5`。   
- 通过`score`属性，设置每颗图标代表的分数，默认`1`。 
```
<!--星星数量为1，分值为5, 分数为2.5-->
<ste-rate v-model="value4" :count="1" :score="5"></ste-rate>
```

#### 自定义分值图标
- 需要传入图标code对应的数组, 此时`inactiveColor`和`activeColor`将失效
- 会根据当前评分数对应的图标数量来取`iconData`中的值为当前图标的`code`
```
<ste-rate v-model="value5" :iconData="iconData"></ste-rate>
<script>
export default {
	data() {
		return {
			iconData: ['&#xe686;', '', '&#xe671;', '&#xe66a;', '&#xe66b;']
		}
	}
}
</script>
```

---$
### API
#### 组件属性(Props)

| 参数				| 说明							| 类型				| 默认值		| 可选值	| 支持版本	|
| ---				| ---							| ---				| ---		| ---	| ---		|
| `value`			| 当前评分数(支持v-model双向绑定)	| `Number`			| `0`		| -		| -			|
| `count`			| 图标总数						| `Number`			| `5`		| -		| -			|
| `score`			| 每颗星星代表的分数				| `Number`			| `1`		| -		| -			|
| `disabled`		| 禁用							| `Boolean`			| `false`	| -		| -			|
| `readonly `		| 只读（不置灰）					| `Boolean`			| `false`	| -		| -			|
| `size`			| 评分图标的大小，单位`rpx`		| `Number/String`	| `44`		| -		| -			|
| `inactiveColor`	| 未选中的颜色					| `String`			| `#dddddd`	| -		| -			|
| `activeColor`		| 选中的颜色						| `String`			| `#fa5014`	| -		| -			|
| `inactiveCode`	| 未选中的图标`code`				| `String`			| `&#xe681;`| -		| -			|
| `activeCode`		| 选中的图标`code`				| `String`			| `&#xe684;`| -		| -			|
| `gutter`			| 每个图标之间的距离，单位`rpx`	| `Number/String`	| `10`		| -		| -			|
| `iconData`		| 每个分值对应的图标code			| `Array`			| -			| -		| -			|


#### Events
|事件名		|说明					|事件参数				|支持版本	|
|---		|---					|---					|---		|
| `change`	|当前分值变化时触发的事件	| `value`:改变后的分值	| -			|

---$
{{qinpengfei}}