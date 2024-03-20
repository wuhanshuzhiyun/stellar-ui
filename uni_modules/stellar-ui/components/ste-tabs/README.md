# Tabs 标签页
标签页组件，集成了常见标签页所需功能。

{{compatibility}}

### 代码演示
**JavaScript**后面的演示代码中涉及到的变量和方法都使用本javasaript代码
```javascript
export default {
	data() {
		return {
			list1: [
				{ title: '标签1', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签2', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签标签标签标签3', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签4', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
			],
			active: 1,
		};
	},
	mounted() {
		setTimeout(() => {
			this.list = [1, 2, 3, 4];
			this.active = 3;
		}, 1000);
	},
	computed: {
		list2() {
			return [].concat(this.list1, [
				{ title: '标签5', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签6', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签7', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签8', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
			]);
		},
	},
	methods: {
		getStyle() {
			return;
		},
	},
};
```
#### 基础用法
- 外层使用`ste-tabs`父标签包裹
	- `divideNum`表示自动一屏均分标签最大数量，默认值为`4`，当子标签数量大于该值时，则根据实际宽度自动排列
	- `active`表示当前激活的选项，支持`sync`双向绑定，当类型为`Number`时绑定子元素的`index`属性，当类型为`String`时，绑定子元素的`name`属性
- 内层使用`ste-tab`子标签描述每一个标签页
	- `title`属性设置标签主标题
	- `index`或`name`设置标签唯一值，与父元素的`active`绑定


```html
<!-- 子元素数量小于或等于divideNum属性时，宽度均分 -->
<ste-tabs>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
<!-- 子元素数量大于divideNum时，自动排列 -->
<ste-tabs>
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :name="item.title">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```

#### 固定tab宽度
- `ste-tabs`标签设置`tabWidth`属性可设置每一项标签的宽度
```html
<ste-tabs tabWidth="180">
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```

#### 吸顶
- `ste-tabs`标签设置`sticky`属性可让标签自动吸顶
```html
<ste-tabs sticky>
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```
#### 卡片模式
- `ste-tabs`标签设置`type`等于`card`时开启卡片模式
```html
<ste-tabs type="card">
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```
#### 卡片模式带边框
- `ste-tabs`标签设置`border`时展示边框，只在卡片模式下生效
```html
<ste-tabs type="card">
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```

#### 分割线
- `ste-tabs`标签设置`showGapLine`时在子项之间展示分割线
```html
<ste-tabs type="card">
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```


#### 设置间距
- `ste-tabs`标签的`tabSpace`属性可设置标签间距
```html
<ste-tabs type="card" tabSpace="12">
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```

#### 显示图片
- `ste-tabs`标签的`showImage`属性开启时可显示图片
- `ste-tab`标签的`image`属性设置图片内容，同`image`的`src`
```html
<ste-tabs showImage>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :image="item.image" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```
#### 子标题和滑块大小
- `ste-tabs`标签的`showSubtitle`属性开启时可显示子标题
	- `lineWidth`设置滑块宽度
	- `lineHeight`设置滑块高度
- `ste-tab`标签的`subTitle`属性设置子标题内容
	- 子标题的背景是下面的滑块，需要重新设置宽高适应子标题大小
```html
<ste-tabs showSubtitle lineWidth="120" lineHeight="30">
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" subTitle="子标签" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```
#### 文本超长省略
- `ste-tabs`标签的`ellipsis`属性开启时可当文本长度大于标签宽度时会显示省略号
```html
<ste-tabs ellipsis>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```
#### 开启手势滑动切换
- `ste-tabs`标签的`swipeable`属性可开启手势滑动切换
```html
<ste-tabs swipeable>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```
#### 下拉选项和自定义颜色
- `ste-tabs`标签的`pullDown`属性可开启下拉选项功能，下拉选项只有在标签数量大于均分数量时展示
	- `placeholder`设置下拉选项的占位符内容
	- `color`设置主题色，默认`#0090FF`（滑块颜色，边框颜色，选中的背景色，激活下拉列表中选项颜色）
	- `background`设置标签栏背景，支持图片和颜色值
	- `activeTabColor`设置激活标签的字体颜色
	- `tabColor`设置未激活标签的字体颜色
```html
<ste-tabs pullDown color="#f0f" background="#ff9" activeTabColor="#00f" tabColor="#666">
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
<ste-tabs pullDown placeholder="你倒是选一个啊">
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```
#### 锁定（无法切换）
- `ste-tabs`标签的`lock`属性锁定标签页不让切换
```html
<ste-tabs lock>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```
#### 禁用（全部功能失效）
- `ste-tabs`标签的`disabled`属性设置全部标签禁用
- `ste-tab`标签的`disabled`属性设置单个标签禁用
```html
<ste-tabs disabled>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
<ste-tabs>
	<ste-tab
		v-for="(item, index) in list1"
		:disabled="index === 1"
		:key="index"
		:title="item.title"
		:index="index"
	>
		<h1>==Start {{ item.title }}==</h1>
		<h1>内容{{ item.title }}</h1>
		<h1>==End {{ item.title }}==</h1>
	</ste-tab>
</ste-tabs>
```

