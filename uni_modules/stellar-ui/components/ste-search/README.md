# Search
- 这是一个搜索组件

### 兼容性
#### VUE支持 
|VUE2        | VUE3        |
|---        |---        |
|√                | ×                |
#### 平台支持
|App|H5应用	|微信小程序	|支付宝小程序	|百度小程序	|字节小程序	|QQ小程序	|
|:-:|:-:		|:-:			|:-:				|:-:			|:-:			|:-:			|
|x	|×			|√				|×					|×				|×				|×				|

### 使用示例
```html
<template>
	<view>
		<!-- 基础用法 -->
		<ste-search @search="onSearch" />
		<!-- 双向绑定 -->
		<ste-search v-model="keyword" @search="onSearch" />
		<!-- 隐藏清除图标 -->
		<ste-search :show-clear="0" @search="onSearch" />
		<!-- 禁用 -->
		<ste-search disabled />
		<!-- 隐藏分割线 -->
		<ste-search :show-line="0" @search="onSearch" />
		<!-- 隐藏按钮 -->
		<ste-search :show-button="0" />
		<!-- 自定义按钮文字 -->
		<ste-search button-text="查询" @search="onSearch" />
		<!-- 自定义占位符 -->
		<ste-search placeholder="自定义占位符" @search="onSearch" />
		<!-- 热词列表 -->
		<ste-search :hot-words="hotWords" @search="onSearch" />
		<!-- 导航 -->
		<ste-search :style-type="2" @nav-address="onNavAddress" />
	</view>
</template>
<script>
export default {
	data() {
		return {
			keyword: '一夜暴富',
			hotWords: ['中百集团', '数智云科技', '一夜暴富'],
		};
	},
	onLoad() {},
	methods: {
		onSearch(v) {
			uni.showToast({
				icon: 'none',
				title: `搜索：${v}`,
			});
		},
		onNavAddress() {
			uni.showToast({
				icon: 'none',
				title: '触发导航',
			});
		},
	},
};
</script>
```
## API
### Props
|属性名| 说明	|类型		|默认值	| 可选值	|其他说明		|
|--| --	|	--	|--	|--	|--		|
|typeStyle| 组件类型,1-正常搜索,2-导航	|	Number	|1	| 1/2	|	当typeStyle值为2时，点击任意区域触发导航事件	|
|value| 默认值（支持v-model双向绑定）	|	String	| ''	|	|		|
|placeholder| 占位提示符	|	String	| '搜索商品'	|	|		|
|hotWords| 热词列表	|	string[]	| []	|	|		|
|interval| 热词列表自动切换时间间隔	|	Number	| 3000	|	|		|
|disabled| 禁用	|	Boolean	| false	| false / true	|		|
|showLine| 是否显示分割线 0-不显示 1-显示	|	Number	| 1	| 0/1	|		|
|showButton| 是否显示按钮 0-不显示 1-显示	|	Number	| 1	| 0/1	|		|
|buttonText| 按钮文字	|	String	| '搜索'	|	|		|
|showClear| 是否显示清除图标 0-不显示 1-显示	|	Number	| 1	| 0/1	|		|


|属性名| 说明	|事件参数类型		|参数说明	|
|-----| ---	|	--------	|-------	|
|input|输入触发事件	|string		|输入框的文本	|
|search|点击搜索按钮触发事件	|string		|输入框的文本	|
|navAddress|导航事件`当typeStyle值为2时，点击任意区域触发`	|		|	|
