<template>
	<view class="ste-checkbox--root" :style="[cmpStyle]" @click="click" data-test="checkbox">
		<view class="icon">
			<slot name="icon" :slotProps="cmpSlotProps">
				<view class="input-icon" data-test="checkbox-icon" :style="[cmpInputStyle]">
					<ste-icon v-if="cmpChecked && cmpIconSize" :size="cmpIconSize * 0.8" code="&#xe67a;"
						:color="cmpDisabled ? '#bbbbbb' : '#fff'" bold></ste-icon>
				</view>
			</slot>
		</view>
		<view class="text">
			<slot :slotProps="cmpSlotProps"></slot>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import useColor from '../../config/color.js';
import { configChildMixin } from '../../utils/mixin.js';
let color = useColor();
/**
 * ste-checkbox 复选框
 * @description 复选框组件,在一组备选项中进行多选。
 * @tutorial https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui&menu=%E7%BB%84%E4%BB%B6&active=ste-checkbox
 * @property {Boolean} value 当前选中值（支持v-model双向绑定） 默认 false
 * @property {Number|String} name 选项的值
 * @property {Boolean} disabled 禁用 默认 false
 * @property {Boolean} readonly 只读（不置灰） 默认 false
 * @property {String} shape 形状 默认 circle
 * @value circle 圆形 默认 {{String}}
 * @value square 方形 {{String}}
 * @property {Number|String} iconSize 图标大小，单位rpx 默认 36
 * @property {String} checkedColor 选中状态的图标颜色 默认 ##0090FF
 * @property {String} textPosition 文本的位置 默认 right
 * @value right 右 默认 {{String}}
 * @value left 左 {{String}}
 * @property {Number|String} textSize 文本字体大小，单位rpx 默认 28
 * @property {String} textInactiveColor 未选中的文本颜色 默认 #000000
 * @property {String} textActiveColor 选中的文本颜色 默认 #000000
 * @property {Boolean} textDisabled 禁用文本点击 默认 false
 * @property {Number|String} marginLeft 左边距，单位rpx 默认 0
 * @property {Number|String} marginRight 右边距，单位rpx 默认 0
 * @property {Number|String} columnGap 复选框和文本间距，单位rpx 默认 16
 * @event {Function} click 点击复选框时触发的事件
 * @event {Function} change 当绑定值变化时触发的事件
 */
