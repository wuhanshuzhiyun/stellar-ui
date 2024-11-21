<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="拖拽"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Drag 拖拽</view>
				<view class="cmp-desc">用于拖拽的容器</view>
			</view>
			<view class="demo-item">
				<view class="title">自由拖拽</view>
				<view class="item-block">
					<view>
						<ste-drag @start="handleStart" @end="handleEnd">
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
						<ste-drag attract @start="handleStart" @end="handleEnd">
							<ste-button>贴边</ste-button>
						</ste-drag>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">边界</view>
				<view class="item-block">
					<view class="boundary-box">
						<ste-drag :boundary="boundary">
							<ste-button>边界</ste-button>
						</ste-drag>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import utils from '@/common/utils.js';
export default {
	data() {
		return {
			boundary: null,
		};
	},
	created() {},
	mounted() {
		const query = uni.createSelectorQuery().in(this);
		query
			.select('.boundary-box')
			.boundingClientRect((data) => {
				console.log(data);

				const boundary = { left: data.left, top: data.top };
				const systemInfo = utils.getWindowInfo();
				boundary.right = systemInfo.windowWidth - data.left - 300;
				boundary.bottom = systemInfo.windowHeight - data.top - 150;
				this.boundary = boundary;
			})
			.exec();
	},
	methods: {
		handleStart() {
			console.log('start');
		},
		handleEnd() {
			console.log('end');
		},
	},
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

				.boundary-box {
					width: 300px;
					height: 150px;
					border: solid 1px red;
				}
			}
		}
	}
}
</style>