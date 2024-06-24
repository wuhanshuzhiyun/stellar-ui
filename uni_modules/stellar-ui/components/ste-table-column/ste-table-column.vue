<template>
	<view class="ste-table-cell" :class="[cmpRootClass]" @click="cellClick">
		<template v-if="type">
			<view class="cell-box" v-if="type == 'checkbox'" @click="changeCheck">
				<ste-icon code="&#xe6ac;" color="#3491FA" size="32" v-if="checkShow" />
				<ste-icon code="&#xe6af;" color="#BBBBBB" size="32" v-else />
			</view>
			<view class="cell-box" v-if="type == 'radio'" @click="changeCheck">
				<ste-icon code="&#xe6b5;" size="32" v-if="checkShow" />
				<ste-icon code="&#xe6b1;" color="#BBBBBB" size="32" v-else />
			</view>
			<view class="cell-box" v-if="type == 'index'">
				{{ row.rowIndex + 1 }}
			</view>
		</template>
		<template v-else>
			<slot v-if="row[prop] || !$slots.empty">
				<view class="cell-box">
					{{ formatterText() }}
				</view>
			</slot>
			<view class="cell-box" v-else>
				<slot name="empty"><text>暂无数据</text></slot>
			</view>
		</template>
	</view>
</template>

<script>
const DEFAULT_FORMATTER = (e) => e;
import { childMixin } from '../../utils/mixin.js';
export default {
	name: 'ste-table-column',
	mixins: [childMixin('ste-table')],
	options: {
		virtualHost: true,
	},
	props: {
		// 列类型：checkbox 可多选、radio 单选、index 从1开始展示索引
		type: {
			type: String,
			default: '',
		},
		index: {
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
		formatter: {
			type: [Function, null],
			default: null,
		},
		align: {
			type: String,
			default: 'left',
		},
		headerAlign: {
			type: String,
			default: 'left',
		},
		selectable: {
			type: [Function, null, Object],
			default: null,
		},
		reserveSelection: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			row: {},
		};
	},
	computed: {
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
		checkShow() {
			if (!this.parent.checkStates || this.parent.checkStates.length == 0) return false;
			let item = this.parent.checkStates.find((e) => e == this.row.rowIndex);
			if (item != undefined) {
				return true;
			}
			return false;
		},
	},
	methods: {
		showCheck() {
			if (!this.parent.checkStates || this.parent.checkStates.length == 0) return false;
			return !!this.parent.checkStates.find((e) => e == this.row.rowIndex);
		},
		changeCheck() {
			this.parent.handleCheck(this.row);
		},
		formatterText(e) {
			// TODO 格式化
			if (this.row[this.prop]) {
				return this.row[this.prop];
			} else {
				return this.parent.emptyText || '-';
			}
		},
		cellClick(event) {
			this.parent.cellClick(this.row, this.props, event);
		},
	},
};
</script>
<style lang="scss" scoped>
.ste-table-cell {
	display: table-cell;
	padding: 0 32rpx;
	border-bottom: 1rpx solid #ebebeb;
	border-top: 1rpx solid #ebebeb;
	text-align: left;
	height: 80rpx;
	font-size: 24rpx;

	.cell-box {
		height: 100%;
		display: flex;
		align-items: center;
	}

	&.border {
		border: 1rpx solid #ebebeb;
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
