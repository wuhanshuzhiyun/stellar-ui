<template>
	<view class="test-demo">
		<ste-upload multiple @before-read="beforeRead" @after-read="afterRead"></ste-upload>
		<ste-upload multiple accept="all" @after-read="afterRead"></ste-upload>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
		};
	},
	mounted() {
		setTimeout(() => {
			this.list = [];
		}, 2000);
	},
	methods: {
		beforeRead(fileList, next) {
			console.log('beforeRead');
			next(false);
		},
		afterRead(fileList) {
			console.log('afterRead');
		},
	},
};
</script>

<style scoped>
.test-demo {
	padding-top: 120rpx;
}
</style>
