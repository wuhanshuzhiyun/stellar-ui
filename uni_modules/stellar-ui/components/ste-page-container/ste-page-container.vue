<template>
	<!-- #ifdef MP-WEIXIN -->
	<page-container
		:show="show"
		:duration="duration"
		:z-index="zIndex"
		:overlay="overlay"
		:position="position"
		:round="round"
		:close-on-slide-down="closeOnSlideDown"
		:overlay-style="overlayStyle"
		:custom-style="customStyle"
		:safe-area-inset-bottom="safeAreaInsetBottom"
		@beforeenter="emitEvent('beforeenter', $event)"
		@enter="emitEvent('enter', $event)"
		@afterenter="emitEvent('afterenter', $event)"
		@beforeleave="emitEvent('beforeleave', $event)"
		@leave="emitEvent('leave', $event)"
		@afterleave="emitEvent('afterleave', $event)"
		@clickoverlay="onClickOverlay"
	>
		<slot></slot>
	</page-container>
	<!-- #endif -->

	<!-- #ifndef MP-WEIXIN -->
	<ste-popup
		:show.sync="innerShow"
		:duration="duration"
		:zIndex="zIndex"
		:showMask="overlay"
		:position="popupPosition"
		:width="popupWidth"
		:height="popupHeight"
		:round="round"
		:isMaskClick="overlay"
		:showClose="false"
		@clickMask="onClickOverlay"
		@open-after="onPopupOpenAfter"
	>
		<view class="ste-page-container-content" :class="{ 'safe-area-bottom': safeAreaInsetBottom && position === 'bottom' }" :style="customStyle">
			<slot></slot>
		</view>
	</ste-popup>
	<!-- #endif -->
</template>

<script>
/**
 * ste-page-container 页面容器
 * @description 微信小程序下使用原生 page-container，其他平台使用 ste-popup 兼容实现
 * @property {Boolean} show 是否显示容器
 * @property {Number} duration 动画时长，单位 ms
 * @property {Number} zIndex 层级
 * @property {Boolean} overlay 是否显示遮罩
 * @property {String} position 弹出位置，top/bottom/right/center
 * @property {Boolean} round 是否展示圆角
 * @property {Boolean} closeOnSlideDown 是否允许下滑关闭（仅微信小程序）
 * @property {String} overlayStyle 遮罩层样式（仅微信小程序）
 * @property {String} customStyle 容器样式
 * @property {Boolean} safeAreaInsetBottom 是否适配底部安全区
 */
export default {
	group: '基础组件',
	title: 'PageContainer 页面容器',
	name: 'ste-page-container',
	props: {
		show: { type: Boolean, default: false },
		duration: { type: Number, default: 300 },
		zIndex: { type: [Number, String], default: 100 },
		overlay: { type: Boolean, default: true },
		position: {
			type: String,
			default: 'bottom',
			validator(value) {
				return ['top', 'bottom', 'right', 'center'].includes(value);
			},
		},
		round: { type: Boolean, default: false },
		closeOnSlideDown: { type: Boolean, default: false },
		overlayStyle: { type: String, default: '' },
		customStyle: { type: String, default: '' },
		safeAreaInsetBottom: { type: Boolean, default: false },
	},
	data() {
		return {
			innerShow: this.show,
			leaveTimer: null,
		};
	},
	computed: {
		popupPosition() {
			if (['top', 'bottom', 'right', 'center'].includes(this.position)) {
				return this.position;
			}
			return 'bottom';
		},
		popupWidth() {
			const customWidth = this.getCustomStyleValue('width');
			if (customWidth) return customWidth;
			if (this.popupPosition === 'right') return '80vw';
			return '100vw';
		},
		popupHeight() {
			const customHeight = this.getCustomStyleValue('height');
			if (customHeight) return customHeight;
			return 'auto';
		},
	},
	watch: {
		show(newVal) {
			// #ifndef MP-WEIXIN
			if (this.innerShow !== newVal) {
				this.innerShow = newVal;
			}
			this.triggerTransition(newVal);
			// #endif
		},
		innerShow(newVal) {
			// #ifndef MP-WEIXIN
			if (newVal !== this.show) this.$emit('update:show', newVal);
			// #endif
		},
	},
	beforeDestroy() {
		this.clearTimers();
	},
	created() {
		// #ifndef MP-WEIXIN
		if (this.show) this.triggerTransition(true);
		// #endif
	},
	methods: {
		getCustomStyleValue(property) {
			if (!this.customStyle) return '';
			const regexp = new RegExp(`(?:^|;)\\s*${property}\\s*:\\s*([^;]+)`, 'i');
			const match = this.customStyle.match(regexp);
			return match ? match[1].trim() : '';
		},
		emitEvent(eventName, e) {
			this.$emit(eventName, e);
		},
		onClickOverlay(e) {
			this.$emit('clickoverlay', e);
		},
		onPopupOpenAfter(e) {
			this.$emit('afterenter', e);
		},
		open() {
			this.$emit('update:show', true);
		},
		close() {
			this.$emit('update:show', false);
		},
		clearTimers() {
			if (this.leaveTimer) {
				clearTimeout(this.leaveTimer);
				this.leaveTimer = null;
			}
		},
		triggerTransition(show) {
			this.clearTimers();
			if (show) {
				this.$emit('beforeenter');
				this.$emit('enter');
				return;
			}
			this.$emit('beforeleave');
			this.$emit('leave');
			this.leaveTimer = setTimeout(() => {
				this.$emit('afterleave');
				this.leaveTimer = null;
			}, this.duration);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-page-container-content {
	width: 100%;
	height: 100%;
}

.safe-area-bottom {
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: border-box;
}
</style>
