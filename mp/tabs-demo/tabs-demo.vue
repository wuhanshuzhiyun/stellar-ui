<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-tabs>
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
					<ste-tabs>
						<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">固定tab宽度</view>
				<view class="item-block">
					<ste-tabs tabWidth="180">
						<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">吸顶</view>
				<view class="item-block">
					<ste-tabs sticky>
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">卡片模式</view>
				<view class="item-block">
					<ste-tabs type="card">
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">卡片模式带边框</view>
				<view class="item-block">
					<ste-tabs type="card" border>
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">分割线</view>
				<view class="item-block">
					<ste-tabs showGapLine>
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">设置间距</view>
				<view class="item-block">
					<ste-tabs type="card" tabSpace="12">
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">显示图片</view>
				<view class="item-block">
					<ste-tabs showImage>
						<ste-tab
							v-for="(item, index) in list1"
							:key="index"
							:title="item.title"
							:image="item.image"
							:index="index"
						>
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">子标题和滑块大小</view>
				<view class="item-block">
					<ste-tabs showSubtitle lineWidth="120" lineHeight="30">
						<ste-tab
							v-for="(item, index) in list1"
							:key="index"
							:title="item.title"
							subTitle="子标签"
							:index="index"
						>
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">文本超长省略</view>
				<view class="item-block">
					<ste-tabs ellipsis>
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">手势滑动切换</view>
				<view class="item-block">
					<ste-tabs swipeable>
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">下拉选项和自定义颜色</view>
				<view class="item-block">
					<ste-tabs pullDown color="#f0f" background="#ff9" activeTabColor="#00f" tabColor="#666">
						<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
					<ste-tabs pullDown placeholder="你倒是选一个啊">
						<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">锁定（无法切换）</view>
				<view class="item-block">
					<ste-tabs lock>
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">禁用</view>
				<view class="item-block">
					<ste-tabs disabled>
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="item-block">
					<ste-tabs>
						<ste-tab
							v-for="(item, index) in list1"
							:disabled="index === 1"
							:key="index"
							:title="item.title"
							:index="index"
						>
							<h1>==Start {{ item.title }}==</h1>
							<h1>内容{{ item.title }}</h1>
							<h1>==End {{ item.title }}==</h1>
						</ste-tab>
					</ste-tabs>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			list1: [
				{ title: '标签1', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签2', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签标签标签标签3', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签4', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
			],
			active: 1,
		};
	},
	computed: {
		list2() {
			return [].concat(this.list1, [
				{ title: '标签5', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签6', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签7', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
				{ title: '标签8', image: `https://image.whzb.com/chain/StellarUI/图片.jpg` },
			]);
		},
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				display: block;
				margin-bottom: 12rpx;
			}
		}
	}
}
</style>
