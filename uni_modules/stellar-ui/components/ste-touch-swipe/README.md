# TouchSwipe 手势切屏
手势切屏组件，支持水平手势切换和垂直手势切换。

{{compatibility}}


#### 基础用法
- 外层使用`ste-touch-swipe`父标签包裹
	- `divideNum`表示自动一屏均分标签最大数量，默认值为`4`，当子标签数量大于该值时，则根据实际宽度自动排列
	- `active`表示当前激活的选项，默认值`0`，支持`sync`双向绑定；当类型为`Number`时绑定子元素的`index`属性，当类型为`String`时，绑定子元素的`name`属性
	- `ste-tabs`标签设置`tabWidth`属性可设置每一项标签的宽度
	- `ellipsis`属性开启时可当文本长度大于标签宽度时会显示省略号
- 内层使用`ste-touch-swipe-item`子标签描述每一个标签页
	- `title`属性设置标签主标题
	- `index`或`name`设置标签唯一值，与父元素的`active`绑定


```html
<!-- 标签数量小于或等于divideNum时，标签宽度均分 -->
<ste-tabs>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 子元素数量大于divideNum时，自动排列 -->
<ste-tabs>
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 统一标签宽度 -->
<ste-tabs tabWidth="180">
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 超出显示省略号 -->
<ste-tabs tabWidth="180" ellipsis>
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```


### API


{{xuyajun}}