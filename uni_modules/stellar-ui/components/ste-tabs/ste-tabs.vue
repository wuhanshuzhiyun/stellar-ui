<template>
	<view class="ste-tabs--root" :class="type" :style="[cmpRootStyle]">
		<view class="tab-list-box" :style="[cmpListBackground, { paddingRight: cmpPullDown ? '70rpx' : 0 }]">
			<scroll-view
				class="tab-list view-list"
				:class="{ 'open-down': openPullDown }"
				enhanced
				:scroll-x="cmpScrollX"
				:scroll-with-animation="cmpScrollX"
				:scroll-left="scrollLeft"
				:show-scrollbar="false"
				@scroll="onScroll"
			>
				<block v-for="(tab, index) in cmpTabList" :key="index">
					<view class="tab-space" v-if="index > 0" :style="{ height: `${cmpActiveTabEl.height}px` }">
						<view class="space-line" />
					</view>
					<view
						class="tab-item"
						:class="{
							active: tab.active,
							disabled: tab.disabled || disabled,
							start: index === 0,
						}"
						@click="onSelect(tab, index)"
					>
						<view class="tab-image" v-if="showImage">
							<ste-image :src="tab.image" />
						</view>
						<view class="tab-title" v-if="showTitle" :style="[cmpEllipsis, cmpTitleStyle]">
							{{ tab.title }}
						</view>
						<view class="tab-sub-title" v-if="showSubtitle" :style="[cmpEllipsis]">
							{{ tab.subTitle }}
						</view>
					</view>
				</block>
				<view class="tab-line-box" v-if="cmpShowLine">
					<view class="tab-line" :style="[cmpLineStyle]"></view>
				</view>
			</scroll-view>
			<view v-if="cmpPullDown" class="tab-pull-down" @click="onOpenDown">
				<ste-icon code="&#xe676;" size="10px" :color="titleColor" />
			</view>
			<view v-if="cmpPullDown" class="tab-pull-down-box" :class="{ open: openPullDown }">
				<view class="pull-down-content" :style="[cmpPullStyle]">
					<view class="content-tabs" :style="[cmpListBackground]">
						<view class="placeholder">{{ placeholder }}</view>
						<view class="tab-pull-down" @click="onCloseDown">
							<view class="pull-down-icon" :style="[cmpPullIconTransform]">
								<ste-icon code="&#xe676;" size="10px" :color="titleColor" />
							</view>
						</view>
					</view>
					<view class="tab-list" :style="[cmpPullListTransform]">
						<view
							class="tab-item"
							v-for="(tab, index) in cmpTabList"
							:key="index"
							:class="{
								active: tab.active,
								disabled: tab.disabled || disabled,
							}"
							@click="onSelect(tab, index)"
						>
							<view class="tab-image" v-if="showImage">
								<ste-image :src="tab.image" />
							</view>
							<view class="tab-title" v-if="showTitle" :style="[cmpEllipsis]">
								{{ tab.title }}
							</view>
							<view class="tab-sub-title" v-if="showSubtitle" :style="[cmpEllipsis]">
								{{ tab.subTitle }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- 内容区域 -->
			<ste-sliding
				:index="cmpActiveIndex"
				:childrenLength="cmpTabList.length"
				:duration="duration"
				:disabledIndexs="cmpDisabledIndexs"
				:disabled="!swipeable || lock || disabled"
				@change="onSliding"
			>
				<slot name="default" />
			</ste-sliding>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { getChildrenProps } from './utils.js';
/**
 * ste-tabs 标签页
 * @description 标签页组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-tabs
 * @property {String | Number} 	active  当前激活的选项，支持sync双向绑定（类型为number时tab绑定index，类型为string时tab绑定name）
 * @property {String}			type				组件类型
 * @value line 线性（默认）
 * @value card 卡片模式
 * @property {Boolean} 					showImage					是否显示图片
 * @property {Boolean} 					showTitle					是否显示标题
 * @property {Boolean} 					showSubtitle			是否显示子标题
 * @property {String}						color							主题色（滑块颜色，边框颜色，选中的背景色，激活下拉列表中选项颜色），默认#0090FF
 * @property {String} 					background				背景
 * @property {Number} 					duration					切换动画时长，默认0.3，单位秒
 * @property {String | Number}	lineWidth					底部条(或副标题)宽度，默认52，单位rpx
 * @property {String | Number}	lineHeight				底部条(或副标题)高度，默认6，单位rpx
 * @property {Boolean}					border						是否显示边框，仅在card模式下生效
 * @property {Boolean}					ellipsis					是否开启文本超长省略
 * @property {String | Number}	tabWidth					选项宽度，默认auto，单位rpx
 * @property {Number}						divideNum					均分最大数量，默认4，设置0则不均分
 * @property {String | Number}	tabSpace					选项间距，默认0，单位rpx
 * @property {Boolean}					sticky						是否开启吸顶
 * @property {Number | String}	offsetTop					吸顶距离
 * @property {Boolean} 					swipeable					是否开启手势滑动切换
 * @property {String} 					titleColor				主标题字体颜色和下拉列表中选项颜色，默认值#000000
 * @property {String} 					activeTitleColor		激活主标题字体颜色，默认值#000000
 * @property {Boolean} 					showGapLine				是否显示分割线，默认值false
 * @property {Boolean} 					lock							是否锁定（无法切换）
 * @property {Boolean} 					disabled					是否禁用
 * @property {Boolean} 					pullDown					是否有下拉选项（当选项数量大于均分数量时生效）
 * @property {String} 					placeholder				下拉占位符，默认值：请选择
 * @event {Function}						change 						选项改变监听,参数{index:number,...item}
 */
export default {
	group: '导航组件',
	title: 'Tabs 标签页',
	name: 'ste-tabs',
	props: {
		// 当前激活的选项支持sync双向绑定（类型为number时绑定index，类型为string时绑定name）
		active: {
			type: [Number, String],
			default: () => 0,
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
			default: () => '',
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
			type: [Number, String],
			default: () => 0,
		},
		// 是否使用粘性布局
		sticky: {
			type: Boolean,
			default: () => false,
		},
		// 粘性布局下吸顶时与顶部的距离，单位rpx
		offsetTop: {
			type: [String, Number],
			default: () => 0,
		},
		// 是否开启手势左右滑动切换
		swipeable: {
			type: Boolean,
			default: () => false,
		},
		// 主标题字体颜色和下拉列表中选项颜色
		titleColor: {
			type: String,
			default: () => '#000000',
		},
		// 激活主标题字体颜色
		activeTitleColor: {
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
			default: () => '请选择',
		},
		tabPadding: {
			type: [Number, String],
			default: () => 24,
		},
		imageWidth: {
			type: [Number, String],
			default: () => 80,
		},
		imageHeight: {
			type: [Number, String],
			default: () => 80,
		},
		imageRadius: {
			type: [Number, String],
			default: () => '50%',
		},
		imageBorderWidth: {
			type: [Number, String],
			default: () => 4,
		},
		showLine: {
			type: Boolean,
			default: () => true,
		},
		subColor: {
			type: String,
			default: () => '#000',
		},
		activeSubColor: {
			type: String,
			default: () => '#fff',
		},
		maskTop: {
			type: [String, Number],
			default: () => 0,
		},
		maskRight: {
			type: [String, Number],
			default: () => 0,
		},
		maskBottom: {
			type: [String, Number],
			default: () => 0,
		},
		maskLeft: {
			type: [String, Number],
			default: () => 0,
		},
		maskZindex: {
			type: [String, Number],
			default: () => 1001,
		},
	},

	provide() {
		return {
			_tabsComponent: { getParent: () => this },
		};
	},
	data() {
		return {
			dataActive: 0,
			viewScrollLeft: 0,
			scrollLeft: 0,
			showComponent: false,
			tabPropsList: [],
			listBoxEl: null,
			listEl: null,
			tabEls: [],
			openPullDown: false,
			pullTransform: false,
			_timeout: null,
		};
	},
	computed: {
		cmpTabList() {
			return this.tabPropsList.map((item, index) => {
				switch (typeof this.dataActive) {
					case 'string':
						item.active = this.dataActive === item.name;
						break;
					case 'number':
						item.active = this.dataActive === index;
						break;
				}
				return item;
			});
		},
		cmpDisabledIndexs() {
			const list = [];
			this.cmpTabList.forEach((m, i) => {
				if (m.disabled) list.push(i);
			});
			return list;
		},
		cmpRootStyle() {
			let tabCardBg = utils.Color.formatColor(this.titleColor, 0.05);
			let tabCardBgActive = utils.Color.formatColor(this.color, 0.1);
			let tabCardSubBg = this.color;
			let tabCardSubColor = '#fff';
			let activeTitleColor = this.activeTitleColor;
			let borderWidthStart = '0';
			let borderWidth = '0';
			if (this.type === 'card') {
				activeTitleColor = this.color;
				if (this.border) {
					tabCardBg = 'none';
					tabCardBgActive = this.color;
					tabCardSubBg = '#fff';
					tabCardSubColor = this.color;
					activeTitleColor = '#fff';
					borderWidthStart = '1px';
					borderWidth = '1px 1px 1px 0';
					if (this.tabSpace > 0) {
						borderWidth = '1px';
					}
				}
			}
			const tabSpace = utils.rpx2px(this.tabSpace);
			let tabSpaceLine = 0;
			if (this.showGapLine) {
				tabSpaceLine = '1px';
			}
			let tabWidth = utils.rpx2px(this.tabWidth);
			if (this.tabPropsList.length > 0 && this.tabPropsList.length <= this.divideNum) {
				const listWidth = this.listEl?.width || 375;
				const tabsWidth = listWidth - tabSpace.slice(0, -2) * (this.tabPropsList.length - 1);
				tabWidth = tabsWidth / this.tabPropsList.length + 'px';
			}

			const style = {
				'--tabs-color': this.color,
				'--tabs-card-background': tabCardBg,
				'--tabs-card-background-active': tabCardBgActive,
				'--tabs-card-sub-bg': tabCardSubBg,
				'--tabs-card-sub-color': tabCardSubColor,
				'--tabs-line-width': utils.rpx2px(this.lineWidth),
				'--tabs-line-height': utils.rpx2px(this.lineHeight),
				'--tabs-tab-width': tabWidth,
				'--tabs-tab-padding-bottom': this.cmpShowLine ? utils.rpx2px(4) : utils.rpx2px(24),
				'--tabs-transition-duration': this.duration ? `${this.duration}s` : 'inherit',
				'--tabs-tab-space': tabSpace,
				'--tabs-tab-space-line': tabSpaceLine,
				'--tabs-tab-border-width': borderWidth,
				'--tabs-tab-border-width-start': borderWidthStart,
				'--tabs-sticky': this.sticky ? 'sticky' : 'relative',
				'--tabs-offset-top': utils.rpx2px(this.offsetTop),
				'--tabs-title-color': this.titleColor,
				'--tabs-active-title-color': activeTitleColor,
				'--tabs-list-height': this.openPullDown && this.listEl ? `${this.listEl?.height}px` : 'initial',
				'--tabs-tab-padding': utils.rpx2px(this.tabPadding),
				'--tabs-image-width': utils.rpx2px(this.imageWidth),
				'--tabs-image-height': utils.rpx2px(this.imageHeight),
				'--tabs-image-radius': utils.rpx2px(this.imageRadius),
				'--tabs-image-border-width': utils.rpx2px(this.imageBorderWidth),
				'--tabs-sub-color': this.subColor,
				'--tabs-active-sub-color': this.activeSubColor,
				'--tabs-mask-top': utils.rpx2px(this.maskTop),
				'--tabs-mask-right': utils.rpx2px(this.maskRight),
				'--tabs-mask-bottom': utils.rpx2px(this.maskBottom),
				'--tabs-mask-left': utils.rpx2px(this.maskLeft),
				'--tabs-mask-zindex': this.maskZindex,
				opacity: this.showComponent ? '1' : '0',
				zIndex: this.openPullDown ? '1001' : 1,
			};
			return style;
		},
		cmpListBackground() {
			return utils.bg2style(this.background);
		},
		cmpActiveIndex() {
			return this.cmpTabList.findIndex((m) => m.active);
		},
		cmpActiveTabEl() {
			return this.tabEls[this.cmpActiveIndex] || {};
		},
		cmpLineStyle() {
			const width = utils.rpx2px(this.lineWidth);
			const display = this.tabEls.length ? 'block' : 'none';
			let marginLeft = 0;
			if (this.cmpActiveIndex !== -1) {
				const activeEl = this.tabEls[this.cmpActiveIndex];
				if (activeEl) {
					marginLeft = activeEl.left - this.listEl.left + (activeEl.width - width.slice(0, -2)) / 2;
					marginLeft += 'px';
				}
			}
			return {
				marginLeft,
				display,
			};
		},
		// 是否可滑动
		cmpScrollX() {
			return this.divideNum > 0 && this.tabPropsList.length > this.divideNum;
		},
		// 是否有下拉
		cmpPullDown() {
			return this.cmpScrollX && this.pullDown;
		},
		// 下拉区域样式
		cmpPullStyle() {
			if (!this.listBoxEl || !this.openPullDown) return {};
			const style = {};
			style.top = `${this.listBoxEl.top}px`;
			style.left = `${this.listBoxEl.left}px`;
			style.width = `${this.listBoxEl.width}px`;
			return style;
		},
		cmpPullListTransform() {
			return { transform: `translateY(${this.pullTransform ? '0' : '-100%'})` };
		},
		cmpPullIconTransform() {
			return { transform: `rotate(${this.pullTransform ? '180deg' : '0'})` };
		},
		cmpEllipsis() {
			const style = {};
			if (this.ellipsis) {
				style.whiteSpace = 'nowrap';
				style.textOverflow = 'ellipsis';
			}
			return style;
		},
		cmpTitleStyle() {
			const style = {};
			if (this.showSubtitle) {
				style.fontWeight = 'bold';
				style.fontSize = utils.rpx2px(32);
			}
			return style;
		},
		cmpShowLine() {
			return this.showLine && !this.showSubtitle;
		},
	},
	watch: {
		active: {
			handler(v) {
				this.dataActive = v;
			},
			immediate: true,
		},
		cmpActiveIndex: {
			handler(v) {
				this.scrollToActive();
			},
			immediate: true,
		},
	},
	methods: {
		updateTabs() {
			this.showComponent = false;
			clearTimeout(this._timeout);
			this._timeout = setTimeout(() => {
				this.tabPropsList = getChildrenProps(this, 'ste-tab');
				this.$nextTick(async () => {
					this.listBoxEl = await utils.querySelector('.tab-list-box', this);
					this.listEl = await utils.querySelector('.tab-list-box .tab-list.view-list', this);
					this.tabEls = await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item', this, true);
					this.showComponent = true;
				});
			});
		},
		async onSelect(tab, index) {
			if (this.lock || tab.disabled || this.disabled) return false;
			if (this.openPullDown) await this.onCloseDown();
			let active = this.dataActive;
			if (typeof this.dataActive === 'string') {
				active = tab.name;
			} else if (typeof this.dataActive === 'number') {
				active = index;
			}
			this.dataActive = active;
			this.$emit('update:active', active);
			this.$emit('change', {
				index,
				...tab,
			});

			return true;
		},
		onScroll(e) {
			this.viewScrollLeft = e?.detail?.scrollLeft || 0;
		},
		scrollToActive() {
			this.$nextTick(async () => {
				const activeEl = await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item.active', this);
				if (!activeEl) return;
				let tabEls = this.tabEls;
				if (!tabEls[this.cmpActiveIndex]) {
					tabEls = await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item', this, true);
				}
				let listEl = this.listEl;
				if (!listEl) {
					listEl = await utils.querySelector('.tab-list-box .tab-list.view-list', this);
				}
				const scrollLeft = utils.scrollViewX({
					viewLeft: activeEl.left,
					viewRight: activeEl.right,
					boxLeft: listEl.left,
					boxRight: listEl.right,
					prevWidth: tabEls[this.cmpActiveIndex - 1]?.width || 0,
					nextWidth: tabEls[this.cmpActiveIndex + 1]?.width || 0,
					scrollLeft: this.viewScrollLeft,
				});
				this.viewScrollLeft = scrollLeft;
				this.scrollLeft = scrollLeft;
			});
		},
		onOpenDown() {
			return new Promise(async (resolve, reject) => {
				this.listBoxEl = await utils.querySelector('.tab-list-box', this);
				this.openPullDown = true;
				setTimeout(() => {
					this.pullTransform = true;
					resolve();
				}, 20);
			});
		},
		onCloseDown() {
			this.pullTransform = false;
			setTimeout(() => {
				this.openPullDown = false;
				resolve();
			}, 200);
		},
		onSliding(index) {
			if (this.disabled) return;
			const tab = this.cmpTabList[index];
			this.onSelect(tab, index);
		},
	},
};
</script>

<!-- 默认线状样式 -->
<style lang="scss" scoped>
.ste-tabs--root {
	display: block;
	width: 100%;
	position: relative;
	& > .tab-list-box {
		position: var(--tabs-sticky);
		top: var(--tabs-offset-top);
		width: 100%;
		background: #fff;
		z-index: 1001;
		.tab-list {
			width: 100%;
			white-space: nowrap;
			overflow-x: auto;
			.tab-space {
				display: inline-flex;
				vertical-align: bottom;
				width: var(--tabs-tab-space);
				min-width: var(--tabs-tab-space-line);
				align-items: center;
				justify-content: center;
				.space-line {
					width: var(--tabs-tab-space-line);
					background-color: rgba(180, 180, 180, 0.3);
					height: 60%;
				}
			}
			.tab-item {
				display: inline-block;
				vertical-align: bottom;
				width: var(--tabs-tab-width);
				padding: 24rpx var(--tabs-tab-padding);
				padding-bottom: var(--tabs-tab-padding-bottom);
				text-align: center;
				white-space: initial;
				.tab-image {
					width: var(--tabs-image-width);
					height: var(--tabs-image-height);
					border-radius: var(--tabs-image-radius);
					border-width: var(--tabs-image-border-width);
					border-style: solid;
					border-color: transparent;
					overflow: hidden;
					margin: 0 auto;
					image {
						width: 100%;
						height: 100%;
					}
					& + .tab-sub-title {
						margin-top: 8rpx;
					}
				}
				.tab-title {
					max-width: 100%;
					height: 48rpx;
					overflow: hidden;
					line-height: 48rpx;
					font-size: 28rpx;
					color: var(--tabs-title-color);
					word-break: break-all;
					margin: 0 auto;
					& + .tab-sub-title {
						margin-top: 4rpx;
					}
				}
				.tab-sub-title {
					width: 100%;
					height: 42rpx;
					max-width: 100%;
					overflow: hidden;
					line-height: 42rpx;
					font-size: 28rpx;
					border-radius: 21rpx;
					text-align: center;
					margin: 0 auto;
					color: var(--tabs-sub-color);
				}

				&.active {
					.tab-image {
						border-color: var(--tabs-color);
					}
					.tab-title {
						color: var(--tabs-active-title-color);
						font-weight: bold;
					}
					.tab-sub-title {
						background-color: var(--tabs-color);
						color: var(--tabs-active-sub-color);
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
				height: call(var(--tabs-line-height) + 8rpx);
				padding: 4rpx 0;
				.tab-line {
					background-color: var(--tabs-color);
					transition-duration: var(--tabs-transition-duration);
					width: var(--tabs-line-width);
					height: var(--tabs-line-height);
					border-radius: 4rpx;
				}
			}

			&.open-down {
				opacity: 0;
				pointer-events: none;
			}
		}
		.tab-pull-down {
			width: 70rpx;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(255, 255, 255, 0.45);
			box-shadow: -5px 0 5px rgba(245, 245, 245, 0.5);
			display: flex;
			align-items: center;
			justify-content: center;
			.pull-down-icon {
				width: 10px;
				height: 10px;
				display: flex;
				align-items: center;
				justify-content: center;
				transition-duration: 0.3s;
			}
		}
		.tab-pull-down-box {
			display: none;
			position: fixed;
			background-color: rgba(0, 0, 0, 0.45);
			z-index: 1001;
			top: var(--tabs-mask-top);
			right: var(--tabs-mask-right);
			bottom: var(--tabs-mask-bottom);
			left: var(--tabs-mask-left);
			&.open {
				display: block;
			}
			.pull-down-content {
				width: 100%;
				position: absolute;
				height: initial;
				display: block;
				overflow: hidden;
				.content-tabs {
					width: 100%;
					height: var(--tabs-list-height);
					position: relative;
					box-shadow: 0 5px 5px rgba(245, 245, 245, 0.5);
					z-index: 10;
					background-color: #ffffff;
					.placeholder {
						display: flex;
						height: 100%;
						align-items: center;
						padding: 0 24rpx;
						color: var(--tabs-title-color);
						font-size: 28rpx;
					}
				}
				.tab-list {
					display: grid;
					grid-template-columns: 25% 25% 25% 25%;
					grid-row-gap: 30rpx;
					flex-wrap: wrap;
					position: relative;
					z-index: 1;
					background-color: #ffffff;
					border-radius: 0 0 24rpx 24rpx;
					padding: 30rpx 0;
					transition-duration: 0.3s;
					transform: translateY(-100%);
					.tab-item {
						width: 100%;
						margin: 0;
						padding: 0;
						&.active {
							.tab-title {
								color: var(--tabs-color);
							}
						}
					}
				}
			}
		}
	}
	& > .content {
		padding-top: 24rpx;
	}
}
</style>

<!-- card样式 -->
<style lang="scss" scoped>
.ste-tabs--root.card {
	.tab-list-box {
		.tab-list {
			padding: 0;
			.tab-item {
				padding: 12rpx 24rpx;
				background-color: var(--tabs-card-background);
				border-width: var(--tabs-tab-border-width);
				border-style: solid;
				border-color: var(--tabs-color);
				&.start {
					border-width: var(--tabs-tab-border-width-start);
				}

				&.active {
					background-color: var(--tabs-card-background-active);
					.tab-sub-title {
						background-color: var(--tabs-card-sub-bg);
						color: var(--tabs-card-sub-color);
					}
				}
				&.disabled {
					cursor: no-drop;
					background-color: #f5f5f5;
					.tab-title,
					.tab-sub-title {
						color: #bbb;
					}
				}
			}

			.tab-line-box {
				display: none;
			}
		}

		.tab-pull-down-box {
			&.open {
				.pull-down-content {
					.tab-list {
						.tab-item {
							background-color: initial;
						}
					}
				}
			}
		}
	}
}
</style>
