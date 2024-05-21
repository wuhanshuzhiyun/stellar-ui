<template>
	<view class="ste-scroll-to-item-root" @resize="getData">
		<slot />
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { childMixin } from '../../utils/mixin.js';
/**
 * ste-scroll-to-item 锚点项
 * @description 锚点项
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-scroll-to
 */
export default {
	name: 'ste-scroll-to-item',
	mixins: [childMixin('ste-scroll-to')],
};
</script>

<style lang="scss" scoped>
.ste-scroll-to-item-root {
	width: 100%;
}
</style>
