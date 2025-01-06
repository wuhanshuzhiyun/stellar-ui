<template>
	<view
		class="ste-dropdown-menu-root"
		:class="[cmpRootClass]"
		:style="[cmpRootStyle]"
		@touchmove.stop.prevent="touchmove"
		@wheel.stop.prevent
	>
		<view
			class="dropdown-placeholder"
			:style="[cmpMenuPlaceholderStyle]"
			@click="close"
			@touchmove.stop.prevent="touchmove"
			@wheel.stop.prevent
		/>
		<view class="menu-box" @click="handleMenuClick" @touchmove.stop.prevent="touchmove" @wheel.stop.prevent>
			<text class="title">{{ menuTitle || title }}</text>
			<view class="menu-title-icon">
				<ste-icon code="&#xe699;" size="16" color="#bbbbbb"></ste-icon>
			</view>
		</view>
		<view
			:class="hiddenContent ? 'dropdown-content hidden' : 'dropdown-content'"
			:style="[cmpMenuContentStyle]"
			@click="handleMaskClick"
			@touchmove.stop.prevent="touchmove"
			@wheel.stop.prevent
		>
			<view class="menu-item-content" @click.stop="handleMenuConentClick">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import useColor from '../../config/color.js';
let color = useColor();
import System from '../../utils/System.js';
const DEFAULT_ROOT_QUERY = { height: 0, left: 0, top: 0, bottom: 0 };
const DEFAULT_DURATION = 0.2;
const MIN_DURATION = 0;
const MAX_DURATION = 10;
const addPx = (val) => {
	if (utils.isNumber(val)) {
		return `${val}px`;
	} else {
		return 0;
	}
};
/**
 * ste-dropdown-menu 下拉菜单
 * @description 下拉菜单
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-dropdown-menu
 * @property {String} title 菜单标题，未设置时会显示选中项的值
 * @property {String|Array} value 下拉菜单选中的值
 * @property {String} inactiveColor 未选中颜色 #000000
 * @property {String} activeColor 选中色 #0090FF
 * @property {String} direction 展开方向 默认down
 * @value up 向上展开 {String}
 * @value down 向下展开 {String}
 * @property {Number} duration 展开动画执行时间 默认0.2s
 * @property {Boolean} showMask 是否展示遮罩 默认 true
 * @property {Boolean} isMaskClick 是否点击遮罩关闭 默认 true
 * @property {Number} zIndex 弹窗层级z-index
 * @property {String} type 下拉选项的形状 默认block
 * @value round 圆形 {String}
 * @value block 块状 {String}
 * @property {Number} max 可选数量 默认1
 * @event {Function} change 选项改变时触发
 * @event {Function} open 菜单打开
 * @event {Function} close 菜单收起
 **/
