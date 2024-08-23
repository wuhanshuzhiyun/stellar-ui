<template>
	<view v-if="closeShow" class="ste-notice-bar-root" :style="[cmpStyle]">
		<view
			class="msg-box-content"
			@touchstart.stop="doPause"
			@touchend.stop="doRun"
			@mousedown.stop="doPause"
			@mouseup.stop="doRun"
		>
			<view class="left">
				<slot name="leftIcon">
					<ste-image width="36" height="36" src="https://image.whzb.com/chain/StellarUI/notice-bar/tip.png" />
				</slot>
			</view>
			<view v-if="direction == 'across'" :class="'center ' + id" @click="handleClick">
				<view :id="id" :class="cardMsgClass" :style="[cmpAcrossStyle]" @animationend="onAnimationEnd">
					<ste-rich-text :text="list[index]"></ste-rich-text>
				</view>
			</view>
			<view
				v-else
				:class="'center vertical ' + cardMsgClass"
				@click="handleClick"
				@animationend="onAnimationEnd"
				:style="[cmpVerticalStyle]"
			>
				<view v-for="(item, i) in copyList" :key="i">
					<ste-rich-text :text="item"></ste-rich-text>
				</view>
			</view>
			<view v-if="$slots.rightIcon || closeMode" class="right-icon">
				<slot name="rightIcon">
					<view @click="handleClose">
						<ste-icon code="&#xe694;" size="32" :color="color"></ste-icon>
					</view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';

/**
 * ste-notice-bar 公告栏
 * @description 用于循环播放展示一组消息通知。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-notice-bar
 * @property {Array} list 滚动数据列表，默认 []
 * @property {String} direction 滚动的方向，默认 across
 * @value across 水平 {String}
 * @value vertical 垂直 {String}
 * @property {Boolean} closeMode 是否启用关闭模式 默认 false
 * @property {String} color 文字颜色，默认 #000000
 * @property {String} background 背景，默认 #ffffff
 * @property {Number|String} width 宽度  默认 100%
 * @value 100% 小 {String}
 * @value  {{Number}} 自定义宽度，单位rpx {Number}
 * @property {Number} acrossSpeed，滚动速率 (px/s)，默认 50
 * @property {Number} verticalSpeed，滚动的速度（ms），默认 500
 * @property {Number} delay 延时（ms），默认 1000
 * @property {Number} standTime 每次滚动前停留多少毫秒(竖向滚动时有效)（ms），默认 1000
 * @property {Boolean} scrollable 是否可以滚动 默认 true
 * @event {Function} click 外层点击事件回调
 * @event {Function} close 关闭通知栏时触发
 * @event {Function} end 滚动结束时触发
 */

