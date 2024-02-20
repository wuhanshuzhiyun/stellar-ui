<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="按钮"></page-nav>
		<view class="wrapper">
			<view class="demo-block">
				<view class="title">按钮类型</view>
				<view class="block-content">
					<ste-button mode="middle">默认按钮</ste-button>
					<ste-button type="line" mode="middle">线性按钮</ste-button>
					<ste-button type="disabled" mode="middle">禁止按钮</ste-button>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">自定义颜色</view>
				<view class="block-content">
					<ste-button mode="small" backgroundColor="#FF1E19">领取</ste-button>
					<ste-button type="line" mode="small" backgroundColor="#FF1E19">领取</ste-button>

					<ste-button mode="small" color="#000000">已领完</ste-button>
					<ste-button type="line" mode="small" color="#000000">已领完</ste-button>

					<ste-button
						mode="small"
						backgroundColor="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
					>
						渐变
					</ste-button>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">自定义大小</view>
				<view class="block-content">
					<ste-button mode="large">超大型按钮</ste-button>
					<ste-button mode="middle">中型按钮</ste-button>
					<ste-button mode="small">常规按钮</ste-button>
					<ste-button mode="mini">小型按钮</ste-button>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">自适应宽度</view>
				<view class="block-content" style="display: block">
					<ste-button mode="middle" :auto="true">按钮</ste-button>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">文字超长</view>
				<view class="block-content" style="display: block; width: 50%">
					<ste-button mode="middle" :auto="true">
						提交-按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮
					</ste-button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import steButton from '@/uni_modules/stellar-ui/components/ste-button/ste-button.vue';

export default {
	components: {
		steButton,
	},
	data() {
		return {};
	},
	onLoad() {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.wrapper {
		padding: 16rpx;

		.demo-block {
			margin-bottom: 16rpx;

			.title {
				font-size: 30rpx;
				color: #8f9ca2;
				margin-bottom: 8rpx;
			}

			.block-content {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;

				> * {
					margin: 0 16rpx 16rpx 0;
				}
			}
		}
	}
}
</style>
