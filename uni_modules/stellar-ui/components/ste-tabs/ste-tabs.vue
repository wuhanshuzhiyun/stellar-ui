<template>
	<view class="ste-tabs--root" :style="[cmpRootStyle]">
		<scroll-view
			class="tab-list"
			enhanced
			:scroll-x="scrollX"
			:scroll-with-animation="scrollX"
			:scroll-left="scrollLeft"
			:show-scrollbar="false"
			@scroll="onScroll"
		>
			<view
				class="tab-item"
				v-for="(tab, index) in cmpTabList"
				:key="index"
				:class="{
					active: tab.active,
					disabled: tab.disabled || disabled,
				}"
				@click="onClick(tab, index)"
			>
				<view class="tab-image" v-if="showImage">
					{{ tab.image }}
				</view>
				<view class="tab-title" v-if="showTitle">
					{{ tab.title }}
				</view>
				<view class="tab-sub-title" v-if="showSubtitle">
					{{ tab.subTitle }}
				</view>
			</view>
			<view class="tab-line-box" v-if="!showSubtitle">
				<view class="tab-line" :style="[cmpLineStyle]"></view>
			</view>
		</scroll-view>
		<!-- 插槽 -->
		<view class="tab-content">
			<view class="content-view">
				<slot name="default" />
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
let tabsData = {
	getParent() {
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
		// 是否显示图片
		showImage: {
			type: Boolean,
			default: () => false,
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
			default: () => '#000000',
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
			viewScrollLeft: 0,
			scrollLeft: 0,
			showComponent: false,
			tabPropsList: [],
			listEl: null,
			tabEls: [],
		};
	},
	beforeCreate() {
		tabsData.getParent = tabsData.getParent.bind(this);
	},
	mounted() {},
	computed: {
		cmpTabList() {
			return this.tabPropsList.map((item, index) => {
				switch (typeof this.active) {
					case 'string':
						item.active = this.active === item.name;
						break;
					case 'number':
						item.active = this.active === index;
						break;
				}
				return item;
			});
		},
		cmpRootStyle() {
			let tabWidth = isNaN(this.tabWidth) ? this.tabWidth : utils.rpx2px(this.tabWidth);
			let tabPadding = utils.rpx2px(48);
			if (this.divideNum > 0 && this.tabPropsList.length > 0 && this.tabPropsList.length <= this.divideNum) {
				tabWidth = 100 / this.tabPropsList.length + '%';
				tabPadding = 0;
			}
			const style = {
				'--tabs-color': this.color,
				'--tabs-line-width': isNaN(this.lineWidth) ? this.lineWidth : utils.rpx2px(this.lineWidth),
				'--tabs-line-height': isNaN(this.lineHeight) ? this.lineHeight : utils.rpx2px(this.lineHeight),
				'--tabs-tab-width': tabWidth,
				'--tabs-tab-padding': `0 ${tabPadding}`,
				'--tabs-transition-duration': this.duration ? `${this.duration}s` : 0,
				'--tabs-tab-space': isNaN(this.tabSpace) ? this.tabSpace : utils.rpx2px(this.tabSpace),
				'--tabs-offset-top': isNaN(this.offsetTop) ? this.offsetTop : utils.rpx2px(this.offsetTop),
				'--tabs-tab-color': this.tabColor,
				'--tabs-active-tab-color': this.activeTabColor,
				...utils.bg2style(this.background),
				opacity: this.showComponent ? '1' : '0',
			};
			console.log(this.tabEls, style);
			return style;
		},
		cmpActiveIndex() {
			return this.cmpTabList.findIndex((m) => m.active);
		},
		cmpActiveEl() {
			if (this.cmpActiveIndex === -1) return null;
			const activeEl = this.tabEls[this.cmpActiveIndex];
			return activeEl;
		},
		cmpLineStyle() {
			const width = isNaN(this.lineWidth) ? this.lineWidth : utils.rpx2px(this.lineWidth);
			const display = this.tabEls.length ? 'block' : 'none';
			let marginLeft = 0;
			if (this.cmpActiveIndex !== -1) {
				const activeEl = this.tabEls[this.cmpActiveIndex];
				if (activeEl) {
					marginLeft = activeEl.left - this.listEl.left + (activeEl.width - width.slice(0, -2)) / 2;
					marginLeft += 'px';
				}
			}
			console.log('222222222222', this.cmpActiveIndex, display, marginLeft);
			return { marginLeft, display };
		},
		// 是否可滑动
		scrollX() {
			return this.tabPropsList.length > this.divideNum;
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
		active: {
			handler(v) {
				this.scrollToActive();
			},
			immediate: true,
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
				this.$nextTick(async () => {
					this.listEl = await utils.querySelector('.tab-list', this);
					this.tabEls = await utils.querySelector('.tab-list>.tab-item', this, true);
					console.log('111111111-1', this.listEl);
					console.log('111111111-2', this.tabEls);
				});
			});
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
		onScroll(e) {
			this.viewScrollLeft = e?.detail?.scrollLeft || 0;
		},
		scrollToActive() {
			this.$nextTick(async () => {
				const activeEl = await utils.querySelector('.tab-list>.tab-item.active', this);
				if (!activeEl) return;
				const viewLeft = this.listEl?.left || 0;
				const viewRight = this.pullDown ? this.listEl?.right - 35 : this.listEl?.right || 0;
				if (activeEl.left - viewLeft < 0) {
					console.log('向左侧滑动');
					// 如果是在左侧非显示区域内
					this.viewScrollLeft += activeEl.left - viewLeft;
					this.scrollLeft = this.viewScrollLeft;
				} else if (activeEl.right - viewRight > 0) {
					console.log('向右侧滑动');
					// 判断是否在右侧非显示区域内
					this.viewScrollLeft += activeEl.right - viewRight;
					this.scrollLeft = this.viewScrollLeft;
				}
			});
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
			padding: var(--tabs-tab-padding);
			display: inline-block;
			text-align: center;
			& + .tab-item {
				margin-left: var(--tabs-tab-space);
			}

			.tab-image {
				height: 90rpx;
				width: 90rpx;
				border-radius: 18rpx;
				overflow: hidden;
				border: 2px soilid transparent;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.tab-title {
				line-height: 40rpx;
				font-size: 28rpx;
				color: var(--tabs-tab-color);
			}
			.tab-sub-title {
				line-height: 40rpx;
				font-size: 24rpx;
				width: var(--tabs-line-width);
				border-radius: 20rpx;
				text-align: center;
				margin: 0 auto;
				color: var(--tabs-tab-color);
			}

			&.active {
				.tab-image {
					border-color: var(--tabs-color);
				}
				.tab-title {
					color: var(--tabs-active-tab-color);
					font-weight: bold;
				}
				.tab-sub-title {
					background-color: var(--tabs-color);
					color: #ffffff;
				}
			}
			&.disabled {
				cursor: no-drop;
				.tab-title,
				.tab-sub-title {
					color: #bbb;
				}
			}
		}

		.tab-line-box {
			width: 100%;
			height: var(--tabs-line-height);
			margin-top: 4rpx;
			.tab-line {
				background-color: var(--tabs-color);
				transition-duration: var(--tabs-transition-duration);
				width: var(--tabs-line-width);
				height: var(--tabs-line-height);
				border-radius: 4rpx;
			}
		}
	}
	.tab-content {
		width: 100%;
		.content-view {
		}
	}
}
</style>
