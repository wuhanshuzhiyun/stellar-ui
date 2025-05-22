# Table 表格

---$

### 代码演示
#### 基础使用
```html
<ste-table :data="rows">
	<template v-slot="{ row }">
		<ste-table-column label="姓名" prop="name"></ste-table-column>
		<ste-table-column label="生日" prop="birth"></ste-table-column>
		<ste-table-column label="性别" prop="sex"></ste-table-column>
	</template>
</ste-table>

<script />
export default {
	data() {
		return {
			rows: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '2024.11.01', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '男' },
			],
		}
	}
}
<script>
```

#### 带边框
```html
<ste-table :data="rows" border>
	<template v-slot="{ row }">
		<ste-table-column label="姓名" prop="name"></ste-table-column>
		<ste-table-column label="生日" prop="birth"></ste-table-column>
		<ste-table-column label="性别" prop="sex"></ste-table-column>
	</template>
</ste-table>

<script />
export default {
	data() {
		return {
			rows: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '2024.11.01', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '男' },
			],
		}
	}
}
<script>
```

#### 空数据显示
- 通过`table`中的`emptyText`属性来指定单元格中数据为空时显示的值，否则显示`-`
- 也可以通过插槽来自定义空数据时显示
```html
<ste-table :data="rows2" :stripe="false" emptyText="--">
	<template v-slot="{ row }">
		<ste-table-column label="姓名" prop="name">
			<span slot="empty">***</span>
		</ste-table-column>
		<ste-table-column label="生日" prop="birth"></ste-table-column>
		<ste-table-column label="性别" prop="sex"></ste-table-column>
	</template>
</ste-table>

<script />
export default {
	data() {
		return {
			rows2: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '', birth: '', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '' },
			],
		}
	}
}
<script>
```

#### 列类型
通过指定某列上的`type`属性
```html
<ste-table :data="rows">
	<template v-slot="{ row }">
		<ste-table-column
			label="序号"
			type="index"
			align="center"
			customKey="index"
		></ste-table-column>
		<ste-table-column label="姓名" prop="name"></ste-table-column>
		<ste-table-column label="生日" prop="birth"></ste-table-column>
		<ste-table-column label="性别" prop="sex"></ste-table-column>
	</template>
</ste-table>
<ste-table :data="rows">
	<template v-slot="{ row }">
		<ste-table-column
			label="选择"
			type="checkbox"
			align="center"
			customKey="checkbox"
		></ste-table-column>
		<ste-table-column label="姓名" prop="name"></ste-table-column>
		<ste-table-column label="生日" prop="birth"></ste-table-column>
		<ste-table-column label="性别" prop="sex"></ste-table-column>
	</template>
</ste-table>
<ste-table :data="rows">
	<template v-slot="{ row }">
		<ste-table-column
			label="选择"
			type="radio"
			align="center"
			customKey="checkbox"
		></ste-table-column>
		<ste-table-column label="姓名" prop="name"></ste-table-column>
		<ste-table-column label="生日" prop="birth"></ste-table-column>
		<ste-table-column label="性别" prop="sex"></ste-table-column>
	</template>
</ste-table>

<script />
export default {
	data() {
		return {
			rows: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '2024.11.01', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '男' },
			],
		}
	}
}
<script>
```
#### 禁用或只读选择项
传入一个自定义方法来指定某行是否能选择，方法会传入当前行数据(`row`)和下标(`index`)
只读同理
```html
<ste-table :data="rows" :selectable="selectableFun" :readable="readonlyFun">
	<template v-slot="{ row }">
		<ste-table-column label="选择" type="checkbox"></ste-table-column>
		<ste-table-column label="姓名" prop="name"></ste-table-column>
		<ste-table-column label="生日" prop="birth"></ste-table-column>
		<ste-table-column label="性别" prop="sex"></ste-table-column>
	</template>
</ste-table>

<script />
export default {
	data() {
		return {
			rows: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '2024.11.01', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '男' },
			],
		}
	}
	methods: {
		selectableFun(row, index) {
			return row.name !== '张三';
		},
		readonlyFun(row, index) {
			return row.name === '李四';
		},
	}
}
<script>
```

