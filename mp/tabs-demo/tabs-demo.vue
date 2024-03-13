<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-tabs :active.sync="active">
						<ste-tab
							v-for="(i, index) in list"
							:title="`标签${i}`"
							:subTitle="`付标签${i}`"
							:index="index"
							:disabled="index === 2"
						>
							内容{{ i }}
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
			list: [1, 2],
			active: 0,
		};
	},
	mounted() {
		setTimeout(() => {
			this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
			this.active = 1;
		}, 1000);
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
