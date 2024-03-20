<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="按钮"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">按钮大小</view>
				<view class="item-block">
					<view>
						<ste-button :mode="400" @click="handleClick('超大按钮')">超大按钮</ste-button>
					</view>
					<view>
						<ste-button :mode="300" @click="handleClick('大按钮')">大按钮</ste-button>
					</view>
					<view>
						<ste-button :mode="200" @click="handleClick('中按钮')">中按钮</ste-button>
					</view>
					<view>
						<ste-button :mode="100" @click="handleClick('小按钮')">小按钮</ste-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {};
	},
	created() {},
	methods: {},
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