#### 显示合计
- 通过`showSummary`控制是否显示合计，`sumText`控制合计行第一列的文本
- `summaryMethod`来指定合计的方法，需要返回一个数组来确定每一列合计显示的内容
```html
<ste-table :data="rows" showSummary :summaryMethod="summaryMethod">
	<template v-slot="{ row }">
		<ste-table-column
			label="序号"
			type="index"
			align="center"
			customKey="index"
		></ste-table-column>
		<ste-table-column label="姓名" prop="name"></ste-table-column>
		<ste-table-column label="生日" prop="birth"></ste-table-column>
		<ste-table-column label="性别" prop="sex"></ste-table-column>
	</template>
</ste-table>

<script />
export default {
	data() {
		return {
			rows: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '2024.11.01', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '男' },
			],
		}
	}
	methods: {
		summaryMethod({ columns, data }) {
			let res = columns.map(() => '');
			columns.forEach((col, index) => {
				if (col.prop === 'name' || col.prop === 'name') {
					res[index] = data.length + '人';
				}
			});
			return res;
		}
	}
}
<script>
```

#### 对齐方式
- 通过`align`指定某列的单元格的对齐方式
- `headerAlign`指定表头的单元格对齐方式， 没设置时跟随`align`值
```html
<ste-table :data="rows">
	<template v-slot="{ row }">
		<ste-table-column label="姓名" prop="name" align="right"></ste-table-column>
		<ste-table-column label="生日" prop="birth" headerAlign="center"></ste-table-column>
		<ste-table-column label="性别" prop="sex"></ste-table-column>
	</template>
</ste-table>
```

#### 表格方法
```html
<ste-table
	:data="rows"
	ref="steTable"
>
	<template v-slot="{ row }">
		<ste-table-column
			label="选择"
			type="checkbox"
			align="center"
			customKey="checkbox"
		></ste-table-column>
		<ste-table-column label="姓名" prop="name" align="right"></ste-table-column>
		<ste-table-column label="生日" prop="birth" headerAlign="center"></ste-table-column>
		<ste-table-column label="性别" prop="sex"></ste-table-column>
	</template>
</ste-table>
<ste-button :mode="100" @click="toggleAllSelection">切换全选</ste-button>
<ste-button :mode="100" @click="clearSelect">取消所有选择</ste-button>
<ste-button :mode="100" @click="toggleRowSelection(1)">选中第二行</ste-button>
<ste-button :mode="100" @click="toggleRowSelection(0)">选中第一行</ste-button>

<script />
export default {
	data() {
		return {
			rows: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '2024.11.01', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '男' },
			],
		}
	}
	methods: {
		clearSelect() {
			this.$refs.steTable.clearSelection();
		},
		toggleAllSelection() {
			this.$refs.steTable.toggleAllSelection();
		},
		toggleRowSelection(i) {
			this.$refs.steTable.toggleRowSelection(this.rows[i]);
		},
	}
}
<script>
```

#### 表格滚动
此时需要给表格设置高度`height`，并保证表体高度是大于此高度，此时表格可以滚动，且滚动到底部时触发`scrollToLower`事件
```html
<ste-table :data="rows3" height="500" @scrollToLower="scrollToLower">
	<template v-slot="{ row }">
		<ste-table-column label="姓名" prop="name" width="200"></ste-table-column>
		<ste-table-column label="生日" prop="birth" width="200"></ste-table-column>
		<ste-table-column label="性别" prop="sex" width="300"></ste-table-column>
	</template>
</ste-table>
<script>
export default {
	data() {
		return {
			rows: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '2024.11.01', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '男' },
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '2024.11.01', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '男' },
			],
		}
	},
	methods: {
		scrollToLower() {
			this.showToast({
				title: '到底了',
			});
		},
	}
}
</script>
```

