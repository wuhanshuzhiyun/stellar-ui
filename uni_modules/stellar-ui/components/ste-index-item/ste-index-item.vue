<template>
	<view class="ste-scroll-to-item-root">
		<slot />
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { childMixin } from '../../utils/mixin.js';
/**
 * ste-index-item 锚点项
 * @description 锚点项
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-scroll-to
 */
export default {
	name: 'ste-index-item',
	mixins: [childMixin('ste-index-list')],
	props: {
		title: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-scroll-to-item-root {
	width: 100%;
}
</style>
