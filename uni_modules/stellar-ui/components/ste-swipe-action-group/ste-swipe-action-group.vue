<template>
	<view class="ste-swipe-action-group-root">
		<slot></slot>
	</view>
</template>

<script>
import { parentMixin } from '../../utils/mixin.js';
export default {
	name: 'ste-swipe-action-group',
	mixins: [parentMixin('ste-swipe-action-group')],
	props: {
		mode: {
			type: String,
			default: () => 'right',
		},
		autoClose: {
			type: Boolean,
			default: () => true,
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		swipeThreshold: {
			type: [Number, String],
			default: () => 0.35,
		},
		duration: {
			type: [Number, String],
			default: () => 300,
		},
		leftIcon: {
			type: Boolean,
			default: () => false,
		},
		rightIcon: {
			type: Boolean,
			default: () => false,
		},
	},
	watch: {
		children: {
			handler(val) {
				this.onchangeChildren(val);
			},
			immediate: true,
		},
	},
	methods: {
		open({ name, direction }) {
			const child = this.children.find((c) => c.name === name);
			if (!child) return console.error(`未找到name为${name}的子项`);
			child.open(direction);
			if (this.autoClose) this.closeRestsChildren(name);
		},
		closeRestsChildren(name) {
			this.children.forEach((child) => {
				if (name !== child.name) child.close();
			});
		},
		onchangeChildren(children) {
			children.forEach((child) => {
				child.onchange((x) => {
					if (x === 0) this.$emit('close', child.name);
					else this.$emit('open', x > 0 ? 'left' : 'right');
				});
			});
		},
	},
};
</script>

<style></style>
