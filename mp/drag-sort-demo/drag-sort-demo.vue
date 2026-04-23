<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="拖拽排序"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">DragSort 拖拽排序</view>
				<view class="cmp-desc">用于列表、宫格等场景的拖拽排序组件</view>
			</view>

			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-drag-sort v-model="basicList" @start="handleStart" @change="handleChange" @end="handleEnd">
						<template v-slot:item="{ item, index }">
							<view class="demo-card-item">{{ index + 1 }}. {{ item.text }}</view>
						</template>
					</ste-drag-sort>
				</view>
			</view>

			<view class="demo-item">
				<view class="title">网格排序</view>
				<view class="item-block">
					<ste-drag-sort v-model="gridList" :columns="3" :longPress="false">
						<template v-slot:item="{ item }">
							<view class="grid-item">{{ item.text }}</view>
						</template>
					</ste-drag-sort>
				</view>
			</view>

			<view class="demo-item">
				<view class="title">禁用单项拖拽</view>
				<view class="item-block">
					<ste-drag-sort v-model="disabledList">
						<template v-slot:item="{ item }">
							<view class="demo-card-item" :style="{ opacity: item.disabled ? 0.5 : 1 }">
								{{ item.text }}
								<text v-if="item.disabled" style="color: #999; font-size: 24rpx; margin-left: 16rpx">(固定)</text>
							</view>
						</template>
					</ste-drag-sort>
				</view>
			</view>

			<view class="demo-item">
				<view class="title">禁用整个组件</view>
				<view class="item-block">
					<ste-drag-sort v-model="disabledAllList" :disabled="true">
						<template v-slot:item="{ item, index }">
							<view class="demo-card-item">{{ index + 1 }}. {{ item.text }}</view>
						</template>
					</ste-drag-sort>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			basicList: [{ text: '商品 A' }, { text: '商品 B' }, { text: '商品 C' }, { text: '商品 D' }],
			gridList: [{ text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' }, { text: '6' }, { text: '7' }, { text: '8' }, { text: '9' }],
			disabledList: [{ text: '固定在这里', disabled: true }, { text: '可拖拽 1' }, { text: '可拖拽 2' }, { text: '可拖拽 3' }],
			disabledAllList: [{ text: '项目 1' }, { text: '项目 2' }, { text: '项目 3' }],
		};
	},
	methods: {
		handleStart(index) {
			console.log('开始拖拽，索引:', index);
		},
		handleChange(list) {
			console.log('排序变化:', list);
		},
		handleEnd(index) {
			console.log('拖拽结束，索引:', index);
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				padding: 0 32rpx;

				.demo-card-item {
					padding: 32rpx;
					margin-bottom: 16rpx;
					border-radius: 16rpx;
					background: #f5f7fa;
					font-size: 28rpx;
				}

				.grid-item {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 160rpx;
					margin: 12rpx;
					border-radius: 16rpx;
					background: #eef3ff;
					font-size: 32rpx;
					font-weight: bold;
					color: #4a7aff;
				}
			}
		}
	}
}
</style>
