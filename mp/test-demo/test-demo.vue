<template>
	<view class="test-demo">
		<ste-tabs :divideNum="5">
			<ste-tab v-for="t in list" :key="t.id" :index="t.id" :title="t.name" />
		</ste-tabs>
		{{ list.length }}
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{ name: '标签1', id: 1 },
				{ name: '标签2', id: 2 },
				{ name: '标签3', id: 3 },
				{ name: '标签4', id: 4 },
				{ name: '标签5', id: 5 },
			],
		};
	},
	mounted() {
		setTimeout(() => {
			this.list = [
				{ name: '标签1', id: 1 },
				{ name: '标签2', id: 2 },
				{ name: '标签3', id: 3 },
				{ name: '标签4', id: 4 },
			];
		}, 2000);
	},
};
</script>

<style scoped>
.test-demo {
	padding-top: 120rpx;
}
</style>
