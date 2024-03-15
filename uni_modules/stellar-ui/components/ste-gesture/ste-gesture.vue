<template>
	<view class="ste-gesture--root">
		<slot name="default" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
};
</script>

<style lang="scss" scoped>
.ste-gesture--root {
	width: 100%;
}
</style>