export default {
	group: '展示组件',
	title: 'NoticeBar 公告栏',
	name: 'ste-notice-bar',
	options: {
		virtualHost: true,
	},
	props: {
		list: {
			type: Array,
			default: () => [],
		},
		direction: {
			type: String,
			default: 'across',
		},
		closeMode: {
			type: Boolean,
			default: false,
		},
		color: {
			type: String,
			default: '#000000',
		},
		background: {
			type: String,
			default: '#fffffff',
		},
		width: {
			type: [Number, String],
			default: '100%',
		},
		speed: {
			type: Number,
			default: 500,
		},
		acrossSpeed: {
			type: Number,
			default: 50,
		},
		verticalSpeed: {
			type: Number,
			default: 500,
		},
		delay: {
			type: Number,
			default: 1000,
		},
		standTime: {
			type: Number,
			default: 1000,
		},
		scrollable: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			id: utils.guid(),
			index: 0,
			touch: false,
			firstDone: false,
			animationData: null,
			copyList: [],
			acrossDuration: 0,
			textTranslate: 0,
			cardMsgClass: '',
			h5flag: false,
			closeShow: true,
			first: true,
		};
	},
	async mounted() {},
	watch: {
		list: {
			handler(val) {
				this.copyList = utils.deepClone(val);
				if (val.length && this.scrollable) {
					this.$nextTick(() => {
						this.handleAnimation();
					});
				}
			},
			deep: true,
			immediate: true,
		},
		index: {
			handler() {
				this.h5flag = false;
			},
			immediate: true,
		},
		copyList: {
			handler() {
				this.h5flag = false;
			},
			immediate: true,
		},
	},
	computed: {
		cmpStyle() {
			let style = {};
			style['width'] = isNaN(Number(this.width)) ? this.width : utils.formatPx(this.width);
			style['background'] = this.background;
			style['color'] = this.color;
			return style;
		},
		cmpAcrossStyle() {
			let style = {};
			style['animationPlayState'] = this.touch ? 'paused' : 'running';
			style['animationDuration'] = this.acrossDuration + 'ms';
			style['animationDelay'] = (this.firstDone ? 0 : this.delay) + 'ms';
			style['transform'] = `translateX(${this.textTranslate}px)`;
			return style;
		},
		cmpVerticalStyle() {
			let style = {};
			style['animationPlayState'] = this.touch ? 'paused' : 'running';
			style['animationDuration'] = this.verticalSpeed + 'ms';
			style['animationDelay'] = (this.firstDone ? 0 : this.delay) + 'ms';
			return style;
		},
	},
	methods: {
		// 执行滚动动画
		async handleAnimation() {
			if (this.direction == 'across') {
				// 获取滚动消息的长度来计算动画的执行时间
				let dom = await utils.querySelector('#' + this.id, this);
				this.acrossDuration = ((dom.width + this.textTranslate) / Number(this.acrossSpeed)) * 1000;
				this.cardMsgClass = 'across-play-infinite';
			} else {
				this.cardMsgClass = 'vertical-play-infinite';
			}
		},
		// 动画结束
		async onAnimationEnd() {
			// 解决h5动画初始会触发结束事件
			// #ifdef H5
			if (this.h5flag) {
				// #endif
				if (this.direction == 'across') {
					if (!this.textTranslate) {
						// 获取滚动消息的父级元素的长度实现无缝滚动
						let dom = await utils.querySelector('.' + this.id, this);
						this.textTranslate = dom.width;
					}
					this.cardMsgClass = '';
					// h5里 文本内容切换会导致触发动画结束事件，屏蔽切换
					this.index = this.index + 1 >= this.list.length ? 0 : this.index + 1;
					this.$nextTick(() => {
						this.handleAnimation();
					});
				} else {
					this.cardMsgClass = '';
					// h5里 文本内容切换会导致触发动画结束事件，屏蔽切换

					this.copyList.push(this.copyList.shift());

					this.index = this.index + 1 >= this.list.length ? 0 : this.index + 1;
					setTimeout(
						() => {
							this.handleAnimation();
						},
						this.standTime > this.verticalSpeed ? this.standTime : this.verticalSpeed // 下一个动画要在前一个动画后
					);
				}
				this.firstDone = true;
				this.$emit('end', this.index);
				// #ifdef H5
			}
			if (this.direction == 'across') {
				this.h5flag = true;
			} else {
				setTimeout(
					() => {
						this.h5flag = true;
					},
					this.verticalSpeed > 20 ? this.verticalSpeed - 20 : 20
				);
			}
			// #endif
		},
		// 暂停
		doPause() {
			this.touch = true;
		},
		// 取消暂停
		doRun() {
			this.touch = false;
		},
		handleClose(e) {
			this.closeShow = false;
			this.$emit('close', e);
		},
		handleClick(e) {
			this.$emit('click', this.index);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-notice-bar-root {
	width: 100%;
	height: 68rpx;
	padding: 16rpx;
	background: #ffffff;
	border-radius: 16rpx;
	display: flex;
	align-items: center;

	.msg-box-content {
		display: flex;
		align-items: center;
		overflow-x: hidden;
		justify-content: flex-start;
		flex: 1;
		height: 100%;
	}
	.left {
		flex-shrink: 0;
		margin-right: 16rpx;
		display: flex;
		align-items: center;
		height: 36rpx;
		line-height: 36rpx;
	}
	.center {
		flex: 1;
		display: flex;
		overflow: hidden;

		> view {
			font-size: 24rpx;
			display: inline-block;
			width: auto;
			white-space: nowrap;
		}

		.across-play-infinite {
			animation: acrossAnimation linear both running;
			animation-iteration-count: 1;
		}

		@keyframes acrossAnimation {
			100% {
				transform: translateX(-100%);
			}
		}
	}

	.vertical {
		flex-direction: column;
		height: 36rpx;
		line-height: 36rpx;
	}

	.vertical-play-infinite {
		animation: verticalAnimation linear both running;
		animation-iteration-count: 1;
	}

	@keyframes verticalAnimation {
		100% {
			transform: translateY(-100%);
		}
	}

	.right-icon {
		margin-left: 16rpx;
	}
}
</style>
