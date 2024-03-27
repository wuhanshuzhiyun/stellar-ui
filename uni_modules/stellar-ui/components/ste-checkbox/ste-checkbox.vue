<template>
	<view class="ste-checkbox--root" :style="[cmpStyle]" @click="click">
		<view class="icon">
			<slot name="icon">
				<view v-if="!iconCode" class="input-icon" :style="[cmpInputStyle]">
					<ste-icon
						v-if="cmpChecked"
						:size="iconSize * 0.8"
						code="&#xe67a;"
						:color="disabled ? '#bbbbbb' : '#fff'"
						bold
					></ste-icon>
				</view>
				<view v-else></view>
			</slot>
		</view>
		<view class="text" :style="{ height: iconSize + 'rpx' }">
			<slot></slot>
		</view>
	</view>
</template>

<script>
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
 * @property {String} textPosition 文本的位置 默认 right
 * @value right 右 默认 {{String}}
 * @value left 左 {{String}}
 * @property {Number|String} iconCode 复选框的图标对应的code
 * @property {Number|String} iconSize 图标大小，单位rpx 默认 36
 * @property {String} iconInactiveColor 未选中图标的颜色 默认 #bbbbbb
 * @property {String} iconActiveColor 选中的图标颜色 默认 #0090FF
 * @property {Number|String} textSize 文本字体大小，单位rpx 默认 28
 * @property {String} textInactiveColor 未选中的文本颜色 默认 #000000
 * @property {String} textActiveColor 选中的文本颜色 默认 #000000
 * @property {String} fill 按钮形式，激活时的填充色和边框色 默认 #0090FF0
 * @event {Function} click 点击复选框时触发的事件
 * @event {Function} change 当绑定值变化时触发的事件
 */

export default {
	group: '表单组件',
	title: 'Checkbox 复选框',
	name: 'ste-checkbox',
	props: {
		value: {
			type: [Boolean],
			default: false,
		},
		name: {
			type: [Number, String],
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		shape: {
			type: String,
			default: 'circle',
		},
		textPosition: {
			type: String,
			default: 'right',
		},
		iconCode: {
			type: String,
			default: '',
		},
		iconSize: {
			type: [Number, String],
			default: 36,
		},
		iconInactiveColor: {
			type: String,
			default: '#bbbbbb',
		},
		iconActiveColor: {
			type: String,
			default: '#0090FF',
		},
		textSize: {
			type: [Number, String],
			default: 28,
		},
		textlnactiveColor: {
			type: String,
			default: '#000000',
		},
		textActiveColor: {
			type: String,
			default: '#000000',
		},
		fill: {
			type: String,
			default: '#0090FF',
		},
	},
	model: {
		prop: 'value',
		// 派发事件名，更新父组件数据
		event: 'input',
	},
	data() {
		return {};
	},
	computed: {
		cmpStyle() {
			let style = {};
			style['fontSize'] = this.textSize + 'rpx';
			style['color'] = this.cmpChecked ? this.textActiveColor : this.textlnactiveColor;
			style['flexDirection'] = this.textPosition == 'right' ? 'row' : 'row-reverse';
			// #ifdef H5
			if (this.disabled || this.readonly) {
				style['cursor'] = 'not-allowed';
			} else {
				style['cursor'] = 'pointer';
			}
			// #endif
			return style;
		},
		cmpInputStyle() {
			let style = {};
			// 没有icon 则默认样式
			if (!this.iconCode) {
				style['borderRadius'] = this.shape == 'circle' ? '50%' : '0';
				style['border'] = `2rpx solid ${this.cmpChecked ? this.fill : '#BBBBBB'}`;
				style['background'] = this.cmpChecked ? this.fill : '#FFFFFF';
				style['width'] = this.iconSize + 'rpx';
				style['height'] = this.iconSize + 'rpx';
				if (this.disabled) {
					style['background'] = '#eeeeee';
					style['borderColor'] = '#bbbbbb';
				}
			}
			return style;
		},
		// 是否选中
		cmpChecked() {
			return typeof this.value == 'boolean' ? this.value : this.value.includes(this.name);
		},
	},
	methods: {
		click() {
			if (!this.disabled && !this.readonly) {
				console.log('cmpChecked', this.cmpChecked);
				this.$emit('click', this.value);
				if (typeof this.value == 'boolean') {
					this.$emit('input', !this.cmpChecked);
				} else {
					let value = this.value;
					if (cmpChecked) {
						value = value.filter((value) => value != this.name);
					} else {
						value.push(this.name);
					}
					this.$emit('input', value);
				}
				this.$emit('change', this.value);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-checkbox--root {
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
	.text {
		display: flex;
		align-items: center;
	}
}
</style>
