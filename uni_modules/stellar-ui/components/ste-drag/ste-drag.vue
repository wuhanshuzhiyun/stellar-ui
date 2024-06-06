<template>
	<view
		class="ste-drag-root"
		:id="cmpRootId"
		@touchstart="touchStart"
		@touchmove.stop.prevent="touchMove"
		@touchend="touchEnd"
		@mousedown="mouseDown"
		@mousemove="mouseMove"
		@mouseup="mouseUp"
		:style="{
			translate: translate.x + 'px ' + translate.y + 'px',
			transition: attractTransition ? 'all ease 0.3s' : 'none',
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
const SCREEN_WIDTH = utils.System.getWindowWidth();
const SCREEN_HEIGHT = utils.System.getWindowHeight();
export default {
	group: '基础组件',
	title: 'Drag 拖拽',
	name: 'ste-drag',
	props: {
		attract: {
			type: Boolean,
			default: false,
		},
		attractDirection: {
			type: String,
			default: 'x',
		},
		direction: {
			type: String,
			default: 'all',
		},
		boundary: {
			type: Object,
			default: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
		},
	},
	data() {
		return {
			// 触摸开始位置
			start: {
				x: 0,
				y: 0,
			},
			translate: { x: 0, y: 0 },
			preTranslate: { x: 0, y: 0 },
			attractTransition: false, // 标识是否贴边动画
			initTop: 0,
			initLeft: 0,
			elWidth: 0,
			elHeight: 0,
			canMove: false,
		};
	},
	computed: {
		cmpRootId() {
			return `ste-drag-${utils.guid()}`;
		},
	},
	mounted() {
		utils.querySelector('#' + this.cmpRootId, this).then((rec) => {
			this.elWidth = rec.width;
			this.elHeight = rec.height;
			this.initTop = rec.top;
			this.initLeft = rec.left;
		});
	},
	methods: {
		// #ifdef WEB
		mouseDown(e) {
			this.touchStart(e);
			window.addEventListener('mousemove', this.touchMove);
			window.addEventListener('mouseup', this.touchEnd);
		},
		mouseMove() {},
		mouseUp() {},
		removeListenner() {
			window.removeEventListener('mousemove', this.touchMove);
			window.removeEventListener('mouseup', this.touchEnd);
		},
		// #endif
		touchStart(e) {
			console.log('touchStart');
			const touch = this.getMoveObj(e);
			this.start = { x: touch.pageX, y: touch.pageY };
			this.preTranslate = this.translate;
		},
		touchMove(e) {
			console.log('touchMove');
			e.preventDefault();

			const touch = this.getMoveObj(e);
			let x = this.preTranslate.x + (touch.pageX - this.start.x);
			let xLeft = x + this.initLeft;
			let y = this.preTranslate.y + (touch.pageY - this.start.y);
			let yTop = y + this.initTop;

			if (xLeft <= this.boundary.left) {
				x = this.boundary.left - this.initLeft;
			}

			if (xLeft >= SCREEN_WIDTH - (this.boundary.right + this.elWidth)) {
				x = SCREEN_WIDTH - (this.boundary.right + this.elWidth) - this.initLeft;
			}

			if (yTop <= this.boundary.top) {
				y = this.boundary.top - this.initTop;
			}

			if (yTop >= SCREEN_HEIGHT - (this.boundary.bottom + this.elHeight)) {
				y = SCREEN_HEIGHT - (this.boundary.bottom + this.elHeight) - this.initTop;
			}

			this.translate = {
				x: this.direction == 'all' || this.direction == 'x' ? x : this.preTranslate.x,
				y: this.direction == 'all' || this.direction == 'y' ? y : this.preTranslate.y,
			};
		},
		touchEnd(e) {
			console.log('touchEnd');
			this.removeListenner && this.removeListenner();
			// 是否执行贴边
			if (!this.attract) {
				return;
			}

			let { x: moveLeft, y: moveTop } = this.translate;
			if (this.attractDirection == 'y') {
				const screenCenterY = (SCREEN_HEIGHT - this.boundary.top - this.boundary.bottom) / 2;
				const centerY = screenCenterY - this.initTop - this.elHeight / 2;
				if (moveTop < centerY) {
					moveTop = this.boundary.top - this.initTop;
				} else {
					moveTop = SCREEN_HEIGHT - this.elHeight - this.boundary.bottom - this.initTop;
				}
				this.translate = { ...this.translate, y: moveTop };
			} else {
				const screenCenterX = (SCREEN_WIDTH - this.boundary.right - this.boundary.left) / 2;
				const centerX = screenCenterX - this.initLeft - this.elWidth / 2;
				if (moveLeft < centerX) {
					moveLeft = this.boundary.left - this.initLeft;
				} else {
					moveLeft = SCREEN_WIDTH - this.elWidth - this.boundary.right - this.initLeft;
				}
				this.translate = { ...this.translate, x: moveLeft };
			}

			this.attractTransition = true;
			setTimeout(() => {
				this.attractTransition = false;
			}, 400);
		},
		getMoveObj(e) {
			if (e.touches?.length > 0) {
				// 移动端touch事件
				return { pageX: e.touches[0].pageX, pageY: e.touches[0].pageY };
			} else {
				// web端鼠标移动事件
				return { pageX: e.pageX, pageY: e.pageY };
			}
		},
	},
};
</script>

<style>
.ste-drag-root {
	display: inline-flex;
}
</style>
