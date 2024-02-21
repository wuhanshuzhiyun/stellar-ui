<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="按钮"></page-nav>
		<view class="wrapper">
			<view class="demo-block">
				<view class="title">按钮类型</view>
				<view class="block-content">
					<view>
						<ste-button>默认按钮</ste-button>
					</view>
					<view>
						<ste-button :type="'success'">成功按钮</ste-button>
					</view>

					<view>
						<ste-button type="error">危险按钮</ste-button>
					</view>

					<view>
						<ste-button type="primary">主要按钮</ste-button>
					</view>

					<view>
						<ste-button type="warning">警告按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">镂空按钮</view>
				<view class="block-content">
					<view>
						<ste-button :plain="true">镂空按钮</ste-button>
					</view>
					<view>
						<ste-button :type="'success'" :plain="true">镂空按钮</ste-button>
					</view>
					<view>
						<ste-button type="error" :plain="true">镂空按钮</ste-button>
					</view>
					<view>
						<ste-button type="primary" :plain="true">镂空按钮</ste-button>
					</view>
					<view>
						<ste-button type="warning" :plain="true">镂空按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">细边按钮</view>
				<view class="block-content">
					<view>
						<ste-button :plain="true">细边按钮</ste-button>
					</view>
					<view>
						<ste-button :type="'success'" :plain="true" :hairline="true">细边按钮</ste-button>
					</view>
					<view>
						<ste-button type="error" :plain="true" :hairline="true">细边按钮</ste-button>
					</view>
					<view>
						<ste-button type="primary" :plain="true" :hairline="true">细边按钮</ste-button>
					</view>
					<view>
						<ste-button type="warning" :plain="true" :hairline="true">细边按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">禁用按钮</view>
				<view class="block-content">
					<view>
						<ste-button :plain="true" disabled="true">禁用按钮</ste-button>
					</view>
					<view>
						<ste-button :type="'success'" disabled="true">禁用按钮</ste-button>
					</view>
					<view>
						<ste-button type="error" disabled="true">禁用按钮</ste-button>
					</view>
					<view>
						<ste-button type="primary" disabled="true">禁用按钮</ste-button>
					</view>
					<view>
						<ste-button type="warning" disabled="true">禁用按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">按钮形状 & 按钮图标</view>
				<view class="block-content">
					<view>
						<ste-button type="success" :plain="true" shape="circle">按钮形状</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">自定义颜色</view>
				<view class="block-content">
					<view>
						<ste-button color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))">
							渐变色按钮
						</ste-button>
					</view>
					<view>
						<ste-button color="linear-gradient(to right, rgb(220, 194, 11), rgb(4, 151, 99))">
							渐变色按钮
						</ste-button>
					</view>

					<view>
						<ste-button color="rgb(10, 185, 156)">青绿色按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">自定义大小</view>
				<view class="block-content">
					<ste-button type="success" size="large">超大尺寸</ste-button>
					<view><ste-button type="error" size="normal">普通尺寸</ste-button></view>
					<view><ste-button type="primary" size="small">小型尺寸</ste-button></view>
					<view><ste-button type="warning" size="mini">超小尺寸</ste-button></view>
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
