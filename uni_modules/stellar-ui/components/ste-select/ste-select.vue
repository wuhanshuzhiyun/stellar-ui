<template>
	<view class="ste-select-root" :class="{ open: showOptions }" :style="[cmpRootStyle]">
		<view class="select-mask" @click="clickMask">
			<view class="select-content" :style="[contentStyle]" @click.stop="stop">
				<slot>
					<scroll-view scroll-x class="content-text" :class="{ multiple: cmpMultiple }">
						<block v-if="cmpFilterable"></block>
						<block v-else>
							<block v-if="confirmValue && confirmValue.length">
								<block v-if="cmpMultiple">
									<block v-for="(v, i) in cmpViewValue">
										<view class="view-item" :key="v" v-if="v">
											{{ v }}
										</view>
									</block>
								</block>
								<text v-else>{{ cmpViewValue }}</text>
							</block>
							<view class="placeholder-text" v-else>{{ placeholder }}</view>
						</block>
					</scroll-view>
				</slot>
				<view class="open-icon-event" @click="openOptions">
					<view class="open-icon">
						<ste-icon code="&#xe676;" size="20" display="block" />
					</view>
				</view>
			</view>

			<view class="options-content" :style="[optionsStyle]" @click.stop="stop">
				<view class="select-options">
					<block v-if="cmpList.length > 1">
						<picker-view
							style="height: 600rpx"
							indicator-style="height: 43px"
							:value="cmpMultiseriateValue"
							@change="onDateChange"
						>
							<picker-view-column v-for="(col, index) in cmpList" :key="index">
								<view class="time-item" v-for="(item, i) in col" :key="item">
									<text>
										{{ cmpShowDate ? item : item[labelKey] }}
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
				<view class="options-btns" v-if="cmpList.length > 1">
					<view class="options-cancel" @click="clickCancel">取消</view>
					<view class="options-confirm" @click="clickConfirm">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils';
