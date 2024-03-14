<template>
	<view class="ste-tabs--root" :style="[cmpRootStyle]">
		<view class="tab-list-box" :style="[cmpListBackground, { paddingRight: cmpPullDown ? '70rpx' : 0 }]">
			<scroll-view
				class="tab-list relative"
				:class="{ 'open-down': openPullDown }"
				enhanced
				:scroll-x="cmpScrollX"
				:scroll-with-animation="cmpScrollX"
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
						<ste-image :src="tab.image" />
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
					<view class="tab-list">
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
import props from './props.js';
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
	mixins: [props],
	provide: { tabsData },
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
			let tabPadding = utils.rpx2px(24);
			if (this.tabPropsList.length > 0 && this.tabPropsList.length <= this.divideNum) {
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
				'--tabs-sticky': this.sticky ? 'sticky' : 'relative',
				'--tabs-offset-top': isNaN(this.offsetTop) ? this.offsetTop : utils.rpx2px(this.offsetTop),
				'--tabs-tab-color': this.tabColor,
				'--tabs-active-tab-color': this.activeTabColor,
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
		// 下拉按钮样式
		cmpPullStyle() {
			if (!this.listBoxEl || !this.openPullDown) return {};
			const style = {};
			style.top = `${this.listBoxEl.top}px`;
			style.left = `${this.listBoxEl.left}px`;
			style.width = `${this.listBoxEl.width}px`;
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
		cmpActiveIndex: {
			handler(v) {
				this.scrollToActive();
			},
			immediate: true,
		},
		openPullDown(v) {
			console.log(v ? '打开' : '关闭');
		},
	},
	methods: {
		updateTabs() {
			this.showComponent = false;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				let tabPropsList = [];
				// #ifdef MP-WEIXIN | MP-ALIPAY
				const children = this.$children?.filter((tab) => tab.$options.name === 'ste-tab') || [];
				children.forEach((tab) =>
					tabPropsList.push({
						...tab.$props,
					})
				);
				// #endif
				// #ifdef H5
				const children = this.$slots.default || [];
				children.forEach((tab) =>
					tabPropsList.push({
						...tab.componentOptions.propsData,
					})
				);
				// #endif
				this.tabPropsList = tabPropsList;
				this.showComponent = true;
				this.$nextTick(async () => {
					this.listEl = await utils.querySelector('.tab-list', this);
					this.tabEls = await utils.querySelector('.tab-list .tab-item', this, true);
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
			this.$emit('change', {
				index,
				...tab,
			});
			if (this.openPullDown) {
				this.openPullDown = false;
			}
		},
		onScroll(e) {
			this.viewScrollLeft = e?.detail?.scrollLeft || 0;
		},
		scrollToActive() {
			this.$nextTick(async () => {
				const activeEl = await utils.querySelector('.tab-list.relative .tab-item.active', this);
				if (!activeEl) return;
				let tabEls = this.tabEls;
				if (!tabEls[this.cmpActiveIndex]) {
					tabEls = await utils.querySelector('.tab-list.relative .tab-item', this, true);
				}
				let listEl = this.listEl;
				if (!listEl) {
					listEl = await utils.querySelector('.tab-list.relative', this);
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
			if (this.openPullDown) {
				this.openPullDown = false;
				return;
			}
			this.$nextTick(async () => {
				this.listBoxEl = await utils.querySelector('.tab-list-box', this);
				this.openPullDown = true;
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
	.tab-list-box {
		position: var(--tabs-sticky);
		top: var(--tabs-offset-top);
		width: 100%;
		background: #fff;
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
						background-color: rgba(255, 255, 255, 0.7);
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
					background-color: #ffffff;
					border-radius: 0 0 24rpx 24rpx;
					overflow: hidden;
					.content-tabs {
						position: relative;
						box-shadow: 0 5px 5px rgba(245, 245, 245, 0.5);
						z-index: 1;
						margin-bottom: 24rpx;
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
						display: flex;
						flex-wrap: wrap;
						.tab-item {
							width: 25%;
							padding: 0;
							margin-bottom: 24rpx;
						}
					}
				}
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
