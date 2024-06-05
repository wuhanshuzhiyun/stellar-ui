<template>
	<view class="ste-number-keyboard-root">
		<keyboard :list="cmpNumbers" @change="onChange" @confirm="onConfirm" @backspace="onBackspace" />
	</view>
</template>

<script>
import keyboard from './keyboard.vue';
export default {
	group: '展示组件',
	title: 'NumberKeyboard 数字键盘',
	name: 'ste-number-keyboard',
	components: { keyboard },
	data() {
		return {};
	},
	computed: {
		cmpNumbers() {
			let str = '1234567890';
			return str.split('');
		},
	},
	methods: {
		onChange(v) {
			this.$emit('change', v);
		},
		onBackspace() {
			this.$emit('backspace');
		},
		onConfirm() {
			this.$emit('confirm');
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-number-keyboard-root {
	padding: 20rpx;
	background-color: #f9f9f9;
}
</style>
