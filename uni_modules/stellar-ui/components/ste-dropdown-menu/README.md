# DropdownMenu 下拉菜单
用于列表的索引分类显示和快速定位。

---$

### 代码演示
#### 基础使用
- 可以通过`v-model`绑定选中值
```html
<view>
	<ste-dropdown-menu v-model="menu1" >
		<ste-dropdown-menu-item value="1" title="全部商品" />
		<ste-dropdown-menu-item value="2" title="新款商品" />
		<ste-dropdown-menu-item value="3" title="活动商品" />
	</ste-dropdown-menu>
</view>
<view>
	<ste-dropdown-menu value="1" >
		<ste-dropdown-menu-item value="1" title="默认排序" @click="itemClick" />
		<ste-dropdown-menu-item value="2" title="销量排序" />
		<ste-dropdown-menu-item value="3" title="价格排序" />
	</ste-dropdown-menu>
</view>
```

#### 按钮类型
- 默认是列表形式展示选项
- 当`type`值为`round`时选项为按钮形式
>>> 推荐选项名称字数小于6个字时使用按钮类型，过长的字会导致截断
```html
<view>
	<ste-dropdown-menu title="选择项1" type="round" value="2">
		<ste-dropdown-menu-item value="1" title="选项名称" />
		<ste-dropdown-menu-item value="2" title="选项名称" />
		<ste-dropdown-menu-item value="3" title="选项名称" />
		<ste-dropdown-menu-item value="4" title="选项名称" />
		<ste-dropdown-menu-item value="5" title="选项名称" />
		<ste-dropdown-menu-item value="6" title="选项名称" />
		<ste-dropdown-menu-item value="7" title="选项名称" />
	</ste-dropdown-menu>
</view>
<view>
	<ste-dropdown-menu title="选择项2" type="round" :max="2">
		<ste-dropdown-menu-item value="1" title="选项名称名称" />
		<ste-dropdown-menu-item value="2" title="选项名称" />
		<ste-dropdown-menu-item value="3" title="选项名称" />
		<ste-dropdown-menu-item value="4" title="选项名称名称名称" />
		<ste-dropdown-menu-item value="5" title="选项名称" />
		<ste-dropdown-menu-item value="6" title="选项名称" />
		<ste-dropdown-menu-item value="7" title="选项名称" />
	</ste-dropdown-menu>
</view>
```

#### 自定义下拉内容
如果不使用`ste-dropdown-menu-item`，可自定义插槽内容实现更多样式
```html
<template>
<view class="menu-item">
	<view>
		<ste-dropdown-menu value="2" title="服务" ref="steDropMenu">
			<view class="custom-menu-box">
				<view class="menu-box">
					<view class="left">
						<view
							v-for="(m, i) in customMenuData"
							:class="i == m1 ? 'active' : ''"
							@click="choose('1', i)"
						>
							{{ m.name }}
						</view>
					</view>
					<view class="right">
						<view
							v-for="(m, i) in customMenuData[m1].child"
							:class="i == m2 ? 'active' : ''"
							@click="choose('2', i)"
						>
							{{ m }}
						</view>
					</view>
				</view>
				<view class="action-box">
					<ste-button
						width="320"
						background="rgba(0,0,0,0)"
						borderColor="#0090FF"
						color="#0090FF"
						@click="confirm"
					>
						重置
					</ste-button>
					<ste-button width="320" @click="confirm">确认</ste-button>
				</view>
			</view>
		</ste-dropdown-menu>
	</view>
</view>
</template>
<script>
export default {
	data() {
		return {
			customMenuData: [
				{ name: '服务台业务', child: ['雨伞租借', '礼品包装', '电费代收', '便民药箱', '赠品发放'] },
				{ name: '客户心声', child: ['雨伞租借2', '礼品包装2', '电费代收2', '便民药箱2', '赠品发放3'] },
				{ name: '招商服务', child: ['雨伞租借3', '礼品包装3', '电费代收3', '便民药箱3', '赠品发放3'] },
			],
			m1: 0,
			m2: 0,
		}
	},
	methods: {
			choose(type, v) {
		if (type == '1') {
			this.m1 = v;
			this.m2 = 0;
		} else {
			this.m2 = v;
		}
	},
	confirm() {
		this.$refs.steDropMenu.close();
	},
	}
}
</script>
<style lang='scss'>
.menu-item {
	display: flex;
	padding: 0 20rpx;
	width: 100%;
	box-shadow: 0 0 10px #ddd;
	> view {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.custom-menu-box {
		background-color: #fff;
		padding-top: 24rpx;
		border-top: solid 4rpx #f5f5f5;

		.menu-box {
			width: 100%;
			display: flex;
			margin-bottom: 56rpx;
			font-size: 28rpx;
			.left {
				width: 236rpx;
				background-color: #f9f9f9;

				> view {
					height: 90rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					&.active {
						background-color: #fff;
						color: #0090FF;
					}
				}
			}

			.right {
				flex: 1;
				margin-left: 26rpx;
				margin-right: 18rpx;
				background-color: #fff;
				> view {
					height: 90rpx;
					display: flex;
					align-items: center;

					&:not(:last-child) {
						border-bottom: 2rpx solid #f9f9f9;
					}

					&.active {
						color: #0090FF;
						font-weight: bold;
					}
				}
			}
		}

		.action-box {
			padding: 0 40rpx;
			display: flex;
			justify-content: space-between;

			padding-bottom: 20rpx;
		}
	}
}
</style>
```


