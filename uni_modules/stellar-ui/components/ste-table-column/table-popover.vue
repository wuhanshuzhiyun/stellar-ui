<template>
	<view class="wrapper">
		<view
			class="ellipsis-box"
			@touchstart="handleTouchStart"
			@touchend="handleTouchEnd"
			@mousedown="handleTouchStart"
		>
			{{ text }}
		</view>
		<!-- 不做展示，正常显示文字长度，用于判断是否超过长度 -->
		<text class="measure-text">{{ text }}</text>

		<view
			class="popover"
			:class="showPopover ? 'show' : 'hidden'"
			:style="{ left: popoverLeft + 'px', top: popoverTop + 'px' }"
			:animation="animationData"
		>
			<view class="popover-content">
				{{ text }}
			</view>
			<view class="popover-arrow" :style="{ left: arrowLeft + '%' }"></view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
const DURATION = 200;
const ANIMATION_PROP = { duration: DURATION, timingFunction: 'ease-out' };
export default {
	props: {
		text: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			pressTimer: null,
			showPopover: false,
			popoverLeft: 0,
			popoverTop: 0,
			arrowLeft: 50, // 箭头的左边距百分比
			isTextOverflow: false,
			animationData: null,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.checkTextOverflow();
		});
	},
	watch: {
		text() {
			this.checkTextOverflow();
		},
	},
	methods: {
		async checkTextOverflow() {
			const containerData = await utils.querySelector('.ellipsis-box', this);
			let textData = await utils.querySelector('.measure-text', this);

			if (containerData && textData) {
				this.isTextOverflow = textData.width > containerData.width;
			}
		},
		handleTouchStart(e) {
			if (!this.isTextOverflow) return;

			this.pressTimer = setTimeout(() => {
				this.showPopover = true;
				this.$nextTick(() => {
					this.updatePopoverPosition();
				});
			}, 100);
			// #ifdef WEB
			window.addEventListener('mouseup', this.doHide);
			// #endif
		},
		async updatePopoverPosition() {
			const containerData = await utils.querySelector('.ellipsis-box', this);
			const popoverData = await utils.querySelector('.popover', this);
			if (!containerData || !popoverData) return;

			const systemInfo = utils.System;
			const MARGIN = 10; // 间隔像素，避免贴边或者贴着弹出元素

			// 计算文本框中心点
			const boxCenter = containerData.left + containerData.width / 2;

			// 计算 popover 的位置
			let left = boxCenter - popoverData.width / 2;

			// 确保 popover 不超出屏幕左边
			if (left < MARGIN) {
				left = MARGIN;
			}

			// 确保 popover 不超出屏幕右边
			if (left + popoverData.width > systemInfo.getWindowWidth() - MARGIN) {
				left = systemInfo.getWindowWidth() - popoverData.width - MARGIN;
			}

			// 计算箭头位置（相对于 popover 的百分比）
			const arrowLeft = ((boxCenter - left) / popoverData.width) * 100;
			this.popoverLeft = left;
			this.popoverTop = containerData.top - popoverData.height - (MARGIN + 5);

			this.arrowLeft = Math.max(10, Math.min(90, arrowLeft)); // 限制箭头在 10% 到 90% 之间
			this.doShow();
		},

		handleTouchEnd() {
			this.doHide();
		},

		doShow() {
			this.$nextTick(() => {
				let animation = uni.createAnimation(ANIMATION_PROP);
				animation.opacity(1).step();
				this.animationData = animation.export();
			});
		},
		doHide() {
			if (this.pressTimer) {
				clearTimeout(this.pressTimer);
				this.pressTimer = null;
			}
			let animation = uni.createAnimation(ANIMATION_PROP);
			animation.opacity(0).step();
			this.animationData = animation.export();
			setTimeout(() => {
				this.showPopover = false;
			}, DURATION);
			// #ifdef WEB
			window.removeEventListener('mouseup', this.doHide);
			// #endif
		},
	},
};
</script>

<style lang="scss" scoped>
.wrapper {
	position: relative;
}

.ellipsis-box {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	user-select: none;
}

.measure-text {
	position: fixed;
	left: -9999px;
	top: -9999px;
	white-space: nowrap;
	visibility: hidden;
}

.popover {
	position: fixed;
	z-index: 999;
	pointer-events: none;
	opacity: 0;
	&.show {
		display: block;
	}

	&.hidden {
		display: none;
	}
}

.popover-content {
	background-color: rgba(0, 0, 0, 0.8);
	color: white;
	padding: 8px 12px;
	border-radius: 4px;
	font-size: 14px;
	line-height: 1.4;
	word-break: break-word;
	white-space: normal;
	max-width: 60vw;
	text-align: left;
}

.popover-arrow {
	position: absolute;
	bottom: -6px;
	transform: translateX(-50%);
	width: 0;
	height: 0;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 6px solid rgba(0, 0, 0, 0.8);
}
</style>
