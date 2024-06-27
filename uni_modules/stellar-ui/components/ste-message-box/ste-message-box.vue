<template>
	<view class="ste-message-box-root" :style="[cmpRootStyle]" :class="[cmpRootClass]" v-if="show">
		<view class="ste-message-box-content">
			<view class="content-box">
				<view class="icon-box" v-if="icon">
					<ste-icon :code="cmpIconCode" color="#999999" size="45"></ste-icon>
				</view>
				<view class="ste-message-title">{{ title }}</view>
				<view class="msg" v-if="!icon">
					<view class="text" v-if="!editable">{{ content }}</view>
					<view v-else>
						<input
							:value="inputValue"
							class="ste-message-box-input"
							:placeholder="placeholderText"
							@input="handleInput"
						/>
					</view>
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
import utils from '../../utils/utils.js';
import useSteMsgBox from './ste-message-box.js';
let steMsgBox = useSteMsgBox();
let $state = steMsgBox.$state;
const ICON_OBJ = {
	info: '&#xe67d;',
	success: '&#xe67a;',
	error: '&#xe67b;',
};
/**
 * ste-message-box 弹框
 * @description 模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-message-box
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
	data() {
		return {
			pageShow: true,
			show: false,
			title: '确认删除订单？',
			content: '',
			icon: '',
			cancelText: '取消',
			cancelColor: '#333333',
			confirmText: '确认',
			confirmColor: '#0090ff',
			showCancel: true,
			editable: false,
			placeholderText: '',
			inputType: '',
			confirm: null,
			cancel: null,
			complete: null,
			// 内部值
			inputValue: '',
			iconObj: {
				info: '&#xe67d;',
				success: '&#xe67a;',
				error: '&#xe67b;',
			},
		};
	},
	created() {
		// console.log('message box created');
		this.pageShow = true;
	},
	destroyed() {
		// console.log('message box destroyed');
		this.pageShow = false;
		steMsgBox.hideMsgBox();
	},
	computed: {
		cmpRootStyle() {
			let style = {
				'--cancel-color': $state.cancelColor,
				'--confirm-color': $state.confirmColor,
			};
			return style;
		},
		cmpRootClass() {
			let classArr = [];
			if (this.icon) {
				classArr.push('icon-type');
			}
			return classArr.join(' ');
		},
		cmpIconCode() {
			return ICON_OBJ[this.icon] ? ICON_OBJ[this.icon] : ICON_OBJ.info;
		},
		openBegin() {
			return $state.openBegin;
		},
	},
	watch: {
		openBegin: {
			handler(newVal) {
				if (newVal) {
					this.inputValue = '';
					this.title = $state.title;
					this.content = $state.content;
					this.icon = $state.icon;
					this.cancelText = $state.cancelText || this.cancelText;
					this.confirmText = $state.confirmText || this.confirmText;
					this.showCancel = $state.showCancel || this.showCancel;
					this.editable = $state.editable || this.editable;
					this.placeholderText = $state.placeholderText || this.placeholderText;

					this.confirm = $state.confirm;
					this.cancel = $state.cancel;
					this.complete = $state.complete;

					this.show = newVal;
				} else {
					this.show = false;
				}
			},
			immediate: true,
		},
	},
	methods: {
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
			steMsgBox.hideMsgBox();
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

	&.icon-type {
		.ste-message-title {
			padding: 24rpx 0 34rpx 0 !important;
		}
	}

	.ste-message-box-content {
		background: #ffffff;
		border-radius: 16rpx;
		border: 2rpx solid #eeeeee;
		min-width: 400rpx;
		max-width: 504rpx;
		display: inline-flex;
		flex-direction: column;
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
				padding-top: 32rpx;
				padding-bottom: 16rpx;
				font-weight: bold;
				font-size: 32rpx;
				text-align: center;
			}

			.msg {
				padding: 0 32rpx 34rpx 32rpx;

				.text {
					width: 100%;
					font-size: 28rpx;
					text-align: center;
				}

				.ste-message-box-input {
					height: 80rpx;
					width: 440rpx;
					background: #f5f5f5;
					border-radius: 8px 8px 8px 8px;
					text-align: center;
					padding: 0 24rpx;
				}
			}
		}
		.footer {
			display: flex;
			height: 72rpx;
			> view {
				height: 100%;
				border-top: 2rpx solid #eeeeee;
				border-right: 2rpx solid #eeeeee;
				flex: 1;

				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				font-size: 28rpx;

				/* #ifdef H5 || WEB */
				cursor: pointer;
				/* #endif */

				&.cancel {
					color: var(--cancel-color);
				}

				&.confirm {
					color: var(--confirm-color);
				}

				&:nth-last-child(1) {
					border-right: none;
				}
			}
		}
	}
}
</style>
