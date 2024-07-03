<template>
	<view class="ste-table-cell" :class="[cmpRootClass]" :style="[cmpRootStyle]" @click="cellClick">
		<template v-if="type">
			<view class="cell-box" v-if="type == 'checkbox'" @click="changeCheck">
				<check-box-icon :disabled="cmpDisableCheck" :readonly="cmpReadonlyCheck" :checked="cmpShowCheck" />
			</view>
			<view class="cell-box" v-if="type == 'radio'" @click="changeCheck">
				<radio-icon :disabled="cmpDisableCheck" :checked="cmpShowCheck" />
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
 * @property {String} headerAlign，表头对齐方式，若不设置该项，则使用表格的对齐方式
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
			type: String,
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
		headerAlign: {
			type: String,
			default: 'left',
		},
	},
	data() {
		return {
			row: {},
		};
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
		cmpRootClass() {
			let classArr = [];
			classArr.push(this.type);

			if (this.align && this.align !== 'left') {
				classArr.push('align-' + this.align);
			}
			if (this.parent.border) {
				classArr.push('border');
			}
			return classArr.join(' ');
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
			if (this.parent.selectable) {
				return !this.parent.selectable(this.row, this.row.rowIndex);
			}
			return false;
		},
		cmpReadonlyCheck() {
			if (this.parent.readable) {
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
		},
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
