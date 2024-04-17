<template>
	<view class="ste-tabs-root" :class="type" :style="[cmpRootStyle]">
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
					<view
						class="tab-space"
						:class="{ 'show-tab-line': cmpShowLine }"
						v-if="index > 0"
						:style="{ height: `${cmpActiveTabEl.height}px` }"
					>
						<view class="space-line" />
					</view>
					<view
						class="tab-item"
						:class="{
							active: tab.active,
							disabled: tab.disabled || disabled,
							start: index === 0,
						}"
						@click="onClickTab(tab, index)"
					>
						<ste-badge :showDot="tab.showDot" :content="tab.badge" :showZero="tab.showZeroBadge">
							<view class="tab-image" v-if="showImage">
								<ste-image :src="tab.image" />
							</view>
							<view class="tab-title" v-if="showTitle" :style="[cmpEllipsis, cmpTitleStyle]">
								{{ tab.title }}
							</view>
							<view class="tab-sub-title" v-if="showSubtitle" :style="[cmpEllipsis]">
								{{ tab.subTitle }}
							</view>
						</ste-badge>
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
					<view class="tab-list" :style="[cmpListBackground, cmpPullListTransform]">
						<view
							class="tab-item"
							v-for="(tab, index) in cmpTabList"
							:key="index"
							:class="{
								active: tab.active,
								disabled: tab.disabled || disabled,
							}"
							@click="onClickTab(tab, index)"
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
			<ste-touch-swipe
				:index="cmpActiveIndex"
				:childrenLength="cmpTabList.length"
				:duration="duration"
				:disabledIndexs="cmpDisabledIndexs"
				:disabled="!swipeable || lock || disabled"
				@change="onSliding"
			>
				<slot name="default" />
			</ste-touch-swipe>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import props from './props.js';
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
 * @property {String | Number}	radius						圆角，默认0，单位rpx
 * @property {String} 					background				背景
 * @property {Number} 					duration					切换动画时长，默认0.3，单位秒
 * @property {Boolean}					showLine					底部条是否显示，默认true（显示副标题的情况下会自动隐藏）
 * @property {String | Number}	lineWidth					底部条宽度，默认52，单位rpx
 * @property {String | Number}	lineHeight				底部条高度，默认6，单位rpx
 * @property {Boolean}					border						是否显示边框，仅在card模式下生效
 * @property {Boolean}					ellipsis					是否开启文本超长省略
 * @property {String | Number}	tabWidth					选项宽度，默认auto，单位rpx
 * @property {String | Number}	tabPadding				选项内边距，默认24，单位rpx
 * @property {String | Number}	tabSpace					选项间距，默认0，单位rpx
 * @property {Number}						divideNum					均分最大数量，默认4，设置0则不均分
 * @property {Boolean}					sticky						是否开启吸顶
 * @property {Number | String}	offsetTop					吸顶距离
 * @property {Boolean} 					swipeable					是否开启手势滑动切换
 * @property {String} 					titleColor				主标题字体颜色和下拉列表中主标题颜色，默认值#000000
 * @property {String} 					activeTitleColor	激活主标题字体颜色，默认值#000000
 * @property {String | Number}	titleHeight				主标题高度，默认44，单位rpx
 * @property {String} 					subColor					子标题字体颜色和下拉列表中子标题颜色，默认值#000000
 * @property {String} 					activeSubColor		激活子标题字体颜色和下拉列表中子标题颜色，默认值#ffffff
 * @property {String | Number}	subTitleHeight		子标题高度，默认42，单位rpx
 * @property {String | Number}	subTitleRadius		子标题高度，默认21，单位rpx
 * @property {Number | String} 	imageWidth				图片宽度，默认80，单位rpx
 * @property {Number | String} 	imageHeight				图片高度，默认80，单位rpx
 * @property {Number | String} 	imageRadius				图片圆角，默认50%，单位rpx
 * @property {Number | String} 	imageBorderWidth	选中图片边框宽度，默认4，单位rpx
 * @property {Boolean} 					showGapLine				是否显示分割线，默认值false
 * @property {Boolean} 					lock							是否锁定（无法切换）
 * @property {Boolean} 					disabled					是否禁用
 * @property {Boolean} 					pullDown					是否有下拉选项（当选项数量大于均分数量时生效）
 * @property {String} 					placeholder				下拉占位符，默认值：请选择
 * @property {Number | String} 	maskTop						下拉蒙层顶部距离，默认0
 * @property {Number | String} 	maskRight					下拉蒙层右侧距离，默认0
 * @property {Number | String} 	maskBottom				下拉蒙层底部距离，默认0
 * @property {Number | String} 	maskLeft					下拉蒙层左侧距离，默认0
 * @property {Number} 					maskZindex				下拉蒙层层级，默认1001
 * @event {Function}						change 						选项改变监听,参数{index:number,...item}
 */
