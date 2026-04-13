# AppUpdate App更新

- 此组件用于APP更新功能
- 仅支持APP端

---$

### 基础用法

- 属性`clientId`用于设置APP的应用编码
- 属性`clientSecret`用于设置APP的应用密钥
- 属性`fallbackApiUrl`用于设置兜底检查接口地址
- 函数`start`用于开始检查更新
- 函数`getSkippedVersions`用于获取跳过版本列表
- 函数`clearSkippedVersions`用于清空跳过版本记录
- 回调事件`cancel`取消更新
- 回调事件`update`发现新版时触发
- 回调事件`no-update`没有新版时触发
- 回调事件`skip-version`跳过版本时触发
- 回调事件`fallback`命中兜底更新时触发

```html
<script>
export default {
	name: 'AppUpdateDemo',
	data() {
		return {};
	},
	methods: {
		// 监听检查更新结果
		checkForUpdates() {
			if (this.$refs.appUpdate) {
				this.$refs.appUpdate.start((resVersion, version) => {
					const { code, name } = resVersion;
					console.log(`当前版本号：${version}`);
					console.log(`服务器版本号：${code}；服务器版本名称${name}`);
				});
			}
		},
		// 获取跳过版本列表
		getSkippedList() {
			if (this.$refs.appUpdate) {
				const list = this.$refs.appUpdate.getSkippedVersions();
				console.log('已跳过的版本：', list);
			}
		},
		// 清空跳过记录
		clearSkipped() {
			if (this.$refs.appUpdate) {
				this.$refs.appUpdate.clearSkippedVersions();
			}
		},
	},
};
</script>
<template>
    <ste-app-update 
        ref="appUpdate" 
        clientId="workbench_android" 
        clientSecret="gkS6lEEncqAocYK2qsrvPQZykm3ISeMx"
        fallbackApiUrl="https://example.com/api/app-update/check"
        @skip-version="onSkipVersion"
        @fallback="onFallback"
    ></ste-app-update>
    <button @click="checkForUpdates">检查更新</button>
    <button @click="getSkippedList">获取跳过版本列表</button>
    <button @click="clearSkipped">清空跳过记录</button>
</template>
```

---$

### API

#### Props
| 属性名				| 说明																				| 类型							| 默认值																																	| 可选值	| 支持版本	|
| -----					| -----																			| ---							| -------																																	| ------| --------|
| `clientId`		| 应用编码																	| `string`					| -																																								| -			| -				|
| `clientSecret`| 应用密钥																	| `string`					| -																																								| -			| -				|
| `apiUrl`			| 更新API地址															| `string`					| `https://zboa.whzb.com/inte-cloud-dev/blade-system/api/inte/client/ver/currentDetail`	| -			| -				|
| `appType`			| APP环境,版本号的最后一位为环境标识	| `string`					| -																																								| -			| -				|
| `btnText`			| 立即体验按钮文本											| `string`					| `立即体验`																																			| -			| -				|
| `appVersion`	| 应用当前版本															| `string`					| -																																								| -			| `1.40.9`|
| `zIndex`			| 弹窗层级																		| `string/number`	| `998`																																							| -			| `1.40.9`|
| `fallbackApiUrl`| 兜底检查接口地址										| `string`					| -																																								| -			| `1.41.0`|


#### Events
| 事件名 | 说明  | 事件参数 | 支持版本 |
| ----- | ----- | ------- | -------- |
| `cancel` | 取消更新 | - | - |
| `update` | 发现新版时触发 | - | - |
| `no-update` | 没有新版时触发 | - | - |
| `skip-version` | 跳过版本时触发 | version: string | `1.41.0` |
| `fallback` | 命中兜底更新时触发 | { title, description, downloadUrl } | `1.41.0` |


#### Methods
| 方法名 | 说明 | 返回值 | 支持版本 |
| ----- | ----- | ----- | -------- |
| `start(callback)` | 开始检查更新 | - | - |
| `getSkippedVersions()` | 获取已跳过的版本列表 | string[] | `1.41.0` |
| `clearSkippedVersions()` | 清空跳过版本记录 | - | `1.41.0` |


---$
{{xuyajun}}
