# TouchSwipe 手势切屏
手势切屏组件，支持水平手势切换和垂直手势切换。

{{compatibility}}


#### 水平切换，固定宽度
- 外层使用`ste-touch-swipe`父标签包裹
	- `index`属性设置当前激活区域，支持`sync`双向绑定
	- `width`属性设置区域宽度，默认`100%`
- 内层使用`ste-touch-swipe-item`子标签包裹每一块区域的内容


```html
<ste-touch-swipe width="690" :index.sync="hIndex">
	<ste-touch-swipe-item v-for="(img, index) in imgs" :key="index">
		<image :src="img" mode="widthFix" style="width: 100%" />
	</ste-touch-swipe-item>
</ste-touch-swipe>

<script>
export default {
	data() {
		return {
			hIndex: 0,
			imgs: [
				'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
				'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
				'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
				'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
			],
		};
	},
};
</script>
```
#### 垂直切换，固定高度
- 外层使用`ste-touch-swipe`父标签包裹
	- `height`属性设置区域高度，默认`100%`
- 内层使用`ste-touch-swipe-item`子标签包裹每一块区域的内容


```html
<ste-touch-swipe height="600" direction="vertical" :index.sync="vIndex">
	<ste-touch-swipe-item v-for="(img, index) in imgs" :key="index">
		<image :src="img" mode="heightFix" style="height: 100%" />
	</ste-touch-swipe-item>
</ste-touch-swipe>

<script>
export default {
	data() {
		return {
			vIndex: 0,
			imgs: [
				'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
				'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
				'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
				'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
			],
		};
	}
};
</script>
```


### API
### touch-swipe Props

| 参数             | 说明                                                                                                                                                   | 类型              | 默认值       | 可选值                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ------------ | --------------------------------------------------------------------------- |
| `index`          | 当前展示的面板索引，支持 sync 双向绑定                                                                                                                 | `Number`          | `0`          | -                                                                           |
| `direction`      | 滑动方向                                                                                                                                               | `String`          | `horizontal` | `horizontal`:水平方向(必须固定宽度) <br />`vertical`:垂直方向(必须固定高度) |
| `width`          | 宽度（单位 rpx）                                                                                                                                       | `String`/`Number` | `100%`       | -                                                                           |
| `height`         | 高度（单位 rpx）                                                                                                                                       | `String`/`Number` | `100%`       | -                                                                           |
| `duration`       | 动画时长（单位 s）                                                                                                                                     | `Number`          | `0.3`        | -                                                                           |
| `swipeThreshold` | 灵敏度（0-1 之间的数值，数值越小越灵敏）                                                                                                               | `Number`          | `0.35`       | -                                                                           |
| `disabled`       | 是否禁用                                                                                                                                               | `Boolean`         | `false`      | -                                                                           |
| `childrenLength` | 子元素数量（使用 `touch-swipe-item` 作为子元素时不需要传递，不使用 `touch-swipe-item` 作为子元素盒子时必传）                                           | `Number`          | `0`          | -                                                                           |
| `disabledIndexs` | 禁用的面板索引（使用 `touch-swipe-item` 作为子元素时直接在 `touch-swipe-item` 上定义某个标签禁用即可，不使用 `touch-swipe-item` 作为子元素盒子时可传） | `Array`           | `[]`         | -                                                                           |

### touch-swipe Event

| 事件名   | 说明         | 事件参数      |
| -------- | ------------ | ------------- |
| `change` | 滑动切换触发 | 最新的`index` |

### touch-swipe-item Props

| 参数       | 说明                                             | 类型      | 默认值  | 可选值 |
| ---------- | ------------------------------------------------ | --------- | ------- | ------ |
| `disabled` | 是否禁用当前子元素（禁用后无法滑动到当前子元素） | `Boolean` | `false` | ---    |


{{xuyajun}}