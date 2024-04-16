<template>
	<text
		:style="[cmpRootCssVar]"
		class="ste-text-root"
		:class="{ 'ste-text-lines': lines > 0 }"
		:selectable="selectable"
		:user-select="selectable"
		:space="space"
		:decode="decode"
		:number-of-lines="lines"
	>
		<slot></slot>
	</text>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-text 文本
 * @description 文本组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-text
 * @property {Boolean} selectable 文本是否可选 默认 false
 * @property {String} space 以何种方式显示连续空格
 * @property {Boolean} decode 是否解码 默认 false
 * @property {Number} lines 文本显示的行数，如果设置，超出此行数，将会显示省略号
 */

export default {
	group: '基础组件',
	title: 'Text 文本',
	name: 'ste-text',
	props: {
		selectable: {
			type: Boolean,
			default: false,
		},
		space: {
			type: String,
			default: '',
		},
		decode: {
			type: Boolean,
			default: false,
		},
		lines: {
			type: Number,
			default: undefined,
		},
	},
	data() {
		return {};
	},
	computed: {
		cmpRootCssVar() {
			return { '--overflow-lines': this.lines };
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-text-root {
	&.ste-text-lines {
		/* #ifdef MP-WEIXIN || H5 */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: var(--overflow-lines);
		overflow: hidden;
		/* #endif */
	}
}
</style>
