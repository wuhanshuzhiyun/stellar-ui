# Animate 动画

给子元素添加动画效果

---$

### 代码演示
#### 基础使用
```html
<ste-animate type="shakeX" loop>
	<ste-button>shakeX-横向</ste-button>
</ste-animate>
<ste-animate type="shakeY" loop>
	<ste-button>shakeY-竖向</ste-button>
</ste-animate>
<ste-animate type="ripple" loop>
	<ste-button>ripple-心跳</ste-button>
</ste-animate>
<ste-animate type="breath" loop>
	<ste-button>breath-呼吸灯</ste-button>
</ste-animate>
<ste-animate type="twinkle" loop>
	<ste-button>twinkle-水波</ste-button>
</ste-animate>
<ste-animate type="flicker" loop>
	<ste-button>flicker-擦亮</ste-button>
</ste-animate>
<ste-animate type="jump" loop>
	<ste-button>jump-跳跃</ste-button>
</ste-animate>
<ste-animate type="float" loop>
	<ste-button>float-漂浮</ste-button>
</ste-animate>
```

#### 点击触发
设置`action`为`click`

```html
<ste-animate type="slide-right" action="click">
	<ste-button :stopPropagation="false">由右向左划入</ste-button>
</ste-animate>
<ste-animate type="slide-left" action="click">
	<ste-button :stopPropagation="false">由左向右划入</ste-button>
</ste-animate>
<ste-animate type="slide-top" action="click">
	<ste-button :stopPropagation="false">由上向下划入</ste-button>
</ste-animate>
<ste-animate type="slide-bottom" action="click">
	<ste-button :stopPropagation="false">由下向上划入</ste-button>
</ste-animate>
```

#### 属性触发
可通过属性`show`来自定义触发动画执行
```html
<view>
	<ste-animate type="shakeY" :show="show">
		<ste-button :stopPropagation="false">动画</ste-button>
	</ste-animate>
</view>
<view>
	<ste-button @click="click">触发</ste-button>
</view>
<script>
export default {
	data() {
		return {
			show: false,
		}
	},
	methods: {
		click() {
			this.show = false;
			setTimeout(() => {
				this.show = true;
			}, 50);
		},
	},
}
</script>
```

---$
### API
#### 组件属性(Props)

| 参数		| 说明																| 类型		| 默认值		| 可选值	| 支持版本	|
| ---		| ---																| ---		| ---		| ---	| ---		|
| `show`	| 控制动画，当值从`false`变为`true`时会触发一次动画					| `Boolean`	| `false`	| -		| -			|
| `type`	| 动画类型，见下方`type`值说明										| `String`	| -			| -		| -			|
| `loop`	| 是否循环执行。														| `Boolean`	| `false`	| -		| -			|
| `duration`| 动画时长，单位 ms													| `Number`	|			| -		| -			|
| `action`	| 不能与 show 同时使用）触发方式，`initial`初始化执行; `click`点击执行	| `String`	| -			| -		| -			|

#### 动画类型(type)
| 参数名称		|参数说明							|
| ---			|---								|
| `shake`		| 抖动，建议 loop 为 true			|
| `ripple`		| 不循环则是放大后缩小，循环则是心跳	|
| `breath`		| 呼吸灯，建议 loop 为 true			|
| `float`		| 漂浮，建议 loop 为 true			|
| `slide-right`	| 由右向左划入						|
| `slide-left`	| 由左向右划入						|
| `slide-top`	| 由上至下划入						|
| `slide-bottom`| 由下至上划入						|
| `jump`		| 跳跃，建议 loop 为 true			|
| `twinkle`		| 水波，建议 loop 为 true			|
| `flicker`		| 擦亮按钮，建议 loop 为 true		|

#### 组件插槽(Slots)
| 名称		| 说明		| 支持版本	|
| ---		| ---		| ---		|
| `default`	| 默认插槽	| -			|

---$
{{fuyuwei}}