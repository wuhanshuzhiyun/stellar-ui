<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="输入框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">文本输入框</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input value="输入" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">密码输入框</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input type="password" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">数字输入框</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input type="number" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">占位符</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input placeholder="请输入" placeholderClass="my-input-holder" />
					</view>
					<view style="width: 100%">
						<ste-input placeholder="请输入" placeholderStyle="color: #f00" />
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
				<view class="title">焦点</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-input :focus.sync="inputFocus" />
					</view>
					<view style="width: 100%; text-align: center; font-size: 28rpx">
						<ste-text>{{ inputFocus ? '获取焦点' : '失去焦点' }}</ste-text>
					</view>
					<view style="width: 100%; text-align: center">
						<ste-button :mode="100" style="margin-right: 50rpx" @click="focus">获取焦点</ste-button>
						<ste-button :mode="100" @click="blur">失去焦点</ste-button>
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
				<view class="title">前后插槽</view>
				<view class="item-block">
					<view style="width: 80%">
						<ste-input placeholder="请输入内容" confirmType="next" rootClass="root-my-input" shape="line">
							<view slot="prefix" style="margin-right: 28rpx">
								<ste-icon code="&#xe68c;" size="28" />
								<text>文本</text>
							</view>
							<view slot="suffix">
								<ste-icon code="&#xe672;" size="28" />
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
			inputFocus: false,
		};
	},
	created() {},
	methods: {
		blur() {
			this.inputFocus = false;
		},
		focus() {
			setTimeout(() => {
				this.inputFocus = true;
			}, 200);
		},
	},
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

					// /deep/ .root-my-input {

					// }

					// /deep/ .my-input-holder {
					// 	color: pink !important;
					// }
				}
			}
		}
	}
}
</style>
