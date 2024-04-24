<template>
	<view class="ste-swiper-root" :style="[cmpRootStyle, { opacity: initializing ? 0 : 1 }]">
		<view
			class="swipe-content"
			@mousedown="onTouchstart"
			@mousemove="onTouchmove"
			@mouseup="onTouchend"
			@mouseleave="onTouchend"
			@touchstart="onTouchstart"
			@touchmove.stop="onTouchmove"
			@touchend="onTouchend"
			@touchcancel="onTouchend"
		>
			<view class="swipe-content-view" :style="[cmpBoxStyle, cmpBoxTransform]">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils';
import TouchEvent from '../ste-touch-swipe/TouchEvent.js';
export default {
	group: '导航组件',
	title: 'Swiper 轮播',
	name: 'ste-swiper',
	provide() {
		return {
			_swiperComponent: { getParent: () => this },
		};
	},
	props: {
		current: {
			type: Number,
			default: () => 0,
		},
		// 滑动方向  "horizontal" | "vertical"(水平方向时宽度必须固定，垂直方向时高度必须固定)
		direction: {
			type: String,
			default: () => 'horizontal',
		},
		width: {
			type: [Number, String],
			default: () => null,
		},
		height: {
			type: [Number, String],
			default: () => null,
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		duration: {
			type: Number,
			default: () => 300,
		},
		swipeThreshold: {
			type: Number,
			default: () => 0.35,
		},
	},
	data() {
		return {
			initializing: true,
			moveing: false,
			reseting: false,
			dataIndex: 0,
			childrenComponents: {},
			childrenData: [],
			timeout: null,
			touch: new TouchEvent(),
			boxWidth: null,
			boxHeight: null,
			translateX: 0,
			translateY: 0,
		};
	},
	computed: {
		cmpRootStyle() {
			let width = this.direction === 'horizontal' ? '100%' : 'auto';
			let height = this.direction === 'vertical' ? '100%' : 'auto';
			if (this.width) width = utils.formatPx(this.width);

			if (this.height) height = utils.formatPx(this.height);

			return {
				'--swiper-width': width,
				'--swiper-height': height,
			};
		},
		cmpBoxStyle() {
			let style = {};
			if (this.direction === 'horizontal') {
				style.gridTemplateColumns = `repeat(${this.childrenData.length || 'auto-fill'}, 100%)`;
			} else if (this.direction === 'vertical') {
				style.gridTemplateRows = `repeat(${this.childrenData.length || 'auto-fill'}, 100%)`;
			}
			return style;
		},
		cmpBoxTransform() {
			let transform = '';
			if (this.direction === 'horizontal') {
				transform = `translateX(${this.translateX}px)`;
			} else if (this.direction === 'vertical') {
				transform = `translateY(${this.translateY}px)`;
			}
			return {
				transform,
				transitionDuration: this.initializing || this.moveing || this.reseting ? 'inherit' : `${this.duration}ms`,
			};
		},
	},
	watch: {
		current: {
			handler(v) {
				this.dataIndex = v;
			},
			immediate: true,
		},
		dataIndex: {
			handler() {
				this.setTransform();
			},
			immediate: true,
		},
		childrenData: {
			handler() {
				this.setTransform();
			},
			immediate: true,
		},
	},
	mounted() {},
	methods: {
		getChildren(chil) {
			this.childrenComponents[chil.index] = chil;
			clearTimeout(this.timeout);
			this.timeout = setTimeout(async () => {
				const boxEl = await utils.querySelector('.swipe-content-view', this);
				this.boxWidth = boxEl.width;
				this.boxHeight = boxEl.height;
				this.childrenData = utils
					.getChildrenProps(this, 'ste-swiper-item')
					.map((props, index) => ({ index, component: this.childrenComponents[index] }));
				this.setTransform();
				this.$nextTick(() => {
					this.initializing = false;
				});
			}, 30);
		},
		setBoundary(moveX = 0, moveY = 0) {
			if (this.dataIndex === 0) {
				const component = this.childrenData[this.childrenData.length - 1].component;
				if (this.direction === 'horizontal' && moveX > 0) {
					component.setTransform({ x: -this.childrenData.length * this.boxWidth });
				} else if (this.direction === 'vertical' && moveY > 0) {
					component.setTransform({ y: -this.childrenData.length * this.boxHeight });
				}
			} else if (this.dataIndex === this.childrenData.length - 1) {
				const component = this.childrenData[0].component;
				if (this.direction === 'horizontal' && moveX < 0) {
					component.setTransform({ x: this.childrenData.length * this.boxWidth });
				} else if (this.direction === 'vertical' && moveY < 0) {
					component.setTransform({ y: this.childrenData.length * this.boxHeight });
				}
			}
		},
		resetBoundary() {
			let component;
			if (this.dataIndex === -1) {
				component = this.childrenData[this.childrenData.length - 1].component;
				setTimeout(() => {
					this.dataIndex = this.childrenData.length - 1;
				}, 30);
			} else if (this.dataIndex === this.childrenData.length) {
				component = this.childrenData[0].component;
				setTimeout(() => {
					this.dataIndex = 0;
				}, 30);
			}
			component?.setTransform({});
		},
		setTransform(moveX = 0, moveY = 0) {
			if (!this.childrenData?.length) return;
			if (this.direction === 'horizontal') {
				this.translateX = -this.dataIndex * this.boxWidth + moveX;
				this.setBoundary(moveX);
			} else if (this.direction === 'vertical') {
				this.translateY = -this.dataIndex * this.boxHeight + moveY;
				this.setBoundary(0, moveY);
			}
		},
		onTouchstart(e) {
			if (this.disabled) return;
			this.resetBoundary();
			this.moveing = true;
			this.touch.touchStart(e);
		},
		onTouchmove(e) {
			if (this.disabled) return;
			this.moveing = true;
			const { moveX, moveY } = this.touch.touchMove(e);
			this.setTransform(moveX, moveY);
		},
		onTouchend(e) {
			this.moveing = false;
			const { moveX, moveY } = this.touch.touchEnd(e);
			if (this.direction === 'horizontal' && !moveX) return;
			else if (this.direction === 'vertical' && !moveY) return;
			let index = this.dataIndex;
			if (this.direction === 'horizontal' && Math.abs(moveX) > this.boxWidth * this.swipeThreshold) {
				index = moveX > 0 ? index - 1 : index + 1;
			} else if (this.direction === 'vertical' && Math.abs(moveY) > this.boxHeight * this.swipeThreshold) {
				index = moveY > 0 ? index - 1 : index + 1;
			}
			setTimeout(() => {
				this.resetBoundary();
			}, this.duration);
			if (this.dataIndex === index) {
				this.setTransform();
				return;
			}
			this.dataIndex = index;
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-swiper-root {
	width: var(--swiper-width);
	height: var(--swiper-height);
	overflow: hidden;
	.swipe-content {
		width: var(--swiper-width);
		height: var(--swiper-height);
		.swipe-content-view {
			width: var(--swiper-width);
			height: var(--swiper-height);
			display: grid;
		}
	}
}
</style>
