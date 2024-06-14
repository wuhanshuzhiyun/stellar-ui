<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="步骤条"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-steps :active="active">
						<ste-step></ste-step>
						<ste-step></ste-step>
						<ste-step></ste-step>
					</ste-steps>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">xx</view>
				<view class="item-block">
					<ste-steps :active="active">
						<ste-step></ste-step>
						<ste-step></ste-step>
						<ste-step></ste-step>
					</ste-steps>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			active: 0,
		};
	},
};
</script>

<style lang="scss" scoped>
.page {
}
</style>
