<template>
	<view class="ste-scroll-to-item--root" @resize="getData">
		<slot />
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
export default {
	name: 'ste-scroll-to-item',
	inject: ['_scrollToComponent'],
	props: {
		index: {
			type: Number,
			default: () => 0,
		},
	},
	data() {
		return {
			parent: null,
		};
	},
	mounted() {
		this.parent = this._scrollToComponent?.getParent();
		this.getData();
	},
	methods: {
		getData() {
			if (!this.parent) return;
			this.$nextTick(async () => {
				this.parent.updateChildren({ index: this.index, component: this });
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-scroll-to-item--root {
	width: 100%;
}
</style>