#### 自定义列
当需要格式化某列时，可以不设置列的`prop`，但需要设置`customKey`值，然后给表格传入一个`formatter`方法，
方法中第一个参数是每一行的数据，第二个参数是列的`customKey`，示例如下
```html
<ste-table :data="rows" :formatter="formatterFun">
	<template v-slot="{ row }">
		<ste-table-column label="姓名" prop="name"></ste-table-column>
		<ste-table-column label="状态" customKey="state"></ste-table-column>
		<ste-table-column label="操作1" align="center">
			<view style="display: flex; justify-content: center">
				<ste-icon
					code="&#xe6b0;"
					color="red"
					size="32"
					v-if="row.name === '张三'"
				></ste-icon>
				<ste-icon code="&#xe6b0;" size="32" v-else></ste-icon>
			</view>
		</ste-table-column>
		<ste-table-column label="操作2">
			<ste-button :mode="100" @click="handleEdit">编辑</ste-button>
		</ste-table-column>
	</template>
</ste-table>
<script>
export default {
	data() {
		return {
			rows: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '2024.11.01', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '男' },
			],
		}
	},
	methods: {
		formatterFun(row, key) {
			if (key === 'state') {
				if (row.state === 1) {
					return '进行中';
				} else if (row.state === 2) {
					return '已完成';
				} else {
					return '无状态';
				}
			}
		}
	}
}
</script>
```

#### 动态设置表头
当需要动态设置表头，可以不设置列的`label`，但需要设置`customKey`值，然后给表格传入一个`header`方法，
方法中第一个参数是列的数据，第二个参数是表格的数据`data`，示例如下
```html
<ste-table :data="rows" :header="headerFun">
	<template v-slot="{ row }">
		<ste-table-column prop="name" customKey="name" width="200"></ste-table-column>
		<ste-table-column label="生日" prop="birth" width="200"></ste-table-column>
		<ste-table-column label="性别" prop="sex" width="300"></ste-table-column>
	</template>
</ste-table>
<script>
export default {
	data() {
		return {
			rows: [
				{ name: '张三', birth: '2023.12.31', sex: '男', state: 1 },
				{ name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
				{ name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
				{ name: '赵六', birth: '2024.11.01', sex: '女', state: 2 },
				{ name: '王七', birth: '2024.01.01', sex: '男', state: 1 },
			]
		}
	},
	methods: {
		headerFun(e1, tableData) {
			if (e1.customKey == 'name') {
				return tableData[0].name;
			} 
		},
	}
}
</script>
```

#### 自定义边框样式
表格边框样式不满足时，可通过css更改样式
```html
<view class="my-table">
	<ste-table :data="rows" class="my-table-1" border>
		<template v-slot="{ row }">
			<ste-table-column label="姓名" prop="name"></ste-table-column>
			<ste-table-column label="生日" prop="birth"></ste-table-column>
			<ste-table-column label="性别" prop="sex"></ste-table-column>
		</template>
	</ste-table>


	<ste-table :data="rows" class="my-table-2">
		<template v-slot="{ row }">
			<ste-table-column label="姓名" prop="name"></ste-table-column>
			<ste-table-column label="生日" prop="birth"></ste-table-column>
			<ste-table-column label="性别" prop="sex"></ste-table-column>
		</template>
	</ste-table>

	<ste-table :data="rows" class="my-table-3">
		<template v-slot="{ row }">
			<ste-table-column label="姓名" prop="name"></ste-table-column>
			<ste-table-column label="生日" prop="birth"></ste-table-column>
			<ste-table-column label="性别" prop="sex"></ste-table-column>
		</template>
	</ste-table>

	<ste-table :data="rows" class="my-table-4">
		<template v-slot="{ row }">
			<ste-table-column label="姓名" prop="name"></ste-table-column>
			<ste-table-column label="生日" prop="birth"></ste-table-column>
			<ste-table-column label="性别" prop="sex"></ste-table-column>
		</template>
	</ste-table>
</view>
<script />
export default {
	data() {
		return {
			rows: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '2024.11.01', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '男' },
			],
		}
	}
}
<script>
<style lang="scss">
.my-table {
	
	::v-deep .my-table-1 {
		.ste-table-content {
			border-left: none;
	
			.ste-table-header,
			.ste-table-body .ste-table-row {
				.ste-table-cell:nth-last-child(1) {
					border-right: none;
				}
			}
		}
	}
	
	::v-deep .my-table-2 {
		.ste-table-content {
			border: 2rpx solid #ebebeb;
		}
		.ste-table-header,
		.ste-table-body .ste-table-row {
			.ste-table-cell {
				border: none;
			}
		}
	}
	
	::v-deep .my-table-3 {
		.ste-table-header {
			.ste-table-cell {
				border: none;
			}
		}
		.ste-table-body .ste-table-row {
			.ste-table-cell {
				border-top: 2rpx solid #ebebeb;
				border-bottom: none;
			}
		}
	}
	
	::v-deep .my-table-4 {
		.ste-table-header {
			.ste-table-cell {
				border: none;
				border-right: 2rpx solid #ebebeb;
			}
		}
		.ste-table-body .ste-table-row {
			.ste-table-cell {
				border: none;
				border-right: 2rpx solid #ebebeb;
	
				&:nth-last-child(1) {
					border-right: none;
				}
			}
		}
	}
}
</style>
```

