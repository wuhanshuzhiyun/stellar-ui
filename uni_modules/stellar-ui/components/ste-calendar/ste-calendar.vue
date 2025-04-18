<template>
	<view class="ste-calendar-root" :style="[cmpRootStyle, { opacity: initing ? 0 : 1 }]">
		<view v-if="showTitle" class="calendar-title">{{ title }}</view>
		<view class="week-head">
			<view class="week-row">
				<view
					class="week-item"
					:class="{ weekend: index === 0 || index === 6 }"
					v-for="(w, index) in cmpDates.weekTexts"
					:key="index"
				>
					{{ w }}
				</view>
			</view>
		</view>
		<scroll-view
			class="date-content"
			:class="{ 'show-confirm': cmpShowConfirm, 'show-title': showTitle }"
			scroll-y
			:scroll-top="contentScrollTop"
			@scroll="onScroll"
		>
			<view class="month-item" v-for="m in cmpDates.monthDatas" :key="m.key" :id="`month-${m.key}`">
				<view class="month-bg" v-if="showMark">
					{{ m.month }}
				</view>
				<view class="month-text">{{ m.monthText }}</view>
				<view class="week-row" v-for="(w, index) in m.weeks" :key="index">
					<view
						class="week-item day-item"
						v-for="d in w"
						:key="d.key"
						@click="onSelect(d)"
						:class="{
							weekend: d.weekend,
							range: mode === 'range',
							signs: cmpShowSigns,
							active: dataList.indexOf(d.key) >= 0,
							start: startDate === d.key,
							end: endDate === d.key,
							disabled: d.disabled,
							not: !d.dayText,
							today: d.today,
						}"
					>
						<block v-if="d.dayText">
							<view class="day-range-head" v-if="mode === 'range'"></view>
							<view class="day-content">{{ d.dayText }}</view>
							<view class="day-range-foot" v-if="mode === 'range'"></view>
							<view class="day-signs" v-if="cmpShowSigns">
								<block v-if="d.signs">
									<view
										class="day-sign"
										v-for="sign in d.signs"
										:key="sign.key"
										:style="[sign.style]"
										:class="sign.className"
									>
										{{ sign.content }}
									</view>
								</block>
							</view>
						</block>
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="cmpShowConfirm" class="confirm-button" data-test="confirm-button" @click="confirm">确定</view>
	</view>
</template>

<script>
import { formatDate, getCalendarData } from './self-date.js';
import utils from '../../utils/utils.js';
import useColor from '../../config/color.js';
let color = useColor();
/**
 * ste-calendar 日历
 * @description 日历组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-calendar
 * @property {String} title 标题
 * @property {Boolean} showTitle 是否显示标题
 * @property {Array} list 默认选中的日期
 * @property {String} mode 选项的值
 * @value single 选择单个日期（默认）
 * @value multiple 可以选择多个日期
 * @value range 可以选择日期范围
 * @property {String} startText 开始日期的提示文字
 * @property {String} endText 结束日期的提示文字
 * @property {String} color 主题颜色（选中日期背景、当天日期颜色和确定按钮）
 * @property {String} weekendColor 周末日期颜色
 * @property {String | Number | Date} minDate 最小可选日期
 * @property {String | Number | Date} maxDate 最大可选日期
 * @property {String | Number | Date} defaultDate 默认展示的月份
 * @property {Number} monthCount 渲染的月份数量
 * @property {String | Number} maxCount mode=multiple时，最多可选多少个日期
 * @property {String} formatter 日期格式化(默认'YYYY-MM-DD')
 * @property {Boolean} showMark 是否显示月份背景色
 * @property {Boolean} readonly 是否为只读状态，只读状态下禁止选择日期
 * @property {Boolean} maxRange 日期区间最多可选天数，默认无限制，mode = range时有效
 * @property {Boolean} rangePrompt 范围选择超过最多可选天数时的提示文案，mode = range时有效
 * @property {Boolean} showRangePrompt 范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效
 * @property {Boolean} allowSameDay 是否允许日期范围的起止时间为同一天，mode = range时有效
 * @property {Boolean} showConfirm 是否显示确定按钮
 * @property {Object} signs 标签数据
 * @event {Function} confirm 日期选择完成后触发，若showConfirm为true，则点击确认按钮后触发
 * @event {Function} select 点击/选择后触发
 * @event {Function} viewMonth 在视图区域的月份发生改变时触发
 */
