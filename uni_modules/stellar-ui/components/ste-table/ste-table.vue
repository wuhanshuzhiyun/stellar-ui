<template>
	<view class="ste-table-root" :class="[cmpRootClass]" :style="[cmpRootStyle]">
		<view class="ste-table-content">
			<view class="fixed-placeholder" v-if="fixed || height || height > 0 || maxHeight || maxHeight > 0" />
			<view
				class="ste-table-header"
				:class="[getHeaderRowClass()]"
				:style="[getHeaderRowStyle()]"
				v-if="showHeader"
			>
				<view
					class="ste-table-cell"
					:class="[getHeaderCellClass(column, columnIndex)]"
					:style="[getHeaderCellStyle(column, columnIndex), getHeaderCellStyle(column, columnIndex, true)]"
					v-for="(column, columnIndex) in columns"
					:key="column.prop"
					@click="headerClick(column, $event)"
				>
					<view class="cell-box" v-if="column.type == 'checkbox'">
						<ste-icon
							code="&#xe6ae;"
							:color="selectionIconColor.disabled || selectionColor.disabled"
							:size="checkIconSize"
							v-if="canCheckStates.length === 0"
						/>
						<template v-else>
							<ste-icon
								code="&#xe6ac;"
								:color="selectionIconColor.main || selectionColor.main"
								:size="checkIconSize"
								v-if="checkAllState == 'all'"
								@click="changeCheckAll"
							/>
							<ste-icon
								code="&#xe6ad;"
								:color="selectionIconColor.main || selectionColor.main"
								:size="checkIconSize"
								v-else-if="checkAllState == 'indeterminate'"
								@click="changeCheckAll"
							/>
							<ste-icon
								code="&#xe6af;"
								:color="selectionIconColor.unSelected || selectionColor.unSelected"
								:size="checkIconSize"
								v-else
								@click="changeCheckAll"
							/>
						</template>
					</view>
					<view class="cell-box" :class="column.label ? '' : 'no-value'" v-else>
						{{ column.label || '-' }}
					</view>
				</view>
			</view>
			<template v-if="height || height > 0">
				<scroll-view scroll-y class="ste-table-scroll" @scrolltolower="handleScrollToLower">
					<view class="ste-table-body">
						<view
							class="ste-table-row"
							:class="[getRowClass(row, rowIndex)]"
							:style="[getRowStyle(row, rowIndex)]"
							v-for="(row, rowIndex) in tableData"
							:key="rowIndex"
							@click="rowClick(row, $event)"
						>
							<slot :row="row"></slot>
						</view>
						<view class="ste-table-row sum" v-if="showSummary">
							<view
								class="ste-table-cell"
								v-for="(column, index) in columns"
								:key="index"
								:class="[getHeaderCellClass(column)]"
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
				</scroll-view>
			</template>
			<template v-else>
				<view class="ste-table-body">
					<view
						class="ste-table-row"
						:class="[getRowClass(row, rowIndex)]"
						:style="[getRowStyle(row, rowIndex)]"
						v-for="(row, rowIndex) in tableData"
						:key="rowIndex"
						@click="rowClick(row, $event)"
					>
						<slot :row="row"></slot>
					</view>
					<view class="ste-table-row sum" v-if="showSummary">
						<view
							class="ste-table-cell"
							v-for="(column, index) in columns"
							:key="index"
							:class="[getHeaderCellClass(column)]"
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
			</template>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import useColor from '../../config/color.js';
