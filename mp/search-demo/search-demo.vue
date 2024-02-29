<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础功能</view>
				<view class="item-block">
					<ste-search @input="onInput" @search="onSearch" @click="onClick" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			value1: '',
			value2: 'RTX4060Ti',
			hotWords: ['RTX4060', 'RTX4070', 'RTX4080', '小米电视', '华为手机'],
		};
	},
	watch: {
		text(v) {
			console.log('watch', v);
		},
	},
	created() {},
	methods: {
		onInput(v) {
			console.log('input', v);
		},
		onSearch(v) {
			console.log('search', v);
			uni.showToast({
				icon: 'none',
				title: `搜索：${v}`,
			});
		},
		onClick() {
			uni.showToast({
				icon: 'none',
				title: '点击触发',
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.wrapper {
		.demo-item {
			.item-block {
				display: block;
				> .ste-search {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
