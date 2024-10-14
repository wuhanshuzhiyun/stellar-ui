<template>
	<view class="sub-table-root" :class="[cmpRootClass]">
		<view class="row" v-for="(v, i) in rows" :key="i" :style="[cmpRowStyle]">
			<view class="cell">
				{{ v }}
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';

function findMaxInRange(tolerance, numbers = []) {
	if (numbers.length === 0) return 0;

	let max = Math.max(...numbers);
	let min = Math.min(...numbers);

	// 如果最大值和最小值的差值在浮动范围内，返回 0
	if (max - min <= tolerance) {
		return 0;
	}

	// 返回最大值
	return max;
}
export default {
	options: {
		virtualHost: true,
	},
	props: {
		rows: {
			type: [Array, null],
			default: () => [],
		},
		border: {
			type: [Boolean, null],
			default: false,
		},
	},
	data() {
		return {
			rowEls: [],
		};
	},
	mounted() {
		utils.querySelector('.sub-table-root .row', this, true).then((rec) => {
			this.rowEls = rec;
		});
	},
	computed: {
		cmpRootClass() {
			let classArr = [];
			if (this.border) {
				classArr.push('border');
			}
			return classArr.join(' ');
		},
		cmpRowStyle() {
			let style = {};
			if (this.rowEls.length > 0) {
				let maxHeight = findMaxInRange(
					0.5,
					this.rowEls.map((e) => e.height)
				);
				if (maxHeight > 0) {
					style.flexBasis = maxHeight + 'px';
					style.flexGrow = 0;
				}
			}
			return style;
		},
	},
};
</script>

<style lang="scss" scoped>
@import './var.scss';
.sub-table-root {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	&.border {
		.row {
			.cell {
				border-bottom: $default-border;
			}
		}
	}

	.row {
		// margin-left: -32rpx;
		// width: calc(100% + 64rpx);
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex: 1;
		.cell {
			@import './common.scss';
			@include cell;
			// padding-right: 0;

			border-bottom: none;
			padding: 24rpx 32rpx;
		}
		&:nth-last-child(1) {
			.cell {
				border-bottom: none;
			}
		}
	}
}
</style>
