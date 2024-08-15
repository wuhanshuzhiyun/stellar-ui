<template>
	<view class="ste-animate-root" :class="[cmpRootClass]" :style="[cmpRootStyle]" @click="handleClick">
		<slot></slot>
	</view>
</template>

<script>
export default {
	group: '展示组件',
	title: 'Animate 动画',
	name: 'ste-animate',
	options: {
		virtualHost: true,
	},
	props: {
		show: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: '',
		},
		loop: {
			type: Boolean,
			default: false,
		},
		duration: {
			type: Number,
			default: 300,
		},
		action: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			animationFlag: false, // 通过此标识控制动画执行
		};
	},
	computed: {
		cmpRootClass() {
			let classArr = [];
			if (this.type && (this.action === 'initial' || this.animationFlag || this.loop)) {
				classArr.push(`ste-animate-${this.type}`);
			}
			if (this.loop) {
				classArr.push('loop');
			}
			return classArr.join(' ');
		},
		cmpRootStyle() {
			let style = {};
			if (this.duration) {
				style.animationDuration = this.duration;
			}
			return style;
		},
	},
	watch: {
		show: {
			handler(val) {
				if (val) {
					this.animated();
				}
			},
		},
	},
	methods: {
		handleClick() {
			if (this.action === 'click') {
				this.animated();
			}
		},
		animated() {
			this.animationFlag = false;
			setTimeout(() => {
				this.animationFlag = true;
			}, 10);
		},
	},
};
</script>

<style lang="scss" scoped>
@import './animate.scss'; // 所有动画
.ste-animate-root {
	display: inline-block;

	&[class*='ste-animate-'] {
		animation-duration: 0.5s;
		animation-timing-function: ease-out;
		animation-fill-mode: both;
	}

	// 循环
	&.loop {
		animation-iteration-count: infinite !important;
	}

	// 横向抖动
	&.ste-animate-shakeX {
		animation-name: shakeX;
	}

	// 竖向抖动
	&.ste-animate-shakeY {
		animation-name: shakeY;
	}

	// 心跳
	&.ste-animate-ripple {
		animation-name: ripple;
	}

	// 漂浮
	&.ste-animate-float {
		position: relative;
		animation-name: floatPop;
	}

	// 呼吸灯
	&.ste-animate-breath {
		animation-name: breath;
		animation-duration: 2700ms;
		animation-timing-function: ease-in-out;
		animation-direction: alternate;
	}

	// 右侧向左侧划入
	&.ste-animate-slide-right {
		animation-name: slide-right;
	}

	// 右侧向左侧划入
	&.ste-animate-slide-left {
		animation-name: slide-left;
	}

	// 上面向下面划入
	&.ste-animate-slide-top {
		animation-name: slide-top;
	}

	// 下面向上面划入
	&.ste-animate-slide-bottom {
		animation-name: slide-bottom;
	}

	&.ste-animate-jump {
		transform-origin: center center;
		animation: jump 0.7s linear;
	}

	&.ste-animate-twinkle {
		position: relative;

		&::after,
		&::before {
			position: absolute;
			right: 50%;
			z-index: 1;
			box-sizing: border-box;
			width: 60px;
			height: 60px;
			margin-top: -15px;
			margin-right: -30px;
			content: '';
			border: 4rpx solid rgba(255, 255, 255, 0.6);
			border-radius: 30px;
			transform: scale(0);
			animation: twinkle 2s ease-out infinite;
		}

		&::after {
			animation-delay: 0.4s;
		}
	}

	&.ste-animate-flicker {
		position: relative;
		overflow: hidden;

		&::after {
			position: absolute;
			top: -2rpx;
			left: 0;
			width: 200rpx;
			height: 102%;
			content: '';
			background-image: linear-gradient(106deg, rgba(232, 224, 255, 0) 24%, #e8e0ff 91%);
			filter: blur(6rpx);
			opacity: 0.73;
			transform: skew(-20deg);
			animation: flicker 1.5s linear infinite;
		}
	}
}
</style>
