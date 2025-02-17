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
		};
	},
	computed: {
		cmpStyle() {
			return {
				transform: `translate3d(${this.transformX}px,${this.transformY}px,${this.transformZ}px)`,
			};
		},
	},
	methods: {
		setTransform({ x = 0, y = 0, z = 0 }) {
			if (this.transformX !== x) this.transformX = x;
			if (this.transformY !== y) this.transformY = y;
			if (this.transformZ !== z) this.transformZ = z;
		},
	},
};
</script>

<style>
.ste-swiper-item-root {
	width: 100%;
	height: 100%;
}
</style>
