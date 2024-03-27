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
通过设置 `shape` 属性可以修改复选框的形状， 默认`circle`。 
```
<ste-checkbox v-model="value6">圆形</ste-checkbox>
<ste-checkbox v-model="value7" shape="square">方形</ste-checkbox>
```
#### 文本的位置  
通过设置 `textPosition` 属性可以设置文本的位置， 默认`right`。 
```
<ste-checkbox v-model="value6">右边</ste-checkbox>
<ste-checkbox v-model="value7" textPosition="left">左边</ste-checkbox>
```

{{qinpengfei}}