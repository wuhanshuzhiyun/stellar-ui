<template>
	<view
		class="ste-drag-root"
		:id="cmpRootId"
		@touchstart="touchStart"
		@touchmove.stop.prevent="touchMove"
		@touchend="touchEnd"
		@mousedown="mouseDown"
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
const DEFAULT_BOUNDARY = { top: 0, left: 0, right: 0, bottom: 0 };
/**
 * ste-drag 拖拽
 * @description 拖拽
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-drag
 * @property {String} attract 是否开启自动吸边（根据 screenWidth 进行吸边）默认 false
 * @property {String} direction 拖拽元素的拖拽方向限制 默认 all
 * @value all 不限制方向 {String}
 * @value x 横向拖拽 {String}
 * @value y 竖向多拽 {String}
 * @property {Object} boundary 拖拽元素的拖拽边界 默认屏幕为边界
 * @event {Function} start 开始拖动时触发
 * @event {Function} end 结束拖动时触发
 **/
export default {
	group: '基础组件',
	title: 'Drag 拖拽',
	name: 'ste-drag',
	props: {
		attract: {
			type: [Boolean, null],
			default: false,
		},
		direction: {
			type: [String, null],
			default: 'all',
		},
		boundary: {
			type: [Object, null],
			default: () => DEFAULT_BOUNDARY,
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
			isMove: false,
			boundaryData: this.boundary,
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

			setTimeout(() => {
				this.touchEnd();
			}, 200);
		});
	},
	watch: {
		boundary: {
			handler(val) {
				this.boundaryData = { ...DEFAULT_BOUNDARY, ...val };
			},
			immediate: true,
		},
	},
	methods: {
		mouseDown(e) {
			// #ifdef WEB
			this.touchStart(e);
			window.addEventListener('mousemove', this.touchMove);
			window.addEventListener('mouseup', this.touchEnd);
			// #endif
		},
		removeListenner() {
			// #ifdef WEB
			window.removeEventListener('mousemove', this.touchMove);
			window.removeEventListener('mouseup', this.touchEnd);
			// #endif
		},
		touchStart(e) {
			this.isMove = true;
			this.$emit('start');
			const touch = this.getMoveObj(e);
			this.start = { x: touch.pageX, y: touch.pageY };
			this.preTranslate = this.translate;
		},
		touchMove(e) {
			e.preventDefault();

			const touch = this.getMoveObj(e);
			let x = this.preTranslate.x + (touch.pageX - this.start.x);
			let xLeft = x + this.initLeft;
			let y = this.preTranslate.y + (touch.pageY - this.start.y);
			let yTop = y + this.initTop;

			if (xLeft <= this.boundaryData.left) {
				x = this.boundaryData.left - this.initLeft;
			}

			if (xLeft >= SCREEN_WIDTH - (this.boundaryData.right + this.elWidth)) {
				x = SCREEN_WIDTH - (this.boundaryData.right + this.elWidth) - this.initLeft;
			}

			if (yTop <= this.boundaryData.top) {
				y = this.boundaryData.top - this.initTop;
			}

			if (yTop >= SCREEN_HEIGHT - (this.boundaryData.bottom + this.elHeight)) {
				y = SCREEN_HEIGHT - (this.boundaryData.bottom + this.elHeight) - this.initTop;
			}

			this.translate = {
				x: this.direction == 'all' || this.direction == 'x' ? x : this.preTranslate.x,
				y: this.direction == 'all' || this.direction == 'y' ? y : this.preTranslate.y,
			};
		},
		touchEnd(e) {
			this.removeListenner && this.removeListenner();
			if (this.isMove) {
				this.$emit('end');
				this.isMove = false;
			}
			// 是否执行贴边
			if (!this.attract) {
				return;
			}

			let { x: moveLeft, y: moveTop } = this.translate;
			const screenCenterX = (SCREEN_WIDTH - this.boundaryData.right - this.boundaryData.left) / 2;
			const centerX = screenCenterX - this.initLeft - this.elWidth / 2;
			if (moveLeft < centerX) {
				moveLeft = this.boundaryData.left - this.initLeft;
			} else {
				moveLeft = SCREEN_WIDTH - this.elWidth - this.boundaryData.right - this.initLeft;
			}
			this.translate = { ...this.translate, x: moveLeft };

			// 竖向吸边
			// if (this.attractDirection == 'y') {
			// 	const screenCenterY = (SCREEN_HEIGHT - this.boundaryData.top - this.boundaryData.bottom) / 2;
			// 	const centerY = screenCenterY - this.initTop - this.elHeight / 2;
			// 	if (moveTop < centerY) {
			// 		moveTop = this.boundaryData.top - this.initTop;
			// 	} else {
			// 		moveTop = SCREEN_HEIGHT - this.elHeight - this.boundaryData.bottom - this.initTop;
			// 	}
			// 	this.translate = { ...this.translate, y: moveTop };
			// } else {

			// }

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