export default {
	group: '表单组件',
	title: 'Calendar 日历',
	name: 'ste-calendar',
	props: {
		title: { type: [String, null], default: () => '日期选择' },
		showTitle: { type: [Boolean, null], default: () => true },
		list: { type: [Array, null], default: () => [] },
		// 选择模式：single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围
		mode: { type: [String, null], default: () => 'single' },
		startText: { type: [String, null], default: () => '开始' },
		endText: { type: [String, null], default: () => '结束' },
		color: { type: [String, null], default: () => '' },
		weekendColor: { type: [String, null], default: () => '' },
		minDate: { type: [String, Number, Date, null], default: () => 0 },
		maxDate: { type: [String, Number, Date, null], default: () => 0 },
		defaultDate: { type: [Number, String, Date, null], default: () => 0 },
		monthCount: { type: [Number, null], default: () => 12 },
		maxCount: { type: [Number, String, null], default: () => 0 },
		formatter: { type: [String, null], default: () => 'YYYY-MM-DD' },
		showMark: { type: [Boolean, null], default: () => true },
		readonly: { type: [Boolean, null], default: () => false },
		maxRange: { type: [Number, null], default: () => null },
		rangePrompt: { type: [String, null], default: () => null },
		showRangePrompt: { type: [Boolean, null], default: () => true },
		allowSameDay: { type: [Boolean, null], default: () => false },
		showConfirm: { type: [Boolean, null], default: () => true },
		width: { type: [Number, String, null], default: () => '100%' },
		height: { type: [Number, String, null], default: () => '100%' },
		signs: { type: Object, default: () => ({}) },
	},
	data() {
		return {
			initing: true, // 初始化中
			startDate: null, // 选中开始时间
			endDate: null, // 选中结束时间
			dataList: [], // 选中的日期列表
			contentScrollTop: 0, // 设置滚动距离
			scrollTop: 0, // 用户滚动距离
			viewDate: utils.dayjs(), // 默认日期
			viewTimer: null, // 渲染定时器
			viewMonth: null, // 当前展示的月份
		};
	},
	computed: {
		cmpRootStyle() {
			const rowHeight = this.cmpShowSigns ? utils.formatPx(180, 'num') : utils.formatPx(126, 'num');
			const style = {
				'--calendar-width': utils.formatPx(this.width),
				'--calendar-height': utils.formatPx(this.height),
				'--calendar-color': this.color ? this.color : color.getColor().steThemeColor,
				'--calendar-weekend-color': this.weekendColor ? this.weekendColor : color.getColor().steThemeColor,
				'--calendar-bg-color': utils.Color.formatColor(
					this.color ? this.color : color.getColor().steThemeColor,
					0.1
				),
				'--calendar-range-color': utils.Color.formatColor(
					this.color ? this.color : color.getColor().steThemeColor,
					0.2
				),
				'--calendar-disabled-color': utils.Color.formatColor(
					this.color ? this.color : color.getColor().steThemeColor,
					0.3
				),
				'--calendar-sign-color': utils.Color.formatColor(
					this.color ? this.color : color.getColor().steThemeColor,
					0.7
				),
				'--calendar-start-text': `"${this.startText}"`,
				'--calendar-end-text': `"${this.endText}"`,
				'--calendar-line-height': `${rowHeight}px`,
				rowHeight,
			};
			return style;
		},
		cmpDates() {
			const datas = getCalendarData(
				this.minDate,
				this.maxDate,
				this.viewDate,
				this.monthCount,
				this.formatter,
				this.signs
			);
			return datas;
		},
		cmpMonthTops() {
			const datas = this.cmpDates.monthDatas;
			const rowHeight = this.cmpRootStyle.rowHeight;
			const tops = {};
			let end = 0;
			for (let i = 0; i < datas.length; i++) {
				const month = datas[i];
				tops[month.key] = { top: end };
				end += utils.formatPx(80, 'num');
				end += rowHeight * month.weeks.length;
				tops[month.key].end = end;
			}
			return tops;
		},
		cmpShowConfirm() {
			return this.showConfirm && !this.readonly;
		},
		cmpShowSigns() {
			return Object.keys(this.signs).length > 0;
		},
	},
	watch: {
		list: {
			handler(v) {
				this.dataList = (v || []).map((d) => formatDate(d, this.formatter));
				if (this.mode === 'range' && this.dataList.length >= 2) {
					this.startDate = this.dataList[0];
					this.endDate = this.dataList[this.dataList.length - 1];
					this.rangeDates();
				}
			},
			immediate: true,
		},
		defaultDate: {
			handler(v) {
				this.viewDate = v ? utils.dayjs(v) : utils.dayjs();
				this.showMonth();
			},
			immediate: true,
		},
	},
	mounted() {
		this.showMonth();
	},
	methods: {
		showMonth(date) {
			const newDate = date ? utils.dayjs(date) : this.viewDate;
			if (newDate.format('YYYY-MM-DD') !== this.viewDate.format('YYYY-MM-DD')) {
				this.viewDate = newDate;
			}
			clearTimeout(this.viewTimer);
			this.viewTimer = setTimeout(() => {
				const viewMonth = this.viewDate.format('YYYY-MM');
				const tops = this.cmpMonthTops;
				const top = tops[viewMonth]?.top || 0;
				if (top === undefined || this.scrollTop === top) {
					this.initing = false;
					return;
				}
				this.contentScrollTop = this.scrollTop;
				this.$nextTick(() => {
					this.contentScrollTop = top;
					this.scrollTop = top;
					this.viewMonth = viewMonth;
					this.initing = false;
				});
			}, 10);
		},
		onShowMonth(scrollTop) {
			clearTimeout(this.viewTimer);
			this.viewTimer = setTimeout(() => {
				for (let month in this.cmpMonthTops) {
					const { top, end } = this.cmpMonthTops[month];
					if (scrollTop >= top && scrollTop < end) {
						if (this.viewMonth === month) return;
						this.viewMonth = month;
						this.$emit('view-month', month);
						return;
					}
				}
			}, 100);
		},
		onScroll(e) {
			this.scrollTop = e.detail.scrollTop;
			this.onShowMonth(e.detail.scrollTop);
		},
		onSelect(day) {
			if (this.readonly || !day.dayText || day.disabled) return;
			if (this.mode === 'single') {
				this.dataList = [day.key];
			} else if (this.mode === 'multiple') {
				this.onMultiple(day);
			} else if (this.mode === 'range') {
				this.onRange(day);
			}
			this.$emit('select', this.dataList, day.key);
		},
		onMultiple(day) {
			const index = this.dataList.indexOf(day.key);
			if (index === -1) {
				if (this.maxCount && this.dataList.length >= this.maxCount) return;
				this.dataList.push(day.key);
			} else {
				this.dataList.splice(index, 1);
			}
		},
		onRange(day) {
			this.dataList = [];
			if (!this.startDate) {
				this.startDate = day.key;
			} else if (!this.endDate) {
				if ((this.allowSameDay && day.key === this.startDate) || day.key > this.startDate) {
					this.endDate = day.key;
				} else if (day.key < this.startDate) {
					this.endDate = this.startDate;
					this.startDate = day.key;
				}
			} else {
				this.startDate = day.key;
				this.endDate = null;
			}
			this.rangeDates();
		},
		rangeDates() {
			if (!this.startDate || !this.endDate) return;
			const start = formatDate(this.startDate);
			const end = formatDate(this.endDate);
			let list = [];
			for (let i = new Date(start); i <= new Date(end); i.setDate(i.getDate() + 1)) {
				list.push(formatDate(i, this.formatter));
			}
			if (list.length < 2) {
				list = [this.startDate, this.endDate];
			}
			if (this.maxRange !== null && list.length > this.maxRange) {
				this.endDate = null;
				if (this.showRangePrompt) {
					uni.showModal({
						title: '提示',
						content: this.rangePrompt ? this.rangePrompt : `选择天数不能超过${this.maxRange}天`,
						showCancel: false,
					});
				}
				return;
			}
			this.dataList = list;
		},
		confirm() {
			this.$emit('confirm', this.dataList);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-calendar-root {
	width: var(--calendar-width);
	height: var(--calendar-height);
	color: #252525;
	.week-row {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 0;
		.week-item {
			text-align: center;
			&.weekend {
				color: var(--calendar-weekend-color);
			}
		}
		& + .week-row {
			margin-top: 0;
		}
	}
	.calendar-title {
		height: 90rpx;
		font-size: 32rpx;
		line-height: 44rpx;
		padding-top: 30rpx;

		text-align: center;
	}
	.week-head {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		border-bottom: 1px solid #ddd;
		box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
	}
	.date-content {
		width: 100%;
		overflow-y: auto;
		height: calc(100% - 80rpx);
		padding-bottom: 12rpx;
		&.show-title {
			height: calc(100% - 142rpx);
		}
		&.show-confirm {
			height: calc(100% - 132rpx);
			&.show-title {
				height: calc(100% - 242rpx);
			}
		}

		.month-item {
			padding: 20rpx 0;
			position: relative;
			.month-bg {
				position: absolute;
				z-index: 1;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 360rpx;
				color: var(--calendar-bg-color);
				font-weight: bold;
			}
			.month-text {
				position: relative;
				z-index: 2;
				width: 100%;
				text-align: center;
				height: 44rpx;
				line-height: 44rpx;
				font-size: 32rpx;
			}
			.week-row {
				height: var(--calendar-line-height);
				.day-item {
					position: relative;
					height: 100%;
					z-index: 2;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					// #ifdef H5
					cursor: pointer;
					&.not {
						cursor: default !important;
					}
					// #endif
					&.active,
					&.start,
					&.end {
						&.range {
							background-color: var(--calendar-color);
							color: #fff;
						}
						&:not(.signs):not(.range) {
							background-color: var(--calendar-color);
							color: #fff;
						}
						&.signs {
							.day-content {
								background-color: var(--calendar-color);
								color: #fff;
								border-radius: 6rpx;
							}
						}
					}
					&.start,
					&.end {
						.day-range-head,
						.day-range-foot {
							display: block;
						}
						.day-signs {
							display: none;
						}
					}
					&.today {
						font-weight: bold;
						&:not(.active):not(.start):not(.end) {
							color: var(--calendar-color);
						}
					}
					&.active.range:not(.start):not(.end) {
						background-color: var(--calendar-range-color);
						color: var(--calendar-color);
						.day-content {
							background-color: transparent;
							color: inherit;
							border-radius: 0;
						}
					}

					&.start {
						.day-range-head::before {
							content: '';
						}

						.day-range-foot::before {
							content: var(--calendar-start-text);
						}
					}

					&.end {
						.day-range-head::before {
							content: '';
						}
						.day-range-foot::before {
							content: var(--calendar-end-text);
						}
					}
					&.start.end {
						.day-range-head::before {
							content: var(--calendar-start-text);
						}
					}

					&.disabled {
						background-color: initial !important;
						color: #bbb !important;
					}
					&.signs {
						.day-content {
							height: 72rpx;
							line-height: 72rpx;
						}
					}
					.day-content {
						width: 100%;
						height: 48rpx;
						line-height: 48rpx;
						font-size: 32rpx;
					}

					.day-range-head,
					.day-range-foot {
						width: 100%;
						height: 24rpx;
						line-height: 24rpx;
						font-size: 24rpx;
					}
					.day-range-head,
					.day-range-foot {
						display: none;
					}

					.day-signs {
						width: 100%;
						height: 102rpx;
						padding: 0 4rpx;
						display: flex;
						flex-direction: column;
						.day-sign {
							width: 100%;
							height: 24rpx;
							line-height: 24rpx;
							font-size: 24rpx;
							overflow: hidden;
							margin-top: 6rpx;
						}
					}
				}
			}
		}
	}

	.confirm-button {
		width: 100%;
		height: 72rpx;
		line-height: 72rpx;
		border-radius: 36rpx;
		background-color: var(--calendar-color);
		color: #fff;
		text-align: center;
		// #ifdef H5
		cursor: pointer;
		// #endif
		&.disabled {
			background-color: var(--calendar-disabled-color);
		}
	}
}
</style>
