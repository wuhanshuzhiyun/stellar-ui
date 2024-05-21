<template>
	<view class="ste-swiper-item-root" :style="[cmpStyle]">
		<slot></slot>
	</view>
</template>

<script>
export default {
	name: 'ste-swiper-item',
	options: {
		virtualHost: true,
	},
	inject: ['_swiperComponent'],
	props: {
		index: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			parent: {},
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
	created() {
		this.parent = this._swiperComponent.getParent();
	},
	mounted() {
		this.parent.getChildren(this);
	},
	updated() {
		this.parent.getChildren(this);
	},
	beforeDestroy() {
		this.$nextTick(() => {
			this.parent.getChildren(this);
		});
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