#### 自定义行或单元格样式
```html
<ste-table
	:data="rows"
	:header-row-class-name="headerRowClassName"
	:header-row-style="headerRowStyle"
	:header-cell-class-name="headerCellClassName"
	:header-cell-style="headerCellStyle"
	:row-class-name="rowClassName"
	:row-style="rowStyle"
	:cell-style="cellStyle"
	:cell-class-name="cellClassName"
>
	<template v-slot="{ row }">
		<ste-table-column label="姓名" prop="name"></ste-table-column>
		<ste-table-column label="生日" prop="birth"></ste-table-column>
		<ste-table-column label="性别" prop="sex"></ste-table-column>
	</template>
</ste-table>
<script>
export default {
	data() {
		return {
			rows: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '2024.11.01', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '男' },
			],
		}
	},
	methods: {
		headerRowClassName() {
			return 'header-row';
		},
		headerRowStyle(e) {
			return { fontSize: '36rpx' };
		},
		headerCellClassName({ column, columnIndex }) {
			return 'header-row-cell';
		},
		headerCellStyle() {
			return { color: 'pink' };
		},
		rowClassName({ row, rowIndex }) {
			if (rowIndex % 2 == 0) {
				return 'nice-row';
			} else {
				return 'bad-row';
			}
		},
		rowStyle({ row, rowIndex }) {
			if (rowIndex % 2 == 0) {
				return { color: 'green' };
			} else {
				return { color: 'red' };
			}
		},
		cellClassName({ column, columnIndex, row, rowIndex }) {
			if (columnIndex === 1 && rowIndex % 2 == 0) {
				return 'custom-cell';
			}
		},
		cellStyle({ column, columnIndex, row, rowIndex }) {
			if (columnIndex === 1) {
				return { color: 'blue' };
			}
		}
	}
}
</script>

```

#### 高亮行
`highlight-current-row`为`true`点击某一行时会高亮显示
`hightlight-selection-row`为`true`时，列类型为`checkbox`时，勾选后会高亮
```html
<ste-table :data="rows" highlight-current-row highlight-selection-row>
	<template v-slot="{ row }">
		<ste-table-column
			label="选择"
			type="checkbox"
			align="center"
			customKey="checkbox"
		></ste-table-column>
		<ste-table-column label="姓名" prop="name"></ste-table-column>
		<ste-table-column label="生日" prop="birth"></ste-table-column>
		<ste-table-column label="性别" prop="sex"></ste-table-column>
	</template>
</ste-table>

```

#### 配置选择项图标色
需要指定属性`selectionIconColor`，数据结构如下
```js
{
	main: '#3491FA', // 主色，选中时的颜色
	unSelected: '#BBBBBB', // 未选中的线框颜色
	disabled: '#E6E6E6', // 禁用时背景色
	readonly: 'rgba(52, 145, 250, 0.4)' // 只读时背景色
}
```

