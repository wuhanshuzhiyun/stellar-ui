<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="下拉菜单"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">DropdownMenu 下拉菜单</view>
				<view class="cmp-desc">
					菜单呈现数个并列的选项类目，用于整个页面的内容筛选，由菜单面板和菜单选项组成。
				</view>
			</view>
			<view class="type-block">
				<view>01 组件类型</view>
			</view>
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
			<view class="type-block">
				<view>02 组件自定义</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义下拉内容</view>
				<view class="item-block">
					<view class="menu-item">
						<view>
							<ste-dropdown-menu value="2" title="服务" ref="steDropMenu">
								<view class="custom-menu-box">
									<view class="menu-box">
										<view class="left">
											<view
												v-for="(m, i) in customMenuData"
												:key="i"
												:class="i == m1 ? 'active' : ''"
												@click="choose('1', i)"
											>
												{{ m.name }}
											</view>
										</view>
										<view class="right">
											<view
												v-for="(m, i) in customMenuData[m1].child"
												:key="i"
												:class="i == m2 ? 'active' : ''"
												@click="choose('2', i)"
											>
												{{ m }}
											</view>
										</view>
									</view>
									<view class="action-box">
										<ste-button
											width="320"
											background="rgba(0,0,0,0)"
											borderColor="#0090FF"
											color="#0090FF"
											@click="confirm"
										>
											重置
										</ste-button>
										<ste-button width="320" @click="confirm">确认</ste-button>
									</view>
								</view>
							</ste-dropdown-menu>
						</view>
					</view>
				</view>
			</view>
			<view class="type-block">
				<view>03 组件样式</view>
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
							<ste-dropdown-menu title="可选两项" :max="2" direction="up">
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
			customMenuData: [
				{ name: '服务台业务', child: ['雨伞租借', '礼品包装', '电费代收', '便民药箱', '赠品发放'] },
				{ name: '客户心声', child: ['雨伞租借2', '礼品包装2', '电费代收2', '便民药箱2', '赠品发放3'] },
				{ name: '招商服务', child: ['雨伞租借3', '礼品包装3', '电费代收3', '便民药箱3', '赠品发放3'] },
			],
			m1: 0,
			m2: 0,
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
			this.$showToast({
				title: '加载中...',
				icon: 'loading',
				duration: 600,
			});
			setTimeout(() => {
				this.hideToast();
				next();
			}, 500);
		},
		choose(type, v) {
			if (type == '1') {
				this.m1 = v;
				this.m2 = 0;
			} else {
				this.m2 = v;
			}
		},
		confirm() {
			this.$refs.steDropMenu.close();
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		padding: 0;
		.description {
			padding: 0 40rpx;
		}
		.type-block {
			padding: 0 40rpx;
		}
		.demo-item {
			.title {
				padding-left: 40rpx;
			}
			.item-block {
				.menu-item {
					display: flex;
					padding: 0 40rpx;
					width: 100%;
					box-shadow: 0 0 10px #ddd;
					> view {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.custom-menu-box {
						background-color: #fff;
						padding-top: 24rpx;
						border-top: solid 4rpx #f5f5f5;
						.menu-box {
							width: 100%;
							display: flex;
							margin-bottom: 56rpx;
							font-size: 28rpx;
							.left {
								width: 236rpx;
								background-color: #f9f9f9;

								> view {
									height: 90rpx;
									display: flex;
									align-items: center;
									justify-content: center;

									&.active {
										background-color: #fff;
										color: #0090FF;
									}
								}
							}

							.right {
								flex: 1;
								margin-left: 26rpx;
								margin-right: 18rpx;
								background-color: #fff;
								> view {
									height: 90rpx;
									display: flex;
									align-items: center;

									&:not(:last-child) {
										border-bottom: 2rpx solid #f9f9f9;
									}

									&.active {
										color: #0090FF;
										font-weight: bold;
									}
								}
							}
						}

						.action-box {
							padding: 0 40rpx;
							display: flex;
							justify-content: space-between;

							padding-bottom: 20rpx;
						}
					}
				}
			}
		}
	}
}
</style>
