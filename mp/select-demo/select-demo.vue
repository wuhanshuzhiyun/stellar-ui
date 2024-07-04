<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="选择框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-select mode="filterable" allowCreate multiple :list="list" :value="value" @change="onChange"></ste-select>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			value: [],
			list: [
				[
					{ label: '选项2011', value: 2011 },
					{ label: '选项2012', value: 2012 },
					{ label: '选项2013', value: 2013 },
					{ label: '选项2014', value: 2014 },
					{ label: '选项2015', value: 2015 },
					{ label: '选项2016', value: 2016 },
					{ label: '选项2017', value: 2017 },
					{ label: '选项2018', value: 2018 },
					{ label: '选项2019', value: 2019 },
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
