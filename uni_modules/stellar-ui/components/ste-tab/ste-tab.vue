<template>
	<view class="ste-tab-root" data-test="tab">
		<slot name="default" />
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { childMixin } from '../../utils/mixin.js';
/**
 * ste-tab 标签页选项
 * @description 标签页选项组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-tabs
 * @property {String}			title				标题
 * @property {String}			subTitle		副标题
 * @property {String}			image				图片，同image的src属性
 * @property {String}			name				标签唯一标识（当tabs的active值类型为string时，作为匹配激活的标识符）
 * @property {Number}			index				标签下标（当tabs的active值类型为number时，作为匹配激活的标识符）
 * @property {Boolean}		disabled		禁用当前标签
 */
export default {
	group: '基础组件',
	title: 'Tab 标签',
	name: 'ste-tab',
	mixins: [childMixin('ste-tabs')],
	props: {
		// 标题
		title: {
			type: [String, null],
			default: () => '',
		},
		// 副标题
		subTitle: {
			type: [String, null],
			default: () => '',
		},
		// 图片
		image: {
			type: [String, null],
			default: () => '',
		},
		// 标签名称，作为匹配的标识符
		name: {
			type: [String, null],
			default: () => '',
		},
		// 标签下标
		index: {
			type: [Number, null],
			default: () => null,
		},
		// 禁用
		disabled: {
			type: [Boolean, null],
			default: () => false,
		},
		showDot: {
			type: [Boolean, null],
			default: () => false,
		},
		badge: {
			type: [String, Number, null],
			default: () => 0,
		},
		showZeroBadge: {
			type: [Boolean, null],
			default: () => false,
		},
	},
	watch: {
		$props: {
			handler() {
				this.$nextTick(() => {
					this.parent.getChildrenProps();
				});
			},
			deep: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-tab-root {
	width: 100%;
}
</style>
