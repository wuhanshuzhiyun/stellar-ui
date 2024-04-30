# DropdownMenu 下拉菜单

{{compatibility}}

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


{{fuyuwei}}