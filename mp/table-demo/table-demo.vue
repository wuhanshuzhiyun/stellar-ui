<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="表格"></page-nav>
		<view class="content">
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
				<view class="title">禁用某项选择</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table :data="rows" :selectable="selectableFun">
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
				<view class="title">自定义列</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-table :data="rows">
							<template v-slot="{ row }">
								<ste-table-column label="姓名" prop="name"></ste-table-column>
								<ste-table-column label="生日" prop="birth"></ste-table-column>
								<ste-table-column label="性别" prop="sex"></ste-table-column>
								<ste-table-column label="操作">
									<ste-button :mode="100" @click="handleEdit">编辑</ste-button>
								</ste-table-column>
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
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '赵六', birth: '2024.11.01', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '男' },
			],
			rows2: [
				{ name: '张三', birth: '2023.12.31', sex: '男' },
				{ name: '李四', birth: '2024.01.01', sex: '女' },
				{ name: '王五', birth: '2024.11.01', sex: '女' },
				{ name: '', birth: '', sex: '女' },
				{ name: '王七', birth: '2024.01.01', sex: '' },
			],
		};
	},
	mounted() {},
	methods: {
		indexFun(index) {
			return index + 2;
		},
		formatterFun(row, cellvalue) {
			return 'n: ' + cellvalue;
		},
		selectableFun(row, index) {
			return row.name !== '张三';
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