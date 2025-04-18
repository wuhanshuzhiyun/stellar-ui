<template>
	<view class="number-keyboard" :style="[cmpRootStyle]">
		<view class="number-keyboard-left">
			<block v-for="(num, index) in list" :key="num">
				<view class="number-keyboard-item" data-test="number-keyboard-item" :class="{
					span3: list.length % 3 == 1 && index === list.length - 1,
					span2: list.length % 3 == 2 && index === list.length - 2,
					clear: num === 'clear',
				}" @click="onChange(num)">
					<view v-if="['backspace', 'clear'].indexOf(num) !== -1">
						<ste-icon v-if="num === 'backspace'" code="&#xe6a7;" :color="textColor" :size="textSize" />
						<text v-else-if="num === 'clear'">清除</text>
					</view>
					<view v-else>
						{{ num }}
					</view>
				</view>
			</block>
		</view>
		<view class="number-keyboard-right" v-if="rightKeys">
			<view class="number-keyboard-item" data-test="number-keyboard-item" @click="onChange('backspace')">
				<ste-icon code="&#xe6a7;" :color="textColor" :size="textSize" />
			</view>
			<view class="number-keyboard-item clear" data-test="number-keyboard-item" v-if="showClear"
				@click="onChange('clear')">清除</view>
			<view class="number-keyboard-item confirm" data-test="number-keyboard-item" :class="{ disabled }"
				@click="onChange('confirm')">
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
		list: { type: [Array, null] },
		confirmText: { type: String },
		disabled: { type: Boolean },
		showClear: { type: Boolean },
		textColor: { type: String },
		textSize: { type: [Number, String] },
		rightKeys: { type: Boolean },
	},
	computed: {
		cmpRootStyle() {
			let width = 8,
				height = 5;
			if (!this.rightKeys) {
				width = 7;
				height = 3;
			}
			// 向上取整，保证每行至少有3个按钮
			const rows = Math.ceil(this.list.length / 3);
			const w = width * (this.rightKeys ? 4 : 3);
			const h = height * rows;
			return {
				'--ste-number-keyboard-aspect': `${w} / ${h}`,
				'--ste-number-keyboard-columns': this.rightKeys ? '3fr 1fr' : '1fr',
				'--ste-number-keyboard-rows': `repeat(${rows}, 1fr)`,
				'--ste-number-keyboard-confirm-rows': `span ${this.showClear ? rows - 2 : rows - 1}`,
			};
		},
	},
	methods: {
		onChange(v) {
			if (v === 'confirm' && this.disabled) return;
			this.$emit('change', v);
		},
	},
};
</script>

<style lang="scss" scoped>
.number-keyboard {
	width: 100%;
	aspect-ratio: var(--ste-number-keyboard-aspect);
	grid-template-columns: var(--ste-number-keyboard-columns);
	display: grid;
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
		grid-template-rows: var(--ste-number-keyboard-rows);
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
			grid-row: var(--ste-number-keyboard-confirm-rows);
			font-size: var(--ste-number-keyboard-confirm-text-size);
			background: var(--ste-number-keyboard-confirm-bg);
			color: #fff;

			&:active {
				background-color: var(--ste-number-keyboard-confirm-bg-active);
			}

			&.disabled {
				background: rgba(238, 238, 238, 0.4) !important;
			}
		}

		&.span2 {
			grid-column: span 2;
		}

		&.span3 {
			grid-column: span 3;
		}
	}
}
</style>
