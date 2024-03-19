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
						<view class="tab-title" v-if="showTitle">
							{{ tab.title }}
						</view>
						<view class="tab-sub-title" v-if="showSubtitle">
							{{ tab.subTitle }}
						</view>
					</view>
				</block>
				<view class="tab-line-box" v-if="!showSubtitle">
					<view class="tab-line" :style="[cmpLineStyle]"></view>
				</view>
			</scroll-view>
			<view v-if="cmpPullDown" class="tab-pull-down-box" :class="{ open: openPullDown }">
				<view class="pull-down-content" :style="[cmpPullStyle]">
					<view class="content-tabs" :style="[cmpListBackground]">
						<view class="placeholder">{{ placeholder }}</view>
						<view class="tab-pull-down" @click="onOpenDown">
							<view class="pull-down-icon">
								<ste-icon code="&#xe6c2;" size="20" :color="tabColor" />
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
							<view class="tab-title" v-if="showTitle">
								{{ tab.title }}
							</view>
							<view class="tab-sub-title" v-if="showSubtitle">
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
				:disabled="!swipeable || lock"
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
import props from './props.js';

let _tabsComponent = {
	getParent() {
		return this;
	},
};
let _timeout;
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
	mixins: [props],
	provide: { _tabsComponent },
	data() {
		return {
			viewScrollLeft: 0,
			scrollLeft: 0,
			showComponent: false,
			tabPropsList: [],
			listBoxEl: null,
			listEl: null,
			tabEls: [],
			openPullDown: false,
			pullListTransform: '-100%',
		};
	},
	beforeCreate() {
		_tabsComponent.getParent = _tabsComponent.getParent.bind(this);
	},
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
		cmpDisabledIndexs() {
			const list = [];
			this.cmpTabList.forEach((m, i) => {
				if (m.disabled) list.push(i);
			});
			return list;
		},
		cmpRootStyle() {
			let tabWidth = isNaN(this.tabWidth) ? this.tabWidth : utils.rpx2px(this.tabWidth);
			let tabPadding = utils.rpx2px(24);
			if (this.tabPropsList.length > 0 && this.tabPropsList.length <= this.divideNum) {
				tabWidth = 100 / this.tabPropsList.length + '%';
				tabPadding = 0;
			}
			let tabCardBg = utils.Color.formatColor(this.tabColor, 0.05);
			let tabCardBgActive = utils.Color.formatColor(this.color, 0.1);
			let tabCardSubBg = this.color;
			let tabCardSubColor = '#fff';
			let activeTabColor = this.activeTabColor;
			let borderWidthStart = '0';
			let borderWidth = '0';
			if (this.type === 'card') {
				activeTabColor = this.color;
				if (this.border) {
					tabCardBg = 'none';
					tabCardBgActive = this.color;
					tabCardSubBg = '#fff';
					tabCardSubColor = this.color;
					activeTabColor = '#fff';
					borderWidthStart = '1px';
					borderWidth = '1px 1px 1px 0';
					if (this.tabSpace > 0) {
						borderWidth = '1px';
					}
				}
			}
			let tabSpaceLine = 0;
			if (this.showGapLine) {
				tabSpaceLine = '1px';
			}

			const style = {
				'--tabs-color': this.color,
				'--tabs-card-background': tabCardBg,
				'--tabs-card-background-active': tabCardBgActive,
				'--tabs-card-sub-bg': tabCardSubBg,
				'--tabs-card-sub-color': tabCardSubColor,
				'--tabs-line-width': isNaN(this.lineWidth) ? this.lineWidth : utils.rpx2px(this.lineWidth),
				'--tabs-line-height': isNaN(this.lineHeight) ? this.lineHeight : utils.rpx2px(this.lineHeight),
				'--tabs-tab-width': tabWidth,
				'--tabs-tab-padding': `0 ${tabPadding}`,
				'--tabs-transition-duration': this.duration ? `${this.duration}s` : 'inherit',
				'--tabs-tab-space': isNaN(this.tabSpace) ? this.tabSpace : utils.rpx2px(this.tabSpace),
				'--tabs-tab-space-line': tabSpaceLine,
				'--tabs-tab-border-width': borderWidth,
				'--tabs-tab-border-width-start': borderWidthStart,
				'--tabs-sticky': this.sticky ? 'sticky' : 'relative',
				'--tabs-offset-top': isNaN(this.offsetTop) ? this.offsetTop : utils.rpx2px(this.offsetTop),
				'--tabs-tab-color': this.tabColor,
				'--tabs-active-tab-color': activeTabColor,
				'--tabs-list-height': this.openPullDown && this.listEl ? `${this.listEl?.height}px` : 'initial',
				opacity: this.showComponent ? '1' : '0',
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
			return { transform: `translateY(${this.pullListTransform})` };
		},
	},
	watch: {
		$props: {
			handler(v) {
				_tabsComponent.props = v;
			},
			immediate: true,
			deep: true,
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
			clearTimeout(_timeout);
			_timeout = setTimeout(() => {
				console.log('----updateTabs----');
				this.tabPropsList = getChildrenProps(this, 'ste-tab');
				this.showComponent = true;
				this.$nextTick(async () => {
					this.listBoxEl = await utils.querySelector('.tab-list-box', this);
					this.listEl = await utils.querySelector('.tab-list-box .tab-list.view-list', this);
					this.tabEls = await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item', this, true);
				});
			});
		},
		async onSelect(tab, index) {
			if (this.lock || tab.disabled || this.disabled) return false;
			if (this.openPullDown) await this.onOpenDown();
			let active = this.active;
			if (typeof this.active === 'string') {
				active = tab.name;
			} else if (typeof this.active === 'number') {
				active = index;
			}
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
				if (this.openPullDown) {
					this.pullListTransform = '-100%';
					setTimeout(() => {
						this.openPullDown = false;
						resolve();
					}, 200);
					return;
				}

				this.listBoxEl = await utils.querySelector('.tab-list-box', this);
				this.openPullDown = true;
				setTimeout(() => {
					this.pullListTransform = '0';
					resolve();
				}, 20);
			});
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
			padding: 12rpx 0;
			.tab-space {
				display: inline-flex;
				vertical-align: bottom;
				width: var(--tabs-tab-space);
				min-width: var(--tabs-tab-space-line);
				align-items: center;
				justify-content: center;
				.space-line {
					width: var(--tabs-tab-space-line);
					background-color: rgba(200, 200, 200, 0.3);
					height: 60%;
				}
			}
			.tab-item {
				display: inline-block;
				vertical-align: bottom;
				width: var(--tabs-tab-width);
				padding: var(--tabs-tab-padding);
				text-align: center;
				.tab-image {
					height: 90rpx;
					width: 90rpx;
					border-radius: 24rpx;
					overflow: hidden;
					border: 2px solid transparent;
					margin: 0 auto;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.tab-title {
					max-width: 100%;
					overflow: hidden;
					line-height: 40rpx;
					font-size: 28rpx;
					color: var(--tabs-tab-color);
					margin: 0 auto;
				}
				.tab-sub-title {
					width: var(--tabs-line-width);
					max-width: 100%;
					overflow: hidden;
					line-height: 40rpx;
					font-size: 24rpx;
					border-radius: 20rpx;
					text-align: center;
					margin: 0 auto;
					color: var(--tabs-tab-color);
					margin-top: 8rpx;
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

			&.open-down {
				opacity: 0;
				pointer-events: none;
			}
		}

		.tab-pull-down-box {
			width: 70rpx;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;

			.pull-down-content {
				width: 100%;
				height: 100%;
				position: absolute;
				.content-tabs {
					width: 100%;
					height: var(--tabs-list-height);
					.placeholder {
						display: none;
						height: 100%;
						align-items: center;
						padding: 0 24rpx;
						color: var(--tabs-tab-color);
						font-size: 28rpx;
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
							transition-duration: 0.3s;
						}
					}
				}
				.tab-list {
					display: none;
					.tab-item {
						&.active {
							.tab-title {
								color: var(--tabs-color);
							}
						}
					}
				}
			}
			&.open {
				width: 100%;
				height: 100vh;
				position: fixed;
				background-color: rgba(0, 0, 0, 0.45);

				.pull-down-content {
					height: initial;
					display: block;

					overflow: hidden;
					.content-tabs {
						position: relative;
						box-shadow: 0 5px 5px rgba(245, 245, 245, 0.5);
						z-index: 10;
						background-color: #ffffff;
						.placeholder {
							display: flex;
						}
						.tab-pull-down {
							display: flex;
							.pull-down-icon {
								transform: rotate(180deg);
							}
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
