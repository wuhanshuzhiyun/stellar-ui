# Tour 指引

> 用于创建一个带有步骤的指引

{{compatibility}}

## 使用示例
- 示例代码中用到的公共CSS样式
```css
.button-box {
	display: inline-block;
	padding: 20rpx;
}
```


### 基础用法
- 属性`show`用于控制显示隐藏
- 属性`steps`用于设置步骤内容，数组形式，数组中每个元素是一个对象，对象包含以下属性
	- 对象属性`message`：步骤内容，**必须**
	- 对象属性`target`：步骤内容对应的元素ID，**必须**
	- 对象属性`title`：步骤标题
	- 对象属性`position`：步骤位置
		- 若`position`属性不设置，则自动计算合适的位置
		- 可选值`top`、`bottom`、`top-start`、`top-center`、`top-end`、`bottom-start`、`bottom-center`、`bottom-end`

```html
<template>
	<view class="title">基础用法</view>
	<view id="button" class="button-box">
		<ste-button @click="show = true">基础提示</ste-button>
	</view>
	<ste-tour :show.sync="show" :steps="steps"></ste-tour>
</template>
<script>
export default {
	data(){
		return{
			show:false,
			steps: [{ message: '点这里', target: 'button' }],
		}
	},
};
</script>
```
### 位置偏移量
- 属性`offset`用于设置位置偏移量，数组形式，数组中两个元素分别表示横纵方向上的偏移量

```html
<template>
	<view id="button-2" class="button-box">
		<ste-button @click="show2 = true">描述位置偏移</ste-button>
	</view>
	<ste-tour :show.sync="show2" :steps="steps2" :offset="[20, 10]"></ste-tour>
</template>
<script>
export default {
	data(){
		return{
			show2: false,
			steps2: [{ message: '点这里', target: 'button-2' }],
		}
	},
};
</script>
```
- 默认插槽可以自定义描述内容，插槽参数`item`为当前步骤信息
- 属性`messageBg`可以将默认背景改为透明，然后通过插槽自定义背景样式，实现自定义描述内容。
- 如果需要内容区域点击不关闭提示，可使用`@click.stop`阻止内容区域点击冒泡
```html
<template>
	<view
		id="button-6"
		style="
			border: 1px solid #ddd;
			width: 120rpx;
			height: 120rpx;
			line-height: 120rpx;
			border-radius: 60rpx;
			text-align: center;
			margin-left: 60rpx;
		"
		@click="show6 = true"
	>
		插槽
	</view>
	<ste-tour :show.sync="show6" :steps="steps6" :offset="[-20, -30]" messageBg="transparent" radius="60">
		<image
			src="https://image.whzb.com/chain/StellarUI/component-icons/tour.png"
			mode="widthFix"
			style="width: 630rpx"
		></image>
	</ste-tour>
</template>
<script>
export default {
	data(){
		return{
			show6: false,
			steps6: [{ message: '点这里', target: 'button-2' }],
		}
	},
};
</script>
```

### 多步骤，显示标题栏
- 属性`offset`用于设置位置偏移量，数组形式，数组中两个元素分别表示横纵方向上的偏移量

```html
<template>
	<ste-button @click="show3 = true">多步骤带标题</ste-button>
	<view style="display: inline-block; padding: 6rpx 20rpx">
		<view id="step-1" class="button-box">步骤1</view>
		<view id="step-2" class="button-box">步骤2</view>
		<view id="step-3" class="button-box">步骤3</view>
	</view>
	<ste-tour showTitleBar :show.sync="show3" :steps="steps3"></ste-tour>
</template>
<script>
export default {
	data(){
		return{
			show3: false,
			steps3: [
				{ title: '步骤1', message: '先点这里', target: 'step-1' },
				{ title: '步骤2', message: '再点这里', target: 'step-2' },
				{ title: '步骤3', message: '然后点这里', target: 'step-3' },
			],
		}
	},
};
</script>
```
### 不显示背景蒙层
- 属性`mask`用于设置是否显示背景蒙层，默认显示

```html
<template>
	<view id="button-4" class="button-box">
		<ste-button @click="show4 = true">不显示背景蒙层</ste-button>
	</view>
	<ste-tour :show.sync="show4" :steps="steps4" :mask="false"></ste-tour>
</template>
<script>
export default {
	data(){
		return{
			show4: false,
			steps4: [{ message: '点这里', target: 'button-4' }],
		}
	},
};
</script>
```



### API
#### Props
背景之外的颜色属性只支持`16进制`、`RGB`、`RGBA`格式
| 属性名				| 说明																	| 类型								| 默认值						| 可选值	| 支持版本	|
| -----					| -----																| -----							| -----						| -----	| -----		|
| `show`				|	是否显示，支持`.sync`双向绑定					| `Boolean`					| `false`					| -			| -				|
| `current`			|	当前步骤，多个步骤时有效								| `Number`					| `0`							| -			| -				|
| `steps`				|	步骤数组，`Step`对象描述见基础用法说明	| `Array<Step>`			| `[]`						| -			| -				|
| `offset`			|	位置偏移量，格式为：[x, y]						| `[Number, Number]`| `[0, 0]`				| -			| -				|
| `showTitleBar`|	是否显示标题栏												| `Boolean`					| `false`					| -			| -				|
| `showFooter`	|	是否显示底部按钮栏（仅多步骤时生效）		| `Boolean`					| `true`					| -			| -				|
| `mask`				|	是否显示遮罩层												| `Boolean`					| `true`					| -			| -				|
| `maskColse`		|	是否点击遮罩层关闭										| `Boolean`					| `true`					| -			| -				|
| `showPrevStep`|	是否显示上一步按钮										| `Boolean`					| `true`					| -			| -				|
| `background`	|	遮罩层背景色													| `String`					| `rgba(0,0,0,.5)`| -			| -				|
| `radius`			|	提示框圆角，单位rpx										| `Number`,`String`	| `18`						| -			| -				|
| `messageBg`		|	提示框背景色													| `String`					| `#FFF`					| -			| -				|
| `messageColor`|	提示框文字颜色												| `String`					| `#000`					| -			| -				|
| `nextStepTxt`	|	下一步按钮文字												| `String`					| `下一步`					| -			| -				|
| `prevStepTxt`	|	上一步按钮文字												| `String`					| `上一步`					| -			| -				|
| `completeTxt`	|	完成按钮文字													| `String`					| `完成`						| -			| -				|



#### Events

| 事件名	| 说明						| 事件参数		| 支持版本	|
| ---			| ---						| ---				| ---			|
| `change`| 步骤切换时触发	| `current`	| -				|
| `close`	| 关闭指引时触发	| -					| -				|




{{xuyajun}}