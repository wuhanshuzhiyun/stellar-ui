<template>
	<view class="ste-media-preview-root" v-if="dataShow">
		<view class="media-preview-content">
			<swiper
				style="width: 100%; height: 100%"
				:autoplay="autoplay > 0"
				:interval="autoplay"
				:circular="loop"
				:current="dataIndex"
				@change="onChange"
			>
				<swiper-item v-for="(item, index) in cmpUrls" :key="index">
					<view
						class="preview-item"
						@click.stop="1"
						@touchstart="onTouchstart"
						@touchmove="onTouchmove"
						@touchend="onTouchend"
						@longpress="onLongpress"
						:style="[dataIndex === index ? cmpTransform : null]"
					>
						<video
							class="video"
							object-fit="contain"
							v-if="item.type === 'video'"
							:src="item.url || item.path"
							@click.stop="1"
						/>
						<ste-image
							v-else
							class="image"
							:showMenuByLongpress="dataShowmenu"
							:src="item.url || item.path"
							mode="aspectFit"
						></ste-image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="media-preview-footer">
			<view class="footer-index">
				<text v-if="showIndex">{{ dataIndex + 1 }}/{{ cmpUrls.length }}</text>
			</view>
			<view class="footer-close" @click="onClose">
				<ste-icon name="close" size="60" code="&#xe6a0;" color="#fff" />
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import TouchScaleing from './TouchScaleing.js';
/**
 * ste-media-preview 媒体预览
 * @description 媒体预览组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-media-preview
 * @property {Boolean} show 是否显示
 * @property {Array<String>} urls 预览的媒体地址数组
 * @property {Number} autoplay 自动轮播时长，为0不自动轮播，单位ms
 * @property {Boolean} loop 是否前后衔接播放
 * @property {Number} index 默认展示的资源下标
 * @property {Boolean} showIndex 是否显示左下角索引
 * @property {Boolean} scale 是否支持双指缩放
 * @property {Boolean} showmenu 是否开启图片长按菜单
 * @event {Function} beforeClose 关闭前触发
 * @event {Function} close 关闭后触发
 * @event {Function} change 切换时触发
 * @event {Function} longpress 长按触发
 */
export default {
	group: '展示组件',
	title: 'MediaPreview 媒体预览',
	name: 'ste-media-preview',
	props: {
		show: {
			type: Boolean,
			default: () => false,
		},
		urls: {
			type: Array,
			default: () => [],
		},
		autoplay: {
			type: Number,
			default: () => 0,
		},
		loop: {
			type: Boolean,
			default: () => false,
		},
		index: {
			type: [Number, null],
			default: () => null,
		},
		showIndex: {
			type: Boolean,
			default: () => true,
		},
		scale: {
			type: Boolean,
			default: () => false,
		},
		showmenu: {
			type: Boolean,
			default: () => true,
		},
	},
	data() {
		return {
			dataIndex: 0,
			dataShow: false,
			touch: null,
			scaling: 1,
			translate: 0,
			rotate: 0,
			transition: 0,
			dataShowmenu: true,
		};
	},
	mounted() {
		if (this.scale) this.touch = new TouchScaleing();
	},
	computed: {
		cmpUrls() {
			return this.urls
				.map((url) => ({ url, type: utils.getMediaFileType(url) }))
				.filter((item) => item.type !== 'audio');
		},
		cmpTransform() {
			return {
				transform: `scale(${this.scaling}) translate(${this.translate}) rotate(${this.rotate}deg)`,
				transition: this.transition,
			};
		},
	},
	watch: {
		show: {
			handler(v) {
				if (v) {
					// 如果外部指定index，则使用外部index，不然使用内部dataIndex
					if (this.index != null) {
						this.dataIndex = this.index;
					}
				}
				this.dataShow = v;
			},
			immediate: true,
		},
		showmenu: {
			handler(v) {
				this.dataShowmenu = v;
			},
			immediate: true,
		},
	},
	methods: {
		async onClose() {
			let next = true;
			const stop = new Promise((resolve, reject) => {
				this.$emit(
					'beforeClose',
					() => (next = false),
					() => resolve(),
					() => reject()
				);
			});
			if (!next) {
				await stop;
			}
			this.dataShow = false;
			this.$emit('update:show', false);
			this.$emit('close');
		},
		async onTouchstart(e) {
			if (!this.scale) return;

			const [x1, y1, x2, y2] = this.touch.touchStart(e.changedTouches);
			if (x1 && y1 && x2 && y2) {
				if (this.dataShowmenu) this.dataShowmenu = false;
			}
		},
		onTouchmove(e) {
			if (!this.scale) return;
			/**
			 * @type {TouchScaleing}
			 */
			const touch = this.touch;
			const bool = touch.touchMove(e.changedTouches);
			if (!bool) {
				if (this.dataShowmenu !== this.showmenu) this.dataShowmenu = this.showmenu;
				return;
			}
			if (this.dataShowmenu) this.dataShowmenu = false;
			this.scaling = touch.scale;
			this.translate = `${touch.translateX}px,${touch.translateY}px`;
			this.rotate = touch.rotate;
		},
		onTouchend(e) {
			if (!this.scale) return;
			this.dataShowmenu = this.showmenu;
			const bool = this.touch.touchEnd(e.changedTouches);
			if (!bool) return;
			this.transition = '0.3s';
			setTimeout(() => {
				this.scaling = 1;
				this.translate = 0;
				this.rotate = 0;
				setTimeout(() => {
					this.transition = 0;
				}, 100);
			}, 50);
		},
		onChange({ detail }) {
			this.dataIndex = detail.current;
			this.$emit('update:index', this.dataIndex);
			this.$emit('change', this.dataIndex);
		},
		onLongpress() {
			this.$emit('longpress', this.dataIndex);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-media-preview-root {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100vw;
	height: 100vh;
	background-color: #000;
	color: #fff;
	z-index: 1001;
	.media-preview-content {
		width: 100%;
		height: calc(100% - 120rpx);
		display: flex;
		align-items: center;
		justify-content: center;
		.preview-item {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.image,
			.video {
				width: 100%;
				height: 100%;
			}
			.image {
				max-width: 100%;
				max-height: 100%;
			}
		}
	}
	.media-preview-footer {
		width: 100%;
		height: 120rpx;
		padding: 0 30rpx 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
