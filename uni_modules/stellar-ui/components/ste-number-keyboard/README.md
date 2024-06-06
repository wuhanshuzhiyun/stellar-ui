# NumberKeyboard 数字键盘

用于页面上显示价格的组件

{{compatibility}}

### 代码演示
- 以下是公用scss代码
```scss
.test-input {
	height: 66rpx;
	line-height: 66rpx;
	background-color: #f5f5f5;
	padding: 0 18rpx;
	font-size: 24rpx;
	.placeholder {
		color: #999;
	}
}
```

#### 基础用法
- 属性`value`: 输入框的值，支持`v-model`双向绑定
- 属性`show`: 是否显示键盘，支持`sync`双向绑定
```html
<view class="test-input" @click="show1 = true">
	<text v-if="value1">{{ value1 }}</text>
	<text v-else class="placeholder">请输入</text>
</view>
<ste-number-keyboard v-model="value1" :show.sync="show1" />

<script>
export default{
	data(){
		return {
			value1: '',
			show1: false
		}
	}
}
</script>
```
#### 隐藏右侧功能键
- 属性`rightKeys`: 是否显示右侧功能键，默认显示
```html
<view class="test-input" @click="show2 = true">
	<text v-if="value2">{{ value2 }}</text>
	<text v-else class="placeholder">请输入</text>
</view>
<ste-number-keyboard :rightKeys="false" v-model="value2" :show.sync="show2" />

<script>
export default{
	data(){
		return {
			value2: '',
			show2: false
		}
	}
}
</script>
```
#### 隐藏清除按钮
- 属性`showClear`: 是否显示清除按钮，默认显示
```html
<view class="test-input" @click="show3 = true">
	<text v-if="value3">{{ value3 }}</text>
	<text v-else class="placeholder">请输入</text>
</view>
<ste-number-keyboard :showClear="false" v-model="value3" :show.sync="show3" />

<script>
export default{
	data(){
		return {
			value3: '',
			show3: false
		}
	}
}
</script>
```
#### 自定义按键
- 属性`customKeys`: 自定义按键列表，建议不超过两个
```html
<view class="test-input" @click="show4 = true">
	<text v-if="value4">{{ value4 }}</text>
	<text v-else class="placeholder">请输入</text>
</view>
<ste-number-keyboard :customKeys="['00', '.']" v-model="value4" :show.sync="show4" />

<script>
export default{
	data(){
		return {
			value4: '',
			show4: false
		}
	}
}
</script>
```

#### 自定义颜色/字体大小/确定文本
- 属性`textColor`: 按键文字颜色，默认#333333
- 属性`textSize`: 按键文字大小，默认48，单位rpx
- 属性`confirmBg`: 确定按钮背景颜色，默认#0090FF
- 属性`confirmColor`: 确定按钮文字颜色，默认#FFFFFF
- 属性`confirmText`: 确定按钮文字，默认"确定"
```html
<view class="test-input" @click="show5 = true">
	<text v-if="value5">{{ value5 }}</text>
	<text v-else class="placeholder">请输入</text>
</view>
<ste-number-keyboard
	v-model="value5"
	:show.sync="show5"
	textColor="#f00"
	textSize="40"
	confirmBg="#f00"
	confirmColor="#0f0"
	confirmText="完成"
/>

<script>
export default{
	data(){
		return {
			value5: '',
			show5: false
		}
	}
}
</script>
```
#### 输入前事件（自定义功能）
- 事件`beforeinput`: 输入前事件
	- 参数1：即将输入的按钮文本
	- 参数2：等待执行回调函数
	- 参数3：继续后续操作函数
	- 参数4：阻止后续操作函数

```html
<view class="test-input" @click="show6 = true">
	<text v-if="value6">{{ value6 }}</text>
	<text v-else class="placeholder">请输入</text>
</view>
<ste-number-keyboard :customKeys="['-']" v-model="value6" :show.sync="show6" @beforeinput="beforeinput" />

<script>
export default{
	data(){
		return {
			value6: '',
			show6: false
		}
	},
	methods:{
		beforeinput(v, suspend, next, stop) {
			suspend();
			if (v === '-') {
				console.log('你点击了-');
				stop();
			} else {
				next();
			}
		},
	}
}
</script>
```
#### 在文档流中展示
- 属性`mode`: 键盘模式，
	- 可选值:`popup`在弹窗中展示(默认)
	- 可选值:`page`在文档流中展示

```html
<view class="test-input">
	<text v-if="value7">{{ value7 }}</text>
	<text v-else class="placeholder">请输入</text>
</view>
<view style="padding: 30rpx; background-color: #f5f5f5; margin-top: 12rpx">
	<ste-number-keyboard mode="page" v-model="value7" />
</view>

<script>
export default{
	data(){
		return {
			value7: '',
		}
	},
}
</script>
```
### API
#### 组件属性(Props)

| 参数				| 说明																						| 类型				| 默认值		| 可选值																		| 支持版本	|
| ---					| ---																						| ---				| ---			| ---																			| ---			|
| `mode`			| 键盘模式																				| `String`	| `popup`	| `popup`弹窗展示<br/>`page`在文档流中展示	| -				|
| `value`			| 输入值，支持v-model双向绑定											| `String`	| -				|	-																				| -				|
| `show`			| 是否显示键盘，支持.sync绑定，mode="popup"时生效	| `Boolean`	| `false`	|	-																				| -				|
| `rightKeys`	| 是否显示右侧功能键															| `Boolean`	| `true`	|	-																				| -				|
| `randomKeys`| 按键是否随机排列																| `Boolean`	| `false`	|	-																				| -				|
| `randomKeys`| 按键是否随机排列																| `Boolean`	| `false`	|	-																				| -				|


{{xuyajun}}
