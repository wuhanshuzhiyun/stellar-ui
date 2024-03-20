# Progress 进度条
进度条组件

{{compatibility}}


### 代码演示
#### 背景色
- 背景色支持纯色、渐变色、图片
- 支持设置激活部分的背景(`activeBg`)和未激活部分(`inactiveBg`)的背景
```html
<ste-progress :percentage="40"></ste-progress>
<ste-progress :percentage="45" activeBg="https://image.whzb.com/chain/inte-mall/00-普通图片/00-开发版/img/p-red.png" inactiveBg="#CCCCCC"></ste-progress>
<ste-progress :percentage="50"activeBg="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></ste-progress>
```

#### 线条粗细
- 通过`strokeWidth`设置线条的粗细
```html
<ste-progress :percentage="40" strokeWidth="20"></ste-progress>
<ste-progress :percentage="45" strokeWidth="36"></ste-progress>
```

#### 禁用
```html
<ste-progress :percentage="40" disabled></ste-progress>
```

#### 长度
- 通过`width`设置进度条长度
- 默认是`100%`，跟随父容器的宽度
```html
<ste-progress :percentage="40" width="80%"></ste-progress>
<ste-progress :percentage="45" width="200"></ste-progress>
```

#### 动画时间
```html
<ste-progress :percentage="p" duration="0.5"></ste-progress>
```

#### 自定义文字内容
- 通过`pivotText`属性来自定义进度条内文字显示的内容
- 通过`textColor`属性来自定义进度条内文字的颜色
- 通过`textAlign`属性来自定义进度条内文字的对齐方式
- 通过`textSize`属性来自定义进度条内文字的大小
```html
<ste-progress :percentage="30" pivotText="已抢30%"></ste-progress>
<ste-progress :percentage="40" pivotText="已抢40%" textColor="#FF1E19"></ste-progress>
<ste-progress :percentage="45" pivotText="已抢45%" textAlign="left"></ste-progress>
<ste-progress :percentage="50" pivotText="已抢50%" textSize="20"></ste-progress>
```

#### 文本显示阈值
- 当进度条百分比(`percentage`)小于阈值时(`displayTextThreshold`)，进度条的内容将不会显示
- 默认阈值是`0`，此时内容将始终显示
```html
<ste-progress :percentage="14" :displayTextThreshold="15"></ste-progress>
<ste-progress :percentage="35" :displayTextThreshold="15"></ste-progress>
```

### API
#### Props
| 参数					| 说明																												| 类型				| 默认值		| 可选值							| 支持版本	|
| ---					| ---																												| ---				| ---		| ---							| ---		|
|`activeBg`				| 进度条激活部分的背景																								| `String`			| `#0090ff`	| -								| -			|
|`inactiveBg`			| 进度条激活部分的背景																								| `String`			| `#eeeeee`	| -								| -			|
|`percentage`			| 进度条百分比																										| `Number`			| `0`		| 0-100							| -			|
|`strokeWidth`			| 进度条的粗细，默认单位rpx																							| `String/Number`	| `24rpx`	| -								| -			|
|`disabled`				| 是否禁用																											| `Boolean`			| `false`	| -								| -			|
|`width`				| 宽度 <br/>Number，单位rpx<br/>String，同原生<br/>默认宽度是`100%`，会根据父容器的宽度，如果父容器没有宽度将不会显示	| `String/Number`	| `100%`	| -								| -			|
|`duration`				| 动画时间，单位秒，设置为 0 可以禁用动画																				| `Number`			| `0.3`		| -								| -			|
|`pivotText`			| 进度文字内容																										| `String`			| -			| -								| -			|
|`textColor`			| 进度文字颜色																										| `String`			| `#ffffff`	| -								| -			|
|`textAlign`			| 文本对齐方式																										| `String`			| `right`	| `left` 居左<br/>`center` 居中	| -			|
|`textSize`				| 文本字体大小，默认单位rpx																							| `String/Number`	| `16`		| -								| -			|
|`displayTextThreshold`	| 默认文本显示阈值																									| `Number`			| `0`		| -								| -			|

#### Solts
|插槽名		|说明		|插槽参数	|支持版本	|
| ---		| ---		| ---		| ---		|
| `default`	| 进度条内容	|-			| -			|


{{fuyuwei}}
