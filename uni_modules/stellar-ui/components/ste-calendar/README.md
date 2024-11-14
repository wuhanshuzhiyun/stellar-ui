# Calendar 日历
日历组件

{{compatibility}}

### 基础用法
- 属性`height`用于设置日历的高度，单位为`rpx`，默认`100%`
- 属性`showTitle`用于设置是否显示日历的标题，默认`true`
- 属性`title`用户设置日历的标题，默认`日期选择`
- 事件`confirm`用于监听用户点击确定按钮事件，参数为选中的日期数组
```html
<template>
	<ste-calendar height="720" :showTitle="false" @confirm="handleConfirm" />
</template>
<script>
	export default{
		methods: {
			handleConfirm(v) {
				this.showToast({
					title: '确定选择：' + v.join(' '),
					icon: 'none',
					duration: 1500,
				});
			},
		},
	}
</script>
```

### 结合弹窗使用

#### 基础使用
```html
<ste-button @click="show1 = true">默认(单个日期)</ste-button>
<ste-popup :show.sync="show1" height="60vh" position="bottom">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar @confirm ="handleConfirm" />
	</div>
</ste-popup>
```

#### 多个日期
- 属性`mode`用于设置日历的模式，可选值`single`、`multiple`、`range`，默认`single`
	- 设置为`multiple`可以选择多个日期
```html
<ste-button @click="show2 = true">多个日期</ste-button>
<ste-popup :show.sync="show2" height="60vh" position="bottom">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar mode="multiple" @confirm="handleConfirm" />
	</div>
</ste-popup>
```

#### 日期范围
- 属性`mode`用于设置日历的模式，可选值`single`、`multiple`、`range`，默认`single`
	- 设置为`single`可以选择日期范围
```html
<ste-button @click="show2 = true">日期范围</ste-button>
<ste-popup :show.sync="show2" height="60vh" position="bottom">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar mode="single" @confirm="handleConfirm" />
	</div>
</ste-popup>
```

#### 自定义主题色
- 属性`color`可以设置日历的主题色，包括周末日期颜色、日期选中颜色、日期范围选中颜色、确定按钮颜色
```html
<ste-button @click="show4 = true">自定义主题色</ste-button>
<ste-popup :show.sync="show4" height="60vh" position="bottom">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar color="#3478f6" @confirm="handleConfirm" />
	</div>
</ste-popup>
```

#### 自定义文案
- 属性`title`可以设置标题文案
- 属性`startText`可以设置开始日期的文案，`mode`值为`range`时生效
- 属性`endText`可以设置结束日期的文案，`mode`值为`range`时生效
```html
<ste-button @click="show5 = true">自定义文案</ste-button>
<ste-popup :show.sync="show5" height="60vh" position="bottom">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar mode="range" title="酒店预约" startText="住店" endText="离店" @confirm="handleConfirm" />
	</div>
</ste-popup>
```

#### 日期最大范围
- 属性`minDate`可以设置日期的最小可选范围
- 属性`maxDate`可以设置日期的最大可选范围

```html
<ste-button @click="show6 = true">日期最大范围</ste-button>
<ste-popup :show.sync="show6" height="60vh" position="bottom">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar mode="range" minDate="2024-05-10" maxDate="2024-05-20" @confirm="handleConfirm" />
	</div>
</ste-popup>
```

#### 多选数量限制
- 属性`maxCount`用于设置多选模式下最多可选的日期数量

```html
<ste-button @click="show7 = true">多选数量限制</ste-button>
<ste-popup :show.sync="show7" height="60vh" position="bottom">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar mode="multiple" :maxCount="5" @confirm="handleConfirm" />
	</div>
</ste-popup>
```

#### 多选数量限制
- 属性`maxRange`用于设置范围模式下最多可选的日期数量
- 属性`showRangePrompt`用于设置范围模式下是否显示超出数量时的提示文案
- 属性`rangePrompt`用于设置范围模式下超出数量时的提示文案