import { formatDate, getDateList, getFormatStr, getNowDate } from './defaultDate';
export default {
	props: {
		value: { type: [Array, String, Number], default: () => [] },
		list: { type: Array, default: () => [] },
		mode: { type: String, default: () => 'default' },
		minDate: { type: [Number, String, Date], default: () => null },
		maxDate: { type: [Number, String, Date], default: () => null },
		dateUnit: { type: Boolean, default: () => true },
		width: { type: [Number, String], default: () => '100%' },
		height: { type: [Number, String], default: () => 64 },
		background: { type: String, default: () => '#fff' },
		maskClose: { type: Boolean, default: () => true },
		optionsWidth: { type: [Number, String], default: () => 'auto' },
		placeholder: { type: String, default: () => '请选择' },
		labelKey: { type: String, default: () => 'label' },
		valueKey: { type: String, default: () => 'value' },
		multiple: { type: Boolean, default: () => false },
		allowCreate: { type: Boolean, default: () => false },
	},
	data() {
		return {
			dataFilterable: '', // 输入框搜索值
			selected: [], // 当前选中的值
			confirmValue: [], // 确定按钮的值，用于多选模式下保存选中的值，用于单选模式下保存选中的值（仅单列时生效）
			showOptions: false, // 是否显示下拉选项
			contentStyle: {},
			optionsStyle: {}, // 选项框样式，用于控制选项框的宽度和高度等属性
		};
	},
	computed: {
		// 是否是日期模式（包括日期、时间、日期时间、月份）
		cmpShowDate() {
			return ['date', 'datetime', 'time', 'month', 'minute'].includes(this.mode);
		},
		// 是否是筛选模式（包括筛选、筛选多列）
		cmpFilterable() {
			return this.mode === 'filterable';
		},
		// 是否是多选模式（多列或者单列多选）
		cmpMultiple() {
			return !this.cmpShowDate && (this.cmpList.length > 1 || this.multiple);
		},
		cmpRootStyle() {
			return {
				'--ste-select-width': utils.formatPx(this.width),
				'--ste-select-height': utils.formatPx(this.height),
				'--ste-select-line-height': utils.formatPx(this.height, 'num') - 2 + 'px',
				'--ste-select-multiple-line-height': utils.formatPx(this.height, 'num') - 8 + 'px',
				'--ste-select-background': this.background,
			};
		},

		cmpList() {
			if (this.cmpShowDate) {
				return getDateList(this.selected, this.mode, this.minDate, this.maxDate);
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
			if (['date', 'datetime', 'month'].includes(this.mode)) {
				return ['年', '月', '日', '时', '分', '秒'];
			} else {
				return ['时', '分', '秒'];
			}
		},
		cmpMultiseriateValue() {
			if (this.cmpShowDate) {
				const value = getNowDate(this.selected, this.mode);
				return this.cmpList.map((item, i) => (item.includes(value[i]) ? item.indexOf(value[i]) : 0));
			}
			const value = [...this.selected];
			return this.cmpList.map((item, i) => item.findIndex((v) => v[this.valueKey] === value[i]));
		},
		cmpViewValue() {
			if (this.cmpShowDate) {
				let values = this.confirmValue;
				if (values.length < this.cmpList.length) values = this.initDate(values);
				const v = formatDate(values, this.mode);
				return v ? v.format(getFormatStr(this.mode)) : '';
			}
			let view = [];
			this.confirmValue.forEach((value, index) => {
				if (this.multiple && this.cmpList.length === 1) {
					const item = this.cmpList[0].find((item) => item[this.valueKey] === value);
					view.push(item?.[this.labelKey] || '');
				} else {
					const item = this.cmpList[index]?.find((item) => item[this.valueKey] === value);
					view.push(item?.[this.labelKey] || '');
				}
			});
			return !this.cmpMultiple && view[0] ? view[0] : view;
		},
	},
	watch: {
		value: {
			handler(v) {
				if (Array.isArray(v)) {
					this.selected = v;
				} else {
					if (this.cmpList.length > 1 || this.multiple) {
						console.error('ste-select: value必须为数组（单列单选模式value可以为string或number类型）');
					}
					this.selected = v || v === 0 ? [v] : [];
				}
				this.confirmValue = [...this.selected];
			},
			immediate: true, // 立即执行一次，确保初始化时正确赋值。
		},
	},
	mounted() {},
	methods: {
		stop: () => {},
		initDate(values) {
			const result = [];
			const now = getNowDate(null, this.mode).slice(0, this.cmpList.length);
			this.cmpList.forEach((item, i) => {
				const v = values[i] || values[i] === 0 ? values[i] : now[i]; // 默认选中当前时间。
				result.push(v);
			});
			return result;
		},
		initOptions(values) {
			const result = [];
			this.cmpList.forEach((item, i) => {
				const v = values[i] || values[i] === 0 ? values[i] : item[0][this.valueKey]; // 默认选中当前时间。
				result.push(v);
			});
			return result;
		},
		async openOptions() {
			if (this.showOptions) {
				this.showOptions = false; // 关闭选项列表
				this.contentStyle = {};
				this.optionsStyle = {};
			} else {
				if (this.selected.length < this.cmpList.length) {
					let selected = [];
					if (this.cmpShowDate) {
						selected = this.initDate(this.selected);
					} else if (this.cmpList.length > 1) {
						selected = this.initOptions(this.selected);
					}
					this.selected = selected;
				}
				const el = await utils.querySelector('.ste-select-root', this);
				const { width, height, top, left, bottom, right } = el;
				this.contentStyle = {
					position: 'absolute',
					left: `${left}px`,
					top: `${top}px`,
					width: `${width}px`,
					height: `${height}px`,
				};

				const boundary = utils.System.getElementBoundary(el);
				let y = 'bottom',
					x = 'start';
				if (boundary.top - boundary.bottom > 0) {
					y = 'top';
				}
				if (boundary.right - boundary.left > 0) {
					x = 'end';
				}
				const style = {
					position: 'absolute',
					display: 'block',
					width: this.optionsWidth === 'auto' ? `${width}px` : this.optionsWidth,
				};
				switch (y) {
					case 'top':
						style.bottom = `${boundary.bottom + height + 8}px`;
						break;
					case 'bottom':
						style.top = `${bottom + 8}px`;
						break;
				}

				switch (x) {
					case 'start':
						style.left = `${left}px`;
						break;
					case 'end':
						style.right = `${boundary.right}px`;
						break;
				}
				this.optionsStyle = style;
				this.showOptions = true; // 打开选项列表
			}
		},
		clickMask() {
			if (!this.maskClose) return;
			this.clickCancel(); // 关闭选项列表。
		},
		clickCancel() {
			this.onCancel();
			this.$emit('cancel'); // 触发cancel事件。
		},
		clickConfirm() {
			const value = this.onConfirm();
			this.$emit('confirm', value);
			this.$nextTick(() => this.onCancel());
		},
		onCancel() {
			this.showOptions = false; // 关闭选项列表
			this.contentStyle = {};
			this.optionsStyle = {};
		},
		onConfirm() {
			this.confirmValue = [...this.selected];
			let value = this.confirmValue;
			if (!this.cmpMultiple && !Array.isArray(this.value)) {
				value = this.confirmValue[0];
			}
			this.$emit('input', value);
			this.$emit('change', value);
			return value;
		},
		onSelect(col, item) {
			if (this.multiple && this.cmpList.length === 1) {
				// 只有一列选项的时候，多选
				const index = this.selected.findIndex((value) => value === item[this.valueKey]);
				if (index > -1) this.selected.splice(index, 1);
				else this.selected.push(item[this.valueKey]);
			} else {
				const selected = [...this.selected];
				selected[col] = item[this.valueKey];
				this.selected = selected;
			}
			this.onConfirm();
			if (!this.multiple) this.$nextTick(() => this.onCancel());
		},
		active(index, item) {
			if (this.cmpList.length > 1) {
				return this.selected[index] === item[this.valueKey];
			} else {
				return this.selected.includes(item[this.valueKey]);
			}
		},
		onDateChange({ detail: { value } }) {
			const result = [];
			value.forEach((i, index) => {
				const value = this.cmpList[index][i];
				result.push(this.cmpShowDate ? value : value[this.valueKey]);
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

	&.open {
		.select-mask {
			position: fixed;
			width: 100vw;
			height: 100vh;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 996;
			.select-content {
				.open-icon-event > .open-icon {
					transform: rotate(180deg);
				}
			}
		}
	}
	.select-mask {
		width: var(--ste-select-width);
		height: var(--ste-select-height);
	}
	.select-content {
		width: var(--ste-select-width);
		height: var(--ste-select-height);
		line-height: var(--ste-select-line-height);
		background-color: var(--ste-select-background);
		border: 1px solid #ebebeb;
		position: relative;
		z-index: 1;
		padding: 0 20rpx; // 调整内边距，以适应不同的选项高度。
		border-radius: 8rpx;
		overflow: hidden;
		.content-text {
			width: 100%;
			height: 100%;
			white-space: nowrap;
			&.multiple {
				padding: 2px 0;
				.view-item {
					max-width: 100%;
					line-height: var(--ste-select-multiple-line-height);
					display: inline-block;
					padding: 0 12rpx;
					border-radius: 6rpx;
					border: 1px solid #eee;
					margin-right: 8px;
					text-overflow: ellipsis;
					white-space: nowrap; // 文本不换行，防止文字溢出
					overflow: hidden; // 隐藏溢出内容，并显示省略号
				}
				.placeholder-text {
					line-height: var(--ste-select-multiple-line-height);
					border-top: 1px solid transparent;
					border-bottom: 1px solid transparent;
				}
			}
		}
		.placeholder-text {
			color: #999999;
		}
		.open-icon-event {
			width: var(--ste-select-multiple-line-height);
			height: var(--ste-select-multiple-line-height);
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
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
		z-index: 2;
		border-radius: 8rpx;
		background-color: #fff;
		overflow: hidden;
		.select-options {
			width: 100%;
			max-height: 696rpx;
			.options-col {
				padding: 0 16rpx;
				height: 100%;
				max-height: 696rpx;
				.options-item {
					width: 100%;
					height: 82rpx;
					line-height: 82rpx;
					// 文本溢出省略号
					text-overflow: ellipsis;
					white-space: nowrap; // 文本不换行，防止文字溢出
					overflow: hidden; // 隐藏溢出内容，并显示省略号

					&.active {
						color: #3491fa;
					}

					& + .options-item {
						border-top: 1px solid #f5f5f5;
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
			line-height: 96rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			.options-cancel {
				color: #999999;
				padding: 0 40rpx;
			}
			.options-confirm {
				color: #0090ff;
				padding: 0 40rpx;
			}
		}
	}
}
</style>
