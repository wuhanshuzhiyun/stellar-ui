<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="文本"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础内容</view>
				<view class="item-block">
					<view>
						<ste-drag>
							<ste-button>拖拽按钮</ste-button>
						</ste-drag>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">固定方向</view>
				<view class="item-block">
					<view>
						<ste-drag direction="x">
							<ste-button>横向固定</ste-button>
						</ste-drag>
					</view>
					<view>
						<ste-drag direction="y">
							<ste-button>竖向固定</ste-button>
						</ste-drag>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">贴边</view>
				<view class="item-block">
					<view>
						<ste-drag attract>
							<ste-button>横向贴边</ste-button>
						</ste-drag>
					</view>
					<view>
						<ste-drag attract attractDirection="y">
							<ste-button>竖向贴边</ste-button>
						</ste-drag>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">边界</view>
				<view class="item-block">
					<view style="width: 300px; height: 150px; border: solid 1px red" class="test111">
						<ste-drag :boundary="{ left: 22, top: 354, right: 108, bottom: 428 }">
							<ste-button>边界</ste-button>
						</ste-drag>
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
	mounted() {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				> view {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
