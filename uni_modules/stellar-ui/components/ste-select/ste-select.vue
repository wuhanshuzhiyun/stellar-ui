<template>
	<view class="ste-select-root" :style="[cmpRootStyle]">
		<view class="select-content" :style="[contentStyle]">
			<view v-if="selected && selected.length">
				<slot>
					<view class="content-text">
						<text v-for="(value, index) in selected" :key="value">{{ getLabelByValue(index, value) }}</text>
					</view>
				</slot>
			</view>
			<view class="placeholder-text" v-else>{{ placeholder }}</view>
		</view>
		<view class="select-options" :style="[cmpOptionsStyle]">
			<scroll-view scroll-y class="options-col" v-for="(col, index) in cmpList" :key="index">
				<view
					class="options-item"
					:class="{ active: selected.indexOf(item[valueKey]) !== -1 }"
					v-for="(item, i) in col"
					:key="item[valueKey]"
					@click="onSelect(index, item)"
				>
					{{ item[labelKey] }}
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils';
export default {
	props: {
		value: {
			type: [String, Number, Array], // 支持单选和多选模式，多选模式下value为数组，单选模式下value为字符串或数字
			default: () => [], // 默认多选模式，value为空数组，单选模式下value为undefined或null
		},
		list: {
			type: Array,
			default: () => [],
		},
		width: {
			type: [Number, String],
			default: () => '100%',
		},
		height: {
			type: [Number, String],
			default: () => 60,
		},
		background: {
			type: String,
			default: () => '#fff',
		},
		placeholder: {
			type: String,
			default: () => '请选择',
		},
		labelKey: {
			type: String,
			default: () => 'label',
		},
		valueKey: {
			type: String,
			default: () => 'value',
		},
		multiple: {
			type: Boolean,
			default: () => false, // 默认单选模式，多选模式下multiple为true（仅单列时生效）
		},
		clear: {
			type: Boolean,
			default: () => true, // 是否显示清除按钮
		},
		filterable: {
			type: Boolean,
			default: () => false, // 是否支持搜索功能
		},
	},
	data() {
		return {
			selected: [], // 当前选中的值
			showOptions: false, // 是否显示下拉选项
			contentStyle: {},
		};
	},
	computed: {
		cmpRootStyle() {
			return {
				'--ste-select-width': utils.formatPx(this.width),
				'--ste-select-height': utils.formatPx(this.height),
				'--ste-select-background': this.background,
			};
		},
		cmpList() {
			// 处理list数据
			if (!this.list || !this.list.length) return [];
			if (Array.isArray(this.list[0])) {
				return this.list;
			}
			return [this.list];
		},
		cmpOptionsStyle() {
			return {
				display: this.cmpList?.length ? 'grid' : 'block',
				gridTemplateColumns: `repeat(${this.cmpList.length || 1}, minmax(100px, 1fr))`,
			};
		},
	},
	methods: {
		onSelect(col, item) {
			if (this.multiple && this.cmpList.length === 1) {
				// 只有一列选项的时候，多选
				const index = this.selected.findIndex((value) => value === item[this.valueKey]);
				if (index > -1) this.selected.splice(index, 1);
				else this.selected.push(item[this.valueKey]);
				return;
			}
			const selected = [...this.selected];
			selected[col] = item[this.valueKey];
			this.selected = selected;
		},
		getLabelByValue(index, value) {
			if (this.multiple && this.cmpList.length === 1) {
				const item = this.cmpList[0].find((item) => item[this.valueKey] === value);
				return item?.[this.labelKey] || '';
			}
			const item = this.cmpList[index].find((item) => item[this.valueKey] === value);
			return item?.[this.labelKey] || '';
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-select-root {
	position: relative;
	width: var(--ste-select-width);
	height: var(--ste-select-height);
	.select-content {
		z-index: 998;
	}
	.select-options {
		max-height: 420rpx;
		.options-col {
			height: 100%;
			.options-item {
				padding: 12rpx; // 调整选项的padding值，以适应不同的选项高度。
				&.active {
					color: #f00;
				}
			}
		}
	}
}
</style>
