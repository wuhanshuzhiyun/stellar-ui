<template>
	<view class="ste-step" data-test="step" :class="[`ste-step-${cmpDirection}`, cmpReverse ? 'reverse' : '']"
		:style="[cmpStyle]">
		<view class="ste-step-head" :class="{ 'head-is-dot': cmpDot }">
			<view class="ste-step-line" :style="{ 'border-top-style': cmpLineStyle }" v-if="cmpIndex < childrenLen">
			</view>
			<view class="ste-step-icon"
				:class="[!cmpDot ? ($slots.icon || icon ? '' : cmpStatusObj.icon ? 'is-icon' : 'is-text') : 'is-dot']"
				@click="clickStep">
				<slot name="icon">
					<template v-if="cmpDot"></template>
					<template v-else-if="cmpStatusObj.icon">
						<ste-icon class="ste-step-icon-inner" :code="cmpStatusObj.icon" :size="icon ? 40 : 20"
							:color="cmpStatusObj.color"></ste-icon>
					</template>
					<template v-else>
						<view class="ste-step-inner">{{ cmpIndex }}</view>
					</template>
				</slot>
			</view>
		</view>
		<view class="ste-step-content" :class="[`ste-step-content-${steps.direction}`]">
			<view class="ste-step-title" @click="clickStep">
				<slot name="title">
					<span>
						{{ title ? title : `第${cmpIndex}步` }}
					</span>
				</slot>
			</view>
			<view class="ste-step-desc" v-if="description || $slots.description">
				<slot name="description"><span v-html="description"></span></slot>
			</view>
		</view>
	</view>
</template>
<script>
	import utils from '../../utils/utils.js';
	import useColor from '../../config/color.js';
	let color = useColor();
	/**
	 * ste-steps 步骤条
	 * @description 步骤条组件,拆分展示某项流程的步骤，引导用户按流程完成任务或向用户展示当前状态。。
	 * @tutorial https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui&menu=%E7%BB%84%E4%BB%B6&active=ste-steps
	 * @property {String} title 流程步骤的标题
	 * @property {String} description 流程步骤的描述性文字(支持 html 结构)
	 * @property {String} icon 图标
	 * @property {String} status 步骤状态
	 */
	export default {
		name: 'ste-step',
		options: {
			virtualHost: true,
		},
		props: {
			title: {
				type: [String, null],
				default: '',
			},
			description: {
				type: [String, null],
				default: '',
			},
			icon: {
				type: [String, null],
				default: '',
			},
			status: {
				type: [String, null],
				default: null,
			},
		},
		inject: {
			steps: {
				default: '',
			},
		},
		data() {
			return {
				childrenLen: 0,
			};
		},
		computed: {
			cmpDirection() {
				return this.steps.direction;
			},
			cmpDot() {
				return this.steps.dot;
			},
			cmpReverse() {
				return this.steps.reverse;
			},
			cmpLineStyle() {
				return this.steps.lineStyle;
			},
			cmpIndex() {
				this.$nextTick(() => {
					// #ifdef H5
					this.childrenLen = this.steps.$children[0].$children.length;
					// #endif
					// #ifndef H5
					this.childrenLen = this.steps.$children.length;
					// #endif
				});
				// #ifdef H5
				return this.steps.$children[0].$children.length;
				// #endif
				// #ifndef H5
				return this.steps.$children.length;
				// #endif
			},
			cmpStatusObj() {
				let obj = {};
				let status = '';
				// status不是默认配置 优先级最高
				if (this.status) {
					status = this.status;
				} else {
					status = this.steps.active >= this.cmpIndex ? 'finished' : 'process';
				}
				obj.textColor = this.steps.active + 1 >= this.cmpIndex ? color.getColor().steThemeColor : '#cccccc';
				if (status == 'finished') {
					obj.color = color.getColor().steThemeColor;
					obj.icon = '&#xe67a;';
				}
				if (status == 'process') {
					obj.color = obj.textColor;
					obj.icon = '';
				}
				if (status == 'error') {
					obj.color = '#FF1A00';
					obj.icon = '&#xe67b;';
					obj.textColor = '#FF1A00';
				}
				obj.icon = this.icon ? this.icon : obj.icon;
				obj.bgColor = this.steps.active + 1 == this.cmpIndex ? color.getColor().steThemeColor : '#ffffff';
				obj.numColor = this.steps.active + 1 >= this.cmpIndex ? '#ffffff' : '#cccccc';
				obj.descColor = this.steps.active + 1 >= this.cmpIndex ? '#999999' : '#cccccc';
				obj.lineColor = this.steps.active >= this.cmpIndex ? color.getColor().steThemeColor : '#EEEEEE';
				obj.dotColor = this.steps.active + 1 >= this.cmpIndex ? color.getColor().steThemeColor : '#DDDDDD';
				return obj;
			},
			cmpStyle() {
				return {
					'--step-color': this.cmpStatusObj.textColor,
					'--step-bg-color': this.cmpStatusObj.bgColor,
					'--step-num-color': this.cmpStatusObj.numColor,
					'--step-desc-color': this.cmpStatusObj.descColor,
					'--step-line-color': this.cmpStatusObj.lineColor,
					'--step-dot-color': this.cmpStatusObj.dotColor,
				};
			},
		},
		methods: {
			clickStep() {
				this.steps.$emit('click-step', this.cmpIndex);
			},
		},
	};
