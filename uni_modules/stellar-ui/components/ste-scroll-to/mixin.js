import utils from '../../utils/utils.js';

function isNum(num) {
	return typeof num === 'number' && !isNaN(num);
}

export default {
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
				if (this.dataActive !== v) this.dataActive = v;
			},
			immediate: true,
		},
		dataActive(v) {
			if (!this.children.length) return;
			if (this.activeChange) this.activeChange(v);
			if (this.scrollType === 'scroll') return;
			const top = this.childrenTops[v];
			if (!isNum(top)) return;
			this.setScrollType('active');
			this.setScrollTopByIndex(v);
		},
		childrenTops() {
			if (!this.children.length) return;
			this.scrollType = 'init';
			this.setScrollTopByIndex(this.dataActive);
		},
	},
	computed: {
		cmpRootStyle() {
			const style = { '--scroll-to-height': utils.formatPx(this.height) };
			return style;
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
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
					childrenTops.push(top > max + 10 ? max + 10 : top);
				}
				let diff = this.childrenTops.length !== childrenTops.length;
				if (!diff) {
					for (let i = 0; i < childrenTops.length; i++) {
						if (childrenTops[i] !== this.childrenTops[i]) {
							diff = true;
							break;
						}
					}
				}
				if (diff) this.childrenTops = childrenTops;
			}, 50);
		},
		setScrollType(type) {
			this.scrollType = type;
			clearTimeout(this._scrollTypeTimeout);
			this._scrollTypeTimeout = setTimeout(() => {
				this.scrollType = 'init';
			}, 100);
		},
		setScrollTopByIndex(index) {
			clearTimeout(this._setScrollTopTimeout);
			this._setScrollTopTimeout = setTimeout(() => {
				if (!index) {
					this.scrollTop = 0;
					this._scrollTop = 0;
					return;
				}
				const childrenTops = this.childrenTops;
				const top = childrenTops[index];
				if (!isNum(top)) return;
				const scrollTop = this._scrollTop;
				if (scrollTop >= top) {
					const next = childrenTops[index + 1];
					if (!isNum(next)) return;
					if (next > scrollTop + 10) return;
				}
				this.scrollTop = top || 0;
				this._scrollTop = top || 0;
			}, 50);
		},
		setActive(index) {
			if (this.dataActive === index) return;
			this.dataActive = index;
			this.$emit('change', index);
			this.$emit('update:active', index);
		},
		setActiveByTop(scrollTop) {
			clearTimeout(this._setActiveTimeout);
			this._setActiveTimeout = setTimeout(() => {
				if (!scrollTop) {
					this.setActive(0);
					return;
				}
				const childrenTops = this.childrenTops;
				for (let i = 0; i < childrenTops.length; i++) {
					const top = childrenTops[i];
					if (!isNum(top)) continue;
					const next = childrenTops[i + 1];
					if (!isNum(next) || next === top || (scrollTop >= top && next > scrollTop)) {
						this.setActive(i);
						return;
					}
				}
			}, 20);
		},
		onScroll({ detail: { scrollTop } }) {
			this._scrollTop = scrollTop;
			if (this.scrollType === 'active') return;
			this.setScrollType('scroll');
			this.setActiveByTop(scrollTop);
		},
	},
};
