<template>
	<view class="ste-swipe-action-root">
		<view class="swipe-action-view">
			<view class="swipe-action-left">
				<slot name="left"></slot>
			</view>
			<view class="swipe-action-content">
				<slot></slot>
			</view>
			<view class="swipe-action-right">
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
import { childMixin } from '../../utils/mixin.js';
import TouchEvent from '../ste-touch-swipe/TouchEvent.js';
export default {
	title: 'SwipeAction 滑动单元格',
	name: 'ste-swipe-action',
	mixins: [childMixin('ste-swipe-action-group')],
	props: {
		mode: {
			type: String,
			default: () => null,
		},
		name: {
			type: [Number, String],
			default: () => null,
		},
		disabled: {
			type: Boolean,
			default: () => null,
		},
		swipeThreshold: {
			type: [Number, String],
			default: () => null,
		},
		duration: {
			type: [Number, String],
			default: () => null,
		},
		leftIcon: {
			type: Boolean,
			default: () => null,
		},
		rightIcon: {
			type: Boolean,
			default: () => null,
		},
	},
	data() {
		return {
			touch: null,
		};
	},
	computed: {},
	mounted() {
		this.touch = new TouchEvent();
	},
	methods: {
		handleTouchStart(event) {
			this.touch.start(event);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-swipe-action-root {
	width: 100%;
	overflow: hidden;
	.swipe-action-view {
		width: 100%;
		position: relative;
		.swipe-action-left {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			z-index: 2;
			transform: translateX(-100%);
		}
		.swipe-action-content {
			position: relative;
			width: 100%;
			z-index: 5;
		}
		.swipe-action-right {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			z-index: 2;
			transform: translateX(100%);
		}
	}
}
</style>
