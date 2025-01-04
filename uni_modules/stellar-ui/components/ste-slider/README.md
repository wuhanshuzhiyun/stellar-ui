# Slider 滑块

用于选择横轴或者竖轴上的数值、区间、档位。

---$

### 代码演示
#### 基础使用
```html
<ste-slider value="30"></ste-slider>
```

#### 滑块条高度 & 滑块大小
```html
<ste-slider barHeight="26" value="30"></ste-slider>
<ste-slider buttonSize="50" value="30"></ste-slider>
```

#### 进度条颜色
```html
<ste-slider value="30" activeColor="#ff0000" inactiveColor="#a9ee13"></ste-slider>
```

#### 范围选择
```html
<ste-slider :value="[10, 20]" range></ste-slider>
```

#### 竖向
```html
<ste-slider vertical value="30"></ste-slider>
```

#### 禁用
```html
<ste-slider disabled value="30"></ste-slider>
```

#### 只读
```html
<ste-slider readonly value="30"></ste-slider>
```

#### 间断点
当`showStops`为`true`时，会根据最大值(`max`)、最小值(`min`)、步长(`step`)来显示间断点
```html
<ste-slider showStops :step="10" value="30"></ste-slider>
```

#### 标记
当同时配置了`showStops`属性和`marks`属性时，会显示自定义节点
```html
<ste-slider showStops :marks="marks" value="30"></ste-slider>
<script>
export default {
	data() {
		return {
			marks: {
				10: '0°C',
				20: '8°C',
				37: '37°C',
				80: {
					style: {
						color: '#1989FA',
					},
					label: '合格',
				},
			}
		};
	},
};
</script>
```

#### 自定义滑块
```html
<ste-slider :step="10" showStops value="30" activeColor="#ff0000">
	<view class="c-slider-1" slot="button">
		<view class="content">
			<text>滑块</text>
		</view>
	</view>
</ste-slider>
<ste-slider :step="10" showStops :value="[10, 40]" range>
	<view class="c-slider-2" slot="leftButton">
		<view class="content">
			<ste-icon code="&#xe673;" color="#fff"></ste-icon>
		</view>
	</view>
	<view class="c-slider-2" slot="rightButton">
		<view class="content">
			<ste-icon code="&#xe674;" color="#fff"></ste-icon>
		</view>
	</view>
</ste-slider>
<style lang="scss">
.c-slider-1 {
	.content {
		padding: 0 16rpx;
		background-color: #ff0000;
		border-radius: 20rpx;

		color: #ffffff;
		font-size: 24rpx;

		text {
			white-space: nowrap;
		}
	}
}
.c-slider-2 {
	.content {
		background-color: #0090FF;
		border-radius: 50%;
		height: 40rpx;
		width: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
```

---$
### API
#### 组件属性(Props)

| 属性名			| 说明																				| 类型					| 默认值		| 可选值	| 支持版本	|
| ---				| ---																				| ---					| ---		| ---	| ---		|
| `value`			| 当前进度百分比，在双滑块模式下为数组格式（数组的值都是从小到大）						| `Number/String/Array`	| `0`		| -		| -			|
| `min`				| 最小值																				| `Number/String/Array`	| `0`		| -		| -			|
| `max`				| 最大值																				| `Number/String/Array`	| `100`		| -		| -			|
| `step`			| 步长																				| `Number/String/Array`	| `1`		| -		| -			|
| `barHeight`		| 进度条高度，默认单位为 rpx															| `Number/String/Array`	| `8`		| -		| -			|
| `buttonSize`		| 滑块按钮大小，默认单位为 rpx														| `Number/String/Array`	| `40`		| -		| -			|
| `activeColor`		| 进度条激活态颜色																	| `Number/String/Array`	| `#0090FF`	| -		| -			|
| `inactiveColor`	| 进度条非激活态颜色																	| `Number/String/Array`	| `#eeeeee`	| -		| -			|
| `range`			| 是否为范围选择																		| `Number/String/Array`	| `false`	| -		| -			|
| `vertical`		| 是否竖向模式																		| `Number/String/Array`	| `false`	| -		| -			|
| `disabled`		| 是否禁用滑块																		| `Number/String/Array`	| `false`	| -		| -			|
| `readonly`		| 是否为只读状态，只读状态下无法修改滑块的值											| `Number/String/Array`	| `false`	| -		| -			|
| `showStops`		| 是否显示间断点																		| `Number/String/Array`	| `false`	| -		| -			|
| `marks`			| 标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式	| `Number/String/Array`	| `{}`		| -		| -			|

#### 组件事件(Events)

|事件名		|说明					|事件参数				|支持版本	|
|---		|---					|---					|---		|
|`input`	|进度变化时实时触发		|`value`:改变后的绑定值	|-			|
|`change`	|进度变化且结束拖动后触发	|`value`:改变后的绑定值	|-			|
|`dragStart`|开始拖动时触发			|-						|-			|
|`dragEnd`	|结束拖动时触发			|-						|-			|

#### 组件插槽(Slots)

|插槽名		|说明							|插槽参数	|支持版本	|
|---		|---							|---		|---		|
|`button`	|自定义滑块按钮					|-			|-			|
|`button`	|自定义左侧滑块按钮（范围选择下)	|-			|-			|
|`button`	|自定义右侧滑块按钮（范围选择下）	|-			|-			|


---$
{{fuyuwei}}