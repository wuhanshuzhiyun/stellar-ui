<template>
	<view class="radio-icon-root" :class="[cmpRootClass]" :style="[comRootStyle]">
		<view class="icon-1"></view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { selectionColorConfig } from '../ste-table/common';
export default {
	props: {
		checked: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		iconColorConfig: {
			type: Object,
			default: () => selectionColorConfig,
		},
	},
	data() {
		return {
			selectionColor: selectionColorConfig,
		};
	},
	computed: {
		cmpRootClass() {
			let classArr = [];
			if (this.checked) {
				classArr.push('checked');
			}
			if (this.disabled) {
				classArr.push('disabled');
			}
			if (this.readonly) {
				classArr.push('readonly');
			}

			return classArr.join(' ');
		},
		comRootStyle() {
			return {
				'--main-color': this.iconColorConfig.main || selectionColorConfig.main,
				'--main-outer-color': utils.Color.formatColor(
					this.iconColorConfig.main || selectionColorConfig.main,
					0.2
				),
				'--disabled-color': this.iconColorConfig.disabled || selectionColorConfig.disabled,
				'--un-selected-color': this.iconColorConfig.unSelected || selectionColorConfig.unSelected,
				'--readonly-color': this.iconColorConfig.readonly || selectionColorConfig.readonly,
				'--readonly-outer-color': utils.Color.formatColor(
					this.iconColorConfig.readonly || selectionColorConfig.readonly,
					0.2
				),
			};
		},
	},
};
</script>

<style lang="scss" scoped>
.radio-icon-root {
	width: 32rpx;
	height: 32rpx;

	border-radius: 50%;
	border: 2rpx solid var(--un-selected-color);
	position: relative;

	&.checked {
		border: none;
		background-color: var(--main-outer-color);
		.icon-1 {
			background-color: var(--main-color);
		}
	}

	&.readonly {
		border: none;
		background-color: var(--readonly-outer-color);
		.icon-1 {
			background-color: var(--readonly-color);
		}
	}

	&.disabled {
		border: none;
		background-color: var(--disabled-color);
	}
	.icon-1 {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;

		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
