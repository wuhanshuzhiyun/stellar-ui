<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="图标"></page-nav>
		<view class="icon-box">
			<view v-for="item in glyphs" class="icon-item">
				<view class="icon-content">
					<ste-icon :code="item.unicode" :size="40"></ste-icon>
				</view>
				<view class="icon-name">{{ item.name }}</view>
				<view class="icon-unicode">{{ item.unicode }}</view>
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
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	padding-bottom: 40rpx;
}
.icon-box {
	display: flex;
	flex-wrap: wrap;
	row-gap: 60rpx;
	justify-content: center;
	align-items: center;
}
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
		text-align: center;
	}
}
</style>
