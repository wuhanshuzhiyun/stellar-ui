<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="输入框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">输入框</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input
							v-model="v"
							:focus.sync="f"
							placeholder="请输入内容"
							:maxlength="10"
							confirmType="next"
							readonly
							class="my-input"
							rootClass="root-my-input"
							border
							background="#a8a"
							borderColor="#e1e"
						></ste-input>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">输入框2222</view>
				<view class="item-block">
					<view style="width: 80%">
						<ste-input
							v-model="v"
							placeholder="请输入内容"
							confirmType="next"
							rootClass="root-my-input"
							shape="line"
						>
							<!-- <text slot="prefix">你好</text> -->
							<view slot="prefix" style="margin-right: 28rpx">
								<ste-icon code="&#xe68c;" size="28" />
								<text>文本</text>
							</view>
							<!-- <text slot="suffix">侯浩</text> -->
						</ste-input>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">输入框2222</view>
				<view class="item-block">
					<view style="width: 85%">
						<!-- <ste-input type="textarea" /> -->
						<ste-input
							placeholder="请输入内容"
							confirmType="next"
							class="my-input"
							rootClass="root-my-input"
							type="textarea"
							:maxlength="300"
							showWordLimit
						></ste-input>
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
		// setTimeout(() => {
		// 	this.v = 'fuyuwei';
		// 	this.f = true;
		// }, 2000);
		// setTimeout(() => {
		// 	console.log('第二次执行');
		// 	this.v = 'fuyuwei';
		// 	this.f = true;
		// }, 5000);
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
