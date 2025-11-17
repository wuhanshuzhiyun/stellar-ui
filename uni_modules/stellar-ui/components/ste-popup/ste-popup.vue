<template>
	<view class="ste-popup" :class="position" :style="[cmpPageStyle]" @click.stop="onMaskClick"
		:animation="overlayAnimationData">
		<view class="content" :class="position" :style="[cmpContentStyle]" :animation="animationData" @click.stop>
			<template v-if="keepContent || showContent">
				<scroll-view style="width: 100%; height: 100%" v-if="height > 0" :scroll-y="true"
					@touchmove.stop.prevent="touchmove">
					<slot name="default"></slot>
				</scroll-view>
				<slot v-else name="default"></slot>
			</template>
			<view class="close-icon-box" @click="close" v-if="showClose && position != 'center'">
				<ste-icon code="&#xe6a0;" size="40" color="#666"></ste-icon>
			</view>
		</view>
		<view class="close-icon-box-center" @click="close" v-if="showClose && position == 'center' && showContent">
			<ste-icon code="&#xe6a0;" size="40" color="#fff"></ste-icon>
		</view>
	</view>
</template>
<script>
	import utils from '../../utils/utils.js';
	const DEFAULT_BORDER_RADIUS = 32;
	/**
	 * ste-popup 弹出层
	 * @description 弹出层组件
	 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-popup
	 * @property {Boolean} show 是否显示弹出层,使用sync修饰符来双向绑定 默认 false
	 * @property {String} backgroundColor 内容容器的背景色 默认 #ffffff
	 * @property {Boolean} isMaskClick 是否可以点击遮罩层关闭 默认 true
	 * @property {Number|String} width 内容区宽度
	 * @property {Number|String} height 内容区高度
	 * @property {String} position 弹出位置 默认 center
	 * @value center 中 {String}
	 * @value top 上 {String}
	 * @value bottom 下 {String}
	 * @value left 左 {String}
	 * @value right 右 {String}
	 * @property {Boolean} round 是否圆角 默认 false
	 * @property {Boolean} showClose 是否右上角显示关闭图标 默认 true
	 * @property {Number|String} offsetX 根据弹出位置，设置X轴偏移量，单位px 默认 0
	 * @property {Number|String} offsetY 根据弹出位置，设置Y轴偏移量，单位px 默认 0
	 * @property {Number} duration 动画持续时间，单位ms
	 * @property {Number} zIndex 弹窗层级z-index
	 * @property {Boolean} keepContent 隐藏后是否不销毁弹窗内容元素 默认 true
	 * @event {Function} close 弹窗关闭动画执行完毕事件
	 * @event {Function} open 弹窗打开动画执行完毕事件
	 * @event {Function} maskClick 遮罩点击事件
	 **/
	export default {
		group: '基础组件',
		title: 'Popup 弹出层',
		name: 'ste-popup',
		props: {
			// 打开或者关闭弹窗，必须使用.sync进行双向绑定
			show: {
				type: [Boolean, null],
				default: false,
			},
			backgroundColor: {
				type: [String, null],
				default: '#ffffff',
			},
			// 是否显示遮罩
			showMask: {
				type: [Boolean, null],
				default: true,
			},
			// 蒙版点击是否关闭弹窗
			isMaskClick: {
				type: [Boolean, null],
				default: true,
			},
			// 弹窗内容层宽度
			width: {
				type: [Number, String, null],
				default: '100vw',
			},
			// 弹窗内容层高度
			height: {
				type: [Number, String, null],
				default: 'auto',
			},
			// 位置 center top bottom left right
			position: {
				type: [String, null],
				default: 'center',
			},
			round: {
				type: [Boolean, null],
				default: false,
			},
			showClose: {
				type: [Boolean, null],
				default: true,
			},
			offsetX: {
				type: [Number, String, null],
				default: 0,
			},
			offsetY: {
				type: [Number, String, null],
				default: 0,
			},
			// 动画持续时间
			duration: {
				type: [Number, null, null],
				default: 200,
			},
			// 弹窗z-index
			zIndex: {
				type: [Number, String, null],
				default: 998,
			},
			// 是否在动画完成后渲染或销毁内容元素
			keepContent: {
				type: [Boolean, null],
				default: true,
			},
		},
		data() {
			return {
				pageDisplay: 'none',
				animationData: null,
				overlayAnimationData: null,
				animationProp: {
					duration: this.duration,
					timingFunction: 'ease-out'
				},
				clickTask: null,
				showContent: false, // 配合keepContent属性来渲染或销毁内容元素
			};
		},
		created() {
			if (this.show) {
				this.beginAnimation();
			}
		},
		mounted() {},
		computed: {
			cmpPageStyle() {
				return {
					zIndex: this.zIndex,
					display: this.pageDisplay,
					backgroundColor: this.showMask ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
					'--content-border-radius': utils.formatPx(this.round ? DEFAULT_BORDER_RADIUS : 0),
					'--content-height': utils.formatPx(this.height / 2),
				};
			},
			cmpContentStyle() {
				let style = {
					width: utils.formatPx(this.width),
					height: utils.formatPx(this.height),
					backgroundColor: this.backgroundColor,
				};

				if (this.position === 'center') {} else if (this.position === 'bottom') {} else if (this.position ===
					'top') {} else if (this.position === 'left') {} else if (this.position === 'right') {}

				return style;
			},
		},
		watch: {
			show: {
				handler(newVal) {
					if (newVal) {
						this.beginAnimation();
					} else {
						this.endAnimation();
					}
				},
			},
		},
		methods: {
			touchmove(e) {
				// TODO nvue 取消冒泡
				e.stopPropagation();
			},
			onMaskClick() {
				this.$emit('clickMask');
				if (this.isMaskClick) {
					this.close();
				}
			},
			// 关闭弹窗
			async close() {
				if (this.clickTask) {
					return;
				}
				let next = true;
				this.allowStopStatus = false;
				this.clickTask = new Promise((resolve, reject) => {
					this.$emit(
						'close',
						() => (next = false),
						() => resolve(),
						() => reject()
					);
				});
				if (!next) {
					await this.clickTask;
				}
				this.endAnimation();
				this.$emit('update:show', false);
				setTimeout(() => {
					this.clickTask = null;
				}, this.duration);
			},
			allowStop() {
				this.allowStopStatus = true;
			},
			// 打开弹窗时的动画
			async beginAnimation() {
				this.pageDisplay = 'flex';
				await utils.sleep(50);
				let animation = uni.createAnimation(this.animationProp);
				let overlayAnimation = uni.createAnimation(this.animationProp);
				overlayAnimation.opacity(1).step({
					duration: this.duration,
				});

				if (this.position === 'center') {
					animation.scale(1).translate(utils.formatPx(this.offsetX), utils.formatPx(this.offsetY)).step();
				} else if (this.position === 'top' || this.position === 'bottom') {
					animation.translate(utils.formatPx(this.offsetX), utils.formatPx(this.offsetY)).step();
				} else if (this.position === 'left' || this.position === 'right') {
					animation.translate(utils.formatPx(this.offsetX), utils.formatPx(this.offsetY)).step();
				}
				this.overlayAnimationData = overlayAnimation.export();
				this.animationData = animation.export();

				setTimeout(() => {
					this.showContent = true;
					this.$emit('open-after');
				}, this.duration);
			},
			endAnimation() {
				let animation = uni.createAnimation(this.animationProp);
				let overlayAnimation = uni.createAnimation(this.animationProp);
				overlayAnimation.opacity(0).step();

				if (this.position === 'center') {
					animation.scale(0).step();
				} else if (this.position === 'top' || this.position === 'bottom') {
					animation.translateY(this.position == 'top' ? '-100%' : '100%').step();
				} else if (this.position === 'left' || this.position === 'right') {
					animation.translateX(this.position == 'left' ? '-100%' : '100%').step();
				}

				this.overlayAnimationData = overlayAnimation.export();
				this.animationData = animation.export();

				setTimeout(() => {
					this.pageDisplay = 'none';
					this.showContent = false;
				}, this.duration);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.ste-popup {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		position: fixed;
		left: 0;
		top: 0;
		overflow: hidden;
		justify-content: center;
		align-items: center;
		touch-action: none;

		.close-icon-box-center {
			position: absolute;
			color: #fff;
			top: calc(50% + var(--content-height) + 40rpx);
			left: 50%;
			transform: translate(-50%, 0);
			display: flex;
		}
	}

	.content {
		display: inline-block;
		opacity: 1;
		overflow-y: auto;
		position: absolute;

		.close-icon-box {
			position: absolute;
			right: 24rpx;
			top: 24rpx;
			display: flex;
		}

		&.center {
			// position: relative;
			transform: scale(0);
			border-radius: var(--content-border-radius);
		}

		&.bottom {
			transform: translateY(100%);
			left: 0;
			bottom: 0;
			border-top-left-radius: var(--content-border-radius);
			border-top-right-radius: var(--content-border-radius);
		}

		&.top {
			transform: translateY(-100%);
			left: 0;
			top: 0;
			border-bottom-left-radius: var(--content-border-radius);
			border-bottom-right-radius: var(--content-border-radius);
		}

		&.left {
			transform: translateX(-100%);
			left: 0;
			top: 0;
			border-top-right-radius: var(--content-border-radius);
			border-bottom-right-radius: var(--content-border-radius);
		}

		&.right {
			transform: translateX(100%);
			right: 0;
			top: 0;
			border-top-left-radius: var(--content-border-radius);
			border-bottom-left-radius: var(--content-border-radius);
		}
	}
</style>