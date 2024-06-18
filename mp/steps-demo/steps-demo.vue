<template></template>

<script>
export default {
	data() {
		return {
			active: 0,
		};
	},
	methods: {
		goToNext() {
			this.active++;
		},
		toToast(index) {
			this.showToast({
				title: `进度：${index}`,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
}
</style>
