<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
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
			node1: '<p><img style="width:100%;height:auto" src="https://img13.360buyimg.com/n7/jfs/t1/64765/4/22300/205893/635216d7Eca42b0cc/8254ba5915d642fd.jpg"/></p>',
			node2: '<p><img style="width:100%;height:auto" src="https://img13.360buyimg.com/n7/jfs/t1/64765/4/22300/205893/635216d7Eca42b0cc/8254ba5915d642fd.jpg"/></p><p><img style="width:100%;height:auto" src="https://img14.360buyimg.com/n7/jfs/t1/130149/29/26170/238264/62458d22E3751ba2a/9c46c354c60ae0c9.jpg.avif"/></p>',
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
