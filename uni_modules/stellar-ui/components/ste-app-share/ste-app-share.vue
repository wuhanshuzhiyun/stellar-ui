<template>
	<!-- 分享弹窗 -->
	<view class="ste-share-root" :class="{ open: dataOpen }">
		<view class="content-box" :style="{ opacity: viewPoster ? 1 : 0 }">
			<view class="loading" v-if="loading"></view>
			<canvas id="content-poster" canvas-id="content-poster" />
		</view>
		<view class="footer-box">
			<view class="footer-head">
				<view class="footer-head-item"></view>
				<view>分享到</view>
				<view class="footer-head-item" @click="close">×</view>
			</view>
			<scroll-view class="footer-scroll-view" scroll-x="true">
				<view class="footer-share-list">
					<view class="footer-item" @click="handShare('WXSceneSession')">
						<image class="footer-icon" src="../../static/weixin.png" mode="widthFix"></image>
						<text>微信好友</text>
					</view>
					<view class="footer-item" @click="handShare('WXSceneTimeline')">
						<image class="footer-icon" src="../../static/wxpyq.png" mode="widthFix"></image>
						<text>朋友圈</text>
					</view>
					<view class="footer-item" @click="handShare('WXSceneFavorite')">
						<image class="footer-icon" src="../../static/shoucang.png" mode="widthFix"></image>
						<text>微信收藏</text>
					</view>
				</view>
			</scroll-view>
			<view class="footer-share-list">
				<view class="footer-item" @click="downloadPoster" v-if="viewPoster">
					<image class="footer-icon" src="../../static/haibao.png" mode="widthFix"></image>
					<text>生成海报</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { copyFileToPublicDir, drawPoster } from './draw';
import { share } from './share';

export default {
	name: 'ste-app-share',
	group: '业务组件',
	title: 'AppShare 分享',
	props: {
		open: {
			type: Boolean,
			default: false,
		},
		/** 显示海报 */
		viewPoster: {
			type: Boolean,
			default: true,
		},
		/** 海报参数 */
		poster: {
			type: Object,
			default: () => ({ background: '#ffffff', title: '推荐一个宝贝给你，快来看看吧~', message: '请及时购买，价格具有时效性', qrcode: '' }),
		},
		/** 小程序参数  */
		miniProgram: {
			type: Object,
			default: () => ({ id: '', path: '', type: 0, webUrl: '' }),
		},
		/** 分享数据 */
		data: {
			type: Object,
			default: () => ({ price: '', image: '', name: '', desc: '' }),
		},
	},
	data() {
		return {
			dataOpen: false,
			loading: false,
			ctx: null,
			canvas: null,
		};
	},
	watch: {
		open: {
			handler(val) {
				this.dataOpen = val;
				if (val) {
					this.draw();
				}
			},
			immediate: true,
		},
	},
	mounted() {},
	methods: {
		close() {
			this.dataOpen = false;
			this.$emit('close', false);
		},
		handShare(scene) {
			// #ifndef APP
			uni.showToast({ title: '暂不支持', icon: 'none', duration: 2000 });
			// #endif
			// #ifdef APP
			share(scene, this.miniProgram, this.data);
			// #endif
		},
		draw() {
			if (!this.viewPoster) return;
			this.loading = true;
			if (!this.ctx) {
				this.ctx = uni.createCanvasContext('content-poster', this);
				const query = uni.createSelectorQuery().in(this);
				this.canvas = query
					.select('#content-poster')
					.boundingClientRect((canvas) => {
						this.ctx.width = canvas.width;
						this.ctx.height = canvas.height;

						drawPoster(this.ctx, this.poster, this.data).then(() => {
							this.loading = false;
						});
					})
					.exec();
			} else {
				drawPoster(this.ctx, this.poster, this.data).then(() => {
					this.loading = false;
				});
			}
		},
		downloadPoster() {
			uni.canvasToTempFilePath({
				canvasId: 'content-poster',
				success: ({ tempFilePath }) => {
					uni.saveImageToPhotosAlbum({
						filePath: tempFilePath,
						success: () => {
							uni.showToast({ title: '保存成功', icon: 'success', duration: 2000 });
						},
						fail: (err) => {
							uni.showToast({ title: '保存失败', icon: 'none', duration: 2000 });
						},
					});
				},
			});
		},
	},
};
</script>

<style lang="scss">
.ste-share-root {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
	pointer-events: none;
	transition: all 0.3s;
	&.open {
		opacity: 1;
		pointer-events: auto;
	}
	.content-box {
		position: absolute;
		width: 660rpx;
		height: 1020rpx;
		top: 120rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9;
		border-radius: 12px;
		overflow: hidden;
		#content-poster {
			width: 100%;
			height: 100%;
		}
		.loading {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 10;
			background-color: #fff;
			&::after {
				content: '加载中...';
				position: absolute;
				width: 100%;
				top: calc(50% + 20px);
				font-size: 12px;
				color: #999;
				text-align: center;
				line-height: 40px;
			}
			&::before {
				content: '';
				position: absolute;
				width: 40px;
				height: 40px;
				top: calc(50%);
				left: calc(50%);
				border-radius: 50%;
				border: 4px solid #f3f3f3;
				border-top-color: #999;
				animation: loading 1s infinite linear;
			}
		}
	}
	.footer-box {
		width: 100%;
		background-color: #fff;
		position: absolute;
		bottom: 0;
		z-index: 10;
		border-radius: 15px 15px 0 0;
		overflow: hidden;
		.footer-head {
			width: 100%;
			height: 44px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.footer-head-item {
				font-size: 20px;
				width: 44px;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.footer-scroll-view {
			width: 100%;
			height: 75px;
		}
		.footer-share-list {
			white-space: nowrap;
			padding: 0 15px 15px 15px;
			display: flex;
			align-items: flex-start;

			.footer-item {
				width: 60px;
				height: 60px;
				display: inline-flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 12px;
				line-height: 30px;
				& + .footer-item {
					margin-left: 10px;
				}
				.footer-icon {
					width: 30px;
					height: 30px;
				}
			}
		}
	}
}

@keyframes loading {
	0% {
		transform: translate(-50%, -50%) rotate(0deg);
	}
	100% {
		transform: translate(-50%, -50%) rotate(360deg);
	}
}
</style>
