<template>
	<view class="szy-search-body">
		<view class="szy-search-input">
			<view class="search-icon">
				<ste-icon code="&#xe66d;" color="#BBBBBB" />
			</view>
			<view class="input-box">
				<input
					class="search-input"
					placeholder-class="search-input-placeholder"
					:disabled="disabled"
					:placeholder="usePlaceholder"
					:style="{ paddingRight: useShowClear ? '48rpx' : '8rpx' }"
					v-model="text"
					@input="onInput"
					@confirm="onSearch"
				/>
				<swiper
					v-if="!text && hotWords.length"
					class="placeholder-list"
					:current="switchIndex"
					:autoplay="intervalFlag"
					:interval="interval"
					circular
					vertical
					@change="onSwitchChange"
				>
					<swiper-item class="placeholder-item" v-for="(item, i) in hotWords" :key="i">
						{{ item }}
					</swiper-item>
				</swiper>
				<view v-if="useShowClear" class="clear-icon" @click="onClear">
					<ste-icon code="&#xe68b;" color="#BBBBBB" size="32rpx" />
				</view>
			</view>
			<view v-if="useShowLine" class="secrch-line" :class="disabled ? 'disabled' : ''" />
			<view v-if="showButton" class="search-button" :class="disabled ? 'disabled' : ''" @click="onSearch">
				{{ buttonText }}
			</view>
		</view>
		<view class="nav-address" v-if="styleType === 2" @click="onNavAddress" />
	</view>
</template>

<script>
/**
 * search 搜索框
 * @description 搜索框组件
 * @property {Number} styleType 组件类型,1-正常搜索,2-点击任意区域触发事件
 * @property {String} value 默认值，支持双向绑定
 * @property {String} placeholder 占位符
 * @property {String[]} hotWords 热词列表
 * @property {Number} interval 自动切换时间间隔，单位ms，默认3000ms
 * @property {Boolean} disabled 是否禁用
 * @property {Number} showLine 是否显示分割线 0-不显示 1-显示
 * @property {Number} showButton 是否显示按钮 0-不显示 1-显示
 * @property {String} buttonText 按钮文字
 * @property {Number} showClear 是否显示清除图标 0-不显示 1-显示
 * @event {(v:String)=>void} search
 * @event {(v:String)=>void} input
 * @event {()=>void} navAddress
 */
export default {
	group: '表单组件',
	title: 'Search 搜索',
	name: 'ste-search',
	props: {
		// 组件类型,1-正常搜索,2-点击任意区域触发事件
		styleType: {
			type: Number,
			default: () => 1,
		},
		// 默认值，支持双向绑定
		value: {
			type: [String, Number],
			default: () => '',
		},
		// 占位符
		placeholder: {
			type: String,
			default: () => '搜索商品',
		},
		// 热词列表
		hotWords: {
			type: Array,
			default: () => [],
		},
		// 占位符切换时间
		interval: {
			type: Number,
			default: () => 3000,
		},
		// 禁用
		disabled: {
			type: Boolean,
			default: () => false,
		},
		// 显示分割线
		showLine: {
			type: Number,
			default: () => 1,
		},
		// 显示按钮
		showButton: {
			type: Number,
			default: () => 1,
		},
		// 按钮文字
		buttonText: {
			type: String,
			default: () => '搜索',
		},
		// 显示清除图标
		showClear: {
			type: Number,
			default: () => 1,
		},
	},
	model: {
		prop: 'value',
		event: 'input',
	},
	data() {
		return {
			version: '1.0.0',
			text: '',
			intervalFlag: true,
			switchIndex: 0,
		};
	},
	watch: {
		value: {
			handler(val) {
				console.log('value', val);
				this.text = val;
			},
			immediate: true,
		},
		hotWords() {
			this.switchIndex = 0;
		},
	},
	computed: {
		usePlaceholder() {
			return this.hotWords?.length ? '' : this.placeholder;
		},
		useShowLine() {
			return this.showLine && this.showButton;
		},
		useShowClear() {
			return this.showClear && this.text;
		},
		showSwitch() {
			return this.hotWords?.length && !this.text;
		},
	},
	methods: {
		onInput() {
			this.$emit('input', this.text);
		},
		onSearch() {
			if (this.disabled) return;
			let searchValue = this.text;
			if (!searchValue && this.hotWords.length) {
				searchValue = this.hotWords[this.switchIndex];
			}
			this.$emit('search', searchValue);
		},
		onSwitchChange(v) {
			this.switchIndex = v.detail.current;
		},
		onNavAddress(v) {
			this.$emit('nav-address');
		},
		onClear() {
			this.text = '';
			this.$emit('input', this.text);
		},
	},
};
</script>

<style lang="scss" scoped>
.szy-search-body {
	width: 100%;
	height: 64rpx;
	background-color: #fff;
	border-radius: 32rpx;
	border: 1rpx solid rgba(238, 238, 238, 0.4);
	padding: 0 16rpx;
	position: relative;

	&,
	view {
		box-sizing: border-box;
	}
	.szy-search-input {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		position: relative;
		.search-icon {
			width: 28rpx;
			height: 28rpx;
			margin-right: 16rpx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;

			.image {
				width: 100%;
				height: 100%;
			}
		}
		.input-box {
			position: relative;
			flex: 1;
			height: 100;
			.search-input {
				width: 100%;
				height: 100%;
				font-size: 28rpx;
				color: #000000;
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
					line-height: 40rpx;
					color: #bbbbbb;
					font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
					font-weight: normal;
				}
			}
			.clear-icon {
				width: 32rpx;
				height: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 8rpx;
				top: 50%;
				z-index: 2;
				transform: translateY(-50%);
			}
		}
		.secrch-line {
			margin-left: 16rpx;
			width: 4rpx;
			flex-shrink: 0;
			height: 24rpx;
			background-color: #0090ff;
			&.disabled {
				background: #bbbbbb;
			}
		}
		.search-button {
			padding: 0 8rpx 0 16rpx;
			height: 40rpx;
			font-size: 28rpx;
			line-height: 40rpx;
			flex-shrink: 0;
			text-align: center;
			font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
			font-weight: normal;
			color: #0090ff;
			&.disabled {
				color: #bbbbbb;
			}
		}
	}
	.nav-address {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 2;
	}
}
</style>

<style>
.search-input-placeholder {
	color: #bbbbbb;
	font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
	font-weight: normal;
}
</style>
