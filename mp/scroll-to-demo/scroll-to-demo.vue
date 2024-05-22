<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="滚动锚点"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-tabs :active.sync="active" sticky>
						<ste-tab v-for="(m, i) in imgs" :key="i" :title="`标签${i + 1}`" />
					</ste-tabs>
					<ste-scroll-to ref="scrollTo" height="1200" :active.sync="active">
						<ste-scroll-to-item v-for="(m, i) in imgs" :key="i">
							<view>内容{{ i + 1 }}</view>
							<image :src="m" mode="widthFix"></image>
						</ste-scroll-to-item>
					</ste-scroll-to>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			active: 0,
			imgs: [
				'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
				'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
				'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
				'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
				'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
				'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
				'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
				'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
			],
		};
	},
	watch: {},
	mounted() {
		setTimeout(() => {
			this.$refs.scrollTo.init();
		}, 500);
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				display: block;
				margin-bottom: 12rpx;
				& > .ste-search {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
