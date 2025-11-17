<template>
	<view class="ste-sticky" data-test="sticky" :id="elId" :style="[cmpRootStyle]">
		<slot />
	</view>
</template>

<script>
import utils from '../../utils/utils';
/**
 * sticky 吸顶
 * @description 该组件与CSS中position: sticky属性实现的效果一致，当组件达到预设的到顶部距离时， 就会固定在指定位置，组件位置大于预设的顶部距离时，会重新按照正常的布局排列。
 * @tutorial https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui&menu=%E7%BB%84%E4%BB%B6&active=ste-sticky
 * @property {String ｜ Number}	offsetTop		吸顶时与顶部的距离，单位rpx（默认 0 ）
 * @property {String ｜ Number}	customNavHeight	航栏的高度（没有导航栏时，请设置为0）
 * @property {Boolean}		disabled		是否开启吸顶功能 （默认 false ）
 * @property {String}			background	组件背景，默认#fff
 * @property {String ｜ Number}	zIndex			吸顶时的z-index值
 * @event {Function} fixed		组件吸顶时触发
 * @event {Function} unfixed	组件取消吸顶时触发
 * @example <ste-sticky offsetTop="200"><view>塞下秋来风景异，衡阳雁去无留意</view></ste-sticky>
 */
export default {
	name: 'ste-sticky',
	group: '基础组件',
	title: 'Sticky 吸顶',
	props: {
		// 吸顶容器到顶部某个距离的时候，进行吸顶
		offsetTop: {
			type: [String, Number, null],
			default: 0,
		},
		// 导航栏的高度(如果没有导航栏请设置为0)
		customNavHeight: {
			type: [String, Number, null],
			default: () => null,
		},
		// 是否禁用吸顶功能
		disabled: {
			type: [Boolean, null],
			default: () => false,
		},
		// 吸顶区域的背景
		background: {
			type: [String, null],
			default: () => '#fff',
		},
		// z-index值
		zIndex: {
			type: [String, Number, null],
			default: () => 98,
		},
	},
	data() {
		return {
			elId: utils.guid(),
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
				style.top = utils.formatPx(this.offsetTop);
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
				thresholds: [0.8, 1],
			});
			// 到屏幕顶部的高度时触发
			contentObserver.relativeToViewport({ top: -(this.relativeToViewportTop + 1) });
			// 绑定观察的元素
			contentObserver.observe(`#${this.elId}`, (res) => {
				this.setFixed(res.boundingClientRect.top);
			});
			this.contentObserver = contentObserver;
		},
		setFixed(top) {
			const bool = top <= this.relativeToViewportTop;
			// 判断是否处于吸顶条件范围
			if (bool) this.$emit('fixed');
			else this.$emit('unfixed');
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
