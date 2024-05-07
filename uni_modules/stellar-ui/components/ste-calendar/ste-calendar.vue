<template>
	<view class="ste-calendar-root" :style="[{ opacity: initing ? 0 : 1 }, cmpRootStyle]">
		<view class="week-head">
			<view class="week-row">
				<view class="week-item" v-for="(w, index) in cmpDates.weekTexts" :key="index">{{ w }}</view>
			</view>
		</view>
		<scroll-view class="date-content" scroll-y :scroll-top="contentScrollTop">
			<view class="month-item" v-for="m in cmpDates.monthDatas" :key="m.key" :id="`month-${m.key}`">
				<view class="month-bg">
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
							range: mode === 'range',
							active: dataList.indexOf(d.key) >= 0,
							start: dataList.indexOf(d.key) === 0,
							end: dataList.indexOf(d.key) === dataList.length - 1,
						}"
					>
						<block v-if="d.dayText">
							<view class="day-head"></view>
							<view class="day-content">{{ d.dayText }}</view>
							<view class="day-foot"></view>
						</block>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="confirm-button disabled">确定</view>
	</view>
</template>

<script>
import { formatDate, getCalendarData } from './self-date.js';
import dayjs from '../../utils/dayjs.min.js';
import utils from '../../utils/utils.js';
export default {
	props: {
		list: {
			type: Array,
			default: () => [],
		},
		// 选择模式：single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围
		mode: {
			type: String,
			default: () => 'single',
		},
		startText: {
			type: String,
			default: () => '开始',
		},
		endText: {
			type: String,
			default: () => '结束',
		},
		color: {
			type: String,
			default: () => '#3c9cff',
		},
		minDate: {
			type: [String, Number, Date],
			default: () => 0,
		},
		maxDate: {
			type: [String, Number, Date],
			default: () => 0,
		},
		defaultDate: {
			type: [Number, String],
			default: () => 0,
		},
		maxCount: {
			type: Number,
			default: () => 0,
		},
		formatter: {
			type: String,
			default: () => 'YYYY-MM-DD',
		},
		showMark: {
			type: Boolean,
			default: () => true,
		},
		readonly: {
			type: Boolean,
			default: () => false,
		},
		maxRange: {
			type: Number,
			default: () => null,
		},
		rangePrompt: {
			type: String,
			default: () => `选择天数不能超过 xx 天	`,
		},
		showRangePrompt: {
			type: Boolean,
			default: () => true,
		},
		allowSameDay: {
			type: Boolean,
			default: () => true,
		},
	},
	data() {
		return {
			initing: true,
			dataList: [],
			contentScrollTop: 0,
		};
	},
	computed: {
		cmpRootStyle() {
			const style = {
				'--calendar-color': this.color,
				'--calendar-bg-color': utils.Color.formatColor(this.color, 0.1),
				'--calendar-disabled-color': utils.Color.formatColor(this.color, 0.3),
			};
			return style;
		},
		cmpDates() {
			return getCalendarData(this.minDate, this.maxCount, this.formatter);
		},
		cmpDefaultShow() {
			return this.defaultDate ? dayjs(this.defaultDate).format('YYYY-MM') : dayjs().format('YYYY-MM');
		},
	},
	watch: {
		list: {
			handler(v) {
				this.dataList = (v || []).map((d) => formatDate(d, this.formatter));
			},
			immediate: true,
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			if (!this.cmpDates.monthDatas?.length) return;
			if (this.cmpDates.monthDatas[0].key !== this.cmpDefaultShow) {
				this.initing = true;
				setTimeout(async () => {
					try {
						const box = await utils.querySelector('.date-content', this);
						const el = await utils.querySelector(`#month-${this.cmpDefaultShow}`, this);
						this.contentScrollTop = el?.top - box?.top || 0;
					} catch (e) {
						//TODO handle the exception
					}
					this.initing = false;
				}, 30);
			}
		},
		onSelect(day) {
			if (this.mode === 'single') {
				this.dataList = [day.key];
			} else if (this.mode === 'multiple') {
				const index = this.dataList.indexOf(day.key);
				if (index === -1) {
					if (this.maxCount && this.dataList.length > this.maxCount) return;

					this.dataList.push(day.key);
				} else {
					this.dataList.splice(index, 1);
				}
			} else if (this.mode === 'range') {
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-calendar-root {
	width: 100%;
	height: 100%;
	.week-row {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 12rpx;
		.week-item {
			text-align: center;
		}
		& + .week-row {
			margin-top: 12rpx;
		}
	}
	.week-head {
		width: 100%;
		height: 60rpx;
		border-bottom: 1px solid #ddd;
	}
	.date-content {
		width: 100%;
		height: calc(100% - 132rpx);
		overflow-y: auto;

		.month-item {
			padding: 18rpx 0;
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
			}
			.month-text {
				position: relative;
				z-index: 2;
				width: 100%;
				text-align: center;
				height: 60rpx;
				line-height: 60rpx;
			}
			.day-item {
				position: relative;
				z-index: 2;
				&.active {
					background-color: var(--calendar-color);
					color: #fff;
				}
				.day-head,
				.day-foot {
					width: 100%;
					height: 30rpx;
					line-height: 30rpx;
					font-size: 24rpx;
				}
				.day-content {
					width: 100%;
					height: 48rpx;
					line-height: 48rpx;
					font-size: 30rpx;
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
		&.disabled {
			background-color: var(--calendar-disabled-color);
		}
	}
}
</style>
