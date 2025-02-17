<template>
	<scroll-view class="ste-scroll-to-root" scroll-y scroll-anchoring :scroll-top="scrollTop" :style="[cmpRootStyle]"
		@scroll="onScroll">
		<view class="ste-scroll-to-content" data-test="scroll-to">
			<slot />
		</view>
	</scroll-view>
</template>

<script>
import { parentMixin } from '../../utils/mixin.js';
import mixin from './mixin.js';

function isNum(num) {
	return typeof num === 'number' && !isNaN(num);
}

/**
 * ste-scroll-to 滚动锚点
 * @description 滚动锚点
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-scroll-to
 * @property {Number}					active 当前激活的锚点index，支持sync双向绑定，默认值0
 * @property {String|Number}	height 高度，默认值100%
 * @event {Function}					change 滚动锚点时触发
 */
export default {
	group: '导航组件',
	title: 'ScrollTo 滚动锚点',
	name: 'ste-scroll-to',
	mixins: [parentMixin('ste-scroll-to'), mixin],
};
</script>

<style lang="scss" scoped>
.ste-scroll-to-root {
	width: 100%;
	height: var(--scroll-to-height);
}
</style>
