<template>
	<ste-sticky :offsetTop="offsetTop">
		<view class="ste-table-root" :class="[cmpRootClass]">
			<view class="ste-table-content">
				<view class="ste-table-header">
					<view
						class="ste-table-cell"
						:class="[headerClass(column)]"
						:style="[headerStyle(column)]"
						v-for="column in columns"
						:key="column.prop"
						@click="headerClick(column, $event)"
					>
						<view class="cell-box" v-if="column.type == 'checkbox'">
							<ste-icon
								code="&#xe6ac;"
								color="#3491FA"
								size="32"
								v-if="checkAllState == 'all'"
								@click="changeCheckAll"
							/>
							<ste-icon
								code="&#xe6ad;"
								color="#3491FA"
								size="32"
								v-else-if="checkAllState == 'indeterminate'"
								@click="changeCheckAll"
							/>
							<ste-icon code="&#xe6af;" color="#BBBBBB" size="32" v-else @click="changeCheckAll" />
						</view>
						<view class="cell-box" v-else>
							{{ column.label }}
						</view>
					</view>
				</view>
				<view class="ste-table-body">
					<view
						class="ste-table-row"
						:class="'row-' + index"
						v-for="(row, index) in data"
						:key="index"
						@click="rowClick(row, $event)"
					>
						<slot :row="row"></slot>
					</view>
					<view class="ste-table-row sum" v-if="showSummary">
						<view
							class="ste-table-cell"
							v-for="(column, index) in columns"
							:key="index"
							:class="[headerClass(column)]"
						>
							<view class="cell-box">
								<view v-if="index === 0" class="sum-header">{{ sumText }}</view>
								<view v-else>
									{{ sumData[index] || '-' }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</ste-sticky>
</template>

<script>
import utils from '../../utils/utils.js';
import { parentMixin } from '../../utils/mixin.js';
const DEFAULT_SUM_TEXT = '合计';
export default {
	group: '展示组件',
	title: 'Table 表格',
	name: 'ste-table',
	mixins: [parentMixin('ste-table')],
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		sticky: {
			type: Boolean,
			default: false,
		},
		offsetTop: {
			type: [Number, String],
			default: 0,
		},
		border: {
			type: Boolean,
			default: false,
		},
		stripe: {
			type: Boolean,
			default: true,
		},
		emptyText: {
			type: String,
			default: '',
		},
		// 表尾显示合计行
		showSummary: {
			type: Boolean,
			default: false,
		},
		sumText: {
			type: String,
			default: DEFAULT_SUM_TEXT,
		},
		summaryMethod: {
			type: [Function, null],
			default: null,
		},
	},
	data() {
		return {
			tableData: [],
			columns: [],
			sumData: [],
			// column组件中的选中状态
			checkStatesSet: new Set(),
			checkStates: [],
			checkAllState: 'none', // none 未选中、indeterminate 半选中、all 全选中
			selectType: '', // 表格选中的类型 checkbox(多选) 或 radio(单选)
		};
	},
	computed: {
		cmpRootClass() {
			let classArr = [];
			if (this.border) {
				classArr.push('border');
			}
			if (this.stripe) {
				classArr.push('stripe');
			}
			return classArr.join(' ');
		},
	},
	created() {},
	watch: {
		children: {
			handler(val) {
				const rows = this.tableData.length;
				const cnum = val.length / rows;
				val.forEach((child, index) => {
					const c = Math.floor(index / cnum);
					const row = this.tableData[c];
					child.row = { ...row, rowIndex: c };
				});
				this.initColumns(val);
			},
			immediate: true,
		},
		data: {
			handler(val) {
				this.tableData = val;
				this.calcSum();
			},
			immediate: true,
		},
	},
	methods: {
		headerClass(column) {
			let classArr = [];
			if (column.headerAlign && column.headerAlign !== 'left') {
				classArr.push('align-' + column.headerAlign);
			} else if (column.align && column.align !== 'left') {
				classArr.push('align-' + column.align);
			}
			return classArr.join(' ');
		},
		headerStyle(column) {
			let style = {};
			if (column.width) {
				style.width = utils.addUnit(column.width);
			}
			if (column.minWidth) {
				style.minWidth = utils.addUnit(column.minWidth);
			}
			return style;
		},
		initColumns(childs) {
			if (!childs || childs.length <= 0) return;
			let all = childs
				.filter((node) => node.$options && node.$options.name === 'ste-table-column')
				.map((node) => node.$options.propsData);
			const result = [];
			const partSize = Math.ceil(all.length / this.tableData.length);
			for (let i = 0; i < partSize; i++) {
				result.push(all[i]);
			}
			this.columns = result;
			this.calcSum();
			this.loadSelectType();
		},
		loadSelectType() {
			this.columns.forEach((e) => {
				if (e.type) {
					this.selectType = e.type;
					return;
				}
			});
		},
		changeCheckAll(state) {
			if (this.checkAllState !== 'all') {
				this.$emit('selectAll', this.tableData);
			}
			this.toggleAllSelection();
		},
		// column组件更改Check状态
		handleCheck(row) {
			let rowIndex = row.rowIndex;
			let state = !this.checkStatesSet.has(rowIndex);
			if (this.selectType === 'radio') {
				this.checkStatesSet = new Set();
				this.checkStatesSet.add(rowIndex);
			} else {
				if (state) {
					this.checkStatesSet.add(rowIndex);
				} else {
					this.checkStatesSet.delete(rowIndex);
				}
			}
			this.checkStates = Array.from(this.checkStatesSet);
			this.$emit(
				'select',
				this.checkStates.map((e) => this.tableData[e]),
				row
			);

			// 处理当前全选框的状态
			if (this.checkStates.length > 0) {
				if (this.tableData.length === this.checkStates.length) {
					this.checkAllState = 'all';
				} else {
					this.checkAllState = 'indeterminate';
				}
			} else {
				this.checkAllState = 'none';
			}
		},
		// 计算合计项
		calcSum() {
			if (!this.summaryMethod) return;
			this.sumData = this.summaryMethod({ columns: this.columns, data: this.tableData });
		},
		cellClick(row, column, event) {
			this.$emit('cellClick', row, column, event);
		},
		rowClick(row, event) {
			this.$emit('rowClick', row, event);
		},
		headerClick(column, event) {
			this.$emit('headerClick', column, event);
		},
		// Table Methods 方法
		clearSelection() {
			this.checkStatesSet.clear();
			this.checkStates = Array.from(this.checkStatesSet);
			this.checkAllState = 'none';
		},
		toggleRowSelection(row, selected) {
			let index = this.tableData.findIndex((e) => utils.deepEqual(row, e, ['rowIndex']));
			row.rowIndex = index;
			this.handleCheck(row);
		},
		toggleAllSelection() {
			if (this.checkAllState === 'all') {
				this.clearSelection();
			} else {
				this.tableData.forEach((e, index) => {
					this.checkStatesSet.add(index);
				});
				this.checkStates = Array.from(this.checkStatesSet);
				this.checkAllState = 'all';
			}
		},
	},
};
</script>

