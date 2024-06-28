<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="选择框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-select :list="list"></ste-select>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				[
					{ label: '选项1-1', value: '11' },
					{ label: '选项1-2', value: '12' },
				],
				[
					{ label: '选项2-1', value: '21' },
					{ label: '选项2-2', value: '22' },
				],
			],
		};
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
			}
		}
	}
}
</style>
