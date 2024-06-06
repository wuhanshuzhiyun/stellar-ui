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
		<view class="ste-swiper-dots" v-if="indicatorDots">
			<view
				class="swiper-dots-item"
				v-for="(m, index) in children"
				:key="index"
				:class="{
					active:
						dataIndex === index ||
						(index === 0 && dataIndex >= children.length) ||
						(index === children.length && dataIndex === -1),
				}"
			/>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils';
import TouchEvent from '../ste-touch-swipe/TouchEvent.js';
import { parentMixin } from '../../utils/mixin.js';

/**
 * ste-swiper 轮播
 * @description 轮播组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-swiper
 * @property {Number} 						current  				当前显示所在滑块的 index
 * @property {String}							direction				滑动方向  "horizontal" | "vertical"
 * @value horizontal 水平（默认,必须固定宽度）
 * @value vertical 纵向(必须固定高度)
 * @property {Boolean} 						disabled 				是否禁用
 * @property {Number | String} 		width						宽度,默认值100%
 * @property {Number | String} 		height					高度,默认值100%
 * @property {Number} 						duration				切换动画时常
 * @property {Number}							swipeThreshold	滑动灵敏度（0-1之间的小数，数值越小越灵敏）
 * @property {Boolean}						indicatorDots		是否显示面板指示点
 * @property {String}							indicatorColor	指示点颜色，默认rgba(0,0,0,0.3)
 * @property {String}							indicatorActiveColor	当前选中的指示点颜色，默认#000000
 * @property {Boolean}						autoplay				是否自动切换
 * @property {Number}							interval				自动切换时间间隔，默认3000
 * @property {Boolean}						circular				是否采用衔接滑动，即播放到末尾后重新回到开头
 * @property {Number | String}		previousMargin	前边距，可用于露出前一项的一小部分
 * @property {Number | String}		nextMargin			后边距，可用于露出后一项的一小部分
 * @event {(index:number)=>void} change 切换事件
 */