let color = useColor();
import { parentMixin } from '../../utils/mixin.js';
import { getStyleOrClass } from './utils';
import { DEFAULT_SUM_TEXT, selectionColorConfig } from './common';
/**
 * ste-table 表格
 * @description 表格。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-table
 * @property {Array} data 表格数据，默认 []
 * @property {Boolean} fixed 表头是否定位为fixed	，默认 false
 * @property {Number|String} offsetTop 定位fixed时top的距离	 默认 0
 * @property {Boolean} border 是否带有纵向边框，默认 false
 * @property {Boolean} stripe 是否斑马纹	，默认 true
 * @property {String} emptyText 空数据时显示的文本内容，也可以通过 slot="empty" 设置	  默认 '暂无数据'
 * @property {Boolean} showSummary 是否在表尾显示合计行	，默认 false
 * @property {String} sumText，合计行第一列的文本，默认 '合计'
 * @property {Function} summaryMethod 自定义的合计计算方法，默认 null
 * @property {Function} selectable 仅对 type=checkbox 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选，默认 null
 * @property {Function} readable 仅对 type=checkbox 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选，默认 null
 * @property {Function} formatter 格式化单元格方法，需要配合TableColumn中的customKey属性
 * @property {Function} header 格式化表头内容的方法，同formatter属性，需要定义customKey属性
 * @property {Function|String} headerRowClassName 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className
 * @property {Function|String} headerRowStyle 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style
 * @property {Function|String} headerCellClassName 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className
 * @property {Function|String} headerCellStyle 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style
 * @property {Function|String} rowClassName 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className
 * @property {Function|String} rowStyle 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style
 * @property {Function|String} cellClassName 单元格的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className
 * @property {Function|String} cellStyle 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style
 * @property {Boolean} highlightCurrentRow 是否要高亮当前行
 * @property {Boolean} highlightSelectionRow 是否要高亮复选框选中行（仅针对开启 checkbox 有效）
 * @property {Boolean} showHeader 是否显示表头
 * @property {Number|String} height 表格高度
 * @property {Number|String} maxHeight 表格最大高度
 * @property {Object} selectionIconColor 配置选择项图标色
 * @property {Boolean} isPopover 是否为超出单元格时气泡显示内容
 * @event {Function} select 当用户手动勾选数据行的 Checkbox 时触发的事件
 * @event {Function} selectAll 当用户手动勾选全选 Checkbox 时触发的事件
 * @event {Function} cellClick 当某个单元格被点击时会触发该事件
 * @event {Function} rowClick 当某一行被点击时会触发该事件
 * @event {Function} headerClick 当某一列的表头被点击时会触发该事件
 */
