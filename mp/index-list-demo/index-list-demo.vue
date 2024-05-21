<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="索引列表"></page-nav>
		<view class="content">
			<ste-index-list>
				<ste-index-item v-for="item in data" :key="item.title" :title="item.title">
					<view class="row-item" v-for="(m, i) in item.list" :key="i">{{ m }}</view>
				</ste-index-item>
			</ste-index-list>
			C
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data: [
				{
					title: 'A',
					list: ['列表A1', '列表A2', '列表A3', '列表A4', '列表A5', '列表A6', '列表A7', '列表A8'],
				},
				{
					title: 'B',
					list: ['列表B1', '列表B2', '列表B3', '列表B4', '列表B5', '列表B6', '列表B7', '列表B8'],
				},
				{
					title: 'C',
					list: ['列表C1', '列表C2', '列表C3', '列表C4', '列表C5', '列表C6', '列表C7', '列表C8'],
				},
				{
					title: 'D',
					list: ['列表D1', '列表D2', '列表D3', '列表D4', '列表D5', '列表D6', '列表D7', '列表D8'],
				},
				{
					title: 'E',
					list: ['列表E1', '列表E2', '列表E3', '列表E4', '列表E5', '列表E6', '列表E7', '列表E8'],
				},
				{
					title: 'F',
					list: ['列表F1', '列表F2', '列表F3', '列表F4', '列表F5', '列表F6', '列表F7', '列表F8'],
				},
				{
					title: 'G',
					list: ['列表G1', '列表G2', '列表G3', '列表G4', '列表G5', '列表G6', '列表G7', '列表G8'],
				},
				{
					title: 'H',
					list: ['列表H1', '列表H2', '列表H3', '列表H4', '列表H5', '列表H6', '列表H7', '列表H8'],
				},
				{
					title: 'I',
					list: ['列表I1', '列表I2', '列表I3', '列表I4', '列表I5', '列表I6', '列表I7', '列表I8'],
				},
				{
					title: 'J',
					list: ['列表J1', '列表J2', '列表J3', '列表J4', '列表J5', '列表J6', '列表J7', '列表J8'],
				},
				{
					title: 'K',
					list: ['列表K1', '列表K2', '列表K3', '列表K4', '列表K5', '列表K6', '列表K7', '列表K8'],
				},
				{
					title: 'L',
					list: ['列表L1', '列表L2', '列表L3', '列表L4', '列表L5', '列表L6', '列表L7', '列表L8'],
				},
				{
					title: 'M',
					list: ['列表M1', '列表M2', '列表M3', '列表M4', '列表M5', '列表M6', '列表M7', '列表M8'],
				},
				{
					title: 'N',
					list: ['列表N1', '列表N2', '列表N3', '列表N4', '列表N5', '列表N6', '列表N7', '列表N8'],
				},
			],
		};
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		background: #fbfbfc;
		padding: 0;
		.row-item {
			height: 90rpx;
			line-height: 90rpx;
			padding: 0 24rpx;
			& + .row-item {
				border-top: 1px solid #ddd;
			}
		}
	}
}
</style>
