# Tree 树形控件
- 树形控件

{{compatibility}}

## 使用示例
- 以下示例中，但凡使用到`options`属性的，都使用以下数据
```json
[
	{
		title: '标题1',
		value: '1',
		children: [
			{
				title: '标题1-1',
				value: '1-1',
				children: [
					{ title: '标题-1-1', value: '1-1-1' },
					{ title: '标题1-1-2', value: '1-1-2' },
				],
			},
			{
				title: '标题1-2',
				value: '1-2',
				children: [
					{ title: '标题1-2-1', value: '1-2-1' },
					{
						title: '标题1-2-2',
						value: '1-2-2',
						children: [{ title: '标题1-2-2-1', value: '1-2-2-1' }],
					},
				],
			},
		],
	},
	{
		title: '标题2',
		value: '2',
		children: [{ title: '标题2-1', value: '2-1' }],
	},
]
		
```


### 基础用法
- 属性`options`用于设置折叠面板的选项，类型为树形结构
	- 对象属性
		- `title`：标题展示文本，(可通过`titleKey`指定)
		- `value`：唯一标识，(可通过`valueKey`指定)
		- `children`：子节点数组，(可通过`childrenKey`指定)
		- `hasChildren`：是否有`children`，懒加载没有`children`属性时，需要将该属性设置为`true`

- 事件`open`用于监听打开节点
- 事件`close`用于监听关闭节点
```html
<template>
	<ste-tree :options="options" @open="onOpen" @close="onClose"></ste-tree>
</template>
<script>
export default {
	methods: {
		onOpen(node) {
			uni.showToast({ title: `打开节点：${node.title}`, icon: 'none' });
		},
		onClose(node) {
			uni.showToast({ title: `关闭节点：${node.title}`, icon: 'none' });
		},
	},
};
</script>
```
### 默认展开节点，打开/关闭指定节点

- 属性`openNodes`用于设置默认展开的节点，默认展开的节点数组（数组内容为节点value值，请在组件加载前设置，加载后若要展开请调用open方法）
- 方法`open`用于打开指定节点
- 方法`close`用于关闭指定节点
```html
<template>
	<ste-tree ref="accordion" :options="options" :openNodes="['1-2-2']"></ste-tree>
	<ste-button @click="openNode" mode="100">打开标题2</ste-button>
	<ste-button @click="closeNode" mode="100">关闭标题2</ste-button>
</template>
<script>
export default {
	methods: {
		openNode() {
			this.$refs.accordion.open('2');
		},
		closeNode() {
			this.$refs.accordion.close('2');
		},
	},
};
</script>
```
### 节点搜索

- 属性`searchTitle`用于搜索节点
- 也可以使用方法`search(keyword)`进行搜索

```html
<template>
	<ste-input placeholder="请输入标题内容" v-model="searchTitle"></ste-input>
	<ste-tree :options="options" :searchTitle="searchTitle"></ste-tree>
</template>
<script>
export default {
	data(){
		return {
			searchTitle: '',
		}
	}
};
</script>
```
### 非手风琴模式(展开时不关闭兄弟节点)

- 属性`accordion`用于设置是否为手风琴模式，默认为`true`

```html
<template>
	<ste-tree :options="options" :accordion="false"></ste-tree>
</template>
```

### 懒加载

- `options`中对象没有子集`children`时，将属性`hasChildren`设置为`true`可展示`open`按钮
- 事件`beforeOpen`用于监听用户点击`open`时，打开指定节点前触发
	- 参数一：当前`node`对象
	- 参数二：`suspend`函数，用于等待后续操作
	- 参数三：`next`函数，继续执行后续代码，可接收一个对象数组，该数组会替换当前节点的`children`
	- 参数四：`stop`函数，阻止后续代码执行

```html
<template>
	<ste-tree :options="lazyLoadOptions" @beforeOpen="beforeOpen"></ste-tree>
</template>
<script>
export default {
	data(){
		return{
			lazyLoadOptions: [
				{ title: '标题1', value: '1', hasChildren: true },
				{ title: '标题2', value: '2', hasChildren: true },
			],
		}
	},
	methods: {
		beforeOpen(node, suspend, next, stop) {
			// 开启等待
			suspend();
			setTimeout(() => {
				// 继续后续操作，并将结果传递给next
				next([
					{ title: `${node.title}-1`, value: `${node.value}-1` },
					{ title: `${node.title}-2`, value: `${node.value}-2`, hasChildren: true },
				]);
			}, 2000);
		},
	}
}
</script>
```

### 自定义内容

- 插槽`default`用于自定义节点标题
- 插槽`open`用于自定义节点展开按钮图标，大小不得超过30rpx
- 插槽`loading`用于自定义懒加载动画
```html
<template>
	<ste-tree :options="options">
		<template v-slot="{ node, depth }">
			<view class="item-title">
				<image
					v-if="depth === 0"
					class="title-image"
					src="https://image.whzb.com/chain/StellarUI/component-icons/ste-tree.png"
				></image>
				<image
					v-if="depth === 1"
					class="title-image"
					src="https://image.whzb.com/chain/StellarUI/component-icons/ste-tree-children.png"
				></image>
				<view class="item-text">{{ node.title }}</view>
			</view>
		</template>
		<template v-slot:open="{ open }">
			<view class="slef-open-icon">
				{{ open ? '-' : '+' }}
			</view>
		</template>
	</ste-tree>
</template>
<script>
```




### API
#### Props
背景之外的颜色属性只支持`16进制`、`RGB`、`RGBA`格式
| 属性名						| 说明																																									| 类型										| 默认值				| 可选值	| 支持版本	|
| -----							| -----																																								| -----									| -----				| -----	| -----		|
| `options`					| 树形结构数组（`Node`结构见基础用法详情	），若组件渲染完成后修此属性，请手动调用`init`方法	| `Array<Node>`					| `[]`				|	-			| -				|
| `valueKey`				| 节点的值字段名																																				| `String`							| `"value"`		|	-			| -				|
| `titleKey`				| 节点的标题字段名																																			| `String`							| `"title"`		|	-			| -				|
| `childrenKey`			| 节点的子节点字段名																																		| `String`							| `"children"`|	-			| -				|
| `accordion`				| 是否手风琴模式																																				| `Boolean`							| `true`			|	-			| -				|
| `childrenPadding`	| 子节点缩进,单位rpx																																		| `Number`,`String`			| `40`				|	-			| -				|
| `openNodes`				| 默认展开的节点数组																																		| `Array<String/Number>`| `[]`				|	-			| -				|


#### Method

| 方法名	| 说明																													| 方法参数	| 支持版本	|
| ---			| ---																													| ---			| ---			|
| `init`	| 初始化方法，若`options`改变时页面没有更新，可调用此方法重现渲染	| -				| -				|
| `open`	| 打开指定节点																									| `value`	| -				|
| `close`	| 关闭指定节点																									| `value`	| -				|
| `search`| 节点搜索																											| `title`	| -				|



#### Events

| 事件名			| 说明						| 事件参数						| 支持版本	|
| ---					| ---						| ---								| ---			|
| `click`			| 点击节点时触发	| `node`						| -				|
| `open`			| 打开节点时触发	| `node`						| -				|
| `close`			| 关闭节点时触发	| `node`						| -				|
| `beforeOpen`| 打开节点前触发	| 见`懒加载`示例详细说明	| -				|




{{xuyajun}}