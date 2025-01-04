<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="主题色"></page-nav>
		<view class="content">
			<ste-sticky>
				<view class="demo-item">
					<view class="title">主题色</view>
					<view class="item-block" style="display: flex; align-items: center; padding-bottom: 20px">
						<span>{{ color }}：</span>
						<colorPicker v-model="color" @change="headleChangeColor" :defaultColor="defaultColor" />
						<ste-button :style="{ marginLeft: '20rpx' }" @click="reset">还原主题色</ste-button>
					</view>
				</view>
			</ste-sticky>
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
			<view class="demo-item">
				<view class="title">复选框</view>
				<view class="item-block">
					<ste-checkbox v-model="checkboxValue">复选框</ste-checkbox>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">时间选择器</view>
				<view class="item-block" style="display: block">
					<ste-date-picker :value="datetime"></ste-date-picker>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">评分</view>
				<view class="item-block">
					<ste-rate v-model="rateValue"></ste-rate>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">下拉</view>
				<view class="item-block">
					<ste-select :list="list" v-model="selectValue"></ste-select>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">滑块</view>
				<view class="item-block">
					<ste-slider value="30"></ste-slider>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">步进器</view>
				<view class="item-block">
					<ste-stepper v-model="value1"></ste-stepper>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">开关</view>
				<view class="item-block">
					<ste-switch v-model="value2"></ste-switch>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">弹框</view>
				<view class="item-block">
					<ste-button @click="msgBox">打开弹框</ste-button>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">数字键盘</view>
				<view class="item-block" style="display: block">
					<ste-number-keyboard mode="page" v-model="value3" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">步骤条</view>
				<view class="item-block">
					<ste-steps :active="active">
						<ste-step></ste-step>
						<ste-step></ste-step>
						<ste-step></ste-step>
					</ste-steps>
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
			checkboxValue: true,
			datetime: '',
			radioValue: 'a',
			rateValue: 1,
			selectValue: 2011,
			list: [
				{ label: '选项2011', value: 2011 },
				{ label: '选项2012', value: 2012 },
				{ label: '选项2013', value: 2013 },
				{ label: '选项2014', value: 2014 },
				{ label: '选项2015', value: 2015 },
				{ label: '选项2016', value: 2016 },
				{ label: '选项2017', value: 2017 },
				{ label: '选项2018', value: 2018 },
				{ label: '选项2019', value: 2019 },
			],
			value1: 10,
			value2: true,
			value3: '',
			active: 0,
		};
	},
	methods: {
		headleChangeColor() {
			color.setColor({ steThemeColor: this.color });
		},
		reset() {
			this.color = color.$state.defaultColor;
			color.setColor({ steThemeColor: this.color });
		},
		msgBox() {
			this.showMsgBox({
				title: '提示',
				icon: 'info',
			});
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
