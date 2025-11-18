<template>
	<view
		class="ste-message-box-root"
		:style="[cmpRootStyle]"
		:class="[cmpRootClass]"
		:animation="maskAnimationData"
		v-if="show"
	>
		<view class="ste-message-box-content" :animation="animationData">
			<view class="content-box">
				<view class="icon-box" v-if="icon">
					<ste-icon :code="cmpIconCode" color="#999999" size="45"></ste-icon>
				</view>
				<view class="ste-message-title">{{ title }}</view>
				<view class="msg" v-if="!icon">
					<slot>
						<view class="text" v-if="!editable">{{ content }}</view>
						<view v-else class="input-box">
							<text class="placeholder-text" v-show="showInputPlaceholder">
								{{ placeholderText }}
							</text>
							<input
								:value="inputValue"
								class="ste-message-box-input"
								@input="handleInput"
								@focus="handleInputFocus"
								@blur="handleInputBlur"
							/>
						</view>
					</slot>
				</view>
			</view>
			<view class="footer">
				<view class="cancel text" v-if="showCancel" @click="handleCancel">
					{{ cancelText }}
				</view>
				<view class="confirm text" @click="handleConfirm">
					{{ confirmText }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import useColor from '../../config/color.js';
let color = useColor();
import utils from '../../utils/utils.js';
import useSteMsgBox, { DEFAULT_KEY } from './ste-message-box.js';
const DURATION = 200;
const ANIMATION_PROP = { duration: DURATION, timingFunction: 'ease-out' };
const ICON_OBJ = {
	info: '&#xe67d;',
	success: '&#xe67a;',
	error: '&#xe67b;',
};
/**
 * ste-message-box 弹框
 * @description 模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。
 * @tutorial https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui&menu=%E7%BB%84%E4%BB%B6&active=ste-message-box
 * @property {String} title 提示的标题
 * @property {String} content 提示的内容
 * @property {String} icon 提示区域显示图标，此时content会失效
 * @property {String} cancelText 取消按钮的文字，最多 4 个字符
 * @property {String} cancelColor 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串
 * @property {String} confirmText 确认按钮的文字，最多 4 个字符
 * @property {String} confirmColor 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
 * @property {Boolean} editable 是否显示输入框
 * @property {String} placeholderText 显示输入框时的提示文本
 * @event {Function} success 提示打开成功的回调函数
 * @event {Function} fail 提示打开失败的回调函数
 * @event {Function} complete 提示结束的回调函数（提示打开、失败都会执行）
 */
export default {
	group: '展示组件',
	title: 'MessageBox 弹框',
	name: 'ste-message-box',
	props: {
		selector: {
			type: [String, null],
			default: DEFAULT_KEY,
		},
	},
	data() {
		return {
			title: '确认删除订单？',
			content: '',
			icon: '',
			cancelText: '取消',
			cancelColor: '#333333',
			confirmText: '确认',
			confirmColor: '',
			showCancel: true,
			editable: false,
			placeholderText: '',
			inputType: '',
			confirm: null,
			cancel: null,
			complete: null,
			// 内部值
			pageShow: true,
			show: false,
			inputValue: '',
			animationData: null,
			maskAnimationData: null,
			iconObj: {
				info: '&#xe67d;',
				success: '&#xe67a;',
				error: '&#xe67b;',
			},
			open: false,
			tmpMsg: null,
			showInputPlaceholder: true,
		};
	},
	beforeCreate() {},
	created() {
		this.pageShow = true;
	},
	destroyed() {
		this.pageShow = false;
		this.cmpSteMsgBox.hideMsgBox();
	},
	computed: {
		cmpRootStyle() {
			let style = {
				opacity: 0,
				'--cancel-color': this.cancelColor,
				'--confirm-color': this.confirmColor ? this.confirmColor : color.getColor().steThemeColor,
			};
			return style;
		},
		cmpRootClass() {
			let classArr = [];
			if (this.icon) {
				classArr.push('icon-type');
			}
			if (!this.content && !this.$slots.default) {
				classArr.push('no-content');
			}

			if (this.$slots && this.$slots.default) {
				classArr.push('slot-type');
			}
			return classArr.join(' ');
		},
		cmpIconCode() {
			return ICON_OBJ[this.icon] ? ICON_OBJ[this.icon] : ICON_OBJ.info;
		},
		cmpSteMsgBox() {
			if (!this.tmpMsg) {
				this.tmpMsg = useSteMsgBox(this.selector);
			}
			return this.tmpMsg;
		},
		openBegin() {
			return this.cmpSteMsgBox.$state.openBegin;
		},
	},
	watch: {
		openBegin: {
			handler(newVal) {
				let $state = this.tmpMsg.$state;
				if (newVal) {
					this.inputValue = '';
					this.title = $state.title;
					this.content = $state.content;
					this.icon = $state.icon;
					this.cancelText = $state.cancelText || this.cancelText;
					this.confirmText = $state.confirmText || this.confirmText;
					this.confirmColor = $state.confirmColor
						? $state.confirmColor
						: this.confirmColor
						? this.confirmColor
						: color.getColor().steThemeColor;
					this.showCancel = $state.showCancel === false ? false : true;
					this.cancelColor = $state.cancelColor || this.cancelColor;
					this.editable = $state.editable === false ? false : true;
					this.placeholderText = $state.placeholderText || this.placeholderText;

					this.confirm = $state.confirm;
					this.cancel = $state.cancel;
					this.complete = $state.complete;
					this.showBox();
				} else {
					this.closeBox();
				}
			},
			// immediate: true,
		},
	},
	methods: {
		async showBox() {
			this.show = true;
			await utils.sleep(50);
			let animation = uni.createAnimation(ANIMATION_PROP);
			let maskAnimation = uni.createAnimation(ANIMATION_PROP);
			maskAnimation.opacity(1).step();
			animation.scale(1).step();
			this.animationData = animation.export();
			this.maskAnimationData = maskAnimation.export();
		},
		closeBox() {
			let animation = uni.createAnimation(ANIMATION_PROP);
			let maskAnimation = uni.createAnimation(ANIMATION_PROP);
			maskAnimation.opacity(0).step({ duration: DURATION });
			animation.scale(0).step();
			this.animationData = animation.export();
			this.maskAnimationData = maskAnimation.export();
			setTimeout(() => {
				this.show = false;
				this.showInputPlaceholder = true;
			}, DURATION);
		},
		handleInput(e) {
			this.inputValue = e.detail.value;
		},
		handleConfirm() {
			this.confirm(this.inputValue);
			this.handleComplete();
		},
		handleCancel() {
			this.cancel(this.inputValue);
			this.handleComplete();
		},
		handleComplete() {
			this.complete(this.inputValue);
			this.tmpMsg.hideMsgBox();
		},
		// 用input自带占位符时，由于动画原因导致最终显示会有一个下降的效果
		handleInputFocus() {
			this.showInputPlaceholder = false;
		},
		handleInputBlur() {
			if (!this.inputValue) {
				this.showInputPlaceholder = true;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-message-box-root {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	position: fixed;
	left: 0;
	top: 0;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	touch-action: none;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 99999;

	&.slot-type {
		.ste-message-title {
			padding-bottom: 24rpx !important;
		}

		.msg {
			padding: 0 !important;
		}
	}

	&.icon-type {
		.ste-message-title {
			padding: 24rpx 0 34rpx 0 !important;
		}
	}

	&.no-content {
		.ste-message-title {
			padding-bottom: 48rpx !important;
		}
		.msg {
			padding: 0 !important;
		}
	}

	.ste-message-box-content {
		background: #ffffff;
		border-radius: 16rpx;
		// border: 2rpx solid #eeeeee;
		min-width: 570rpx;
		max-width: 610rpx;
		display: inline-flex;
		flex-direction: column;
		transform: scale(0);
		.content-box {
			.icon-box {
				padding-top: 4rpx;
				height: 80rpx;
				width: 80rpx;
				border-radius: 50%;
				background: #f1f1f1;
				margin: 32rpx auto 0 auto;

				display: flex;
				align-items: center;
				justify-content: center;
			}
			.ste-message-title {
				width: 100%;
				padding-top: 48rpx;
				padding-bottom: 24rpx;
				font-weight: bold;
				font-size: 32rpx;
				text-align: center;
			}

			.msg {
				padding: 0 32rpx 48rpx 32rpx;
				text-align: center;
				.text {
					width: 100%;
					font-size: 28rpx;
					text-align: center;
				}

				.input-box {
					position: relative;
				}

				.placeholder-text {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					color: #999999;
				}

				.ste-message-box-input {
					height: 80rpx;
					width: 548rpx;
					background: #f5f5f5;
					border-radius: 8px 8px 8px 8px;
					text-align: center;
					padding: 0 24rpx;
					font-size: 28rpx;
				}
			}
		}
		.footer {
			display: flex;
			height: 96rpx;
			> .text {
				height: 100%;
				border-top: 2rpx solid #eeeeee;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				font-size: 32rpx;

				/* #ifdef H5 || WEB */
				cursor: pointer;
				/* #endif */

				&.cancel {
					color: var(--cancel-color);
				}

				&.confirm {
					color: var(--confirm-color);
				}

				& + .text {
					border-left: 2rpx solid #eeeeee;
				}
			}
		}
	}
}
</style>
