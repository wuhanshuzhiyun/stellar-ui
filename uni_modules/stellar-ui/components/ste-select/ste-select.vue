<template>
	<view class="ste-select-root" :class="{ open: showOptions }" :style="[cmpRootStyle]">
		<view class="select-content" :style="[contentStyle]">
			<view v-if="confirmValue && confirmValue.length">
				<slot>
					<view class="content-text">
						<text v-if="cmpShowDate">{{ getDateByValue() }}</text>
						<text v-else>{{ getLabelByValue() }}</text>
					</view>
				</slot>
			</view>
			<view class="placeholder-text" v-else>{{ placeholder }}</view>
			<view class="open-icon-event" @click="openOptions">
				<view class="open-icon">
					<ste-icon code="&#xe676;" size="20" display="block" />
				</view>
			</view>
		</view>
		<view class="options-content" :style="[optionsStyle]">
			<view class="select-options" :style="[cmpOptionsStyle]">
				<block v-if="cmpShowDate">
					<picker-view
						style="height: 600rpx"
						indicator-style="height: 43px"
						:value="cmpDateValue"
						@change="onDateChange"
					>
						<picker-view-column v-for="(col, index) in cmpList" :key="index">
							<view class="time-item" v-for="(item, i) in col" :key="item">
								<text>
									{{ item }}
								</text>
								<text v-if="dateUnit">{{ cmpDateUnits[index] }}</text>
							</view>
						</picker-view-column>
					</picker-view>
				</block>

				<block v-else>
					<scroll-view scroll-y class="options-col" v-for="(col, index) in cmpList" :key="index">
						<view
							class="options-item"
							v-for="(item, i) in col"
							:key="item[valueKey]"
							:class="{ active: active(index, item) }"
							@click="onSelect(index, item)"
						>
							{{ item[labelKey] }}
						</view>
					</scroll-view>
				</block>
			</view>
			<view class="options-btns">
				<view class="options-cancel" @click="cancel">取消</view>
				<view class="options-confirm" @click="confirm">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils';
