<template>
	<view class="ste-index-list-root" :style="[cmpRootStyle, cmpIndexRootStyle]">
		<scroll-view class="ste-scroll-to-root" scroll-y scroll-anchoring :scroll-top="scrollTop" @scroll="onScroll">
			<view class="ste-scroll-to-content">
				<slot />
			</view>
		</scroll-view>
		<view class="ste-index-list">
			<block v-for="(m, index) in cmpTitles" :key="index">
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
 * @property {String}	inactiveColor 右边锚点状态非激活时的颜色
 * @property {String}	activeColor 右边锚点状态激活时的颜色
 * @event {Function}					change 滚动索引列表时触发
 * @event {Function}					clickItem 点击原生列表时触发，参数1-当前索引区域，参数2-当前点击的内容
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
		inactiveColor: {
			type: String,
			default: () => '#666',
		},
		activeColor: {
			type: String,
			default: () => '#FF1A00',
		},
	},
	computed: {
		cmpIndexRootStyle() {
			return {
				'--ste-index-list-inactive-color': this.inactiveColor,
				'--ste-index-list-active-color': this.activeColor,
			};
		},
		cmpTitles() {
			const children = this.children;
			const list = children.map((c) => c.title);
			return list;
		},
	},
	watch: {
		children: {
			handler(val) {
				this.activeChange(this.dataActive);
			},
			immediate: true,
		},
	},
	methods: {
		activeChange(index) {
			this.$nextTick(() => {
				this.children.forEach((child, i) => {
					child.setActive(index === i);
				});
			});
		},
		onClickItem(title, text) {
			this.$emit('clickItem', title, text);
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
			margin: 0 auto;
			height: 44rpx;
			line-height: 44rpx;
			font-size: 24rpx;
			color: var(--ste-index-list-inactive-color);
			&.active {
				color: var(--ste-index-list-active-color);
			}
		}
	}
}
</style>
