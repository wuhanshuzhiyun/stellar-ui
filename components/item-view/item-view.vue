<template>
	<view class="demo-view-item" :class="{ hidden: !dataOpen }">
		<view class="item-title" @click="onOpen">
			<view class="title-text">{{ title }}</view>
			<view class="title-icon">
				<ste-icon code="&#xe676;" size="20" />
			</view>
		</view>
		<view class="item-content">
			<slot />
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		open: Boolean,
	},
	data() {
		return {
			dataOpen: false,
		};
	},
	watch: {
		open: {
			handler(v) {
				this.dataOpen = v;
			},
			immediate: true,
		},
	},
	methods: {
		onOpen() {
			this.dataOpen = !this.dataOpen;
			this.$emit('change', this.dataOpen);
		},
	},
};
</script>

<style lang="scss" scoped>
.demo-view-item {
	width: 100%;
	margin-bottom: 30rpx;
	.item-title {
		width: 100%;
		height: 60rpx;
		font-size: 28rpx;
		color: #666;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #f5f5f5;
		padding: 0 18rpx;
		.title-icon {
			width: 20rpx;
			height: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: 0.3s;
			transform: rotate(180deg);
		}
	}
	.item-content {
		top: -100%;
		border: 1px solid #ddd;
		padding: 18rpx;
	}
	&.hidden {
		height: 60rpx;
		.title-icon {
			transform: rotate(0);
		}
		.item-content {
			height: 0;
			padding: 0 18rpx;
			overflow: hidden;
		}
	}
}
</style>
