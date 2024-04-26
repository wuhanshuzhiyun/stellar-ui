<template>
	<view class="ste-notice-bar-root" :style="[cmpStyle]">
		<div class="msg-box-content" @touchstart="this.touch = true" @touchend="this.touch = false">
			<div class="left">
				<ste-image width="36" height="36" src="https://image.whzb.com/chain/StellarUI/notice-bar/tip.png" />
			</div>
			<div class="right" :class="id">
				<div :style="[cmpMsg]" @animationend="onAnimationEnd" ref="cardMsg" :id="id" :class="cardMsgClass">
					<ste-rich-text :text="cmpText"></ste-rich-text>
				</div>
			</div>
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
 * @property {Number} mode 尺寸，默认 200
 * @value 100 小 {Number}
 * @value 200 中 {Number}
 * @value 300 大 {Number}
 * @property {Number|String} width 宽度 尺寸 默认 100%
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
		mode: {
			type: Number,
			default: 200,
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
			// 消息滚动的时间
			textDuration: 10,
			index: 0,
			textTranslate: 0,
			cardMsgClass: '',
			touch: false,
		};
	},
	async mounted() {
		if (this.direction == 'across') {
			// 获取滚动消息的长度来计算动画的执行时间
			const dom = await utils.querySelector('#' + this.id, this);
			console.log('dom21', dom);
			this.textDuration = dom.width / Number(this.speed);
		}
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
			style['background'] = this.background;
			style['color'] = this.color;
			return style;
		},
		cmpMsg() {
			let style = {};
			style['animationDuration'] = this.textDuration + 's';
			style['animationPlayState'] = !this.touch ? 'running' : 'paused';
			style['transform'] = `translateX(${this.textTranslate}px)`;
			return style;
		},
		cmpText() {
			return this.list[this.index];
		},
	},
	methods: {
		async onAnimationEnd() {
			console.log('xxxxx');
			// 获取滚动消息的父级元素的长度实现无缝滚动
			let dom = await utils.querySelector('.' + this.id, this);
			console.log('dom', dom);
			this.textTranslate = dom.width;
			this.cardMsgClass = 'play-infinite';
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-notice-bar-root {
	width: 100%;
	padding: 16rpx;
	background: #f9f9f9;

	.msg-box-content {
		min-height: 56rpx;
		background-color: #ffffff;
		border-radius: 12rpx;
		width: 100%;
		display: flex;
		align-items: center;
		overflow-x: hidden;
		justify-content: flex-start;
		padding: 10rpx 26rpx 10rpx 20rpx;
	}
	.left {
		flex-shrink: 0;
		margin-right: 10rpx;
	}
	.right {
		flex: 1;
		overflow: hidden;
		> div {
			fong-size: 24rpx;
			display: inline-block;
			width: auto;
			white-space: nowrap;
			animation: marquee linear both running;
			animation-delay: 1.5s;
		}

		.play-infinite {
			animation-iteration-count: infinite;
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
