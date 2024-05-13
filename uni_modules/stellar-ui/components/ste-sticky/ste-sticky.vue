<template>
	<view class="ste-sticky" :id="elId" :style="[cmpRootStyle]">
		<slot />
	</view>
</template>

<script>
import utils from '../../utils/utils';
/**
 * sticky 吸顶
 * @description 该组件与CSS中position: sticky属性实现的效果一致，当组件达到预设的到顶部距离时， 就会固定在指定位置，组件位置大于预设的顶部距离时，会重新按照正常的布局排列。
 * @tutorial https://www.uviewui.com/components/sticky.html
 * @property {String ｜ Number}	offsetTop		吸顶时与顶部的距离，单位px（默认 0 ）
 * @property {String ｜ Number}	customNavHeight	自定义导航栏的高度 （h5 默认44  其他默认 0 ）
 * @property {Boolean}			disabled		是否开启吸顶功能 （默认 false ）
 * @property {String}			bgColor			组件背景颜色（默认 '#ffffff' ）
 * @property {String ｜ Number}	zIndex			吸顶时的z-index值
 * @property {Object}			customStyle		组件的样式，对象形式
 * @event {Function} fixed		组件吸顶时触发
 * @event {Function} unfixed	组件取消吸顶时触发
 * @example <ste-sticky offsetTop="200"><view>塞下秋来风景异，衡阳雁去无留意</view></ste-sticky>
 */
export default {
	name: 'ste-sticky',
	props: {
		// 吸顶容器到顶部某个距离的时候，进行吸顶
		offsetTop: {
			type: [String, Number],
			default: 0,
		},
		// 导航栏的高度(如果没有导航栏请设置为0)
		customNavHeight: {
			type: [String, Number],
			default: () => null,
		},
		// 是否禁用吸顶功能
		disabled: {
			type: Boolean,
			default: () => false,
		},
		// 吸顶区域的背景
		background: {
			type: String,
			default: () => '#fff',
		},
		// z-index值
		zIndex: {
			type: [String, Number],
			default: () => 100,
		},
	},
	data() {
		return {
			cssSticky: false, // 是否使用css的sticky实现
			elId: utils.guid(),
			width: 'auto',
			height: 'auto',
		};
	},
	computed: {
		cmpRootStyle() {
			const style = {
				...utils.bg2style(this.background),
			};
			if (!this.disabled) {
				style.position = 'sticky';
				style.zIndex = this.zIndex;
				style.top = `${this.offsetTop}px`;
			}
			return style;
		},
		relativeToViewportTop() {
			let customNavHeight = 0;
			if (this.customNavHeight === null) {
				// #ifdef H5
				customNavHeight = 44;
				// #endif
				// #ifndef H5
				customNavHeight = utils.System.getNavbarBottom();
				// #endif
			} else {
				customNavHeight = utils.formatPx(this.customNavHeight, 'num');
			}
			return customNavHeight + utils.formatPx(this.offsetTop, 'num');
		},
	},
	mounted() {
		if (this.disabled) return;
		setTimeout(() => {
			this.observeContent();
		}, 20);
	},
	methods: {
		observeContent() {
			// 先断掉之前的观察
			this.disconnectObserver('contentObserver');
			const contentObserver = uni.createIntersectionObserver(this, {
				thresholds: [0.5, 1],
			});
			// 到屏幕顶部的高度时触发
			contentObserver.relativeToViewport({ top: -(this.relativeToViewportTop + 2) });
			// 绑定观察的元素
			contentObserver.observe(`#${this.elId}`, (res) => {
				this.setFixed(res.boundingClientRect.top);
			});
			this.contentObserver = contentObserver;
		},
		setFixed(top) {
			// 判断是否处于吸顶条件范围
			this.$emit('fixed', top <= this.relativeToViewportTop);
		},
		disconnectObserver(observerName) {
			const observer = this[observerName];
			observer && observer.disconnect();
		},
	},
	destroyed() {
		this.disconnectObserver();
	},
};
</script>

<style lang="scss" scoped>
.ste-sticky {
	width: 100%;
}
</style>