export default {
	group: '展示组件',
	title: 'Table 表格',
	name: 'ste-table',
	mixins: [parentMixin('ste-table')],
	props: {
		data: {
			type: [Array, null],
			default: () => [],
		},
		sticky: [Boolean, null],
		offsetTop: {
			type: [Number, String, null],
			default: 0,
		},
		border: [Boolean, null],
		stripe: {
			type: [Boolean, null],
			default: true,
		},
		emptyText: [String, null],
		// 表尾显示合计行
		showSummary: [Boolean, null],
		sumText: {
			type: [String, null],
			default: DEFAULT_SUM_TEXT,
		},
		summaryMethod: {
			type: [Function, null],
			default: null,
		},
		selectable: {
			type: [Function, null],
			default: null,
		},
		readable: {
			type: [Function, null],
			default: null,
		},
		fixed: Boolean,
		formatter: {
			type: [Function, null],
			default: null,
		},
		header: {
			type: [Function, null, String],
			default: null,
		},
		height: [Number, String, null],
		headerRowClassName: [String, Function, null],
		headerRowStyle: [Object, Function, null],
		headerCellClassName: [String, Function, null],
		headerCellStyle: [Object, Function, null],
		rowClassName: [String, Function, null],
		rowStyle: [Object, Function, null],
		cellClassName: [String, Function, null],
		cellStyle: [Object, Function, null],
		highlightCurrentRow: [Boolean, null],
		highlightSelectionRow: [Boolean, null],
		showHeader: {
			type: [Boolean, null],
			default: true,
		},
		maxHeight: [Number, String, null],
		selectionIconColor: {
			type: [Object, null],
			default: () => selectionColorConfig,
		},
		isPopover: [Boolean, null],
	},
	data() {
		return {
			tableData: [],
			columns: [],
			sumData: [],
			currentRow: null,
			// column组件中的选中状态
			checkStatesSet: new Set(),
			checkStates: [],
			canCheckStates: [],
			checkAllState: 'none', // none 未选中、indeterminate 半选中、all 全选中
			selectType: '', // 表格选中的类型 checkbox(多选) 或 radio(单选)
			checkIconSize: 36,
			selectionColor: selectionColorConfig,
		};
	},
	computed: {
		cmpRootStyle() {
			let style = {
				'--offset-top': this.offsetTop,
				'--table-height': utils.formatPx(this.height),
				'--table-max-height': utils.formatPx(this.maxHeight),
				'--ste-theme-color': utils.Color.hex2rgba(color.getColor().steThemeColor, 0.05),
			};
			return style;
		},
		cmpRootClass() {
			let classArr = [];
			if (this.fixed) {
				classArr.push('fixed');
			}
			if (this.border) {
				classArr.push('border');
			}
			if (this.stripe) {
				classArr.push('stripe');
			}
			if (this.height || this.height > 0) {
				classArr.push('scroll-table');
			}
			return classArr.join(' ');
		},
	},
	created() {},
	mounted() {},
	watch: {
		children: {
			handler(val) {
				this.initRowData();
				this.initColumns(val);
			},
			immediate: true,
		},
		data: {
			handler(val) {
				this.tableData = val;
				this.initRowData();
				this.calcSum();
				this.initSelection();
			},
			immediate: true,
		},
	},
	methods: {
		initSpanNum() {
			const rows = this.tableData.length;
			const cols = this.columnChilds.length / rows;
			this.columnChilds.forEach((e, i) => {
				let rowSpan = 1;
				let colSpan = 1;
				const rowIndex = Math.floor(i / cols);
				const colIndex = i % cols;
				const fn = this.spanMethod;
				if (typeof fn === 'function') {
					const result = fn(null, null, rowIndex, colIndex);
					if (Array.isArray(result)) {
						rowSpan = result[0];
						colSpan = result[1];
					} else if (typeof result === 'object') {
						rowSpan = result.rowSpan;
						colSpan = result.colSpan;
					}
				}
				e.rowSpan = rowSpan;
				e.colSpan = colSpan;
			});
		},
		// 给子组件的row中赋值
		initRowData() {
			const rowNums = this.tableData.length; // 有多少行
			const colNums = this.children.length / rowNums; // 有多少列

			this.children.forEach((child, index) => {
				const rowIndex = Math.floor(index / colNums); // 计算出当前元素属于哪一行
				const colIndex = index % colNums; // 计算出当前元素属于哪一列
				const row = this.tableData[rowIndex];
				child.row = { ...row, rowIndex, colIndex };
			});
		},
		initColumns(childs) {
			if (!childs || childs.length <= 0) return;
			let all = childs
				.filter((node) => node.$options && node.$options.name === 'ste-table-column')
				.map((node) => {
					let obj = node.$options.propsData;
					obj._uid = node._uid;
					return obj;
				});
			const result = [];
			const partSize = Math.ceil(all.length / this.tableData.length);
			for (let i = 0; i < partSize; i++) {
				result.push(all[i]);
			}

			this.columns = result.map((e) => {
				if (!e.label && this.header && typeof this.header === 'function') {
					e.label = this.header(e, this.tableData);
				}
				return e;
			});

			this.calcSum();
			this.loadSelectType();
			this.loadCanCheckArr();
		},
		// 重新计算选择项
		initSelection() {
			this.loadCanCheckArr();
			this.checkStates = this.checkStates.filter((e) => this.canCheckStates.indexOf(e) > -1);
			this.calcAllState();
		},
		// 获取当前表格选中类型(单选或多选)
		loadSelectType() {
			this.columns.forEach((e) => {
				if (e.type) {
					this.selectType = e.type;
					return;
				}
			});
		},
		// 根据传入的selectable方法获取所有可选择的行
		loadCanCheckArr() {
			let tmp = [];
			this.tableData.forEach((e, index) => {
				let selectFlag = this.selectable ? this.selectable(e, index) : true;
				let readonlyFlag = this.readable ? !this.readable(e, index) : true;

				if (selectFlag && readonlyFlag) {
					tmp.push(index);
				}
			});
			this.canCheckStates = tmp;
		},
		// 更改表头选中项的状态
		changeCheckAll() {
			if (this.checkAllState !== 'all') {
				this.$emit(
					'selectAll',
					this.canCheckStates.map((e) => this.tableData[e])
				);
			} else {
				this.$emit('selectAll', []);
			}
			this.toggleAllSelection();
		},
		// column组件更改Check状态
		handleCheck(row, isEmit = true) {
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

			isEmit && this.$emit('select', this.getSelection(), row);
			// this.currentRow = row;

			this.calcAllState();
			this.$forceUpdate();
		},
		calcAllState() {
			// 处理当前全选框的状态
			if (this.checkStates.length > 0) {
				if (this.canCheckStates.length === this.checkStates.length) {
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
			this.currentRow = row;
			this.$emit('rowClick', row, event);
		},
		headerClick(column, event) {
			this.$emit('headerClick', column, event);
		},
		handleScrollToLower() {
			this.$emit('scrollToLower');
		},
		// ***自定义class和style相关***
		getHeaderRowClass() {
			const classes = [getStyleOrClass(this.headerRowClassName, null, false)];
			return classes.join(' ');
		},
		getHeaderRowStyle() {
			return getStyleOrClass(this.headerRowStyle);
		},
		getHeaderCellClass(column, columnIndex) {
			let classArr = [];
			if (column.headerAlign && column.headerAlign !== 'left') {
				classArr.push('align-' + column.headerAlign);
			} else if (column.align && column.align !== 'left') {
				classArr.push('align-' + column.align);
			}

			classArr.push(getStyleOrClass(this.headerCellClassName, { columnIndex, column }, false));
			return classArr.join(' ');
		},
		getHeaderCellStyle(column, columnIndex, isProp = false) {
			if (!isProp) {
				let style = {};
				if (column.width) {
					style.flex = `0 1 ${utils.formatPx(column.width)}`;
				}
				if (column.minWidth) {
					style.minWidth = utils.formatPx(column.minWidth);
				}
				return style;
			} else {
				return getStyleOrClass(this.headerCellStyle, { columnIndex, column });
			}
		},
		getRowClass(row, rowIndex) {
			const classArr = [`row-${rowIndex}`];
			if (this.highlightCurrentRow && utils.deepEqual(row, this.currentRow, ['rowIndex', 'colIndex'])) {
				classArr.push('current-row');
			}
			if (this.highlightSelectionRow && this.checkStatesSet.has(rowIndex)) {
				classArr.push('selection-row');
			}

			classArr.push(getStyleOrClass(this.rowClassName, { row, rowIndex }, false));
			return classArr.join(' ');
		},
		getRowStyle(row, rowIndex) {
			return getStyleOrClass(this.rowStyle, { row, rowIndex });
		},
		// ***Table Methods 方法***
		// 获取当前选择的数据
		getSelection() {
			return this.checkStates.map((e) => this.tableData[e]);
		},
		// 清空选择项
		clearSelection() {
			this.checkStatesSet.clear();
			this.checkStates = Array.from(this.checkStatesSet);
			this.checkAllState = 'none';
		},
		// 切换某行的选中状态
		toggleRowSelection(row, isTriggerSelectEvent = true) {
			this.$nextTick(() => {
				let index = this.tableData.findIndex((e) => utils.deepEqual(row, e, ['rowIndex', 'colIndex']));
				if (this.canCheckStates.indexOf(index) <= -1) return;
				row.rowIndex = index;
				this.handleCheck(row, isTriggerSelectEvent);
			});
		},
		// 切换全选的状态
		toggleAllSelection() {
			if (this.checkAllState === 'all') {
				this.clearSelection();
			} else {
				this.canCheckStates.forEach((e) => {
					this.checkStatesSet.add(e);
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

	&.scroll-table {
		position: relative;

		.ste-table-content {
			.ste-table-header {
				position: absolute;
				top: 0;
			}
			.ste-table-scroll {
				height: calc(var(--table-height) - 80rpx);
				max-height: calc(var(--table-max-height) - 80rpx);
			}
		}
	}

	&.fixed {
		.ste-table-content {
			.ste-table-header {
				position: fixed;
				top: var(--offset-top);
				z-index: 101;
			}
		}
	}
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
		// display: table;
		// border-collapse: collapse;
		// table-layout: fixed;
		.fixed-placeholder {
			width: 100%;
			height: 80rpx;
		}
		.ste-table-header {
			width: 100%;
			// display: table-row;
			display: flex;
			justify-content: space-between;
			background-color: var(--ste-theme-color);

			.ste-table-cell {
				background-color: var(--ste-theme-color);
				font-weight: bold;
				font-size: 28rpx;
				border-top: $default-border;
				// flex: 1;
				// box-sizing: border-box;

				.cell-box.no-value {
					color: transparent;
				}
			}
		}

		.ste-table-cell {
			// display: table-cell;
			flex: 1;
			// box-sizing: border-box;
			border-bottom: $default-border;

			padding: 0 32rpx;
			height: 80rpx;
			font-size: 24rpx;
			overflow-x: hidden;
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
			// display: table-row-group;
			width: 100%;
			.ste-table-row {
				// display: table-row;
				display: flex;
				justify-content: space-between;
				&.current-row {
					background-color: #ecf5ff;
				}
				&.selection-row {
					background-color: #ecf5ff;
				}
			}
		}
	}

	scoped-slots-default {
		display: contents;
	}
}
</style>