export default {
	group: '导航组件',
	title: 'Swiper 轮播组件',
	name: 'ste-swiper',
	mixins: [parentMixin('ste-swiper')],
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
		disabled: {
			type: Boolean,
			default: () => false,
		},
		width: {
			type: [Number, String],
			default: () => null,
		},
		height: {
			type: [Number, String],
			default: () => null,
		},
		duration: {
			type: Number,
			default: () => 300,
		},
		swipeThreshold: {
			type: Number,
			default: () => 0.35,
		},
		indicatorDots: {
			type: Boolean,
			default: () => false,
		},
		indicatorColor: {
			type: String,
			default: () => '#fff',
		},
		indicatorActiveColor: {
			type: String,
			default: () => '#fff',
		},
		autoplay: {
			type: Boolean,
			default: () => false,
		},
		interval: {
			type: Number,
			default: () => 3000,
		},
		circular: {
			type: Boolean,
			default: () => false,
		},
		previousMargin: {
			type: [Number, String],
			default: () => 0,
		},
		nextMargin: {
			type: [Number, String],
			default: () => 0,
		},
	},
	data() {
		return {
			initializing: true,
			moveing: false,
			reseting: false,
			dataIndex: 0,
			touch: new TouchEvent(),
			boxWidth: null,
			boxHeight: null,
			translateX: 0,
			translateY: 0,
			childrenTimeout: null, // 子元素更新定时器
			durationTimeout: null, // 滑动动画时长定时器
			autoplayTimeout: null, // 自动切换定时器
			source: 'autoplay',
		};
	},
	computed: {
		cmpDuration() {
			return this.autoplay && this.duration >= this.interval ? this.interval : this.duration;
		},
		cmpRootStyle() {
			let width = this.direction === 'horizontal' ? '100%' : 'auto';
			let height = this.direction === 'vertical' ? '100%' : 'auto';
			if (this.width) width = utils.formatPx(this.width);

			if (this.height) height = utils.formatPx(this.height);

			return {
				'--swiper-width': width,
				'--swiper-height': height,
				'--swiper-indicator-color': this.indicatorColor,
				'--swiper-indicator-active-color': this.indicatorActiveColor,
				'--swiper-root-padding':
					this.direction === 'horizontal'
						? `0  ${utils.formatPx(this.nextMargin)} 0 ${utils.formatPx(this.previousMargin)}`
						: `${utils.formatPx(this.previousMargin)} 0 ${utils.formatPx(this.nextMargin)} 0`,
			};
		},
		cmpBoxStyle() {
			let style = {};
			if (this.direction === 'horizontal') {
				style.gridTemplateColumns = `repeat(${this.children.length || 'auto-fill'}, 100%)`;
			} else if (this.direction === 'vertical') {
				style.gridTemplateRows = `repeat(${this.children.length || 'auto-fill'}, 100%)`;
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
			const duration = this.initializing || this.moveing || this.reseting ? 'inherit' : `${this.cmpDuration}ms`;
			return { transform, transitionDuration: duration };
		},
		cmpStartComponent() {
			return this.children[0];
		},
		cmpEndComponent() {
			return this.children[this.children.length - 1];
		},
	},
	watch: {
		current: {
			handler(v) {
				if (!this.children.length) {
					this.dataIndex = v;
					return;
				}
				this.dataIndex = v < 0 ? 0 : v >= this.children.length ? this.children.length - 1 : v;
			},
			immediate: true,
		},
		dataIndex: {
			handler() {
				if (!this.children.length) return;
				this.$nextTick(async () => {
					await this.getBoxSize();
					this.setTransform();
				});
			},
			immediate: true,
		},
		children: {
			handler(v) {
				if (!v || !v.length) return;
				this.$nextTick(() => {
					this.init();
				});
			},
			immediate: true,
		},
	},
	mounted() {
		this.init();
	},
	beforeDestroy() {
		clearTimeout(this.childrenTimeout);
		clearTimeout(this.durationTimeout);
		clearInterval(this.autoplayTimeout);
	},
	methods: {
		init() {
			clearTimeout(this.childrenTimeout);
			this.childrenTimeout = setTimeout(async () => {
				await this.getBoxSize();
				this.setTransform();
				this.resetBoundary();
				this.setAutoplay();

				setTimeout(() => {
					this.initializing = false;
				}, 25);
			}, 25);
		},
		isMover(moveX = 0, moveY = 0) {
			if (this.children.length < 2) return;
			if (this.circular) return true;
			if (
				this.direction === 'horizontal' &&
				((this.dataIndex === 0 && moveX > 0) || (this.dataIndex === this.children.length - 1 && moveX < 0))
			) {
				return false;
			}
			if (
				this.direction === 'vertical' &&
				((this.dataIndex === 0 && moveY > 0) || (this.dataIndex === this.children.length - 1 && moveY < 0))
			) {
				return false;
			}
			return true;
		},
		async getBoxSize() {
			if (this.boxWidth > 0 && this.boxHeight > 0) return;
			const boxEl = await utils.querySelector('.swipe-content-view', this);
			this.boxWidth = boxEl.width;
			this.boxHeight = boxEl.height;
		},
		setTransform(moveX = 0, moveY = 0) {
			if (this.children?.length < 2) return;
			const bool = this.isMover(moveX, moveY);
			if (!bool) return;
			if (this.direction === 'horizontal') {
				this.translateX = -this.dataIndex * this.boxWidth + moveX;
				this.setBoundary(moveX);
			} else if (this.direction === 'vertical') {
				this.translateY = -this.dataIndex * this.boxHeight + moveY;
				this.setBoundary(0, moveY);
			}
		},
		async onTouchstart(e) {
			if (this.disabled) return;
			if (this.children?.length < 2) return;
			this.moveing = true;
			await this.getBoxSize();
			clearInterval(this.autoplayTimeout);
			this.resetBoundary();
			this.touch.touchStart(e);
		},
		onTouchmove(e) {
			if (this.disabled) return;
			if (this.children?.length < 2) return;
			const res = this.touch.touchMove(e);
			if (!res) return;
			this.moveing = true;
			let { moveX, moveY } = res;
			this.setTransform(moveX, moveY);
		},
		onTouchend(e) {
			this.moveing = false;
			clearTimeout(this.durationTimeout);
			this.durationTimeout = setTimeout(() => {
				this.setAutoplay();
				this.resetBoundary();
			}, this.cmpDuration);

			if (this.disabled) return;
			const { moveX, moveY } = this.touch.touchEnd(e);
			if (this.direction === 'horizontal' && !moveX) return;
			else if (this.direction === 'vertical' && !moveY) return;
			const bool = this.isMover(moveX, moveY);
			if (!bool) return;

			let index = this.dataIndex;
			if (this.direction === 'horizontal' && Math.abs(moveX) > this.boxWidth * this.swipeThreshold) {
				index = moveX > 0 ? index - 1 : index + 1;
			} else if (this.direction === 'vertical' && Math.abs(moveY) > this.boxHeight * this.swipeThreshold) {
				index = moveY > 0 ? index - 1 : index + 1;
			}

			if (this.dataIndex === index) {
				this.setTransform();
				return;
			}
			this.source = 'touch';
			this.dataIndex = index;
			if (index < 0 || index >= this.children.length) return;
			this.$emit('change', index, this.source);
		},
		setAutoplay() {
			clearInterval(this.autoplayTimeout);
			if (!this.autoplay) return;
			if (this.children?.length < 2) return;
			this.autoplayTimeout = setInterval(() => {
				let next = this.dataIndex + 1 <= this.children.length - 1 ? this.dataIndex + 1 : 0;
				if (this.circular) {
					next = this.dataIndex + 1;
				}
				this.setBoundary(-1, -1);
				this.source = 'autoplay';
				this.dataIndex = next;
				if (next >= 0 && next <= this.children.length - 1) this.$emit('change', next, this.source);
				clearTimeout(this.durationTimeout);
				this.durationTimeout = setTimeout(() => {
					this.resetBoundary();
				}, this.cmpDuration - 100);
			}, this.interval);
		},
		setBoundary(moveX = 0, moveY = 0) {
			if (!this.circular) return;
			const startComponent = this.cmpStartComponent;
			const endComponent = this.cmpEndComponent;
			const length = this.children.length;
			const width = this.boxWidth;
			const height = this.boxHeight;
			if (this.dataIndex <= 0) {
				startComponent.setTransform({});
				if (this.direction === 'horizontal' && moveX > 0) {
					endComponent.setTransform({ x: -length * width });
				} else if (this.direction === 'vertical' && moveY > 0) {
					endComponent.setTransform({ y: -length * height });
				}
			} else if (this.dataIndex >= length - 1) {
				endComponent.setTransform({});
				if (this.direction === 'horizontal' && moveX < 0) {
					startComponent.setTransform({ x: length * width });
				} else if (this.direction === 'vertical' && moveY < 0) {
					startComponent.setTransform({ y: length * height });
				}
			}
		},
		resetBoundary() {
			this.reseting = true;
			let change = false;
			if (this.dataIndex === -1) {
				this.dataIndex = this.children.length - 1;
				change = true;
			} else if (this.dataIndex === this.children.length) {
				this.dataIndex = 0;
				change = true;
			}
			if (change) {
				this.$emit('change', this.dataIndex, this.source);
			}

			const length = this.children.length;
			this.children.forEach((component, index) => {
				let x = 0,
					y = 0;
				if (this.circular) {
					if (index === length - 1 && this.dataIndex === 0 && length > 2) {
						x = this.direction === 'horizontal' ? -length * this.boxWidth : 0;
						y = this.direction === 'vertical' ? -length * this.boxHeight : 0;
					} else if (index === 0 && this.dataIndex === length - 1 && length > 2) {
						x = this.direction === 'horizontal' ? length * this.boxWidth : 0;
						y = this.direction === 'vertical' ? length * this.boxHeight : 0;
					}
				}
				component?.setTransform({ x, y });
			});
			setTimeout(() => {
				this.reseting = false;
			}, 100);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-swiper-root {
	width: var(--swiper-width);
	height: var(--swiper-height);
	overflow: hidden;
	padding: var(--swiper-root-padding);
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
			width: 8rpx;
			height: 8rpx;
			border-radius: 6rpx;
			background-color: var(--swiper-indicator-color);
			&.active {
				width: 24rpx;
				background-color: var(--swiper-indicator-active-color);
			}
			& + .swiper-dots-item {
				margin-left: 8rpx;
			}
		}
	}
}
</style>
