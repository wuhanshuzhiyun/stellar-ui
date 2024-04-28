<template>
	<view class="ste-notice-bar-root" :style="[cmpStyle]">
		<view class="msg-box-content" @touchstart="doPause" @touchend="doRun" @mousedown="doPause" @mouseup="doRun">
			<view class="left">
				<slot name="leftIcon">
					<ste-image width="36" height="36" src="https://image.whzb.com/chain/StellarUI/notice-bar/tip.png" />
				</slot>
			</view>
			<view v-if="direction == 'across'" class="center" :class="id" @click="handleClick">
				<view
					:animation="animationData"
					:id="id"
					@transitionend="onAnimationEnd"
					:style="{ ' -webkit-animation-play-state': 'paused' }"
				>
					<ste-rich-text :text="list[index]"></ste-rich-text>
				</view>
			</view>
			<view
				v-else
				class="center vertical"
				@click="handleClick"
				:animation="animationData"
				@transitionend="onAnimationEnd"
				:style="{ 'animation-play-state': touch ? 'paused' : 'running' }"
			>
				<view v-for="(item, i) in copyList" :key="i">
					<ste-rich-text :text="item"></ste-rich-text>
				</view>
			</view>
			<view v-if="$slots.rightIcon || closeMode" class="right-icon">
				<slot name="rightIcon">
					<ste-icon code="&#xe67b;" size="24" @click="handleClose"></ste-icon>
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
			parentWidth: 0,
			copyList: [],
		};
	},
	async mounted() {},
	watch: {
		list: {
			handler(val) {
				this.copyList = val;
				if (val.length && this.scrollable) {
					this.$nextTick(() => {
						this.handleAnimation();
					});
				}
			},
			deep: true,
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
	},
	methods: {
		// 执行滚动动画
		async handleAnimation() {
			if (this.direction == 'across') {
				// 获取滚动消息的长度来计算动画的执行时间
				let dom = await utils.querySelector('#' + this.id, this);
				let animation = uni.createAnimation({
					duration: (dom.width / Number(this.acrossSpeed)) * 1000,
					delay: this.firstDone ? 0 : this.delay,
				});
				animation.translateX('-100%').step();
				this.animationData = animation.export();
			} else {
				let animation = uni.createAnimation({
					duration: this.verticalSpeed,
					delay: this.firstDone ? 0 : this.delay,
				});
				animation.translateY('-100%').step();
				this.animationData = animation.export();
			}
			this.firstDone = true;
		},
		// 还原动画
		async nextAnimation() {
			if (this.direction == 'across') {
				// 获取滚动消息的父级元素的长度实现无缝滚动
				if (!this.parentWidth) {
					let dom = await utils.querySelector('.' + this.id, this);
					this.parentWidth = dom.width;
				}
				// 先还原
				let animation = uni.createAnimation({
					duration: 0,
				});
				animation.translateX(this.parentWidth).step();
				this.animationData = animation.export();
				this.$nextTick(() => {
					this.handleAnimation();
				});
			} else {
				let animation = uni.createAnimation({
					duration: 0,
				});
				animation.translateY(0).step();
				this.animationData = animation.export();
				setTimeout(
					() => {
						this.handleAnimation();
					},
					this.standTime > this.verticalSpeed ? this.standTime : this.verticalSpeed // 下一个动画要在前一个动画后
				);
			}
		},
		// 动画结束
		async onAnimationEnd() {
			if (!this.touch) {
				if (this.direction == 'across') {
					this.index = this.index + 1 >= this.list.length ? 0 : this.index + 1;
					this.$nextTick(() => {
						this.nextAnimation();
					});
				} else {
					this.index = this.index + 1 >= this.list.length ? 0 : this.index + 1;
					this.copyList.push(this.copyList.shift());
					this.nextAnimation();
					console.log('this.index', this.index);
				}
			}
		},
		// 暂停
		doPause() {
			this.touch = true;
			let animation = uni.createAnimation({});
			animation.export();
			this.animationData = '';
			console.log('this.animationData', this.animationData);
		},
		// 取消暂停
		doRun() {
			this.touch = false;
		},
		handleClose(e) {
			this.show = false;
			this.$emit('close', e);
		},
		handleClick(e) {
			this.$emit('click', e);
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
		.across {
		}
		.vertical {
		}
		.active {
			animation-play-state: running;
		}
		.paused {
			animation-play-state: paused;
		}

		@keyframes acrossAnimation {
			to {
				transform: translateX(-100%);
			}
		}

		@keyframes marqueeAnimation {
			to {
				transform: translateY(-100%);
			}
		}
	}

	.vertical {
		flex-direction: column;
		height: 36rpx;
		line-height: 36rpx;
	}
}
</style>