#### 合并单元格
在需要合并行时，需要该列的数据类型为数组且只能为字符串数组
```html
<ste-table :data="rows4" border>
	<template v-slot="{ row }">
		<ste-table-column label="评价项目" prop="project"></ste-table-column>
		<ste-table-column label="评价标准" prop="desc"></ste-table-column>
		<ste-table-column label="分值" prop="score" width="150"></ste-table-column>
		<ste-table-column label="得分" prop="sum" width="150"></ste-table-column>
	</template>
</ste-table>
export default {
	data() {
		return {
			rows4: [
				{
					project: '入店时的寒暄语',
					desc: [
						'打招呼的声音很小，听不到，没有看着顾客一方等。',
						'店员看着顾客一方，可以听到响亮且有朝气的问候声。',
						'「感觉普通」店员看着顾客一方有问候，但是声音不响亮无朝气。但是声音不响亮无朝气但是声音不响亮无朝气',
					],
					score: [5, 11, 1],
					sum: 0,
				},
				{
					project: '收银机前的引导',
					desc: [
						'・POS收银机前排队等待的顾客≦3人(不含正在结账的顾客)。',
						'其他店员没有注意到有3位以上的顾客在排队，或收银的店员不向',
					],
					score: [5, 1],
					sum: 0,
				},
			]
		}
	}
}
```

#### 单元格文字超出时气泡显示内容
文字超长不需要完全展示时可通过此配置省略显示，通过长按显示气泡内容
```html
<ste-table :data="rows5" isPopover>
	<template v-slot="{ row }">
		<ste-table-column label="文字1" prop="t1"></ste-table-column>
		<ste-table-column label="文字2" prop="t2"></ste-table-column>
		<ste-table-column label="文字3" prop="t3"></ste-table-column>
	</template>
</ste-table>
export default {
	data() {
		return {
			rows5: [
                { t1: '张三', t2: '我是张三我是张三我是张三我是张三', t3: '男男男男男男男男男' },
                { t1: '李四', t2: '你是李四你是李四你是李四你是李四你是李四', t3: '女' },
                { t1: '王五王五王五', t2: '王五描述', t3: '女' },
                { t1: '赵六赵六赵六赵六', t2: '赵六', t3: '女' },
                { t1: '王七', t2: '他是王七他是王七他是王七他是王七他是王七', t3: '女女女女女女女' },
            ]
		}
	}
}

```

---$
### API
#### Table Props

| 属性名					| 说明																							| 类型														| 默认值		| 可选值	| 支持版本	|
| -----						| -----																							| -----														| -----		| -----	| -----		|
| `data`					| 表格数据																						| `Array`													| -			| -		| -			|
| `fixed`					| 表头是否定位为fixed																				| `Boolean`													| `false`	| -		| -			|
| `offsetTop`				| 定位fixed时top的距离																			| `Number/String`											| -			| -		| -			|
| `border`					| 是否带有纵向边框																					| `Boolean`													| `false`	| -		| -			|
| `stripe`					| 是否斑马纹																						| `Boolean`													| `true`	| -		| -			|
| `emptyText`				| 空数据时显示的文本内容，也可以通过 slot="empty" 设置												| `String`													| `暂无数据`	| -		| -			|
| `showSummary`				| 是否在表尾显示合计行																				| `Boolean`													| `false`	| -		| -			|
| `sumText`					| 合计行第一列的文本																				| `String`													| `合计`		| -		|
| `summaryMethod`			| 自定义的合计计算方法																				| `Function({ columns, data })`								| `null`	| -		| -			|
| `selectable`				| 仅对 type=checkbox 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选	| `Function(row, index)`									| `null`	| -		| -			|
| `readable`				| 仅对 type=checkbox 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否只读		| `Function(row, index)`									| `null`	| -		| -			|
| `formatter`				| 格式化方法，需要配合`TableColumn`中的`customKey`属性												| `Function(row, key)`										| `null`	| -		| `v1.17.3`	|
| `height`					| 表格高度，设置该值可以让表格体开启滚动																| `Number/String`											| -			| -		| `v1.18.9`	|
| `header`					| 格式化表头内容的方法，同formatter属性，需要定义customKey属性											| `Function(column, tableData)`								| -			| -		| `v1.20.2`	|
| `headerRowClassName`		| 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className						| `Function()/String`										| -			| -		| `v1.23.5`	|
| `headerRowStyle`			| 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style						| `Function()/Object`										| -			| -		| `v1.23.5`	|
| `headerCellClassName`		| 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className				| `Function({ column, columnIndex })/String`				| -			| -		| `v1.23.5`	|
| `headerCellStyle`			| 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style				| `Function({ column, columnIndex })/Object`				| -			| -		| `v1.23.5`	|
| `rowClassName`			| 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className							| `Function({ row, rowIndex })/String`						| -			| -		| `v1.23.5`	|
| `rowStyle`				| 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style							| `Function({ row, rowIndex })/Object`						| -			| -		| `v1.23.5`	|
| `cellClassName`			| 单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className					| `Function({ column, columnIndex, row, rowIndex })/String`	| -			| -		| `v1.23.9`	|
| `cellStyle`				| 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style					| `Function({ column, columnIndex, row, rowIndex })/Object`	| -			| -		| `v1.23.9`	|
| `highlightCurrentRow`		| 是否要高亮当前行																					| `Boolean`													| `false`	| -		| `v1.23.5`	|
| `highlightSelectionRow`	| 是否要高亮复选框选中行（仅针对开启 checkbox 有效）													| `Boolean`													| `false`	| -		| `v1.23.5`	|
| `showHeader`				| 是否显示表头																					| `Boolean`													| `true`	| -		| `v1.23.5`	|
| `maxHeight`				| 表格最大高度																					| `Number/String`											| -			| -		| `v1.23.5`	|
| `selectionIconColor`		| 配置选择项图标色																					| `Object`													| -			| -		| `v1.23.9`	|
| `isPopover`				| 单元格超长时是否气泡显示																			| `Boolean`													| `false`	| -		| `v1.34.1`	|

