<template>
	<view class="ste-scroll-to-item-root">
		<slot name="title">
			<block v-if="title">
				<ste-sticky v-if="sticky">
					<view class="index-item-title">{{ title }}</view>
				</ste-sticky>
				<view v-else class="index-item-title">{{ title }}</view>
			</block>
		</slot>
		<slot />
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { childMixin } from '../../utils/mixin.js';
/**
 * ste-index-item 锚点项
 * @description 锚点项
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-scroll-to
 */
export default {
	name: 'ste-index-item',
	mixins: [childMixin('ste-index-list')],
	props: {
		title: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			sticky: true,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.sticky = this.parent.sticky;
		});
	},
};
</script>

<style lang="scss" scoped>
.ste-scroll-to-item-root {
	width: 100%;
	.index-item-title {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		padding: 0 24rpx;
		background-color: #f5f5f5;
	}
}
</style>
