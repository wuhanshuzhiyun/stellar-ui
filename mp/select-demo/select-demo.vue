<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="选择框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-select :list="list1" v-model="value1" @change="onChange"></ste-select>
			</view>
			<view class="demo-item">
				<view class="title">多选</view>
				<ste-select :list="list1" multiple v-model="value2" @change="onChange"></ste-select>
			</view>
			<view class="demo-item">
				<view class="title">多列选择</view>
				<ste-select :list="list3" v-model="value3" @change="onChange"></ste-select>
			</view>
			<view class="demo-item">
				<view class="title">树形选择</view>
				<ste-select mode="tree" :list="list4" v-model="value4" @change="onChange"></ste-select>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			value1: null,
			list1: [
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
			value2: [],
			value3: [],
			list3: [
				[
					{ label: '选项1-1', value: 11 },
					{ label: '选项1-2', value: 22 },
				],
				[
					{ label: '选项2-1', value: 21 },
					{ label: '选项2-2', value: 22 },
				],
			],
			value4: [],
			list4: [
				{
					label: '湖北',
					value: 1,
					children: [
						{ label: '武汉', value: 11 },
						{ label: '荆州', value: 12 },
					],
				},
				{
					label: '湖南',
					value: 2,
					children: [
						{ label: '长沙', value: 21 },
						{ label: '株洲', value: 22 },
					],
				},
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
