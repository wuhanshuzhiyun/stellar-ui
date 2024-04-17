<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="输入框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-media-preview />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			open: false,
			medias: [],
		};
	},
};
</script>
<style lang="scss" scoped>
.page {
	.content {
		background: #fbfbfc;
		.demo-item {
			.item-block {
				> view {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
