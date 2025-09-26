<template>
	<view class="ste-swiper-item-root" :style="[cmpStyle]" data-test="swiper-item">
		<slot></slot>
	</view>
</template>

<script>
import { childMixin } from '../../utils/mixin.js';
export default {
	name: 'ste-swiper-item',
	mixins: [childMixin('ste-swiper')],
	data() {
		return {
			transformX: 0,
			transformY: 0,
			transformZ: 0,
			linearScale: 1,
		};
	},
	computed: {
		cmpStyle() {
			return {
				transform: `translate3d(${this.transformX}px,${this.transformY}px,${this.transformZ}px) scale(${this.linearScale})`,
				transformOrigin: 'center center',
			};
		},
	},
	methods: {
		setTransform({ x = 0, y = 0, z = 0 }) {
			if (this.transformX !== x) this.transformX = x;
			if (this.transformY !== y) this.transformY = y;
			if (this.transformZ !== z) this.transformZ = z;
		},
		setLinearScale(scale) {
			this.linearScale = scale;
		},
	},
};
</script>

<style>
.ste-swiper-item-root {
	width: 100%;
	height: 100%;
	/* 添加此行以确保在循环播放时不会出现闪烁 */
	will-change: transform;
}
</style>