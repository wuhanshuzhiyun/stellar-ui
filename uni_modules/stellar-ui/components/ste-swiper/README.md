# Swiper 轮播组件
- 轮播组件，脱离了原生轮播组件的限制
	- 去掉了一些非必要的功能
	- 扩展了一些原生组件没有的功能
		- 横向滑动时高度根据内容区域自适应
		- 纵向滑动时宽度根据内容区域自适应
		- 禁用等原生组件没有的功能
-  性能比较原生轮播组件略有不足，<span style="color:red">当原生组件能满足业务需求时不推荐使用此组件</span>

---$

### 代码演示

#### 基础用法
- 外层使用`ste-swiper`父标签包裹
	- 默认是水平滚动，宽度必须固定，可以通过`width`属性设置（默认为`100%`，也可以设置父标签宽度）
	- 高度根据内容自适应
- 内层使用`ste-swiper-item`子标签描述每一项
```html
<view class="swiper-box">
	<ste-swiper>
		<ste-swiper-item v-for="(m, index) in list1" :key="index">
			<view class="item">{{ m }}</view>
		</ste-swiper-item>
	</ste-swiper>
</view>

<script>
export default{
	data(){
		return{
			list1: ['1111', '2222'],
		}
	}
}
</script>

<style>
.swiper-box{
	width:690rpx;
	.item {
		padding: 30rpx;
		height: 300rpx;
		color: #fff;
		background-image: linear-gradient(45deg, #f55, #5f5, #55f);
	}
}
</style>
```

#### 纵向轮播
- `ste-swiper`父标签
	- `direction` 属性是设置滚动方向，默认是水平滚动，可选值`horizontal`、`vertical`
	- 纵向滑动时，`height` 属性是设置轮播的高度（默认是`100%`，也可以设置父标签高度）
```html
<ste-swiper direction="vertical" height="300rpx">
	<ste-swiper-item v-for="(m, index) in list1" :key="index">
		<view class="item">{{ m }}</view>
	</ste-swiper-item>
</ste-swiper>
```
#### 首尾衔接轮播
- `ste-swiper`父标签
	- `circular` 属性是设置是否首尾相接，默认是`false`，可选值`true`	
```html
<ste-swiper circular>
	<ste-swiper-item v-for="(m, index) in list1" :key="index">
		<view class="item">{{ m }}</view>
	</ste-swiper-item>
</ste-swiper>
```
#### 自动轮播
- `ste-swiper`父标签
	- `autoplay` 属性是设置是否自动轮播，默认是`false`，可选值`true`	
	- `interval` 属性是设置自动轮播的时间间隔，默认是`3000`，单位是`ms`
```html
<ste-swiper circular :interval="2000" autoplay>
	<ste-swiper-item v-for="(m, index) in list1" :key="index">
		<view class="item">{{ m }}</view>
	</ste-swiper-item>
</ste-swiper>
```
#### 显示指示器
- `ste-swiper`父标签
	- `indicatorDots` 属性是设置是否显示指示器，默认是`false`，可选值`true`
```html
<ste-swiper circular autoplay indicatorDots>
	<ste-swiper-item v-for="(m, index) in list2" :key="index">
		<view class="item">{{ m }}</view>
	</ste-swiper-item>
</ste-swiper>

<script>
export default{
	data(){
		return{
			list2: ['1111', '2222', '3333', '4444']
		}
	}
}
</script>
```
#### 指示器颜色
- `ste-swiper`父标签
	- `indicatorColor` 属性是设置指示器的颜色，默认是`#00000`
	- `indicatorActiveColor` 属性是设置当前选中的指示器的颜色，默认是`rgba(0,0,0,0.3)`
```html
<ste-swiper circular autoplay indicatorDots indicatorColor="#0f0" indicatorActiveColor="#f00">
	<ste-swiper-item v-for="(m, index) in list2" :key="index">
		<view class="item">{{ m }}</view>
	</ste-swiper-item>
</ste-swiper>
```
#### 显示前后页部分
- `ste-swiper`父标签
	- `previousMargin` 属性是设置前边距，默认是`0`，单位是`rpx`
	- `nextMargin` 属性是设置后边距，默认是`0`，单位是`rpx`
