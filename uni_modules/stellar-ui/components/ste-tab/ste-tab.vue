<template>
	<view class="ste-tab--root" :style="{ width: width }" :class="{ active: cmpActive }">
		<slot name="default" />
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-tab 标签页项
 * @description 标签页项组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-tabs
 * @property {String}			type				组件类型
 * @event {Function}			click 点击事件
 */
export default {
	group: '基础组件',
	title: 'Tab 标签',
	name: 'ste-tab',
	inject: ['_tabsComponent'],
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

	data() {
		return {
			parent: {},
			width: '100%',
		};
	},
	mounted() {
		this.parent = this._tabsComponent.getParent();
		this.parent.updateTabs();
	},
	computed: {
		cmpActive() {
			const active = this._tabsComponent.props?.active;
			if (typeof active === 'number') {
				return active === this.index;
			}
			if (typeof active === 'string') {
				return active === this.name;
			}
			return false;
		},
		cmpDuration() {
			return this._tabsComponent.props?.duration;
		},
		cmpSwipeable() {
			return this._tabsComponent.props?.swipeable;
		},
	},
	watch: {
		'parent.listBoxEl'(v) {
			this.width = v?.width ? `${v.width}px` : '100%';
		},
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.ste-tab--root {
	width: 100%;
	flex-shrink: 0;
}
</style>
