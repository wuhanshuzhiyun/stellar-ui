<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-search @input="onInput" @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search v-model="value" @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search placeholder="搜索商品" @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search disabled />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">热词列表</view>
				<view class="item-block">
					<ste-search :hotWords="hotWords" @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search :hotWords="hotWords" :interval="1000" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义按钮文字</view>
				<view class="item-block">
					<ste-search btnText="查询" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">隐藏分割线以及按钮</view>
				<view class="item-block">
					<ste-search hiddenLine @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search hiddenBtn @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">隐藏输入框以及按钮</view>
				<view class="item-block" style="width: 60rpx">
					<ste-search hiddenInput hiddenBtn @click="onClick" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">不显示清除图标</view>
				<view class="item-block">
					<ste-search :clearable="false" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义颜色</view>
				<view class="item-block">
					<ste-search
						placeholder="搜索商品"
						borderColor="#F00"
						background="#000"
						prefixIconColor="#a55"
						placeholderColor="#a55"
						inputTextColor="#fff"
						clearIconColor="#a55"
						btnBackground="#fff"
						btnTextColor="#000"
						@search="onSearch"
					/>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义高度以及圆角弧度</view>
				<view class="item-block">
					<ste-search :height="120" :radius="60" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">导航模式</view>
				<view class="item-block">
					<ste-search type="nav" @click="onClick" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			value: 'RTX4060Ti',
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
	.content {
		.demo-item {
			.item-block {
				display: block;
				margin-bottom: 12rpx;
				& > .ste-search {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
