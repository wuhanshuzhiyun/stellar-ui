<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
		<view class="wrapper">
			<view class="demo-block">
				<view class="title">基础功能</view>
				<view class="block-content">
					<ste-search v-model="value1" :show-action="false" @change="change"></ste-search>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">设置初始值</view>
				<view class="block-content">
					<ste-search v-model="value2" :show-action="false"></ste-search>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">搜索框形状</view>
				<view class="block-content">
					<ste-search v-model="value3" :show-action="false" shape="round"></ste-search>
					<ste-search v-model="value4" :show-action="false" shape="square" :margin="margin"></ste-search>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">右侧控件</view>
				<view class="block-content">
					<ste-search v-model="value5" @custom="customClick"></ste-search>
				</view>
			</view>
			<view class="demo-block">
				<view class="title">禁用输入框</view>
				<view class="block-content">
					<ste-search
						placeholder="输入框被禁用,可以监听点击事件进行跳转"
						disabled
						:show-action="false"
						@click="click"
					></ste-search>
				</view>
			</view>
			<!-- 			<view class="demo-block">
				<view class="title">点击左侧图标</view>
				<view class="block-content">
					<ste-search v-model="value6" :show-action="false" @clickIcon="clickIcon"></ste-search>
				</view>
			</view> -->
			<!-- <view class="demo-block">
				<view class="title">搜索框内容水平对齐</view>
				<view class="block-content">
					<ste-search v-model="value7" :show-action="false" input-align="left"></ste-search>
					<ste-search
						v-model="value8"
						:show-action="false"
						input-align="center"
						:margin="margin"
					></ste-search>
					<ste-search v-model="value9" :show-action="false" input-align="right" :margin="margin"></ste-search>
				</view>
			</view> -->
			<view class="demo-block">
				<view class="title">自定义</view>
				<view class="block-content">
					<ste-search
						v-model="value10"
						:show-action="false"
						borderColor="rgb(230, 230, 230)"
						bgColor="#fff"
					></ste-search>
					<!-- 					<ste-search
						v-model="value11"
						:show-action="false"
						search-icon-color="#FF0000"
						:margin="margin"
					></ste-search> -->

					<!-- 					<ste-search
						v-model="value12"
						:show-action="false"
						placeholder-color="#FF0000"
						:margin="margin"
					></ste-search> -->

					<!-- <ste-search v-model="value13" :show-action="false" color="#FF0000" :margin="margin"></ste-search> -->

					<!-- 					<ste-search
						v-model="value14"
						label="你好11"
						searchIcon="&#xe6d3;"
						:show-action="false"
						:margin="margin"
					>
						<template v-slot:label>
							<text>你好</text>
						</template>
					</ste-search> -->
					<!-- <ste-search v-model="value15" search-icon="scan" :show-action="false" :margin="margin"></ste-search> -->
				</view>
			</view>

			<!-- view class="demo-block">
				<view class="title">热词列表</view>
				<view class="block-content">
					<ste-search :hot-words="hotWords" @search="onSearch" />
				</view>
			</view>
			<view class="demo-block">
				<view class="title">导航</view>
				<view class="block-content">
					<ste-search :style-type="2" @nav-address="onNavAddress" />
				</view>
			</view> -->
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			keyword: '一夜暴富',
			hotWords: ['中百集团', '数智云科技', '一夜暴富'],

			value1: '',
			value2: '卫生纸',
			value3: '',
			value4: '',
			value5: '',
			value6: '',
			value7: '',
			value8: '',
			value9: '',
			value10: '',
			value11: '',
			value12: '',
			value13: '',
			value14: '',
			value15: '',

			margin: '10px 0 0 0',
		};
	},
	onLoad() {},
	methods: {
		onSearch(v) {
			uni.showToast({
				icon: 'none',
				title: `搜索：${v}`,
			});
		},
		onNavAddress() {
			uni.showToast({
				icon: 'none',
				title: '触发导航',
			});
		},
		click() {
			uni.showToast({
				icon: 'none',
				title: '点击搜索栏',
			});
		},
		change(e) {
			uni.showToast({
				icon: 'none',
				title: '输入值改变',
			});
		},
		clearClick() {
			uni.showToast({
				icon: 'none',
				title: '清空输入',
			});
		},
		customClick() {
			uni.showToast({
				icon: 'none',
				title: '点击右侧控件',
			});
		},
		clickIcon() {
			uni.showToast({
				icon: 'none',
				title: '点击左侧图标',
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.wrapper {
		.demo-block {
			.block-content {
				display: block;
				> .ste-search {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>