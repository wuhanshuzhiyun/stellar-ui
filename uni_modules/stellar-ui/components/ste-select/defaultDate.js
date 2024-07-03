import utils from '../../utils/utils.js';
import { getMonthDays } from '../ste-calendar/self-date.js';

/**
 * 格式化时间值
 * @param {"date"|"datetime"|"time"|"month"|"minute"} mode 模式
 * @param {Boolean} unit 是否使用中文单位
 */
export function getFormatStr(mode, unit) {
	switch (mode) {
		case 'date':
			return unit ? 'YYYY年MM月DD日' : 'YYYY-MM-DD';
		case 'datetime':
			return unit ? 'YYYY年MM月DD日HH时mm分ss秒' : 'YYYY-MM-DD HH:mm:ss';
		case 'time':
			return unit ? 'HH时mm分ss秒' : 'HH:mm:ss';
		case 'month':
			return unit ? 'YYYY年MM月' : 'YYYY-MM';
		case 'minute':
			return unit ? 'HH时mm分' : 'HH:mm';
		default:
			return unit ? 'YYYY年MM月DD日' : 'YYYY-MM-DD';
	}
}

/**
 * 获取当前时间
 * @param {Date|Array|string} defaultDate 默认时间，默认当前时间
 * @param {"date"|"datetime"|"time"|"month"|"minute"} mode 模式
 */
export function getNowDate(defaultDate, mode) {
	let date = formatDate(defaultDate);
	if (!date) date = utils.dayjs();
	let y = date.year(),
		m = date.month() + 1,
		d = date.date(),
		h = date.hour(),
		i = date.minute(),
		s = date.second(),
		value = [];

	if (['date', 'datetime', 'month'].includes(mode)) {
		value = [y, m, d, h, i, s];
	} else {
		value = [h, i, s];
	}
	return value;
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
		} else if (['date', 'datetime', 'month'].includes(mode)) {
			const date = _v.slice(0, 3);
			const time = _v.slice(3);
			_v = `${date.join('-')}`;
			_v += time.length ? ` ${time.join(':')}` : '';
		} else if (['time', 'minute'].includes(mode)) {
			_v = `${utils.dayjs().format('YYYY-MM-DD')} ${_v.join(':')}`;
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

/**
 * 获取默认数据。
 * @param {string | Array | Date} value - 默认值
 * @param {"date"|"datetime"|"time"|"month"|"minute"} mode - 模式
 * @param {string} minDate - 最小值
 * @param {string} maxDate - 最大值
 * @returns {Object[][]} 默认数据对象
 */
export function getDateList(value, mode = 'date', minDate = null, maxDate = null) {
	let _v = formatDate(value, mode);
	const date = utils.dayjs();
	const _value = _v ? _v : date;
	const min = minDate ? utils.dayjs(minDate) : null;
	const max = maxDate ? utils.dayjs(maxDate) : null;

	const years = getYears(min, max);
	const months = getMonths(_value, min, max);
	const days = getDays(_value, min, max);
	const hours = Array.from({ length: 24 }, (_, i) => i);
	const minutes = Array.from({ length: 60 }, (_, i) => i);
	const seconds = Array.from({ length: 60 }, (_, i) => i);

	const defaultData = []; // 默认数据数组，用于存储所有数据（包括年、月、日、时、分、秒）
	// 根据模式，将对应的数据添加到defaultData数组中，并返回该数组作为默认数据。
	switch (mode) {
		case 'datetime': // 日期时间模式，包括年、月、日、时、分、秒。
			defaultData.push(years, months, days, hours, minutes, seconds); // 添加年、月、日、时、分、秒数据到defaultData数组中。
			break;
		case 'time':
			defaultData.push(hours, minutes, seconds); // 添加时、分、秒数据到defaultData数组中。
			break;
		case 'month': // 月份模式，包括年、月。
			defaultData.push(years, months); // 添加年、月数据到defaultData数组中。
			break;
		case 'minute': // 分钟模式，包括时、分。
			defaultData.push(hours, minutes); // 添加时、分数据到defaultData数组中。
			break;
		default: // 默认情况下，包括年、月、日。
			defaultData.push(years, months, days); // 添加年、月、日数据到defaultData数组中。
	}
	return defaultData;
}
