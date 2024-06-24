<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="表格"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础使用11</view>
				<view class="item-block">
					<view style="width: 100%; height: 30vh; background-color: #e1e"></view>
					<!-- <ste-sticky @fixed="onFixed" @unfixed="onUnfixed">
						<ste-button :round="false">粘性布局的按钮</ste-button>
					</ste-sticky> -->
					<view style="width: 100%">
						<ste-table
							offsetTop="100"
							sticky
							border
							ref="steTable"
							:data="rows"
							:selectable="selectableData"
							:stripe="false"
							emptyText="---"
							showSummary
							:summaryMethod="summaryMethod"
							@select="select"
							@selectAll="selectAll"
							@cellClick="cellClick"
							@rowClick="rowClick"
							@headerClick="headerClick"
						>
							<template v-slot="{ row }">
								<ste-table-column label="选择" type="checkbox" align="center"></ste-table-column>
								<!-- <ste-table-column label="序号" type="index" align="center"></ste-table-column> -->
								<ste-table-column label="姓名" prop="name"></ste-table-column>
								<ste-table-column label="出生日期" prop="birth" width="200">
									<span slot="empty">无初始</span>
								</ste-table-column>

								<ste-table-column label="操作">
									<ste-button :mode="100" @click="handleEdit">编辑</ste-button>
								</ste-table-column>
							</template>
						</ste-table>
					</view>
					<view>
						<ste-button :mode="100" @click="toggleAllSelection">切换全选</ste-button>
						<ste-button :mode="100" @click="clearSelect">取消所有选择</ste-button>
						<ste-button :mode="100" @click="toggleRowSelection">选中第二行</ste-button>
					</view>
					<view style="width: 100%; height: 200vh; background-color: #e1e"></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			rows: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '' },
			],
			name: '性别',
			selectableData: {
				key: '',
			},
		};
	},
	methods: {
		formatter(row, cellvalue) {
			console.log(' row is ', row);
			return 'n: ' + cellvalue;
		},
		selectable() {},
		handleEdit() {
			console.log('编辑了');
		},
		summaryMethod({ columns, data }) {
			console.log('columns, data', columns, data);
			let res = columns.map(() => '');
			columns.forEach((col, index) => {
				if (col.prop === 'name') {
					res[index] = data.length + '人';
				}
			});
			return res;
		},
		select(selection, row) {
			console.log('select', selection, row);
		},
		selectAll(selection) {
			console.log('selectAll', selection);
		},
		cellClick(row, column, event) {
			console.log('cellClick', row, column, event);
		},
		rowClick(row, event) {
			console.log('rowClick', row, event);
		},
		headerClick(column, event) {
			console.log('headerClick', column, event);
		},
		clearSelect() {
			this.$refs.steTable.clearSelection();
		},
		toggleAllSelection() {
			this.$refs.steTable.toggleAllSelection();
		},
		toggleRowSelection() {
			this.$refs.steTable.toggleRowSelection(this.rows[1]);
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	background-color: #ffffff;
	.content {
		padding: 0 20rpx;
		.demo-item {
			.item-block {
				> view {
					margin-bottom: 36rpx;
				}
			}
		}
	}
}
</style>