import { formatDate, getDefaultDate, getFormatStr } from './defaultDate';
export default {
	props: {
		value: {
			type: Array, // 支持单选和多选模式，多选模式下value为数组，单选模式下value为字符串或数字
			default: () => [], // 默认多选模式，value为空数组，单选模式下value为undefined或null
		},
		list: {
			type: Array,
			default: () => [],
		},
		mode: {
			type: String,
			default: () => 'default',
		},
		minDate: {
			type: [Number, String, Date],
			default: () => null, // 最小日期，格式为'YYYY-MM-DD'
		},
		maxDate: {
			type: [Number, String, Date],
			default: () => null, // 最大日期，格式为'YYYY-MM-DD'
		},
		dateUnit: {
			type: Boolean,
			default: () => true,
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
		optionsWidth: {
			type: [Number, String],
			default: () => 'auto', // 选项框宽度，用于控制选项框的宽度和高度等属性，多选模式下生效（仅单列时生效）
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
			confirmValue: [], // 确定按钮的值，用于多选模式下保存选中的值，用于单选模式下保存选中的值（仅单列时生效）
			showOptions: false, // 是否显示下拉选项
			contentStyle: {},
			optionsStyle: {}, // 选项框样式，用于控制选项框的宽度和高度等属性
		};
	},
	computed: {
		cmpShowDate() {
			return ['date', 'datetime', 'time', 'month', 'minute'].indexOf(this.mode) !== -1;
		},
		cmpRootStyle() {
			return {
				'--ste-select-width': utils.formatPx(this.width),
				'--ste-select-height': utils.formatPx(this.height),
				'--ste-select-background': this.background,
			};
		},

		cmpList() {
			if (this.cmpShowDate) {
				let v = this.selected;
				if (!v.length) {
					v = new Date();
				}
				return getDefaultDate(v, this.mode, this.minDate, this.maxDate);
			}
			if (!this.list || !this.list.length)
				// 处理list数据
				return [];
			if (Array.isArray(this.list[0])) {
				return this.list;
			}
			return [this.list];
		},
		cmpDateUnits() {
			if (['date', 'datetime', 'month'].indexOf(this.mode) !== -1) {
				return ['年', '月', '日', '时', '分', '秒'];
			} else {
				return ['时', '分', '秒'];
			}
		},
		cmpDateValue() {
			// 处理日期模式下的value值，返回格式为'YYYY-MM-DD'的字符串或数组（多选模式下）
			if (!this.cmpShowDate) return [];
			const date = utils.dayjs();

			let y = date.year(),
				m = date.month() + 1,
				d = date.date(),
				h = date.hour(),
				i = date.minute(),
				s = date.second(),
				value = [];

			if (['date', 'datetime', 'month'].indexOf(this.mode) !== -1) {
				if (this.selected[0]) y = this.selected[0];
				if (this.selected[1]) m = this.selected[1];
				if (this.selected[2]) d = this.selected[2];
				if (this.selected[3]) h = this.selected[3];
				if (this.selected[4]) i = this.selected[4];
				if (this.selected[5]) s = this.selected[5];
				value = [y, m, d, h, i, s];
			} else {
				if (this.selected[0]) h = this.selected[0];
				if (this.selected[1]) i = this.selected[1];
				if (this.selected[2]) s = this.selected[2];
				value = [h, i, s];
			}

			return this.cmpList.map((item, i) => (item.indexOf(value[i]) >= 0 ? item.indexOf(value[i]) : 0));
		},
		cmpOptionsStyle() {
			return {
				display: !this.cmpShowDate && this.cmpList?.length ? 'grid' : 'block',
				gridTemplateColumns: `repeat(${this.cmpList.length || 1}, 1fr)`,
			};
		},
	},
	watch: {
		value: {
			handler(v) {
				this.selected = v || []; // 监听value变化，更新selected值
				this.confirmValue = this.selected;
			},
			immediate: true, // 立即执行一次，确保初始化时正确赋值。
		},
	},
	mounted() {},
	methods: {
		async openOptions() {
			if (this.showOptions) {
				this.showOptions = false; // 关闭选项列表
				this.contentStyle = {};
				this.optionsStyle = {};
			} else {
				const { width, height, top, left, bottom, right } = await utils.querySelector('.ste-select-root', this);
				const style = { position: 'fixed', left: `${left}px`, width: `${width}px` };
				this.showOptions = true; // 打开选项列表
				this.contentStyle = Object.assign(
					{ top: `${top}px`, height: `${height}px`, 'box-shadow': '0 0 0 250vh rgba(0,0,0,.5)' },
					style
				);

				this.optionsStyle = Object.assign({ top: `${bottom + 8}px`, display: 'block' }, style);
			}
		},
		cancel() {
			this.showOptions = false; // 关闭选项列表
			this.contentStyle = {};
			this.optionsStyle = {};
		},
		confirm() {
			this.confirmValue = this.selected;
			this.$emit('input', this.selected);
			this.$emit('confirm', this.selected); // 触发confirm事件，传递selected值。
			this.$emit('change', this.selected);
			this.showOptions = false; // 关闭选项列表
			this.contentStyle = {};
			this.optionsStyle = {};
		},
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
		active(index, item) {
			if (this.cmpList.length > 1) {
				return this.selected[index] === item[this.valueKey];
			} else {
				return this.selected.includes(item[this.valueKey]);
			}
		},
		getLabelByValue() {
			let view = '';
			this.confirmValue.forEach((value, index) => {
				if (this.multiple && this.cmpList.length === 1) {
					const item = this.cmpList[0].find((item) => item[this.valueKey] === value);
					view += item?.[this.labelKey] || '';
				} else {
					const item = this.cmpList[index].find((item) => item[this.valueKey] === value);
					view += item?.[this.labelKey] || '';
				}
			});
			return view;
		},
		getDateByValue() {
			const v = formatDate(this.confirmValue, this.mode);
			return v ? v.format(getFormatStr(this.mode)) : '';
		},
		onDateChange({ detail: { value } }) {
			const result = [];
			value.forEach((i, index) => {
				result.push(this.cmpList[index][i]);
			});
			this.selected = result;
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-select-root {
	width: var(--ste-select-width);
	height: var(--ste-select-height);
	position: relative;
	background-color: var(--ste-select-background);
	&.open {
		.select-content {
			.open-icon-event > .open-icon {
				transform: rotate(180deg);
			}
		}
	}
	.select-content {
		width: var(--ste-select-width);
		height: var(--ste-select-height);
		position: relative;
		z-index: 997;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx; // 调整内边距，以适应不同的选项高度。
		border-radius: 8rpx;
		overflow: hidden;
		.placeholder-text {
			color: #999999;
		}
		.open-icon-event {
			width: 60rpx;
			height: 60rpx;
			padding: 16rpx;
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			.open-icon {
				background-color: #ebebeb; // 设置一个背景颜色，以便在开发过程中能够看到这个元素。
				border-radius: 16rpx;
				width: 32rpx;
				height: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: 300ms;
			}
		}
	}
	.options-content {
		display: none;
		position: absolute;
		z-index: 998;
		border-radius: 8rpx;
		background-color: #fff;
		overflow: hidden;
		.select-options {
			max-height: 696rpx;
			padding: 0 40rpx;
			.options-col {
				height: 100%;
				.options-item {
					padding: 12rpx; // 调整选项的padding值，以适应不同的选项高度。
					&.active {
						color: #f00;
					}
				}
			}
			.time-item {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.options-btns {
			width: 100%;
			height: 96rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			line-height: 96rpx;
			.options-cancel {
				color: #999999;
				padding: 0 40rpx;
			}
			.options-confirm {
				color: #0090ff;
				padding: 0 40rpx; // 调整按钮的padding值，以适应不同的选项高度。
			}
		}
	}
}
</style>
