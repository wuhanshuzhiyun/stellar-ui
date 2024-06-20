<template>
	<view
		class="ste-tour-root"
		@touchmove.stop="true"
		:class="{ show: dataShow }"
		:style="[cmpRootStyle]"
		@click="clickRoot"
	>
		<view class="ste-tour-view" :style="[dataStyle]"></view>
		<view class="ste-tour-message" :style="[messageStyle]" @click.stop="true">
			<view class="message-arrows" :style="[arrowsStyle]" />
			<view class="message-content">
				<view class="message-head" v-if="showTitleBar">
					<view class="head-title">{{ cmpStep.title }}</view>
					<view class="head-close" @click="close">
						<ste-icon code="&#xe67b;" size="30" />
					</view>
				</view>
				<view class="message-content-text">
					<slot name="message" :item="cmpStep">
						<view class="message-text">
							{{ cmpStep.message }}
						</view>
					</slot>
				</view>
				<view class="message-step-footer" v-if="steps.length > 1">
					<view class="step-num">{{ dataCurrent + 1 }}/{{ steps.length }}</view>
					<view class="step-btns">
						<ste-button
							:round="false"
							background="#fff"
							borderColor="#0091ff"
							color="#0091ff"
							style="margin-right: 12rpx"
							mode="100"
							@click="onUp"
							v-if="cmpShowPrevStep"
						>
							{{ prevStepTxt }}
						</ste-button>
						<ste-button :round="false" mode="100" @click="onNext">
							{{ dataCurrent < steps.length - 1 ? nextStepTxt : completeTxt }}
						</ste-button>
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
 * @property {Number} current 当前步骤，默认0
 * @event {Function} click 点击节点触发，参数为当前节点对象
 * @event {Function} open 打开节点时触发，参数为当前节点对象
 * @event {Function} close 关闭节点时触发，参数为当前节点对象
 * @event {Function} beforeOpen 打开节点前触发，第一个参数为当前节点对象（第二个参数为suspend函数，用于等待后续操作）（第三个参数为next函数，继续执行后续代码，可接收一个对象数组，该数组会替换当前节点的children）（第四个参数为stop，阻止后续代码执行）
 */
export default {
	group: '展示组件',
	title: 'Tour 指引',
	name: 'ste-tour',
	props: {
		show: { type: Boolean, default: () => false },
		current: { type: Number, default: () => 0 },
		steps: { type: Array, default: () => [] },
		offset: { type: Array, default: () => [0, 0] },
		location: { type: String, default: () => 'auto' },
		showTitleBar: { type: Boolean, default: () => false },
		maskColse: { type: Boolean, default: () => true },
		showPrevStep: { type: Boolean, default: () => true },
		mask: { type: Boolean, default: () => true },
		background: { type: Boolean, default: () => 'rgba(0,0,0,.5)' },
		radius: { type: [Number, String], default: () => 18 },
		messageBg: { type: String, default: () => '#fff' },
		messageColor: { type: String, default: () => '#000' },
		nextStepTxt: { type: String, default: () => '下一步' },
		prevStepTxt: { type: String, default: () => '上一步' },
		completeTxt: { type: String, default: () => '完成' },
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
				'--ste-tour-message-shadow': this.mask ? 'none' : '0 0 30rpx 0 #ccc',
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
				this.showTour();
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
					if (!el) return console.error(`未找到ID为${step.target}的元素`);
					const { top, left, bottom, right, width, height } = el;

					this.dataStyle = {
						top: `${el.top}px`,
						left: `${el.left}px`,
						width: `${el.width}px`,
						height: `${el.height}px`,
						display: 'block',
					};

					let [y, x] = this.location?.split('-') || [];
					const { vw, vh } = this.windowSize;
					const _bottom = vh - bottom;
					const _right = vw - right;
					if (!y || y === 'auto') {
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
							arrowsStyle.borderColor = '#fff transparent transparent';

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
		padding: 20rpx 24rpx;
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
				padding-bottom: 20rpx;
				.head-title {
					height: 60rpx;
					line-height: 60rpx;
				}

				.head-close {
					width: 60rpx;
					height: 60rpx;
					padding: 15rpx;
					line-height: 30rpx;
				}
			}
			.message-content-text {
			}

			.message-step-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20rpx;
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
