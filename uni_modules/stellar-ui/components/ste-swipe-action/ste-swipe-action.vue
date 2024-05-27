<template>
	<view class="ste-swipe-action-root" @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="onTouchend">
		<view class="swipe-action-view" :style="[cmpTransform]">
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
import utils from '../../utils/utils.js';
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
			touch: new TouchEvent(),
			moveing: false,
			translateX: 0,
			dataTranslateX: 0,
			leftWidth: 0,
			rightWidth: 0,
		};
	},
	computed: {
		cmpMode() {
			return this.mode || this.parent?.mode || 'right';
		},
		cmpLeft() {
			return ['all', 'left'].indexOf(this.cmpMode) !== -1;
		},
		cmpRight() {
			return ['all', 'right'].indexOf(this.cmpMode) !== -1;
		},
		cmpDisabled() {
			return this.disabled !== null ? this.disabled : this.parent?.disabled;
		},
		cmpSwipeThreshold() {
			return this.swipeThreshold || this.parent?.swipeThreshold || 0.35;
		},
		cmpDuration() {
			return this.duration || this.parent?.duration || 200;
		},
		cmpLeftIcon() {
			return this.leftIcon !== null ? this.leftIcon : this.parent?.leftIcon;
		},
		cmpRightIcon() {
			return this.rightIcon !== null ? this.rightIcon : this.parent?.rightIcon;
		},
		cmpTransform() {
			return {
				transform: `translateX(${this.translateX}px)`,
				transitionDuration: this.moveing ? 0 : `${this.cmpDuration}ms`,
			};
		},
	},
	mounted() {},
	methods: {
		setTransform(moveX) {
			this.translateX = moveX;
		},
		async onTouchstart({ changedTouches }) {
			if (this.cmpDisabled) return;
			this.moveing = true;
			this.touch.touchStart(changedTouches);
			if (this.cmpLeft) {
				const l = await utils.querySelector('.swipe-action-left', this);
				if (l?.width) this.leftWidth = l.width;
			} else {
				this.leftWidth = 0;
			}
			if (this.cmpRight) {
				const r = await utils.querySelector('.swipe-action-right', this);
				if (r?.width) this.rightWidth = r.width;
			} else {
				this.rightWidth = 0;
			}
		},
		onTouchmove({ changedTouches }) {
			if (this.cmpDisabled) return;
			const e = this.touch.touchMove(changedTouches);
			if (!e) return;
			let x = this.dataTranslateX + e.moveX;
			if (!this.cmpLeft && x > 0) {
				x = 0;
			}
			if (this.cmpLeft && x > this.leftWidth) {
				x = this.leftWidth;
			}

			if (!this.cmpRight && x < 0) {
				x = 0;
			}
			if (this.cmpRight && x < -this.rightWidth) {
				x = -this.rightWidth;
			}
			this.setTransform(x);
		},
		onTouchend({ changedTouches }) {
			this.moveing = false;
			if (this.cmpDisabled) return;
			const { moveX } = this.touch.touchEnd(changedTouches);
			let x = this.dataTranslateX;
			if (x === 0) {
				if (moveX > 0 && this.cmpLeft && moveX > this.leftWidth * this.cmpSwipeThreshold) {
					x = this.leftWidth;
				} else if (moveX < 0 && this.cmpRight && Math.abs(moveX) > this.rightWidth * this.cmpSwipeThreshold) {
					x = -this.rightWidth;
				}
			} else if (x > 0 && moveX < 0 && Math.abs(moveX) > this.leftWidth * this.cmpSwipeThreshold) {
				x = 0;
			} else if (x < 0 && moveX > 0 && moveX > this.rightWidth * this.cmpSwipeThreshold) {
				x = 0;
			}

			setTimeout(() => {
				this.setTransform(x);
				this.dataTranslateX = x;
			}, 50);
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
