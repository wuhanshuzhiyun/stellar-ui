<template>
	<view class="ste-input--root" :class="cmpRootClass" :style="[cmpRootStyle, cmpRootCssVar]">
		<view class="content">
			<view class="prefix-box">
				<slot name="prefix"></slot>
			</view>
			<view class="input-box">
				<template v-if="type == 'textarea'">
					<textarea
						class="ste-input--input textarea"
						:type="type"
						:focus="focus"
						:value="dataValue"
						:disabled="disabled || readonly"
						:maxlength="maxlength"
						:placeholder="placeholder"
						:placeholder-style="placeholderStyle"
						:placeholder-class="placeholderClass"
						:confirm-type="confirmType"
						@input="onInput"
						@focus="onFocus"
						@blur="onBlur"
						@confirm="onConfirm"
					/>
					<text
						class="count-text"
						:style="{
							'background-color': disabled ? 'transparent' : '#fff',
						}"
						v-if="showWordLimit && maxlength > 0"
					>
						{{ dataValue.length }}/{{ maxlength }}
					</text>
				</template>
				<template v-else>
					<input
						class="ste-input--input"
						:type="type"
						:focus="focused"
						:value="dataValue"
						:disabled="disabled || readonly"
						:maxlength="maxlength"
						:placeholder="placeholder"
						:placeholder-style="placeholderStyle"
						:placeholder-class="placeholderClass"
						:confirm-type="confirmType"
						@input="onInput"
						@focus="onFocus"
						@blur="onBlur"
						@confirm="onConfirm"
						:style="[{ width: cmpShowClear ? 'calc(100% - 48rpx)' : 'calc(100% - 8rpx)' }]"
					/>
					<view v-if="cmpShowClear" class="clear-icon" @click="onClear">
						<ste-icon code="&#xe694;" color="#bbbbbb" size="34" />
					</view>
				</template>
			</view>
			<view class="suffix-box">
				<slot name="suffix"></slot>
			</view>
		</view>
		<view class="line" v-if="shape == 'line'" />
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-input 输入框
 * @description 输入框组件
 * @tutorial https://stellar-ui.intecloud.com.cn//pc/index/index?name=ste-input
 */
export default {
	group: '表单组件',
	title: 'Input 输入框',
	name: 'ste-input',
	options: {
		virtualHost: true,
	},
	props: {
		value: {
			type: [String, Number],
			default: '',
		},
		type: {
			type: String,
			default: 'text',
		},
		placeholder: {
			type: String,
			default: '',
		},
		placeholderStyle: {
			type: [String, Object],
			default: 'color: #BBBBBB',
		},
		placeholderClass: {
			type: String,
			default: 'ste-input-placeholder',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		clearable: {
			type: Boolean,
			default: true,
		},
		maxlength: {
			type: Number,
			default: -1,
		},
		showWordLimit: {
			type: Boolean,
			default: false,
		},
		confirmType: {
			type: String,
			default: 'done',
		},
		focus: {
			type: Boolean,
			default: false,
		},
		inputAlign: {
			type: String,
			default: 'left',
		},
		fontSize: {
			type: [String, Number],
			default: 24,
		},
		fontColor: {
			type: String,
			default: '#000000',
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		shape: {
			type: String,
			default: 'square',
		},
		border: {
			type: Boolean,
			default: false,
		},
		borderColor: {
			type: String,
			default: '',
		},
		background: {
			type: String,
			default: '',
		},
		rootClass: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			dataValue: '',
			focused: this.focus,
		};
	},
	created() {},
	mounted() {},
	computed: {
		cmpRootClass() {
			let classStr = '';
			if (this.disabled) {
				classStr += 'ste-input--disabled ';
			}
			if (this.readonly) {
				classStr += 'ste-input--readonly ';
			}

			classStr += `ste-input--${this.shape} `;

			if (this.rootClass) {
				classStr += `${this.rootClass}`;
			}
			return classStr;
		},
		cmpRootStyle() {
			let style = utils.bg2style(this.background);

			switch (this.shape) {
				case 'circle':
					style.borderRadius = utils.addUnit(40);
					break;
				case 'square':
					style.borderRadius = utils.addUnit(16);
					break;
				default:
					break;
			}
			return style;
		},
		cmpRootCssVar() {
			let style = {
				'--input-font-size': utils.addUnit(this.fontSize),
				'--input-font-color': this.fontColor,
				'--input-text-align': this.inputAlign,
				'--input-line-color': this.borderColor || '#eeeeee',
				'--input-border-color': this.border ? this.borderColor : 'transparent',
			};
			return style;
		},

		cmpShowClear() {
			return !this.disabled && !this.readonly && this.clearable && this.dataValue && this.focused;
		},
	},
	methods: {
		onInput(e) {
			if (!this.disabled && !this.readonly) {
				this.dataValue = e.detail.value;
				this.$emit('input', e.detail.value);
			}
		},
		onClear() {
			if (this.disabled) return;
			this.dataValue = '';
			this.$emit('input', this.dataValue);
			this.$emit('clear');
		},
		onFocus() {
			if (this.disabled) return;
			this.focused = true;
			this.$emit('update:focus', true);
			this.$emit('focus', this.dataValue);
		},
		onBlur() {
			setTimeout(() => {
				this.$emit('update:focus', false);
				this.focused = false;
			}, 50);
			this.$emit('blur', this.dataValue);
		},
		onConfirm() {
			this.$emit('confirm', this.dataValue);
		},
	},
	watch: {
		value: {
			handler(val) {
				this.dataValue = val;
			},
			immediate: true,
		},
		focus: {
			handler(val) {
				this.focused = val;
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-input--root {
	box-sizing: border-box;

	border-width: 1rpx;
	border-style: solid;
	border-color: var(--input-border-color);
	background-color: #ffffff;
	.content {
		display: flex;
		align-items: center;
		padding: 20rpx 24rpx;
		.suffix-box,
		.prefix-box {
			display: flex;
			flex-direction: column;
			flex-shrink: 0;
			flex-grow: 0;
			flex-basis: auto;
			align-items: stretch;

			font-size: var(--input-font-size);
		}
		.input-box {
			position: relative;
			width: 100%;

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

			.ste-input--input {
				outline: none;
				border: none;
				padding: 0;
				margin: 0;

				width: 100%;

				font-size: var(--input-font-size);
				color: var(--input-font-color);

				text-align: var(--input-text-align);

				&.textarea {
					height: 160rpx;
				}
			}

			.count-text {
				position: absolute;
				bottom: 0;
				right: 0;
				font-size: 24rpx;
				color: #bbbbbb;
			}
		}
	}

	&.ste-input--disabled {
		.ste-input--input {
			color: #cccccc !important;
		}
	}

	&.ste-input--line {
		background-color: transparent;
		border: none;
		border-color: transparent;
		// border-bottom: 1rpx solid var(--input-border-color);

		.content {
			padding: 20rpx 0;
		}

		.line {
			border-bottom: 2rpx solid var(--input-line-color);
		}
	}
}
</style>
