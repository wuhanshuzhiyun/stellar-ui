<template>
	<view class="ste-swipe-action-group-root">
		<slot></slot>
	</view>
</template>

<script>
import { parentMixin } from '../../utils/mixin.js';
/**
 * SwipeAction 滑动单元格
 * @description 滑动单元格
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-swipe-action
 * @property {String}	mode 模式
 * @value right 右侧滑动
 * @value left 左侧滑动
 * @value all 左右滑动
 * @property {Boolean}		autoClose		是否自动关闭其他swipe
 * @property {Boolean}		disabled		禁用
 * @property {String ｜ Number}	swipeThreshold	灵敏度（0-1之间的小数，数值越小灵敏度越高）
 * @property {String ｜ Number}	duration	动画时长，单位ms（默认300）
 * @property {Boolean}	leftIcon	是否显示左侧图标（默认false）
 * @property {Boolean}	rightIcon	是否显示右侧图标（默认false）
 * @event {Function} open	打开滑块时触发，参数为方向和下标('left'|'right',index)
 * @event {Function} close 关闭滑块时触发，参数为下标(index)
 */
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
		open(direction, index) {
			const child = this.children[index];
			if (!child) return;
			child.open(direction);
			this.closeRestsChildren(index);
		},
		close(index) {
			const child = this.children[index];
			if (!child) return;
			child.close();
		},

		closeRestsChildren(index) {
			if (!this.autoClose) return;
			this.children.forEach((child, i) => {
				if (index !== i) {
					child.close();
				}
			});
		},
		onchangeChildren(children) {
			children.forEach((child, index) => {
				child.onchange((x) => {
					if (x === 0) {
						this.$emit('close', index);
					} else {
						this.$emit('open', x > 0 ? 'left' : 'right', index);
						this.closeRestsChildren(index);
					}
				});
			});
		},
	},
};
</script>

<style></style>
