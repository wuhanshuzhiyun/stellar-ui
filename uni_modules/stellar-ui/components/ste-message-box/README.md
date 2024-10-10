# MessageBox 弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

{{compatibility}}
### 使用方法
1. 安装 `ste-vue-inset-loader` 插件
```
npm install ste-vue-inset-loader --save-dev
```
2. 配置 `pages.json` 信息
```
"insetLoader": {
	"config": {
		"msgBox": "<root-portal><ste-message-box id='steMessageBox'></ste-message-box></root-portal>"
	},
	// 全局配置  
	"label": ["msgBox"],
	"rootEle": "view"
},
```
3. 配置 `vue.config.js` 信息
```
chainWebpack: (config) => {
	config.module
	.rule('vue')
	.test(/\.vue$/)
	.use()
	.loader(path.resolve(__dirname, './node_modules/ste-vue-inset-loader'))
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
import useSteMsgBox from '@/node_modules/stellar-ui/components/ste-message-box/ste-message-box.js';
let steMsgBox = useSteMsgBox();
export default {
	methods: {
		showMsgBox: steMsgBox.showMsgBox,
		hideMsgBox: steMsgBox.hideMsgBox
	},
};

```
6. js文件中使用
```
import useSteMsgBox from '@/node_modules/stellar-ui/components/ste-message-box/ste-message-box.js';
let steMsgBox = useSteMsgBox();
steMsgBox.showMsgBox();
```

### 代码演示
#### 基础使用
可在标题(`title`)和内容(`content`)中使用`\n`来实现换行
```
this.showMsgBox({
	title: '确认删除订单吗？',
});
```

#### 带图标
- 内置三种图标类型：`info`、`success`、`error`
- 当显示图标时，内容(`content`)会失效，只显示标题(`title`)
```
msgBoxIcon1() {
	this.showMsgBox({
		title: '提示',
		icon: 'info',
	});
},
msgBoxIcon2() {
	this.showMsgBox({
		title: '提示',
		icon: 'success',
	});
},
msgBoxIcon3() {
	this.showMsgBox({
		title: '提示',
		icon: 'error',
	});
},
```

#### 自定义按钮
```
msgBoxBtn1() {
	this.showMsgBox({
		title: '提示',
		content: '确认删除订单吗？',
		cancelText: '算了',
		confirmText: '删吧',
	});
},
msgBoxBtn2() {
	this.showMsgBox({
		title: '提示',
		content: '确认删除订单吗？',
		cancelColor: '#e1e',
		confirmColor: '#a8ae1e',
	});
},
msgBoxBtn3() {
	this.showMsgBox({
		title: '提示',
		content: '确认删除订单吗？',
		showCancel: false,
	});
},
```

#### 显示输入框
当显示输入框时，内容(`content`)将不显示
```
msgBoxInput() {
	this.showMsgBox({
		title: '提示',
		content: '确认删除订单吗？',
		editable: true,
		placeholderText: '请输入',
	});
},
```

#### 插槽
如果提供的弹框内容不满足需求，可以使用插槽自定义弹框内容。
可以通过指定唯一标识`selector`的方式，在一个页面中使用多个`ste-message-box`，`useSteMsgBox(selector)`会返回一个指定了selector的组件实例。
```
<ste-button @click="customClick">插槽</ste-button>
<ste-message-box selector="myMsgBox">
	<view style="display: flex; justify-content: center; padding-bottom: 20rpx;width: 504rpx">
		<ste-rate v-model="rate"></ste-rate>
	</view>
</ste-message-box>
<script>
import useSteMsgBox from '@/node_modules/stellar-ui/components/ste-message-box/ste-message-box.js';
const msgBox = useSteMsgBox('myMsgBox');
export default {
	data() {
		return {
			rate: 0,
		}
	},
	methods: {
		customClick() {
			msgBox.showMsgBox({
				title: '评分',
			});
		},
	}
}
</script>

```

#### 回调事件
```
msgBoxCallback1() {
	this.showMsgBox({
		title: '提示',
		cancel: () => {
			this.showToast({
				title: '点击了取消',
			});
		},
	});
},
msgBoxCallback2() {
	this.showMsgBox({
		title: '提示',
		confirm: () => {
			this.showToast({
				title: '点击了确认',
			});
		},
	});
},
msgBoxCallback3() {
	this.showMsgBox({
		title: '提示',
		complete: () => {
			this.showToast({
				title: '弹框完成',
			});
		},
	});
},
```

### API
#### 组件属性(Props)

| 参数				| 说明											| 类型		| 默认值		| 可选值	| 支持版本	|
| ---				| ---											| ---		| ---		| ---	| ---		|
| `title`			| 提示的标题										| `String`	| -			| -		| -			|
| `content`			| 提示的内容										| `String`	| -			| -		| -			|
| `icon`			| 提示区域显示图标，此时content会失效				| `String`	| -			| -		| -			|
| `showCancel`		| 是否显示取消按钮								| `Boolean`	| `true`	| -		| -			|
| `cancelText`		| 提示的内容										| `String`	| `取消`		| -		| -			|
| `cancelColor`		| 取消按钮的文字颜色								| `String`	| `#333333`	| -		| -			|
| `confirmText`		| 确认按钮的文字，最多 4 个字符					| `String`	| `确认`		| -		| -			|
| `confirmColor`	| 确认按钮的文字颜色								| `String`	| `#0090ff`	| -		| -			|
| `editable`		| 是否显示输入框									| `Boolean`	| `false`	| -		| -			|
| `placeholderText`	| 显示输入框时的提示文本							| `String`	| -			| -		| -			|
| `confirm`			| 点击确认的回调函数								| `Function`| `null`	| -		| -			|
| `cancel`			| 点击取消的回调函数								| `Function`| `null`	| -		| -			|
| `complete`		| 弹框关闭的回调函数（无论是确认关闭还是取消关闭）	| `Function`| `null`	| -		| -			|


{{fuyuwei}}