#### 选中颜色 & 未选中颜色用
```html
<view>
	<ste-dropdown-menu value="1" activeColor="#e9e">
		<ste-dropdown-menu-item value="1" title="全部商品" />
		<ste-dropdown-menu-item value="2" title="新款商品" />
		<ste-dropdown-menu-item value="3" title="活动商品" />
	</ste-dropdown-menu>
</view>
<view>
	<ste-dropdown-menu value="2" inactiveColor="#53e">
		<ste-dropdown-menu-item value="1" title="默认排序" />
		<ste-dropdown-menu-item value="2" title="销量排序" />
		<ste-dropdown-menu-item value="3" title="价格排序" />
	</ste-dropdown-menu>
</view>
```

#### 展开方向
```html
<view>
	<ste-dropdown-menu title="手机" direction="down">
		<ste-dropdown-menu-item value="1" title="选项1" />
		<ste-dropdown-menu-item value="2" title="选项2" />
	</ste-dropdown-menu>
</view>
<view>
	<ste-dropdown-menu title="手机" direction="up">
		<ste-dropdown-menu-item value="1" title="选项1" />
		<ste-dropdown-menu-item value="2" title="选项2" />
	</ste-dropdown-menu>
</view>
```

#### 展开动画时间
```html
<view>
	<ste-dropdown-menu value="1" :duration="0.8">
		<ste-dropdown-menu-item value="1" title="全部商品" />
		<ste-dropdown-menu-item value="2" title="新款商品" />
		<ste-dropdown-menu-item value="3" title="活动商品" />
	</ste-dropdown-menu>
</view>
<view>
	<ste-dropdown-menu value="2" :duration="0">
		<ste-dropdown-menu-item value="1" title="默认排序" />
		<ste-dropdown-menu-item value="2" title="销量排序" />
		<ste-dropdown-menu-item value="3" title="价格排序" />
	</ste-dropdown-menu>
</view>
```

#### 遮罩
```html
<view>
	<ste-dropdown-menu value="1" :showMask="false" title="不显示遮罩">
		<ste-dropdown-menu-item value="1" title="全部商品" />
		<ste-dropdown-menu-item value="2" title="新款商品" />
		<ste-dropdown-menu-item value="3" title="活动商品" />
	</ste-dropdown-menu>
</view>
<view>
	<ste-dropdown-menu value="2" title="遮罩不关闭" :isMaskClick="false">
		<ste-dropdown-menu-item value="1" title="默认排序" />
		<ste-dropdown-menu-item value="2" title="销量排序" />
		<ste-dropdown-menu-item value="3" title="价格排序" />
	</ste-dropdown-menu>
</view>
```

