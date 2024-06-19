<template>
	<view class="ste-tour-root" @touchmove.stop="true" :class="{ show: dataShow }" @click="clickRoot">
		<view class="ste-tour-view" :style="[dataStyle]"></view>
		<view class="ste-tour-message" :style="[messageStyle]">
			<view class="message-arrows" :style="[arrowsStyle]" />
			<view class="message-content">
				<view class="message-title">
					<view class="title-text"></view>
					<view class="title-close" @click="closeOpen">
						<ste-icon code="&#xe67b;" />
					</view>
				</view>
				<slot name="message">
					<view class="message-text">
						{{ cmpStep.message }}
					</view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
export default {
	props: {
		show: { type: Boolean, default: () => false },
		steps: { type: Array, default: () => [] },
		offset: { type: Array, default: () => [0, 0] },
		position: { type: 'auto' },
	},
	data() {
		return {
			dataShow: false,
			dataStep: 0,
			stepTimeout: null,
			dataStyle: {},
			messageStyle: {},
			arrowsStyle: {},
		};
	},
	computed: {
		cmpStep() {
			return this.steps[this.dataStep];
		},
		windowSize() {
			return {
				vw: utils.System.getWindowWidth(),
				vh: utils.System.getWindowHeight(),
			};
		},
	},
	watch: {
		show: {
			handler(val) {
				this.dataShow = val;
			},
			immediate: true,
		},
		dataShow: {
			handler(val) {
				if (val) this.showTour();
				else this.closeTour();
			},
			immediate: true,
		},
		dataStep: {
			handler(val) {
				this.showTour();
			},
			immediate: true,
		},
	},
	methods: {
		clickRoot() {
			this.closeOpen();
		},
		closeOpen() {
			this.dataShow = false;
			this.$emit('update:show', false);
			this.$emit('close');
		},
		showTour() {
			clearTimeout(this.stepTimeout);
			this.stepTimeout = setTimeout(() => {
				const step = this.cmpStep;
				if (!step) return;
				utils.querySelector(`#${step.target}`, this.$parent).then((el) => {
					if (!el) return console.error(`未找到ID为${step.target}的元素`);
					const { top, left, bottom, right, width, height } = el;

					this.dataStyle = {
						top: `${el.top}px`,
						left: `${el.left}px`,
						width: `${el.width}px`,
						height: `${el.height}px`,
					};

					let [y, x] = this.position?.split('-') || [];
					const { vw, vh } = this.windowSize;
					const _bottom = vh - bottom;
					const _right = vw - right;
					if (!y || y === 'auto') {
						if (top > _bottom) {
							y = 'top';
						} else {
							y = 'bottom';
						}
					}
					if (!x) {
						if (_right > 30 && _right > left) {
							x = 'start';
						} else if (left > 30) {
							x = 'end';
						} else {
							x = 'center';
						}
					}
					const [_x = 0, _y = 0] = this.offset;
					const arrowsWidth = 18;
					const messageStyle = {};
					const arrowsStyle = {};

					switch (y) {
						case 'top':
							messageStyle.bottom = `${top - _y - (arrowsWidth - 5)}px`;
							arrowsStyle.bottom = `-${arrowsWidth}px`;
							break;
						case 'bottom':
							messageStyle.top = `${bottom + _y + (arrowsWidth - 5)}px`;
							arrowsStyle.top = `-${arrowsWidth}px`;
							break;
					}
					switch (x) {
						case 'start':
							messageStyle.left = `${left + _x}px`;
							arrowsStyle.left = `${arrowsWidth}px`;
							break;
						case 'end':
							messageStyle.right = `${_right + _x}px`;
							arrowsStyle.right = `${arrowsWidth}px`;
							break;
						case 'center':
							messageStyle.left = '50%';
							messageStyle.transform = `translateX(calc(-50% + ${_x}px))`;
							arrowsStyle.left = '50%';
							arrowsStyle.transform = 'translateX(-50%)';
					}
					this.messageStyle = messageStyle;
					this.arrowsStyle = arrowsStyle;
				});
			}, 50);
		},
		closeTour() {
			this.dataStyle = {};
			this.messageStyle = {};
			this.arrowsStyle = {};
		},
	},
};
</script>

<style scoped lang="scss">
.ste-tour-root {
	position: fixed;
	z-index: 1001;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	overflow: hidden;
	display: none;
	&.show {
		display: block;
	}
	.ste-tour-view {
		border-radius: 18rpx;
		position: fixed;
		z-index: 1001;
		box-shadow: 0 0 0 250vh rgba(0, 0, 0, 0.5);
	}
	.ste-tour-message {
		background-color: #fff;
		padding: 6rpx 18rpx;
		position: fixed;
		z-index: 1002;
		border-radius: 18rpx;
		.message-arrows {
			position: absolute;
			width: 0;
			height: 0;
			border-width: 20rpx;
			border-style: solid;
			border-color: transparent transparent #fff;
		}
	}
}
</style>