<style lang="scss">
$default-border: 2rpx solid #ebebeb;

.ste-table-root {
	width: 100%;
	&.border {
		.ste-table-cell {
			border-right: $default-border;
		}

		.ste-table-content {
			border-left: $default-border;
		}
	}

	&.stripe {
		.ste-table-body {
			.ste-table-row:nth-child(even) {
				background-color: #f8f8f8; /* 偶数行背景颜色 */
			}
		}
	}

	.ste-table-content {
		width: 100%;
		display: table;
		// border-collapse: collapse;
		table-layout: fixed;
		.ste-table-header {
			width: 100%;
			display: table-row;
			.ste-table-cell {
				background-color: #e8f7ff;
				font-weight: bold;
				font-size: 28rpx;
				border-top: $default-border;
			}
		}

		.ste-table-cell {
			display: table-cell;

			border-bottom: $default-border;

			padding: 0 32rpx;
			height: 80rpx;
			font-size: 24rpx;

			.cell-box {
				height: 100%;
				display: flex;
				align-items: center;
				width: 100%;
			}

			&.align-center {
				.cell-box {
					justify-content: center;
				}
			}

			&.align-right {
				.cell-box {
					justify-content: flex-end;
				}
			}
		}

		.ste-table-body {
			display: table-row-group;
			width: 100%;
			.ste-table-row {
				display: table-row;
			}
		}
	}

	scoped-slots-default {
		display: contents;
	}
}
</style>
