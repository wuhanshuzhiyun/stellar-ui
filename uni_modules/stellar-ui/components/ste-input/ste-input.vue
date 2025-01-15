<template>
	<view class="ste-input-root" :class="cmpRootClass" :style="[cmpRootStyle, cmpRootCssVar]">
		<view class="content" @click="inputClick">
			<view class="prefix-box">
				<slot name="prefix"></slot>
			</view>
			<view class="input-box">
				<template v-if="type == 'textarea'">
					<textarea
						class="ste-input-input textarea"
						:type="type"
						:focus="focus"
						v-model="dataValue"
						:disabled="disabled || readonly"
						:placeholder="placeholder"
						:placeholder-style="placeholderStyle"
						:placeholder-class="placeholderClass"
						:confirm-type="confirmType"
						:cursor-spacing="cursorSpacing"
						@input="onInput"
						@focus="onFocus"
						@blur="onBlur"
						@confirm="onConfirm"
					/>
					<!-- #ifdef H5 || MP-WEIXIN -->
					<text
						class="count-text"
						:style="{
							'background-color': 'transparent',
						}"
						v-if="showWordLimit && maxlength > 0"
					>
						{{ tmpDataValue.length }}/{{ maxlength }}
					</text>
					<!-- #endif -->
				</template>
				<template v-else>
					<input
						class="ste-input-input"
						:type="type"
						:focus="focused"
						v-model="dataValue"
						:disabled="disabled || readonly"
						:placeholder="placeholder"
						:placeholder-style="placeholderStyle"
						:placeholder-class="placeholderClass"
						:confirm-type="confirmType"
						@input="onInput"
						@focus="onFocus"
						@blur="onBlur"
						@confirm="onConfirm"
						:style="[{ width: cmpShowClear ? 'calc(100% - 48rpx)' : 'calc(100% - 8rpx)' }]"
						:cursor-spacing="cursorSpacing"
						:cursor="cursorNumber"
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
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-input
 * @property {Number|String} value 初始内容，支持双向绑定
 * @property {String} type 输入框类型
 * @value text 纯文本输入 {String}
 * @value textarea 文本域 {String}
 * @value tel 电话输入 {String}
 * @value number  数字输入 {String}
 * @value idcard  身份证输入键盘 {String}
 * @value digit 小数点的数字键盘 {String}
 * @value password  密码类型 {String}
 * @value nickname  昵称输入(微信小程序) {String}
 * @value numberpad 仅支付宝小程序 {String}
 * @value digitpad 仅支付宝小程序 {String}
 * @value idcardpad 仅支付宝小程序 {String}
 * @property {String} placeholder 占位符
 * @property {String|Object} placeholderStyle 指定placeholder的样式
 * @property {String} placeholderClass 指定placeholder的类
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} clearable 是否有清空按钮
 * @property {Number} maxlength 最大长度
 * @property {Boolean} showWordLimit 是否显示字数统计
 * @property {String} confirmType 设置右下角按钮的文字
 * @value send 右下角按钮为"发送" {String}
 * @value search 右下角按钮为"搜索" {String}
 * @value next 右下角按钮为"下一个" {String}
 * @value go  右下角按钮为"前往" {String}
 * @value done  右下角按钮为"完成" {String}
 * @property {Boolean} focus 是否聚焦，支持双向绑定
 * @property {String} inputAlign 对齐方式
 * @value left 向左对齐 {String}
 * @value center 居中对齐 {String}
 * @value right 向右对齐{String}
 * @property {Number|String} fontSize 输入框字体大小，单位rpx
 * @property {String} fontColor 输入框字体颜色
 * @property {Boolean} readonly 是否只读，与禁用不同，只读不会置灰
 * @property {String} shape 输入框形状
 * @value square 方形 {String}
 * @value circle 圆形 {String}
 * @value line 线形 {String}
 * @property {Boolean} border 是否有边框
 * @property {String} borderColor 边框颜色
 * @property {String} background 输入框背景色
 * @property {String} rootClass 自定义输入框类名
 * @property {Number} cursorSpacing 指定光标与键盘的距离
 * @property {Boolean} allowSpace 是否允许输入空格
 * @event {Function} blur 输入框失去焦点时触发
 * @event {Function} focus 输入框聚焦时触发
 * @event {Function} confirm 输入键盘点击右下角触发
 * @event {Function} clear 输入框清空触发
 * @event {Function} input 输入框输入事件
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
			type: [String, Number, null],
			default: '',
		},
		type: {
			type: [String, null],
			default: 'text',
		},
		placeholder: {
			type: [String, null],
			default: '',
		},
		placeholderStyle: {
			type: [String, Object, null],
			default: 'color: #BBBBBB',
		},
		placeholderClass: {
			type: [String, null],
			default: 'ste-input-placeholder',
		},
		disabled: {
			type: [Boolean, null],
			default: false,
		},
		clearable: {
			type: [Boolean, null],
			default: true,
		},
		maxlength: {
			type: [Number, null],
			default: -1,
		},
		showWordLimit: {
			type: [Boolean, null],
			default: false,
		},
		confirmType: {
			type: [String, null],
			default: 'done',
		},
		focus: {
			type: [Boolean, null],
			default: false,
		},
		inputAlign: {
			type: [String, null],
			default: 'left',
		},
		fontSize: {
			type: [String, Number, null],
			default: 24,
		},
		fontColor: {
			type: [String, null],
			default: '#000000',
		},
		readonly: {
			type: [Boolean, null],
			default: false,
		},
		shape: {
			type: [String, null],
			default: 'square',
		},
		border: {
			type: [Boolean, null],
			default: false,
		},
		borderColor: {
			type: [String, null],
			default: '',
		},
		background: {
			type: [String, null],
			default: '',
		},
		rootClass: {
			type: [String, null],
			default: '',
		},
		cursorSpacing: {
			type: [Number, null],
			default: 20,
		},
		allowSpace: {
			type: [Boolean, null],
			default: true,
		},
		cursor: {
			type: [Number, null],
			default: 0,
		},
	},
	data() {
		return {
			dataValue: '',
			tmpDataValue: '', // 用于记录输入值，type="textarea"时显示字数长度（直接使用dataValue时某些情况可能出现输入延迟）
			focused: this.focus,
			cursorNumber: 0,
		};
	},
	created() {},
	mounted() {},
	computed: {
		cmpRootClass() {
			let classStr = '';
			if (this.disabled) {
				classStr += 'ste-input-disabled ';
			}
			if (this.readonly) {
				classStr += 'ste-input-readonly ';
			}

			classStr += `ste-input-${this.shape} `;

			if (this.rootClass) {
				classStr += `${this.rootClass} `;
			}

			if (this.type == 'textarea') {
				classStr += 'textarea-type ';
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
				if (!this.allowSpace) {
					e.detail.value = e.detail.value.replace(/\s*/g, '');
				}
				this.$nextTick(() => {
					if (this.maxlength > 0) {
						this.dataValue = e.detail.value.substring(0, this.maxlength);
					}
					this.tmpDataValue = this.dataValue;
					this.$emit('input', this.dataValue);
				});
			}
		},
		onClear() {
			if (this.disabled && !this.readonly) return;

			this.dataValue = '';
			this.$emit('input', this.dataValue);
			this.$emit('clear');
		},
		onFocus() {
			if (this.disabled && !this.readonly) return;
			this.focused = true;
			this.$emit('update:focus', true);
			this.$emit('focus', this.dataValue);
		},
		onBlur() {
			setTimeout(() => {
				this.$emit('update:focus', false);
				this.focused = false;
				this.$emit('blur', this.dataValue);
			}, 200);
		},
		onConfirm() {
			this.$emit('confirm', this.dataValue);
		},
		inputClick() {
			this.onFocus();
		},
	},
	watch: {
		value: {
			handler(val) {
				this.dataValue = val;
				this.tmpDataValue = val;
			},
			immediate: true,
		},
		focus: {
			handler(val) {
				setTimeout(() => {
					this.focused = val;
				}, 50);
			},
		},
		cursor: {
			handler(val) {
				this.cursorNumber = val;
			},
			immediate: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-input-root {
	position: relative;
	box-sizing: border-box;
	border-width: 1rpx;
	border-style: solid;
	border-color: var(--input-border-color);
	background-color: #ffffff;
	.content {
		display: flex;
		align-items: center;
		padding: 0 24rpx;
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

			.ste-input-input {
				outline: none;
				border: none;
				padding: 0;
				margin: 0;
				height: calc(var(--input-font-size) * 2.8);
				width: 100%;

				font-size: var(--input-font-size);
				color: var(--input-font-color);

				text-align: var(--input-text-align);

				background-color: transparent;

				// letter-spacing: 10rpx;

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

	&.ste-input-readonly {
		cursor: not-allowed;
		.ste-input-input {
			cursor: not-allowed;
		}
	}
	&.ste-input-disabled {
		cursor: not-allowed;
		.ste-input-input {
			cursor: not-allowed;
			color: #cccccc !important;
		}
	}

	&.ste-input-line {
		background-color: transparent;
		border: none;
		border-color: transparent;

		.content {
			padding: 0 0;
		}

		.line {
			border-bottom: 2rpx solid var(--input-line-color);
		}
	}

	&.ste-search-input {
		height: 100%;

		// #ifdef MP-ALIPAY
		background-color: rgba(0, 0, 0, 0);
		// #endif

		.content {
			padding: 0;
			height: 100%;
		}
	}

	&.textarea-type {
		height: 100%;
		.content {
			padding: 20rpx 24rpx;
			height: 100%;

			.input-box {
				height: 100%;
			}
		}
	}
}
</style>
