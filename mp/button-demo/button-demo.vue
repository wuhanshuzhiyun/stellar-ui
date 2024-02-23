<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="按钮"></page-nav>
		<view class="wrapper">
			<view class="demo-block">
				<view class="title">按钮类型</view>
				<view class="block-content">
					<view>
						<ste-button @click="handleClick('默认按钮')">默认按钮</ste-button>
					</view>
					<view>
						<ste-button type="success" @click="handleClick('成功按钮')">成功按钮</ste-button>
					</view>

					<view>
						<ste-button type="error" @click="handleClick('危险按钮')">危险按钮</ste-button>
					</view>

					<view>
						<ste-button type="primary" @click="handleClick('主要按钮')">主要按钮</ste-button>
					</view>

					<view>
						<ste-button type="warning" @click="handleClick('警告按钮')">警告按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">镂空按钮</view>
				<view class="block-content">
					<view>
						<ste-button plain @click="handleClick('镂空按钮')">镂空按钮</ste-button>
					</view>
					<view>
						<ste-button type="success" plain @click="handleClick('镂空按钮')">镂空按钮</ste-button>
					</view>
					<view>
						<ste-button type="error" plain @click="handleClick('镂空按钮')">镂空按钮</ste-button>
					</view>
					<view>
						<ste-button type="primary" plain @click="handleClick('镂空按钮')">镂空按钮</ste-button>
					</view>
					<view>
						<ste-button type="warning" plain @click="handleClick('镂空按钮')">镂空按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">禁用按钮</view>
				<view class="block-content">
					<view>
						<ste-button plain disabled>禁用按钮</ste-button>
					</view>
					<view>
						<ste-button type="success" disabled>禁用按钮</ste-button>
					</view>
					<view>
						<ste-button type="error" disabled>禁用按钮</ste-button>
					</view>
					<view>
						<ste-button type="primary" disabled>禁用按钮</ste-button>
					</view>
					<view>
						<ste-button type="warning" disabled>禁用按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">按钮形状 & 按钮图标</view>
				<view class="block-content">
					<view>
						<ste-button type="warning" plain shape="circle" @click="handleClick('按钮图标')">
							<ste-icon code="&#xe63b;" color="#f9ae3d" />
							<text style="margin-left: 8px">按钮图标</text>
						</ste-button>
					</view>
					<view>
						<ste-button type="success" plain shape="circle" @click="handleClick('按钮形状')">
							按钮形状
						</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">自定义颜色</view>
				<view class="block-content">
					<view>
						<ste-button
							color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
							@click="handleClick('渐变色按钮')"
						>
							渐变色按钮
						</ste-button>
					</view>
					<view>
						<ste-button
							color="linear-gradient(to right, rgb(220, 194, 11), rgb(4, 151, 99))"
							@click="handleClick('渐变色按钮')"
						>
							渐变色按钮
						</ste-button>
					</view>

					<view>
						<ste-button color="rgb(10, 185, 156)" @click="handleClick('青绿色按钮')">青绿色按钮</ste-button>
					</view>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">自定义大小</view>
				<view class="block-content">
					<view style="width: 100%">
						<ste-button type="success" size="large" @click="handleClick('超大尺寸')">超大尺寸</ste-button>
					</view>
					<view>
						<ste-button type="error" size="normal" @click="handleClick('普通尺寸')">普通尺寸</ste-button>
					</view>
					<view>
						<ste-button type="primary" size="small" @click="handleClick('小型尺寸')">小型尺寸</ste-button>
					</view>
					<view>
						<ste-button type="warning" size="mini" @click="handleClick('超小尺寸')">超小尺寸</ste-button>
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
	onLoad() {},
	methods: {
		handleClick(v) {
			console.log('demo 点击按钮');
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
		.demo-block {
			.block-content {
				> view {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
