<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="滑块"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view style="width: 100%; margin-bottom: 80rpx">
						<ste-slider showStops :marks="marks2"></ste-slider>
					</view>
					<view style="width: 100%; margin-bottom: 80rpx">
						<ste-slider
							:step="10"
							showStops
							activeColor="red"
							inactiveColor="#a1a1a1"
							barHeight="18"
							:value="30"
							buttonSize="80"
							@input="onInput"
							@change="onChange"
							@dragEnd="onEnd"
							@dragStart="onStart"
						>
							<view class="c-progress-2" slot="button">
								<text></text>
								<view class="p-content">
									<text>按钮</text>
								</view>
							</view>
						</ste-slider>
					</view>
					<view style="width: 100%; height: 300rpx">
						<ste-slider vertical showStops :step="25" :marks="marks"></ste-slider>
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
			marks: {
				10: '0°C',
				20: '8°C',
				37: '37°C',
				98: {
					style: {
						color: '#1989FA',
					},
					label: '合格',
				},
			},
			marks2: {
				10: '0°C',
				20: '8°C',
				48: '37°C',
				80: {
					style: {
						color: '#1989FA',
					},
					label: '合格',
				},
			},
		};
	},
	created() {},
	methods: {
		onInput(e) {
			console.log('input  ', e);
		},
		onChange(e) {
			console.log('change  ', e);
		},
		onStart(e) {
			console.log('start  ', e);
		},
		onEnd(e) {
			console.log('end  ', e);
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

				.c-progress-2 {
					.p-content {
						padding: 0 16rpx;
						background-color: #ff0000;
						border-radius: 20rpx;

						color: #ffffff;
						font-size: 24rpx;

						white-space: nowrap;
					}
				}
			}
		}
	}
}
</style>
