<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="时间选择"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view>
						<ste-datetime @change="change" title="基础使用"></ste-datetime>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">格式化</view>
				<view class="item-block">
					<view>
						<ste-datetime :formatter="formatter" mode="date" title="格式化"></ste-datetime>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">时间类型</view>
				<view class="item-block">
					<view>
						<ste-datetime title="年月日时分" mode="datetime"></ste-datetime>
					</view>
					<view>
						<ste-datetime title="年月日" mode="date"></ste-datetime>
					</view>
					<view>
						<ste-datetime title="年月" mode="year-month"></ste-datetime>
					</view>
					<view>
						<ste-datetime title="月日" mode="month-day"></ste-datetime>
					</view>
					<view>
						<ste-datetime title="时分秒" mode="time"></ste-datetime>
					</view>
					<view>
						<ste-datetime title="时分" mode="hour-minute"></ste-datetime>
					</view>
					<view>
						<ste-datetime title="分秒" mode="minute-second"></ste-datetime>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {};
	},
	created() {},
	methods: {
		change(e) {
			// console.log('datetime change', e)
		},
		formatter(type, value) {
			if (type === 'year') {
				return `${value}年`;
			}
			if (type === 'month') {
				return `${value}月`;
			}
			if (type === 'day') {
				return `${value}日`;
			}
			return value;
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	background-color: #f7f8fa;
	.content {
		.demo-item {
			.item-block {
				> view {
					width: 100%;
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
