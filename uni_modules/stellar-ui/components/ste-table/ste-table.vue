<template>
	<view class="ste-table-root">
		<view class="table-row header">
			<view class="table-cell">Header 1</view>
			<view class="table-cell">Header 2</view>
			<view class="table-cell">Header 3</view>
		</view>
		<view class="table-row" v-for="(row, index) in rows" :key="index">
			<view class="table-cell">{{ row.column1 }}</view>
			<view class="table-cell">{{ row.column2 }}</view>
			<view class="table-cell">{{ row.column3 }}</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
export default {
	group: '展示组件',
	title: 'Table 表格',
	name: 'ste-table',
	data() {
		return {
			rows: [
				{ column1: 'Row 1 Column 1', column2: 'Row 1 Column 2', column3: 'Row 1 Column 3' },
				{ column1: 'Row 2 Column 1', column2: 'Row 2 Column 2', column3: 'Row 2 Column 3' },
			],
		};
	},
};
</script>

<style lang="scss" scoped>
.ste-table-root {
	display: table;
	width: 100%;
	table-layout: fixed; /* 避免表格内容过多时自动调整宽度 */
	border-collapse: collapse;
}

.table-row {
	display: table-row;
}

.table-cell {
	display: table-cell;
	padding: 8px;
	border: 1px solid #ddd;
	text-align: left;
}

.header .table-cell {
	background-color: #f2f2f2;
	font-weight: bold;
}
</style>
