<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="下拉菜单"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view class="menu-item">
						<view>
							<ste-dropdown-menu v-model="menu1" @open="open" @close="close" @change="change">
								<ste-dropdown-menu-item value="1" title="全部商品" />
								<ste-dropdown-menu-item value="2" title="新款商品" />
								<ste-dropdown-menu-item value="3" title="活动商品" />
							</ste-dropdown-menu>
						</view>
						<view>
							<ste-dropdown-menu value="1" @open="open" @close="close" @change="change">
								<ste-dropdown-menu-item value="1" title="默认排序" @click="itemClick" />
								<ste-dropdown-menu-item value="2" title="销量排序" />
								<ste-dropdown-menu-item value="3" title="价格排序" />
							</ste-dropdown-menu>
						</view>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">按钮类型</view>
				<view class="item-block">
					<view class="menu-item">
						<view>
							<ste-dropdown-menu title="选择项1" type="round" value="2">
								<ste-dropdown-menu-item value="1" title="选项名称" />
								<ste-dropdown-menu-item value="2" title="选项名称" />
								<ste-dropdown-menu-item value="3" title="选项名称" />
								<ste-dropdown-menu-item value="4" title="选项名称" />
								<ste-dropdown-menu-item value="5" title="选项名称" />
								<ste-dropdown-menu-item value="6" title="选项名称" />
								<ste-dropdown-menu-item value="7" title="选项名称" />
							</ste-dropdown-menu>
						</view>
						<view>
							<ste-dropdown-menu title="选择项2" type="round" :max="2">
								<ste-dropdown-menu-item value="1" title="选项名称名称" />
								<ste-dropdown-menu-item value="2" title="选项名称" />
								<ste-dropdown-menu-item value="3" title="选项名称" />
								<ste-dropdown-menu-item value="4" title="选项名称名称名称" />
								<ste-dropdown-menu-item value="5" title="选项名称" />
								<ste-dropdown-menu-item value="6" title="选项名称" />
								<ste-dropdown-menu-item value="7" title="选项名称" />
							</ste-dropdown-menu>
						</view>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">选中颜色 & 未选中颜色</view>
				<view class="item-block">
					<view class="menu-item">
						<view>
							<ste-dropdown-menu value="1" activeColor="#e9e">
								<ste-dropdown-menu-item value="1" title="全部商品" />
								<ste-dropdown-menu-item value="2" title="新款商品" />
								<ste-dropdown-menu-item value="3" title="活动商品" />
							</ste-dropdown-menu>
						</view>
						<view>
							<ste-dropdown-menu value="2" inactiveColor="#53e">
								<ste-dropdown-menu-item value="1" title="默认排序" />
								<ste-dropdown-menu-item value="2" title="销量排序" />
								<ste-dropdown-menu-item value="3" title="价格排序" />
							</ste-dropdown-menu>
						</view>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">展开方向</view>
				<view class="item-block">
					<view class="menu-item">
						<view>
							<ste-dropdown-menu title="手机" direction="down">
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
				<view class="title">展开动画时间</view>
				<view class="item-block">
					<view class="menu-item">
						<view>
							<ste-dropdown-menu value="1" :duration="0.8">
								<ste-dropdown-menu-item value="1" title="全部商品" />
								<ste-dropdown-menu-item value="2" title="新款商品" />
								<ste-dropdown-menu-item value="3" title="活动商品" />
							</ste-dropdown-menu>
						</view>
						<view>
							<ste-dropdown-menu value="2" :duration="0">
								<ste-dropdown-menu-item value="1" title="默认排序" />
								<ste-dropdown-menu-item value="2" title="销量排序" />
								<ste-dropdown-menu-item value="3" title="价格排序" />
							</ste-dropdown-menu>
						</view>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">遮罩</view>
				<view class="item-block">
					<view class="menu-item">
						<view>
							<ste-dropdown-menu value="1" :showMask="false" title="不显示遮罩">
								<ste-dropdown-menu-item value="1" title="全部商品" />
								<ste-dropdown-menu-item value="2" title="新款商品" />
								<ste-dropdown-menu-item value="3" title="活动商品" />
							</ste-dropdown-menu>
						</view>
						<view>
							<ste-dropdown-menu value="2" title="遮罩不关闭" :isMaskClick="false">
								<ste-dropdown-menu-item value="1" title="默认排序" />
								<ste-dropdown-menu-item value="2" title="销量排序" />
								<ste-dropdown-menu-item value="3" title="价格排序" />
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
			<view class="demo-item">
				<view class="title">禁用某项</view>
				<view class="item-block">
					<view class="menu-item">
						<view>
							<ste-dropdown-menu title="选择项" direction="up">
								<ste-dropdown-menu-item value="1" title="选项1" />
								<ste-dropdown-menu-item value="2" title="选项2" disabled />
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
		return {
			menu1: 1,
		};
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
			console.log('选中改变', this.menu1);
		},
		btn1() {
			this.menu1 = 2;
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
