# Steps 步骤条

步骤条组件,拆分展示某项流程的步骤，引导用户按流程完成任务或向用户展示当前状态。

{{compatibility}}

### 代码演示
JavaScript后面的演示代码中涉及到的变量和方法都使用本javasaript代码
```
```

### 基础用法
`active` 为步骤进度，为 `Number` 类型，步骤的下标。
```
<ste-steps :active="active">
	<ste-step></ste-step>
	<ste-step></ste-step>
	<ste-step></ste-step>
</ste-steps>
```