#### Table Events
|事件名				|说明											|事件参数																|支持版本	|
| ---				| ---											| ---																	| ---		|
| `select`			| 当用户手动勾选数据行的 Checkbox 时触发的事件	| `selection`：当前已选中的数据<br/>`row`：当前行的数据					| -			|
| `selectAll`		| 当用户手动勾选全选 Checkbox 时触发的事件		| `selection`：当前已选中的数据											| -			|
| `cellClick`		| 当某个单元格被点击时会触发该事件				| `row`：当前行的数据<br/>`column`：当前列的数据<br/>`event`：Event对象	| -			|
| `rowClick`		| 当某一行被点击时会触发该事件					| `row`：当前行的数据<br/>`event`：Event对象								| -			|
| `headerClick`		| 当某一列的表头被点击时会触发该事件				| `column`：当前列的数据<br/>`event`：Event对象							| -			|
| `scrollToLower`	| 表格体滚动到底事件								| -																		| `v1.18.9`	|

#### Table Method
> `toggleRowSelection`方法的`isTriggerSelectEvent`参数在`v1.22.2`版本后才支持

|方法名					|说明								|方法参数																		|支持版本	|
| ---					| ---								| ---																			| ---		|
| `clearSelection`		| 用于多选表格，清空用户的选择		| -																				| -			|
| `toggleRowSelection`	| 用于多选表格，切换某一行的选中状态	| `row`：需要选中行的数据<br/>`isTriggerSelectEvent`: 是否会触发表格的`select`事件	| -			|
| `toggleAllSelection`	| 用于多选表格，切换所有行的选中状态	| -																				| -			|
| `getSelection`		| 获取当前表格的选中状态的数据		| -																				| `v1.22.1`	|



#### TableColumn Props

| 属性名		| 说明											| 类型		| 默认值	| 可选值																						| 支持版本	|
| -----			| -----											| -----		| -----	| -----																						| -----		|
| `type`		| 对应列的类型									| `String`	| -		| `checkbox`：显示多选框<br/>`radio`：显示单选框<br/>`index`：显示该行的索引（从 1 开始计算	| -			|
| `label`		| 显示的标题										| `String`	| -		| -																							| -			|
| `prop`		| 对应列内容的字段名								| `String`	| -		| -																							| -			|
| `width`		| 对应列的宽度									| `String`	| -		| -																							| -			|
| `minWidth`	| 对应列的最小宽度								| `String`	| -		| -																							| -			|
| `align`		| 对齐方式										| `String`	| `left`| -																							| -			|
| `headerAlign`	| 表头对齐方式，若不设置该项，则使用表格的对齐方式	| `String`	| `left`| `left`：左对齐<br/>`center`：居中对齐<br/>`right`：右对齐									| -			|
| `customKey`	| 自定义唯一key值								| `String`	| -		| -																							| `v1.17.3`	|

---$
{{fuyuwei}}