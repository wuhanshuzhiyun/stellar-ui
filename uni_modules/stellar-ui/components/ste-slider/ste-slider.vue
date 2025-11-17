<template>
	<view class="ste-slider-root" :class="cmpRootClass" :style="[cmpRootCssVar]" @click="handleClick">
		<view class="inactive-box" :style="[cmpInactiveStyle]"></view>
		<view class="active-box line" :style="[cmpActiveStyle]"></view>

		<view
			class="slider-bar-box"
			:class="{ 'range-min': realPercentage == 0, 'range-max': realPercentage == 100 }"
			@touchstart.stop="onTouchStart"
			@touchmove.stop="onTouchMove"
			@touchend.stop="onTouchEnd"
			@touchcancel.stop="onTouchEnd"
			@mousedown="onDown"
			:style="{
				left: vertical ? '50%' : `${realPercentage}%`,
				top: vertical ? `${realPercentage}%` : '50%',
			}"
		>
			<slot :name="range ? 'leftButton' : 'button'">
				<view class="slider-bar"></view>
			</slot>
		</view>

		<view
			v-if="range"
			class="slider-bar-box range"
			:class="{ 'range-min': realPercentage2 == 0, 'range-max': realPercentage2 == 100 }"
			@touchstart="onTouchStart($event, true)"
			@touchmove.stop="onTouchMove($event, true)"
			@touchend="onTouchEnd($event, true)"
			@touchcancel="onTouchEnd($event, true)"
			@mousedown="onDown($event, true)"
			:style="{
				left: vertical ? '50%' : `${realPercentage2}%`,
				top: vertical ? `${realPercentage2}%` : '50%',
				zIndex: isSecondSlider ? 10 : 8,
			}"
		>
			<slot name="rightButton">
				<view class="slider-bar"></view>
			</slot>
		</view>
		<template v-if="showStops">
			<template v-for="(e, i) in markList">
				<view :key="i" class="mark-box" :style="{ left: e.left, top: e.top }">
					<view class="dot" />
					<view class="marks-label" :style="e.style">{{ e.label }}</view>
				</view>
			</template>
		</template>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import useColor from '../../config/color.js';
