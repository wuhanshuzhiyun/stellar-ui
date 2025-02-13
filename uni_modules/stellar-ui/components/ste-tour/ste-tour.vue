<template>
	<view class="ste-tour-root" data-test="tour" @touchmove.stop="true" :class="{ show: dataShow }" :style="[cmpRootStyle]"
		@click="clickRoot">
		<view class="ste-tour-view" :style="[dataStyle]"></view>
		<view class="ste-tour-message" :style="[messageStyle]">
			<view class="message-arrows" :style="[arrowsStyle]" />
			<view class="message-content">
				<view class="message-head" v-if="showTitleBar" @click.stop="true">
					<view class="head-title">{{ cmpStep.title }}</view>
					<view class="head-close" @click="close">
						<ste-icon code="&#xe67b;" size="30" />
					</view>
				</view>
				<view class="message-content-text">
					<slot>
						<view class="message-text" @click.stop="true">
							{{ cmpStep.message }}
						</view>
					</slot>
				</view>
				<view class="message-step-footer" @click.stop="true" v-if="cmpShowFooter">
					<view class="step-num">{{ dataCurrent + 1 }}/{{ steps.length }}</view>
					<view class="step-btns">
						<ste-button :round="false" background="#fff" borderColor="#0090FF" color="#0090FF" style="margin-right: 12rpx"
							mode="100" @click="onUp" v-if="cmpShowPrevStep" :rootStyle="{ padding: '0 10px' }">
							{{ prevStepTxt }}
						</ste-button>
						<ste-button :round="false" :rootStyle="{ padding: '0 10px' }" mode="100" @click="onNext">
							{{ dataCurrent < steps.length - 1 ? nextStepTxt : completeTxt }} </ste-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-tour 指引
 * @description 指引组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-tour
 * @property {Boolean} show 是否显示
 * @property {Number} current 当前步骤，多个步骤时有效
 * @property {Array} steps 步骤数组，格式为：[{title: '', message: '', target:'el-id'}]
 * @property {Array} offset 位置偏移量，格式为：[x, y]
 * @property {Boolean} showTitleBar 是否显示标题栏
 * @property {Boolean} showFooter 是否显示底部按钮栏（仅多步骤时生效）
 * @property {Boolean} mask 是否显示遮罩层
 * @property {Boolean} maskColse 是否点击遮罩层关闭
 * @property {Boolean} showPrevStep 是否显示上一步按钮
 * @property {String} background 遮罩层背景色
 * @property {Number|String} radius 提示框圆角，单位rpx，默认18
 * @property {String} messageBg 提示框背景色
 * @property {String} messageColor 提示框文字颜色
 * @property {String} nextStepTxt	下一步按钮文字
 * @property {String} prevStepTxt 上一步按钮文字
 * @property {String} completeTxt 完成按钮文字
 * @event {Function} change 步骤切换时触发
 */
