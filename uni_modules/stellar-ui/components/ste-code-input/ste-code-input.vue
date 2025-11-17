<template>
	<view class="ste-code-input-root" :style="[cmpRootStyle]">
		<view class="ste-code-input-item" :style="[getItemStyle(index)]" v-for="(item, index) in cmpCodeLengthArray"
			:key="index">
			<text class="ste-code-input-item-dot" v-if="formatter && cmpCodeArray.length > index">
				{{ formatter }}
			</text>
			<text class="ste-code-input-item-text" v-else>
				{{ cmpCodeArray[index] || '' }}
			</text>
			<view class="ste-code-input-item-line" v-if="mode === 'line'"></view>
			<view v-if="isFocus && cmpCodeArray.length === index" :style="{ backgroundColor: fontColor }"
				class="ste-code-input-item-cursor"></view>
		</view>
		<input v-if="!readOnly" type="number" :focus="focus" :value="inputValue" :maxlength="maxlength" adjustPosition
			class="ste-code-input-input" cursor-spacing="30" @input="inputHandler" :style="{
				height: size + 'rpx',
			}" @focus="isFocus = true" @blur="isFocus = false" />
	</view>
</template>

<script>
	import utils from '../../utils/utils.js';
	/**
	 * ste-code-input 验证码输入
	 * @description 验证码输入组件
	 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-code-input
	 * @property {Number|String} value 初始内容，支持双向绑定
	 * @property {String} mode 输入框类型
	 * @value box 盒子模式 {String}
	 * @value line 底部横线模式 {String}
	 * @property {Number} maxlength 最大长度
	 * @property {Number|String} space 字符间的距离
	 * @property {String} fontColor 字体颜色
	 * @property {String} borderColor 边框和线条颜色
	 * @property {Number|String} fontSize 字体大小
	 * @property {Number|String} size 输入框的大小，宽等于高
	 * @property {Number|String} formatter 替换输入值
	 * @property {Boolean} focus 是否自动获取焦点
	 * @property {Boolean} disabledDot 是否禁止输入"."符号 默认 true
	 * @property {Boolean} readOnly 是否只读 默认 false
	 * @event {Function} change 输入内容发生改变时触发
	 * @event {Function} finish 输入字符个数达maxlength值时触发
	 */
	export default {
		group: '表单组件',
		title: 'CodeInput 验证码输入组件',
		name: 'ste-code-input',
		props: {
			value: {
				type: [String, Number, null],
				default: '',
			},
			// 显示模式，box-盒子模式，line-底部横线模式
			mode: {
				type: [String, null],
				default: 'box',
			},
			// 最大输入长度
			maxlength: {
				type: [String, Number, null],
				default: 6,
			},
			// 字符间的距离
			space: {
				type: [String, Number, null],
				default: 16,
			},
			// 字体颜色
			fontColor: {
				type: [String, null],
				default: '#000000',
			},
			// 边框和线条颜色
			borderColor: {
				type: [String, null],
				default: '#DDDDDD',
			},
			// 字体大小
			fontSize: {
				type: [String, Number, null],
				default: 28,
			},
			// 输入框的大小，宽等于高
			size: {
				type: [String, Number, null],
				default: 64,
			},
			// 替换输入值
			formatter: {
				type: [String, Number, null],
				default: '',
			},
			// 是否自动获取焦点
			focus: {
				type: [Boolean, null],
				default: false,
			},
			// 是否禁止输入"."符号
			disabledDot: {
				type: [Boolean, null],
				default: true,
			},
			readOnly: {
				type: [Boolean, null],
				default: false,
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
			// 根据长度，循环输入框的个数
			cmpCodeLengthArray() {
				return new Array(Number(this.maxlength));
			},
			// 将输入的值，转为数组，给item历遍时，根据当前的索引显示数组的元素
			cmpCodeArray() {
				return String(this.inputValue).split('');
			},
			cmpRootStyle() {
				const style = {
					'--font-size': utils.formatPx(this.fontSize),
					'--font-color': this.fontColor,
					'--line-width': utils.formatPx(this.size),
					'--line-background-color': this.borderColor,
				};
				return style;
			},
		},
		methods: {
			// 监听输入框的值发生变化
			getItemStyle(index) {
				const style = {
					width: utils.formatPx(this.size),
					height: utils.formatPx(this.size),
				};
				// 盒子模式下，需要额外进行处理
				if (this.mode === 'box') {
					style.border = `2rpx solid ${this.borderColor}`;
					style.backgroundColor = '#F5F5F5';
					// 如果盒子间距为0的话
					if (this.space === 0) {
						// 给第一和最后一个盒子设置圆角
						if (index === 0) {
							style.borderTopLeftRadius = '3px';
							style.borderBottomLeftRadius = '3px';
						}
						if (index === this.maxlength - 1) {
							style.borderTopRightRadius = '3px';
							style.borderBottomRightRadius = '3px';
						}
						// 最后一个盒子的右边框需要保留
						if (index !== this.maxlength - 1) {
							style.borderRight = 'none';
						}
					} else {
						style.borderRadius = '10rpx';
					}
				}
				if (index !== this.maxlength - 1) {
					// 设置验证码字符之间的距离，通过margin-right设置，最后一个字符，无需右边框
					style.marginRight = utils.formatPx(this.space);
				} else {
					// 最后一个盒子的有边框需要保留
					style.marginRight = 0;
				}

				return style;
			},
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
			display: inline-flex;
			flex-direction: row;
			position: relative;
			overflow: hidden;
		}

		&-item {
			// display: flex;
			// justify-content: center;
			// align-items: center;
			// position: relative;
			position: relative;

			&-text {
				font-size: var(--font-size);
				color: var(--font-color);

				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			&-dot {
				display: inline-flex;
				line-height: 1;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);

				font-size: var(--font-size);
				color: var(--font-color);
			}

			&-line {
				position: absolute;
				bottom: 0;
				height: 4rpx;
				border-radius: 40rpx;
				width: var(--line-width);
				background-color: var(--line-background-color);
			}

			&-cursor {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 2rpx;
				height: 55%;
				animation: 0.8s code-input-cursor-flicker infinite;
			}
		}

		&-input {
			position: absolute;
			left: -100vw;
			width: 200vw;
			top: 0;
			opacity: 0;
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