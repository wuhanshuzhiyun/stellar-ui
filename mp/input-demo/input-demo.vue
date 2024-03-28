<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="输入框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">常规输入框</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input />
					</view>

					<!-- <view style="width: 100%">
											<ste-input shape="line" />
										</view>
										<view style="width: 100%">
											<ste-input shape="circle" />
										</view> -->
				</view>
			</view>
			<view class="demo-item">
				<view class="title">占位符</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input placeholder="请输入" />
					</view>
					<view style="width: 100%">
						<ste-input placeholder="请输入" placeholderStyle="color: #f00;font-weight: bold" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">禁用&只读</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input disabled value="禁用" />
					</view>
					<view style="width: 100%">
						<ste-input readonly value="只读" />
					</view>
					<view style="width: 100%">
						<ste-input disabled shape="line" value="禁用" />
					</view>
					<view style="width: 100%">
						<ste-input shape="line" readonly value="只读" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">字数统计</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input type="textarea" :maxlength="140" showWordLimit />
					</view>
					<view style="width: 100%">
						<ste-input shape="line" type="textarea" :maxlength="140" showWordLimit />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">对齐方式</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input placeholder="请输入" inputAlign="center" />
					</view>
					<view style="width: 100%">
						<ste-input placeholder="请输入" inputAlign="right" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">输入框字体</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input value="字体大小" fontSize="36" />
					</view>
					<view style="width: 100%">
						<ste-input value="字体颜色" fontColor="#f00" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">输入框形状</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input shape="circle" />
					</view>
					<view style="width: 100%">
						<ste-input shape="line" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">输入框边框</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input border />
					</view>
					<view style="width: 100%">
						<ste-input border borderColor="#f00" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">背景色</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input background="linear-gradient(to right, #aaaaaa, #aaa000)" />
					</view>
					<view style="width: 100%">
						<ste-input background="https://image.whzb.com/chain/StellarUI/背景1.png" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">插槽</view>
				<view class="item-block">
					<view style="width: 80%">
						<ste-input placeholder="请输入内容" confirmType="next" rootClass="root-my-input" shape="line">
							<view slot="prefix" style="margin-right: 28rpx">
								<ste-icon code="&#xe68c;" size="28" />
								<text>文本</text>
							</view>
						</ste-input>
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
			v: '123123',
			f: false,
		};
	},
	created() {
		setTimeout(() => {
			this.v = 'fuyuwei';
			this.f = true;
		}, 2000);
		setTimeout(() => {
			console.log('第二次执行');
			this.v = 'fuyuwei';
			this.f = true;
		}, 5000);
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		background: #fbfbfc;
		.demo-item {
			.item-block {
				> view {
					margin: 0 8px 8px 0;

					// .ste-input-placeholder {
					// 	color: red;
					// 	font-size: 36rpx;
					// }

					// /deep/ .my-input {
					// 	padding: 10rpx;
					// }

					/deep/ .root-my-input {
						// padding: 10rpx;
					}
				}
			}
		}
	}
}
</style>
