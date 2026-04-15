<template>
	<view
		class="ste-marquee"
		:style="[containerStyle, cssVariables]"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		@touchstart="handleMouseEnter"
		@touchend="handleMouseLeave"
		data-test="marquee"
	>
		<view class="ste-mq-wrapper" :class="{ 'is-paused': isPaused }">
			<view class="ste-mq-content" :class="animationClass">
				<view v-for="(item, index) in displayQueue" :key="item._key" class="ste-mq-item" :style="getItemStyle(item)" @click="handleClick(item, index)">
					<slot name="item" :item="item" :index="index">
						<image v-if="item.icon" class="ste-mq-icon" :src="item.icon" mode="aspectFit" />
						<text class="ste-mq-text">{{ item.text }}</text>
					</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';

/**
 * ste-marquee 走马灯
 * @description 用于展示滚动公告、中奖名单等水平滚动信息。
 * @tutorial https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui&menu=%E7%BB%84%E4%BB%B6&active=ste-marquee
 * @property {Array} list 数据列表，每项包含 id/text/icon/color/background，默认 []
 * @property {Number} speed 滚动速度 (px/s)，默认 50
 * @property {Boolean} pauseOnHover 鼠标悬停/触摸时是否暂停，默认 true
 * @property {Boolean} loop 是否循环播放，默认 true
 * @property {Number} gap 消息项间距 (rpx)，默认 20
 * @property {String} height 容器高度，默认 auto
 * @property {Boolean} fillScreen 是否填满屏幕，默认 false
 * @property {Boolean} clickable 是否可点击，默认 true
 * @property {String} containerBg 容器背景色，默认 transparent
 * @property {String} containerPadding 容器内边距，默认 0rpx
 * @property {String} containerRadius 容器圆角，默认 0rpx
 * @property {String} itemBg 消息项背景色，默认 transparent
 * @property {String} itemPadding 消息项内边距，默认 0rpx 20rpx
 * @property {String} itemRadius 消息项圆角，默认 0rpx
 * @event {Function} click 点击消息项时触发，参数：item, index
 */
