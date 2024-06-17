# AccordionPanel 折叠面板
- 折叠面板

{{compatibility}}

### 基础用法
- 属性`options`用于设置折叠面板的选项，类型为树形结构
	- 对象属性
		- `title`：标题展示文本
		- `value`：唯一标识
		- `children`：子节点数组
		- `image`：标题前图片地址，设为false则不展示图片
		- `hasChildren`：是否有`children`，懒加载时没有`children`属性，可将该属性设置为`true`
	- 如果属性字段不一致，则可使用`valueKey`,`titleKey`,`childrenKey`，指定对应属性
- 属性`openNodes`用于设置默认展开的节点，默认展开的节点数组（数组内容为节点value值，请在组件加载前设置，加载后若要展开请调用open方法）
- 事件`beforeOpen`用于监听用户点击折叠面板标题前事件
	- 参数一：当前`node`对象
	- 参数二：`suspend`函数，用于等待后续操作
	- 参数三：`next`函数，继续执行后续代码，可接收一个对象数组，该数组会替换当前节点的`children`
	- 参数四：`stop`函数，阻止后续代码执行
- 事件`open`用于监听用户点击折叠展开事件
```html
<template>
	<ste-accordion-panel
	:options="options"
	:openNodes="['1-1']"
	@beforeOpen="beforeOpen"
	@open="onOpen"
	></ste-accordion-panel>
</template>
<script>
export default {
	data() {
		return {
			options: [
				{
					title: '标题1',
					value: '1',
					children: [
						{
							title: '标题1-1',
							value: '1-1',
							children: [
								{ title: '标题1-1-1', value: '1-1-1' },
								{ title: '标题1-1-2', value: '1-1-2', hasChildren: true },
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
									children: [
										{ title: '标题1-2-2-1', value: '1-2-2-1' },
										{ title: '标题1-2-2-2', value: '1-2-2-2' },
									],
								},
							],
						},
					],
				},
				{
					title: '标题2',
					value: '2',
					children: [
						{ title: '标题2-1', value: '2-1' },
						{ title: '标题2-2', value: '2-2' },
					],
				},
			],
		};
	},
	methods: {
		// 懒加载示例
		beforeOpen(node, suspend, next, stop) {			
			if (node.value === '1-1-2') {
				suspend();
				setTimeout(() => {
					next([
						{ title: '标题1-1-2-1', value: '1-1-2-1' },
						{ title: '标题1-1-2-2', value: '1-1-2-2' },
					]);
				}, 2000);
			}
		},
		onOpen(node) {
			console.log(node);
		},
	},
};
</script>
```




### API
#### Props
背景之外的颜色属性只支持`16进制`、`RGB`、`RGBA`格式
| 属性名				| 说明																																										| 类型						| 默认值				| 可选值	| 支持版本	|
| -----					| -----																																									| -----					| -----				| -----	| -----		|
| `options`			| 节点数组（支持树形结构）																																	| `Array<Node>`	| `[]`				|	-			| -				|
| `valueKey`		| 节点的值字段名																																					| `String`			| `"value"`		|	-			| -				|
| `titleKey`		| 节点的标题字段名																																				| `String`			| `"title"`		|	-			| -				|
| `childrenKey`	| 节点的子节点字段名																																			| `String`			| `"children"`|	-			| -				|
| `accordion`		| 是否手风琴模式																																					| `Boolean`			| `true`			|	-			| -				|
| `headStyle`		| 自定义头部样式																																					| `Object`			| `{}`				|	-			| -				|
| `openNodes`		| 默认展开的节点数组（数组内容为节点value值，请在组件加载前设置，加载后若要展开请调用open方法）	| `Array`				| `[]`				|	-			| -				|
| `titleImages`	| 标题图片数组（图片在数组中的位置对应展示的层级，若某一层不展示图片则在对应位置填入false）			| `Array`				| `[]`				|	-			| -				|


#### Method

| 方法名| 说明			| 方法参数	| 支持版本	|
| ---		| ---			| ---			| ---			|
| `open`| 打开指定节点	| `value`	| -				|



#### Events

| 事件名			| 说明						| 事件参数							| 支持版本	|
| ---					| ---						| ---									| ---			|
| `click`			| 点击节点触发		| `node`							| -				|
| `open`			| 打开节点触发		| `node`							| -				|
| `close`			| 关闭节点触发		| `node`							| -				|
| `beforeOpen`| 打开节点前触发	| 见上基础用法详细说明	| -				|




{{xuyajun}}