<template>
	<scroll-view scroll-y class="datapager-root" :style="[rootStyle]">
		<view class="datapager-content">
			<slot></slot>
		</view>
		<view class="datapager-footer"></view>
	</scroll-view>
</template>

<script>
import utils from '../../utils/utils';

export default {
	name: 'datapager',
	options: {
		virtualHost: true,
	},
	props: {
		// 距离底部触发分页距离
		bottomDistance: {
			type: Number,
			default: 1,
		},
		rootStyle: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {};
	},
	computed: {},
	created() {},
	mounted() {
		uni.createIntersectionObserver(this)
			.relativeTo('.datapager-root', { bottom: this.bottomDistance ? this.bottomDistance : 1 })
			.observe('.datapager-footer', (res) => {
				if (res.intersectionRatio) {
					this.$emit('loadMore');
				}
			});
	},
	methods: {},
};
</script>

<style lang="scss">
.datapager-root {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	.datapager-content {
		width: 100%;
	}
	.datapager-footer {
		width: 100%;
		height: 0.5px;
	}
}
</style>
