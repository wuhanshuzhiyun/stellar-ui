<template>
	<view class="ste-checkbox--root" :style="[cmpStyle]" @click="click">
		<view class="icon">
			<slot name="icon" :slotProps="cmpSlotProps">
				<view class="input-icon" :style="[cmpInputStyle]">
					<ste-icon
						v-if="cmpChecked && cmpIconSize"
						:size="cmpIconSize * 0.8"
						code="&#xe67a;"
						:color="cmpDisabled ? '#bbbbbb' : '#fff'"
						bold
					></ste-icon>
				</view>
			</slot>
		</view>
		<div class="text">
			<slot :slotProps="cmpSlotProps"></slot>
		</div>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';

/**
 * ste-checkbox 复选框
 * @description 复选框组件,在一组备选项中进行多选。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-checkbox
 * @property {Boolean} value 当前选中值（支持v-model双向绑定） 默认 false
 * @property {Number|String} name 选项的值
 * @property {Boolean} disabled 禁用 默认 false
 * @property {Boolean} readonly 只读（不置灰） 默认 false
 * @property {String} shape 形状 默认 circle
 * @value circle 圆形 默认 {{String}}
 * @value square 方形 {{String}}
 * @property {Number|String} iconSize 图标大小，单位rpx 默认 36
 * @property {String} checkedColor 选中状态的图标颜色 默认 #0090FF0
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
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		name: {
			type: [Number, String],
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
	inject: {
		checkboxGroup: {
			default: '',
		},
	},
	data() {
		return {
			clickTask: null, // click完成任务和allowStopStatus搭配使用
			allowStopStatus: false, // 允许阻止后续的事件触发
			num: 1, // 解决支付宝小程序checkboxGroup.value更新不触发计算属性的问题
		};
	},
	computed: {
		cmpDisabled() {
			let disabled = this.getDefaultData('disabled', false);
			// 限制最大可选数
			if (this.cmpGroup && this.checkboxGroup.max) {
				if (!this.cmpChecked && this.checkboxGroup.value.length >= this.checkboxGroup.max) {
					disabled = true;
				}
			}
			return disabled;
		},
		cmpReadonly() {
			return this.getDefaultData('readonly', false);
		},
		cmpShape() {
			return this.getDefaultData('shape', 'circle');
		},
		cmpIconSize() {
			return this.getDefaultData('iconSize', 36);
		},
		cmpCheckedColor() {
			return this.getDefaultData('checkedColor', '#0090FF');
		},
		cmpTextPosition() {
			return this.getDefaultData('textPosition', 'right');
		},
		cmpTextSize() {
			return this.getDefaultData('textSize', 28);
		},
		cmpTextInactiveColor() {
			return this.getDefaultData('textInactiveColor', '#000000');
		},
		cmpTextActiveColor() {
			return this.getDefaultData('textActiveColor', '#000000');
		},
		cmpTextDisabled() {
			return this.getDefaultData('textDisabled', false);
		},
		cmpMarginLeft() {
			return this.getDefaultData('marginLeft', '0');
		},
		cmpMarginRight() {
			return this.getDefaultData('marginRight', '0');
		},
		cmpColumnGap() {
			return this.getDefaultData('columnGap', '16');
		},
		cmpSlotProps() {
			return {
				checked: this.cmpChecked,
				disabled: this.cmpDisabled,
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
		cmpChecked() {
			return this.num && this.cmpGroup ? this.checkboxGroup.value.includes(this.name) : this.value;
		},
		cmpGroup() {
			return !!this.checkboxGroup;
		},
	},
	methods: {
		async click() {
			if (!this.cmpDisabled && !this.cmpReadonly) {
				this.allowStopStatus = false;
				this.clickTask = new Promise((resolve) => {
					this.$emit('click', this.value, this.allowStop, resolve);
				});
				if (this.allowStopStatus) {
					await this.clickTask;
				}
				let value = null;
				if (this.cmpGroup) {
					value = this.checkboxGroup.value;
					if (this.cmpChecked) {
						value = value.filter((value) => value != this.name);
					} else {
						value.push(this.name);
					}
					this.checkboxGroup.$emit('input', value);
					this.checkboxGroup.$emit('change', value);
					this.num++;
				} else {
					value = !this.cmpChecked;
					this.$emit('input', !this.cmpChecked);
				}
				this.$emit('change', value);
			}
		},
		// 允许阻止后续操作
		allowStop() {
			this.allowStopStatus = true;
		},
		getDefaultData(key, value) {
			return this[key] != null ? this[key] : this.checkboxGroup[key] ? this.checkboxGroup[key] : value;
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
		align-items: center;
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