let color = useColor();
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
	options: {
		virtualHost: true,
	},
	props: {
		value: {
			type: [Number, String, Array, null],
			default: 0,
		},
		min: {
			type: [Number, String, null],
			default: 0,
		},
		max: {
			type: [Number, String, null],
			default: 100,
		},
		step: {
			type: [Number, String, null],
			default: 1,
		},
		barHeight: {
			type: [String, Number, null],
			default: 8,
		},
		buttonSize: {
			type: [String, Number, null],
			default: 40,
		},
		activeColor: {
			type: [String, null],
			default: '',
		},
		inactiveColor: {
			type: [String, null],
			default: '#eeeeee',
		},
		range: {
			type: [Boolean, null],
			default: false,
		},
		vertical: {
			type: [Boolean, null],
			default: false,
		},
		disabled: {
			type: [Boolean, null],
			default: false,
		},
		readonly: {
			type: [Boolean, null],
			default: false,
		},
		showStops: {
			type: [Boolean, null],
			default: false,
		},
		marks: {
			type: [Object, null],
			default: () => {},
		},
	},
	data() {
		return {
			realPercentage: 0,
			realPercentage2: 0, // 范围模式下该值为第二个滑块的值
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
			isMouseDown: false,
			isSecondSlider: false,
		};
	},
	created() {},
	mounted() {
		this.handleWindowResize();
		// #ifdef MP-360
		// 为了兼容测试环境没有uni，wx等, 使用360做条件编译，减少组件库包大小
		if (process.env.NODE_ENV !== 'test') {
			uni.onWindowResize(this.handleWindowResize);
		}
		// #endif
		this.calculateStepMarks();
	},
	beforeDestroy() {
		// #ifdef MP-360
		// 为了兼容测试环境没有uni，wx等, 使用360做条件编译，减少组件库包大小
		if (process.env.NODE_ENV !== 'test') {
			uni.onWindowResize(this.handleWindowResize);
		}
		// #endif
	},
	computed: {
		cmpRootClass() {
			let classStr = '';
			if (this.isDrag) {
				classStr += 'ste-slider-drag ';
			}

			if (this.range) {
				classStr += 'ste-slider-range ';
			}

			if (this.disabled) {
				classStr += 'ste-slider-disabled ';
			}

			if (this.vertical) {
				classStr += 'ste-slider-vertical ';
			} else {
				classStr += 'ste-slider-horizontal ';
			}
			return classStr;
		},
		cmpRootCssVar() {
			const style = {
				'--progress-height': utils.formatPx(this.barHeight),
				'--bar-size': utils.formatPx(this.buttonSize),
				'--active-color': this.activeColor ? this.activeColor : color.getColor().steThemeColor,
			};
			return style;
		},
		cmpInactiveStyle() {
			let style = {};
			if (!this.disabled) {
				const bg = utils.bg2style(this.inactiveColor);
				style = { ...style, ...bg };
			}
			return style;
		},
		cmpActiveStyle() {
			let style = {};
			if (!this.disabled) {
				const bg = utils.bg2style(this.activeColor ? this.activeColor : color.getColor().steThemeColor);
				style = { ...style, ...bg };
			}
			if (this.vertical) {
				if (this.range) {
					style.top = this.realPercentage + '%';
					style.height = this.realPercentage2 - this.realPercentage + '%';
				} else {
					style.height = this.realPercentage + '%';
				}
			} else {
				if (this.range) {
					style.left = this.realPercentage + '%';
					style.width = this.realPercentage2 - this.realPercentage + '%';
				} else {
					style.width = this.realPercentage + '%';
				}
			}
			return style;
		},
	},
	watch: {
		value: {
			handler(val) {
				if (Array.isArray(val)) {
					this.realPercentage = this.getRealValue(val[0]);
					this.realPercentage2 = this.getRealValue(val[1]);
				} else {
					this.realPercentage = this.getRealValue(val);
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
		handleWindowResize() {
			utils.querySelector('.ste-slider-root', this).then((rect) => {
				this.sliderRect = rect;
			});
		},
		// 适配web端没有touch事件
		onDown(e, isSecond) {
			// #ifdef WEB
			this.isMouseDown = true;
			this.onTouchStart({ touches: [{ clientX: e.clientX, clientY: e.clientY }] }, isSecond);
			window.addEventListener('mousemove', this.onTouchMove);
			window.addEventListener('mouseup', this.onTouchEnd);
			// #endif
		},
		removeListenner() {
			// #ifdef WEB
			window.removeEventListener('mousemove', this.onTouchMove);
			window.removeEventListener('mouseup', this.onTouchEnd);
			// #endif
		},
		handleClick(e) {
			if (this.readonly || this.disabled || this.range) return;
			let offsetValue;
			if (this.vertical) {
				let clientY = e.detail.y || e.detail.clientY;
				offsetValue = ((clientY - this.sliderRect.top) / this.sliderRect.height) * 100;
			} else {
				let clientX = e.detail.x || e.detail.clientX;
				offsetValue = ((clientX - this.sliderRect.left) / this.sliderRect.width) * 100;
			}
			this.updateWidth(offsetValue, false);
			this.$emit('change', this.range ? [this.realPercentage, this.realPercentage2] : this.realPercentage);
		},
		onTouchStart(e, isSecond) {
			this.isSecondSlider = !!isSecond;
			this.startPosition = this.getPosition(e);
			this.startPercentage = isSecond ? this.realPercentage2 : this.realPercentage;
			this.$emit('dragStart', e);
		},
		onTouchMove(e) {
			if (this.readonly || this.disabled) return;
			let touches = this.getPosition(e);
			let distance = this.vertical ? touches.clientY - this.startPosition.clientY : touches.clientX - this.startPosition.clientX;
			let containerLength = this.vertical ? this.sliderRect.height : this.sliderRect.width;
			let offsetValue = (distance / containerLength) * 100;
			this.updateWidth(offsetValue, true);
		},
		onTouchEnd(e) {
			this.isDrag = false;
			// this.isSecondSlider = false;
			this.$emit('dragEnd', e);
			this.$emit('change', this.range ? [this.realPercentage, this.realPercentage2] : this.realPercentage);
			this.removeListenner && this.removeListenner();
		},
		// 为了保持web端和移动端事件参数数据结构一致
		getPosition(e) {
			if (e.touches) {
				return e.touches[0];
			} else {
				return { clientX: e.clientX, clientY: e.clientY };
			}
		},
		updateWidth(value, drag) {
			let realValue;
			this.isDrag = drag;
			if (drag) {
				realValue = this.startPercentage + value;
			} else {
				realValue = value;
			}
			const changeValue = this.calculateValue(realValue);
			if (this.isSecondSlider) {
				this.realPercentage2 = changeValue;
			} else {
				this.realPercentage = changeValue;
			}
			this.$emit('input', this.range ? [this.realPercentage, this.realPercentage2] : this.realPercentage);
		},
		// 根据步长和最大最小值来计算每次的滑动
		calculateValue(value) {
			let step = this.hasMarks ? 1 : this.step;
			let min = this.min;
			let max = this.max;

			/**
			 *当范围模式下时，两个滑块不允许交替,
			 *第一个滑块的最大值就是第二个滑块的当前值，
			 * 第二个滑块的最小是就是第一个滑块的当前值
			 */
			if (this.range) {
				if (this.isSecondSlider) {
					min = this.realPercentage;
				} else {
					max = this.realPercentage2;
				}
			}

			// 计算出当前值相对于最小值的偏移量
			const offset = value - min;
			// 根据步长计算出应该是哪个步长点
			const targetValue = Math.round(offset / step) * step + min;
			// 确保计算出的值不会超过最大值和低于最小值
			return this.getRealValue(targetValue, max, min);
		},
		// 根据传入的最大最小值来计算传入的值是否在范围内，并给出范围内的值
		getRealValue(value = 0, max = this.max, min = this.min) {
			return Math.max(Math.min(value, max), min);
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
.ste-slider-root {
	position: relative;
	z-index: 1;
	width: 100%;
	height: var(--progress-height);
	border-radius: 24rpx;

	&.ste-slider-disabled {
		.active-box {
			background-color: #cccccc;
		}

		.inactive-box {
			background-color: #eeeeee;
		}

		.slider-bar-box {
			.slider-bar {
				border-color: #cccccc;
			}
		}
	}

	&.ste-slider-drag {
		.active-box {
			transition: none !important;
		}
		.slider-bar-box {
			transition: none !important;
		}
	}
	&.ste-slider-vertical {
		display: inline-block;
		margin: 0 16rpx;
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
	&.ste-slider-horizontal {
		margin: 16rpx 0;
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
		.slider-bar-box {
		}
	}

	.inactive-box {
		width: 100%;
		height: var(--progress-height);
		border-radius: 24rpx;
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

	.slider-bar-box {
		cursor: grab;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 9;
		padding: 12rpx;

		transition: left 0.3s ease;
		white-space: nowrap;
		/* 其他样式 */
		view {
			white-space: nowrap;
		}
		text {
			white-space: nowrap;
		}
		.slider-bar {
			min-width: var(--bar-size);
			height: var(--bar-size);
			width: var(--bar-size);
			border-radius: 50%;
			background-color: #ffffff;
			border: 2rpx solid var(--active-color);

			display: flex;
			align-items: center;
			justify-content: center;
		}
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