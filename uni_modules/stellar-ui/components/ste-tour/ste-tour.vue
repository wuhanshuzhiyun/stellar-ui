<template>
	<view class="ste-tour-root" :class="{ open: dataOpen }" @click="closeOpen">
		<slot></slot>
	</view>
</template>

<script>
export default {
	props: {
		open: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			dataOpen: false,
		};
	},
	watch: {
		open: {
			handler(val) {
				this.dataOpen = val;
			},
			immediate: true,
		},
	},
	methods: {
		closeOpen() {
			this.dataOpen = false;
			this.$emit('update:open', false);
			this.$emit('close');
		},
	},
};
</script>

<style scoped lang="scss">
.ste-tour-root {
	display: inline-block;
}
</style>
