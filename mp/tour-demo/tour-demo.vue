<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="指引"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view id="button" class="button-box">
					<ste-button @click="show = true">基础指引</ste-button>
				</view>

				<ste-tour :show.sync="show" :steps="steps"></ste-tour>
			</view>
			<view class="demo-item">
				<view class="title">位置偏移量</view>
				<view id="button-2" class="button-box">
					<ste-button @click="show2 = true">描述位置偏移</ste-button>
				</view>
				<ste-tour :show.sync="show2" :steps="steps2" :offset="[20, 10]"></ste-tour>
				<br />
				<view
					id="button-6"
					style="
						border: 1px solid #ddd;
						width: 120rpx;
						height: 120rpx;
						line-height: 120rpx;
						border-radius: 60rpx;
						text-align: center;
						margin-left: 60rpx;
					"
					@click="show6 = true"
				>
					异形
				</view>
				<ste-tour :show.sync="show6" :steps="steps6" :offset="[-20, -30]" messageBg="transparent" radius="60">
					<image
						src="https://image.whzb.com/chain/StellarUI/component-icons/tour.png"
						mode="widthFix"
						style="width: 630rpx"
					></image>
				</ste-tour>
			</view>
			<view class="demo-item">
				<view class="title">多步骤，显示标题栏</view>
				<ste-button @click="show3 = true">多步骤带标题</ste-button>
				<view style="display: inline-block; padding: 6rpx 20rpx">
					<view id="step-1" class="button-box">步骤1</view>
					<view id="step-2" class="button-box">步骤2</view>
					<view id="step-3" class="button-box">步骤3</view>
				</view>
				<ste-tour showTitleBar :show.sync="show3" :steps="steps3"></ste-tour>
			</view>
			<view class="demo-item">
				<view class="title">不显示背景蒙层</view>
				<view id="button-4" class="button-box">
					<ste-button @click="show4 = true">不显示背景蒙层</ste-button>
				</view>
				<ste-tour :show.sync="show4" :steps="steps4" :mask="false"></ste-tour>
			</view>
			<view class="demo-item">
				<view class="title">插槽自定义样式</view>
				<view id="button-5" class="button-box">
					<ste-button @click="show5 = true">插槽自定义内容</ste-button>
				</view>
				<ste-tour :show.sync="show5" :steps="steps5">
					<template v-slot="{ item }">
						<view style="padding: 24rpx">
							<image
								src="https://image.whzb.com/chain/StellarUI/image/banner1.png"
								mode="widthFix"
								style="width: 300rpx"
							></image>
							<text style="color: red">{{ item.message }}</text>
						</view>
					</template>
				</ste-tour>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			steps: [{ message: '点这里', target: 'button' }],
			show2: false,
			steps2: [{ message: '点这里', target: 'button-2' }],
			show6: false,
			steps6: [{ message: '点这里', target: 'button-6' }],
			show3: false,
			steps3: [
				{ title: '步骤1', message: '先点这里', target: 'step-1' },
				{ title: '步骤2', message: '再点这里', target: 'step-2' },
				{ title: '步骤3', message: '然后点这里', target: 'step-3' },
			],
			show4: false,
			steps4: [{ message: '点这里', target: 'button-4' }],
			show5: false,
			steps5: [{ message: '看我看我', target: 'button-5' }],
		};
	},
	computed: {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.button-box {
				display: inline-block;
				padding: 20rpx;
			}
		}
	}
}
</style>
