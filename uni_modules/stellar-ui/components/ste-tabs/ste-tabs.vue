<template>
	<view class="ste-tabs--root" :style="[cmpRootStyle]">
		<view class="tab-list">
			<view
				class="tab-item"
				v-for="(tab, index) in tabPropsList"
				:key="index"
				:class="{
					active: tabActive(tab, index),
					disabled: tab.disabled || disabled,
				}"
				@click="onClick(tab, index)"
			>
				<view class="tab-image">
					{{ tab.image }}
				</view>
				<view class="tab-title">
					{{ tab.title }}
				</view>
				<view class="tab-subTitle">
					{{ tab.subTitle }}
				</view>
			</view>
			<view class="tab-line-box">
				<view class="tab-line"></view>
			</view>
		</view>
		<!-- 插槽 -->
		<slot name="default" />
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
let tabsData = {
	getParent() {
		console.log('getParent-this', this);
		return this;
	},
};
let timeout;

/**
 * ste-tabs 标签页
 * @description 标签页组件
 * @tutorial http://172.16.114.51:5050/pc/index/index?name=ste-tabs
 * @property {String}			type				组件类型
 * @event {Function}			click 点击事件
 */
export default {
	group: '基础组件',
	title: 'Tabs 标签页',
	name: 'ste-tabs',
	props: {
		// 当前激活的选项（支持v-model双向绑定）（类型为number时绑定index，类型为string时绑定name）
		active: {
			type: [Number, String],
			default: () => null,
		},
		// 样式风格类型，可选值为 line  card
		type: {
			type: String,
			default: () => 'line',
		},
		// 是否显示主标题
		showTitle: {
			type: Boolean,
			default: () => true,
		},
		// 是否显示副标题
		showSubtitle: {
			type: Boolean,
			default: () => false,
		},
		// 是否显示图片
		showImage: {
			type: Boolean,
			default: () => false,
		},
		// 主题色（滑块颜色，边框颜色，选中的背景色，激活下拉列表中选项颜色）
		color: {
			type: String,
			default: () => '#0090FF',
		},
		// 背景
		background: {
			type: String,
			default: () => 'none',
		},
		// 动画时间，单位秒，设置为 0 可以禁用动画
		duration: {
			type: [String, Number],
			default: () => 0.3,
		},
		// 底部条宽度，默认单位rpx
		lineWidth: {
			type: [String, Number],
			default: () => 52,
		},
		// 底部条高度，默认单位rpx
		lineHeight: {
			type: [String, Number],
			default: () => 6,
		},
		// 是否显示标签栏外边框，仅在 type="line" 时有效
		border: {
			type: Boolean,
			default: () => false,
		},
		// 是否省略过长的标题文字
		ellipsis: {
			type: Boolean,
			default: () => false,
		},
		// tab内容的宽度
		tabWidth: {
			type: [String, Number],
			default: () => 'auto',
		},
		// tab等分数量，设置为 0 ，则不等分
		divideNum: {
			type: Number,
			default: () => 4,
		},
		// tab间距rpx
		tabSpace: {
			type: Number,
			default: () => 0,
		},
		// 是否使用粘性布局
		sticky: {
			type: Boolean,
			default: () => false,
		},
		// 是否开启手势左右滑动切换
		swipeable: {
			type: Boolean,
			default: () => false,
		},
		// 是否开启滚动导航
		scrollspy: {
			type: Boolean,
			default: () => false,
		},
		// 粘性布局下吸顶时与顶部的距离，单位rpx
		offsetTop: {
			type: [String, Number],
			default: () => 0,
		},
		// 选项字体颜色和下拉列表中选项颜色
		tabColor: {
			type: String,
			default: () => '#000000',
		},
		// 激活选项字体颜色
		activeTabColor: {
			type: String,
			default: () => '#0090FF',
		},
		// 是否显示分隔符
		showGapLine: {
			type: Boolean,
			default: () => false,
		},
		// 是否锁定tab(无法切换)
		lock: {
			type: Boolean,
			default: () => false,
		},
		// 是否禁用tab(所有功能失效)
		disabled: {
			type: Boolean,
			default: () => false,
		},
		// 是否有下拉选择按钮
		pullDown: {
			type: Boolean,
			default: () => false,
		},
		// 下拉占位符
		placeholder: {
			type: String,
			default: () => '选择类别',
		},
	},
	provide: { tabsData },
	data() {
		return {
			showComponent: false,
			tabPropsList: [],
			tabEls: [],
		};
	},
	beforeCreate() {
		tabsData.getParent = tabsData.getParent.bind(this);
	},
	mounted() {},
	computed: {
		cmpRootStyle() {
			let tabWidth = isNaN(this.tabWidth) ? this.tabWidth : utils.rpx2px(this.tabWidth);
			let tabPadding = utils.rpx2px(48);
			if (this.divideNum > 0 && this.tabPropsList.length <= this.divideNum) {
				tabWidth = 100 / this.divideNum + '%';
				tabPadding = 0;
			}
			const style = {
				'--tabs-color': this.color,
				'--tabs-line-width': isNaN(this.lineWidth) ? this.lineWidth : utils.rpx2px(this.lineWidth),
				'--tabs-line-height': isNaN(this.lineHeight) ? this.lineHeight : utils.rpx2px(this.lineHeight),
				'--tabs-tab-width': tabWidth,
				'--tabs-tab-padding': `0 ${tabPadding}`,
				'--tabs-tab-space': isNaN(this.tabSpace) ? this.tabSpace : utils.rpx2px(this.tabSpace),
				'--tabs-offset-top': isNaN(this.offsetTop) ? this.offsetTop : utils.rpx2px(this.offsetTop),
				'--tabs-tab-color': this.tabColor,
				'--tabs-active-tab-color': this.activeTabColor,
			};

			Object.assign(style, { opacity: this.showComponent ? '1' : '0' }, utils.bg2style(this.background));
			return style;
		},
	},
	watch: {
		$props: {
			handler(v) {
				tabsData.props = v;
			},
			immediate: true,
			deep: true,
		},
	},

	methods: {
		updateTabs() {
			this.showComponent = false;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				let tabPropsList = [];
				// #ifdef MP-WEIXIN | MP-ALIPAY
				const children = this.$children || [];
				children.forEach((tab) => tabPropsList.push({ ...tab.$props }));
				// #endif
				// #ifdef H5
				const children = this.$slots.default || [];
				children.forEach((tab) => tabPropsList.push({ ...tab.componentOptions.propsData }));
				// #endif
				this.tabPropsList = tabPropsList;
				this.showComponent = true;
				setTimeout(async () => {
					this.tabEls = await utils.querySelector('.tab-list>.tab-item', this, true);
				}, 1000);
			});
		},
		tabActive(tab, index) {
			let bool = false;
			switch (typeof this.active) {
				case 'string':
					bool = this.active === tab.name;
					break;
				case 'number':
					bool = this.active === index;
					break;
			}
			return bool;
		},
		onClick(tab, index) {
			if (tab.disabled || this.disabled) return;
			let active = this.active;
			if (typeof this.active === 'string') {
				active = tab.name;
			} else if (typeof this.active === 'number') {
				active = index;
			}
			this.$emit('update:active', active);
			this.$emit('change', { index, ...tab });
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-tabs--root {
	display: block;
	width: 100%;
	position: relative;
	.tab-list {
		width: 100%;
		white-space: nowrap;
		overflow-x: auto;
		.tab-item {
			width: var(--tabs-tab-width);
			color: var(--tabs-tab-color);
			padding: var(--tabs-tab-padding);
			display: inline-block;
			text-align: center;
			& + .tab-item {
				margin-left: var(--tabs-tab-space);
			}
			&.active {
				color: var(--tabs-active-tab-color);
			}
			&.disabled {
				color: #bbb;
				cursor: no-drop;
			}
		}

		.tab-line-box {
			width: 100%;
			height: var(--tabs-line-height);
			.tab-line {
				width: var(--tabs-line-width);
				height: 100%;
				background-color: var(--tabs-color);
			}
		}
	}
}
</style>
