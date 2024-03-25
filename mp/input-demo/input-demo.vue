<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="按钮"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">输入框</view>
				<view class="item-block">
					<view style="width: 40%">
						<ste-input></ste-input>
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

					.loading-icon-box {
						.iconfont {
							animation: ste-roatae 1s linear infinite;
						}
					}
				}
			}
		}
	}

	@keyframes ste-roatae {
		0% {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(1turn);
		}
	}
}
</style>
