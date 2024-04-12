# Upload 上传
支持图片上传、视频上传、其他文件上传（仅微信小程序和H5）。

{{compatibility}}


#### 基础用法
- `v-model`双向绑定接收一个对象数组，对象包含以下属性
	- `url`：文件路径（与path二选一必须）
	- `path`：本地文件路径（与url二选一必须）
	- `name`：文件名（可选）
	- `type`：文件类型；可选值为`video`、`image`、`file`（可选）
	- `size`：文件大小（可选）
	- `status`：文件上传状态；可选值为`uploading`、`error`、`success`（可选，默认为`success`）
	- `thumbPath`：视频首帧图片（类型为`video`时必需）
	- `width`：视频宽度（可选）
	- `height`：视频高度（可选）
	- `duration`：视频时长（可选）
- `@read`事件在文件读取完成后调用，回调参数为选取到的文件对象列表，对象包含以下属性
	- `path`：本地文件路径
	- `name`：文件名称（小程序都是`null`）
	- `type`：文件类型
	- `size`：文件大小
	- `thumbPath`：视频首帧图片（类型为`video`时提供）
	- `width`：视频宽度（类型为`video`时提供）
	- `height`：视频高度（类型为`video`时提供）
	- `duration`：视频时长（类型为`video`时提供）
	- `file`：当前文件对象（H5平台专属）


```html
<ste-upload v-model="fileList" @read="onRead" />

<script>
export default {
	data() {
		return {
			fileList: [],
		};
	},
	methods: {
		onRead(fileList) {
			setTimeout(() => {
				fileList.forEach((item) => {
					if (Math.random() > 0.5) {
						item.status = 'success';
					} else {
						item.status = 'error';
					}
				});
			}, 1000);
		},
	}
};
</script>
```


#### 文件类型
- `accept`属性可以设置选择文件类型：可选值有
	- `image`：图片类型（默认）
	- `video`：视频类型
	- `media`：可选自行切换择图片或者视频
	- `all`：所有类型（微信小程序和H5可用）
	- `file`：除了图片和视频之外的其他类型（仅微信小程序可用）


```html
<ste-upload v-model="fileList1" @read="onRead1" accept="media" />

<script>
export default {
	data() {
		return {
			fileList1: [],
		};
	},
	methods: {
		onRead1(fileList) {
			setTimeout(() => {
				fileList.forEach((item) => {
					item.status = 'success';
				});
			}, 1000);
		},
	}
};
</script>
```

#### 双向绑定
- 当然也支持`v-model`双向绑定
```

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