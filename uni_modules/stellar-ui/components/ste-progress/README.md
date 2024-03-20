# Progress 进度条
进度条组件

{{compatibility}}


### 代码演示
#### 1


### API
#### Props
| 参数					| 说明											| 类型				| 默认值		| 可选值							| 支持版本	|
| ---					| ---											| ---				| ---		| ---							| ---		|
|`activeBg`				| 进度条激活部分的背景							| `String`			| `#0090ff`	| -								| -			|
|`inactiveBg`			| 进度条激活部分的背景							| `String`			| `#eeeeee`	| -								| -			|
|`percentage`			| 进度条百分比									| `Number`			| `0`		| 0-100							| -			|
|`strokeWidth`			| 进度条的粗细，默认单位rpx						| `String/Number`	| `24rpx`	| -								| -			|
|`disabled`				| 是否禁用										| `Boolean`			| `false`	| -								| -			|
|`width`				| 宽度 <br/>Number，单位rpx<br/>String，同原生	| `String/Number`	| `100%`	| -								| -			|
|`duration`				| 动画时间，单位秒，设置为 0 可以禁用动画			| `Number`			| `0.3`		| -								| -			|
|`pivotText`			| 进度文字内容									| `String`			| -			| -								| -			|
|`textColor`			| 进度文字颜色									| `String`			| `#ffffff`	| -								| -			|
|`textAlign`			| 文本对齐方式									| `String`			| `right`	| `left` 居左<br/>`center` 居中	| -			|
|`displayTextThreshold`	| 默认文本显示阈值								| `Number`			| `0`		| -								| -			|

#### Solts
|插槽名		|说明		|插槽参数	|支持版本	|
| ---		| ---		| ---		| ---		|
| `default`	| 进度条内容	|-			| -			|


{{fuyuwei}}
