<template>
	<view class="ste-date-picker-root">
		<ste-picker
			:columns="columns"
			:title="title"
			:showToolbar="showToolbar"
			:cancelText="cancelText"
			:cancelColor="cancelColor"
			:confirmText="confirmText"
			:confirmColor="confirmColor"
			:visibleItemCount="visibleItemCount"
			:defaultIndex="innerDefaultIndex"
			:itemHeight="itemHeight"
			@change="change"
			@cancel="cancel"
			@confirm="confirm"
			rootClass="ste-date-picker-view"
		></ste-picker>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import dayjs from '../../utils/dayjs.min.js';
/**
 * ste-date-picker 时间日期选择器
 * @description 此选择器用于时间日期
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-date-picker
 * @property {String | Number}	value				绑定值
 * @property {Boolean}			showToolbar			是否显示顶部的操作栏  ( 默认 true )
 * @property {String}			title				顶部标题
 * @property {String}			mode				展示格式 (默认 all)
 * @value all 年月日时分秒 {{String}}
 * @value datetime 年月日时分 {{String}}
 * @value date 年月日 {{String}}
 * @value year-month 年月 {{String}}
 * @value month-day 月日 {{String}}
 * @value time 时分秒 {{String}}
 * @value hour-minute 时分 {{String}}
 * @value minute-second 分秒 {{String}}
 * @property {Number}			maxDate				可选的最大时间  默认值为后10年
 * @property {Number}			minDate				可选的最小时间  默认值为前10年
 * @property {Function}			filter				选项过滤函数
 * @property {Function}			formatter			选项格式化函数
 * @property {String | Number}	itemHeight			各列中，单个选项的高度   ( 默认 36 )
 * @property {String}			cancelText			取消按钮的文字  ( 默认 '取消' )
 * @property {String}			confirmText			确认按钮的文字  ( 默认 '确认' )
 * @property {String}			cancelColor			取消按钮的颜色  ( 默认 '#909193' )
 * @property {String}			confirmColor		确认按钮的颜色  ( 默认 '#3c9cff' )
 * @property {String | Number}	visibleItemCount	每列中可见选项的数量  ( 默认 5 )
 * @event {Function} confirm 点击确定按钮，返回当前选择的值
 * @event {Function} change 当选择值变化时触发
 * @event {Function} cancel 点击取消按钮
 */

const DEFAULT_DATE = dayjs(new Date(1970, 1, 1, 0, 0, 0));

const padZero = (value) => {
	return `00${value}`.slice(-2);
};
const times = (n, iteratee) => {
	let index = -1;
	const result = Array(n < 0 ? 0 : n);
	while (++index < n) {
		result[index] = iteratee(index);
	}
	return result;
};

