<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="选择框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-select :list="list" mode="date" :value="value" @change="onChange"></ste-select>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			value: [2021, 7, 13],
			list: [
				{ label: '选项1-1', value: '11' },
				{ label: '选项1-2', value: '12' },
			],
		};
	},
	methods: {
		onChange(v) {
			console.log('onChange', v);
		},
	},
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
