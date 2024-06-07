# Toast 轻提示

在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

{{compatibility}}


### 代码演示

### 使用方法
#### H5端
在需要使用的页面需要引入组件
```html
<root-portal><ste-toast id="steToast"></ste-toast></root-portal>
```
#### 小程序端
1. 安装 `vue-inset-loader` 插件
```
npm install vue-inset-loader --save-dev
```
2. 配置 `page.json` 信息
```
"insetLoader": {
	"config": {
		"toast": "<root-portal><ste-toast id='steToast'></ste-toast></root-portal>"
	},
	// 全局配置  
	"label": ["toast"],
	"rootEle": "view"
},
```
3. 配置 `vue.config.js` 信息
```
chainWebpack: (config) => {
	config.resolveLoader.alias.set('vue-inset-loader', __dirname + '/node_modules/vue-inset-loader');
	config.module
		.rule('vue-inset-loader')
		.test(/\.vue$/)
		.use('vue-inset-loader')
		.loader('vue-inset-loader')
		.end();
},
```
4. 在`main.js`里引入混淆文件`app-mixin.js`
```
import mixin from './app-mixin.js';
Vue.mixin(mixin);
```
5. 在混淆文件`app-mixin.js`里引入组件的`js`文件,将`showToast`和`hideToast`方法混入全局，每个页面通过 `this.` 来使用对应的方法
```
import useSteToast from '@/uni_modules/stellar-ui/components/ste-toast/ste-toast.js';
let steToast = useSteToast();
let $state = steToast.$state;
export default {
	methods: {
		showToast: steToast.showToast,
		hideToast: steToast.hideToast,
	},
};

```

#### 文字提示
`title`为提示内容，提示弹窗根据内容自动撑开，最大宽度为260px，超过自动换行，也可手动插入换行符`\n`
```
click1() {
	this.showToast({
		title: '提示内容',
	});
},
click2() {
	this.showToast({
		title: '多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，',
	});
},
click3() {
	this.showToast({
		title: '换行\n内容',
	});
},
```

### 提示类型
`icon`为固定的图标类型，默认为`success`，为`loading`时，弹窗不会自动关闭，需手动关闭弹窗，使用`hideToast`方法
- `success`：显示成功图标
- `error`：显示失败图标
- `loading`：显示加载图标
- `none`：无图标

```
click4() {
	this.showToast({
		title: '提示内容',
	});
},
click5() {
	this.showToast({
		title: '提示内容',
		icon: 'error',
	});
},
click6() {
	this.showToast({
		title: '提示内容',
		icon: 'loading',
	});
},
click7() {
	this.showToast({
		title: '提示内容',
		icon: 'none',
	});
},
```
`image`为自定义图标的路径，image 的优先级高于 icon
```
click8() {
	this.showToast({
		title: '提示内容',
		image: 'https://image.whzb.com/chain/StellarUI/组件图标/loading.png',
	});
},
```

### 遮罩层
`mask`为是否显示透明蒙层，防止触摸穿透，默认为`false`
```
click9() {
	this.showToast({
		title: '提示内容',
		mask: true,
		duration: 5000,
	});
},
```

### 延迟时间
`duration`为提示的延迟时间，单位ms 值为 0 时，toast 不会自动消失（loading 类型默认为 0）
```
click10() {
	this.showToast({
		title: '提示内容',
		duration: 5000,
	});
},
```

### 回调事件
- `success`：提示打开成功的回调函数
- `fail`：提示打开失败的回调函数
- `complete`：提示结束的回调函数（提示打开、失败都会执行）	
- `close`：提示关闭的的回调函数
```
click11() {
	this.showToast({
		title: '提示内容',
		success() {
			setTimeout(() => {
				uni.showToast({
					title: '成功',
					icon: 'none',
				});
			}, 2000);
		},
	});
},
click12() {
	this.showToast({
		title: '提示内容',
		complete() {
			setTimeout(() => {
				uni.showToast({
					title: '结束',
					icon: 'none',
				});
			}, 2000);
		},
	});
},
click13() {
	this.showToast({
		title: '提示内容',
		close() {
			uni.showToast({
				title: '关闭',
				icon: 'none',
			});
		},
	});
},
```

### API
#### 组件属性(Props)

| 参数		| 说明																				| 类型		| 默认值		| 可选值																								| 支持版本	|
| ---		| ---																				| ---		| ---		| ---																								| ---		|
| `title`	| 提示的内容																			| `String`	| -			| -																									| -			|
| `icon`	| 图标																				| `String`	| `success`	| `success`：显示成功图标<br/>`error`：显示失败图标<br/>`loading`：显示加载图标<br/>`none`：无图标<br/>	| -			|
| `image`	| 自定义图标的路径，image 的优先级高于 icon												| `String`	| -			| -																									| -			|
| `duration`| 提示的延迟时间，单位`ms` 值为 `0` 时，`toast` 不会自动消失（`loading` 类型默认为 `0`）	| `Number`	| `1500`	| -																									| -			|
| `mask`	| 是否显示透明蒙层，防止触摸穿透														| `Boolean`	| `false`	| -																									| -			|
| `success`	| 提示打开成功的回调函数																| `Function`| -			| -																									| -			|
| `fail`	| 提示打开失败的回调函数																| `Function`| -			| -																									| -			|
| `complete`| 提示结束的回调函数（提示打开、失败都会执行）											| `Function`| -			| -																									| -			|
| `close`	| 提示关闭的的回调函数																	| `Function`| -			| -																									| -			|

{{qinpengfei}}