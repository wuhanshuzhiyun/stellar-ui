<template>
	<view class="ste-swipe-action-root" data-test="swipe-action">
		<view class="swipe-action-view" :style="[cmpTransform]" data-test="swipe-action-view">
			<view class="swipe-action-left-icon" v-if="cmpLeftIcon" @click="iconOpen('left')">
				<view class="swipe-icon" :class="{ active: dataTranslateX > 0 }">
					<ste-icon code="&#xe674;" size="30rpx" />
				</view>
			</view>
			<view class="swipe-action-right-icon" v-if="cmpRightIcon" @click="iconOpen('right')">
				<view class="swipe-icon" :class="{ active: dataTranslateX < 0 }">
					<ste-icon code="&#xe673;" size="30rpx" />
				</view>
			</view>
			<view
				@mousedown="onTouchstart"
				@mousemove="onTouchmove"
				@mouseup="onTouchend"
				@mouseleave="onTouchend"
				@touchstart="onTouchstart"
				@touchmove="onTouchmove"
				@touchend="onTouchend"
				@touchcancel="onTouchend"
			>
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
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { childMixin } from '../../utils/mixin.js';
import TouchEvent from '../ste-touch-swipe/TouchEvent.js';
/**
 * SwipeAction 滑动单元格
 * @description 滑动单元格
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-swipe-action
 * @property {String}	mode 模式
 * @value right 右侧滑动
 * @value left 左侧滑动
 * @value all 左右滑动
 * @property {Boolean}		disabled		禁用
 * @property {String ｜ Number}	swipeThreshold	灵敏度（0-1之间的小数，数值越小灵敏度越高）
 * @property {String ｜ Number}	duration	动画时长，单位ms（默认300）
 * @property {Boolean}	leftIcon	是否显示左侧图标（默认false）
 * @property {Boolean}	rightIcon	是否显示右侧图标（默认false）
 * @event {Function} open	打开滑块时触发，参数为方向('left'|'right')
 * @event {Function} close 关闭滑块时触发
 */
export default {
	group: '展示组件',
	title: 'SwipeAction 滑动单元格',
	name: 'ste-swipe-action',
	mixins: [childMixin('ste-swipe-action-group')],
	props: {
		mode: {
			type: [String, null],
			default: () => null,
		},
		disabled: {
			type: [Boolean, null],
			default: () => null,
		},
		swipeThreshold: {
			type: [Number, String, null],
			default: () => null,
		},
		duration: {
			type: [Number, String, null],
			default: () => null,
		},
		leftIcon: {
			type: [Boolean, null],
			default: () => null,
		},
		rightIcon: {
			type: [Boolean, null],
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
			changeCallback: null,
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
			return this.duration || this.parent?.duration || 300;
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
	mounted() { },
	methods: {
		/**
		 * 打开侧滑
		 * @param {'right'|'left'} 打开哪一端，默认同mode属性
		 */
		open(direction = this.cmpMode) {
			setTimeout(async () => {
				if (direction === 'left') {
					const l = await utils.querySelector('.swipe-action-left', this);
					if (!l) return;
					this.setTransform(l.width);
				} else {
					const r = await utils.querySelector('.swipe-action-right', this);
					if (!r) return;
					this.setTransform(-r.width);
				}
			}, 30);
		},
		close() {
			this.setTransform(0);
		},
		iconOpen(direction) {
			if (this.cmpDisabled) return;
			if (this.dataTranslateX) this.close();
			else this.open(direction);
		},
		setTransform(moveX) {
			this.translateX = moveX;
			if (this.dataTranslateX === moveX) return;
			this.dataTranslateX = moveX;
			if (this.changeCallback) this.changeCallback(moveX);
			if (moveX === 0) this.$emit('close');
			else this.$emit('open', moveX > 0 ? 'left' : 'right');
		},
		async onTouchstart(e) {
			if (this.cmpDisabled) return;
			this.moveing = true;
			this.touch.touchStart(e);
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
		onTouchmove(e) {
			if (this.cmpDisabled) return;
			const d = this.touch.touchMove(e);
			if (!d) return;
			let x = this.dataTranslateX + d.moveX;
			if (this.dataTranslateX > 0 && x < 0) {
				// 左侧按钮显示的时候，不能直接滑动到右侧按钮
				x = 0;
			} else if (this.dataTranslateX < 0 && x > 0) {
				// 右侧按钮显示的时候，不能直接滑动到左侧按钮
				x = 0;
			} else if (!this.cmpLeft && x > 0) {
				// 没有左侧按钮时，不能滑动到左侧
				x = 0;
			} else if (this.cmpLeft && x > this.leftWidth) {
				// 左侧按钮显示时，左侧滑动距离不能超过按钮宽度
				x = this.leftWidth;
			} else if (!this.cmpRight && x < 0) {
				// 没有右侧按钮时，不能滑动到右侧
				x = 0;
			} else if (this.cmpRight && x < -this.rightWidth) {
				// 右侧按钮显示时，右侧滑动距离不能超过按钮宽度
				x = -this.rightWidth;
			}
			this.translateX = x;
		},
		onTouchend(e) {
			this.moveing = false;
			if (this.cmpDisabled) return;
			const { moveX } = this.touch.touchEnd(e);
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
			}, 10);
		},
		onchange(callback) {
			this.changeCallback = callback;
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-swipe-action-root {
	width: 100%;
	position: relative;
	overflow: hidden;

	.swipe-action-left-icon,
	.swipe-action-right-icon {
		width: 30rpx;
		height: 60rpx;
		position: absolute;
		top: 50%;
		z-index: 10;
		transform: translateY(-50%);
		overflow: hidden;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;

		.swipe-icon {
			width: 30rpx;
			height: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: 300ms;

			&.active {
				transform: rotate(180deg);
			}
		}
	}

	.swipe-action-left-icon {
		left: 0;
		border-radius: 0 30rpx 30rpx 0;
	}

	.swipe-action-right-icon {
		right: 0;
		border-radius: 30rpx 0 0 30rpx;
	}

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
