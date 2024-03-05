<template>
	<!-- 富文本组件 -->
	<view style="overflow: hidden">
		<rich-text
			:nodes="replaceVerticalAlign(text)"
			:user-select="userSelect"
			class="rich-text"
			:space="ensp"
		></rich-text>
	</view>
</template>
<script>
import utils from '@/common/utils.js';

/**
 * ste-rich-text 按钮
 * @description 富文本组件
 * @tutorial http://172.16.114.51:5050/pc/index/index?name=ste-rich-text
 * @property {String} text 富文本值
 * @property {String} space 显示连续空格 默认值 nbsp
 * @value ensp 中文字符空格一半大小 {String}
 * @value emsp 中文字符空格大小 {String}
 * @value nbsp 根据字体设置的空格大小 {String}
 * @property {Boolean} userSelect 文本是否可选 默认 false
 */
export default {
	group: '表单组件',
	title: 'Rich Text 富文本',
	name: 'ste-rich-text',
	props: {
		text: {
			type: String,
			default: '',
		},
		space: {
			type: String,
			default: 'nbsp',
		},
		userSelect: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {};
	},
	methods: {
		replaceVerticalAlign(text) {
			let html = text;
			html = utils.richTextTagAddStyle(html, 'p', ['margin', 'margin-top'], ';margin-top:0');
			html = utils.richTextTagAddStyle(html, 'p', ['margin', 'margin-bottom'], ';margin-bottom:0');
			html = utils.richTextTagAddStyle(html, 'img', 'vertical-align', ';vertical-align:top');
			return html;
		},
	},

	mounted() {},
};
</script>
<style lang="scss" scoped></style>
