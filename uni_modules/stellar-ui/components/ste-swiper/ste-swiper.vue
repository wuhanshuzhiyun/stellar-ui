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
		<view class="ste-swiper-dots">
			<view
				class="swiper-dots-item"
				v-for="(m, index) in childrenData"
				:key="index"
				:class="{ active: dataIndex === index }"
			/>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils';
import TouchEvent from '../ste-touch-swipe/TouchEvent.js';
/**
 * ste-swiper 轮播
 * @description 轮播组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-swiper
 * @property {Number} 						current  		当前所在滑块的 index
 * @property {String}							direction		滑动方向  "horizontal" | "vertical"
 * @value horizontal 水平（默认,必须固定宽度）
 * @value vertical 纵向(必须固定高度)
 * @property {Number | String} 		width		宽度,默认值100%
 * @property {Number | String} 		height		高度,默认值100%
 */
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
		// 当前所在滑块的 index
		current: {
			type: Number,
			default: () => 0,
		},
		// 滑动方向  "horizontal" | "vertical"
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
			childrenTimeout: null,
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
			clearTimeout(this.childrenTimeout);
			this.childrenTimeout = setTimeout(async () => {
				const boxEl = await utils.querySelector('.swipe-content-view', this);
				this.boxWidth = boxEl.width;
				this.boxHeight = boxEl.height;
				this.childrenData = utils
					.getChildrenProps(this, 'ste-swiper-item')
					.map((props, index) => ({ index, component: this.childrenComponents[index] }));
				this.setTransform();
				setTimeout(() => {
					this.initializing = false;
				}, 30);
			}, 20);
		},
		setBoundary(moveX = 0, moveY = 0) {
			const endIndex = this.childrenData.length - 1;
			if (this.dataIndex === 0) {
				const component = this.childrenData[endIndex].component;
				if (this.direction === 'horizontal' && moveX > 0) {
					component.setTransform({ x: -this.childrenData.length * this.boxWidth });
				} else if (this.direction === 'vertical' && moveY > 0) {
					component.setTransform({ y: -this.childrenData.length * this.boxHeight });
				}
			} else if (this.dataIndex === endIndex) {
				const component = this.childrenData[0].component;
				if (this.direction === 'horizontal' && moveX < 0) {
					component.setTransform({ x: this.childrenData.length * this.boxWidth });
				} else if (this.direction === 'vertical' && moveY < 0) {
					component.setTransform({ y: this.childrenData.length * this.boxHeight });
				}
			}
		},
		resetBoundary() {
			this.reseting = true;

			this.childrenData.forEach(({ component }, index) => {
				component?.setTransform({});
			});

			if (this.dataIndex === -1) this.dataIndex = this.childrenData.length - 1;
			if (this.dataIndex === this.childrenData.length) this.dataIndex = 0;

			setTimeout(() => {
				this.reseting = false;
			}, 20);
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
			if (this.disabled) return;
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
	padding: 0 20px;
	position: relative;
	.swipe-content {
		width: var(--swiper-width);
		height: var(--swiper-height);
		.swipe-content-view {
			width: var(--swiper-width);
			height: var(--swiper-height);
			display: grid;
		}
	}
	.ste-swiper-dots {
		position: absolute;
		bottom: 18rpx;
		z-index: 1;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		.swiper-dots-item {
			width: 18rpx;
			height: 18rpx;
			border-radius: 50%;
			background-color: rgba(0, 0, 0, 0.3);
			&.active {
				background-color: #000;
			}
			& + .swiper-dots-item {
				margin-left: 6rpx;
			}
		}
	}
}
</style>
