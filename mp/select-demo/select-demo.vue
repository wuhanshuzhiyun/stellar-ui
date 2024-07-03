<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="选择框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-select :list="list" :value="value" @change="onChange"></ste-select>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			value: '',
			list: [
				[
					{
						label:
							'选项1-1选项1-1选项1-1选项1-1选项1-1选项1-1选项1-1选项1-1选项1-1选项1-1选项1-1选项1-1选项1-1选项1-1选项1-1选项1-1',
						value: '11',
					},
					{ label: '选项1-2', value: '12' },
					{ label: '选项1-3', value: '13' },
					{ label: '选项1-4', value: '14' },
					{ label: '选项1-5', value: '15' },
					{ label: '选项1-6', value: '16' },
					{ label: '选项1-7', value: '17' },
					{ label: '选项1-8', value: '18' },
					{ label: '选项1-9', value: '19' },
				],
				[
					{
						label:
							'选项2-1-1选项2-1-1选项2-1-1选项2-1-1选项2-1-1选项2-1-1选项2-1-1选项2-1-1选项2-1-1选项2-1-1选项2-1-1选项2-1-1选项2-1-1选项2-1-1选项2-1-1选项2-1-1',
						value: '11',
					},
					{ label: '选项2-1-2', value: '212' },
					{ label: '选项2-1-3', value: '213' },
					{ label: '选项2-1-4', value: '214' },
					{ label: '选项2-1-5', value: '215' },
					{ label: '选项2-1-6', value: '216' },
					{ label: '选项2-1-7', value: '217' },
					{ label: '选项2-1-8', value: '218' },
					{ label: '选项2-1-9', value: '219' },
				],
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