export default {
	group: '展示组件',
	title: 'Marquee 走马灯',
	name: 'ste-marquee',
	options: {
		virtualHost: true,
	},
	props: {
		list: {
			type: [Array, null],
			default: () => [],
		},
		speed: {
			type: [Number, null],
			default: 50,
		},
		pauseOnHover: {
			type: [Boolean, null],
			default: true,
		},
		loop: {
			type: [Boolean, null],
			default: true,
		},
		gap: {
			type: [Number, null],
			default: 20,
		},
		height: {
			type: [String, null],
			default: 'auto',
		},
		fillScreen: {
			type: [Boolean, null],
			default: false,
		},
		clickable: {
			type: [Boolean, null],
			default: true,
		},
		containerBg: {
			type: [String, null],
			default: 'transparent',
		},
		containerPadding: {
			type: [String, null],
			default: '0rpx',
		},
		containerRadius: {
			type: [String, null],
			default: '0rpx',
		},
		itemBg: {
			type: [String, null],
			default: 'transparent',
		},
		itemPadding: {
			type: [String, null],
			default: '0rpx 20rpx',
		},
		itemRadius: {
			type: [String, null],
			default: '0rpx',
		},
	},
	data() {
		return {
			displayQueue: [],
			contentWidth: 0,
			isReady: false,
			isPaused: false,
			copyCount: 2,
			keySeed: 0,
			isInitialized: false,
		};
	},
	computed: {
		containerStyle() {
			const style = {};
			if (this.height !== 'auto') {
				style['height'] = this.height;
			}
			style['background'] = this.containerBg;
			style['padding'] = this.containerPadding;
			style['borderRadius'] = this.containerRadius;
			return style;
		},
		cssVariables() {
			if (!this.isReady || this.contentWidth <= 0) {
				return {};
			}
			const duration = this.contentWidth / this.speed;
			return {
				'--marquee-duration': `${duration}s`,
				'--marquee-width': `${this.contentWidth}px`,
			};
		},
		animationClass() {
			if (!this.isReady || this.contentWidth <= 0) {
				return '';
			}
			return 'is-animating';
		},
	},
	watch: {
		list: {
			handler(newList) {
				if (!this.isInitialized) return;
				this.init(newList);
			},
			deep: true,
		},
	},
	mounted() {
		setTimeout(async () => {
			await this.init(this.list);
			this.isInitialized = true;
		}, 100);
	},
	methods: {
		// ─── 工具 ──────────────────────────────────────────────
		mkKey(id, copy, seed) {
			return `${id}_c${copy}_s${seed}`;
		},

		queryWidth(selector) {
			return new Promise((resolve) => {
				uni.createSelectorQuery()
					.in(this)
					.select(selector)
					.boundingClientRect((rect) => resolve(rect ? rect.width : 0))
					.exec();
			});
		},

		// ─── 获取消息项样式 ────────────────────────────────────
		getItemStyle(item) {
			return {
				color: item.color || '',
				background: item.background || this.itemBg,
				padding: this.itemPadding,
				borderRadius: this.itemRadius,
				marginRight: `${this.gap}rpx`,
			};
		},

		// ─── 构建队列 ──────────────────────────────────────────
		async buildQueue(sourceList) {
			if (!sourceList || !sourceList.length) {
				this.displayQueue = [];
				this.isReady = false;
				return;
			}

			this.isReady = false;
			const currentSeed = this.keySeed++;

			// 先渲染单份测量宽度
			this.displayQueue = sourceList.map((it) => ({
				...it,
				_key: this.mkKey(it.id, 0, currentSeed),
			}));

			await this.$nextTick();
			await new Promise((r) => setTimeout(r, 50));

			const containerWidth = await this.queryWidth('.ste-marquee');
			let singleWidth = await this.queryWidth('.ste-mq-content');

			if (singleWidth <= 0) {
				await new Promise((r) => setTimeout(r, 100));
				singleWidth = await this.queryWidth('.ste-mq-content');
				if (singleWidth <= 0) {
					this.contentWidth = 0;
					return;
				}
			}
			this.contentWidth = singleWidth;

			// 计算需要复制几份以填满容器
			if (this.contentWidth <= 0) {
				this.copyCount = 2;
			} else if (this.contentWidth >= containerWidth) {
				this.copyCount = 2;
			} else {
				this.copyCount = Math.max(3, Math.ceil((containerWidth * 3) / this.contentWidth) + 1);
			}

			// 构建多份填充
			const filled = [];
			for (let c = 0; c < this.copyCount; c++) {
				sourceList.forEach((it) =>
					filled.push({
						...it,
						_key: this.mkKey(it.id, c, currentSeed),
					})
				);
			}
			this.displayQueue = filled;

			await this.$nextTick();
			this.isReady = true;

			console.log('[ste-marquee] built queue, contentWidth:', this.contentWidth, 'copies:', this.copyCount);
		},

		// ─── 初始化 ────────────────────────────────────────────
		async init(list, { keepPaused = false } = {}) {
			if (!keepPaused) {
				this.isPaused = false;
			}
			await this.buildQueue(list);
		},

		// ─── 播放控制（对外暴露） ──────────────────────────────
		play() {
			this.isPaused = false;
		},
		pause() {
			this.isPaused = true;
		},
		resume() {
			this.isPaused = false;
		},
		async stop() {
			this.isPaused = true;
			await this.init(this.list, { keepPaused: true });
		},

		// ─── 交互事件 ──────────────────────────────────────────
		handleClick(item, index) {
			if (!this.clickable) return;
			this.$emit('click', item, index);
		},
		handleMouseEnter() {
			if (this.pauseOnHover) this.pause();
		},
		handleMouseLeave() {
			if (this.pauseOnHover) this.resume();
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-marquee {
	width: 100%;
	overflow: hidden;
	position: relative;
}

.ste-mq-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
	white-space: nowrap;

	&.is-paused .ste-mq-content {
		animation-play-state: paused !important;
	}
}

.ste-mq-content {
	display: flex;
	flex-shrink: 0;
	will-change: transform;

	&.is-animating {
		animation: marquee-scroll var(--marquee-duration, 10s) linear infinite;
	}
}

@keyframes marquee-scroll {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(calc(var(--marquee-width, 0px) * -1));
	}
}

.ste-mq-item {
	display: inline-flex;
	align-items: center;
	flex-shrink: 0;
	cursor: pointer;
}

.ste-mq-icon {
	width: 40rpx;
	height: 40rpx;
	margin-right: 10rpx;
	border-radius: 50%;
}

.ste-mq-text {
	font-size: 28rpx;
	line-height: 1.5;
}
</style>
