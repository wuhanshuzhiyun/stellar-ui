<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-tabs
						:active.sync="active"
						showSubtitle
						lineWidth="120"
						pullDown
						sticky
						background="#ff0"
						scrollspy
						offsetTop="94"
					>
						<ste-tab
							v-for="(i, index) in list"
							:title="`标签${index}`"
							:subTitle="`附标签${index}`"
							:index="index"
							:image="demoUrl"
							:disabled="index === 2"
						>
							<view :style="{ background: getStyle(i) }">
								<h1>==Start {{ index }}==</h1>
								<h1>内容{{ index }}</h1>
								<h1>==End {{ index }}==</h1>
							</view>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import mixins from '@/uni_modules/stellar-ui/utils/mixins.js';
export default {
	mixins: [mixins],
	data() {
		return {
			demoUrl: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
			list: [1, 2],
			active: 0,
		};
	},
	mounted() {
		setTimeout(() => {
			this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
			this.active = 3;
		}, 1000);
	},
	methods: {
		getStyle() {
			return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
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