### API
#### Tabs Props
| 属性名					| 说明																																																| 类型								| 默认值				| 可选值																	|支持版本	|
| -----						|-----																																															|-----							|-----				|-----																	|-----		|
| `active`				| 当前激活的选项，支持sync双向绑定**（类型为number时tab绑定index，类型为string时tab绑定name）**					| `String`,`Number`	| `0`					| -																			|-				|
| `type`					| 组件类型																																														| `String`					| `"line"`		| `"line"`线性模式<br/>`"card"`卡片模式	|-				|
| `showImage`			| 是否显示图片																																												| `Boolean`					| `false`			| -																			|-				|
| `showTitle`			| 是否显示标题																																												| `Boolean`					| `true`			| -																			|-				|
| `showSubtitle`	| 是否显示子标题																																											| `Boolean`					| `false`			| -																			|-				|
| `color`					| 主题色（滑块颜色，边框颜色，选中的背景色，激活下拉列表中选项颜色）**（仅支持16进制、rgb以及rgba格式）**	| `String`					| `#0090FF`		| -																			|-				|
| `background`		| 标签栏背景	**（支持图片、颜色以及渐变色）**																													| `String`					| `""`				| -																			|-				|
| `duration`			| 切换动画时长	**（单位秒）**																																					| `Number`					| `0.3`				| -																			|-				|
| `lineWidth`			| 底部条或副标题背景色宽度	**（单位rpx）**																														| `String`,`Number`	| `52`				| -																			|-				|
| `lineHeight`		| 底部条或副标题背景色高度	**（单位rpx）**																														| `String`,`Number`	| `6`					| -																			|-				|
| `border`				| 是否显示边框	**（仅在card模式下生效）**																															| `Boolean`					| `false`			| -																			|-				|
| `ellipsis`			| 是否开启选项文本超长省略																																						| `Boolean`					| `false`			| -																			|-				|
| `tabWidth`			| 选项宽度 **（单位rpx）**																																						| `String`,`Number`	| `"auto"`		| -																			|-				|
| `divideNum`			| 标签栏均分最大数量 **（设置0则不均分）**																														| `Number`					| `4`					| -																			|-				|
| `tabSpace`			| 选项间距 **（单位rpx）**																																						| `String`,`Number`	| `0`					| -																			|-				|
| `sticky`				| 是否开启吸顶																																												| `Boolean`					| `false`			| -																			|-				|
| `offsetTop`			| 吸顶距离	**（单位rpx）**																																						| `String`,`Number`	| `0`					| -																			|-				|
| `swipeable`			| 是否开启手势滑动切换																																								| `Boolean`					| `false`			| -																			|-				|
| `tabColor`			| 标题字体颜色和下拉列表中标题字体颜色																																	| `String`					| `"#000000"`	| -																			|-				|
| `activeTabColor`| 激活标题字体颜色																																										| `String`					| `"#000000"`	| -																			|-				|
| `showGapLine`		| 是否显示分割线																																											| `Boolean`					| `false`			| -																			|-				|
| `lock`					| 是否锁定**（无法切换）**																																						| `Boolean`					| `false`			| -																			|-				|
| `disabled`			| 是否禁用**（全部功能失效并且置灰）**																																| `Boolean`					| `false`			| -																			|-				|
| `pullDown`			| 是否有下拉选项**（当选项数量大于均分数量时生效）**																										| `Boolean`					| `false`			| -																			|-				|
| `placeholder`		| 下拉占位符																																													| `String`					| `"请选择"`		| -																			|-				|

#### Tabs Events
您可以通过监听`change`事件，事件参数为用户选中标签项的`props`对象，您可以监听该事件获取当前选中的标签。
|事件名		|说明							|事件参数							|支持版本	|
|---			|---							|---									|---			|
| `change`| 监听用户输入事件	| `value`: 输入框的值	| -				|

#### Tabs Slot
您可以通过监听`change`事件，事件参数为用户选中标签项的`props`对象，您可以监听该事件获取当前选中的标签。
|插槽名			|说明													|插槽参数	|支持版本	|
| ---				| ---													| ---			| ---			|
| `default`	| 默认插槽，请传入`Tab`标签列表	|-				| -				|

#### Tab Props
| 属性名		| 说明																																		| 类型				| 默认值		| 可选值	|支持版本	|
| -----			| -----																																	| -----			| -----		| -----	| -----		|
| `title`		| 标题																																		| `String`	| -				| -			| -				|
| `subTitle`| 子标题																																	| `String`	| -				| -			| -				|
| `image`		| 图片**（同image的src属性）**																						| `String`	| -				| -			| -				|
| `name`		| 标签唯一标识**（当tabs的active值类型为string时，作为匹配激活的标识符）**	| `String`	| -				| -			| -				|
| `index`		| 标签下标**（当tabs的active值类型为number时，作为匹配激活的标识符）**			| `Number`	| -				| -			| -				|
| `disabled`| 禁用当前标签																														| `Boolean`	| `false`	| -			| -				|

#### Tab Slot
您可以通过监听`change`事件，事件参数为用户选中标签项的`props`对象，您可以监听该事件获取当前选中的标签。
|插槽名			|说明																				|插槽参数	|支持版本	|
| ---				| ---																				| ---			| ---			|
| `default`	| 默认插槽，在插槽中的内容会展示在标签内容区域	|-				| -				|


{{xuyajun}}