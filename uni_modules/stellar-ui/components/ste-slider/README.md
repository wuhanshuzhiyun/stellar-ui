# Slider 滑块

滑块

{{compatibility}}

### 代码演示
#### 基础使用


### API
#### 组件属性(Props)

| 属性名			| 说明																				| 类型					| 默认值		| 可选值	| 支持版本	|
| ---				| ---																				| ---					| ---		| ---	| ---		|
| `value`			| 当前进度百分比，在双滑块模式下为数组格式（数组的值都是从小到大）						| `Number/String/Array`	| `0`		| -		| -			|
| `min`				| 最小值																				| `Number/String/Array`	| `0`		| -		| -			|
| `max`				| 最大值																				| `Number/String/Array`	| `100`		| -		| -			|
| `step`			| 步长																				| `Number/String/Array`	| `1`		| -		| -			|
| `barHeight`		| 进度条高度，默认单位为 rpx															| `Number/String/Array`	| `8`		| -		| -			|
| `buttonSize`		| 滑块按钮大小，默认单位为 rpx														| `Number/String/Array`	| `40`		| -		| -			|
| `activeColor`		| 进度条激活态颜色																	| `Number/String/Array`	| `#0090ff`	| -		| -			|
| `inactiveColor`	| 进度条非激活态颜色																	| `Number/String/Array`	| `#eeeeee`	| -		| -			|
| `range`			| 是否为范围选择																		| `Number/String/Array`	| `false`	| -		| -			|
| `vertical`		| 是否竖向模式																		| `Number/String/Array`	| `false`	| -		| -			|
| `disabled`		| 是否禁用滑块																		| `Number/String/Array`	| `false`	| -		| -			|
| `readonly`		| 是否为只读状态，只读状态下无法修改滑块的值											| `Number/String/Array`	| `false`	| -		| -			|
| `showStops`		| 是否显示间断点																		| `Number/String/Array`	| `false`	| -		| -			|
| `marks`			| 标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式	| `Number/String/Array`	| `{}`		| -		| -			|

#### 组件事件(Events)

|事件名		|说明					|事件参数				|支持版本	|
|---		|---					|---					|---		|
|`input`	|进度变化时实时触发		|`value`:改变后的绑定值	|-			|
|`change`	|进度变化且结束拖动后触发	|`value`:改变后的绑定值	|-			|
|`dragStart`|开始拖动时触发			|-						|-			|
|`dragEnd`	|结束拖动时触发			|-						|-			|

#### 组件插槽(Solts)

|插槽名		|说明							|插槽参数	|支持版本	|
|---		|---							|---		|---		|
|`button`	|自定义滑块按钮					|-			|-			|
|`button`	|自定义左侧滑块按钮（范围选择下)	|-			|-			|
|`button`	|自定义右侧滑块按钮（范围选择下）	|-			|-			|


{{fuyuwei}}