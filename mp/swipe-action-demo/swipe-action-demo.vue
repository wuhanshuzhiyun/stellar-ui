<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="滑动单元格"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-swipe-action>
						<template v-slot:left>
							<button size="mini">左侧按钮</button>
						</template>
						<template>
							<view class="content-view">内容区域</view>
						</template>
						<template v-slot:right>
							<button size="mini">右侧按钮</button>
						</template>
					</ste-swipe-action>
				</view>
			</view>
		</view>
	</view>
</template>

<script></script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				display: block;
				.content-view {
				}
			}
		}
	}
}
</style>