export default {
	group: '表单组件',
	title: 'Checkbox 复选框',
	name: 'ste-checkbox',
	mixins: [configChildMixin('checkboxGroup')],
	props: {
		value: {
			type: [Boolean, null],
			default: false,
		},
		name: {
			type: [Number, String, null],
			default: '',
		},
		disabled: {
			type: [Boolean, null],
			default: null,
		},
		readonly: {
			type: [Boolean, null],
			default: null,
		},
		shape: {
			type: [String, null],
			default: null,
		},
		iconSize: {
			type: [Number, String, null],
			default: null,
		},
		checkedColor: {
			type: [String, null],
			default: null,
		},
		textPosition: {
			type: [String, null],
			default: null,
		},
		textSize: {
			type: [Number, String, null],
			default: null,
		},
		textInactiveColor: {
			type: [String, null],
			default: null,
		},
		textActiveColor: {
			type: [String, null],
			default: null,
		},
		textDisabled: {
			type: [Boolean, null],
			default: null,
		},
		marginLeft: {
			type: [Number, String, null],
			default: null,
		},
		marginRight: {
			type: [Number, String, null],
			default: null,
		},
		columnGap: {
			type: [Number, String, null],
			default: null,
		},
	},
	model: {
		prop: 'value',
		// 派发事件名，更新父组件数据
		event: 'input',
	},
	data() {
		return {
			num: 1, // 解决支付宝小程序checkboxGroup.value更新不触发计算属性的问题
		};
	},
	computed: {
		cmpDisabled() {
			let disabled = this.getParentProp('disabled', false);
			// 限制最大可选数
			if (this.$hasParent && this.parent.max) {
				if (!this.cmpChecked && this.parent.value.length >= this.parent.max) {
					disabled = true;
				}
			}
			return disabled;
		},
		cmpReadonly() {
			return this.getParentProp('readonly', false);
		},
		cmpShape() {
			return this.getParentProp('shape', 'circle');
		},
		cmpIconSize() {
			return this.getParentProp('iconSize', 36);
		},
		cmpCheckedColor() {
			return this.getParentProp('checkedColor', color.getColor().steThemeColor);
		},
		cmpTextPosition() {
			return this.getParentProp('textPosition', 'right');
		},
		cmpTextSize() {
			return this.getParentProp('textSize', 28);
		},
		cmpTextInactiveColor() {
			return this.getParentProp('textInactiveColor', '#000000');
		},
		cmpTextActiveColor() {
			return this.getParentProp('textActiveColor', '#000000');
		},
		cmpTextDisabled() {
			return this.getParentProp('textDisabled', false);
		},
		cmpMarginLeft() {
			return this.getParentProp('marginLeft', '0');
		},
		cmpMarginRight() {
			return this.getParentProp('marginRight', '0');
		},
		cmpColumnGap() {
			return this.getParentProp('columnGap', '16');
		},
		cmpSlotProps() {
			return {
				checked: this.cmpChecked,
				disabled: this.cmpDisabled,
				readonly: this.cmpReadonly,
			};
		},
		cmpStyle() {
			let style = {};
			style['fontSize'] = utils.formatPx(this.cmpTextSize);
			style['color'] = this.cmpChecked ? this.cmpTextActiveColor : this.cmpTextInactiveColor;
			style['flexDirection'] = this.cmpTextPosition == 'right' ? 'row' : 'row-reverse';
			style['columnGap'] = utils.formatPx(this.cmpColumnGap);
			style['marginLeft'] = utils.formatPx(this.cmpMarginLeft);
			style['marginRight'] = utils.formatPx(this.cmpMarginRight);
			// #ifdef H5
			if (this.cmpDisabled || this.cmpReadonly) {
				style['cursor'] = 'not-allowed';
			} else if (this.cmpTextDisabled) {
				style['cursor'] = 'default';
			} else {
				style['cursor'] = 'pointer';
			}
			// #endif
			if (this.cmpTextDisabled) {
				style['pointerEvents'] = 'none';
			}
			return style;
		},
		cmpInputStyle() {
			let style = {};
			// 没有icon 则默认样式
			style['borderRadius'] = this.cmpShape == 'circle' ? '50%' : '0';
			style['border'] = `${utils.formatPx(2)} solid ${this.cmpChecked ? this.cmpCheckedColor : '#BBBBBB'}`;
			style['background'] = this.cmpChecked ? this.cmpCheckedColor : '#FFFFFF';
			style['width'] = utils.formatPx(this.cmpIconSize);
			style['height'] = utils.formatPx(this.cmpIconSize);
			style['lineHeight'] = utils.formatPx(this.cmpIconSize);
			// #ifdef H5
			if (this.cmpDisabled || this.cmpReadonly) {
				style['cursor'] = 'not-allowed';
			} else {
				style['cursor'] = 'pointer';
			}
			// #endif
			if (this.cmpDisabled) {
				style['background'] = '#eeeeee';
				style['borderColor'] = '#bbbbbb';
			}

			// 在没有使用插槽内容时去掉边距
			if (!this.$slots.default) {
				style['columnGap'] = 0;
			}
			return style;
		},
		// 选中状态
		// 注意：使用宽松相等比较，避免 value（字符串数组）和 name（数字）类型不一致导致匹配失败
		cmpChecked() {
			if (this.num && this.$hasParent) {
				return this.parent.value.some((v) => v == this.name);
			}
			return this.value;
		},
	},
	methods: {
		click() {
			if (this.cmpDisabled || this.cmpReadonly) {
				return;
			}

			// 如果有 click 事件监听器，先触发事件
			// 使用 $listeners 判断是否有 click 事件回调
			if (this.$listeners?.click) {
				let stopped = false;
				const next = () => {
					// 不阻止后续操作
				};
				const stop = () => {
					stopped = true;
				};
				// 同步触发 click 事件回调
				this.$emit('click', this.value, next, stop);
				// 如果用户调用了 stop()，则不执行后续逻辑
				if (stopped) {
					return;
				}
			}

			let value = null;
			if (this.$hasParent) {
				value = this.parent.value;
				if (this.cmpChecked) {
					value = value.filter((value) => value != this.name);
				} else {
					value.push(this.name);
				}
				this.parent.$emit('input', value);
				this.parent.$emit('change', value);
				this.num++;
			} else {
				value = !this.cmpChecked;
				this.$emit('input', !this.cmpChecked);
			}
			this.$emit('change', value);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-checkbox--root {
	width: auto;
	height: 100%;
	display: flex;
	align-items: center;

	.input-icon {
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.icon {
		pointer-events: all;
	}

	.text {
		display: flex;
		align-items: center;
		height: 100%;
	}
}
</style>