#### 多选
```html
<view>
	<ste-dropdown-menu title="可选两项" :max="2">
		<ste-dropdown-menu-item value="1" title="选项1" />
		<ste-dropdown-menu-item value="2" title="选项2" />
		<ste-dropdown-menu-item value="3" title="选项3" />
	</ste-dropdown-menu>
</view>
<view>
	<ste-dropdown-menu title="可选三项" :max="3">
		<ste-dropdown-menu-item value="1" title="选项1" />
		<ste-dropdown-menu-item value="2" title="选项2" />
		<ste-dropdown-menu-item value="3" title="选项3" />
	</ste-dropdown-menu>
</view>
```

#### 禁用某项
```html
<view>
	<ste-dropdown-menu title="选择项" direction="up">
		<ste-dropdown-menu-item value="1" title="选项1" />
		<ste-dropdown-menu-item value="2" title="选项2" disabled />
		<ste-dropdown-menu-item value="3" title="选项3" />
	</ste-dropdown-menu>
</view>
```


---$
### API
#### Menu Props

| 参数				| 说明								| 类型			| 默认值		| 可选值									| 支持版本	|
| ---				| ---								| ---			| ---		| ---									| ---		|
| `title`			| 菜单标题，未设置时会显示选中项的值	| `String`		| -			| -										| -			|
| `value`			| 下拉菜单选中的值					| `String/Array`| -			| -										| -			|
| `inactiveColor`	| 未选中颜色							| `String`		| `#000000`	| -										| -			|
| `activeColor`		| 选中色								| `String`		| `#0090FF`	| -										| -			|
| `direction`		| 展开方向							| `String`		| `down`	| `up`: 向上展开<br/>`down`: 向下展开	| -			|
| `duration`		| 展开动画执行时间					| `Number`		| `0.2`		| -										| -			|
| `showMask`		| 是否展示遮罩						| `Boolean`		| `true`	| -										| -			|
| `isMaskClick`		| 是否点击遮罩关闭					| `Boolean`		| `true`	| -										| -			|
| `zIndex`			| 弹窗层级z-index					| `Number`		| `1000`	| -										| -			|
| `type`			| 下拉选项的形状						| `String`		| `block`	| `round`: 圆形<br/>`block`: 块状		| -			|
| `max`				| 可选数量							| `Number`		| `1`		| -										| -			|

#### MenuItem Props

| 参数		| 说明				| 类型		| 默认值		| 可选值	| 支持版本	|
| ---		| ---				| ---		| ---		| ---	| ---		|
| `value`	| 选中项对应的值		| `String`	| -			| -		| -			|
| `title`	| 选中项对应的标题	| `String`	| -			| -		| -			|
| `disabled`| 是否禁用			| `Boolean`	| `false`	| -		| -			|
| `readonly`| 只读（不置灰）		| `Boolean`	| `false`	| -		| -			|


#### Menu Events
|事件名		|说明				|事件参数			|支持版本	|
|---		|---				|---				|---		|
| `change`	| 点选项改变时触发	| `value`：选中值	| -			|
| `open`	| 菜单打开			| -					| -			|
| `close`	| 菜单收起			| -					| -			|

#### MenuItem Events
|事件名		|说明					|事件参数																|支持版本	|
|---		|---					|---																	|---		|
| `click`	|选中时触发(可拦截选中)	| `value`：当前的绑定值, `suspend`：调用暂停读取, `next`：后续的事件执行	| -			|


#### Menu Slots
|插槽名		|说明								|插槽参数	|支持版本	|
| ---		| ---								| ---		| ---		|
| `default`	| 内容插槽							| -			| -			|
| `icon`	| 选中项对应的图标(type为block生效）	| -			| -			|


#### MenuItem Slots
|插槽名		|说明		|插槽参数	|支持版本	|
| ---		| ---		| ---		| ---		|
| `default`	| 内容插槽	| -			| -			|


---$
{{fuyuwei}}