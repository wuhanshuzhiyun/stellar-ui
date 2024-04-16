<template>
	<scroll-view
		class="ste-scroll-to-root"
		scroll-y
		scroll-anchoring
		scroll-with-animation
		:scroll-animation-duration="300"
		:scroll-top="scrollTop"
		:style="[cmpRootStyle]"
		@scroll="onScroll"
		@scrolltolower="onScrolltolower"
	>
		<view class="ste-scroll-to-content">
			<slot />
		</view>
	</scroll-view>
</template>

<script>
import utils from '../../utils/utils.js';
function isNum(num) {
	return typeof num === 'number' && !isNaN(num);
}

/**
 * ste-scroll-to 滚动锚点
 * @description 滚动锚点
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-scroll-to
 * @property {Number}					active 当前激活的锚点index，支持sync双向绑定，默认值0
 * @property {String|Number}	height 高度，默认值100%
 * @event {Function}					change 滚动锚点时触发
 */
export default {
	group: '导航组件',
	title: 'ScrollTo 滚动锚点',
	name: 'ste-scroll-to',
	provide() {
		return {
			_scrollToComponent: { getParent: () => this },
		};
	},
	props: {
		active: {
			type: Number,
			default: () => 0,
		},
		height: {
			type: [String, Number],
			default: () => '100%',
		},
	},
	data() {
		return {
			dataActive: 0,
			children: [],
			childrenTops: [],
			scrollType: 'init',
			scrollTop: 0,
			_scrollTop: 0,
			_scrollTypeTimeout: null,
			_childrenTimeout: null,
			_setActiveTimeout: null,
			_setScrollTopTimeout: null,
		};
	},
	watch: {
		active: {
			handler(v) {
				this.dataActive = v;
			},
			immediate: true,
		},
		dataActive(v) {
			if (this.scrollType === 'scroll') return;
			const top = this.childrenTops[v];
			if (!isNum(top)) return;
			this.setScrollType('active');
			this.setScrollTopByIndex(v);
		},
		childrenTops() {
			this.scrollType = 'init';
			this.setScrollTopByIndex(this.dataActive);
		},
	},
	computed: {
		cmpRootStyle() {
			const style = { '--scroll-to-height': utils.rpx2px(this.height) };
			return style;
		},
	},
	methods: {
		updateChildren({ index, component }) {
			this.children[index] = component;
			this.getChildrenTops();
		},
		getChildrenTops() {
			clearTimeout(this._childrenTimeout);
			this._childrenTimeout = setTimeout(async () => {
				const view = await utils.querySelector('.ste-scroll-to-root', this);
				const box = await utils.querySelector('.ste-scroll-to-content', this);
				let max = box.height - view.height;
				if (max < 0) max = 0;
				const childrenTops = [];
				for (let i = 0; i < this.children.length; i++) {
					const comp = this.children[i];
					const child = await utils.querySelector('.ste-scroll-to-item-root', comp);
					const top = child.top - box.top;
					childrenTops.push(top > max ? max + 10 : top);
				}
				this.childrenTops = childrenTops;
			}, 500);
		},
		setScrollType(type) {
			this.scrollType = type;
			clearTimeout(this._scrollTypeTimeout);
			this._scrollTypeTimeout = setTimeout(() => {
				this.scrollType = 'init';
			}, 500);
		},
		setScrollTopByIndex(index) {
			console.log('setScrollTopByIndex:', index);
			clearTimeout(this._setScrollTopTimeout);
			this._setScrollTopTimeout = setTimeout(() => {
				const childrenTops = this.childrenTops;
				const top = childrenTops[index];
				if (!isNum(top)) return;
				const scrollTop = this._scrollTop;
				if (scrollTop >= top) {
					const next = childrenTops[index + 1];
					if (!isNum(next)) return;
					if (next > scrollTop + 10) return;
				}
				this.scrollTop = top;
				this._scrollTop = top;
			}, 50);
		},
		setActiveByTop(scrollTop) {
			console.log('setActiveByTop:', scrollTop);
			clearTimeout(this._setActiveTimeout);
			this._setActiveTimeout = setTimeout(() => {
				const childrenTops = this.childrenTops;
				for (let i = 0; i < childrenTops.length; i++) {
					const top = childrenTops[i];
					if (!isNum(top)) continue;
					const next = childrenTops[i + 1];
					if (!isNum(next) || next === top || (scrollTop >= top && next > scrollTop)) {
						if (this.dataActive === i) return;
						this.$emit('change', i);
						this.$emit('update:active', i);
						return;
					}
				}
			}, 25);
		},
		onScroll(e) {
			if (this.scrollType === 'active') return;
			this.setScrollType('scroll');
			const { scrollTop } = e.detail;
			this._scrollTop = scrollTop;
			this.setActiveByTop(scrollTop);
		},
		onScrolltolower(e) {},
	},
};
</script>

<style lang="scss" scoped>
.ste-scroll-to-root {
	width: 100%;
	height: var(--scroll-to-height);
}
</style>
