<template>
	<view class="ste-code-input-root">
		<view class="ste-code-input-item" :style="[itemStyle(index)]" v-for="(item, index) in codeLength" :key="index">
			<view class="ste-code-input-item-dot" v-if="dot && codeArray.length > index"></view>
			<text
				v-else
				:style="{
					fontSize: fontSize + 'rpx',
					fontWeight: bold ? 'bold' : 'normal',
					color: color,
				}"
			>
				{{ codeArray[index] }}
			</text>
			<view class="ste-code-input-item-line" v-if="mode === 'line'" :style="[lineStyle]"></view>
			<view
				v-if="isFocus && codeArray.length === index"
				:style="{ backgroundColor: color }"
				class="ste-code-input-item-cursor"
			></view>
		</view>
		<input
			:disabled="disabledKeyboard"
			type="number"
			:focus="focus"
			:value="inputValue"
			:maxlength="maxlength"
			:adjustPosition="adjustPosition"
			class="ste-code-input-input"
			@input="inputHandler"
			:style="{
				height: size + 'rpx',
			}"
			@focus="isFocus = true"
			@blur="isFocus = false"
		/>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-code-input 验证码输入
 * @description 验证码输入组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-code-input
 */
export default {
	group: '表单组件',
	title: 'CodeInput 验证码输入组件',
	name: 'ste-code-input',
	props: {
		// 键盘弹起时，是否自动上推页面
		adjustPosition: {
			type: Boolean,
			default: true,
		},
		// 最大输入长度
		maxlength: {
			type: [String, Number],
			default: 6,
		},
		// 是否用圆点填充
		dot: {
			type: Boolean,
			default: false,
		},
		// 显示模式，box-盒子模式，line-底部横线模式
		mode: {
			type: String,
			default: 'box',
		},
		// 是否细边框
		hairline: {
			type: Boolean,
			default: false,
		},
		// 字符间的距离
		space: {
			type: [String, Number],
			default: 10,
		},
		// 预置值
		value: {
			type: [String, Number],
			default: '',
		},
		// 是否自动获取焦点
		focus: {
			type: Boolean,
			default: false,
		},
		// 字体是否加粗
		bold: {
			type: Boolean,
			default: false,
		},
		// 字体颜色
		color: {
			type: String,
			default: '#606266',
		},
		// 字体大小
		fontSize: {
			type: [String, Number],
			default: 28,
		},
		// 输入框的大小，宽等于高
		size: {
			type: [String, Number],
			default: 70,
		},
		// 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
		disabledKeyboard: {
			type: Boolean,
			default: false,
		},
		// 边框和线条颜色
		borderColor: {
			type: String,
			default: '#c9cacc',
		},
		// 是否禁止输入"."符号
		disabledDot: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			inputValue: '',
			isFocus: this.focus,
		};
	},
	watch: {
		value: {
			immediate: true,
			handler(val) {
				// 转为字符串，超出部分截掉
				this.inputValue = String(val).substring(0, this.maxlength);
			},
		},
	},
	computed: {
		// 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
		codeLength() {
			return new Array(Number(this.maxlength));
		},
		// 循环item的样式
		itemStyle() {
			return (index) => {
				const style = {
					width: utils.addUnit(this.size),
					height: utils.addUnit(this.size),
				};
				// 盒子模式下，需要额外进行处理
				if (this.mode === 'box') {
					// 设置盒子的边框，如果是细边框，则设置为0.5px宽度
					style.border = `${this.hairline ? 0.5 : 1}px solid ${this.borderColor}`;
					// 如果盒子间距为0的话
					if (this.space === 0) {
						// 给第一和最后一个盒子设置圆角
						if (index === 0) {
							style.borderTopLeftRadius = '3px';
							style.borderBottomLeftRadius = '3px';
						}
						if (index === this.codeLength.length - 1) {
							style.borderTopRightRadius = '3px';
							style.borderBottomRightRadius = '3px';
						}
						// 最后一个盒子的右边框需要保留
						if (index !== this.codeLength.length - 1) {
							style.borderRight = 'none';
						}
					}
				}
				if (index !== this.codeLength.length - 1) {
					// 设置验证码字符之间的距离，通过margin-right设置，最后一个字符，无需右边框
					style.marginRight = utils.addUnit(this.space);
				} else {
					// 最后一个盒子的有边框需要保留
					style.marginRight = 0;
				}

				return style;
			};
		},
		// 将输入的值，转为数组，给item历遍时，根据当前的索引显示数组的元素
		codeArray() {
			return String(this.inputValue).split('');
		},
		// 下划线模式下，横线的样式
		lineStyle() {
			const style = {};
			style.height = this.hairline ? '2px' : '4px';
			style.width = utils.addUnit(this.size);
			// 线条模式下，背景色即为边框颜色
			style.backgroundColor = this.borderColor;
			return style;
		},
	},
	methods: {
		addUnit: utils.addUnit,
		// 监听输入框的值发生变化
		inputHandler(e) {
			const value = e.detail.value;
			this.inputValue = value;
			// 是否允许输入“.”符号
			if (this.disabledDot) {
				this.$nextTick(() => {
					this.inputValue = value.replace('.', '');
				});
			}
			// 未达到maxlength之前，发送change事件，达到后发送finish事件
			this.$emit('change', value);
			// 修改通过v-model双向绑定的值
			this.$emit('input', value);
			// 达到用户指定输入长度时，发出完成事件
			if (String(value).length >= Number(this.maxlength)) {
				this.$emit('finish', value);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-code-input {
	&-root {
		display: flex;
		flex-direction: row;
		position: relative;
		overflow: hidden;
	}
	&-item {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;

		&-text {
			font-size: 15px;
			color: #606266;
		}

		&-dot {
			width: 7px;
			height: 7px;
			border-radius: 100px;
			background-color: #606266;
		}

		&-line {
			position: absolute;
			bottom: 0;
			height: 4px;
			border-radius: 100px;
			width: 40px;
			background-color: #606266;
		}
		&-cursor {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 2rpx;
			height: 40%;
			animation: 0.8s code-input-cursor-flicker infinite;
		}
	}

	&-input {
		// 之所以需要input输入框，是因为有它才能唤起键盘
		// 这里将它设置为两倍的屏幕宽度，再将左边的一半移出屏幕，为了不让用户看到输入的内容
		position: absolute;
		left: -100vw;
		width: 200vw;
		top: 0;
		background-color: transparent;
		text-align: left;
	}

	@keyframes code-input-cursor-flicker {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
}
</style>
