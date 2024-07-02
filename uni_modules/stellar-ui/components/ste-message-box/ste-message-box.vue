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
						<view v-else>
							<input
								:value="inputValue"
								class="ste-message-box-input"
								:placeholder="placeholderText"
								@input="handleInput"
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
	props: {
		selector: {
			type: String,
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
			confirmColor: '#0090ff',
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
				'--cancel-color': this.cancelColor,
				'--confirm-color': this.confirmColor,
			};
			return style;
		},
		cmpRootClass() {
			let classArr = [];
			if (this.icon) {
				classArr.push('icon-type');
			}
			if (!this.content) {
				classArr.push('no-content');
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
					this.confirmColor = $state.confirmColor || this.confirmColor;
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

	&.icon-type {
		.ste-message-title {
			padding: 24rpx 0 34rpx 0 !important;
		}
	}

	&.no-content {
		.ste-message-title {
			padding-bottom: 32rpx !important;
		}
		.msg {
			padding: 0 !important;
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
				padding-top: 32rpx;
				padding-bottom: 16rpx;
				font-weight: bold;
				font-size: 32rpx;
				text-align: center;
			}

			.msg {
				padding: 0 32rpx 34rpx 32rpx;
				text-align: center;
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
					font-size: 28rpx;
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
