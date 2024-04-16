<template>
	<view class="ste-scroll-to-item-root" @resize="getData">
		<slot />
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-scroll-to-item 锚点项
 * @description 锚点项
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-scroll-to
 * @property {Number}		index 当前锚点下标
 */
export default {
	name: 'ste-scroll-to-item',
	inject: ['_scrollToComponent'],
	props: {
		index: {
			type: Number,
			default: () => undefined,
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
	updated() {
		this.getData();
	},
	beforeDestroy() {
		this.$nextTick(() => {
			this.getData();
		});
	},
	methods: {
		getData() {
			if (!this.parent) return;
			if (this.index === undefined) {
				console.error('ste-scroll-to-item组件的index值不能为空！');
				return;
			}
			this.$nextTick(async () => {
				this.parent.updateChildren({ index: this.index, component: this });
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-scroll-to-item-root {
	width: 100%;
}
</style>
