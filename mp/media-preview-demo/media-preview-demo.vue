<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="媒体预览"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">MediaPreview 媒体预览</view>
				<view class="cmp-desc">用于单独预览图片或者视频</view>
			</view>
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-button @click="show = true">基础预览</ste-button>
					<view style="width: 100%">
						<ste-media-preview :urls="medias" :show.sync="show" />
					</view>
				</view>
				<view class="item-block">
					<ste-button @click="show1 = true">自动轮播</ste-button>
					<view style="width: 100%">
						<ste-media-preview :urls="medias" :show.sync="show1" :autoplay="3000" />
					</view>
				</view>
				<view class="item-block">
					<ste-button @click="show2 = true">前后衔接循环播放</ste-button>
					<view style="width: 100%">
						<ste-media-preview :urls="medias" :show.sync="show2" loop />
					</view>
				</view>
				<view class="item-block">
					<ste-button @click="show3 = true">默认展示下标为2的媒体资源</ste-button>
					<view style="width: 100%">
						<ste-media-preview :urls="medias" :show.sync="show3" :index="2" />
					</view>
				</view>
				<view class="item-block">
					<ste-button @click="show4 = true">隐藏左下角索引标签</ste-button>
					<view style="width: 100%">
						<ste-media-preview :urls="medias" :show.sync="show4" :showIndex="false" />
					</view>
				</view>
				<view class="item-block">
					<ste-button @click="show5 = true">双指缩放</ste-button>
					<view style="width: 100%">
						<ste-media-preview :urls="medias" :show.sync="show5" scale />
					</view>
				</view>
				<view class="item-block">
					<ste-button @click="show6 = true">长按触发事件</ste-button>
					<view style="width: 100%">
						<ste-media-preview :urls="medias" :show.sync="show6" @longpress="onLongpress" />
					</view>
				</view>
				<view class="item-block">
					<ste-button @click="show7 = true">关闭前/后事件</ste-button>
					<view style="width: 100%">
						<ste-media-preview :urls="medias" :show.sync="show7" @beforeClose="onBeforeClose" @close="onClose" />
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
				medias: [
					'https://image.whzb.com/chain/StellarUI/image/banner1.png',
					'https://image.whzb.com/chain/StellarUI/验证码背景.png',
					'https://image.whzb.com/chain/StellarUI/bg4.jpg',
					'https://image.whzb.com/chain/StellarUI/image/banner2.png',
					'https://image.whzb.com/chain/StellarUI/bg3.jpg',
				],
				show: false,
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				show6: false,
				show7: false,
			};
		},
		methods: {
			onLongpress(index) {
				uni.showToast({
					title: `长按了第【${index + 1}】个媒体资源`,
					icon: 'none',
				});
			},
			onBeforeClose(stop, next, prevent) {
				stop();
				uni.showModal({
					title: '确定关闭弹窗吗？',
					success({
						cancel,
						confirm
					}) {
						if (confirm) {
							console.log('点了确定');
							next();
						}
						if (cancel) {
							console.log('点了取消');
							prevent();
						}
					},
					fail() {
						prevent();
					},
				});
			},
			onClose() {
				uni.showToast({
					title: '弹窗关闭了',
					icon: 'none',
				});
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
					>view {
						margin: 0 16rpx 16rpx 0;
					}
				}
			}
		}
	}
</style>