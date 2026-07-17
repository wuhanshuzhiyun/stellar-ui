# SelectSeat 座位选择

用于电影院、演出、车厢选座等场景的座位选择组件，基于 Canvas 渲染，支持单指拖拽、双指缩放，适合中大规模座位图展示。

---$

## 代码演示

## 基础用法

最简单的用法只需要传入行列数和画布尺寸。

```html
<template>
	<ste-select-seat v-model="selected" :rows="5" :cols="8" :width="340" :height="240" />
</template>

<script>
	export default {
		data() {
			return {
				selected: [],
			};
		},
	};
</script>
```

## 自定义座位

通过 `seats` 可以覆盖指定坐标的座位属性，常见场景包括：

-   `empty: true` 表示该位置留空，不渲染座位
-   `disabled: true` 表示该位置不可选
-   也可以单独配置某个区域的颜色

```html
<template>
	<ste-select-seat v-model="selected" :rows="5" :cols="8" :width="340" :height="240" :seats="customSeats" selectedBgColor="#007aff" />
</template>

<script>
	export default {
		data() {
			return {
				selected: [],
				customSeats: [
					{ row: 0, col: 2, empty: true },
					{ row: 0, col: 3, empty: true },
					{ row: 1, col: 0, disabled: true },
					{ row: 1, col: 1, disabled: true },
					{ row: 2, col: 4, bgColor: '#fff3e0', borderColor: '#ff9800', selectedBgColor: '#ff9800' },
					{ row: 2, col: 5, bgColor: '#fff3e0', borderColor: '#ff9800', selectedBgColor: '#ff9800' },
					{ row: 4, col: 0, empty: true },
					{ row: 4, col: 7, empty: true },
				],
			};
		},
	};
</script>
```

## 预选座位

预选本质上就是给 `v-model` 初始值。这里的坐标只表示"已选状态"，不负责定义座位是否禁用、是否留空。

```html
<template>
	<ste-select-seat v-model="selected" :rows="5" :cols="8" :width="340" :height="240" />
</template>

<script>
	export default {
		data() {
			return {
				selected: [
					{ row: 1, col: 3 },
					{ row: 1, col: 4 },
					{ row: 2, col: 3 },
					{ row: 2, col: 4 },
				],
			};
		},
	};
</script>
```

## 重置位置

组件实例暴露了 `reset()`，用于把当前缩放和拖拽视口恢复到初始状态，不会清空已选座位。

```html
<template>
	<ste-select-seat ref="seatRef" v-model="selected" :rows="5" :cols="8" :width="340" :height="240" />
	<button @click="reset">重置位置</button>
</template>

<script>
	export default {
		data() {
			return {
				selected: [],
			};
		},
		methods: {
			reset() {
				this.$refs.seatRef.reset();
			},
		},
	};
</script>
```

## 电影院座位图

复杂场景通常会同时用到以下能力：

-   通过 `seats` 区分已售、优选区、情侣座
-   通过 `empty` 留出过道、边角空位
-   通过 `move` 事件同步顶部银幕等浮层位置

```html
<template>
	<view class="seat-stage">
		<view class="screen" :style="{ transform: 'translateX(' + viewport.screenTranslateX + 'px)' }">银幕中央</view>

		<ste-select-seat
			v-model="selected"
			:rows="rows"
			:cols="cols"
			:width="340"
			:height="200"
			:seat-size="30"
			:seat-gap="6"
			:border-radius="8"
			:seats="seats"
			selected-bg-color="#2d6cdf"
			@move="onMove"
		/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rows: 12,
				cols: 20,
				selected: [
					{ row: 6, col: 7 },
					{ row: 6, col: 8 },
				],
				viewport: {
					translateX: 0,
					translateY: 0,
					scale: 1,
					screenTranslateX: 0,
				},
			};
		},
		computed: {
			seats() {
				var list = [];
				var soldSeatSet = new Set(['2-3', '2-4', '4-6', '7-14']);
				var vipSeatSet = new Set(['6-6', '6-7', '6-8', '6-11', '6-12', '6-13']);
				var coupleSeatSet = new Set(['10-5', '10-6', '10-13', '10-14']);

				var isAisleCol = function (col) {
					return col === 9 || col === 10;
				};
				var isFrontSideGap = function (row, col) {
					return (row === 0 || row === 1) && (col <= 1 || col >= 18);
				};
				var isBackCornerGap = function (row, col) {
					return row === 11 && (col === 0 || col === 19);
				};

				for (var row = 0; row < this.rows; row++) {
					for (var col = 0; col < this.cols; col++) {
						if (isAisleCol(col) || isFrontSideGap(row, col) || isBackCornerGap(row, col)) {
							list.push({ row: row, col: col, empty: true });
							continue;
						}

						var key = row + '-' + col;

						if (soldSeatSet.has(key)) {
							list.push({ row: row, col: col, disabled: true, bgColor: '#cfd4dc', borderColor: '#cfd4dc' });
							continue;
						}

						if (vipSeatSet.has(key)) {
							list.push({ row: row, col: col, bgColor: '#fff4d6', borderColor: '#ffb400', selectedBgColor: '#ffb400' });
							continue;
						}

						if (coupleSeatSet.has(key)) {
							list.push({ row: row, col: col, bgColor: '#ffe4ea', borderColor: '#ff7a9d', selectedBgColor: '#ff5c8a' });
							continue;
						}
					}
				}

				return list;
			},
		},
		methods: {
			onMove(event) {
				this.viewport = event;
			},
		},
	};
</script>
```

---$

<!-- props -->

## 数据说明

## 坐标约定

-   所有 `row`、`col` 均从 `0` 开始计数
-   `row: 0, col: 0` 表示第一行第一列
-   页面展示给用户时，通常会自行转成 `row + 1`、`col + 1`

## `modelValue` 与 `seats` 的区别

-   `modelValue` 只表示当前选中了哪些座位
-   `seats` 只表示这些座位是什么属性
-   两者职责分离，避免把"选中状态"和"座位配置"混在一起

例如：

-   某个座位是已售：应在 `seats` 中配置 `disabled: true`
-   某个座位默认选中：应在 `modelValue` 中写入对应坐标
-   某个位置是过道：应在 `seats` 中配置 `empty: true`

## 注意事项

-   `rows` 和 `cols` 必须为大于 `0` 的整数，否则不会正常渲染座位，并输出告警。
-   `seats` 中缺少合法 `row/col`、或坐标超出 `rows/cols` 范围的项会被忽略，并输出告警。
-   `seats` 中如果存在重复坐标，后一个配置会覆盖前一个，并输出告警。
-   `setSeat()` 同样会校验坐标合法性，越界或非法时不会生效。
-   `empty: true` 的位置不会渲染，也不会触发点击。
-   `disabled: true` 的位置会渲染，但不可选、不会切换选中状态。
-   `width`、`height` 决定可视区域大小；如果座位图较大，建议配合拖拽缩放使用。
-   `showRowLabels` 适合影院、车厢等纵向较长的座位图场景，小型座位图可关闭以减少干扰。

## 使用建议

-   普通场景只传 `rows`、`cols`、`v-model` 即可。
-   有过道、不可售、分区价格时，再补充 `seats`。
-   如果需要"银幕跟随""顶部浮层跟随"等效果，监听 `move` 事件即可。
-   如果业务里存在实时锁座、出票状态刷新，建议用 `setSeat()` 做局部更新，而不是每次重建整张座位图。

---$

{{fuyuwei}}
