<template>
	<view class="ste-notice-bar" :style="[cmpRootStyle]" v-if="show">
		<view class="bar-content" @touchstart="doPause" @touchend="doRun" @mousedown="doPause" @mouseup="doRun">
			<view class="left">
				<slot name="leftIcon"></slot>
			</view>
			<view class="center across" v-if="direction == 'across'" @click="handleClick">
				<view
					:style="{
						animationDuration: acrossDuration + 's',
						animationPlayState: !touch ? 'running' : 'paused',
						animationDelay: (boxWidth > 0 ? 0 : delay) + 's',
					}"
					@animationend="onAnimationEnd"
					:class="cmpAnimationClass"
				>
					<view class="animation-placeholder" :style="{ width: boxWidth + 'px' }"></view>
					<ste-rich-text :text="acrossText"></ste-rich-text>
				</view>
			</view>
			<view class="center vertical" v-else @click="handleClick">
				<view
					v-for="(item, i) in listData"
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
			<view class="right">
				<slot name="rightIcon">
					<ste-icon code="&#xe67b;" size="24" @click="handleClose" v-if="closeMode"></ste-icon>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-notice-bar 通知栏
 * @description 通知栏组件
 * @tutorial https://stellar-ui.intecloud.com.cn//pc/index/index?name=ste-notice-bar
 * @property {Array} list 滚动数据列表
 * @property {String} direction 滚动的方向
 * @value across 水平 {String}
 * @value vertical 垂直{String}
 * @property {Boolean} closeMode 是否启用关闭模式
 * @property {String} color 文字颜色
 * @property {String} background 背景色
 * @property {Number} mode 尺寸
 * @value 100 小 {Number}
 * @value 200 中 {Number}
 * @value 300 大 {Number}
 * @property {String|Number} width 宽度，默认100%（占满父容器宽度）
 * @property {Number} speed 滚动速率
 * @property {Number} delay 延时多少秒开始滚动(为横向滚动时有效)
 * @property {Number} standTime 每次滚动前停留多少毫秒(竖向滚动时有效)
 * @property {Boolean} scrollable 是否可以滚动 默认false
 * @event {Function} click 内容区域点击回调事件
 * @event {Function} close 关闭模式下点击右侧关闭按钮时触发
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
			default: [],
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
			default: '#ffffff',
		},
		mode: {
			type: Number,
			default: 100,
		},
		width: {
			type: [Number, String],
			default: '100%',
		},
		speed: {
			type: [Number, String],
			default: 50,
		},
		delay: {
			type: [Number, String],
			default: 1,
		},
		standTime: {
			type: [Number, String],
			default: 1000,
		},
		scrollable: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			show: true,
			touch: false,
			acrossDuration: 0,
			verticalDuration: 0,
			acrossText: '',
			boxWidth: 0,
			firstDone: false,
			flag: true,
			curIndex: 0,
			listData: [],
		};
	},
	created() {},
	async mounted() {
		if (this.direction == 'across') {
			// 获取滚动消息的长度来计算动画的执行时间
			const cardMsgRes = await utils.querySelector('.scroll-box', this);
			this.acrossDuration = cardMsgRes.width / this.speed;
		} else {
			const cardMsgRes = await utils.querySelector('.center', this);
			this.verticalDuration = cardMsgRes.height / this.speed;
		}
	},
	computed: {
		cmpRootStyle() {
			let style = {
				background: this.background,
				width: utils.addUnit(this.width),
				'--text-color': this.color,
			};
			return style;
		},
		cmpAnimationClass() {
			let str = 'scroll-box';
			if (this.flag) {
				str += ' animation-play';
			} else {
				str += ' animation-none';
			}
			if (this.boxWidth > 0) {
				str += ' play-infinite';
			}
			return str;
		},
	},
	watch: {
		list: {
			handler(val) {
				if (Array.isArray(val)) {
					this.listData = val;
					this.acrossText = val.join('');
				} else {
					this.listData = [];
					this.acrossText = val;
				}
			},
			immediate: true,
		},
	},
	methods: {
		verticalEnd(e) {
			const fn = () => {
				this.flag = false;
				let tempListData = utils.deepClone(this.listData);
				tempListData.push(tempListData[0]);
				tempListData.shift();
				this.listData = tempListData;
				this.firstDone = true;
				setTimeout(() => {
					this.flag = true;
				}, this.standTime);
			};

			utils.thro(fn, { delay: this.standTime });
		},
		onAnimationEnd() {
			/**
			 * 由于横向动画中没有加入(form)，h5平台和小程序平台差异（h5初始化就会触发动画完毕事件，小程序在第一次执行完触发）
			 * h5平台加入了一些变量进行判断
			 */
			// #ifdef H5
			if (this.boxWidth <= 0 && this.firstDone) {
				// #endif

				// 第一次执行动画长度和后续动画执行的长度不一致，所以时间需要重新计算
				// 需要通过变量移除类名来移除动画(否则会导致动画闪动)
				// 再赋值为true恢复动画执行
				this.flag = false;
				utils.querySelector('.center', this).then((res) => {
					this.boxWidth = parseInt(res.width);
					this.$nextTick(() => {
						this.acrossDuration += this.boxWidth / this.speed;
						this.flag = true;
					});
				});

				// #ifdef H5
			}
			this.firstDone = true;
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
.ste-notice-bar {
	.bar-content {
		height: 56rpx;
		border-radius: 12rpx;
		width: 100%;
		display: flex;
		align-items: center;
		overflow-x: hidden;
		justify-content: flex-start;

		padding: 0 20rpx;
	}
	.left {
		margin-right: 20rpx;
	}
	.right {
		margin-left: 20rpx;
		cursor: pointer;
	}
	.center {
		font-size: 24rpx;
		height: 100%;
		flex: 1;
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		color: var(--text-color);
		&.vertical {
			display: block;

			animation-delay: 1s;
			.vertical-text-item {
				height: 100%;
				display: flex;
				align-items: center;
				will-change: transform;
				backface-visibility: hidden;
				&.animation-play {
					// animation: scrollDown  ease-out both;
					animation: scrollDown ease-out both running;
				}
			}

			@keyframes scrollDown {
				0% {
					transform: translateY(0);
				}
				100% {
					transform: translateY(-100%);
				}
			}
		}
		.scroll-box {
			height: 100%;

			display: inline-flex;
			align-items: center;
			width: auto;
			white-space: nowrap;

			&.animation-none {
				display: none;
			}

			&.animation-play {
				animation: marquee linear both running;
				// animation-fill-mode: backwards;
			}

			&.play-infinite {
				animation-iteration-count: infinite;
			}
		}

		.animation-placeholder {
			height: 100%;
			background-color: rgba(0, 0, 0, 0);
		}
	}

	@keyframes marquee {
		100% {
			-webkit-transform: translateX(-100%);
			transform: translate(-100%);
		}
	}

	@-webkit-keyframes marquee {
		100% {
			-webkit-transform: translateX(-100%);
			transform: translate(-100%);
		}
	}
}
</style>
