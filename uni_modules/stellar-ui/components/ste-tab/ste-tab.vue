<template>
	<view class="ste-tab--root" :class="{ active: cmpActive }">
		<slot name="default" />
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-tab 标签页项
 * @description 标签页项组件
 * @tutorial http://172.16.114.51:5050/pc/index/index?name=ste-tabs
 * @property {String}			type				组件类型
 * @event {Function}			click 点击事件
 */
export default {
	group: '基础组件',
	title: 'Tabs 标签页',
	name: 'ste-tabs',
	props: {
		// 标题
		title: {
			type: String,
			default: () => '',
		},
		// 副标题
		subTitle: {
			type: String,
			default: () => '',
		},
		// 图片
		image: {
			type: String,
			default: () => '',
		},
		// 标签名称，作为匹配的标识符
		name: {
			type: String,
			default: () => '',
		},
		// 标签下标
		index: {
			type: Number,
			default: () => null,
		},
		// 禁用
		disabled: {
			type: Boolean,
			default: () => false,
		},
	},
	inject: ['tabsData'],
	data() {
		return {
			parent: {},
		};
	},
	mounted() {
		console.log('tab-tabsData', this.tabsData);
		this.parent = this.tabsData.getParent();
		this.parent.updateTabs();
		console.log(this.index);
	},
	computed: {
		cmpActive() {
			const active = this.tabsData.props?.active;
			if (typeof active === 'number') {
				return active === this.index;
			}
			if (typeof active === 'string') {
				return active === this.name;
			}
			return false;
		},
	},
	watch: {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.ste-tab--root {
	display: none;
	width: 100%;
	&.active {
		display: block;
	}
}
</style>
