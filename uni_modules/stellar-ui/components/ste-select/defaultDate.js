import utils from '../../utils/utils.js';
import { getMonthDays } from '../ste-calendar/self-date.js';

/**
 * 格式化时间值
 * @param {"date"|"datetime"|"time"|"month"|"minute"} mode 模式
 */
export function getFormatStr(mode) {
	switch (mode) {
		case 'date':
			return 'YYYY-MM-DD';
		case 'datetime':
			return 'YYYY-MM-DD HH:mm:ss';
		case 'time':
			return 'HH:mm:ss';
		case 'month':
			return 'YYYY-MM';
		case 'minute':
			return 'HH:mm';
		default:
			return 'YYYY-MM-DD';
	}
}

/**
 * 格式化时间值
 * @param {string | Array | Date} value 时间
 * @param {"date"|"datetime"|"time"|"month"|"minute"} mode 模式
 */
export function formatDate(value, mode = 'date') {
	let _v = value;

	if (Array.isArray(_v)) {
		if (!_v.length) {
			_v = null;
		} else if (['date', 'datetime', 'month'].indexOf(mode) !== -1) {
			const date = _v.slice(0, 3);
			const time = _v.slice(3);
			_v = `${date.join('-')}`;
			_v += time.length ? ` ${time.join(':')}` : '';
		} else if (['time', 'minute'].indexOf(mode) !== -1) {
			_v = _v.join(':');
		}
	}

	return _v ? utils.dayjs(_v) : null;
}

export function getYears(min, max) {
	const minYear = min ? min.year() : utils.dayjs().year() - 10;
	const maxYear = max ? max.year() : utils.dayjs().year() + 10;
	return Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
}

export function getMonths(date, min, max) {
	const minMonth = min && min.year() === date.year() ? min.month() + 1 : 1;
	const maxMonth = max && max.year() === date.year() ? max.month() + 1 : 12;
	return Array.from({ length: maxMonth - minMonth + 1 }, (_, i) => minMonth + i);
}

export function getDays(date, min, max) {
	const minDay = min && min.format('YYYY-MM') === date.format('YYYY-MM') ? min.date() : 1;
	const maxDay =
		max && max.format('YYYY-MM') === date.format('YYYY-MM') ? max.date() : getMonthDays(date.year(), date.month());
	return Array.from({ length: maxDay - minDay + 1 }, (_, i) => minDay + i);
}

export function getHours(date, min, max) {
	const minHour = min && min.format('YYYY-MM-DD') === date.format('YYYY-MM-DD') ? min.hour() : 0;
	const maxHour = max && max.format('YYYY-MM-DD') === date.format('YYYY-MM-DD') ? max.hour() : 23;
	return Array.from({ length: maxHour - minHour + 1 }, (_, i) => minHour + i);
}

export function getMinutes(date, min, max) {
	const minMinute = min && min.format('YYYY-MM-DD HH') === date.format('YYYY-MM-DD HH') ? min.minute() : 0;
	const maxMinute = max && max.format('YYYY-MM-DD HH') === date.format('YYYY-MM-DD HH') ? max.minute() : 59;
	return Array.from({ length: maxMinute - minMinute + 1 }, (_, i) => minMinute + i);
}

export function getSeconds(date, min, max) {
	const minSecond = min && min.format('YYYY-MM-DD HH:mm') === date.format('YYYY-MM-DD HH:mm') ? min.second() : 0;
	const maxSecond = max && max.format('YYYY-MM-DD HH:mm') === date.format('YYYY-MM-DD HH:mm') ? max.second() : 59;
	return Array.from({ length: maxSecond - minSecond + 1 }, (_, i) => minSecond + i);
}

/**
 * 获取默认数据。
 * @param {string | Array | Date} value - 默认值
 * @param {"date"|"datetime"|"time"|"month"|"minute"} mode - 模式
 * @param {string} minDate - 最小值
 * @param {string} maxDate - 最大值
 * @returns {Object[][]} 默认数据对象
 */
export function getDefaultDate(value, mode = 'date', minDate = null, maxDate = null) {
	let _v = formatDate(value, mode);

	const date = utils.dayjs(Date.now());
	const _value = _v ? _v : date;
	const min = minDate ? utils.dayjs(minDate) : null;
	const max = maxDate ? utils.dayjs(maxDate) : null;

	const years = getYears(min, max);
	const months = getMonths(_value, min, max);
	const days = getDays(_value, min, max);
	const hours = getHours(_value, min, max);
	const minutes = getMinutes(_value, min, max);
	const seconds = getSeconds(_value, min, max);

	const defaultData = []; // 默认数据数组，用于存储所有数据（包括年、月、日、时、分、秒）
	// 根据模式，将对应的数据添加到defaultData数组中，并返回该数组作为默认数据。
	switch (mode) {
		case 'datetime': // 日期时间模式，包括年、月、日、时、分、秒。
			defaultData.push(years, months, days, hours, minutes, seconds); // 添加年、月、日、时、分、秒数据到defaultData数组中。
			break; // 结束switch语句。
		case 'time':
			defaultData.push(hours, minutes, seconds); // 添加时、分、秒数据到defaultData数组中。
			break; // 结束switch语句。
		case 'month': // 月份模式，包括年、月。
			defaultData.push(years, months); // 添加年、月数据到defaultData数组中。
			break; // 结束switch语句。
		case 'minute': // 分钟模式，包括时、分。
			defaultData.push(hours, minutes); // 添加时、分数据到defaultData数组中。
		default: // 默认情况下，包括年、月、日。
			defaultData.push(years, months, days); // 添加年、月、日数据到defaultData数组中。
	}
	return defaultData;
}
