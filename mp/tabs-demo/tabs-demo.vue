<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-tabs :active.sync="active">
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">Card模式</view>
				<view class="item-block">
					<ste-tabs :active.sync="active" type="card">
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			list1: [
				{ title: '标签1', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签2', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签3', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签4', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
			],
			active: 1,
		};
	},
	mounted() {
		setTimeout(() => {
			this.list = [1, 2, 3, 4];
			this.active = 3;
		}, 1000);
	},
	computed: {},
	methods: {
		getStyle() {
			return;
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				display: block;
				margin-bottom: 12rpx;
			}
		}
	}
}
</style>
