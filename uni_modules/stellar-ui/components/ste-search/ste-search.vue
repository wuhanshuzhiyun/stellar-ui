<template>
	<view class="ste-search-root" :style="[cmpStyleVar, cmpBackground, cmpRootPadding]" @click="onClick">
		<view class="content">
			<view class="icon-box">
				<ste-icon code="&#xe695;" :color="prefixIconColor" size="44" />
			</view>
			<view class="input-box" v-if="!hiddenInput">
				<ste-input rootClass="ste-search-input" placeholder-class="search-input-placeholder" :disabled="disabled"
					:placeholder="cmpPlaceholder" v-model="dataValue" @input="onInput" @confirm="onSearch" @focus="onFocus"
					@blur="onBlur" @clear="onClear" :focus="focus" :clearable="clearable" :fontColor="inputTextColor"
					background="transparent" :cursor="cursorNumber" />
				<swiper v-if="cmpShowSwitch" class="placeholder-list" :current="switchIndex" :autoplay="autoplay"
					:interval="interval" circular vertical @change="onSwitchChange">
					<swiper-item class="placeholder-item" v-for="(item, i) in hotWords" :key="i">
						{{ item }}
					</swiper-item>
				</swiper>
			</view>
			<view v-if="!cmpHiddenLine" class="secrch-line" :class="disabled ? 'disabled' : ''" />
			<view v-if="!hiddenBtn" class="search-button" :class="disabled ? 'disabled' : ''" :style="[cmpbtnBackground]"
				@click="onSearch">
				{{ btnText }}
			</view>
		</view>
		<view class="nav-box" data-test="nav-box" v-if="type === 'nav'" />
		<!-- 输入建议 -->
		<view v-if="suggestionList.length > 0" class="suggestions-box"
			:class="showSuggestionsBox == null ? '' : showSuggestionsBox ? 'show' : 'hide'">
			<scroll-view scroll-y class="scroll-box">
				<view class="item" @click="handleSuggestionClick(item)" v-for="(item, key) in suggestionList" :key="key">
					{{ item.label }}
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import SteInput from "../ste-input/ste-input.vue"
/**
 * ste-search 搜索
 * @description 搜索组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-search
 * @property {String}			type				组件类型
 * @value default	正常搜索{String}
 * @value nav 		导航栏{String}
 * @property {String}			value				当前值（支持v-model双向绑定）
 * @property {String}			placeholder				占位提示符
 * @property {String[]}		hotWords	热词列表，默认值，[]
 * @property {Number}			interval	热词列表自动切换时间间隔，默认值，3000
 * @property {Boolean}		autoplay	热词列表自动切换，默认值，true
 * @property {Boolean}		disabled	是否禁用状态，默认值，false
 * @property {Boolean}		hiddenLine	是否隐藏分割线 ，默认值，false
 * @property {Boolean}		hiddenBtn	是否隐藏搜索按钮 ，默认值，false
 * @property {String}			btnText	搜索按钮文字 ，默认值 搜索
 * @property {Boolean}		hiddenInput	是否隐藏输入框，默认值，false
 * @property {Boolean}		clearable	是否可清空，默认值，true
 * @property {Number}			height	高度，单位rpx，默认值，64
 * @property {Number}			radius	圆角弧度，单位rpx，默认值，32
 * @property {String}			borderColor	边框颜色，默认值，#EEEEEE66
 * @property {String}			background	背景，默认值，#FFFFFF
 * @property {String}			prefixIconColor	前置图标颜色，默认值，#BBBBBB
 * @property {String}			placeholderColor	占位符文本颜色，默认值，#BBBBBB
 * @property {String}			inputTextColor	输入框文本颜色，默认值，#000000
 * @property {String}			clearIconColor	清除图标颜色，默认值，#BBBBBB
 * @property {String}			btnTextColor	搜索按钮文本颜色 ，默认值，#0090FF
 * @property {String}			btnBackground	搜索按钮背景
 * @property {Boolean}			focus	是否聚焦(双向绑定)，默认值，false
 * @event {Function}			input 输入事件
 * @event {Function}			focus 聚焦焦点事件
 * @event {Function}			blur 失去焦点事件
 * @event {Function}			search 确定搜索时触发
 * @event {Function}			clear 点击清除按钮后触发
 * @event {Function}			click 点击事件
 */
