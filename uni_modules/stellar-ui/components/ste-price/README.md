# Price 价格

用于页面上显示价格的组件

{{compatibility}}

### 代码演示
#### 金额单位
- 默认金额单位为分，会将`value`值除以`100`
- 金额单位为元时，`valueUnit`赋值`yuan`，此时将只显示元的部分
```html
<ste-price value="9527" />
<ste-price value="9527" valueUnit="yuan"/>
```

#### 金额文字尺寸
金额文字尺寸单位为`rpx`
```html
<ste-price value="9527" fontSize="50" />
```

#### 划线价 & 划线价颜色
- 划线价颜色属性只在开启了划线价模式时才生效
```html
<ste-price value="9527" isSuggestPrice />
<ste-price value="9527" isSuggestPrice linePriceColor="#666666" />
```

#### 金额样式
- 划线价颜色属性只在开启了划线价模式时才生效
```html
<ste-price value="9527" isSuggestPrice />
<ste-price value="9527" isSuggestPrice linePriceColor="#666666" />
```

#### 格式化内容
- 划线价颜色属性只在开启了划线价模式时才生效
```html
<template>
	<ste-price value="9527" :formatter="this.formatter" />
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		formatter(price) {
			// 入参是传入的value值
			return (price / 100).toFixed(3);
		},
	},
};
</script>
```

### API
#### 组件属性(Props)

| 参数			| 说明											| 类型				| 默认值		| 可选值															| 支持版本	|
| ---			| ---											| ---				| ---		| ---															| ---		|
| value			| 金额											| Number/String		| 0			| -																| -			|
| valueUnit		| 金额单位 用于判断传入的value值是 fen 还是 yuan	| String			| "fen"		| -																| -			|
| fontSize		| 金额文字尺寸									| Number/String		| 30		| -																| -			|
| color			| 金额文字颜色									| String			| "#ff1e19"	| -																| -			|
| linePriceColor| 划线价颜色										| String			| "#999999"	| -																| -			|
| lineHeight	| 行高 <br/>Number，单位rpx<br/>String，同原生	| Number/String		| "1"		| -																| -			|
| isSuggestPrice| 是否划线价										| Boolean			| false		| -																| -			|
| marginLeft	| 左边距											| Number/String		| 0			| -																| -			|
| marginRight	| 右边距											| Number/String		| 0			| -																| -			|
| marginTop		| 上边距											| Number/String		| 0			| -																| -			|
| marginBottom	| 下边距											| Number/String		| 0			| -																| -			|
| styleType		| 金额样式										| Number			| 2			| 1 元和角分大小相等<br/>2 角分小于元<br/>3 价格符号和角，分相等	| -			|
| formatter		| 用来格式化内容									| Function(value)	| -			| -																| -			|

{{fuyuwei}}