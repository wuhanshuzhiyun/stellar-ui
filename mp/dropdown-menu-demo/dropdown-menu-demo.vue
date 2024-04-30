<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="下拉菜单"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view class="menu-item">
						<view>
							<ste-dropdown-menu title="选择项" @open="open" @close="close" @change="change">
								<ste-dropdown-menu-item value="1" title="选项1" />
								<ste-dropdown-menu-item value="2" title="选项2" />
								<ste-dropdown-menu-item value="3" title="选项3" />
							</ste-dropdown-menu>
						</view>
						<view>
							<ste-dropdown-menu title="选择项" @open="open" @close="close" @change="change">
								<ste-dropdown-menu-item value="1" title="选项1" @click="itemClick" />
								<ste-dropdown-menu-item value="2" title="选项2" />
								<ste-dropdown-menu-item value="3" title="选项3" />
							</ste-dropdown-menu>
						</view>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">向上展开</view>
				<view class="item-block">
					<view class="menu-item">
						<view>
							<ste-dropdown-menu title="手机" direction="up">
								<ste-dropdown-menu-item value="1" title="选项1" />
								<ste-dropdown-menu-item value="2" title="选项2" />
							</ste-dropdown-menu>
						</view>
						<view>
							<ste-dropdown-menu title="手机" direction="up">
								<ste-dropdown-menu-item value="1" title="选项1" />
								<ste-dropdown-menu-item value="2" title="选项2" />
							</ste-dropdown-menu>
						</view>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">禁用某项</view>
				<view class="item-block">
					<view class="menu-item">
						<view>
							<ste-dropdown-menu title="选择项">
								<ste-dropdown-menu-item value="1" title="选项1" />
								<ste-dropdown-menu-item value="2" title="选项2" disabled />
								<ste-dropdown-menu-item value="3" title="选项3" />
							</ste-dropdown-menu>
						</view>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">多选</view>
				<view class="item-block">
					<view class="menu-item">
						<view>
							<ste-dropdown-menu title="可选两项" :max="2">
								<ste-dropdown-menu-item value="1" title="选项1" />
								<ste-dropdown-menu-item value="2" title="选项2" />
								<ste-dropdown-menu-item value="3" title="选项3" />
							</ste-dropdown-menu>
						</view>
						<view>
							<ste-dropdown-menu title="可选三项" :max="3">
								<ste-dropdown-menu-item value="1" title="选项1" />
								<ste-dropdown-menu-item value="2" title="选项2" />
								<ste-dropdown-menu-item value="3" title="选项3" />
							</ste-dropdown-menu>
						</view>
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
	methods: {
		open() {
			console.log('菜单被打开');
		},
		close() {
			console.log('菜单被关闭');
		},
		change(e) {
			console.log('选中改变', e);
		},
		itemClick(stop, next, reject) {
			stop();
			uni.showLoading({
				title: '加载...',
			});
			setTimeout(() => {
				uni.hideLoading();
				next();
			}, 500);
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		padding: 0;
		.demo-item {
			.title {
				padding-left: 20rpx;
			}
			.item-block {
				.menu-item {
					display: flex;
					padding: 0 20rpx;
					width: 100%;
					box-shadow: 0 0 10px #ddd;
					> view {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
	}
}
</style>
