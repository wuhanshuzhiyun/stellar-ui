<template>
	<view class="ste-step" data-test="step" :class="[`ste-step-${cmpDirection}`]" :style="[cmpStyle]">
		<view class="ste-step-head" :class="cmpDot ? 'head-is-dot' : ''">
			<view class="ste-step-line" v-if="cmpIndex < childrenLen"></view>
			<view
				class="ste-step-icon"
				:class="[!cmpDot ? ($slots.icon || icon ? '' : cmpStatusObj.icon ? 'is-icon' : 'is-text') : 'is-dot']"
				@click="clickStep"
			>
				<template v-if="$slots.icon">
					<slot name="icon"></slot>
				</template>
				<template v-else-if="cmpDot"></template>
				<template v-else-if="cmpStatusObj.icon">
					<ste-icon
						class="ste-step-icon-inner"
						:code="cmpStatusObj.icon"
						:size="icon ? 40 : 20"
						:color="cmpStatusObj.color"
					></ste-icon>
				</template>
				<template v-else>
					<view class="ste-step-inner">{{ cmpIndex }}</view>
				</template>
			</view>
		</view>
		<view class="ste-step-content" :class="[`ste-step-content-${steps.direction}`]">
			<view class="ste-step-title" @click="clickStep">
				<span v-if="!$slots.title">
					{{ title ? title : `第${cmpIndex}步` }}
				</span>
				<slot name="title"></slot>
			</view>
			<view class="ste-step-desc" v-if="description || $slots.description">
				<span v-if="!$slots.description" v-html="description"></span>
				<slot name="description"></slot>
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
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-steps
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
				'---color': this.cmpStatusObj.textColor,
				'---bg-color': this.cmpStatusObj.bgColor,
				'---num-color': this.cmpStatusObj.numColor,
				'---desc-color': this.cmpStatusObj.descColor,
				'---line-color': this.cmpStatusObj.lineColor,
				'---dot-color': this.cmpStatusObj.dotColor,
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
}

.ste-step-column {
	display: flex;

	.ste-step-line {
		height: calc(4rpx + 100%) !important;
		width: 2rpx !important;
	}

	.ste-step-content {
		padding-left: 6% !important;
		text-align: left !important;
	}
}
.ste-step {
	flex: 1;
	font-size: 0;
	text-align: center;

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
			background-color: var(---dot-color);
			border-radius: 50%;
		}
	}
	.ste-step-head {
		border-color: var(---color);
		color: var(---num-color);
		display: flex;
		justify-content: center;
		margin-bottom: 22rpx;
		position: relative;

		.ste-step-line {
			background: var(---line-color);
			display: inline-block;
			position: absolute;
			height: 2rpx;
			left: 50%;
			right: -50%;
			top: 20rpx;
		}
		.ste-step-icon.is-icon {
			border-radius: 50%;
			border-style: solid;
			border-width: 2rpx;
			border-color: var(---color);
			background-color: #ffffff;
		}
		.ste-step-icon.is-text {
			border-radius: 50%;
			border-style: solid;
			border-width: 2rpx;
			background-color: var(---bg-color);
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
			color: var(---color);
			line-height: 44rpx;
		}
		.ste-step-desc {
			line-height: 44rpx;
			font-size: 28rpx;
			color: var(---desc-color);
			margin-top: 8rpx;
		}
	}
}
</style>
