<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="日历"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-calendar height="720rpx" :showTitle="false" @confirm="handleConfirm" />
			</view>
			<view class="demo-item">
				<view class="title">结合弹窗使用</view>
				<view class="item-content">
					<view class="demo-code">
						<ste-button @click="show1 = true">默认(单个日期)</ste-button>
						<ste-popup :show.sync="show1" position="bottom">
							<div style="padding-bottom: 20px">
								<ste-calendar height="60vh" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show2 = true">多个日期</ste-button>
						<ste-popup :show.sync="show2" position="bottom">
							<div style="padding-bottom: 20px">
								<ste-calendar height="60vh" mode="multiple" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show3 = true">日期范围</ste-button>
						<ste-popup :show.sync="show3" position="bottom">
							<div style="padding-bottom: 20px">
								<ste-calendar height="60vh" mode="range" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show4 = true">自定义主题色</ste-button>
						<ste-popup :show.sync="show4" position="bottom">
							<div style="padding-bottom: 20px">
								<ste-calendar height="60vh" color="#3478f6" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show5 = true">自定义文案</ste-button>
						<ste-popup :show.sync="show5" position="bottom">
							<div style="padding-bottom: 20px">
								<ste-calendar
									height="60vh"
									mode="range"
									title="酒店预约"
									startText="住店"
									endText="离店"
									@confirm="handleConfirm"
								/>
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show6 = true">日期最大范围</ste-button>
						<ste-popup :show.sync="show6" position="bottom">
							<div style="padding-bottom: 20px">
								<ste-calendar
									height="60vh"
									mode="range"
									minDate="2024-05-10"
									maxDate="2024-05-20"
									@confirm="handleConfirm"
								/>
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show7 = true">多选数量限制</ste-button>
						<ste-popup :show.sync="show7" position="bottom">
							<div style="padding-bottom: 20px">
								<ste-calendar height="60vh" mode="multiple" :maxCount="5" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show7 = true">范围数量限制</ste-button>
						<ste-popup :show.sync="show7" position="bottom">
							<div style="padding-bottom: 20px">
								<ste-calendar height="60vh" mode="range" :maxRange="5" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show8 = true">默认日期</ste-button>
						<ste-popup :show.sync="show8" position="bottom">
							<div style="padding-bottom: 20px">
								<ste-calendar height="60vh" :list="[Date.now()]" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show9 = true">默认展示月份</ste-button>
						<ste-popup :show.sync="show9" position="bottom">
							<div style="padding-bottom: 20px">
								<ste-calendar
									height="60vh"
									minDate="2024-05-20"
									maxDate="2024-12-01"
									defaultMonth="2024-07"
									@confirm="handleConfirm"
								/>
							</div>
						</ste-popup>
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
			show1: false,
			show2: false,
			show3: false,
			show4: false,
			show5: false,
			show6: false,
			show7: false,
			show8: false,
			show9: false,
		};
	},
	created() {},
	methods: {
		handleConfirm(v) {
			uni.showToast({
				title: '确定选择：' + v.join(' '),
				icon: 'none',
				duration: 1500,
			});
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
				padding: 0 30rpx;
			}
			.item-content {
				padding: 0 30rpx;
				.demo-code {
					display: inline-block;
					margin: 0 12rpx 12rpx 0;
				}
			}
		}
	}
}
</style>