```html
<ste-button @click="show7 = true">范围数量限制</ste-button>
<ste-popup :show.sync="show7" height="60vh" position="bottom">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar mode="range" :maxRange="5" @confirm="handleConfirm" />
	</div>
</ste-popup>
```

#### 默认选择日期
- 属性`list`用于设置默认选择的日期

```html
<ste-button @click="show8 = true">默认选择日期</ste-button>
<ste-popup :show.sync="show8" height="60vh" position="bottom">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar :list="[Date.now()]" @confirm="handleConfirm" />
	</div>
</ste-popup>
```
#### 默认展示月份
- 属性`defaultDate`用于设置默认展示的日期，因为弹窗中的日历不在文档流，无法设置滚动距离，所以需要在弹窗动画结束之后手动设置默认展示的时间

```html
<ste-button @click="show9 = true">默认展示月份</ste-button>
<ste-popup :show.sync="show9" position="bottom" height="60vh" @open-after="setViewMonth">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar ref="calendarRef" minDate="2024-05-20" maxDate="2024-12-01" @confirm="handleConfirm" />
	</div>
</ste-popup>
<script>
	export default{
		methods: {
			setViewMonth() {
				this.$refs.calendarRef.showMonth('2024-07-12');
			},
		},
	}
</script>
```
#### 隐藏确定按钮
- 属性`showConfirm`用于设置是否显示确定按钮
- 事件`select`用于监听选择日期的事件

```html
<ste-button @click="show10 = true">隐藏确定按钮</ste-button>
<ste-popup :show.sync="show10" position="bottom" height="60vh">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar minDate="2024-05-20" maxDate="2024-12-01" @select="handleConfirm" :showConfirm="false" />
	</div>
</ste-popup>
```
#### 只读
- 属性`readonly`用于设置是否只读

```html
<ste-button @click="show11 = true">只读</ste-button>
<ste-popup :show.sync="show11" position="bottom" height="60vh">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar minDate="2024-05-20" maxDate="2024-06-10" readonly :list="['2024-05-21']" />
	</div>
</ste-popup>
```

#### 隐藏背景月份
- 属性`showMark`用于设置是否显示背景月份

```html
<ste-button @click="show12 = true">隐藏背景月份</ste-button>
<ste-popup :show.sync="show12" position="bottom" height="60vh">
	<div style="padding-bottom: 20px; height: 100%">
		<ste-calendar :showMark="false" @select="handleConfirm" />
	</div>
</ste-popup>
```

#### 手动切换、标记
- 属性`weekendColor`用于设置周末日期颜色
- 属性`monthCount`用于设置渲染的月数
- 属性`signs`用于设置标记的日期

```html
<ste-select mode="month" v-model="defaultDate" width="360" />

<ste-calendar
	@select="handleConfirm"
	weekendColor="#999"
	:signs="signs"
	:defaultDate="defaultDate"
	:monthCount="1"
	:showConfirm="false"
	:showTitle="false"
/>

<script>
import utils from 'stellar-ui/utils/utils';
export default{
	data(){
		return {
			defaultDate: utils.dayjs().format('YYYY-MM'),
			signs: {
				'2024-11-12': [
					{ content: 'XXXXX', className: 'test-signs' },
					{ content: 'XXXXX', className: 'test-signs' },
					{ content: 'XXXXX', className: 'test-signs' },
				],
				'2024-11-13': [
					{ content: 'XXXXX', style: { color: '#666', background: '#f5f5f5' } },
					{ content: 'XXXXX', style: { color: '#666', background: '#f5f5f5' } },
					{ content: 'XXXXX', style: { color: '#666', background: '#f5f5f5' } },
				],
			},
		}
	},
}
</script>
<style>
/deep/ .test-signs {
	color: #fff;
	background-color: #000;
}
</style>
```




