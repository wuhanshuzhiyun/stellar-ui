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
			@clear="onClear"
			@change="onChange"
			@confirm="onConfirm"
			@backspace="onBackspace"
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
			default: () => false,
		},
		randomKeys: {
			type: Boolean,
			default: () => false,
		},
		confirmText: {
			type: String,
			default: () => '确定',
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
			return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', '.'];
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
			this.$emit('change', v);
		},
		onBackspace() {
			this.$emit('backspace');
		},
		onClear() {
			this.$emit('clear');
		},
		onConfirm() {
			this.$emit('confirm');
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-number-keyboard-root {
}
</style>
