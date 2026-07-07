# AppUpdate App更新

- 此组件用于APP更新功能
- 仅支持APP端
- 支持整包升级(apk)和资源包升级(wgt)

---

### 基础用法

- 属性`clientId`用于设置APP的应用编码
- 属性`clientSecret`用于设置APP的应用密钥
- 属性`fallbackApiUrl`用于设置兜底检查接口地址
- 属性`strictVersionCheck`用于设置严格版本检查模式
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
        :strictVersionCheck="true"
        @skip-version="onSkipVersion"
        @fallback="onFallback"
    ></ste-app-update>
    <button @click="checkForUpdates">检查更新</button>
    <button @click="getSkippedList">获取跳过版本列表</button>
    <button @click="clearSkipped">清空跳过记录</button>
</template>
```

---

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
| `fallbackApiUrl`| 兜底检查接口地址										| `string`					| `https://stellar-public-prd.intecloud.com.cn/api/app-update/check`			| -			| `1.41.0`|
| `strictVersionCheck`| 严格版本检查，设为true时只有新版本大于当前版本才触发更新 | `boolean` | `false` | `true/false` | - |


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
| `cancelDownload()` | 取消当前下载任务 | - | - |
| `install()` | 安装已下载的更新包（仅整包升级时可用） | - | - |


---

### API 返回数据格式

更新接口(`apiUrl`)返回数据格式：

```json
{
  "code": 200,
  "data": {
    "code": "101",
    "name": "1.0.1",
    "desc": "更新内容描述",
    "isForce": false,
    "entireFile": "https://example.com/app.apk",
    "updateFile": "https://example.com/app.wgt"
  }
}
```

| 字段 | 类型 | 说明 |
| ----- | ----- | ----- |
| `code` | string | 版本号 |
| `name` | string | 版本名称 |
| `desc` | string | 更新内容描述 |
| `isForce` | boolean | 是否强制更新 |
| `entireFile` | string | 整包升级文件地址(apk) |
| `updateFile` | string | 资源包升级文件地址(wgt) |

> 当 `entireFile` 存在时，优先使用整包升级(`package_type=0`)，否则使用资源包升级(`package_type=1`)

---

### 更新流程说明

1. 调用 `start()` 方法开始检查更新
2. 先检查兜底接口(`fallbackApiUrl`)，命中则触发兜底更新流程
3. 调用正常更新接口(`apiUrl`)获取版本信息
4. 检查是否已跳过该版本
5. 检查版本是否需要更新（根据 `strictVersionCheck` 决定比较方式）
6. 检查是否存在未完成的下载任务，有则恢复下载
7. 弹出更新弹窗，用户可选择立即更新、跳过版本或取消
8. 下载完成后自动安装(wgt)或提示安装(apk)