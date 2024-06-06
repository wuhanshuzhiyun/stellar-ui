<template>
	<view class="ste-number-keyboard-root" :style="[cmpRootStyle]">
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
		return {};
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
	methods: {
		onChange(v) {
			console.log(v);
			if (v === 'backspace') this.$emit('backspace');
			else if (v === 'clear') this.$emit('clear');
			else if (v === 'confirm') this.$emit('confirm');
			else this.$emit('change', v);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-number-keyboard-root {
}
</style>
