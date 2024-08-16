<template>
	<view class="ste-table-cell" :class="[cmpRootClass]" :style="[cmpRootStyle, cmpCellStyle]" @click="cellClick">
		<template v-if="type">
			<view class="cell-box" v-if="type == 'checkbox'" @click.stop="changeCheck">
				<check-box-icon
					:disabled="cmpDisableCheck"
					:readonly="cmpReadonlyCheck"
					:checked="cmpShowCheck"
					:iconColorConfig="parent.selectionIconColor"
				/>
			</view>
			<view class="cell-box" v-if="type == 'radio'" @click.stop="changeCheck">
				<radio-icon
					:disabled="cmpDisableCheck"
					:readonly="cmpReadonlyCheck"
					:checked="cmpShowCheck"
					:iconColorConfig="parent.selectionIconColor"
				/>
			</view>
			<view class="cell-box" v-if="type == 'index'">
				{{ row.rowIndex + 1 }}
			</view>
		</template>
		<template v-else>
			<slot v-if="row[prop] || !$slots.empty">
				<view class="cell-box">
					{{ cellText() }}
				</view>
			</slot>
			<view class="cell-box" v-else>
				<slot name="empty"><text>暂无数据</text></slot>
			</view>
		</template>
	</view>
</template>

<script>
import RadioIcon from './radio-icon.vue';
import CheckBoxIcon from './checkbox-icon.vue';
import utils from '../../utils/utils.js';
import { getStyleOrClass } from '../ste-table/utils';
import { childMixin } from '../../utils/mixin.js';
/**
 * ste-table-column 表格列
 * @description 表格列组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-table
 * @property {String} type 对应列的类型
 * @property {String} label 显示的标题
 * @property {String} prop 对应列内容的字段名
 * @property {String} width 对应列的宽度
 * @property {String} minWidth 对应列的最小宽度
 * @property {String} align 对齐方式
 * @property {String} textAlign 文字对齐方式，对应到css的text-align属性
 * @property {String} headerAlign，表头对齐方式，若不设置该项，则使用表格的对齐方式
 * @property {String} headerTextAlign，表头对齐方式，若不设置该项，则使用表格的对齐方式，对应到css的text-align属性
 */
export default {
	name: 'ste-table-column',
	mixins: [childMixin('ste-table')],
	components: { RadioIcon, CheckBoxIcon },
	options: {
		virtualHost: true,
	},
	props: {
		// 列类型：checkbox 可多选、radio 单选、index 从1开始展示索引
		type: {
			type: String,
			default: '',
		},
		customKey: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
		prop: {
			type: String,
			default: '',
		},
		width: {
			type: [String, Number],
			default: '',
		},
		minWidth: {
			type: String,
			default: '',
		},
		align: {
			type: String,
			default: 'left',
		},
		textAlign: {
			type: String,
			default: 'left',
		},
		headerAlign: {
			type: String,
			default: 'left',
		},
		headerTextAlign: {
			type: String,
			default: 'left',
		},
	},
	data() {
		return {
			row: {},
			rowIndex: 0,
			colIndex: 0,
		};
	},
	created() {
		// setTimeout(() => {
		// 	console.log(' row is ', this.row);
		// }, 1500);
	},
	computed: {
		cmpRootStyle() {
			let style = {};
			if (this.width) {
				style.width = utils.addUnit(this.width);
			}
			if (this.minWidth) {
				style.minWidth = utils.addUnit(this.minWidth);
			}
			return style;
		},
		cmpCellStyle() {
			const cellClassParam = {
				column: this.props,
				columnIndex: this.row.colIndex,
				row: this.row,
				rowIndex: this.row.rowIndex,
			};
			// let style = getStyleOrClass(this.parent.cellStyle, cellClassParam);
			// console.log(' style is ', style);
			// return style;
			return getStyleOrClass(this.parent.cellStyle, cellClassParam);
		},
		cmpRootClass() {
			let classArr = [];
			classArr.push(this.type);

			if (this.align && this.align !== 'left') {
				classArr.push('align-' + this.align);
			}

			if (this.textAlign && this.textAlign !== 'left') {
				classArr.push('align-text-' + this.align);
			}

			if (this.parent.border) {
				classArr.push('border');
			}

			const cellClassParam = {
				column: this.props,
				columnIndex: this.row.colIndex,
				row: this.row,
				rowIndex: this.row.rowIndex,
			};
			classArr.push(getStyleOrClass(this.parent.cellClassName, cellClassParam, false));

			return classArr.join(' ');
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
					style.width = utils.addUnit(column.width);
				}
				if (column.minWidth) {
					style.minWidth = utils.addUnit(column.minWidth);
				}
				return style;
			} else {
				return getStyleOrClass(this.headerCellStyle, { columnIndex, column });
			}
		},

		cmpShowCheck() {
			if (!this.parent.checkStates || this.parent.checkStates.length == 0) return false;
			let item = this.parent.checkStates.find((e) => e == this.row.rowIndex);
			if (item != undefined) {
				return true;
			}
			return false;
		},
		cmpDisableCheck() {
			if (this.parent.selectable && this.type) {
				return !this.parent.selectable(this.row, this.row.rowIndex);
			}
			return false;
		},
		cmpReadonlyCheck() {
			if (this.parent.readable && this.type) {
				return this.parent.readable(this.row, this.row.rowIndex);
			}
			return false;
		},
	},
	methods: {
		changeCheck() {
			if (!this.cmpDisableCheck && !this.cmpReadonlyCheck) {
				this.parent.handleCheck(this.row);
			}
		},
		cellText(e) {
			if (this.parent.formatter) {
				let text = this.parent.formatter(this.row, this.customKey);
				if (!text) {
					text = this.row[this.prop];
				}
				return text;
			} else {
				if (this.row[this.prop]) {
					return this.row[this.prop];
				} else {
					return this.parent.emptyText || '-';
				}
			}
		},
		cellClick(event) {
			this.parent.cellClick(this.row, this.props, event);
			// 扩大选中热区
			if (this.type == 'checkbox' || this.type == 'radio') {
				this.changeCheck();
			}
		},
		getCellClassName() {},
		getCellStyle() {},
	},
};
</script>
<style lang="scss" scoped>
$default-border: 2rpx solid #ebebeb;
.ste-table-cell {
	display: table-cell;
	padding: 24rpx 32rpx;
	border-bottom: $default-border;
	text-align: left;
	min-height: 80rpx;
	font-size: 24rpx;
	vertical-align: middle;

	.cell-box {
		display: flex;
		align-items: center;
	}

	&.border {
		border-right: $default-border;
	}

	&.selection {
	}

	&.align-text-center {
		.cell-box {
			text-align: center;
		}
	}

	&.align-text-right {
		.cell-box {
			text-align: right;
		}
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
</style>
