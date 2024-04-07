<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="开关"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-switch v-model="value1"></ste-switch>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			value1: false,
		};
	},
	created() {},
	methods: {
		change(value) {
			console.log('value', value);
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
}
</style>
