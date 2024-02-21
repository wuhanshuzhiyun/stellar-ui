<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="按钮"></page-nav>
		<view class="wrapper">
			<view class="demo-block">
				<view class="title">按钮类型</view>
				<view class="block-content">
					<ste-button mode="middle" @click="handleClick('默认按钮')">默认按钮</ste-button>
					<ste-button type="line" mode="middle" @click="handleClick('线性按钮')">线性按钮</ste-button>
					<ste-button type="disabled" mode="middle">禁止按钮</ste-button>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">自定义颜色</view>
				<view class="block-content">
					<ste-button mode="small" backgroundColor="#FF1E19" @click="handleClick('领取')">领取</ste-button>
					<ste-button type="line" mode="small" backgroundColor="#FF1E19" @click="handleClick('领取')">
						领取
					</ste-button>

					<ste-button mode="small" color="#000000" @click="handleClick('已领完')">已领完</ste-button>
					<ste-button type="line" mode="small" color="#000000" @click="handleClick('已领完')">
						已领完
					</ste-button>

					<ste-button
						mode="small"
						backgroundColor="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
						@click="handleClick('渐变')"
					>
						渐变
					</ste-button>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">自定义大小</view>
				<view class="block-content">
					<ste-button mode="large" @click="handleClick('超大')">超大型按钮</ste-button>
					<ste-button mode="middle" @click="handleClick('中型')">中型按钮</ste-button>
					<ste-button mode="small" @click="handleClick('常规')">常规按钮</ste-button>
					<ste-button mode="mini" @click="handleClick('小型')">小型按钮</ste-button>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">自适应宽度</view>
				<view class="block-content" style="display: block">
					<ste-button mode="middle" :auto="true" @click="handleClick('自适应')">按钮</ste-button>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">文字超长</view>
				<view class="block-content" style="display: block; width: 50%">
					<ste-button mode="middle" :auto="true" @click="handleClick('文字超长')">
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
	methods: {
		handleClick(v) {
			uni.showToast({
				title: '点击按钮' + ' ' + v,
				icon: 'none',
				duration: 1500,
			});
		},
	},
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
