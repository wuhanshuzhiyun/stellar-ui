<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="主题色"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">主题色</view>
				<view class="item-block">
					<span>{{ color }}：</span>
					<colorPicker v-model="color" @change="headleChangeColor" :defaultColor="defaultColor" />
					<ste-button :style="{ marginLeft: '20rpx' }" @click="reset">还原主题色</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">按钮</view>
				<view class="item-block">
					<ste-button>按钮</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">日历</view>
				<view class="item-block">
					<ste-calendar height="720" :showTitle="false" @confirm="handleConfirm" ref="Calendar" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { onMounted } from 'vue';
import useColor from '@/uni_modules/stellar-ui/config/color.js';
let color = useColor();
export default {
	data() {
		return {
			color: '',
			defaultColor: '',
		};
	},
	methods: {
		headleChangeColor() {
			console.log('color', this.color);
			color.setColor({ steThemeColor: this.color });
		},
		reset() {
			this.color = color.$state.defaultColor;
			color.setColor({ steThemeColor: this.color });
		},
	},
	mounted() {
		this.color = color.getColor().steThemeColor;
		this.defaultColor = color.$state.defaultColor;
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				> view {
					margin: 0 16rpx 16rpx 0;
				}
			}
		}
	}
}
</style>
