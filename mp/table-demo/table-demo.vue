<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="表格"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Table 表格</view>
				<view class="cmp-desc">表格常用于展示同类结构下的多种数据，易于组织、对比和分析等。</view>
			</view>
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table :data="rows">
							<template v-slot="{ row }">
								<ste-table-column label="姓名" prop="name"></ste-table-column>
								<ste-table-column label="生日" prop="birth"></ste-table-column>
								<ste-table-column label="性别" prop="sex"></ste-table-column>
							</template>
						</ste-table>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">带边框</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table :data="rows" border>
							<template v-slot="{ row }">
								<ste-table-column label="姓名" prop="name"></ste-table-column>
								<ste-table-column label="生日" prop="birth"></ste-table-column>
								<ste-table-column label="性别" prop="sex"></ste-table-column>
							</template>
						</ste-table>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">空数据显示</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table :data="rows2" :stripe="false" emptyText="--">
							<template v-slot="{ row }">
								<ste-table-column label="姓名" prop="name">
									<span slot="empty">***</span>
								</ste-table-column>
								<ste-table-column label="生日" prop="birth"></ste-table-column>
								<ste-table-column label="性别" prop="sex"></ste-table-column>
							</template>
						</ste-table>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">列类型</view>
				<view class="item-block">
					<view style="width: 100%">
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
					</view>
					<view style="width: 100%">
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
					</view>
					<view style="width: 100%">
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
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">禁用和只读选项</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table :data="rows" :selectable="selectableFun" :readable="readonlyFun">
							<template v-slot="{ row }">
								<ste-table-column label="选择" type="checkbox"></ste-table-column>
								<ste-table-column label="姓名" prop="name"></ste-table-column>
								<ste-table-column label="生日" prop="birth"></ste-table-column>
								<ste-table-column label="性别" prop="sex"></ste-table-column>
							</template>
						</ste-table>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">显示合计</view>
				<view class="item-block">
					<view style="width: 100%">
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
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">对齐方式</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table :data="rows">
							<template v-slot="{ row }">
								<ste-table-column label="姓名" prop="name" align="right"></ste-table-column>
								<ste-table-column label="生日" prop="birth" headerAlign="center"></ste-table-column>
								<ste-table-column label="性别" prop="sex"></ste-table-column>
							</template>
						</ste-table>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">表格方法</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table
							:data="rows"
							ref="steTable"
							@select="select"
							@selectAll="selectAll"
							@cellClick="cellClick"
							@rowClick="rowClick"
							@headerClick="headerClick"
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
					</view>
					<ste-button :mode="100" @click="toggleAllSelection">切换全选</ste-button>
					<ste-button :mode="100" @click="clearSelect">取消所有选择</ste-button>
					<ste-button :mode="100" @click="toggleRowSelection(1)">选中第二行</ste-button>
					<ste-button :mode="100" @click="toggleRowSelection(0)">选中第一行</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">表格滚动</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table :data="rows3" height="500" @scrollToLower="scrollToLower">
							<template v-slot="{ row }">
								<ste-table-column label="姓名" prop="name" width="200"></ste-table-column>
								<ste-table-column label="生日" prop="birth" width="200"></ste-table-column>
								<ste-table-column label="性别" prop="sex" width="300"></ste-table-column>
							</template>
						</ste-table>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义列</view>
				<view class="item-block">
					<view style="width: 100%">
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
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">动态设置表头</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table :data="rows" :header="headerFun">
							<template v-slot="{ row }">
								<ste-table-column customKey="name" prop="name"></ste-table-column>
								<ste-table-column label="生日" prop="birth"></ste-table-column>
								<ste-table-column label="性别" prop="sex"></ste-table-column>
							</template>
						</ste-table>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义边框</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table :data="rows" class="my-table-1" border>
							<template v-slot="{ row }">
								<ste-table-column label="姓名" prop="name"></ste-table-column>
								<ste-table-column label="生日" prop="birth"></ste-table-column>
								<ste-table-column label="性别" prop="sex"></ste-table-column>
							</template>
						</ste-table>
					</view>
					<view style="width: 100%">
						<ste-table :data="rows" class="my-table-2">
							<template v-slot="{ row }">
								<ste-table-column label="姓名" prop="name"></ste-table-column>
								<ste-table-column label="生日" prop="birth"></ste-table-column>
								<ste-table-column label="性别" prop="sex"></ste-table-column>
							</template>
						</ste-table>
					</view>
					<view style="width: 100%">
						<ste-table :data="rows" class="my-table-3">
							<template v-slot="{ row }">
								<ste-table-column label="姓名" prop="name"></ste-table-column>
								<ste-table-column label="生日" prop="birth"></ste-table-column>
								<ste-table-column label="性别" prop="sex"></ste-table-column>
							</template>
						</ste-table>
					</view>
					<view style="width: 100%">
						<ste-table :data="rows" class="my-table-4">
							<template v-slot="{ row }">
								<ste-table-column label="姓名" prop="name"></ste-table-column>
								<ste-table-column label="生日" prop="birth"></ste-table-column>
								<ste-table-column label="性别" prop="sex"></ste-table-column>
							</template>
						</ste-table>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义行或单元格样式</view>
				<view class="item-block">
					<view style="width: 100%">
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
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">高亮行</view>
				<view class="item-block">
					<view style="width: 100%">
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
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">合并单元格</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table :data="rows4" border>
							<template v-slot="{ row }">
								<ste-table-column label="评价项目" prop="project"></ste-table-column>
								<ste-table-column label="评价标准" prop="desc"></ste-table-column>
								<ste-table-column label="分值" prop="score" width="150"></ste-table-column>
								<ste-table-column label="得分" prop="sum" width="150"></ste-table-column>
							</template>
						</ste-table>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">单元格文字超出时气泡显示内容</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table :data="rows5" isPopover>
							<template v-slot="{ row }">
								<ste-table-column label="文字1" prop="t1"></ste-table-column>
								<ste-table-column label="文字2" prop="t2"></ste-table-column>
								<ste-table-column label="文字3" prop="t3"></ste-table-column>
							</template>
						</ste-table>
					</view>
				</view>
			</view>

			<!-- 			<view class="demo-item">
				<view class="title">测试用例</view>
				<view class="item-block">
					<view style="width: 100%; height: 30vh; background-color: #e1e"></view>
					<view style="width: 100%">
						<ste-table
							offsetTop="100"
							sticky
							border
							:data="rows"
							:stripe="false"
							emptyText="---"
							showSummary
							:summaryMethod="summaryMethod"
							:selectable="selectableFun"
							@select="select"
							@selectAll="selectAll"
							@cellClick="cellClick"
							@rowClick="rowClick"
							@headerClick="headerClick"
						>
							<template v-slot="{ row }">
								<ste-table-column
									label="选择"
									type="checkbox"
									align="center"
									customKey="checkbox"
								></ste-table-column>
								<ste-table-column
									label="序号"
									type="index"
									align="center"
									customKey="index"
								></ste-table-column>
								<ste-table-column label="姓名" prop="name" customKey="name"></ste-table-column>
								<ste-table-column label="生日" prop="birth" width="200">
									<span slot="empty">无初始</span>
								</ste-table-column>

								<ste-table-column label="操作">
									<ste-button :mode="100" @click="handleEdit">编辑</ste-button>
								</ste-table-column>
							</template>
						</ste-table>
					</view>

					<view style="width: 100%; height: 200vh; background-color: #e1e"></view>
				</view>
			</view> -->
		</view>
	</view>
