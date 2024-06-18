<template>
	<view class="ste-video-root" :class="cmpRootClass" :style="[cmpRootStyleVar]">
		<!-- #ifndef MP-ALIPAY -->
		<video
			class="ste-video"
			:id="id"
			:src="videoSrc"
			:controls="false"
			:show-center-play-btn="false"
			:poster="poster"
			:autoplay="autoplay"
			:loop="loop"
			:muted="muted"
			:initialTime="initialTime"
			:duration="duration"
			:enable-play-gesture="enablePlayGesture"
			:pageGesture="pageGesture"
			:direction="direction"
			:enableProgressGesture="enableProgressGesture"
			:objectFit="objectFit"
			:mobileNetHintType="mobileNetHintType"
			:autoPauseIfNavigate="autoPauseIfNavigate"
			:autoPauseIfOpenNative="autoPauseIfOpenNative"
			:vslideGesture="vslideGesture"
			:vslideGestureInFullscreen="vslideGestureInFullscreen"
			:adUnitId="adUnitId"
			:posterForCrawler="posterForCrawler"
			:codec="codec"
			:httpCache="httpCache"
			:playStrategy="playStrategy"
			:header="header"
			:isLive="isLive"
			@click="handleClick"
			@play="play"
			@pause="pause"
			@ended="ended"
			@timeupdate="timeupdate"
			@fullscreenchange="fullscreenchange"
			@waiting="waiting"
			@error="error"
			@progress="progress"
			@loadeddata="loadeddata"
			@loadstart="loadstart"
			@seeked="seeked"
			@seeking="seeking"
			@loadedmetadata="loadedMetaData"
			@fullscreenclick="fullscreenclick"
		>
			<!-- <view class="ste-video-custom-content"> -->
			<!-- 图片操作提示 -->
			<view class="overlay-box" v-if="isFull && !firstFullDone">
				<ste-image
					src="https://image.whzb.com/chain/StellarUI/video/overlay.png"
					mode="widthFix"
					width="100%"
				/>
			</view>
			<!-- 顶部操作栏 -->
			<view
				class="cover top"
				:style="{
					transform: showControl ? 'translateY(0)' : 'translateY(-100%)',
					display: isFull ? 'flex' : 'none',
				}"
				@click="isClickControl = true"
			>
				<view @click="exitFullScreen">
					<ste-icon code="&#xe673;" size="40" color="#ffffff"></ste-icon>
				</view>
				<text class="title">{{ title }}</text>
			</view>
			<!-- 底部操作栏 -->
			<view
				class="cover bottom"
				:style="{ transform: showControl ? 'translateY(0)' : 'translateY(100%)' }"
				@click="isClickControl = true"
			>
				<!-- 播放/暂停按钮 -->
				<view v-if="showPlayBtn">
					<ste-icon
						code="&#xe6a8;"
						size="36"
						color="#ffffff"
						v-if="!playState"
						@click="handlePlay(true)"
					></ste-icon>
					<ste-icon code="&#xe6ab;" size="36" color="#ffffff" v-else @click="handlePlay(false)"></ste-icon>
				</view>
				<!-- 时间进度 -->
				<view class="time-box" v-if="isFull">
					<view class="time left">{{ formatTime(videoCurrent) }}</view>
					<view>/</view>
					<view class="time right">{{ formatTime(videoDuration) }}</view>
				</view>
				<!-- 进度条 -->
				<view class="progress-box" v-if="reRenderFlag">
					<ste-slider :value="playProgress" @change="handleProgressChange" barHeight="4" buttonSize="26">
						<view class="progress-bar" slot="button" />
					</ste-slider>
				</view>
				<!-- 时间进度 -->
				<view class="time-box" v-if="!isFull">
					<view class="time left">{{ formatTime(videoCurrent) }}</view>
					<view>/</view>
					<view class="time right">{{ formatTime(videoDuration) }}</view>
				</view>
				<template v-if="isFull">
					<view
						class="text-box resolution"
						@click="handleResolutionClick"
						v-if="resolution && resolution.length > 0"
					>
						{{ resolution[resolutionIndex].text }}
					</view>
					<view class="text-box speed" @click="handleSpeedClick">
						{{ speedConfigArr[speedIndex] + 'X' }}
					</view>
				</template>
				<!-- 全屏按钮 -->
				<view v-if="showFullscreenBtn">
					<ste-icon
						code="&#xe6a9;"
						size="36"
						color="#ffffff"
						v-if="!isFull"
						@click="handleFull(true)"
					></ste-icon>
					<ste-icon code="&#xe6aa;" size="36" color="#ffffff" v-else @click="handleFull(false)"></ste-icon>
				</view>
			</view>
			<!-- 倍速、清晰度弹窗 -->
			<view
				class="popup-box"
				:style="{ transform: showPopup ? 'translateX(0)' : 'translateX(100%)' }"
				@click="handlePopupClick"
			>
				<view class="item-box" :style="{ display: popupState == 1 ? 'flex' : 'none' }">
					<view
						class="choose-item"
						v-for="(e, index) in speedConfigArr"
						:key="index"
						@click="handleChooseItem(e, index)"
					>
						<text>{{ e + 'X' }}</text>
						<view v-if="speedIndex == index" class="check-icon">
							<ste-icon code="&#xe67a;" color="#fff" size="36"></ste-icon>
						</view>
					</view>
				</view>
				<view class="item-box" :style="{ display: popupState == 2 ? 'flex' : 'none' }">
					<view
						class="choose-item"
						v-for="(e, index) in resolution"
						:key="index"
						@click="handleChooseItem(e, index)"
					>
						<text>{{ e.text }}</text>
						<view v-if="resolutionIndex == index" class="check-icon">
							<ste-icon code="&#xe67a;" color="#fff" size="36"></ste-icon>
						</view>
					</view>
				</view>
			</view>
			<!-- </view> -->
		</video>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<video class="ste-video" :id="id" :src="src" />
		<!-- #endif -->
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import props from './props.js';
export default {
	group: '展示组件',
	title: 'Video 视频',
	name: 'ste-video',
	mixins: [props],
	data() {
		return {
			reRenderFlag: true,
			id: 'video-' + utils.guid(),
			videoSrc: '',
			video: null, // video 上下文
			playState: false, // 标识播放状态
			isFull: false, // 标识是否全屏状态
			showControl: true,
			isClickControl: false, // 标识点击的时候是否点的操作栏
			playProgress: 0,
			videoDuration: 0, // 视频时长，单位s
			videoCurrent: 0, // 当前视频播放时长，单位s
			firstFullDone: false, // 标识是否全屏过，此时不再显示图片提示
			isClickImgTip: false, // 标识点击的时候是否点的图片提示
			showPopup: false,
			popupState: 1, // 标识当前是倍速还是清晰度 1 倍速，2 清晰度
			speedIndex: 2,
			resolutionIndex: 0,
			speedConfigArr: [0.5, 0.8, 1.0, 1.25, 1.5],
		};
	},
	created() {
		if (this.src) {
			this.videoSrc = this.src;
		} else {
			this.videoSrc = this.resolution[this.resolutionIndex] ? this.resolution[this.resolutionIndex].url : '';
		}
	},
	mounted() {
		this.video = uni.createVideoContext(this.id, this);
	},
	computed: {
		cmpRootClass() {
			let classArr = [];
			if (this.isFull) {
				classArr.push('full');
			}
			if (this.autoHeight) {
				classArr.push('auto-height');
			}

			return classArr.join(' ');
		},
		cmpRootStyleVar() {
			let style = {
				'--control-height': this.isFull ? utils.formatPx(128) : utils.formatPx(88),
				// #ifndef H5 || WEB
				'--control-bottom-bar': utils.System.getNavbarBottom(),
				// #endif
				'--text-box-width': utils.formatPx(80),
				'--progress-bar-width': utils.formatPx(28),
				'--choose-item-font-size': utils.formatPx(28),
				'--check-icon-left': utils.formatPx(100),
				'--choose-item-gap': utils.formatPx(80),
				'--cover-font-size': utils.formatPx(28),
				'--title-padding-left': utils.formatPx(194),
				'--rpx-to-px-20': utils.formatPx(20),
				'--rpx-to-px-24': utils.formatPx(24),
				'--rpx-to-px-40': utils.formatPx(40),
				'--rpx-to-px-32': utils.formatPx(32),
				'--rpx-to-px-46': utils.formatPx(46),
				'--rpx-to-px-16': utils.formatPx(16),
				'--rpx-to-px-40': utils.formatPx(40),
				'--rpx-to-px-36': utils.formatPx(36),
			};
			return style;
		},
	},
	methods: {
		thro: utils.thro,

		handlePlay(state) {
			if (state) {
				// 播放
				this.video.play();
			} else {
				this.video.pause();
			}
		},
		handleFull(state) {
			if (state) {
				this.video.requestFullScreen();
			} else {
				this.firstFullDone = true;
				this.video.exitFullScreen();
			}

			this.reRenderFlag = false;
			setTimeout(() => {
				this.reRenderFlag = true;
			}, 200);
		},
		exitFullScreen() {
			this.showPopup = false;
			this.video.exitFullScreen();

			this.reRenderFlag = false;
			setTimeout(() => {
				this.reRenderFlag = true;
			}, 200);
		},
		handleProgressChange(v) {
			this.videoCurrent = this.videoDuration * (v / 100);
			this.video.seek(this.videoCurrent);
		},
		// 由于video的点击事件会导致其他点击事件也触发，所以通过一些标识符判断来触发不同逻辑
		handleClick() {
			// 此时全屏并点击了图片提示
			if (this.isFull && !this.firstFullDone) {
				this.firstFullDone = true;
				return;
			}

			if (!this.isClickControl && !this.isClickImgTip) {
				// 此时点击了视频空白区域
				if (this.showPopup) {
					this.showPopup = false;
					return;
				}
				this.showControl = !this.showControl;
				this.$emit('controlstoggle', this.showControl);
			} else {
				this.isClickControl = false;
				this.isClickImgTip = false;
			}
		},
		handleSpeedClick() {
			this.popupState = 1;
			this.showPopup = true;
		},
		handleResolutionClick() {
			this.popupState = 2;
			this.showPopup = true;
		},
		handlePopupClick() {
			this.isClickControl = true;
		},
		handleChooseItem(e, index) {
			if (this.popupState == 1) {
				if (this.speedIndex == index) return;
				this.speedIndex = index;
				this.video.playbackRate(this.speedConfigArr[this.speedIndex]);
			} else {
				if (this.resolutionIndex == index) return;
				this.resolutionIndex = index;
				this.handlePlay(false);
				this.videoSrc = this.resolution[this.resolutionIndex].url;
				setTimeout(() => {
					this.video.seek(this.videoCurrent);
					this.handlePlay(true);
				}, 200);
			}

			setTimeout(() => {
				this.showPopup = false;
			}, 20);
		},
		// 监听video事件

		play() {
			this.playState = true;
		},
		pause() {
			this.playState = false;
		},
		ended(e) {
			this.$emit('ended', e);
		},
		timeupdate(e) {
			this.videoDuration = e.detail.duration;
			this.videoCurrent = e.detail.currentTime;
			this.playProgress = (this.videoCurrent / this.videoDuration) * 100;
		},
		fullscreenchange(e) {
			this.isFull = e.detail.fullScreen;
			if (this.isFull) {
				this.video.hideStatusBar();
			} else {
				this.video.showStatusBar();
			}
		},
		waiting(e) {
			this.$emit('waiting', e);
		},
		error(e) {
			this.$emit('error', e);
		},
		progress(e) {
			this.$emit('progress', e);
		},
		loadeddata(e) {
			this.$emit('loadeddata', e);
		},
		loadstart(e) {
			this.$emit('loadstart', e);
		},
		seeked(e) {
			this.$emit('seeked', e);
		},
		seeking(e) {
			this.$emit('seeking', e);
		},
		loadedMetaData(e) {
			this.videoDuration = e.detail.duration;
		},
		fullscreenclick(e) {
			this.$emit('fullscreenclick', e);
		},
		// 监听video事件 end
		//
		// 格式化视频时间为时分秒
		formatTime(seconds) {
			let hours = Math.floor(seconds / 3600);
			let minutes = Math.floor((seconds % 3600) / 60);
			let remainingSeconds = Math.floor(seconds % 60);

			let formattedHours = hours > 0 ? (hours < 10 ? '0' + hours : hours) : '';
			let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
			let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

			if (formattedHours !== '') {
				return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
			} else {
				return formattedMinutes + ':' + formattedSeconds;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-video-root {
	position: relative;
	overflow: hidden;
	width: 100%;
	.ste-video {
		width: 100%;
		display: block;
	}

	.ste-video-custom-content {
		width: 100%;
		height: 100%;
		pointer-events: auto;
	}

	&.auto-height {
		height: 100%;
		.ste-video {
			height: 100%;
		}
	}

	&.full {
		.cover {
			position: fixed;

			padding: 0 var(--rpx-to-px-24);

			&.top {
				background: linear-gradient(0, rgba(0, 0, 0, 0) 0%, #000000 100%, #000000 100%);
			}

			&.bottom {
				background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);

				padding: 0 var(--rpx-to-px-40);

				.progress-box {
					padding-left: 0;
					padding-right: var(--rpx-to-px-32);
				}

				.text-box {
					padding-right: var(--rpx-to-px-32);
				}

				.time-box {
					padding-right: var(--rpx-to-px-46) !important;
					padding-left: var(--rpx-to-px-32);
				}
			}
		}
	}

	.overlay-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		z-index: 999;
	}

	.cover {
		position: absolute;
		line-height: 1;
		width: 100%;
		transition: transform 0.3s ease;
		display: flex;
		align-items: center;
		padding: 0 var(--rpx-to-px-16);
		height: var(--control-height);
		pointer-events: auto;
		color: #ffffff;
		font-size: var(--cover-font-size);
		&.top {
			top: 0;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 5%, rgba(255, 255, 255, 0) 100%);

			padding-left: var(--title-padding-left);

			.title {
				margin-left: 8px;
				font-size: var(--rpx-to-px-36);
			}
		}

		&.bottom {
			bottom: 0;
			// background: linear-gradient(0, rgba(0, 0, 0, 0.5) 5%, rgba(255, 255, 255, 0) 100%);
			background-color: rgba(0, 0, 0, 0.6);

			display: flex;
			justify-content: space-between;

			.progress-box {
				flex: 1;
				padding: 0 var(--rpx-to-px-32);

				.progress-bar {
					width: var(--progress-bar-width);
					height: var(--progress-bar-width);
					border-radius: 50%;
					background-color: #ffffff;
				}
			}

			.time-box {
				display: flex;
				align-items: center;
				overflow: hidden;
				padding-right: var(--rpx-to-px-20);

				.time {
					width: var(--text-box-width);
					overflow: hidden;

					&.right {
						text-align: right;
					}
				}
			}
		}
	}

	.popup-box {
		height: 100vh;
		width: 24.6vw;
		position: absolute;
		pointer-events: auto;
		right: 0;
		top: 0;
		transition: transform 0.3s ease;
		background-color: rgba(0, 0, 0, 0.8);

		line-height: 1;
		.item-box {
			line-height: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: var(--choose-item-gap);

			width: 100%;
			height: 100%;
		}
		.choose-item {
			color: #ffffff;
			position: relative;
			width: 100%;
			text-align: center;
			> text {
				font-size: var(--choose-item-font-size);
			}

			.check-icon {
				display: flex;
				position: absolute;
				right: var(--check-icon-left);
				top: -1px;
			}
		}
	}
}
</style>
