<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础功能</view>
				<view class="item-block">
					<ste-search @input="onInput" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">双向绑定</view>
				<view class="item-block">
					<ste-search v-model="value" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">占位符</view>
				<view class="item-block">
					<ste-search placeholder="搜索商品" @input="onInput" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">热词列表</view>

				<view class="item-block">
					<ste-search :hot-words="hotWords" @input="onInput" @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search :hot-words="hotWords" :interval="1000" @input="onInput" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">禁用</view>
				<view class="item-block">
					<ste-search disabled />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">隐藏分割线以及按钮</view>
				<view class="item-block">
					<ste-search hidden-line @input="onInput" @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search hidden-btn @input="onInput" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义按钮文字</view>
				<view class="item-block">
					<ste-search btn-text="查询" @input="onInput" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">隐藏输入框以及按钮</view>
				<view class="item-block">
					<ste-search hidden-input hidden-btn @click="onClick" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">隐藏清除图标</view>
				<view class="item-block">
					<ste-search :clearable="false" @input="onInput" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义颜色</view>
				<view class="item-block">
					<ste-search
						placeholder="搜索商品"
						border-color="#F00"
						background="#000"
						before-icon-color="#a55"
						placeholder-color="#a55"
						input-color="#fff"
						clear-icon-color="#a55"
						btn-bg="#fff"
						btn-text-color="#000"
						@input="onInput"
						@search="onSearch"
					/>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义高度以及圆角弧度</view>
				<view class="item-block">
					<ste-search :height="90" :radius="45" @input="onInput" @search="onSearch" />
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
