<template>
	<view class="ste-drag-sort-root"
		:class="{ 'ste-drag-sort-root-dragging': dragging ,'ste-drag-sort-columns': cmpColumns > 1}"
		data-test="drag-sort">
		<view v-for="(current, index) in list" :key="current.uid" class="ste-drag-sort-item" :class="{
				'ste-drag-sort-item-disabled': disabled || !!(list[index] && list[index].raw && list[index].raw.disabled),
				'ste-drag-sort-item-ready': dragging && dragIndex === index && !sortingStarted,
				'ste-drag-sort-item-dragging': dragging && dragIndex === index,
				'ste-drag-sort-item-animating': dragging && dragIndex !== index
			}" :style="[itemStyles[index]]" @touchstart="onTouchStart($event, index, 'touch')"
			@longpress="onTouchStart($event, index, 'longpress')" @touchmove="onTouchMove" @touchend="onTouchEnd"
			@touchcancel="onTouchEnd" @mousedown.prevent="mouseDown($event, index)">
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
				/**
				 * 所有下标对应的位置信息
				 * 格式：{ [index: string]: { top: number, left: number, right: number, bottom: number } }
				 * 在长按/触摸触发拖拽前计算，用于 hit-test 判断手指进入哪个元素
				 */
				itemRects: {},
				// 兼容旧逻辑保留，存储宽高用于样式偏移计算
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

			itemStyles() {
				// 强制追踪 sortingStarted，确保所有元素在 sortingStarted 变化时重新计算
				const sortingStarted = this.sortingStarted;

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
						const dragScale = sortingStarted ? 1.03 : 1.02;
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
			this.enablePageScroll();
		},
		methods: {
			// ---- 触摸事件兼容 ----
			// 注意：rect.boundingClientRect 是视口坐标（clientX/clientY）
			// hit-test 用 rect 边界做命中检测，此处优先取 clientX/clientY 与之对齐
			getTouchX(touch) {
				if (!touch) return 0;
				if (typeof touch.clientX === 'number') return touch.clientX;
				if (typeof touch.pageX === 'number') return touch.pageX;
				if (typeof touch.x === 'number') return touch.x;
				return 0;
			},
			getTouchY(touch) {
				if (!touch) return 0;
				if (typeof touch.clientY === 'number') return touch.clientY;
				if (typeof touch.pageY === 'number') return touch.pageY;
				if (typeof touch.y === 'number') return touch.y;
				return 0;
			},
			toTouchArray(touches) {
				if (!touches) return [];
				if (Array.isArray(touches)) {
					return touches.filter(Boolean);
				} else if (touches && typeof touches === 'object') {
					if (touches.length !== undefined) {
						const result = [];
						for (let i = 0; i < touches.length; i++) {
							if (touches[i]) {
								result.push(touches[i]);
							}
						}
						return result;
					} else {
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
				this.itemRects = {};
				this.itemPositions = [];
				this.itemWidth = 0;
				this.itemHeight = 0;
				this.sortingStarted = false;
			},

			// ---- 禁用/恢复页面滚动 ----
			disablePageScroll() {
				try {
					// #ifdef MP-WEIXIN
					wx.setPageScrollEnabled && wx.setPageScrollEnabled({ enabled: false });
					// #endif
					// #ifdef WEB
					if (typeof document !== 'undefined') {
						document.body.style.overflow = 'hidden';
						document.documentElement.style.overflow = 'hidden';
					}
					// #endif
				} catch (e) {
					// 忽略不支持的平台
				}
			},
			enablePageScroll() {
				try {
					// #ifdef MP-WEIXIN
					wx.setPageScrollEnabled && wx.setPageScrollEnabled({ enabled: true });
					// #endif
					// #ifdef WEB
					if (typeof document !== 'undefined') {
						document.body.style.overflow = '';
						document.documentElement.style.overflow = '';
					}
					// #endif
				} catch (e) {
					// 忽略不支持的平台
				}
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

			// ---- 排序预览（基于新排序规则）----
			/**
			 * 排序规则说明：
			 * 示例1：[0,1,2,3,4,5]，拖拽元素1，手指移入4，结果 [0,2,3,4,1,5]
			 * 示例2：[0,1,2,3,4,5]，拖拽元素5，手指移入1，结果 [0,5,1,2,3,4]
			 * 规则：将 dragIndex 元素从原位置移除，插入到 targetIndex 位置，其他元素顺序平移
			 */
			getReorderPreview(dragIdx, targetIdx) {
				const enabledIndices = this.getEnabledIndices();
				const dragEnabledPos = enabledIndices.indexOf(dragIdx);
				const targetEnabledPos = enabledIndices.indexOf(targetIdx);

				if (dragEnabledPos < 0 || targetEnabledPos < 0) return null;

				// 将 dragIdx 从原位置移除，插入到 targetIdx 对应的启用位置
				const nextEnabledSourceIndices = enabledIndices.slice();
				const spliced = nextEnabledSourceIndices.splice(dragEnabledPos, 1);
				nextEnabledSourceIndices.splice(targetEnabledPos, 0, spliced[0]);

				// 构建原始下标 -> 最终槽位下标的映射
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

			// ---- 位置测量（长按触发前调用，计算所有下标对应的 {top,left,right,bottom}）----
			measureItemPositions() {
				return new Promise((resolve) => {
					setTimeout(() => {
						utils.querySelector('.ste-drag-sort-root', this).then((rootRect) => {
							utils.querySelector('.ste-drag-sort-item', this, true).then((rects) => {
								let items = [];
								if (Array.isArray(rects)) {
									items = rects;
								} else if (rects && typeof rects === 'object') {
									if (rects.length !== undefined) {
										for (let i = 0; i < rects.length; i++) {
											if (rects[i]) items.push(rects[i]);
										}
									} else {
										Object.keys(rects).forEach(key => {
											if (!isNaN(Number(key)) && rects[key]) {
												items.push(rects[key]);
											}
										});
									}
								}

								// 建立 DOM 位置 → list 索引的映射
								// querySelectorAll 返回 DOM 顺序的 rects，与 list 渲染顺序一致
								// 用 uid 找到每个 rect 对应的 list 下标，确保 itemRects 的 key 是 list 索引
								const uidToListIndex = {};
								this.list.forEach((item, idx) => {
									uidToListIndex[item.uid] = idx;
								});

								// DOM 顺序与 list 顺序一致，不需要按视觉排序
								// items[i] 对应 list[uidToListIndex[uid]]（即 list[i]，因为 uid 顺序与 DOM 顺序一致）
								// 直接用 list 索引 i 作为 itemRects 的 key，保持与 hitTestIndex / insertIndex 的索引一致
								this.itemWidth = this.cmpColumns > 1
									? (rootRect ? rootRect.width : 0) / this.cmpColumns
									: (items[0] ? items[0].width : 0);
								this.itemHeight = items[0] ? items[0].height : 0;

								// 兼容旧逻辑的 itemPositions（用于样式偏移计算）
								this.itemPositions = items.map((rect, index) => ({
									top: rect.top || 0,
									left: rect.left || 0,
									width: rect.width || this.itemWidth,
									height: rect.height || this.itemHeight,
								}));

								/**
								 * itemRects 格式：{ [listIndex: string]: { top, left, right, bottom } }
								 * key 是 list 的下标索引，与 hitTestIndex / insertIndex 的索引体系完全一致
								 */
								const rects2 = {};
								items.forEach((rect, index) => {
									const top = rect.top || 0;
									const left = rect.left || 0;
									const width = rect.width || this.itemWidth;
									const height = rect.height || this.itemHeight;
									// 直接用数组下标 index 作为 list 索引（DOM 顺序 = list 顺序）
									rects2[String(index)] = {
										top,
										left,
										right: left + width,
										bottom: top + height,
									};
								});
								this.itemRects = rects2;

								resolve();
							});
						});
					}, 50);
				});
			},

			// ---- hit-test：根据手指坐标判断进入了哪个下标 ----
			/**
			 * 命中策略（按优先级顺序）：
			 * 1. 死区安全区：手指在 dragIndex rect ± 死区范围内 → 不触发排序
			 * 2. rect 命中：手指落在某个其他元素的 rect 内 → 返回该元素 index
			 * 3. 中心点距离：手指不在任何 rect 内 → 找中心点曼哈顿距离最近的元素
			 *
			 * @param {number} x 手指 clientX
			 * @param {number} y 手指 clientY
			 * @returns {number} 命中的下标
			 */
			hitTestIndex(x, y) {
				const keys = Object.keys(this.itemRects);
				if (!keys.length) return this.dragIndex;

				const dragRect = this.itemRects[String(this.dragIndex)];
				if (!dragRect) return this.dragIndex;

				// 阶段一：安全区。手指在 dragIndex rect + 死区范围内，不触发排序
				const DEAD_ZONE = 10;
				const inDeadZone = x >= dragRect.left - DEAD_ZONE &&
					x <= dragRect.right + DEAD_ZONE &&
					y >= dragRect.top - DEAD_ZONE &&
					y <= dragRect.bottom + DEAD_ZONE;
				if (inDeadZone) return this.dragIndex;

				// 阶段二：遍历 itemRects，手指落在哪个 rect 内则命中（排除 dragIndex）
				let hit = null;
				for (let i = 0; i < keys.length; i++) {
					const idx = Number(keys[i]);
					if (this.getItemDisabled(idx)) continue;
					if (idx === this.dragIndex) continue;
					const rect = this.itemRects[keys[i]];
					if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
						hit = idx;
						break;
					}
				}
				if (hit !== null) return hit;

				// 阶段三：手指不在任何 rect 内（越出列表边界等），找中心点最近距离（排除 dragIndex）
				let closestIndex = this.dragIndex;
				let minDist = Infinity;
				for (let i = 0; i < keys.length; i++) {
					const idx = Number(keys[i]);
					if (this.getItemDisabled(idx)) continue;
					if (idx === this.dragIndex) continue;
					const rect = this.itemRects[keys[i]];
					const cx = (rect.left + rect.right) / 2;
					const cy = (rect.top + rect.bottom) / 2;
					const dist = Math.abs(x - cx) + Math.abs(y - cy);
					if (dist < minDist) {
						minDist = dist;
						closestIndex = idx;
					}
				}
				return closestIndex;
			},

			// ---- 样式计算 ----
			getItemTranslateOffset(index) {
				if (!this.dragging || !this.sortingStarted) return { x: 0, y: 0 };
				if (this.getItemDisabled(index)) return { x: 0, y: 0 };
				if (index === this.dragIndex || this.dragIndex === this.insertIndex) return { x: 0, y: 0 };

				// 复用 itemStyles 中捕获的 sortingStarted，确保依赖一致
				const currentSortingStarted = this.sortingStarted;
				if (!currentSortingStarted) return { x: 0, y: 0 };

				const reorderPreview = this.getReorderPreview(this.dragIndex, this.insertIndex);
				const nextIndex = reorderPreview && reorderPreview.finalIndexMap.get(index);

				if (typeof nextIndex !== 'number' || nextIndex === index) return { x: 0, y: 0 };

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

				// 禁用页面滚动
				this.disablePageScroll();

				// 在开始拖拽时测量所有元素位置（计算 itemRects）
				return this.measureItemPositions().then(() => {
					return this.dragging && this.dragSessionId === sessionId && this.dragIndex === index;
				});
			},

			moveDrag(clientX, clientY) {
				if (!this.dragging) return;
				this.offsetX = clientX - this.startX;
				this.offsetY = clientY - this.startY;

				// 移动超过阈值才开始排序
				if (!this.sortingStarted && (Math.abs(this.offsetX) > 5 || Math.abs(this.offsetY) > 5)) {
					this.sortingStarted = true;
				}

				if (this.sortingStarted) {
					// 使用手指实际坐标进行 hit-test，获取当前进入的下标
					const hitIdx = this.hitTestIndex(clientX, clientY);
					if (hitIdx !== this.insertIndex) {
						this.insertIndex = hitIdx;
					}
				}
			},

			finishDrag() {
				if (!this.dragging) return;

				const oldIndex = this.dragIndex;
				const targetInsert = this.insertIndex >= 0 ? this.insertIndex : oldIndex;
				const reorderPreview = this.getReorderPreview(oldIndex, targetInsert);
				const newIndex = (reorderPreview && reorderPreview.finalIndexMap.get(oldIndex)) !== undefined
					? reorderPreview.finalIndexMap.get(oldIndex)
					: oldIndex;

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

				// 恢复页面滚动
				this.enablePageScroll();

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
					event.preventDefault && event.preventDefault();
				});
			},
			onTouchMove(event) {
				if (!this.dragging) return;
				const touch = this.getFirstTouch(event);
				if (!touch) return;
				this.moveDrag(this.getTouchX(touch), this.getTouchY(touch));
				event.preventDefault && event.preventDefault();
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
		transition: opacity 0.12s ease;

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
