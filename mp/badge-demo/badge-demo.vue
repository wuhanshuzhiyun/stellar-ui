<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="按钮"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">徽标内容</view>
				<view class="item-block">
					<view>
						<ste-badge content="1" :showDot="false">
							<view class="avator"></view>
						</ste-badge>
					</view>
					<view>
						<ste-badge content="99+" :showDot="false">
							<view class="avator"></view>
						</ste-badge>
					</view>
					<view>
						<ste-badge content="hot" :showDot="false">
							<view class="avator"></view>
						</ste-badge>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">背景</view>
				<view class="item-block">
					<view>
						<ste-badge content="1" background="rgb(19, 183, 22)" :showDot="false">
							<view class="avator"></view>
						</ste-badge>
					</view>
					<view>
						<ste-badge
							content="99+"
							background="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
							:showDot="false"
						>
							<view class="avator"></view>
						</ste-badge>
					</view>
					<view>
						<ste-badge
							content=" "
							background="https://img95.699pic.com/xsj/0a/5y/dc.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast"
							:showDot="false"
						>
							<view class="avator"></view>
						</ste-badge>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">小红点</view>
				<view class="item-block">
					<view>
						<ste-badge>
							<view class="avator"></view>
						</ste-badge>
					</view>
					<view>
						<ste-badge background="rgb(19, 183, 22)">
							<view class="avator"></view>
						</ste-badge>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">偏移</view>
				<view class="item-block">
					<view>
						<ste-badge content="1" :showDot="false" :offsetX="10" :offsetY="10">
							<view class="avator"></view>
						</ste-badge>
					</view>
					<view>
						<ste-badge content="1" :showDot="false" :offsetX="0" :offsetY="-20">
							<view class="avator"></view>
						</ste-badge>
					</view>
					<view>
						<ste-badge content="1" :showDot="false" :offsetX="-20" :offsetY="-30">
							<view class="avator"></view>
						</ste-badge>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">徽标位置</view>
				<view class="item-block">
					<view>
						<ste-badge content="1" :showDot="false">
							<view class="avator"></view>
						</ste-badge>
					</view>
					<view>
						<ste-badge content="1" :showDot="false" position="topLeft">
							<view class="avator"></view>
						</ste-badge>
					</view>

					<view>
						<ste-badge content="1" :showDot="false" position="bottomLeft">
							<view class="avator"></view>
						</ste-badge>
					</view>
					<view>
						<ste-badge content="1" :showDot="false" position="bottomRight">
							<view class="avator"></view>
						</ste-badge>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义内容</view>
				<view class="item-block">
					<view>
						<ste-badge :showDot="false">
							<template slot="content">
								<ste-icon code="&#xe667;" size="10"></ste-icon>
							</template>
							<view class="avator"></view>
						</ste-badge>
					</view>
					<view>
						<ste-badge :showDot="false">
							<template slot="content">
								<ste-icon code="&#xe6a7;" size="14"></ste-icon>
							</template>
							<view class="avator"></view>
						</ste-badge>
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
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				> view {
					margin: 0 36px 36px 0;

					.avator {
						height: 80rpx;
						width: 80rpx;
						border-radius: 8rpx;
						background-color: #f2f3f5;
					}
				}
			}
		}
	}
}
</style>
