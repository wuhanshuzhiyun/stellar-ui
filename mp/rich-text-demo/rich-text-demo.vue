<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="富文本"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">一张图片</view>
				<view class="item-block">
					<ste-rich-text :text="node1"></ste-rich-text>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">两张图片</view>
				<view class="item-block">
					<ste-rich-text :text="node2"></ste-rich-text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			node1: '<p><img style="width:100%;height:auto" src="https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000366/100026961503/FocusFullshop/CkJqZnMvdDEvOTA5NzAvMzQvMzgzMjcvNDQ4ODgvNjVkNjRkYTZGOWYzOTM2ODcvMTZiMzk1N2M5YjI5ZDY5Yy5wbmcSCTMtdHlfMF81NDACOO6LekIWChLntKLlsLzmnInnur_ogLPmnLoQAUITCg_kvJjmg6DkuqvkuI3lgZwQAkIQCgznq4vljbPmiqLotK0QBkIKCgbkvJjpgIkQB1jfnMnQ9AI/cr/s/q.jpg"/></p>',
			node2: '<p><img style="width:100%;height:auto" src="https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000366/100026961503/FocusFullshop/CkJqZnMvdDEvOTA5NzAvMzQvMzgzMjcvNDQ4ODgvNjVkNjRkYTZGOWYzOTM2ODcvMTZiMzk1N2M5YjI5ZDY5Yy5wbmcSCTMtdHlfMF81NDACOO6LekIWChLntKLlsLzmnInnur_ogLPmnLoQAUITCg_kvJjmg6DkuqvkuI3lgZwQAkIQCgznq4vljbPmiqLotK0QBkIKCgbkvJjpgIkQB1jfnMnQ9AI/cr/s/q.jpg"/></p><p><img style="width:100%;height:auto" src="https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000367/2273632/FocusFullshop/CkJqZnMvdDEvOTc3MTkvMjMvMzc2MjYvMzU0NjgvNjVkM2FlYTZGNjYwZTZhZTEvZGYwZTgzYjU2YWE3M2VjMy5wbmcSCTUtdHlfMF81NjACOO-LekIRCg3mrKfkuZBC54mZ6IaPEAFCEwoP5L2g5YC85b6X5oul5pyJEAJCEAoM56uL5Y2z5oqi6LStEAZCCgoG5Yqb6I2QEAdY4OKKAQ/cr/s/q.jpg"/></p>',
		};
	},
	mounted() {},
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
				& > .ste-search {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
