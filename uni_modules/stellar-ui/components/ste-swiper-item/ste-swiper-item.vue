<template>
	<view class="ste-swiper-item-root">
		<slot></slot>
	</view>
</template>

<script>
export default {
	name: 'ste-swiper-item',
	inject: ['_swiperComponent'],
	props: {
		index: {
			type: Number,
			default: () => null,
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
				transfrom: `translate3d(${this.transformX}px,${this.transformY}px,${this.transformZ}px)`,
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
			this.transformX = x;
			this.transformY = y;
			this.transformZ = z;
		},
		setIndex(index) {
			this.index = index;
		},
	},
};
</script>

<style>
.ste-swiper-item-root {
}
</style>
