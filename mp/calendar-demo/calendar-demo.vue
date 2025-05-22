<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="日历"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Calendar 日历</view>
				<view class="cmp-desc">按照日历形式展示数据或日期的容器</view>
			</view>
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-calendar height="720" :showTitle="false" @confirm="handleConfirm" ref="Calendar" />
			</view>
			<view class="demo-item">
				<view class="item-content">
					<view class="type-block">
						<view>01 组件类型</view>
					</view>
					<view class="demo-code">
						<ste-button @click="show1 = true" width="100%">默认(单个日期)</ste-button>
						<ste-popup :show.sync="show1" height="60vh" position="bottom">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>

					<view class="demo-code">
						<ste-button @click="show2 = true" width="100%">多个日期</ste-button>
						<ste-popup :show.sync="show2" height="60vh" position="bottom">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar mode="multiple" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>

					<view class="demo-code">
						<ste-button @click="show3 = true" width="100%">日期范围</ste-button>
						<ste-popup :show.sync="show3" height="60vh" position="bottom">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar mode="range" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>
					<view class="type-block">
						<view>02 组件样式</view>
					</view>
					<view class="demo-code">
						<ste-button @click="show4 = true" width="100%">自定义主题色</ste-button>
						<ste-popup :show.sync="show4" height="60vh" position="bottom">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar color="#3478f6" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show5 = true" width="100%">自定义文案</ste-button>
						<ste-popup :show.sync="show5" height="60vh" position="bottom">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar
									mode="range"
									title="酒店预约"
									startText="住店"
									endText="离店"
									@confirm="handleConfirm"
								/>
							</div>
						</ste-popup>
					</view>
					<view class="type-block">
						<view>02 组件状态</view>
					</view>
					<view class="demo-code">
						<ste-button @click="show6 = true" width="100%">日期最大范围</ste-button>
						<ste-popup :show.sync="show6" height="60vh" position="bottom">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar
									mode="range"
									minDate="2024-05-10"
									maxDate="2024-05-20"
									@confirm="handleConfirm"
								/>
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show7 = true" width="100%">多选数量限制</ste-button>
						<ste-popup :show.sync="show7" height="60vh" position="bottom">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar mode="multiple" :maxCount="5" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show8 = true" width="100%">范围数量限制</ste-button>
						<ste-popup :show.sync="show8" height="60vh" position="bottom">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar mode="range" :maxRange="5" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show9 = true" width="100%">默认选择日期</ste-button>
						<ste-popup :show.sync="show9" height="60vh" position="bottom">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar :list="[Date.now()]" @confirm="handleConfirm" />
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show10 = true" width="100%">默认展示月份</ste-button>
						<ste-popup :show.sync="show10" position="bottom" height="60vh" @open-after="setViewMonth">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar
									ref="defaultMonth"
									minDate="2024-05-20"
									maxDate="2024-08-01"
									@confirm="handleConfirm"
								/>
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show11 = true" width="100%">隐藏确定按钮</ste-button>
						<ste-popup :show.sync="show11" position="bottom" height="60vh">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar
									minDate="2024-05-20"
									maxDate="2024-08-01"
									@select="handleConfirm"
									:showConfirm="false"
								/>
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show12 = true" width="100%">只读</ste-button>
						<ste-popup :show.sync="show12" position="bottom" height="60vh">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar
									minDate="2024-05-20"
									maxDate="2024-06-10"
									readonly
									:list="['2024-05-21']"
								/>
							</div>
						</ste-popup>
					</view>
					<view class="demo-code">
						<ste-button @click="show13 = true" width="100%">隐藏背景月份</ste-button>
						<ste-popup :show.sync="show13" position="bottom" height="60vh">
							<div style="padding-bottom: 20px; height: 100%">
								<ste-calendar :showMark="false" @select="handleConfirm" />
							</div>
						</ste-popup>
					</view>
				</view>
			</view>

			<view class="demo-item">
				<view class="type-block" style="padding: 0 30rpx">
					<view>03 组件自定义</view>
				</view>

				<ste-select
					mode="month"
					v-model="defaultDate"
					width="200"
					options-width="420"
					border-color="transparency"
				>
					<template v-slot:icon>
						<ste-icon code="&#xe699;"></ste-icon>
					</template>
				</ste-select>

				<ste-calendar
					@select="handleConfirm"
					weekendColor="#999"
					color="#09f"
					:signs="signs"
					:defaultDate="defaultDate"
					:monthCount="1"
					:showConfirm="false"
					:showTitle="false"
				/>
			</view>
		</view>
	</view>
</template>
<script>
import utils from '../../uni_modules/stellar-ui/utils/utils';
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
			show10: false,
			show11: false,
			show12: false,
			show13: false,
			defaultDate: utils.dayjs().format('YYYY-MM'),
			signs: {
				'2024-11-12': [
					{ content: 'XXXXX', className: 'test-signs' },
					{ content: 'XXXXX', className: 'test-signs' },
					{ content: 'XXXXX', className: 'test-signs' },
				],
				'2024-11-13': [
					{ content: 'XXXXX', style: { color: '#666', background: '#f5f5f5' } },
					{ content: 'XXXXX', style: { color: '#666', background: '#f5f5f5' } },
				],
			},
		};
	},
	created() {},
	methods: {
		handleConfirm(v) {
			this.$showToast({
				title: '确定选择：' + v.join(' '),
				icon: 'none',
				duration: 1500,
			});
		},
		setViewMonth() {
			this.$refs.defaultMonth.showMonth('2024-07');
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		padding: 0;
		.description {
			padding: 0 30rpx;
		}
		.type-block {
			margin: 30rpx 0;
		}
		.demo-item {
			.title {
				padding: 0 30rpx;
			}
			.item-content {
				padding: 0 30rpx;
				.demo-code {
					// display: inline-block;
					margin: 0 12rpx 12rpx 0;
				}
			}
			::v-deep .test-signs {
				color: #fff;
				background-color: #000;
			}
		}
	}
}
</style>
