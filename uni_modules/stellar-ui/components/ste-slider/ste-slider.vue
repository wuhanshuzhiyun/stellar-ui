<template>
	<view class="ste-slider--root" :class="cmpRootClass" :style="[cmpRootCssVar]" @click="handleClick">
		<view class="inactive-box" :style="[cmpInactiveStyle]"></view>
		<view class="active-box line" :style="[cmpActiveStyle]"></view>

		<view
			class="slider-bar-box"
			@touchstart="onTouchStart"
			@touchmove.stop="onTouchMove"
			@touchend="onTouchEnd"
			@touchcancel="onTouchEnd"
			:style="{
				left: vertical ? '50%' : `${realPercentage}%`,
				top: vertical ? `${realPercentage}%` : '50%',
			}"
		>
			<slot name="button">
				<view class="slider-bar" />
			</slot>
		</view>
		<template v-if="showStops">
			<template v-for="(e, i) in markList">
				<view class="mark-box" :style="{ left: e.left, top: e.top }">
					<view class="dot" />
					<view class="marks-label" :style="e.style">{{ e.label }}</view>
				</view>
			</template>
		</template>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-slider 滑块
 * @description 滑块组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-slider
 * @property {Number|String|Array} value 当前进度百分比，在双滑块模式下为数组格式（数组的值都是从小到大）
 * @property {Number|String} min 最小值
 * @property {Number|String} max 最大值
 * @property {Number|String} step 步长
 * @property {Number|String} barHeight 进度条高度，默认单位为 rpx
 * @property {Number|String} buttonSize 滑块按钮大小，默认单位为 rpx
 * @property {String} activeColor 进度条激活态颜色
 * @property {String} inactiveColor 进度条非激活态颜色
 * @property {Boolean} range 是否为范围选择
 * @property {Boolean} vertical 是否竖向模式
 * @property {Boolean} disabled 是否禁用滑块
 * @property {Boolean} readonly 是否为只读状态，只读状态下无法修改滑块的值
 * @property {Object} marks 标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式
 */
