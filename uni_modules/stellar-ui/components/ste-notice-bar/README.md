# NoticeBar 公告栏

用于循环播放展示一组消息通知

{{compatibility}}

### 代码演示
#### 基础使用

```html
<ste-notice-bar/>
```

### API
#### 组件属性(Props)

| 参数			| 说明									| 类型				| 默认值		| 可选值									| 支持版本	|
| ---			| ---									| ---				| ---		| ---									| ---		|
| `list`		| 滚动数据列表							| `Array`			| `[]`		| -										| -			|
| `direction`	| 滚动的方向								| `String`			| `across`	| `across`：水平<br/>`vertical`：垂直	| -			|
| `closeMode`	| 是否启用关闭模式						| `Boolean`			| `false`	| -										| -			|
| `color`		| 文字颜色								| `String`			| `#000000`	| -										| -			|
| `background`	| 背景色									| `String`			| `#ffffff`	| -										| -			|
| `mode`		| 尺寸									| `Number`			| `[]`		| `100`：小<br/>`200`：中<br/>`300`：大	| -			|
| `width`		| 宽度，默认100%（占满父容器宽度）		| `String\Number`	| `[]`		| -										| -			|
| `speed`		| 滚动速率								| `Number`			| `50`		| -										| -			|
| `delay`		| 延时多少秒开始滚动(为横向滚动时有效)	| `Number`			| `1`		| -										| -			|
| `standTime`	| 每次滚动前停留多少毫秒(竖向滚动时有效)	| `Number`			| `1000`		| -										| -			|
| `scrollable`	| 是否可以滚动							| `Boolean`			| `false`		| -										| -			|

#### 组件事件(Events)

|事件名		|说明								|	事件参数	|支持版本	|
|---		|---								|---		|---		|
| `click`	| 内容区域点击回调事件				|-			|			|
| `close`	| 关闭模式下点击右侧关闭按钮时触发	|-			|			|

#### 组件插槽(Solts)

|插槽名		|说明			|插槽参数	|支持版本	|
|---		|---			|---		|---		|
|`leftIcon`	|左边图标的插槽	|-			|			|
|`rightIcon`|右边图标的插槽	|-			|			|


{{fuyuwei}}