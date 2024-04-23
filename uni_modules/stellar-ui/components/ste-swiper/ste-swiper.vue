<template>
	<view class="ste-swiper-root" :style="[cmpRootStyle]">
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
			<view class="swipe-content-view" :style="[cmpBoxStyle]">
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
	},
	data() {
		return {
			
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
			if (this.width) {
				width = utils.formatPx(this.width);
			}
			if (this.height) {
				height = utils.formatPx(this.height);
			}
			const style = {
				'--swiper-width': width,
				'--swiper-height': height,
			};
			return style;
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
				transitionDuration: !this.init || this.moveing ? 'inherit' : `${this.duration}s`,
			};
		},
	},
	mounted() {
		setTimeout(async () => {
			const boxEl = await utils.querySelector('.ste-swiper-root', this);
			console.log(boxEl);
			this.boxWidth = boxEl.width;
			this.boxHeight = boxEl.height;
		}, 30);
	},
	methods: {
		getChildren(chil) {
			this.childrenComponents[chil.index] = chil;
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.childrenData = utils
					.getChildrenProps(this, 'ste-swiper-item')
					.map((props, index) => ({ index, component: this.childrenComponents[index] }));
				this.setTransform();
			}, 30);
		},
		setTransform() {
			console.log('--------setTransform-----------');
		},
		onTouchstart(e) {
			this.touch.touchStart(e);
		},
		onTouchmove(e) {
			const { moveX, moveY } = this.touch.touchMove(e);
			console.log(moveX, moveY);
		},
		onTouchend(e) {
			const { moveX, moveY } = this.touch.touchEnd(e);
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