export default {
	group: '表单组件',
	title: 'Slider 滑块',
	name: 'ste-slider',
	props: {
		value: {
			type: [Number, String, Array],
			default: 0,
		},
		min: {
			type: [Number, String],
			default: 0,
		},
		max: {
			type: [Number, String],
			default: 100,
		},
		step: {
			type: [Number, String],
			default: 1,
		},
		barHeight: {
			type: [String, Number],
			default: 8,
		},
		buttonSize: {
			type: [String, Number],
			default: 40,
		},
		activeColor: {
			type: String,
			default: '#0090ff',
		},
		inactiveColor: {
			type: String,
			default: '#eeeeee',
		},
		range: {
			type: Boolean,
			default: false,
		},
		vertical: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		showStops: {
			type: Boolean,
			default: false,
		},
		marks: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			realPercentage: 0,
			haveSlot: false,
			sliderRect: {
				left: 0,
				width: 0,
				height: 0,
				bottom: 0,
			},
			isDrag: false,
			startPosition: 0,
			startPercentage: 0,
			markList: [],
			hasMarks: false,
		};
	},
	created() {},
	mounted() {
		this.haveSlot = this.$slots.default;
		utils.querySelector('.ste-slider--root', this).then((rect) => {
			this.sliderRect = rect;
		});
		this.calculateStepMarks();
	},
	computed: {
		cmpRootClass() {
			let classStr = '';
			if (this.isDrag) {
				classStr += 'ste-slider--drag ';
			}

			if (this.vertical) {
				classStr += 'ste-slider--vertical ';
			} else {
				classStr += 'ste-slider--horizontal ';
			}
			return classStr;
		},
		cmpRootCssVar() {
			const style = {
				'--progress-height': utils.addUnit(this.barHeight),
				'--bar-size': utils.addUnit(this.buttonSize),
				'--active-color': this.activeColor,
			};
			return style;
		},
		cmpInactiveStyle() {
			let style = {};
			if (this.disabled) {
				style.backgroundColor = '#eeeeee';
			} else {
				const bg = utils.bg2style(this.inactiveColor);
				style = { ...style, ...bg };
			}
			return style;
		},
		cmpActiveStyle() {
			let style = {};
			if (this.disabled) {
				style.backgroundColor = '#cccccc';
			} else {
				const bg = utils.bg2style(this.activeColor);
				style = { ...style, ...bg };
			}
			if (this.vertical) {
				style.height = this.realPercentage + '%';
			} else {
				style.width = this.realPercentage + '%';
			}
			return style;
		},
	},
	watch: {
		value: {
			handler(val) {
				if (val >= this.max) {
					this.realPercentage = this.max;
				} else if (val <= this.min) {
					this.realPercentage = this.min;
				} else {
					this.realPercentage = val;
				}
			},
			immediate: true,
		},
		marks: {
			handler(val) {
				this.hasMarks = Object.keys(val || {}).length > 0;
			},
			immediate: true,
		},
	},
	methods: {
		handleClick(e) {
			if (this.readonly || this.disabled) return;
			let offsetValue;
			if (this.vertical) {
				let clientY = e.detail.y || e.detail.clientY;
				offsetValue = ((clientY - this.sliderRect.top) / this.sliderRect.height) * 100;
			} else {
				let clientX = e.detail.x || e.detail.clientX;
				offsetValue = ((clientX - this.sliderRect.left) / this.sliderRect.width) * 100;
			}
			this.updateWidth(offsetValue, false);
			this.$emit('change', this.realPercentage);
		},
		onTouchStart(e) {
			this.startPosition = e.touches[0];
			this.startPercentage = this.realPercentage;
			this.$emit('dragStart', e);
		},
		onTouchMove(e) {
			if (this.readonly || this.disabled) return;
			let touches = e.touches[0];
			let distance = this.vertical
				? touches.clientY - this.startPosition.clientY
				: touches.clientX - this.startPosition.clientX;
			let containerLength = this.vertical ? this.sliderRect.height : this.sliderRect.width;
			let offsetValue = (distance / containerLength) * 100;
			this.updateWidth(offsetValue, true);
		},
		onTouchEnd(e) {
			this.isDrag = false;
			this.$emit('dragEnd', e);
			this.$emit('change', this.realPercentage);
		},
		updateWidth(value, drag) {
			let realValue;
			this.isDrag = drag;
			if (drag) {
				realValue = this.startPercentage + value;
			} else {
				realValue = value;
			}

			this.realPercentage = this.hasMarks
				? this.calculateValue(realValue, 1)
				: this.calculateValue(realValue, this.step);
			this.$emit('input', this.realPercentage);
		},
		calculateValue(value, step) {
			// 计算出当前值相对于最小值的偏移量
			const offset = value - this.min;
			// 根据步长计算出应该是哪个步长点
			const targetValue = Math.round(offset / step) * step + this.min;
			// 确保计算出的值不会超过最大值和低于最小值
			return Math.max(Math.min(targetValue, this.max), this.min);
		},
		calculateStepMarks() {
			if (!this.showStops) return;
			this.markList = [];
			let marksKeys = Object.keys(this.marks || {});
			if (marksKeys.length > 0) {
				marksKeys.forEach((e) => {
					this.markList.push({
						left: this.vertical ? '0' : `${e}%`,
						top: this.vertical ? `${e}%` : '0',
						style: this.marks[e].style,
						label: typeof this.marks[e] === 'string' ? this.marks[e] : this.marks[e].label,
					});
				});
			} else {
				for (let i = this.min; i <= this.max; i += this.step) {
					// 根据自定义的 marks 对象判断是否需要显示该标记点
					if (i === this.min || i === this.max) {
						continue; // 跳过第一个和最后一个标记点
					}
					const percentage = ((i - this.min) / (this.max - this.min)) * 100;
					this.markList.push({
						left: this.vertical ? '0' : `${percentage}%`,
						top: this.vertical ? `${percentage}%` : '0',
					});
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-slider--root {
	position: relative;
	z-index: 1;
	width: 100%;
	height: var(--progress-height);
	border-radius: 24rpx;

	&.ste-slider--drag {
		.active-box {
			transition: none !important;
		}
		.slider-bar-box {
			transition: none !important;
		}
	}
	&.ste-slider--vertical {
		width: var(--progress-height);
		height: 100%;

		.inactive-box {
			height: 100%;
			width: var(--progress-height);
		}
		.active-box {
			align-items: flex-end;
			justify-content: center;
			width: 100%;
			transition: height 0.3s ease;
		}

		.slider-bar-box {
			transition: top 0.3s ease;
			left: 50%;
			top: 0;
		}

		.mark-box {
			display: flex;
			align-items: center;
			transform: translateY(-50%);
			.dot {
				margin-right: 20rpx;
			}
		}
	}
	&.ste-slider--horizontal {
		.mark-box {
			transform: translateX(-50%);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.dot {
				margin-bottom: 20rpx;
			}
		}
	}

	.inactive-box {
		width: 100%;
		height: var(--progress-height);
		border-radius: 24rpx;
	}

	.slider-bar-box {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 9;

		transition: left 0.3s ease;
		.slider-bar {
			cursor: grab;
			min-width: var(--bar-size);
			height: var(--bar-size);
			width: var(--bar-size);
			border-radius: 50%;
			background-color: #ffffff;
			border: 2rpx solid var(--active-color);
		}
	}

	.active-box {
		width: 100%;
		height: var(--progress-height);
		border-radius: 24rpx;
		position: absolute;
		left: 0;
		top: 0;

		display: flex;
		align-items: center;
		justify-content: flex-end;
		transition: width 0.3s ease;
		z-index: 2;
	}

	.mark-box {
		position: absolute;
		z-index: 3;
		.dot {
			height: var(--progress-height);
			width: var(--progress-height);
			border-radius: 100%;
			background-color: #fff;
		}

		.marks-label {
			white-space: nowrap;

			font-size: 24rpx;
		}
	}
}
</style>
