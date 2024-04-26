<template>
	<view class="ste-notice-bar-root" :style="[cmpStyle]">
		<div class="msg-box-content" @touchstart="doPause" @touchend="doRun" @mousedown="doPause" @mouseup="doRun">
			<div class="left">
				<slot name="leftIcon">
					<ste-image width="36" height="36" src="https://image.whzb.com/chain/StellarUI/notice-bar/tip.png" />
				</slot>
			</div>
			<div v-if="direction == 'across'" class="center" :class="id" @click="handleClick">
				<div :animation="animationData" :id="id" @transitionend="onAnimationEnd">
					<ste-rich-text :text="list[index]"></ste-rich-text>
				</div>
			</div>
			<view v-else class="center vertical" v-else @click="handleClick">
				<view
					v-for="(item, i) in list"
					:key="i"
					class="vertical-text-item"
					:class="flag ? 'animation-play' : ''"
					:style="{
						animationPlayState: !touch ? 'running' : 'paused',
						animationDuration: verticalDuration + 's',
						animationDelay: (firstDone ? '0' : standTime) + 'ms',
					}"
					@animationend="verticalEnd"
				>
					{{ item }}
				</view>
			</view>
			<view class="right-icon">
				<slot name="rightIcon">
					<ste-icon code="&#xe67b;" size="24" @click="handleClose" v-if="closeMode"></ste-icon>
				</slot>
			</view>
		</div>
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
 * @property {Number} speed，across：滚动速率 (px/s)，vertical：滚动的速度（ms），默认 50
 * @property {Number} delay 延时多少秒，默认 1
 * @property {Number} standTime 垂直停留时间(ms)，默认 1000
 * @property {Boolean} scrollable 是否可以滚动 默认 false
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
			default: 50,
		},
		delay: {
			type: Number,
			default: 1,
		},
		standTime: {
			type: Number,
			default: 1000,
		},
		scrollable: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			id: utils.guid(),
			index: 0,
			textTranslate: 0,
			touch: false,
			boxWidth: 0,
			flag: true,
			firstDone: false,
			animationData: {},
			parentWidth: 0,
		};
	},
	async mounted() {
		this.handleAnimation();
	},
	// watch: {
	// 	list: {
	// 		handler(val) {},
	// 		deep: true,
	// 	},
	// },
	computed: {
		cmpStyle() {
			let style = {};
			style['width'] = isNaN(Number(this.width)) ? this.width : utils.formatPx(this.width);
			style['minHeight'] = utils.formatPx(68);
			style['height'] = utils.formatPx(68);
			style['background'] = this.background;
			style['color'] = this.color;
			return style;
		},
	},
	methods: {
		// 第一次执行动画
		async handleAnimation() {
			if (this.direction == 'across') {
				// 获取滚动消息的长度来计算动画的执行时间
				let dom = await utils.querySelector('#' + this.id, this);
				console.log('dom.width ', dom.width);
				let animation = uni.createAnimation({
					duration: (dom.width / Number(this.speed)) * 1000,
				});
				animation.translateX('-100%').step();
				this.animationData = animation.export();
			}
		},
		// 循环动画
		async nextAnimation() {
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
			// 获取滚动消息的长度来计算动画的执行时间
			// let dom1 = await utils.querySelector('#' + this.id, this);
			// let animation = uni.createAnimation({
			// 	duration: (dom1.width / Number(this.speed)) * 1000,
			// });
			// console.log('dom1.width ', dom1.width);
			// let dom2 = await utils.querySelector('.' + this.id, this);
			// // this.textTranslate = dom2.width;
			// animation.translateX(dom2.width).step();
			// this.animationData = animation.export();
			// console.log('dom2.width ', dom2.width);
		},
		// 动画结束
		async onAnimationEnd() {
			console.log('index', this.index);
			this.index = this.index + 1 >= this.list.length ? 0 : this.index + 1;
			this.$nextTick(() => {
				this.nextAnimation();
			});
			// // #ifdef H5
			// if (this.firstDone) {
			// 	// #endif
			// 	this.flag = false;
			// 	this.index = this.index + 1 >= this.list.length ? 0 : this.index + 1;
			// 	// 获取滚动消息的父级元素的长度实现无缝滚动
			// 	this.$nextTick(async () => {
			// 		let dom = await utils.querySelector('.' + this.id, this);
			// 		this.textTranslate = dom.width;
			// 		await this.getAnimationTime();
			// 		this.flag = true;
			// 	});
			// 	// #ifdef H5
			// }
			// this.firstDone = true;
			// // #endif
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
	padding: 16rpx;
	background: #f9f9f9;
	border-radius: 16rpx;
	display: flex;
	align-items: center;

	.msg-box-content {
		display: flex;
		align-items: center;
		overflow-x: hidden;
		justify-content: flex-start;
	}
	.left {
		flex-shrink: 0;
		margin-right: 16rpx;
		display: flex;
		align-items: center;
	}
	.center {
		flex: 1;
		display: flex;
		overflow: hidden;

		> div {
			fong-size: 24rpx;
			display: inline-block;
			width: auto;
			white-space: nowrap;
			animation-delay: 1.5s;
		}
		.animation {
			animation: marquee linear both running;
			animation-iteration-count: 1;
		}
		.animation-none {
			display: none;
		}

		.animation-play {
			animation: marquee linear both running;
		}
	}

	@keyframes marquee {
		to {
			transform: translate(-100%);
		}
	}

	@-webkit-keyframes marquee {
		to {
			transform: translate(-100%);
		}
	}
}
</style>
