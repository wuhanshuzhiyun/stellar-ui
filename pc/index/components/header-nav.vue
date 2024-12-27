<template>
	<view class="header-nav">
		<view
			class="nav-item"
			v-for="item in navData"
			:key="item.key"
			:class="active == item.key ? 'active' : ''"
			@click="toView(item)"
		>
			{{ item.title }}
		</view>
	</view>
</template>

<script>
import config from '@/common/config.js';
export default {
	props: {
		mode: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			active: '',
			navData: config.NAV_DATA,
		};
	},
	watch: {
		mode: {
			handler(val) {
				if (val) {
					this.active = val;
				}
			},
			immediate: true,
		},
	},
	methods: {
		toView(item) {
			this.$emit('update:mode', item.key);
			this.active = item.key;
			this.$emit('change', item);
		},
	},
};
</script>

<style lang="scss" scoped>
.header-nav {
	height: var(--pc-header-nav-height);
	display: flex;
	.nav-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 0 12px;
		border-bottom: 2px solid transparent;

		font-size: 14px;
		font-weight: 500;

		cursor: pointer;

		&.active {
			border-bottom-color: var(--pc-main-color);
		}
	}
}
</style>
