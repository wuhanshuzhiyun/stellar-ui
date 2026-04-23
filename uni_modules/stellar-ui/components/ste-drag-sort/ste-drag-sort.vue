<template>
	<view class="ste-drag-sort-root" :class="[rootClass, { 'ste-drag-sort-root-dragging': dragging }]"
		data-test="drag-sort">
		<view v-for="(current, index) in list" :key="current.uid" class="ste-drag-sort-item"
			:class="{
				'ste-drag-sort-item-disabled': disabled || !!(list[index] && list[index].raw && list[index].raw.disabled),
				'ste-drag-sort-item-ready': dragging && dragIndex === index && !sortingStarted,
				'ste-drag-sort-item-dragging': dragging && dragIndex === index,
				'ste-drag-sort-item-animating': dragging && dragIndex !== index
			}" :style="itemStyles[index]"
			@touchstart="onTouchStart($event, index, 'touch')" @longpress="onTouchStart($event, index, 'longpress')"
			@touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd"
			@mousedown.prevent="mouseDown($event, index)">
			<slot name="item" :item="current.raw" :index="index" :dragging="dragging" :dragIndex="dragIndex"
				:insertIndex="insertIndex"></slot>
		</view>
	</view>
</template>

<script>
	import utils from '../../utils/utils.js';

	/**
	 * ste-drag-sort 拖拽排序
	 * @description 支持纵向列表和网格的拖拽排序组件，支持长按触发和直接拖拽两种模式
	 * @property {Array} value 拖拽数据列表，支持 v-model 双向绑定
	 * @property {Boolean} disabled 是否禁用拖拽功能，默认 false
	 * @property {Number} columns 列数，1 为纵向列表，大于 1 为网格排序，默认 1
	 * @property {Boolean} longPress 拖拽启动方式，true 为长按后开始拖拽，false 为按下立即拖拽，默认 true
	 * @event {Function} start 开始拖拽时触发，参数：index（当前拖拽项索引）
	 * @event {Function} change 排序结果发生变化时触发，参数：list（最新排序结果）
	 * @event {Function} end 拖拽结束时触发，参数：index（最终落点索引）
	 */
	export default {
		name: 'ste-drag-sort',
		group: '基础组件',
		title: 'DragSort 拖拽排序',
		props: {
			value: {
				type: Array,
				default: () => [],
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			columns: {
				type: Number,
				default: 1,
			},
			longPress: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {
				list: [],
				dragging: false,
				dragIndex: -1,
				insertIndex: -1,
				startX: 0,
				startY: 0,
				offsetX: 0,
				offsetY: 0,
				itemPositions: [],
				itemWidth: 0,
				itemHeight: 0,
				sortingStarted: false,
				dragSessionId: 0,
				// mouse 相关
				mouseLongPressTimer: null,
				mousePressing: false,
				mousePendingIndex: -1,
				mousePendingX: 0,
				mousePendingY: 0,
			};
		},
		computed: {
			cmpColumns() {
				const value = Math.floor(Number(this.columns) || 1);
				return value > 0 ? value : 1;
			},
			rootClass() {
				return {
					'ste-drag-sort-columns': this.cmpColumns > 1,
				};
			},
			itemStyles() {
				return this.list.map((_, index) => {
					const style = {};

					if (this.cmpColumns > 1) {
						const width = (100 / this.cmpColumns).toFixed(6) + '%';
						style.flexBasis = width;
						style.width = width;
						style.boxSizing = 'border-box';
					}

					if (!this.dragging) return style;

					if (index === this.dragIndex) {
						const dragScale = this.sortingStarted ? 1.03 : 1.02;
						style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) scale(${dragScale})`;
						style.zIndex = 100;
						return style;
					}

					const offset = this.getItemTranslateOffset(index);
					if (offset.x || offset.y) {
						style.transform = `translate(${offset.x}px, ${offset.y}px)`;
					}

					return style;
				});
			},
		},
		watch: {
			value: {
				handler(val) {
					this.syncList(val || []);
				},
				immediate: true,
				deep: true,
			},
		},
		beforeDestroy() {
			this.clearMouseLongPress();
			this.removeMouseListeners();
		},
		methods: {
			// ---- 触摸事件兼容 ----
			getTouchX(touch) {
				if (!touch) return 0;
				// #ifdef APP
				if (typeof touch.x === 'number') return touch.x;
				// #endif
				if (typeof touch.pageX === 'number') return touch.pageX;
				if (typeof touch.clientX === 'number') return touch.clientX;
				if (typeof touch.x === 'number') return touch.x;
				return 0;
			},
			getTouchY(touch) {
				if (!touch) return 0;
				// #ifdef APP
				if (typeof touch.y === 'number') return touch.y;
				// #endif
				if (typeof touch.pageY === 'number') return touch.pageY;
				if (typeof touch.clientY === 'number') return touch.clientY;
				if (typeof touch.y === 'number') return touch.y;
				return 0;
			},
			toTouchArray(touches) {
				if (!touches) return [];
				// 处理微信小程序的触摸事件对象
				if (Array.isArray(touches)) {
					return touches.filter(Boolean);
				} else if (touches && typeof touches === 'object') {
					if (touches.length !== undefined) {
						// 类似数组的对象
						const result = [];
						for (let i = 0; i < touches.length; i++) {
							if (touches[i]) {
								result.push(touches[i]);
							}
						}
						return result;
					} else {
						// 其他对象结构
						return Object.keys(touches)
							.filter(k => !isNaN(Number(k)))
							.map(k => touches[k])
							.filter(Boolean);
					}
				}
				return [];
			},
			// ---- uid 池管理 ----
			getUidPools(items) {
				const pools = new Map();
				items.forEach((item) => {
					const pool = pools.get(item.raw) || [];
					pool.push(item.uid);
					pools.set(item.raw, pool);
				});
				return pools;
			},
			syncList(value) {
				const pools = this.getUidPools(this.list);
				this.list = (value || []).map((item) => {
					const pool = pools.get(item);
					const uid = (pool && pool.shift()) || utils.guid(12);
					return {
						uid,
						raw: item
					};
				});
			},

			// ---- 状态重置 ----
			resetDragState() {
				this.dragSessionId += 1;
				this.dragging = false;
				this.dragIndex = -1;
				this.insertIndex = -1;
				this.startX = 0;
				this.startY = 0;
				this.offsetX = 0;
				this.offsetY = 0;
				this.itemPositions = [];
				this.itemWidth = 0;
				this.itemHeight = 0;
				this.sortingStarted = false;
			},

			// ---- 鼠标长按相关 ----
			clearMouseLongPress() {
				if (this.mouseLongPressTimer) {
					clearTimeout(this.mouseLongPressTimer);
					this.mouseLongPressTimer = null;
				}
				this.mousePressing = false;
				this.mousePendingIndex = -1;
				this.mousePendingX = 0;
				this.mousePendingY = 0;
			},
			removeMouseListeners() {
				// #ifdef WEB
				if (typeof window === 'undefined') return;
				window.removeEventListener('mousemove', this._onMouseMove);
				window.removeEventListener('mouseup', this._onMouseUp);
				// #endif
			},

			// ---- 禁用判断 ----
			getItemDisabled(index) {
				return !!(this.list[index] && this.list[index].raw && this.list[index].raw.disabled);
			},
			getEnabledIndices() {
				return this.list.reduce((indices, item, index) => {
					if (!item.raw || !item.raw.disabled) {
						indices.push(index);
					}
					return indices;
				}, []);
			},

			// ---- 重排预览 ----
			getReorderPreview(dragIdx, targetIdx) {
				const enabledIndices = this.getEnabledIndices();
				const dragEnabledIndex = enabledIndices.indexOf(dragIdx);
				const targetEnabledIndex = enabledIndices.indexOf(targetIdx);

				if (dragEnabledIndex < 0 || targetEnabledIndex < 0) return null;

				const nextEnabledSourceIndices = enabledIndices.slice();
				const spliced = nextEnabledSourceIndices.splice(dragEnabledIndex, 1);
				nextEnabledSourceIndices.splice(targetEnabledIndex, 0, spliced[0]);

				const finalIndexMap = new Map();
				this.list.forEach((_, index) => finalIndexMap.set(index, index));
				enabledIndices.forEach((slotIndex, orderIndex) => {
					finalIndexMap.set(nextEnabledSourceIndices[orderIndex], slotIndex);
				});

				return {
					enabledIndices,
					nextEnabledSourceIndices,
					finalIndexMap
				};
			},

			// ---- 位置测量 ----
			measureItemPositions() {
				return new Promise((resolve) => {
					// 直接使用 setTimeout 确保在 DOM 更新后再测量
					setTimeout(() => {
						utils.querySelector('.ste-drag-sort-root', this).then((rootRect) => {
							utils.querySelector('.ste-drag-sort-item', this, true).then((rects) => {
								let items = [];
								// 处理不同端的返回值结构
								if (Array.isArray(rects)) {
									items = rects;
								} else if (rects && typeof rects === 'object') {
									// 微信小程序可能返回的是一个对象
									if (rects.length !== undefined) {
										// 类似数组的对象
										for (let i = 0; i < rects.length; i++) {
											if (rects[i]) {
												items.push(rects[i]);
											}
										}
									} else {
										// 其他对象结构
										Object.keys(rects).forEach(key => {
											if (!isNaN(Number(key)) && rects[key]) {
												items.push(rects[key]);
											}
										});
									}
								}
								
								// 确保 items 数组按顺序排列
								items.sort((a, b) => {
									if (a && b) {
										return (a.top || 0) - (b.top || 0) || (a.left || 0) - (b.left || 0);
									}
									return 0;
								});
								
								this.itemWidth = this.cmpColumns > 1 ? (rootRect ? rootRect.width :
									0) / this.cmpColumns : (items[0] ? items[0].width : 0);
								this.itemHeight = items[0] ? items[0].height : 0;
								this.itemPositions = items.map((rect) => ({
									top: rect.top || 0,
									left: rect.left || 0,
									width: rect.width || this.itemWidth,
									height: rect.height || this.itemHeight,
								}));
								resolve();
							});
						});
					}, 50);
				});
			},

			// ---- 插入位置计算 ----
			calculateGridInsertIndex(centerX, centerY) {
				if (!this.itemPositions.length) return this.dragIndex;
				let closestIndex = this.dragIndex;
				let minDistance = Infinity;
				this.itemPositions.forEach((position, index) => {
					if (this.getItemDisabled(index)) return;
					const itemCenterX = position.left + position.width / 2;
					const itemCenterY = position.top + position.height / 2;
					const distance = Math.sqrt(Math.pow(centerX - itemCenterX, 2) + Math.pow(centerY - itemCenterY,
						2));
					if (distance < minDistance) {
						minDistance = distance;
						closestIndex = index;
					}
				});
				return closestIndex;
			},
			calculateSingleColumnInsertIndex(centerY) {
				let closestIndex = this.dragIndex;
				let minDistance = Infinity;
				this.itemPositions.forEach((position, index) => {
					if (this.getItemDisabled(index)) return;
					const itemCenterY = position.top + position.height / 2;
					const distance = Math.abs(centerY - itemCenterY);
					if (distance < minDistance) {
						minDistance = distance;
						closestIndex = index;
					}
				});
				return closestIndex;
			},
			calculateInsertIndex() {
				if (!this.itemPositions.length || this.dragIndex < 0) return this.dragIndex;
				const dragPosition = this.itemPositions[this.dragIndex];
				const centerX = dragPosition.left + dragPosition.width / 2 + this.offsetX;
				const centerY = dragPosition.top + dragPosition.height / 2 + this.offsetY;
				if (this.cmpColumns > 1) {
					return this.calculateGridInsertIndex(centerX, centerY);
				}
				return this.calculateSingleColumnInsertIndex(centerY);
			},

			// ---- 样式计算 ----
			getItemTranslateOffset(index) {
				if (!this.dragging || !this.sortingStarted) return {
					x: 0,
					y: 0
				};
				if (this.getItemDisabled(index)) return {
					x: 0,
					y: 0
				};
				if (index === this.dragIndex || this.dragIndex === this.insertIndex) return {
					x: 0,
					y: 0
				};

				const reorderPreview = this.getReorderPreview(this.dragIndex, this.insertIndex);
				const nextIndex = reorderPreview && reorderPreview.finalIndexMap.get(index);

				if (typeof nextIndex !== 'number' || nextIndex === index) return {
					x: 0,
					y: 0
				};

				if (this.cmpColumns > 1) {
					const cols = this.cmpColumns;
					const currentRow = Math.floor(index / cols);
					const currentCol = index % cols;
					const nextRow = Math.floor(nextIndex / cols);
					const nextCol = nextIndex % cols;
					return {
						x: (nextCol - currentCol) * this.itemWidth,
						y: (nextRow - currentRow) * this.itemHeight,
					};
				}

				return {
					x: 0,
					y: (nextIndex - index) * this.itemHeight
				};
			},
			getItemStyle(index) {
				const style = {};

				if (this.cmpColumns > 1) {
					const width = (100 / this.cmpColumns).toFixed(6) + '%';
					style.flexBasis = width;
					style.width = width;
					style.boxSizing = 'border-box';
				}

				if (!this.dragging) return style;

				if (index === this.dragIndex) {
					const dragScale = this.sortingStarted ? 1.03 : 1.02;
					style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) scale(${dragScale})`;
					style.zIndex = 100;
					return style;
				}

				const offset = this.getItemTranslateOffset(index);
				if (offset.x || offset.y) {
					style.transform = `translate(${offset.x}px, ${offset.y}px)`;
				}

				return style;
			},
			getItemClass(index) {
				return {
					'ste-drag-sort-item-disabled': this.disabled || !!(this.list[index] && this.list[index].raw && this
						.list[index].raw.disabled),
					'ste-drag-sort-item-ready': this.dragging && this.dragIndex === index && !this.sortingStarted,
					'ste-drag-sort-item-dragging': this.dragging && this.dragIndex === index,
					'ste-drag-sort-item-animating': this.dragging && this.dragIndex !== index,
				};
			},

			// ---- 触觉反馈 ----
			triggerReadyHaptic() {
				if (!this.longPress) return;
				try {
					if (typeof uni === 'undefined' || typeof uni.vibrateShort !== 'function') return;
					uni.vibrateShort({
						type: 'light',
						fail: () => {}
					});
				} catch (e) {
					// 忽略不支持的平台
				}
			},

			// ---- 是否移动到其他元素 ----
			checkMovedToOtherElement() {
				if (!this.itemPositions.length || this.dragIndex < 0) return false;
				const dragPosition = this.itemPositions[this.dragIndex];
				const centerX = dragPosition.left + dragPosition.width / 2 + this.offsetX;
				const centerY = dragPosition.top + dragPosition.height / 2 + this.offsetY;

				if (this.cmpColumns > 1) {
					return this.itemPositions.some((position, index) => {
						if (index === this.dragIndex) return false;
						return centerX >= position.left && centerX <= position.left + position.width && centerY >=
							position.top && centerY <= position.top + position.height;
					});
				}

				if (this.dragIndex > 0) {
					const prev = this.itemPositions[this.dragIndex - 1];
					if (prev && centerY <= prev.top + prev.height / 2) return true;
				}
				if (this.dragIndex < this.itemPositions.length - 1) {
					const next = this.itemPositions[this.dragIndex + 1];
					if (next && centerY >= next.top + next.height / 2) return true;
				}
				return false;
			},

			// ---- 拖拽核心流程 ----
			startDrag(index, clientX, clientY) {
				if (this.disabled) return Promise.resolve(false);
				if (this.dragging) return Promise.resolve(false);
				if (index < 0 || index >= this.list.length) return Promise.resolve(false);
				if (this.getItemDisabled(index)) return Promise.resolve(false);

				const sessionId = ++this.dragSessionId;
				this.dragging = true;
				this.dragIndex = index;
				this.insertIndex = index;
				this.startX = clientX;
				this.startY = clientY;
				this.offsetX = 0;
				this.offsetY = 0;
				this.sortingStarted = false;

				this.triggerReadyHaptic();
				this.$emit('start', index);

				return this.measureItemPositions().then(() => {
					return this.dragging && this.dragSessionId === sessionId && this.dragIndex === index;
				});
			},
			moveDrag(clientX, clientY) {
				if (!this.dragging) return;
				this.offsetX = clientX - this.startX;
				this.offsetY = clientY - this.startY;

				// 只要有一定的偏移就认为开始排序，确保能够触发过渡效果
				if (!this.sortingStarted && (Math.abs(this.offsetX) > 5 || Math.abs(this.offsetY) > 5)) {
					this.sortingStarted = true;
				}
				if (this.sortingStarted) {
					this.insertIndex = this.calculateInsertIndex();
				}
			},
			finishDrag() {
				if (!this.dragging) return;

				const oldIndex = this.dragIndex;
				const targetInsert = this.insertIndex >= 0 ? this.insertIndex : oldIndex;
				const reorderPreview = this.getReorderPreview(oldIndex, targetInsert);
				const newIndex = (reorderPreview && reorderPreview.finalIndexMap.get(oldIndex)) !== undefined ?
					reorderPreview.finalIndexMap.get(oldIndex) : oldIndex;

				if (oldIndex !== newIndex && oldIndex >= 0) {
					const nextList = new Array(this.list.length);

					this.list.forEach((item, index) => {
						if (this.getItemDisabled(index)) {
							nextList[index] = item;
						}
					});

					reorderPreview.enabledIndices.forEach((slotIndex, orderIndex) => {
						nextList[slotIndex] = this.list[reorderPreview.nextEnabledSourceIndices[orderIndex]];
					});

					this.list = nextList;

					const result = nextList.map((item) => item.raw);
					this.$emit('input', result);
					this.$emit('change', result);
				}

				this.resetDragState();
				this.$emit('end', newIndex);
			},

			// ---- Touch 事件 ----
			onTouchStart(event, index, type) {
				if (type === 'longpress' && !this.longPress) return;
				if (type === 'touch' && this.longPress) return;

				const touch = this.getFirstTouch(event);
				if (!touch) return;

				this.startDrag(index, this.getTouchX(touch), this.getTouchY(touch)).then((started) => {
					if (!started) return;
					event.stopPropagation && event.stopPropagation();
					// 在小程序端，需要谨慎使用 preventDefault
					// #ifdef APP || H5
					event.preventDefault && event.preventDefault();
					// #endif
				});
			},
			onTouchMove(event) {
				if (!this.dragging) return;
				const touch = this.getFirstTouch(event);
				if (!touch) return;
				this.moveDrag(this.getTouchX(touch), this.getTouchY(touch));
				// 在小程序端，需要谨慎使用 preventDefault
				// #ifdef APP || H5
				event.preventDefault && event.preventDefault();
				// #endif
			},
			onTouchEnd() {
				this.finishDrag();
			},
			getFirstTouch(event) {
				const touches = this.toTouchArray(event.touches);
				if (touches.length > 0) return touches[0];
				const changedTouches = this.toTouchArray(event.changedTouches);
				if (changedTouches.length > 0) return changedTouches[0];
				return null;
			},

			// ---- Mouse 事件（H5/PC） ----
			mouseDown(event, index) {
				// #ifdef WEB
				if (typeof window === 'undefined') return;
				if (this.disabled || this.getItemDisabled(index)) return;

				this.mousePressing = true;
				this.mousePendingIndex = index;
				this.mousePendingX = event.clientX;
				this.mousePendingY = event.clientY;

				// 绑定到实例方法，方便移除
				this._onMouseMove = this._onMouseMove || ((e) => this.onMouseMove(e));
				this._onMouseUp = this._onMouseUp || (() => this.onMouseUp());

				window.addEventListener('mousemove', this._onMouseMove);
				window.addEventListener('mouseup', this._onMouseUp);

				if (!this.longPress) {
					this.startDrag(index, event.clientX, event.clientY);
					return;
				}

				this.mouseLongPressTimer = setTimeout(() => {
					if (!this.mousePressing || this.mousePendingIndex < 0) return;
					this.startDrag(this.mousePendingIndex, this.mousePendingX, this.mousePendingY);
				}, 350);
				// #endif
			},
			onMouseMove(event) {
				if (this.dragging) {
					this.moveDrag(event.clientX, event.clientY);
					event.preventDefault && event.preventDefault();
					return;
				}
				if (!this.mousePressing || !this.mouseLongPressTimer) return;
				const deltaX = Math.abs(event.clientX - this.mousePendingX);
				const deltaY = Math.abs(event.clientY - this.mousePendingY);
				if (deltaX > 5 || deltaY > 5) {
					this.clearMouseLongPress();
					this.removeMouseListeners();
				}
			},
			onMouseUp() {
				if (this.dragging) {
					this.finishDrag();
				}
				this.clearMouseLongPress();
				this.removeMouseListeners();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.ste-drag-sort-root {
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: visible;
		user-select: none;
		width: 100%;

		&.ste-drag-sort-columns {
			flex-direction: row;
			flex-wrap: wrap;
			box-sizing: border-box;
		}

		&.ste-drag-sort-root-dragging {
			touch-action: none;
		}
	}

	.ste-drag-sort-item {
		position: relative;
		z-index: 10;
		transition: opacity 0.12s ease, transform 0.2s ease;

		&.ste-drag-sort-item-dragging {
			opacity: 0.95;
			z-index: 20;
		}

		&.ste-drag-sort-item-ready {
			opacity: 0.98;
		}

		&.ste-drag-sort-item-disabled {
			opacity: 0.6;
		}

		&.ste-drag-sort-item-animating {
			transition: transform 0.2s ease;
		}
	}
</style>