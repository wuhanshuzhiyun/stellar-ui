<template>
	<view class="ste-number-keyboard-root" :style="[cmpRootStyle]">
		<block v-if="mode === 'popup'">
			<ste-popup :show.sync="dataShow" @close="onClose" position="bottom" :show-close="false">
				<view style="padding: 30rpx 30rpx 60rpx 30rpx; background-color: #f5f5f5">
					<view class="keyboard-popup-head">
						<view></view>
						<view class="keyboard-title">
							<slot>数字键盘</slot>
						</view>
						<view class="keyboard-close" @click="onClose">
							<ste-icon code="&#xe676;" size="36" />
						</view>
					</view>
					<keyboard
						:list="cmpNumbers"
						:confirmText="confirmText"
						:disabled="confirmDisabled"
						:showClear="showClear"
						:textColor="textColor"
						:textSize="textSize"
						:rightKeys="rightKeys"
						@change="onChange"
					/>
				</view>
			</ste-popup>
		</block>
		<block v-else>
			<keyboard
				:list="cmpNumbers"
				:confirmText="confirmText"
				:disabled="confirmDisabled"
				:showClear="showClear"
				:textColor="textColor"
				:textSize="textSize"
				:rightKeys="rightKeys"
				@change="onChange"
			/>
		</block>
	</view>
</template>

<script>
import keyboard from './keyboard.vue';
import utils from '../../utils/utils.js';
export default {
	group: '展示组件',
	title: 'NumberKeyboard 数字键盘',
	name: 'ste-number-keyboard',
	components: { keyboard },
	props: {
		value: {
			type: String,
			default: () => '',
		},
		mode: {
			type: String,
			default: () => 'popup',
		},
		show: {
			type: Boolean,
			default: () => false,
		},
		rightKeys: {
			type: Boolean,
			default: () => true,
		},
		randomKeys: {
			type: Boolean,
			default: () => false,
		},
		confirmText: {
			type: String,
			default: () => '确定',
		},
		customKeys: {
			type: Array,
			default: () => [],
		},
		confirmDisabled: {
			type: Boolean,
			default: () => false,
		},
		showClear: {
			type: Boolean,
			default: () => true,
		},
		textColor: {
			type: String,
			default: () => '#000',
		},
		textSize: {
			type: [Number, String],
			default: () => 48,
		},
		confirmBg: {
			type: String,
			default: () => '#0090ff',
		},
		confirmColor: {
			type: String,
			default: () => '#fff',
		},
	},
	data() {
		return {
			dataValue: '',
			dataShow: false,
		};
	},
	computed: {
		cmpNumbers() {
			let keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
			if (this.randomKeys) {
				utils.randomArray(keys);
			}

			if (Array.isArray(this.customKeys)) {
				keys.push(...this.customKeys);
			}

			if (!this.rightKeys) {
				const d = keys.length % 3;
				if (d === 1) {
					const end = keys.pop();
					keys.push('clear', end, 'backspace');
				} else {
					keys.push('clear', 'backspace');
				}
			}

			return keys;
		},

		cmpRootStyle() {
			const fontsize = utils.formatPx(this.textSize, 'num');
			return {
				'--ste-number-keyboard-text-color': this.textColor,
				'--ste-number-keyboard-text-size': isNaN(fontsize) ? fontsize : `${fontsize}px`,
				'--ste-number-keyboard-clear-text-size': isNaN(fontsize) ? fontsize : `${fontsize - 8}px`,
				'--ste-number-keyboard-confirm-text-size': isNaN(fontsize) ? fontsize : `${fontsize - 3}px`,
				'--ste-number-keyboard-confirm-bg': this.confirmBg,
				'--ste-number-keyboard-confirm-bg-active': utils.Color.formatColor(this.confirmBg, 0.8),
				'--ste-number-keyboard-confirm-color': this.confirmColor,
			};
		},
	},
	watch: {
		show: {
			handler(v) {
				this.dataShow = v;
			},
			immutable: true,
		},
		value: {
			handler(v) {
				this.dataValue = v;
			},
			immutable: true,
		},
	},

	methods: {
		async onChange(v) {
			if (v === 'confirm') {
				this.$emit('confirm', this.dataValue);
				this.onClose();
				return;
			}

			switch (v) {
				case 'backspace':
					this.dataValue = this.dataValue.slice(0, this.dataValue.length - 1);
					this.$emit('backspace');
					break;
				case 'clear':
					this.dataValue = '';
					this.$emit('clear');
					break;
				default:
					await this.beforInput(v);
					this.dataValue += v;
					this.$emit('click', v);
					break;
			}
			this.$emit('input', this.dataValue);
			this.$emit('change', this.dataValue);
			this.$emit('update:value', this.dataValue);
		},
		onClose() {
			this.dataShow = false;
			this.$emit('update:show', false);
		},
		async beforInput(v) {
			let next = true;
			const stop = new Promise((resolve, reject) => {
				this.$emit(
					'beforeinput',
					v,
					() => (next = false),
					() => resolve(),
					() => reject()
				);
			});
			if (!next) {
				console.log('beforeinput被阻止');
				await stop;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-number-keyboard-root {
	.keyboard-popup-head {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding-bottom: 30rpx;
		color: #888;
		.keyboard-close {
			&:active {
				background: rgba(200, 200, 200, 0.5);
			}
		}
	}
}
</style>
