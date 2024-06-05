<template>
	<view class="number-keyboard">
		<view class="number-keyboard-left">
			<block v-for="num in list" :key="num">
				<view
					class="number-keyboard-item"
					:class="{ zero: num === '0', span3: list.length === 10, span2: list.length === 11 }"
					@click="onChange(num)"
				>
					{{ num }}
				</view>
			</block>
		</view>
		<view class="number-keyboard-right">
			<view class="number-keyboard-item" @click="onBackspace">
				<ste-icon code="&#xe6a7;" :color="textColor" :size="textSize" />
			</view>
			<view class="number-keyboard-item clear" v-if="showClear" @click="onClear">清除</view>
			<view class="number-keyboard-item confirm" :class="{ disabled, 'show-clear': showClear }" @click="onConfirm">
				{{ confirmText }}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	options: {
		virtualHost: true,
	},
	props: {
		list: { type: Array },
		confirmText: { type: String },
		disabled: { type: Boolean },
		showClear: { type: Boolean },
		textColor: { type: String },
		textSize: { type: [Number, String] },
	},

	methods: {
		onChange(v) {
			this.$emit('change', v);
		},
		onBackspace() {
			this.$emit('backspace');
		},
		onClear() {
			this.$emit('clear');
		},
		onConfirm() {
			if (this.disabled) return;
			this.$emit('confirm');
		},
	},
};
</script>

<style lang="scss" scoped>
.number-keyboard {
	width: 100%;
	aspect-ratio: 16 / 10; /* 宽高比为16:9，形成正方形 */
	display: grid;
	grid-template-columns: 3fr 1fr;
	background-color: #f9f9f9;
	column-gap: 16rpx;
	.number-keyboard-left {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16rpx;
	}
	.number-keyboard-right {
		display: grid;
		row-gap: 16rpx;
		grid-template-rows: repeat(4, 1fr);
	}
	.number-keyboard-item {
		background-color: #fff;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: DIN, DIN;
		font-weight: bold;
		font-size: var(--ste-number-keyboard-text-size);
		color: var(--ste-number-keyboard-text-color);
		border-radius: 8rpx;

		&:active {
			background-color: #f1f1f1;
		}

		&.clear {
			font-size: var(--ste-number-keyboard-clear-text-size);
		}

		&.confirm {
			flex-direction: column;
			grid-row: span 3;
			font-size: var(--ste-number-keyboard-confirm-text-size);
			background: var(--ste-number-keyboard-confirm-bg);
			color: #fff;
			&.show-clear {
				grid-row: span 2;
			}
			&:active {
				background-color: var(--ste-number-keyboard-confirm-bg-active);
			}

			&.disabled {
				background: rgba(238, 238, 238, 0.4) !important;
			}
		}

		&.zero {
			&.span2 {
				grid-column: span 2;
			}
			&.span3 {
				grid-column: span 3;
			}
		}
	}
}
</style>
