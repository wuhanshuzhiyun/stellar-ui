<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="选择框"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">AppShare 分享</view>
				<view class="cmp-desc">APP分享组件。</view>
			</view>
			<view class="type-block">
				<view>01 组件类型</view>
			</view>
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-button @click="headOpen">分享</ste-button>
				<ste-app-share :open="open" @close="open = false" :data="data" :poster="poster" :miniProgram="miniProgram"></ste-app-share>
			</view>
		</view>
	</view>
</template>
<script>
let num = 0;
export default {
	data() {
		return {
			open: false,
			poster: {
				qrcode: 'https://image.whzb.com/chain/StellarUI/头像/邻里购.png',
				background: '#ffffff',
				title: '推荐一个宝贝给你，快来看看吧~',
				message: '请及时购买，价格具有时效性',
			},
			data: {
				price: '100.00',
				image: 'https://image.whzb.com/chain/image/1c/1cd2/1cd27514a2516b146e317fa3b538f4f4/6976279890175-1.jpg',
				name: '中百福嘉白干子 200g/份',
				desc: '豆香浓郁|家常百搭',
			},
			miniProgram: {
				id: 'gh_c9b7b9786694',
				path: 'pages/tabbar/tabbar',
				type: 0,
				webUrl: 'https://image.whzb.com/chain/StellarUI/头像/邻里购.png',
			},
		};
	},
	methods: {
		headOpen() {
			if (num % 2 === 0) {
				this.data.image = 'https://image.whzb.com/chain/image/1c/1cd2/1cd27514a2516b146e317fa3b538f4f4/6976279890175-1.jpg';
			} else {
				this.data.image = 'https://image.whzb.com/chain/StellarUI/image/test.jpg';
			}
			num++;
			this.open = true;
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
			}
		}
	}
}
</style>