export default {
	group: '导航组件',
	title: 'Tabs 标签页',
	name: 'ste-tabs',
	props,
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
			_updateChildrenTimeout: null,
			_updateTabsTimeout: null,
		};
	},
	computed: {
		cmpTabList() {
			return this.tabPropsList.map((item, index) => {
				const tab = { ...item };
				switch (typeof this.dataActive) {
					case 'string':
						tab.active = this.dataActive === tab.name;
						break;
					case 'number':
						tab.active = this.dataActive === index;
						break;
				}
				if (tab.subTitle?.length > 6) {
					tab.subTitle = tab.subTitle.slice(0, 6);
				}
				return tab;
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
			const tabSpace = utils.formatPx(this.tabSpace);
			let tabSpaceLine = 0;
			if (this.showGapLine) {
				tabSpaceLine = '1px';
			}
			let tabWidth = utils.formatPx(this.tabWidth);
			if (this.tabPropsList.length > 0 && this.tabPropsList.length <= this.divideNum) {
				const listWidth = this.listEl?.width || 375;
				const tabsWidth = listWidth - tabSpace.slice(0, -2) * (this.tabPropsList.length - 1);
				tabWidth = tabsWidth / this.tabPropsList.length + 'px';
			}

			const style = {
				'--tabs-color': this.color,
				'--tabs-radius': utils.formatPx(this.radius),
				'--tabs-card-background': tabCardBg,
				'--tabs-card-background-active': tabCardBgActive,
				'--tabs-card-sub-bg': tabCardSubBg,
				'--tabs-card-sub-color': tabCardSubColor,
				'--tabs-line-width': utils.formatPx(this.lineWidth),
				'--tabs-line-height': utils.formatPx(this.lineHeight),
				'--tabs-tab-width': tabWidth,
				'--tabs-tab-padding': utils.formatPx(this.tabPadding),
				'--tabs-tab-padding-bottom': this.cmpShowLine ? utils.formatPx(4) : utils.formatPx(this.tabPadding),
				'--tabs-transition-duration': this.duration ? `${this.duration}s` : 'inherit',
				'--tabs-tab-space': tabSpace,
				'--tabs-tab-space-line': tabSpaceLine,
				'--tabs-tab-border-width': borderWidth,
				'--tabs-tab-border-width-start': borderWidthStart,
				'--tabs-sticky': this.sticky ? 'sticky' : 'relative',
				'--tabs-offset-top': utils.formatPx(this.offsetTop),
				'--tabs-title-color': this.titleColor,
				'--tabs-active-title-color': activeTitleColor,
				'--tabs-title-height': utils.formatPx(this.titleHeight),
				'--tabs-sub-title-height': utils.formatPx(this.subTitleHeight),
				'--tabs-sub-title-radius': utils.formatPx(this.subTitleRadius),
				'--tabs-list-height': this.openPullDown && this.listEl ? `${this.listEl?.height}px` : 'initial',
				'--tabs-image-width': utils.formatPx(this.imageWidth),
				'--tabs-image-height': utils.formatPx(this.imageHeight),
				'--tabs-image-radius': utils.formatPx(this.imageRadius),
				'--tabs-image-border-width': utils.formatPx(this.imageBorderWidth),
				'--tabs-sub-color': this.subColor,
				'--tabs-active-sub-color': this.activeSubColor,
				'--tabs-mask-top': utils.formatPx(this.maskTop),
				'--tabs-mask-right': utils.formatPx(this.maskRight),
				'--tabs-mask-bottom': utils.formatPx(this.maskBottom),
				'--tabs-mask-left': utils.formatPx(this.maskLeft),
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
			const width = utils.formatPx(this.lineWidth);
			const display = this.tabEls.length ? 'block' : 'none';
			let marginLeft = 0;
			if (this.cmpActiveIndex !== -1) {
				const activeEl = this.tabEls[this.cmpActiveIndex];
				if (activeEl) {
					marginLeft = activeEl.left - this.listEl?.left + (activeEl.width - width.slice(0, -2)) / 2;
					marginLeft += 'px';
				}
			}
			return { marginLeft, display };
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
				style.fontSize = utils.formatPx(32);
			}
			return style;
		},
		cmpShowLine() {
			return this.type === 'line' && this.showLine && !this.showSubtitle;
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
		cmpRootStyle() {
			clearTimeout(this._updateTabsTimeout);
			this._updateTabsTimeout = setTimeout(async () => {
				this.tabEls = await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item', this, true);
			}, 10);
		},
	},
	methods: {
		updateTabs() {
			this.showComponent = false;
			clearTimeout(this._updateChildrenTimeout);
			this._updateChildrenTimeout = setTimeout(() => {
				this.tabPropsList = utils.getChildrenProps(this, 'ste-tab');
				this.$nextTick(async () => {
					this.listBoxEl = await utils.querySelector('.tab-list-box', this);
					this.listEl = await utils.querySelector('.tab-list-box .tab-list.view-list', this);
					this.tabEls = await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item', this, true);
					this.showComponent = true;
				});
			});
		},
		onClickTab(tab, index) {
			this.$emit('click-tab', { index, ...tab });
			this.onSelect(tab, index);
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
			this.$emit('change', { ...tab, index });
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
.ste-tabs-root {
	display: block;
	width: 100%;
	position: relative;
	& > .tab-list-box {
		position: var(--tabs-sticky);
		top: var(--tabs-offset-top);
		width: 100%;
		background: #fff;
		z-index: 1001;
		border-radius: var(--tabs-radius);
		overflow: hidden;

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
				&.show-tab-line {
					align-items: flex-end;
					.space-line {
						height: calc(100% - 36rpx);
						transform: translateY(-6rpx);
					}
				}
			}
			.tab-item {
				display: inline-block;
				vertical-align: bottom;
				width: var(--tabs-tab-width);
				padding: var(--tabs-tab-padding);
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
					height: var(--tabs-title-height);
					line-height: var(--tabs-title-height);
					overflow: hidden;
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
					height: var(--tabs-sub-title-height);
					line-height: var(--tabs-sub-title-height);
					border-radius: var(--tabs-sub-title-radius);
					max-width: 100%;
					overflow: hidden;
					font-size: 28rpx;
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
			z-index: var(--tabs-mask-zindex);
			top: var(--tabs-mask-top);
			right: var(--tabs-mask-right);
			bottom: var(--tabs-mask-bottom);
			left: var(--tabs-mask-left);
			&.open {
				display: block;
			}
			.pull-down-content {
				width: 100%;
				position: fixed;
				height: initial;
				display: block;
				overflow: hidden;
				.content-tabs {
					width: 100%;
					height: var(--tabs-list-height);
					position: relative;
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
						padding: 0 24rpx;
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
}
</style>

<!-- card样式 -->
<style lang="scss" scoped>
.ste-tabs-root.card {
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
