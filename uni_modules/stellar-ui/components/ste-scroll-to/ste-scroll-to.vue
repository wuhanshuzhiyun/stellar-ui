<template>
	<scroll-view
		class="ste-scroll-to--root"
		scroll-y
		scroll-anchoring
		scroll-with-animation
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
			childrenData: [],
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
				console.log(v, this.isScroll);
				if (this.isScroll) return;
				const childrenData = await this.getChildrenData();
				const item = childrenData[v];
				if (!item) return;
				const next = childrenData[v + 1];
				const scrollTop = this._scrollTop;
				console.log('????????????????????', scrollTop, item);
				if (scrollTop >= item.top) {
					if (!next) return;
					if (next.top > scrollTop + 10) return;
				}
				this.isActiveChange = true;
				const animation = Math.abs(this.scrollTop - item.top);
				clearTimeout(this._activeChangeTimeout);
				this._activeChangeTimeout = setTimeout(() => {
					this.isActiveChange = false;
				}, animation + 100);

				this.scrollTop = item.top;
				this._scrollTop = item.top;
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
		getChildrenData() {
			return new Promise((resolve, reject) => {
				if (this.childrenData.length) {
					resolve(this.childrenData);
					return;
				}
				setTimeout(async () => {
					const box = await utils.querySelector('.ste-scroll-to-content', this);
					const childrenData = [];
					for (let i = 0; i < this.children.length; i++) {
						const comp = this.children[i];
						const child = await utils.querySelector('.ste-scroll-to-item--root', comp);
						child.top -= box.top;
						childrenData.push(child);
					}
					this.childrenData = childrenData;
					resolve(childrenData);
				});
			});
		},
		onScroll({ detail: { scrollTop } }) {
			this._scrollTop = scrollTop;
			console.log(this.isActiveChange, scrollTop);
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
				}, 80);
			}, 25);
		},
		onScrolltolower() {
			setTimeout(() => {
				this.isActiveChange = false;
				this.isScroll = false;
			}, 1000);
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
