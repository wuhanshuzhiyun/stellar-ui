<template>
	<view class="ste-touch-swipe-item-root">
		<slot />
	</view>
</template>

<script>
import { childMixin } from '../../utils/mixin.js';
/**
 * ste-touch-swipe-item 手势切屏
 * @description 手势切屏组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-touch-swipe
 * @property {Boolean} 	disabled  当前面板是否禁用
 */
export default {
	name: 'ste-touch-swipe-item',
	mixins: [childMixin('ste-touch-swipe')],
	props: {
		disabled: {
			type: [Boolean, null],
			default: () => false,
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-touch-swipe-item-root {
	width: 100%;
	height: 100%;
	display: inline-block;
}
</style>
