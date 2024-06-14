<template>
	<view class="ste-step" :class="[`ste-step-${steps.direction}`]">
		<view class="ste-step-head">
			<view class="ste-step-line" v-if="cmpIndex < childrenLen"></view>
			<view class="ste-step-icon" :class="[!steps.dot ? (icon ? 'is-icon' : 'is-text') : '']">
				<template v-if="icon">
					<ste-icon class="ste-step-icon-inner" :code="icon"></ste-icon>
				</template>
				<template v-else-if="steps.dot"></template>
				<template v-else>
					<view class="ste-step-inner">{{ cmpIndex }}</view>
				</template>
			</view>
		</view>
		<view class="ste-step-content" :class="[`ste-step-content-${steps.direction}`]">
			<view class="ste-step-title">
				<span v-if="!$slots.title">{{ title ? title : `第${cmpIndex}步` }}</span>
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
			type: String,
			default: '',
		},
		description: {
			type: String,
			default: '',
		},
		icon: {
			type: String,
			default: '',
		},
		status: {
			type: String,
			default: 'finished',
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
	created() {
		console.log('this.steps.$children.length', this.steps.$children[0].$children.length);
	},
	computed: {
		cmpIndex() {
			this.$nextTick(() => {
				// #ifdef H5
				this.childrenLen = this.steps.$children[0].$children.length;
				// #endif
				// #ifndef H5
				this.childrenLen = this.steps.$children.length;
				// #endif
				console.log('childrenLen', this.childrenLen);
			});
			// #ifdef H5
			return this.steps.$children[0].$children.length;
			// #endif
			// #ifndef H5
			return this.steps.$children.length;
			// #endif
		},
		cmpStatusObj() {
			let obj = [];
			if (this.status == 'finished ') {
				obj.color = '#0090FF';
				obj.icon = '&#xe67a;';
			}
			if (this.status == 'process') {
				obj.color = '#0090FF';
				obj.icon = '';
			}
			if (this.status == 'error') {
				obj.color = '#FF1A00';
				obj.icon = '&#xe67b;';
			}
			return obj;
		},
	},
};
</script>
<style lang="scss" scoped>
.ste-step {
	display: block;
	flex: 1;
	font-size: 0;
	text-align: center;

	&-row {
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	&-column {
		position: relative;
		flex-direction: row;
		justify-content: flex-start;
		padding-bottom: 5px;
	}

	.ste-step-head {
		border-color: #0090ff;
		color: #ffffff;
		display: flex;
		justify-content: center;
		margin-bottom: 22rpx;
		position: relative;

		.ste-step-line {
			background: #0090ff;
			display: inline-block;
			height: 2rpx;
			position: absolute;
			left: 50%;
			right: -50%;
			top: 21rpx;
		}
		.ste-step-icon.is-icon {
			border-radius: 50%;
			border-style: solid;
			border-width: 2rpx;
			border-color: #0090ff;
			background-color: #fff;
		}
		.ste-step-icon.is-text {
			border-radius: 50%;
			border-style: solid;
			border-width: 2rpx;
			background-color: #0090ff;
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
		.ste-step-title {
			font-size: 32rpx;
			color: #0090ff;
			line-height: 44rpx;
			text-align: center;
		}
		.ste-step-desc {
			line-height: 44rpx;
			text-align: center;
			font-size: 28rpx;
			color: #999999;
		}
	}
}
</style>
