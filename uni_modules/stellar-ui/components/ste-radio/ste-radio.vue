<template>
	<view class="ste-radio--root" :style="[cmpStyle]" @click="click">
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
 * ste-radio 单选框
 * @description 单选框组件,在一组备选项中进行单选。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-radio
 * @property {String} value 当前选中值（支持v-model双向绑定
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
 * @event {Function} click 点击单选框时触发的事件
 * @event {Function} change 当绑定值变化时触发的事件
 */
export default {
	group: '表单组件',
	title: 'Radio 单选框',
	name: 'ste-radio',
	props: {
		value: {
			type: String,
			default: '',
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
	},
	model: {
		prop: 'value',
		// 派发事件名，更新父组件数据
		event: 'input',
	},
	inject: {
		radioGroup: {
			default: '',
		},
	},
	data() {
		return {
			clickTask: null, // click完成任务和allowStopStatus搭配使用
			allowStopStatus: false, // 允许阻止后续的事件触发
		};
	},
	computed: {
		cmpDisabled() {
			return this.getDefaultData('disabled', false);
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
		cmpSlotProps() {
			return {
				checked: this.cmpChecked,
				disabled: this.cmpDisabled,
			};
		},
		cmpStyle() {
			let style = {};
			style['fontSize'] = utils.rpx2px(this.cmpTextSize);
			style['color'] = this.cmpChecked ? this.cmpTextActiveColor : this.cmpTextInactiveColor;
			style['flexDirection'] = this.cmpTextPosition == 'right' ? 'row' : 'row-reverse';
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
			style['border'] = `${utils.rpx2px(2)} solid ${this.cmpChecked ? this.cmpCheckedColor : '#BBBBBB'}`;
			style['background'] = this.cmpChecked ? this.cmpCheckedColor : '#FFFFFF';
			style['width'] = utils.rpx2px(this.cmpIconSize);
			style['height'] = utils.rpx2px(this.cmpIconSize);
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
			return style;
		},
		// 选中状态
		cmpChecked() {
			return this.cmpGroup ? this.radioGroup.value == this.name : this.value == this.name;
		},
		cmpGroup() {
			return !!this.radioGroup;
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
				if (!this.cmpChecked) {
					let value = this.name;
					if (this.cmpGroup) {
						this.radioGroup.$emit('input', value);
						this.radioGroup.$emit('change', value);
					} else {
						this.$emit('input', value);
					}
					this.$emit('change', value);
				}
			}
		},
		// 允许阻止后续操作
		allowStop() {
			this.allowStopStatus = true;
		},
		getDefaultData(key, value) {
			return this[key] != null ? this[key] : this.radioGroup[key] ? this.radioGroup[key] : value;
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-radio--root {
	width: auto;
	height: 100%;
	display: flex;
	column-gap: 16rpx;
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
