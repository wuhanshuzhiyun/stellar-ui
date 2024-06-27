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
import useMsgBox from '@/uni_modules/stellar-ui/components/ste-message-box/ste-message-box.js';
let steMsgBox = useMsgBox();
export default {
	methods: {
		showMsgBox: steMsgBox.showMsgBox,
		hideMsgBox: steMsgBox.hideMsgBox
	},
};

```
6. js文件中使用
```
import useMsgBox from '@/uni_modules/stellar-ui/components/ste-message-box/ste-message-box.js';
let steMsgBox = useMsgBox();
steMsgBox.showMsgBox();
```

### 代码演示

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