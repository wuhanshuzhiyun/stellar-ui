# Button 按钮
该组件内部实现以uni-app的```button```组件为基础，进行二次封装，主要区别在于：
- 按钮```type```值有更多的主题颜色
- 按钮```size```值有更多的尺寸可选

{{compatibility}}


### 代码演示
#### 按钮大小
通过`mode`设置按钮的大小，默认值是`200`
```html
<ste-button :mode="400">超大按钮</ste-button>
<ste-button :mode="300" >大按钮</ste-button>
<ste-button>中按钮</ste-button>
<ste-button :mode="100" >小按钮</ste-button>
```

#### 非圆角按钮
通过`round`设置按钮是否镂空，默认值是`true`
```html
<ste-button :round="false">非圆角按钮</ste-button>
```

#### 镂空按钮
```html
<ste-button background="transparent" borderColor="#0091FF" color="#0091FF">镂空按钮</ste-button>
```

#### 禁止按钮
通过`disabled`设置按钮是否镂空，默认值是`false`
```html
<ste-button disabled>禁止按钮</ste-button>
```

#### 自适应宽度
`width`设置值为`100%`，此时按钮的宽度由父容器的宽度决定
```html
<ste-button width="100%" >自适应宽度</ste-button>
```

#### 超长文字
```html
<ste-button width="100%">提交-按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮</ste-button>
```

#### 自定义背景
```html
<ste-button background="#FF1E19" >领取</ste-button>
<ste-button background="transparent" borderColor="#FF1E19" color="#FF1E19">领取</ste-button>
```

#### 带图标按钮
```html
<ste-button background="transparent" borderColor="#0091FF" color="#0091FF">
	<ste-icon code="&#xe6ae;" :size="28" color="#0090FF" :marginRight="8"></ste-icon>
	<text>购卡</text>
</ste-button>
```

### API
#### Props
| 属性中文名		| 属性英文名		| 数据类型			| 默认值		| 可选值																| 说明			|
| ---			| ---			| ---				| ---		| ---																| ---			|
| 尺寸			| mode			| Number			| 200		| 100：小，200：中，300：大，400：超大								| -				|
| 文本颜色		| color			| String			| "#fffff"	| -																	| -				|
| 背景			| background	| String			| "#0091FF"	| -																	| -				|
| 边框颜色		| borderColor	| String			| -			| -																	| -				|
| 宽度			| width			| Number / String	| "auto"	| "auto"： 自适应宽度，"100%"：填满，{{Number}}：自定义宽度 单位rpx	| -				|
| 是否圆角按钮	| round			| Boolean			| true		| -																	| 圆角度数(48)	|
| 是否禁用状态	| disabled		| Boolean			| false		| -																	| -				|
| 是否加载中状态| loading		| Boolean			| false		| -																	| -				|

#### Events
| 事件中文名| 事件英文名| 事件参数	| 备注	|
| ---		| ---		| ---		| ---	|
| 点击		| click		| -			| -		|

#### Solts
| 插槽中文名| 插槽英文名	| 插槽参数	| 备注		|
| ---		| ---		| ---		| ---		|
| 默认		| default	|-			| 按钮内容	|


{{fuyuwei}}