<template>
	<view class="ste-loading-root" :style="[cmpStyle]">
		<view :class="'loading ' + 'loading-type-' + type" :style="[cmpLoadinStyle]">
			<block v-if="type == 1">
				<i
					v-for="item in cmpCount"
					class="i"
					:style="{ transform: `rotate(${item * 40 + 80}deg)`, opacity: item == 0 ? 1 : (item + 1) / 10 }"
				></i>
			</block>
			<block v-if="type == 2">
				<view></view>
			</block>
		</view>
		<view v-if="$slots.default" class="text" :style="[cmpText]">
			<slot></slot>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-loading 加载
 * @description 加载组件，用于表示加载中的过渡状态。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-loading
 * @property {String} color 图标颜色，默认#999999
 * @property {String} textColor 提示文本颜色，默认和图标颜色同步
 * @property {Number} textSize 文本大小，单位rpx，默认28
 * @property {Number} type 类型，默认1
 * @value 1  逐渐减淡的颜色为主色的透明度变化 透明度以10%的差距逐渐递减{{Number}}
 * @value 2  动态转圈展示{{Number}}
 * @property {Number} size 图标大小，单位rpx，默认60
 * @property {Boolean} vertical  是否垂直排列图标和文字内容，默认false
 */
export default {
	group: '展示组件',
	title: 'Loading 加载动画',
	name: 'ste-loading',
	props: {
		color: {
			type: String,
			default: () => '#999999',
		},
		textColor: {
			type: String,
			default: () => '',
		},
		textSize: {
			type: Number,
			default: () => 28,
		},
		type: {
			type: Number,
			default: () => 1,
		},
		size: {
			type: Number,
			default: () => 60,
		},
		vertical: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			count: 9,
		};
	},
	computed: {
		cmpStyle() {
			let style = {};
			style['flexDirection'] = this.vertical ? 'column' : 'row';
			return style;
		},
		cmpLoadinStyle() {
			let style = {};
			style['width'] = utils.formatPx(this.size);
			style['height'] = utils.formatPx(this.size);
			style['color'] = this.color;
			if (this.type == 1) {
				style['animationTimingFunction'] = 'steps(8)';
			}
			if (this.type == 2) {
				style['borderColor'] = (this.color + ' ').repeat(3) + 'transparent';
			}
			return style;
		},
		cmpCount() {
			// 兼容浏览器和微信 对数字循环的处理不同
			return Array.from({ length: this.count }, (_, index) => index);
		},
		cmpText() {
			let style = {};
			style['color'] = this.textColor ? this.textColor : this.color;
			style['fontSize'] = utils.formatPx(this.textSize);
			style['margin'] = this.vertical ? '16rpx 0 0 0 ' : '0 0 0 16rpx';
			return style;
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-loading-root {
	display: inline-flex;
	align-items: center;
	justify-content: center;

	.loading {
		position: relative;
		display: inline-block;
		max-width: 100%;
		max-height: 100%;
		vertical-align: middle;

		.i {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.i:before {
			display: block;
			width: 12%;
			height: 25%;
			margin: 0 auto;
			background-color: currentColor;
			border-radius: 40%;
			content: ' ';
		}
	}

	.loading-type-1 {
		animation: ste-rotate 0.8s linear infinite;
	}
	.loading-type-2 {
		width: 100%;
		height: 100%;
		border: 3rpx solid;
		border-radius: 50%;
		animation: ste-circular 1s linear infinite;
	}

	@keyframes ste-rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes ste-circular {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(1turn);
		}
	}
}
</style>