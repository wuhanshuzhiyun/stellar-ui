<template>
	<view class="ste-steps-root" :class="[`ste-steps-${direction}`, reverse ? 'reverse' : '']">
		<slot></slot>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-steps 步骤条
 * @description 步骤条组件,拆分展示某项流程的步骤，引导用户按流程完成任务或向用户展示当前状态。。
 * @tutorial https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui&menu=%E7%BB%84%E4%BB%B6&active=ste-steps
 * @property {Number} active 步骤进度默认 0
 * @property {Boolean} direction 步骤条方向 默认 row
 * @value  row  横向 {{String}}
 * @value  column 竖向 {{String}}
 * @property {Boolean} dot 点状步骤条 默认 false
 * @event {Function} clickStep 点击步骤的标题或图标时触发
 */

export default {
	group: '展示组件',
	title: 'Steps 步骤条',
	name: 'steps',
	options: {
		virtualHost: true,
	},
	props: {
		active: {
			type: [Number, null],
			default: 0,
		},
		direction: {
			type: [String, null],
			default: 'row',
		},
		dot: {
			type: [Boolean, null],
			default: false,
		},
		reverse: {
			type: Boolean,
			default: false,
		},
		lineStyle: {
			type: [String, null],
			default: 'solid',
		},
	},
	provide() {
		return {
			steps: this,
		};
	},
};
</script>

<style lang="scss" scoped>
.ste-steps-root {
	display: flex;
	width: 100%;
	flex: 1;
}
.ste-steps-column {
	flex-flow: column;
	height: 100%;
	&.reverse {
		flex-direction: column-reverse;
	}
}

.ste-steps-row {
	flex-direction: row;
	flex: 1;
	&.reverse {
		flex-direction: row-reverse;
	}
}
</style>
