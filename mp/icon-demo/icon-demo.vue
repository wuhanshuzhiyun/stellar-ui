<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="图标"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block" style="justify-content: flex-start">
					<ste-icon code="&#xe6fa;" size="60"></ste-icon>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">图标颜色</view>
				<view class="item-block" style="justify-content: flex-start">
					<ste-icon code="&#xe6fa;" color="#1989fa" size="60" marginRight="30"></ste-icon>
					<ste-icon code="&#xe6fa;" color="#ee0a24" size="60"></ste-icon>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">图标大小</view>
				<view class="item-block" style="justify-content: flex-start">
					<ste-icon code="&#xe6fa;" marginRight="30"></ste-icon>
					<ste-icon code="&#xe6fa;" size="100"></ste-icon>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">图标粗细</view>
				<view class="item-block" style="justify-content: flex-start">
					<ste-icon code="&#xe6fa;" size="60" marginRight="30"></ste-icon>
					<ste-icon code="&#xe6fa;" size="60" weight="bold"></ste-icon>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">图标边距</view>
				<view class="item-block" style="justify-content: flex-start">
					<view>
						<ste-icon code="&#xe6fa;" size="60" marginTop="30"></ste-icon>
						上边距
					</view>
					<view>
						<ste-icon code="&#xe6fa;" size="60" marginRight="30"></ste-icon>
						右边距
					</view>
					<view>
						<ste-icon code="&#xe6fa;" size="60" marginBottom="30"></ste-icon>
						下边距
					</view>
					<view>
						<ste-icon code="&#xe6fa;" size="60" marginLeft="30"></ste-icon>
						左边距
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">内嵌文字</view>
				<view class="item-block" style="justify-content: flex-start">
					<ste-icon code="&#xe6fa;" size="60" text="图标" textColor="#000"></ste-icon>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">内嵌文字颜色</view>
				<view class="item-block" style="justify-content: flex-start">
					<ste-icon code="&#xe6fa;" size="60" text="图标" textColor="red"></ste-icon>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">内嵌字体大小</view>
				<view class="item-block" style="justify-content: flex-start">
					<ste-icon code="&#xe6fa;" size="60" text="图标" textColor="#000" marginRight="30"></ste-icon>
					<ste-icon code="&#xe6fa;" size="60" text="图标" textColor="#000" textSize="30"></ste-icon>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">内嵌字体粗细</view>
				<view class="item-block" style="justify-content: flex-start">
					<ste-icon code="&#xe6fa;" size="60" text="图标" textColor="#000" marginRight="30"></ste-icon>
					<ste-icon code="&#xe6fa;" size="60" text="图标" textColor="#000" textWeight="bold"></ste-icon>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">图标库</view>
				<view class="item-block">
					<view v-for="item in glyphs" class="icon-item" @click="copy(item.unicode)">
						<view class="icon-content">
							<ste-icon :code="item.unicode" :size="40"></ste-icon>
						</view>
						<view class="icon-name">{{ item.name }}</view>
						<view class="icon-unicode">{{ item.unicode }}</view>
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
			iconUrl:
				'https://at.alicdn.com/t/c/font_4041637_pivqtx3f1mq.json?spm=a313x.manage_type_myprojects.i1.49.f7ba3a81fFvJ6W&file=font_4041637_pivqtx3f1mq.json',
			glyphs: [],
		};
	},
	onReady() {},
	onLoad() {
		uni.request({
			url: this.iconUrl,
			success: (res) => {
				this.glyphs = res.data.glyphs;
				this.glyphs.forEach((item) => {
					item.unicode = '&#x' + item.unicode + ';';
				});
			},
		});
	},
	methods: {
		copy(data) {
			uni.setClipboardData({
				data,
				showToast: false,
				success: function () {
					uni.showToast({
						icon: 'none',
						title: 'code复制到剪切板',
					});
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.item-block {
	display: flex;
	flex-wrap: wrap;
	row-gap: 60rpx;
	justify-content: center;
	align-items: center;

	.icon-item {
		width: 25%;
		.icon-content {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			padding-bottom: 20rpx;
		}

		.icon-name {
			text-align: center;
			overflow: hidden;
			height: 40rpx;
			line-height: 40rpx;
			font-size: 28rpx;
		}
		.icon-unicode {
			font-size: 28rpx;
			text-align: center;
		}
	}
}
</style>
