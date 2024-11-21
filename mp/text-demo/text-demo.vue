<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="文本"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Text 文本</view>
				<view class="cmp-desc">显示文本文字的组件</view>
			</view>
			<view class="demo-item">
				<view class="title">可选</view>
				<view class="item-block">
					<view>
						<ste-text selectable>Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水</ste-text>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">空格</view>
				<view class="item-block">
					<view style="width: 30%" space="ensp">
						<ste-text>{{ text1 }}</ste-text>
					</view>
					<view style="width: 30%" space="emsp">
						<ste-text>{{ text2 }}</ste-text>
					</view>
					<view style="width: 30%" space="nbsp">
						<ste-text>{{ text3 }}</ste-text>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">解码</view>
				<view class="item-block">
					<view>
						<ste-text decode>Stellar&nbsp;UI</ste-text>
					</view>
					<view>
						<!-- <ste-text decode>Stellar&lt;UI</ste-text> -->
					</view>
					<view>
						<!-- <ste-text decode>Stellar&gt;UI</ste-text> -->
					</view>
					<view>
						<ste-text decode>Stellar&amp;UI</ste-text>
					</view>
					<view>
						<ste-text decode>Stellar&apos;UI</ste-text>
					</view>
					<view>
						<ste-text decode>Stellar&ensp;UI</ste-text>
					</view>
					<view>
						<ste-text decode>Stellar&emsp;UI</ste-text>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">换行省略</view>
				<view class="item-block">
					<view style="width: 30%">
						<ste-text>
							Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar
							UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。
						</ste-text>
					</view>
					<view style="width: 30%">
						<ste-text :lines="2">
							Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar
							UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。
						</ste-text>
					</view>
					<view style="width: 30%">
						<ste-text :lines="3">
							Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar
							UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。
						</ste-text>
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
			text1: '是你   是你',
			text2: '是你   是你',
			text3: '是你   是你',
		};
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
					margin: 0 16rpx 16rpx 0;
				}
			}
		}
	}
}
</style>
