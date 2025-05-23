# NoticeBar 公告栏

用于循环播放展示一组消息通知。

---$

### 代码演示
JavaScript后面的演示代码中涉及到的变量和方法都使用本javasaript代码
```javascript
export default {
	data() {
		return {
			list: ['第一条:1111111111111111111111111111', '第二条:2222222222222222222222', '第三条:3333333333333'],
			list2: ['第一条:111', '第二条:222', '第三条:333', '第四条:444'],
		};
	},
	mounted() {},
};
```

#### 基础用法
通过`list`数组参数设置需要滚动的内容,水平滚动。
```
<ste-notice-bar :list="list"></ste-notice-bar>
```

#### 自定义样式
- 通过 `color` 属性设置文字颜色，默认为 `#000000`。 
- 通过 `background` 属性设置背景，默认为 `#ffffff`。 
- 通过 `width` 属性设置宽度，默认为 `100%`，继承父属性。 
```
<ste-notice-bar :list="list" background="#FBF8DC" color="red" :width="400"></ste-notice-bar>
```

#### 垂直滚动
通过`direction`设置滚动的方向，`across`：水平，`vertical`：垂直 水平滚动、默认`across`。
```
<ste-notice-bar :list="list" direction="vertical"></ste-notice-bar>
```

#### 滚动速率
通过`acrossSpeed`设置水平方向的滚动速率 `(px/s)`。
```
<ste-notice-bar :list="list" :acrossSpeed="10"></ste-notice-bar>
```

#### 滚动的速度
通过`verticalSpeed`设置垂直方向的滚动的速度`（ms）`。
```
<ste-notice-bar :list="list2" direction="vertical" :verticalSpeed="2000"></ste-notice-bar>
```

#### 延时滚动
通过`delay`设置延时`（ms）`。
```
<ste-notice-bar :list="list" :delay="10000"></ste-notice-bar>
<ste-notice-bar :list="list2" direction="vertical" delay="10000"></ste-notice-bar>
```

#### 停留时间
通过`standTime`设置每次滚动前停留多少毫秒(竖向滚动时有效)`（ms）`。
```
<ste-notice-bar :list="list2" direction="vertical" :standTime="5000"></ste-notice-bar>
```

#### 是否可以滚动
通过`scrollable`设置公共栏是否可以滚动，默认`true`。
```
<ste-notice-bar :list="list" :scrollable="false"></ste-notice-bar>
<ste-notice-bar :list="list2" direction="vertical" :scrollable="false"></ste-notice-bar>
```

#### 取消按钮
通过`closeMode`设置是否启用关闭模式，默认`false`。
```
<ste-notice-bar :list="list" closeMode></ste-notice-bar>
```

#### 插槽
通过`leftIcon`设置左边图标的插槽。
通过`rightIcon`设置右边图标的插槽。
```
<ste-notice-bar :list="list">
	<template #leftIcon>
		<ste-icon color="#000000" code="&#xe682;" size="32"></ste-icon>
	</template>
	<template #rightIcon>
		<ste-icon color="#000000" code="&#xe696;" size="32"></ste-icon>
	</template>
</ste-notice-bar>
```


---$
### API
#### 组件属性(Props)

| 参数				| 说明								| 类型				| 默认值		| 可选值												| 支持版本	|
| ---				| ---								| ---				| ---		| ---												| ---		|
| `list`			| 滚动数据列表						| `Array`			| `[]`		| -													| -			|
| `direction`		| 滚动的方向							| `String`			| `across`	| `across`：水平<br/>`vertical`：垂直					| -			|
| `closeMode`		| 是否启用关闭模式					| `Boolean`			| `false`	| -													| -			|
| `color`			| 文字颜色							| `String`			| `#000000`	| -													| -			|
| `background`		| 背景								| `String`			| `#ffffff`	| -													| -			|
| `width`			| 宽度								| `String\Number`	| `100%`	| `"100%"`：填满<br/>`{{Number}}`：自定义宽度 单位rpx	| -			|
| `acrossSpeed`		| 滚动速率 (px/s)					| `Number`			| `50`		| -													| -			|
| `verticalSpeed`	| 滚动的速度（ms）					| `Number`			| `500`		| -													| -			|
| `delay`			| 延时（ms）							| `Number`			| `1000`	| -													| -			|
| `standTime`		| 每次滚动前停留多少毫秒(竖向滚动时有效)	| `Number`			| `1000`	| -													| -			|
| `scrollable`		| 是否可以滚动						| `Boolean`			| `true`	| -													| -			|

#### 组件事件(Events)

|事件名		|说明							|	事件参数			|支持版本	|
|---		|---							|---				|---		|
| `click`	| 内容区域点击回调事件				|`index`:结束后的序值	|			|
| `close`	| 关闭模式下点击右侧关闭按钮时触发	|`event`			|			|
| `end`		| 滚动结束时触发					|`index`:结束后的序值	|			|

#### 组件插槽(Slots)

|插槽名		|说明			|插槽参数	|支持版本	|
|---		|---			|---		|---		|
|`leftIcon`	|左边图标的插槽	|-			|			|
|`rightIcon`|右边图标的插槽	|-			|			|


---$
{{qinpengfei}}