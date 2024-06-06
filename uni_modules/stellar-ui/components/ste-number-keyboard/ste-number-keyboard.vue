<template>
	<view class="ste-number-keyboard-root" :style="[cmpRootStyle]">
		<block v-if="mode === 'popup'">
			<ste-popup :show.sync="dataShow" @close="onClose" position="bottom" :show-close="false">
				<view style="padding: 30rpx 30rpx 60rpx 30rpx; background-color: #f5f5f5">
					<view class="keyboard-popup-head">
						<view></view>
						<view class="keyboard-title">
							<slot>数字键盘</slot>
						</view>
						<view class="keyboard-close" @click="onClose">
							<ste-icon code="&#xe676;" size="36" />
						</view>
					</view>
					<keyboard
						:list="cmpNumbers"
						:confirmText="confirmText"
						:disabled="confirmDisabled"
						:showClear="showClear"
						:textColor="textColor"
						:textSize="textSize"
						:rightKeys="rightKeys"
						@change="onChange"
					/>
				</view>
			</ste-popup>
		</block>
		<block v-else>
			<keyboard
				:list="cmpNumbers"
				:confirmText="confirmText"
				:disabled="confirmDisabled"
				:showClear="showClear"
				:textColor="textColor"
				:textSize="textSize"
				:rightKeys="rightKeys"
				@change="onChange"
			/>
		</block>
	</view>
</template>

<script>
import keyboard from './keyboard.vue';
import utils from '../../utils/utils.js';

/**
 * ste-number-keyboard 数字键盘
 * @description 数字键盘
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-number-keyboard
 * @property {String} mode 键盘模式，默认 popup弹窗模式
 * @value popup 弹窗模式（默认）
 * @value page 在dom文档流中直接展示
 * @property {String} value 输入值，支持v-model双向绑定
 * @property {String} show 是否显示键盘，支持.sync绑定，mode="popup"时生效
 * @property {Boolean} rightKeys 是否显示右侧功能键，默认true
 * @property {Boolean} randomKeys 按键是否随机排列，默认false
 * @property {String} confirmText 右侧确认按钮文本，默认'确认'
 * @property {Boolean} confirmDisabled 右侧确认是否禁用，默认false
 * @property {Array<String>} customKeys 自定义按键，建议数量不大于2
 * @property {Boolean} showClear 是否显示清空按钮，默认true
 * @property {String} textColor 按键文字颜色，默认#000000
 * @property {String|Number} textSize 按键文字大小，默认48,单位rpx
 * @property {String} confirmBg 确认按钮背景颜色，默认#0090FF
 * @property {String} confirmColor 确认按钮文字颜色，默认#FFFFFF

 * @event {Function} confirm 确认按钮点击事件
 * @event {Function} change 输入值改变时触发
 * @event {Function} clear 清空按钮点击事件
 * @event {Function} close 关闭弹窗键盘触发
 * @event {Function} backspace 删除按钮点击事件
 * @event {Function} click 点击功能键之外的键盘触发（功能键包括：确认/删除/清除）
 * @event {Function} beforeinput 输入之前触发，功能键之外的键盘点击时为输入（参数1为当前点击的按钮，参数2为开启等待的回调函数，参数3为执行后续操作的回调函数，参数4为阻止后续执行的回调函数）
 */

export default {
	group: '展示组件',
	title: 'NumberKeyboard 数字键盘',
	name: 'ste-number-keyboard',
	components: { keyboard },
	props: {
		mode: { type: String, default: () => 'popup' },
		value: { type: String, default: () => '' },
		show: { type: Boolean, default: () => false },
		rightKeys: { type: Boolean, default: () => true },
		randomKeys: { type: Boolean, default: () => false },
		confirmText: { type: String, default: () => '确定' },
		confirmDisabled: { type: Boolean, default: () => false },
		customKeys: { type: Array, default: () => [] },
		showClear: { type: Boolean, default: () => true },
		textColor: { type: String, default: () => '#000' },
		textSize: { type: [Number, String], default: () => 48 },
		confirmBg: { type: String, default: () => '#0090FF' },
		confirmColor: { type: String, default: () => '#fff' },
	},
	data() {
		return {
			dataValue: '',
			dataShow: false,
		};
	},
	computed: {
		cmpNumbers() {
			let keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
			if (this.randomKeys) {
				utils.randomArray(keys, this.dataShow);
			}

			if (Array.isArray(this.customKeys)) {
				keys.push(...this.customKeys);
			}

			if (!this.rightKeys) {
				if (!this.showClear) {
					keys.push('backspace');
					return;
				}
				const d = keys.length % 3;
				if (d === 1) {
					const end = keys.pop();
					keys.push('clear', end, 'backspace');
				} else {
					keys.push('clear', 'backspace');
				}
			}

			return keys;
		},

		cmpRootStyle() {
			const fontsize = utils.formatPx(this.textSize, 'num');
			return {
				'--ste-number-keyboard-text-color': this.textColor,
				'--ste-number-keyboard-text-size': isNaN(fontsize) ? fontsize : `${fontsize}px`,
				'--ste-number-keyboard-clear-text-size': isNaN(fontsize) ? fontsize : `${fontsize - 8}px`,
				'--ste-number-keyboard-confirm-text-size': isNaN(fontsize) ? fontsize : `${fontsize - 3}px`,
				'--ste-number-keyboard-confirm-bg': this.confirmBg,
				'--ste-number-keyboard-confirm-bg-active': utils.Color.formatColor(this.confirmBg, 0.8),
				'--ste-number-keyboard-confirm-color': this.confirmColor,
			};
		},
	},
	watch: {
		show: {
			handler(v) {
				this.dataShow = v;
			},
			immutable: true,
		},
		value: {
			handler(v) {
				this.dataValue = v;
			},
			immutable: true,
		},
	},

	methods: {
		async onChange(v) {
			try {
				if (v === 'confirm') {
					this.$emit('confirm', this.dataValue);
					this.onClose();
					return;
				}
				switch (v) {
					case 'backspace':
						this.dataValue = this.dataValue.slice(0, this.dataValue.length - 1);
						this.$emit('backspace');
						break;
					case 'clear':
						this.dataValue = '';
						this.$emit('clear');
						break;
					default:
						await this.beforInput(v);
						this.dataValue += v;
						this.$emit('click', v);
						break;
				}
				this.$emit('input', this.dataValue);
				this.$emit('change', this.dataValue);
				this.$emit('update:value', this.dataValue);
			} catch (e) {
				console.error(e);
			}
		},
		onClose() {
			this.dataShow = false;
			this.$emit('update:show', false);
			this.$emit('close');
		},
		async beforInput(v) {
			let next = true;
			const stop = new Promise((resolve, reject) => {
				this.$emit(
					'beforeinput',
					v,
					() => (next = false),
					() => resolve(),
					() => reject()
				);
			});
			if (!next) {
				await stop;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-number-keyboard-root {
	.keyboard-popup-head {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding-bottom: 30rpx;
		color: #888;
		.keyboard-close {
			&:active {
				background: rgba(200, 200, 200, 0.5);
			}
		}
	}
}
</style>
