# AppUpdate App更新

此组件用于APP更新功能

---$

### 基础用法

- 属性`clientId`用于设置APP的应用编码
- 属性`clientSecret`用于设置APP的应用密钥
- 函数`start`用于开始检查更新
- 回调事`cancel`取消更新
- 回调事`complete`取消，成功更新都会执行

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
	},
};
</script>
<template>
    <ste-app-update ref="appUpdate" clientId="workbench_android" clientSecret="gkS6lEEncqAocYK2qsrvPQZykm3ISeMx"></ste-app-update>
    <button @click="checkForUpdates">检查更新</button>
</template>
```

---$

### API

#### Props
| 属性名 | 说明  | 类型 | 默认值  | 可选值 | 支持版本 |
| ----- | ----- | --- | ------- | ------ | -------- |
| `clientId` | 应用编码 | `string` | `` | - | - |
| `clientSecret` | 应用密钥 | `string` | `` | - | - |
| `apiUrl` | 更新API地址 | `string` | `https://zboa.whzb.com/inte-cloud-dev/blade-system/api/inte/client/ver/currentDetail` | - | - |
| `appType` | APP环境,版本号的最后一位为环境标识 | `string` | `` | - | - |
| `btnText` | 立即体验按钮文本 | `string` | `立即体验` | - | - |


#### Events
| 事件名 | 说明  | 事件参数 | 支持版本 |
| ----- | ----- | ------- | -------- |
| `cancel` | 取消更新 | - | - |
| `update` | 发现新版时本触发 | - | - |
| `no-update` | 没有新版时本触发 | - | - |


---$
{{xuyajun}}