export default {
	group: '表单组件',
	title: 'DatePicker 时间选择器',
	name: 'ste-date-picker',
	props: {
		// 是否展示顶部的操作栏
		showToolbar: {
			type: [Boolean, null],
			default: true,
		},
		// 绑定值
		value: {
			type: [String, Number, null],
			default: '',
		},
		// 顶部标题
		title: {
			type: [String, null],
			default: '',
		},
		/**
		 * 年月日时分秒(all)，年月日时分(datetime)，年月日(date)，年月(year-month)，月日(month-day)，时分秒(time)，时分(hour-minute)，分秒(minute-second)，
		 */
		mode: {
			type: [String, null],
			default: 'all',
		},
		// 可选的最大时间
		maxDate: {
			type: [Number, String, null],
			// 最大默认值为后10年
			default: new Date(new Date().getFullYear() + 10, 11, 31, 23, 59, 59).getTime(),
		},
		// 可选的最小时间
		minDate: {
			type: [Number, String, Object, null],
			// 最小默认值为前10年
			default: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
		},
		// 选项过滤函数
		filter: {
			type: [Function, null],
			default: null,
		},
		// 选项格式化函数
		formatter: {
			type: [Function, null],
			default: null,
		},
		// 各列中，单个选项的高度
		itemHeight: {
			type: [String, Number, null],
			default: 43,
		},
		// 取消按钮的文字
		cancelText: {
			type: [String, null],
			default: '取消',
		},
		// 确认按钮的文字
		confirmText: {
			type: [String, null],
			default: '确认',
		},
		// 取消按钮的颜色
		cancelColor: {
			type: [String, null],
			default: '#969799',
		},
		// 确认按钮的颜色
		confirmColor: {
			type: [String, null],
			default: '#0090FF',
		},
		// 每列中可见选项的数量
		visibleItemCount: {
			type: [String, Number, null],
			default: 5,
		},
	},

	data() {
		return {
			columns: [],
			innerValue: '',
			innerDefaultIndex: [],
			innerFormatter: (type, value) => value,
		};
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.innerValue = this.correctValue(this.value);
			this.updateColumnValue(this.innerValue);
		},
		updateColumnValue(value) {
			this.innerValue = value;
			this.updateColumns();
			this.updateIndexs();
		},
		updateColumns() {
			const formatter = this.formatter || this.innerFormatter;
			const result = this.getOriginColumns().map((column) =>
				column.values.map((value) => formatter(column.type, value))
			);
			this.columns = result;
		},
		// 更新索引
		updateIndexs() {
			let value = this.innerValue;
			let values = [];
			const formatter = this.formatter || this.innerFormatter;
			values.push(
				formatter('year', `${dayjs(value).year()}`),
				formatter('month', padZero(dayjs(value).month() + 1)),
				formatter('day', padZero(dayjs(value).date())),
				formatter('hour', padZero(dayjs(value).hour())),
				formatter('minute', padZero(dayjs(value).minute())),
				formatter('second', padZero(dayjs(value).second()))
			);

			// 不同mode下的时间是连续值，需要计算不同mode下对应完整时间的初始替换下标即可
			let startFlag = 0;
			switch (this.mode) {
				case 'month-day':
					startFlag = 1;
					break;
				case 'time':
				case 'hour-minute':
					startFlag = 3;
					break;
				case 'minute-second':
					startFlag = 4;
			}

			// 根据当前各列的所有值，从各列默认值中找到默认值在各列中的索引
			const indexs = this.columns.map((column, index) => {
				// 通过取大值，可以保证不会出现找不到索引的-1情况
				return Math.max(
					0,
					column.findIndex((item) => item === values[index + startFlag])
				);
			});

			this.innerDefaultIndex = indexs;
		},
		getOriginColumns() {
			// 生成各列的值
			const results = this.getRanges().map(({ type, range }) => {
				let values = times(range[1] - range[0] + 1, (index) => {
					let value = range[0] + index;
					value = type === 'year' ? `${value}` : padZero(value);
					return value;
				});
				// 进行过滤
				if (this.filter) {
					values = this.filter(type, values);
				}
				return { type, values };
			});
			return results;
		},
		// 获取每列的最大和最小值
		getRanges() {
			const { maxYear, maxDate, maxMonth, maxHour, maxMinute, maxSecond } = this.getBoundary(
				'max',
				this.innerValue
			);
			const { minYear, minDate, minMonth, minHour, minMinute, minSecond } = this.getBoundary(
				'min',
				this.innerValue
			);

			const result = [
				{
					type: 'year',
					range: [minYear, maxYear],
				},
				{
					type: 'month',
					range: [minMonth, maxMonth],
				},
				{
					type: 'day',
					range: [minDate, maxDate],
				},
				{
					type: 'hour',
					range: [minHour, maxHour],
				},
				{
					type: 'minute',
					range: [minMinute, maxMinute],
				},
				{
					type: 'second',
					range: [minSecond, maxSecond],
				},
			];
			let temp = result;
			if (this.mode === 'datetime') temp = result.splice(0, 5);
			if (this.mode === 'date') temp = result.splice(0, 3);
			if (this.mode === 'year-month') temp = result.splice(0, 2);
			if (this.mode === 'month-day') temp = result.splice(1, 2);
			if (this.mode === 'time') temp = result.splice(3, 3);
			if (this.mode === 'hour-minute') temp = result.splice(3, 2);
			if (this.mode === 'minute-second') temp = result.splice(4, 2);
			return temp;
		},
		// 根据minDate、maxDate、minHour、maxHour等边界值，判断各列的开始和结束边界值
		getBoundary(type, innerValue) {
			const value = dayjs(innerValue);
			const boundary = dayjs(this[`${type}Date`]);
			const year = boundary.year();
			let month = 1;
			let date = 1;
			let hour = 0;
			let minute = 0;

			if (type === 'max') {
				month = 12;
				date = dayjs(value).daysInMonth();
				hour = 23;
				minute = 59;
			}

			// 获取边界值，逻辑是：当年达到了边界值(最大或最小年)，就检查月允许的最大和最小值，以此类推
			let second = minute;
			if (value.year() === year) {
				month = boundary.month() + 1;
				if (value.month() + 1 === month) {
					date = boundary.date();
					if (value.date() === date) {
						hour = boundary.hour();
						if (value.hour() === hour) {
							minute = boundary.minute();
							if (value.minute() === minute) second = boundary.second();
						}
					}
				}
			}

			return {
				[`${type}Year`]: year,
				[`${type}Month`]: month,
				[`${type}Date`]: date,
				[`${type}Hour`]: hour,
				[`${type}Minute`]: minute,
				[`${type}Second`]: second,
			};
		},
		// 得出合法的时间
		correctValue(value) {
			let date = dayjs(value);
			if (date.isValid()) {
				if (date.isBefore(dayjs(this.minDate))) {
					date = this.minDate;
				} else if (date.isAfter(dayjs(this.maxDate))) {
					date = this.maxDate;
				}
			} else {
				date = dayjs();
			}

			return date.valueOf();
		},
		change(e) {
			const { indexs, values } = e;
			let selectValue = '';

			// 取默认时间中的值，然后再通过mode和变化值来替换默认值
			let dateArr = [
				DEFAULT_DATE.year(),
				DEFAULT_DATE.month() + 1,
				DEFAULT_DATE.day(),
				DEFAULT_DATE.hour(),
				DEFAULT_DATE.minute(),
				DEFAULT_DATE.second(),
			];
			// 不同mode下的时间是连续值，需要计算不同mode下对应完整时间的初始替换下标即可
			let startFlag = 0;
			switch (this.mode) {
				case 'month-day':
					startFlag = 1;
					break;
				case 'time':
				case 'hour-minute':
					startFlag = 3;
					break;
				case 'minute-second':
					startFlag = 4;
			}
			indexs.forEach((e, i) => {
				let v = parseInt(values[i][e]);
				dateArr[startFlag + i] = v;
			});

			// 此月份的最大天数
			const maxDay = dayjs(`${dateArr[0]}-${dateArr[1]}`).daysInMonth();
			dateArr[2] = Math.min(maxDay, dateArr[2]) || 1;

			selectValue = Number(new Date(dateArr[0], dateArr[1] - 1, dateArr[2], dateArr[3], dateArr[4], dateArr[5]));
			selectValue = this.correctValue(selectValue);
			this.innerValue = selectValue;
			this.updateColumnValue(selectValue);

			// 发出change事件，value为当前选中的时间戳
			this.$emit('change', {
				value: selectValue,
				mode: this.mode,
			});
		},
		cancel() {
			this.$emit('cancel');
		},
		confirm() {
			this.$emit('confirm', this.innerValue);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-date-picker-root {
	// /deep/ view {
	// 	padding: 0 42rpx;
	// }
}
</style>
