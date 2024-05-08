<template>
	<view class="page">
		<view class="header">
			<text>Stellar UI</text>
		</view>
		<view class="scroll-box">
			<view class="top">
				<view class="top-1">
					<ste-image
						:src="joinSrc('https://image.whzb.com/chain/StellarUI/logo.png')"
						:width="100"
						:height="100"
						style="margin-right: 10rpx"
					/>
					<view class="title">
						<view class="title-1">Stellar UI {{ version }}</view>
						<view class="title-2">微信平台快速开发的UI框架</view>
					</view>
				</view>
				<view class="top-2">
					<text>Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。</text>
				</view>
			</view>
			<!-- ***基础组件*** -->
			<view class="group-title">基础组件</view>
			<view class="com-box" @click="nav('badge')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/badge.png')" :width="36" :height="36" />
					<text>Badge 徽标</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('button')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/button.png')" :width="36" :height="36" />
					<text>Button 按钮</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('icon')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/icon.png')" :width="36" :height="36" />
					<text>Icon 图标</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('image')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/image.png')" :width="36" :height="36" />
					<text>Image 图片</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('popup')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/popup.png')" :width="36" :height="36" />
					<text>Popup 弹出层</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('text')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/text.png')" :width="36" :height="36" />
					<text>Text 文本</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>

			<!-- ***表单组件*** -->
			<view class="group-title">表单组件</view>
			<view class="com-box" @click="nav('checkbox')">
				<view class="com-title">
					<ste-image
						style="margin-right: 10rpx"
						:src="joinSrc('img/checkbox.png')"
						:width="36"
						:height="36"
					/>
					<text>Checkbox 复选框</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('input')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/input.png')" :width="36" :height="36" />
					<text>Input 输入框</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('radio')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/radio.png')" :width="36" :height="36" />
					<text>Radio 单选框</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('rate')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/rate.png')" :width="36" :height="36" />
					<text>Rate 评分</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('rich-text')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/parse.png')" :width="36" :height="36" />
					<text>RichText 富文本</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('search')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/search.png')" :width="36" :height="36" />
					<text>Search 搜索</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('slider')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/slider.png')" :width="36" :height="36" />
					<text>Slider 滑块</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('stepper')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/stepper.png')" :width="36" :height="36" />
					<text>Stepper 步进器</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('switch')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/switch.png')" :width="36" :height="36" />
					<text>Switch 开关</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('upload')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/upload.png')" :width="36" :height="36" />
					<text>Upload 上传</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<!-- ***展示组件*** -->
			<view class="group-title">展示组件</view>
			<view class="com-box" @click="nav('loading')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/loading.png')" :width="36" :height="36" />
					<text>Loading 加载动画</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('media-preview')">
				<view class="com-title">
					<ste-image
						style="margin-right: 10rpx"
						:src="joinSrc('img/mediaPreview.png')"
						:width="36"
						:height="36"
					/>
					<text>MediaPreview 媒体预览</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('notice-bar')">
				<view class="com-title">
					<ste-image
						style="margin-right: 10rpx"
						:src="joinSrc('img/noticeBar.png')"
						:width="36"
						:height="36"
					/>
					<text>NoticeBar 公告栏</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<!-- ***电商组件*** -->
			<view class="group-title">电商组件</view>
			<view class="com-box" @click="nav('price')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/price.png')" :width="36" :height="36" />
					<text>Price 价格</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<!-- ***数据组件*** -->
			<view class="group-title">数据组件</view>
			<view class="com-box" @click="nav('progress')">
				<view class="com-title">
					<ste-image
						style="margin-right: 10rpx"
						:src="joinSrc('img/progress.png')"
						:width="36"
						:height="36"
					/>
					<text>Progress 进度条</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<!-- ***导航组件*** -->
			<view class="group-title">导航组件</view>
			<view class="com-box" @click="nav('dropdown-menu')">
				<view class="com-title">
					<ste-image
						style="margin-right: 10rpx"
						:src="joinSrc('img/dropdown.png')"
						:width="36"
						:height="36"
					/>
					<text>DropdownMenu 下拉菜单</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('scroll-to')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/tabbar.png')" :width="36" :height="36" />
					<text>ScrollTo 滚动锚点</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('tabs')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/tabs.png')" :width="36" :height="36" />
					<text>Tabs 标签页</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('touch-swipe')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/countTo.png')" :width="36" :height="36" />
					<text>TouchSwipe 手势切屏</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
			<view class="com-box" @click="nav('swiper')">
				<view class="com-title">
					<ste-image style="margin-right: 10rpx" :src="joinSrc('img/countTo.png')" :width="36" :height="36" />
					<text>Swipe 轮播组件</text>
				</view>
				<view class="com-arrow">
					<ste-image :src="joinSrc('img/r-arrow.png')" :width="32" :height="32" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import utils from '@/common/utils';
import config from '@/uni_modules/stellar-ui/package.json';
export default {
	data() {
		return {
			version: config.version ?? '',
		};
	},
	created() {},
	methods: {
		joinSrc: utils.joinSrc, // 拼接图片src地址
		nav(routerName) {
			const path = '/mp/' + routerName + '-demo/' + routerName + '-demo';
			uni.navigateTo({
				url: path,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	padding: 120rpx 20px 42px;
	padding-top: 0;
	padding-bottom: 0;
	height: initial;

	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow-y: hidden;
}

.header {
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 40rpx;
}

.scroll-box {
	padding-top: 80rpx;
	flex: 1;
	overflow-y: auto;
}

.top {
	padding-bottom: 28rpx;
	.top-1 {
		display: flex;
		image {
			margin-right: 28rpx;
		}

		.title {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.title-1 {
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 10rpx;
		}
		.title-2 {
			color: #909193;
			font-size: 28rpx;
		}
	}

	.top-2 {
		margin-top: 28rpx;
		color: #606266;
		font-size: 28rpx;
	}
}
.group-title {
	padding: 32rpx 0;
	padding-bottom: 8rpx;
	border-bottom: 1px solid #eee;
	font-weight: bold;
}
.com-box {
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #eee;
	padding: 20rpx 0;
	.com-title {
		flex: 1;

		font-size: 28rpx;
		display: flex;
		align-items: center;
		image {
			margin-right: 12rpx;
			width: 18px;
			height: 18px;
		}
		line-height: 100%;
	}
	.com-arrow {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
