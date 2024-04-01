<template>
	<scroll-view
		class="ste-scroll-to--root"
		scroll-y
		scroll-anchoring
		scroll-with-animation
		:scroll-top="scrollTop"
		:style="[cmpRootStyle]"
		@scroll="onScroll"
	>
		<view class="ste-scroll-to-content">
			<slot />
		</view>
	</scroll-view>
</template>

<script>
import utils from '../../utils/utils.js';
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
			children: [],
			isActiveChange: false,
			isScroll: false,
			scrollTop: 0,
			_scrollTop: 0,
			_changeTimeout: null,
			_scrollTimeout: null,
			_activeChangeTimeout: null,
		};
	},
	mounted() {},
	watch: {
		active: {
			async handler(v) {
				if (this.isScroll) return;
				const childrenData = await this.getChildrenData();
				const item = childrenData[v];
				if (!item) return;
				const next = childrenData[v + 1];
				const scrollTop = this._scrollTop;
				if (scrollTop >= item.top) {
					if (!next) return;
					if (next.top > scrollTop + 10) return;
				}
				const animation = Math.abs(this.scrollTop - item.top);
				this.scrollTop = item.top;
				this._scrollTop = item.top;
				this.isActiveChange = true;
				clearTimeout(this._activeChangeTimeout);
				this._activeChangeTimeout = setTimeout(() => {
					this.isActiveChange = false;
				}, animation + 100);
			},
			immediate: true,
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
		},
		getChildrenData(start = 0, end = this.children.length) {
			return new Promise((resolve, reject) => {
				setTimeout(async () => {
					const box = await utils.querySelector('.ste-scroll-to-content', this);
					const childrenData = [];
					for (let i = start; i < end; i++) {
						const comp = this.children[i];
						const child = await utils.querySelector('.ste-scroll-to-item--root', comp);
						child.top -= box.top;
						childrenData.push(child);
					}
					resolve(childrenData);
				});
			});
		},
		onScroll({ detail: { scrollTop } }) {
			this._scrollTop = scrollTop;
			if (this.isActiveChange) return;
			this.isScroll = true;
			clearTimeout(this._changeTimeout);
			this._changeTimeout = setTimeout(async () => {
				const childrenData = await this.getChildrenData();
				for (let i = 0; i < childrenData.length; i++) {
					const item = childrenData[i];
					const next = childrenData[i + 1];
					if (!next || (scrollTop >= item.top && next.top > scrollTop)) {
						if (this.active === i) break;
						this.$emit('change', i);
						this.$emit('update:active', i);
						break;
					}
				}
				clearTimeout(this._scrollTimeout);
				this._scrollTimeout = setTimeout(() => {
					this.isScroll = false;
				}, 100);
			}, 25);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-scroll-to--root {
	width: 100%;
	height: var(--scroll-to-height);
}
</style>
