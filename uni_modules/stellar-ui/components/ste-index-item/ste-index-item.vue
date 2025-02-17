<template>
	<view class="ste-scroll-to-item-root" data-test="index-item">
		<slot name="title">
			<block v-if="title">
				<ste-sticky v-if="sticky">
					<view class="index-item-title" :class="{ active }">{{ title }}</view>
				</ste-sticky>
				<view v-else class="index-item-title" :class="{ active }">{{ title }}</view>
			</block>
		</slot>
		<slot>
			<view class="index-item-text-list">
				<view class="index-item-text" data-test="index-item-text" v-for="(text, i) in list" :key="i" @click="onClickItem(text)">
					{{ text }}
				</view>
			</view>
		</slot>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { childMixin } from '../../utils/mixin.js';
/**
 * ste-index-item 锚点项
 * @description 锚点项
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-scroll-to
 * @property {String}	title 分组标题
 * @property {Array<String>}	list 分组字符串列表
 */
export default {
	name: 'ste-index-item',
	mixins: [childMixin('ste-index-list')],
	props: {
		title: {
			type: [String, null],
			required: true,
		},
		list: {
			type: [Array, null],
			default: () => [],
		},
	},
	data() {
		return {
			sticky: true,
			active: false,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.sticky = this.parent.sticky;
		});
	},
	methods: {
		setActive(bool) {
			this.active = bool;
		},
		onClickItem(item) {
			this.parent.onClickItem(this.title, item);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-scroll-to-item-root {
	width: 100%;

	.index-item-title {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		padding: 0 32rpx;
		background-color: #f5f5f5;
		color: var(--ste-index-list-inactive-color);

		&.active {
			color: var(--ste-index-list-active-color);
		}
	}

	.index-item-text-list {
		padding: 0 32rpx;
		background-color: #fff;

		.index-item-text {
			width: 100%;
			height: 92rpx;
			line-height: 92rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #252525;
			border-bottom: 2rpx solid #f9f9f9;
		}
	}
}</style>