</template>
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
			],
			rows2: [
				{ name: '张三', birth: '2023.12.31', sex: '男', state: 1 },
				{ name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
				{ name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
				{ name: '', birth: '', sex: '女', state: 2 },
				{ name: '王七', birth: '2024.01.01', sex: '', state: 1 },
			],
			rows3: [
				{ name: '张三', birth: '2023.12.31', sex: '男', state: 1 },
				{ name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
				{ name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
				{ name: '赵六', birth: '2024.11.01', sex: '女', state: 2 },
				{ name: '王七', birth: '2024.01.01', sex: '男', state: 1 },
				{ name: '张三', birth: '2023.12.31', sex: '男', state: 1 },
				{ name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
				{ name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
				{ name: '赵六', birth: '2024.11.01', sex: '女', state: 2 },
				{ name: '王七', birth: '2024.01.01', sex: '男', state: 1 },
			],
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
			],
			rows5: [
				{ t1: '张三', t2: '我是张三我是张三我是张三我是张三', t3: '男男男男男男男男男' },
				{ t1: '李四', t2: '你是李四你是李四你是李四你是李四你是李四', t3: '女' },
				{ t1: '王五王五王五', t2: '王五描述', t3: '女' },
				{ t1: '赵六赵六赵六赵六', t2: '赵六', t3: '女' },
				{ t1: '王七', t2: '他是王七他是王七他是王七他是王七他是王七', t3: '女女女女女女女' },
			],
		};
	},
	mounted() {},
	methods: {
		scrollToLower() {
			this.showToast({
				title: '到底了',
			});
		},
		indexFun(index) {
			return index + 2;
		},
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
		},
		selectableFun(row, index) {
			return row.name !== '张三';
		},
		readonlyFun(row, index) {
			return row.name === '李四';
		},
		handleEdit() {
			console.log('编辑了');
		},
		summaryMethod({ columns, data }) {
			let res = columns.map(() => '');
			columns.forEach((col, index) => {
				if (col.prop === 'name' || col.prop === 'name') {
					res[index] = data.length + '人';
				}
			});
			return res;
		},
		headerFun(e1, tableData) {
			if (e1.customKey == 'name') {
				return tableData[0].name;
			}
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
		toggleRowSelection(i) {
			this.$refs.steTable.toggleRowSelection(this.rows[i]);
		},

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
			}
		}
	}
}
</style>