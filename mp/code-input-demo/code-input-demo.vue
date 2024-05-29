<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="文本"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view>
						<ste-code-input
							v-model="value1"
							:maxlength="4"
							@change="change"
							@finish="finish"
						></ste-code-input>
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
			value1: '',
		};
	},
	created() {},
	methods: {
		change(e) {
			console.log('change', e);
		},
		finish(e) {
			console.log('finish', e);
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
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
