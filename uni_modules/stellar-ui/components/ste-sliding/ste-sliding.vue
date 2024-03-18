<template>
	<view class="ste-sliding--root">
		<!-- 内容区域 -->
		<!-- #ifdef MP-WEIXIN | MP-ALIPAY -->
		<view
			class="content"
			@touchstart="onTouchstart"
			@touchmove="onTouchmove"
			@touchend="onTouchend"
			@touchcancel="onTouchend"
		>
			<view class="content-view" :style="[cmpTransform]">
				<slot name="default" />
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="content" @mousedown="onTouchstart" @mousemove="onTouchmove" @mouseup="onTouchend">
			<view class="content-view" :style="[cmpTransform]">
				<slot name="default" />
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import TouchEvent from './TouchEvent.js';
export default {
	props: {
		childrenLength: {
			type: Number,
			default: () => 0,
		},
		index: { type: Number, default: () => 0 },
		duration: { type: Number, default: () => 0.3 },
		disabled: { type: Boolean, default: () => false },
		disabledIndexs: { type: Array, default: () => [] },
	},
	data() {
		return {
			boxEl: null,
			touch: null,
			moveing: false,
			translateX: 0,
			dataIndex: 0,
		};
	},
	async mounted() {
		this.touch = new TouchEvent();
		this.boxEl = await utils.querySelector('.ste-sliding--root', this);
	},
	computed: {
		cmpTransform() {
			const transitionDuration = this.moveing ? 'inherit' : `${this.duration}s`;
			return {
				transform: `translateX(${this.translateX}px)`,
				transitionDuration,
			};
		},
		cmpItemLefts() {
			const list = [];
			if (!this.boxEl?.width) return list;
			for (let i = 0; i < this.childrenLength; i++) {
				list.push(this.boxEl.width * i);
			}
			return list;
		},
	},
	watch: {
		index: {
			handler(v) {
				this.dataIndex = v;
			},
			immediate: true,
		},
		dataIndex: {
			handler(v) {
				this.translateX = -this.cmpItemLefts[this.dataIndex];
			},
			immediate: true,
		},
	},
	methods: {
		onTouchstart(e) {
			if (this.disabled || !this.touch) return;
			this.moveing = true;
			this.touch.touchStart(e);
		},
		onTouchmove(e) {
			if (this.disabled || this.duration === 0 || !this.touch || !this.moveing) return;
			const res = this.touch.touchMove(e);
			if (!res) return;
			const { moveX } = res;
			this.translateX = -this.cmpItemLefts[this.dataIndex] + moveX;
		},
		onTouchend(e) {
			if (this.disabled || !this.touch) return;
			this.moveing = false;
			const { moveX } = this.touch.touchEnd(e);

			const nextIndex = moveX > 0 ? this.dataIndex - 1 : this.dataIndex + 1;
			const nextDisabled = this.disabledIndexs.indexOf(nextIndex) !== -1;
			if (
				nextDisabled ||
				nextIndex < 0 ||
				nextIndex > this.childrenLength - 1 ||
				Math.abs(moveX) < this.boxEl.width * 0.35
			) {
				this.$nextTick(() => {
					this.translateX = -this.cmpItemLefts[this.dataIndex];
				});
				return;
			}
			this.dataIndex = nextIndex;
			this.translateX = -this.cmpItemLefts[this.dataIndex];
			this.$emit('update:index', nextIndex);
			this.$emit('change', nextIndex);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-sliding--root {
	width: 100%;
	.content {
		width: 100%;
		overflow-x: hidden;
		.content-view {
			display: flex;
		}
	}
}
</style>