export default {
	group: '表单组件',
	title: 'Search 搜索',
	name: 'ste-search',
	components: { "ste-input": SteInput },
	props: {
		// 组件类型,"default"：正常搜索，"nav":导航栏
		type: {
			type: [String, null],
			default: () => 'default',
		},
		// 当前值（支持v-model双向绑定）
		value: {
			type: [String, null],
			default: () => '',
		},
		// 占位提示符
		placeholder: {
			type: [String, null],
			default: () => '',
		},
		// 热词列表
		hotWords: {
			type: [Array, null],
			default: () => [],
		},
		// 热词列表自动切换时间间隔`
		interval: {
			type: [Number, null],
			default: () => 3000,
		},
		// 热词列表是否自动切换
		autoplay: {
			type: [Boolean, null],
			default: () => true,
		},
		// 是否禁用状态
		disabled: {
			type: [Boolean, null],
			default: () => false,
		},
		// 是否隐藏分割线
		hiddenLine: {
			type: [Boolean, null],
			default: () => false,
		},
		// 是否隐藏搜索按钮
		hiddenBtn: {
			type: [Boolean, null],
			default: () => false,
		},
		// 搜索按钮文字
		btnText: {
			type: [String, null],
			default: () => '搜索',
		},
		// 是否隐藏输入框
		hiddenInput: {
			type: [Boolean, null],
			default: () => false,
		},
		// 是否可清空
		clearable: {
			type: [Boolean, null],
			default: () => true,
		},
		// 边框颜色
		borderColor: {
			type: [String, null],
			default: () => '#dddddd',
		},
		// 背景
		background: {
			type: [String, null],
			default: () => '#ffffff',
		},
		// 前置图标颜色
		prefixIconColor: {
			type: [String, null],
			default: () => '#bbbbbb',
		},
		// 占位符字体颜色
		placeholderColor: {
			type: [String, null],
			default: () => '#bbbbbb',
		},
		// 输入框文字颜色
		inputTextColor: {
			type: [String, null],
			default: () => '#000000',
		},
		// 清除图标颜色
		clearIconColor: {
			type: [String, null],
			default: () => '#bbbbbb',
		},
		// 搜索按钮背景
		btnBackground: {
			type: [String, null],
		},
		// 搜索按钮文字颜色
		btnTextColor: {
			type: [String, null],
			default: () => '#0090FF',
		},
		// 高度
		height: {
			type: [Number, null],
			default: () => 64,
		},
		// 圆角弧度
		radius: {
			type: [Number, null],
			default: () => 32,
		},
		// 聚焦
		focus: {
			type: [Boolean, null],
			default: () => false,
		},
		suggestionList: {
			type: [Array, null],
			default: () => [],
		},
	},
	model: {
		prop: 'value',
		event: 'input',
	},
	data() {
		return {
			dataValue: '',
			switchIndex: 0,
			showSuggestionsBox: null,
			cursorNumber: 0,
			curSuggestion: '',
		};
	},
	computed: {
		cmpStyleVar() {
			return {
				'--search-root-height': utils.formatPx(this.height),
				'--search-root-radius': utils.formatPx(this.radius),
				'--search-btn-text-color': this.btnTextColor,
				'--search-placeholder-color': this.placeholderColor,
				'--search-input-color': this.inputTextColor,
				'--search-border-color': this.borderColor,
			};
		},
		cmpPlaceholder() {
			return this.hotWords?.length ? '' : this.placeholder;
		},
		cmpHiddenLine() {
			return this.hiddenLine || this.hiddenBtn;
		},
		cmpShowClear() {
			return this.clearable && this.dataValue;
		},
		cmpShowSwitch() {
			return this.hotWords?.length && !this.dataValue;
		},
		cmpBackground() {
			return utils.bg2style(this.background);
		},
		cmpbtnBackground() {
			return utils.bg2style(this.btnBackground);
		},
		cmpRootPadding() {
			return this.hiddenBtn && this.hiddenInput ? {} : { padding: '0 8rpx 0 16rpx' };
		},
	},
	watch: {
		value: {
			handler(val) {
				this.dataValue = val;
			},
			immediate: true,
		},
		hotWords() {
			this.switchIndex = 0;
		},
	},
	methods: {
		onInput() {
			if (this.disabled) return;
			this.$emit('input', this.dataValue);
		},
		onFocus() {
			if (this.disabled) return;
			this.$emit('focus', this.dataValue);

			this.showSuggestionsBox = true;
		},
		onBlur() {
			this.$emit('update:focus', false);
			this.$emit('blur', this.dataValue);
		},
		onSearch() {
			if (this.disabled) return;
			let searchValue = this.dataValue;
			if (!searchValue && this.hotWords.length) {
				searchValue = this.hotWords[this.switchIndex];
			}
			this.$emit('search', searchValue);
		},
		onSwitchChange(v) {
			this.switchIndex = v.detail.current;
		},
		onClick() {
			if (this.disabled) return;
			let searchValue = this.dataValue;
			if (!searchValue && this.hotWords.length) {
				searchValue = this.hotWords[this.switchIndex];
			}
			this.$emit('click', searchValue);
		},
		onClear() {
			if (this.disabled) return;
			this.dataValue = '';
			this.$emit('input', this.dataValue);
			this.$emit('clear');
		},
		handleSuggestionClick(item) {
			this.dataValue = item.label;
			this.$emit('input', item.label);
			this.$emit('selectSuggestion', item);
			this.showSuggestionsBox = false;

			setTimeout(() => {
				this.cursorNumber = item.label.length;
			}, 50);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-search-root {
	width: 100%;
	height: var(--search-root-height);
	background-color: #fff;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	border-radius: var(--search-root-radius);
	border: 1rpx solid var(--search-border-color);
	position: relative;

	&,
	view,
	input {
		box-sizing: border-box;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: relative;

		.icon-box {
			width: 28rpx;
			height: 28rpx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;

			.image {
				width: 100%;
				height: 100%;
			}

			&+.input-box {
				margin-left: 16rpx;
			}
		}

		.input-box {
			position: relative;
			flex: 1;
			height: 100%;

			/deep/ .search-input {
				height: 100%;

				font-size: 28rpx;
				color: var(--search-input-color);
				// #ifdef MP-ALIPAY
				background-color: rgba(0, 0, 0, 0);
				// #endif

				.content {
					padding: 0;
					height: 100%;
				}

				rch-input-placeholder {
					color: var(--search-placeholder-color);
					font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
					font-weight: normal;
				}
			}

			.placeholder-list {
				width: 100%;
				height: 100%;
				pointer-events: none;
				position: absolute;
				top: 0;
				left: 0;

				.placeholder-item {
					font-size: 28rpx;
					color: var(--search-placeholder-color);
					font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
					font-weight: normal;
					display: flex;
					align-items: center;
				}
			}

			.clear-icon {
				width: 48rpx;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				position: absolute;
				right: 8rpx;
				top: 50%;
				z-index: 2;
				transform: translateY(-50%);
			}
		}

		.secrch-line {
			margin-left: 16rpx;
			width: 2rpx;
			flex-shrink: 0;
			height: 24rpx;
			background-color: var(--search-btn-text-color);

			&.disabled {
				background: #bbbbbb;
			}
		}

		.search-button {
			padding: 0 16rpx;
			height: 40rpx;
			font-size: 28rpx;
			line-height: 40rpx;
			flex-shrink: 0;
			text-align: center;
			font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
			font-weight: normal;
			color: var(--search-btn-text-color);
			border-radius: 20rpx;
			background-repeat: no-repeat;
			background-size: 100% 100%;

			&.disabled {
				color: #bbbbbb;
			}
		}
	}

	.nav-box {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 2;
	}

	.suggestions-box {
		z-index: 999;
		position: absolute;
		left: 0;
		top: 100%;
		overflow-y: hidden;
		opacity: 0;
		max-height: 0;

		margin: 20rpx 0;
		width: 100%;

		background-color: #ffffff;
		box-shadow: 0 4rpx 24rpx 0 rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		padding: 16rpx 0;

		.scroll-box {
			width: 100%;
			max-height: calc(400rpx - 32rpx);
		}

		.item {
			padding-left: 16rpx;
			width: 100%;
			height: 60rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #bbbbbb;

			&:focus {
				background-color: red;
			}
		}

		&.show {
			opacity: 1;
			max-height: 400rpx;
			animation: suggestions-show 0.2s ease-out;
		}

		&.hide {
			animation: suggestions-hide 0.2s ease-out;
		}
	}

	@keyframes suggestions-show {
		0% {
			opacity: 0;
			max-height: 0;
		}

		100% {
			opacity: 1;
			max-height: 400rpx;
		}
	}

	@keyframes suggestions-hide {
		0% {
			opacity: 1;
			max-height: 400rpx;
		}

		100% {
			opacity: 0;
			max-height: 0;
		}
	}
}
</style>
