<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="手势切屏"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">TouchSwipe 手势切屏</view>
				<view class="cmp-desc">手势切屏组件，支持水平手势切换和垂直手势切换。</view>
			</view>
			<view class="demo-item">
				<view class="title">水平切换-固定宽度</view>
				<view class="item-block">
					<view class="buttons">
						<button size="mini" @click="hUp">上一页</button>
						<text>{{ hIndex + 1 }}/{{ imgs.length }}</text>
						<button size="mini" @click="hNext">下一页</button>
					</view>
					<ste-touch-swipe width="690" :index.sync="hIndex">
						<ste-touch-swipe-item v-for="(img, index) in imgs" :key="index">
							<image :src="img" mode="widthFix" style="width: 100%" />
						</ste-touch-swipe-item>
					</ste-touch-swipe>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">垂直切换-固定高度</view>
				<view class="item-block">
					<view class="buttons">
						<button size="mini" @click="vUp">上一页</button>
						<text>{{ vIndex + 1 }}/{{ imgs.length }}</text>
						<button size="mini" @click="vNext">下一页</button>
					</view>
					<ste-touch-swipe height="600" direction="vertical" :index.sync="vIndex">
						<ste-touch-swipe-item v-for="(img, index) in imgs" :key="index">
							<image :src="img" mode="heightFix" style="height: 100%" />
						</ste-touch-swipe-item>
					</ste-touch-swipe>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			hIndex: 3,
			vIndex: 0,
			imgs: [
				'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
				'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
				'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
				'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
			],
		};
	},
	methods: {
		hUp() {
			if (this.hIndex === 0) return;
			this.hIndex -= 1;
		},
		hNext() {
			if (this.hIndex === this.imgs.length - 1) return;
			this.hIndex += 1;
		},
		vUp() {
			if (this.vIndex === 0) return;
			this.vIndex -= 1;
		},
		vNext() {
			if (this.vIndex === this.imgs.length - 1) return;
			this.vIndex += 1;
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				display: block;
				margin-bottom: 12rpx;
				.buttons {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 12rpx;
					text {
						margin: 0 12rpx;
					}
				}
			}
		}
	}
}
</style>
