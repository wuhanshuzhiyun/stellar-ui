# Table 表格

{{compatibility}}

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
#### 禁用选择项
传入一个自定义方法来指定某行是否能选择，方法会传入当前行数据(`row`)和下标(`index`)
```html
<ste-table :data="rows" :selectable="selectableFun">
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
<script>
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
	
	/deep/ .my-table-1 {
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
	
	/deep/ .my-table-2 {
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
	
	/deep/ .my-table-3 {
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
	
	/deep/ .my-table-4 {
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

### API
#### Table Props

| 属性名			| 说明																									| 类型							| 默认值		| 可选值	| 支持版本	|
| -----				| -----																									| -----							| -----		| -----	| -----		|
| `data`			| 表格数据																								| `Array`						| -			| -		| -			|
| `fixed`			| 表头是否定位为fixed																					| `Boolean`						| `false`	| -		| -			|
| `offsetTop`		| 定位fixed时top的距离																					| `Number/String`				| -			| -		| -			|
| `border`			| 是否带有纵向边框																						| `Boolean`						| `false`	| -		| -			|
| `stripe`			| 是否斑马纹																								| `Boolean`						| `true`	| -		| -			|
| `emptyText`		| 空数据时显示的文本内容，也可以通过 slot="empty" 设置													| `String`						| `暂无数据`	| -		| -			|
| `showSummary`		| 是否在表尾显示合计行																					| `Boolean`						| `false`	| -		| -			|
| `sumText`			| 合计行第一列的文本																						| `String`						| `合计`		| -		|
| `summaryMethod`	| 自定义的合计计算方法																					| `Function({ columns, data })`	| `null`	| -		| -			|
| `selectable`		| 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选	| `Function(row, index)`		| `null`	| -		| -			|
| `readonly`		| 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否只读		| `Function(row, index)`		| `null`	| -		| -			|
| `formatter`		| 格式化方法，需要配合`TableColumn`中的`customKey`属性													| `Function(row, key)`			| `null`	| -		| `v1.17.3`	|

#### Table Events
|事件名			|说明											|事件参数																|支持版本	|
| ---			| ---											| ---																	| ---		|
| `select`		| 当用户手动勾选数据行的 Checkbox 时触发的事件	| `selection`：当前已选中的数据<br/>`row`：当前行的数据					| -			|
| `selectAll`	| 当用户手动勾选全选 Checkbox 时触发的事件		| `selection`：当前已选中的数据											| -			|
| `cellClick`	| 当某个单元格被点击时会触发该事件				| `row`：当前行的数据<br/>`column`：当前列的数据<br/>`event`：Event对象	| -			|
| `rowClick`	| 当某一行被点击时会触发该事件					| `row`：当前行的数据<br/>`event`：Event对象								| -			|
| `headerClick`	| 当某一列的表头被点击时会触发该事件				| `column`：当前列的数据<br/>`event`：Event对象							| -			|

#### Table Method
|方法名					|说明								|方法参数					|支持版本	|
| ---					| ---								| ---						| ---		|
| `clearSelection`		| 用于多选表格，清空用户的选择		| -							| -			|
| `toggleRowSelection`	| 用于多选表格，切换某一行的选中状态	| `row`：需要选中行的数据	| -			|
| `toggleAllSelection`	| 用于多选表格，切换所有行的选中状态	| -							| -			|



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

{{fuyuwei}}