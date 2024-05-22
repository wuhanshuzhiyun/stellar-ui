<template>
	<view class="ste-index-list-root" :style="[cmpRootStyle]">
		<scroll-view class="ste-scroll-to-root" scroll-y scroll-anchoring :scroll-top="scrollTop" @scroll="onScroll">
			<view class="ste-scroll-to-content">
				<slot />
			</view>
		</scroll-view>
		<view class="ste-index-list">
			<block v-for="(m, index) in titles" :key="index">
				<view v-if="m" class="ste-index-item" :class="{ active: index === dataActive }" @click="setActive(index)">
					{{ m }}
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import { parentMixin } from '../../utils/mixin.js';
import mixin from '../ste-scroll-to/mixin.js';

/**
 * ste-index-list 索引列表
 * @description 索引列表
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-index-list
 * @property {Number}					active 当前激活的索引下标，支持sync双向绑定，默认值0
 * @property {String|Number}	height 高度，默认值100%
 * @property {Boolean}	sticky 默认标题是否粘性布局
 * @event {Function}					change 滚动索引列表时触发
 */
export default {
	group: '导航组件',
	title: 'IndexList 索引列表',
	name: 'ste-index-list',
	mixins: [parentMixin('ste-index-list'), mixin],
	props: {
		sticky: {
			type: Boolean,
			default: () => true,
		},
	},
	computed: {
		titles() {
			const children = this.children;
			const list = children.map((c) => c.title);
			return list;
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-index-list-root {
	width: 100%;
	height: var(--scroll-to-height);
	position: relative;
	.ste-scroll-to-root {
		width: 100%;
		height: var(--scroll-to-height);
	}
	.ste-index-list {
		position: absolute;
		right: 12rpx;
		top: 50%;
		transform: translateY(-50%);
		z-index: 101;
		background-color: #fff;
		width: 48rpx;
		text-align: center;
		border-radius: 24rpx;
		box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.15);

		.ste-index-item {
			height: 48rpx;
			line-height: 48rpx;
			font-size: 24rpx;
			&.active {
				color: #f55;
			}
		}
	}
}
</style>
