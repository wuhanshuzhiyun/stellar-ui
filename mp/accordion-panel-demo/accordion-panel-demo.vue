<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="折叠面板"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础示例</view>
				<ste-accordion-panel
					ref="accordion"
					:options="options"
					@click="onOpen"
					:openItems="['1-1']"
				></ste-accordion-panel>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			options: [
				{
					title: '标题1',
					value: '1',
					children: [
						{
							title: '标题1-1',
							value: '1-1',
							children: [
								{ title: '标题1-1-1', value: '1-1-1', message: '这是一条说明信息' },
								{
									title: '标题1-1-2',
									value: '1-1-2',
									message: '这是一条说明信息',
									hasChildren: true,
								},
							],
						},
						{
							title: '标题1-2',
							value: '1-2',
							children: [
								{ title: '标题1-2-1', value: '1-2-1' },
								{
									title: '标题1-2-2',
									value: '1-2-2',
									children: [
										{ title: '标题1-2-2-1', value: '1-2-2-1' },
										{ title: '标题1-2-2-2', value: '1-2-2-2' },
									],
								},
							],
						},
					],
				},
				{
					title: '标题2',
					value: '2',
					children: [
						{ title: '标题2-1', value: '2-1' },
						{
							title: '标题2-2',
							value: '2-2',
							children: [
								{ title: '标题2-2-1', value: '2-2-1' },
								{
									title: '标题2-2-2',
									value: '2-2-2',
									children: [
										{ title: '标题2-2-2-1', value: '2-2-2-1' },
										{ title: '标题2-2-2-2', value: '2-2-2-2' },
									],
								},
							],
						},
					],
				},
			],
		};
	},
	methods: {
		onOpen(item) {
			console.log(item);
		},
	},
	mounted() {
		setTimeout(() => {
			this.$refs.accordion.open('2-2');
		}, 5000);
	},
};
</script>

<style lang="scss" scoped>
.page {
	background-color: #f5f5f5;
	.content {
		.demo-item {
			.item-block {
				> view {
					margin: 0 36px 36px 0;
				}
			}
		}
	}
}
</style>
