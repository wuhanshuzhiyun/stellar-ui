<template>
	<!-- 分享弹窗 -->
	<view class="ste-share-root" :class="{ open: dataOpen }">
		<canvas id="content-poster" canvas-id="content-poster" />
		<view class="footer-box">
			<view class="footer-head">
				<view class="footer-head-item"></view>
				<view>分享到</view>
				<view class="footer-head-item" @click="close">×</view>
			</view>
			<scroll-view class="footer-scroll-view" scroll-x="true">
				<view class="footer-share-list">
					<view class="footer-item" @click="handShare('weixin')">
						<image class="footer-icon" src="../../static/weixin.png" mode="widthFix"></image>
						<text>微信好友</text>
					</view>
					<view class="footer-item" @click="handShare('wxpyq')">
						<image class="footer-icon" src="../../static/wxpyq.png" mode="widthFix"></image>
						<text>朋友圈</text>
					</view>
				</view>
			</scroll-view>
			<view class="footer-share-list">
				<view class="footer-item" @click="handShare('haibao')">
					<image class="footer-icon" src="../../static/haibao.png" mode="widthFix"></image>
					<text>生成海报</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { drawPoster } from './draw';

export default {
	name: 'ste-share',
	props: {
		open: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: '推荐一个宝贝给你，快来看看吧~',
		},
		message: {
			type: String,
			default: '请及时购买，价格具有时效性',
		},
		data: {
			type: Object,
			default: () => ({
				page: '',
				image: 'https://image.whzb.com/chain/image/1c/1cd2/1cd27514a2516b146e317fa3b538f4f4/6976279890175-1.jpg',
				name: '中百福嘉白干子 200g/份',
				desc: '豆香浓郁|家常百搭',
				qrcode: '123456789',
			}),
		},
	},
	data() {
		return {
			dataOpen: false,
		};
	},
	watch: {
		open: {
			handler(val) {
				this.dataOpen = val;
			},
			immediate: true,
		},
	},
	mounted() {
		const ctx = uni.createCanvasContext('content-poster', this);
		const canvas = uni.createSelectorQuery().in(this).select('#content-poster');
		canvas
			.boundingClientRect((rect) => {
				ctx.width = rect.width;
				ctx.height = rect.height;
				drawPoster(ctx, this.title, this.message, this.data);
			})
			.exec();
	},
	methods: {
		close() {
			this.dataOpen = false;
			this.$emit('close', false);
		},
		handShare(type) {
			this.$emit('share', type);
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
	#content-poster {
		position: absolute;
		width: 660rpx;
		height: 1020rpx;
		top: 120rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9;
		border-radius: 12px;
		overflow: hidden;
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
</style>