export default {
	group: '展示组件',
	title: 'Tour 指引',
	name: 'ste-tour',
	props: {
		show: { type: [Boolean, null], default: () => false },
		current: { type: [Number, null], default: () => 0 },
		steps: { type: [Array, null], default: () => [] },
		offset: { type: [Array, null], default: () => [0, 0] },
		showTitleBar: { type: [Boolean, null], default: () => false },
		showFooter: { type: [Boolean, null], default: () => true },
		mask: { type: [Boolean, null], default: () => true },
		maskColse: { type: [Boolean, null], default: () => true },
		showPrevStep: { type: [Boolean, null], default: () => true },
		background: { type: [String, null], default: () => 'rgba(0,0,0,.5)' },
		radius: { type: [Number, String, null], default: () => 18 },
		messageBg: { type: [String, null], default: () => '#fff' },
		messageColor: { type: [String, null], default: () => '#000' },
		nextStepTxt: { type: [String, null], default: () => '下一步' },
		prevStepTxt: { type: [String, null], default: () => '上一步' },
		completeTxt: { type: [String, null], default: () => '完成' },
	},
	data() {
		return {
			dataShow: false,
			dataCurrent: 0,
			stepTimeout: null,
			dataStyle: {},
			messageStyle: {},
			arrowsStyle: {},
		};
	},
	computed: {
		cmpRootStyle() {
			return {
				'--ste-tour-radius': utils.formatPx(this.radius),
				'--ste-tour-mask': this.mask ? `0 0 0 250vh ${this.background}` : 'none',
				'--ste-tour-message-shadow': this.mask ? 'none' : `0 0 ${utils.formatPx(30)} 0 #ccc`,
				'--ste-tour-message-bg': this.messageBg,
				'--ste-tour-message-color': this.messageColor,
			};
		},
		cmpStep() {
			return this.steps[this.dataCurrent];
		},
		windowSize() {
			return {
				vw: utils.System.getWindowWidth(),
				vh: utils.System.getWindowHeight(),
			};
		},
		cmpShowPrevStep() {
			return this.showPrevStep && this.dataCurrent > 0;
		},
		cmpShowFooter() {
			return this.showFooter && this.steps.length > 1;
		},
	},
	watch: {
		show: {
			handler(val) {
				this.dataShow = val;
				if (val) this.dataCurrent = 0;
			},
			immediate: true,
		},
		current: {
			handler(val) {
				if (val >= 0 && val <= this.steps.length - 1) this.dataCurrent = val;
			},
			immediate: true,
		},
		dataShow: {
			handler(val) {
				if (val) this.showTour();
				else this.closeTour();
			},
			immediate: true,
		},
		dataCurrent: {
			handler(val) {
				if (this.dataShow) this.showTour();
				else this.closeTour();
			},
			immediate: true,
		},
	},
	methods: {
		clickRoot() {
			if (!this.maskColse) return;
			this.close();
		},
		close() {
			this.dataShow = false;
			this.$emit('update:show', false);
			this.$emit('close');
		},
		showTour() {
			clearTimeout(this.stepTimeout);
			this.stepTimeout = setTimeout(() => {
				const step = this.cmpStep;
				if (!step) return;
				utils.querySelector(`#${step.target}`, this.$parent).then((el) => {
					if (!el) {
						console.error(`未找到ID为${step.target}的元素`);
						return;
					}
					const { top, left, bottom, right, width, height } = el;

					this.dataStyle = {
						top: `${el.top}px`,
						left: `${el.left}px`,
						width: `${el.width}px`,
						height: `${el.height}px`,
						display: 'block',
					};

					let [y, x] = step.position?.split('-') || [];
					const { vw, vh } = this.windowSize;
					const _bottom = vh - bottom;
					const _right = vw - right;
					if (!y) {
						if (top > _bottom) {
							y = 'top';
						} else {
							y = 'bottom';
						}
					}
					if (!x) {
						if (_right > 30 && _right > left) {
							x = 'start';
						} else if (left > 30) {
							x = 'end';
						} else {
							x = 'center';
						}
					}
					const [_x = 0, _y = 0] = this.offset;
					const arrowsWidth = 18;
					const messageStyle = { display: 'block' };
					const arrowsStyle = {};

					switch (y) {
						case 'top':
							messageStyle.bottom = `${_bottom + height + _y + (arrowsWidth - 5)}px`;
							arrowsStyle.bottom = `-${arrowsWidth}px`;
							arrowsStyle.borderColor = `${this.messageBg} transparent transparent`;

							break;
						case 'bottom':
							messageStyle.top = `${bottom + _y + (arrowsWidth - 5)}px`;
							arrowsStyle.top = `-${arrowsWidth}px`;
							break;
					}
					switch (x) {
						case 'start':
							messageStyle.left = `${left + _x}px`;
							arrowsStyle.left = `${arrowsWidth}px`;
							break;
						case 'end':
							messageStyle.right = `${_right + _x}px`;
							arrowsStyle.right = `${arrowsWidth}px`;
							break;
						case 'center':
							messageStyle.left = '50%';
							messageStyle.transform = `translateX(calc(-50% + ${_x}px))`;
							arrowsStyle.left = '50%';
							arrowsStyle.transform = 'translateX(-50%)';
					}
					this.messageStyle = messageStyle;
					this.arrowsStyle = arrowsStyle;
				});
			}, 50);
		},
		closeTour() {
			this.dataStyle = {};
			this.messageStyle = {};
			this.arrowsStyle = {};
		},
		onNext() {
			if (this.dataCurrent < this.steps.length - 1) {
				this.dataCurrent += 1;
				this.$emit('update:current', this.dataCurrent);
				this.$emit('change', this.dataCurrent);
			} else {
				this.close();
			}
		},
		onUp() {
			if (this.dataCurrent > 0) {
				this.dataCurrent -= 1;
				this.$emit('update:current', this.dataCurrent);
				this.$emit('change', this.dataCurrent);
			}
		},
	},
};
</script>

<style scoped lang="scss">
.ste-tour-root {
	position: fixed;
	z-index: 1001;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	overflow: hidden;
	display: none;

	&.show {
		display: block;
	}

	.ste-tour-view {
		border-radius: var(--ste-tour-radius);
		position: fixed;
		z-index: 1001;
		box-shadow: var(--ste-tour-mask);
		display: none;
	}

	.ste-tour-message {
		background-color: var(--ste-tour-message-bg);
		position: fixed;
		z-index: 1002;
		border-radius: var(--ste-tour-radius);
		display: none;
		box-shadow: var(--ste-tour-message-shadow);

		.message-arrows {
			position: absolute;
			width: 0;
			height: 0;
			border-width: 20rpx;
			border-style: solid;
			border-color: transparent transparent var(--ste-tour-message-bg);
		}

		.message-content {
			color: var(--ste-tour-message-color);
			font-size: 24rpx;

			.message-head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				min-width: 360rpx;
				padding: 20rpx 24rpx;

				.head-title {
					height: 60rpx;
					line-height: 60rpx;
					font-size: 30rpx;
					margin-right: 30rpx;
				}

				.head-close {
					width: 60rpx;
					height: 60rpx;
					padding: 15rpx;
					line-height: 30rpx;
				}
			}

			.message-content-text {
				.message-text {
					padding: 20rpx 24rpx;
				}
			}

			.message-step-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 24rpx;
				min-width: 360rpx;

				.step-num {
					font-size: 24rpx;
					color: var(--ste-tour-message-color);
					margin-right: 30rpx;
				}
			}
		}
	}
}
</style>