```html
<ste-swiper circular autoplay previousMargin="60" nextMargin="60">
	<ste-swiper-item v-for="(m, index) in list2" :key="index">
		<view class="item">{{ m }}</view>
	</ste-swiper-item>
</ste-swiper>
```

#### 突出显示

需要搭配 `perviousMargin` 和 `nextMargin`属性给内容前后留出空间
`highlightActive` 为 `true` 可突出显示当前内容（横向滑动时有效）

```html
<ste-swiper circular autoplay previousMargin="120" nextMargin="120" highlightActive>
	<ste-swiper-item v-for="(m, index) in list2" :index="index" :key="index">
		<image :src="m" class="item" />
	</ste-swiper-item>
</ste-swiper>
```


---$
### API
#### Swiper Props

| 属性名				| 说明											| 类型				| 默认值			| 可选值														| 支持版本	|
| -----					| -----											| -----				| -----			| -----														| -----		|
| `current`				| 当前显示所在滑块的`index`						| `Number`			| `0`			| -															| -			|
| `direction`			| 滑动方向										| `String`			| `horizontal`	| `horizontal`水平，必须固定宽度<br/>`vertical`垂直，必须固定高度	| -			|
| `disabled`			| 禁用，所有功能失效								| `Boolean`			| `false`		| -															| -			|
| `width`				| 宽度											| `String`/`Number`	| `100%`		| -															| -			|
| `height`				| 高度											| `String`/`Number`	| `100%`		| -															| -			|
| `duration`			| 切换动画时常									| `Number`			| `300`			| -															| -			|
| `swipeThreshold`		| 滑动灵敏度（0-1之间的小数，数值越小越灵敏）			| `Number`			| `0.35`		| -															| -			|
| `indicatorDots`		| 是否显示面板指示点								| `Boolean`			| `false`		| -															| -			|
| `indicatorColor`		| 指示点颜色										| `String`			| `#fff`		| -															| -			|
| `indicatorActiveColor`| 当前选中的指示点颜色								| `String`			| `#fff`		| -															| -			|
| `autoplay`			| 自动切换										| `Boolean`			| `false`		| -															| -			|
| `interval`			| 自动切换时间间隔									| `Number`			| `3000`		| -															| -			|
| `circular`			| 首尾衔接滑动									| `Boolean`			| `false`		| -															| -			|
| `previousMargin`		| 前边距，可用于露出前一项的一小部分					| `String`/`Number`	| `0`			| -															| -			|
| `nextMargin`			| 后边距，可用于露出后一项的一小部分					| `String`/`Number`	| `0`			| -															| -			|
| `highlightActive`		| 是否启用突出显示模式（当前项正常大小，非当前项缩小）	| `Boolean`			| `false`		| -															| `v1.38.5`	|


#### Swiper Events
|事件名		|说明			|事件参数																									|支持版本							|
| ---		| ---			| ---																									| ---							|
| `change`	| 监听`item`切换	| 参数1`index`:当前轮播图下标<br/>参数2`source`:autoplay 自动播放导致swiper变化，touch 用户划动引起swiper变化。	|参数2`source`支持版本`1.14.5`	|

#### Swiper Slot
|插槽名		|说明									|插槽参数	|支持版本	|
| ---		| ---									| ---	| ---	|
| `default`	| 默认插槽，请传入`ste-swiper-item`标签列表	| -		| -		|

#### Swiper Method
| 方法名| 说明							|支持版本	|
| -----	| -----							| -----	|
| `init`| 初始化轮播信息，在渲染完成后调用	| -		|

#### SwiperItem Slot
|插槽名		|说明									|插槽参数	|支持版本	|
| ---		| ---									| ---	| ---	|
| `default`	| 默认插槽，在插槽中的内容会展示在标签内容区域	| -		| -		|


---$
{{xuyajun}}

{{fuyuwei}}