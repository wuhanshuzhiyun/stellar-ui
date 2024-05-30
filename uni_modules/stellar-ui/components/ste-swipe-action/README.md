# SwipeAction 滑动单元格
- 该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作。
- 如果把该组件通过v-for用于左滑删除的列表，请保证循环的:key是一个唯一值，可以用数据的id或者title替代。 不能是数组循环的index，否则删除的时候，可能会出现数据错乱

{{compatibility}}

### 代码演示
- 
```javascript

```
#### 基础用法
- 事件`fixed`监听组件进入粘性布局时触发
- 事件`unfixed`监听组件取消粘性布局时触发
```html
<ste-sticky @fixed="onFixed" @unfixed="onUnfixed">
	<ste-button :round="false">粘性布局的按钮</ste-button>
</ste-sticky>

<script>
export default{
	methods: {
		onFixed() {
			console.log('吸顶状态时触发');
		},
		onUnfixed() {
			console.log('非吸顶状态时触发');
		},
	},
}
</script>
```



### API
#### Swiper Props

| 属性名						| 说明																					| 类型								| 默认值																			| 可选值	| 支持版本	|
| -----							| -----																				| -----							| -----																			| -----	| -----		|
| `offsetTop`				| 吸顶时与顶部的距离，单位rpx（默认 0 ）				| `Number`,`String`	| `0`																				| -			| -				|
| `customNavHeight`	| 航栏的高度，单位rpx（没有导航栏时，请设置为0）	| `Number`,`String`	| H5时为`44`<br/>小程序时根据胶囊位置自动计算	| -			| -				|
| `disabled`				| 是否禁用																			| `Boolean`					| `false`																		| -			| -				|
| `background`			| 组件背景，默认																| `String`					| `#FFF`																		| -			| -				|
| `zIndex`					| 吸顶时的z-index值														| `Number`					| `98`																			| -			| -				|

#### Swiper Events
|事件名			|说明							|事件参数	|支持版本	|
| ---				| ---							| ---			| ---			|
| `fixed`		| 吸顶状态时触发				| -				| -				|
| `unfixed`	| 非吸顶状态时触发	| -				| -				|


{{xuyajun}}