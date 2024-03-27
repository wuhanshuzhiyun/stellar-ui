# Checkbox 复选框

在一组备选项中进行多选。

{{compatibility}}

### 代码演示
JavaScript后面的演示代码中涉及到的变量和方法都使用本javasaript代码
```javascript
```

#### 基础用法
通过`value`属性，双向绑定复选框的勾选状态，单一的checkbox中，默认绑定变量的值会是Boolean，选中为true
```
<ste-checkbox v-model="value">复选框</ste-checkbox>
```

#### 禁用  
通过设置 `disabled` 属性可以禁用复选框， 默认`false`。 
```
<ste-checkbox v-model="value2" disabled>复选框1</ste-checkbox>
<ste-checkbox v-model="value3" disabled>复选框2</ste-checkbox>
```

#### 只读  
通过设置 `readonly` 属性可以禁用复选框，样式不置灰， 默认`false`。 
```
<ste-checkbox v-model="value4" readonly>复选框1</ste-checkbox>
<ste-checkbox v-model="value5" readonly>复选框2</ste-checkbox>
```

#### 自定义形状  
通过设置`shape`为`square`或者`circle`，将复选框设置为方形或者圆形，默认`circle`。
```
<ste-checkbox v-model="value6">圆形</ste-checkbox>
<ste-checkbox v-model="value7" shape="square">方形</ste-checkbox>
```

#### 自定义图标大小  
通过设置 `iconSize` 属性可以自定义图标的大小，单位`rpx`，默认`36`。 
```
<ste-checkbox v-model="value11" iconSize="60">60rpx</ste-checkbox>
```

#### 自定义图标颜色  
通过设置 `checkedColor` 属性可以自定义图标的颜色（填充色和边框色），默认`#0090FF`。 
```
<ste-checkbox v-model="value12" checkedColor="#ee0a24">红色</ste-checkbox>
```
#### 自定义图标  
通过 `icon` 插槽自定义图标，可以通过 `slotProps`下`checked`判断是否为选中状态,`disabled`判断是否为禁止状态。
```
<ste-checkbox v-model="value13">
	<template #icon="{ slotProps }">
		<ste-icon
			code="&#xe677;"
			size="50"
			:color="slotProps.checked ? '#ee0a24' : '#000000'"
		></ste-icon>
	</template>
	自定义图标
</ste-checkbox>
```

#### 文本的位置  
通过设置 `textPosition` 属性可以设置文本的位置， 默认`right`。 
```
<ste-checkbox v-model="value6">右边</ste-checkbox>
<ste-checkbox v-model="value7" textPosition="left">左边</ste-checkbox>
```

#### 自定义文本  
- 通过设置 `textSize` 属性可以自定义文本的大小，单位`rpx`，默认`28`。
- 通过设置 `textInactiveColor` 属性可以自定义文本未选中颜色，默认`#000000`。
- 通过设置 `textActiveColor` 属性可以自定义文本选中颜色，默认`#000000`。
```
<ste-checkbox v-model="value14" textSize="50" textInactiveColor="green" textActiveColor="#d276a3">
	复选框
</ste-checkbox>
```

{{qinpengfei}}