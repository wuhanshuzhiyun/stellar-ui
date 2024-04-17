<template>
	<view class="ste-media-preview-root">
		<view class="media-preview-content">
			
		</view>
		<view class="media-preview-footer">
			<view class="footer-index">1/5</view>
			<view class="footer-close">
				<ste-icon name="close" size="60" code="&#xe6a0;" color="#fff" />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	group: '基础组件',
	title: 'MediaPreview 输入框',
	name: 'ste-media-preview',
	props: {
		show: {
			type: Boolean,
			default: () => false,
		},
		urls: {
			type: Array,
			default: () => [],
		},
		autoplay: {
			type: Number,
			default: () => 0,
		},
		loop: {
			type: Boolean,
			default: () => false,
		},
		index: {
			type: Number,
			default: () => 0,
		},
		showIndex: {
			type: Boolean,
			default: () => true,
		},
		scale: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {};
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.ste-media-preview-root {
	position: fixed;
	width: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100vw;
	height: 100vh;
	background-color: #000;
	color: #fff;
	z-index: 1001;
	.media-preview-content {
		width: 100%;
		height: calc(100% - 120rpx);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.media-preview-footer {
		width: 100%;
		height: 120rpx;
		padding: 0 30rpx 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
	}
}
</style>