### API
#### Tabs Props
背景之外的颜色属性只支持`16进制`、`RGB`、`RGBA`格式
| 属性名						| 说明																																												| 类型						| 默认值										| 可选值																											| 支持版本	|
| -----							| -----																																											| -----					| -----										| -----																											| -----		|
| `mode`						| 选择模式																																										| `String`			| `"single"`							| `"single"`单选<br/>`"multiple"`多选<br/>`"range"`范围选择	| -				|
| `title`						| 标题文本																																										| `String`			| `"日期选择"`							| -																													| -				|
| `showTitle`				| 是否显示标题																																								| `Boolean`			| `true`									| -																													| -				|
| `list`						| 已选中的日期																																								| `Array<Date>`	| `[]`										| -																													| -				|
| `startText`				| 开始日期的提示文字，`mode`=`range`时生效																										| `String`			| `[]`										| -																													| -				|
| `endText`					| 结束日期的提示文字，`mode`=`range`时生效																										| `String`			| `[]`										| -																													| -				|
| `color`						| 主题颜色（选中日期背景、月份背景、当天日期颜色和确定按钮颜色）																| `String`			| `#FF1A00`								| -																													| -				|
| `weekendColor`		| 周末日期颜色																																								| `String`			| `#FF1A00`								| -																													| -				|
| `minDate`					| 开始日期	（没有该属性的情况下，从`defaultDate`开始渲染）																			| `Date`				| `0`											| -																													| -				|
| `maxDate`					| 结束日期	（没有该属性的情况下，从`minDate`或者`defaultDate`开始往后渲染`maxCount`个月）				| `Date`				| `0`											| -																													| -				|
| `defaultDate`			| 默认展示日期（不设置`minDate`和`maxDate`的情况下，列表展示从默认月份开始往后`maxCount`个月）	| `Date`				| `new Date()`						| -																													| -				|
| `monthCount`			| 渲染的月数（如果存在`maxDate`则该属性不生效）																								| `Number`			| `12`										| -																													| -				|
| `maxCount`				| `mode`=`multiple`时，最多可选多少个日期																											| `Number`			| `0`											| -																													| -				|
| `formatter`				| 日期格式化																																									| `String`			| `"YYYY-MM-DD"`					| -																													| -				|
| `showMark`				| 是否显示月份背景色																																					| `Boolean`			| `true`									| -																													| -				|
| `readonly`				| 是否为只读状态，只读状态下禁止选择日期																											| `Boolean`			| `false`									| -																													| -				|
| `maxRange`				| 日期区间最多可选天数，`mode`=`range`时有效																									| `Number`			| `0`											| -																													| -				|
| `rangePrompt`			| 范围选择超过最多可选天数时的提示文案																												| `String`			| `"选择天数不能超过XX天"`	| -																													| -				|
| `showRangePrompt`	| 范围选择超过最多可选天数时，是否展示提示文案																									| `Number`			| `0`											| -																													| -				|
| `allowSameDay`		| 是否允许日期范围的起止时间为同一天																													| `Boolean`			| `true`									| -																													| -				|
| `signs`						| 标签对象（每一天的支持最多三条标签）																																										| `Signs`				| `true`									| -																													| -				|

##### Signs 示例
```javascript
{
	"2024-11-21":[
		{content:"标记1",className:"XXX"}
		{content:"标记1",className:"XXX"}
		{content:"标记1",className:"XXX"}
	],
	"2024-11-22":[
		{content:"标记1",style:{}}
		{content:"标记1",style:{}}
		{content:"标记1",style:{}}
	]
}
```


#### Tabs Events

| 事件名			| 说明																																| 事件参数							| 支持版本	|
| ---					| ---																																| ---									| ---			|
| `confirm`		| 监听用户点击确定按钮，参数为用户选中的日期列表												| `Array<Date>`				| -				|
| `select`		| 监听用户选择日期，参数一为用户选中的日期列表，参数二为当前点击的日期	| `Array<Date>`,`Date`| -				|
| `viewMonth`	| 监听用户滚动日历时，视图区域展示的月份变化														| `YYYY-MM`						| -				|


{{xuyajun}}