</script>
<style lang="scss" scoped>
	.ste-step-row {
		display: block;

		&.reverse {
			.ste-step-line {
				left: -50% !important;
				right: 50% !important;
			}
		}
	}


	.ste-step {
		flex: 1;
		font-size: 0;
		text-align: center;

		&.ste-step-column {
			display: flex;

			&.reverse {
				.ste-step-head .ste-step-line {
					top: -100% !important;
				}
			}

			.ste-step-head .ste-step-line {
				height: calc(4rpx + 100%) !important;
				width: 2rpx !important;
				border: none;
				border-left-width: 2rpx;
				border-left-color: var(--step-line-color);
				border-left-style: solid;
			}

			.ste-step-content {
				padding-left: 6% !important;
				text-align: left !important;
			}
		}

		.head-is-dot {
			top: 12rpx;
			margin-bottom: 0 !important;
			margin-top: 14rpx !important;

			.ste-step-line {
				top: 14rpx !important;
				left: auto !important;
				right: auto !important;
			}

			.ste-step-icon {
				box-sizing: content-box;
				height: 16rpx !important;
				width: 16rpx !important;
				line-height: 16rpx !important;
				background-color: var(--step-dot-color);
				border-radius: 50%;
			}
		}

		.ste-step-head {
			border-color: var(--step-color);
			color: var(--step-num-color);
			display: flex;
			justify-content: center;
			margin-bottom: 22rpx;
			position: relative;

			.ste-step-line {
				// background: var(--step-line-color);
				display: inline-block;
				position: absolute;
				height: 2rpx;
				left: 50%;
				right: -50%;
				top: 20rpx;
				border: none;
				border-top-width: 2rpx;
				border-top-color: var(--step-line-color);
				border-top-style: solid;
			}

			.ste-step-icon.is-icon {
				border-radius: 50%;
				border-style: solid;
				border-width: 2rpx;
				border-color: var(--step-color);
				background-color: #ffffff;
			}

			.ste-step-icon.is-text {
				border-radius: 50%;
				border-style: solid;
				border-width: 2rpx;
				background-color: var(--step-bg-color);
			}

			.ste-step-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				font-size: 24rpx;
				height: 40rpx;
				line-height: 40rpx;
				width: 40rpx;
			}

			.ste-step-icon-inner {
				align-items: center;
				display: flex;
				justify-content: center;
			}
		}

		.ste-step-content {
			display: inline-block;
			text-align: center;

			.ste-step-title {
				font-size: 32rpx;
				color: var(--step-color);
				line-height: 44rpx;
			}

			.ste-step-desc {
				line-height: 44rpx;
				font-size: 28rpx;
				color: var(--step-desc-color);
				margin-top: 8rpx;
			}
		}
	}
</style>