export default {
	group: '导航组件',
	title: 'DropdownMenu 下拉菜单',
	name: 'ste-dropdown-menu',
	options: {
		virtualHost: true,
	},
	props: {
		title: {
			type: [String, null],
			default: '',
		},
		value: {
			type: [String, Number, Array, null],
			default: undefined,
		},
		inactiveColor: {
			type: [String, null],
			default: '#000000',
		},
		activeColor: {
			type: [String, null],
			default: '',
		},
		direction: {
			type: [String, null],
			default: 'down',
		},
		duration: {
			type: [Number, null],
			default: 0.2,
		},
		showMask: {
			type: [Boolean, null],
			default: true,
		},
		isMaskClick: {
			type: [Boolean, null],
			default: true,
		},
		zIndex: {
			type: [Number, null],
			default: 1000,
		},
		type: {
			default: [String, null],
			default: 'block',
		},
		max: {
			type: [Number, null],
			default: 1,
		},
	},
	model: {
		prop: 'value',
		// 派发事件名，更新父组件数据
		event: 'input',
	},
	provide() {
		return {
			_menuComponent: { getParent: () => this },
		};
	},
	data() {
		return {
			menuTitle: '',
			chooseItems: [],
			showMenu: false,
			hiddenContent: false,
			contentHeight: 0,
			menuRootQuery: DEFAULT_ROOT_QUERY,
			menuItems: [],
		};
	},
	mounted() {},
	computed: {
		cmpRootClass() {
			let classArr = [this.direction, this.showMenu ? 'open' : 'close', this.type];
			return classArr.join(' ');
		},
		cmpRootStyle() {
			let style = {
				'--duration': this.cmpDuration + 's',
				'--active-color': this.activeColor ? this.activeColor : color.getColor().steThemeColor,
				'--inactive-color': this.inactiveColor,
				'--menu-z-index': this.zIndex,
			};
			return style;
		},
		cmpMenuPlaceholderStyle() {
			let style = { height: 0 };

			if (this.showMenu) {
				if (this.direction == 'down') {
					style.height = addPx(this.menuRootQuery.top + this.menuRootQuery.height);
				} else {
					let windowHeight = System.getWindowInfo().windowHeight;
					style.height = addPx(windowHeight - this.menuRootQuery.bottom + this.menuRootQuery.height);
				}
			}

			return style;
		},
		cmpMenuContentStyle() {
			let style = {
				height: addPx(this.contentHeight),
				background: this.showMask ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)',
			};
			if (this.direction == 'down') {
				style.top = addPx(this.menuRootQuery.top + this.menuRootQuery.height);
			} else {
				style.top = 0;
			}
			return style;
		},
		cmpDuration() {
			if (!utils.isNumber(this.duration)) {
				return DEFAULT_DURATION;
			}
			if (this.duration > MAX_DURATION) {
				return MAX_DURATION;
			}
			if (this.duration < MIN_DURATION) {
				return MIN_DURATION;
			}
			return this.duration;
		},
	},
	watch: {
		value: {
			handler(val) {
				if (Array.isArray(val)) {
					this.chooseItems = val;
				} else {
					val ? (this.chooseItems = [val]) : '';
				}
				// this.loadMenuTitle();
			},
			immediate: true,
		},
	},
	methods: {
		updateItems() {
			let menuItems = utils.getChildrenProps(this, 'ste-dropdown-menu-item');
			if (menuItems.length !== this.menuItems.length) {
				this.menuItems = menuItems;
				this.loadMenuTitle();
			}
		},
		loadMenuTitle() {
			if (!this.title) {
				let item =
					this.menuItems.find((e) => {
						return this.chooseItems.find((v) => v == e.value);
					}) || {};
				this.menuTitle = item.title;
			} else {
				this.menuTitle = this.title;
			}
		},
		touchmove(e) {
			// TODO nvue 取消冒泡
			e.stopPropagation();
		},
		async getContentHeight() {
			let windowHeight = System.getWindowInfo().windowHeight;
			const res = await utils.querySelector('.ste-dropdown-menu-root', this);
			this.menuRootQuery = res;
			this.contentHeight =
				this.direction == 'down' ? windowHeight - this.menuRootQuery.bottom : this.menuRootQuery.top;
		},
		async handleMenuClick() {
			if (!this.showMenu) {
				await this.getContentHeight();
				this.open();
			} else {
				this.close();
			}
		},
		open() {
			this.showMenu = true;
			this.hiddenContent = false;
			this.$emit('open');
		},
		close() {
			this.showMenu = false;
			setTimeout(() => {
				this.hiddenContent = true;
				this.contentHeight = 0;
				this.menuRootQuery = DEFAULT_ROOT_QUERY;
				this.$emit('close');
			}, this.cmpDuration * 1000);
		},
		choose(item) {
			let temp = this.chooseItems;
			let index = temp.findIndex((e) => e == item.value);
			let max = this.max < 1 ? 1 : this.max;
			if (index > -1) {
				// 当选中项再次被选中时，做取消选中操作
				temp.splice(index, 1);
			} else {
				if (this.chooseItems.length < max) {
					temp.push(item.value);
				} else {
					temp.shift();
					temp.push(item.value);
				}
			}

			this.chooseItems = temp;
			this.loadMenuTitle();
			if (this.chooseItems.length == max) {
				this.close();
			}
			this.$emit('input', this.chooseItems);
			this.$emit('change', this.chooseItems);
			this.$emit('item-choose', item);
		},
		handleMaskClick() {
			if (this.isMaskClick) {
				this.close();
			}
		},
		handleMenuConentClick() {},
	},
};
</script>

<style lang="scss" scoped>
.ste-dropdown-menu-root {
	.menu-box {
		padding: 20rpx 0;
		.menu-title-icon {
			display: inline-flex;
			transition: all var(--duration) linear;
		}
		.title {
			font-size: 28rpx;
			margin-right: 16rpx;
		}
		display: flex;
		align-items: center;
	}

	.dropdown-placeholder {
		position: fixed;
		z-index: 1;
		width: 100vw;
		top: 0;
		left: 0;
	}

	.dropdown-content {
		transition: opacity var(--duration) linear;
		position: fixed;
		z-index: 1;
		width: 100vw;
		left: 0;
		overflow: hidden;
		top: 40rpx;
		opacity: 0;

		&.hidden {
			z-index: -1 !important;
		}

		.menu-item-content {
			width: 100%;
			transition: all var(--duration);
			transition-duration: var(--duration);
			transform: translateY(-100%);
		}
	}

	&.round {
		.menu-item-content {
			padding: 24rpx;
			background-color: #fff;
			border-top: solid 2rpx #f9f9f9;

			display: flex;
			justify-content: space-between;
			flex-flow: wrap;

			row-gap: 20rpx;
		}
	}

	&.open {
		.menu-title-icon {
			transform: rotate(180deg);
		}
		.dropdown-content {
			opacity: 1;
			z-index: var(--menu-z-index);

			.menu-item-content {
				transform: translateY(0);
			}
		}
	}

	&.up {
		.menu-title-icon {
			transform: rotate(180deg);
		}
		.dropdown-content {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			.menu-item-content {
				transform: translateY(100%);
			}
		}
		&.open {
			.menu-title-icon {
				transform: rotate(0);
			}
			.menu-item-content {
				transform: translateY(0);
			}

			.dropdown-placeholder {
				top: auto;
				bottom: 0;
			}
		}
	}
}
</style>
