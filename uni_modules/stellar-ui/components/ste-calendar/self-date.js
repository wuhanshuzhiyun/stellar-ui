import utils from '../../utils/utils.js';

/**
 * 获取从当前月份开始的12个月
 */
function getMonthList(minDate, maxDate, defaultDate, monthCount) {
	if (maxDate) monthCount = 12;
	const start = minDate ? utils.dayjs(minDate) : utils.dayjs(defaultDate);
	const sY = Number(start.format('YYYY'));
	const sM = Number(start.format('MM'));
	const end = maxDate ? utils.dayjs(maxDate) : null;
	let eY, eM;
	if (end) {
		eY = Number(end.format('YYYY'));
		eM = Number(end.format('MM'));
	} else {
		eY = sM + monthCount - 1 > 12 ? sY + 1 : sY;
		eM = sM + monthCount - 1 > 12 ? sM + monthCount - 1 - 12 : sM + monthCount - 1;
	}
	const months = [];
	for (let y = sY; y <= eY; y++) {
		for (let m = y === sY ? sM : 1; m <= (y === eY ? eM : 12); m++) {
			months.push(utils.dayjs(`${y}-${m < 10 ? '0' + m : m}-01`));
		}
	}
	return months;
}

/**
 * 获取每个月的天数
 */
export function getMonthDays(year, month) {
	// 是否是闰年
	const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	// 每个月的天数
	const daysCount = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return daysCount[month];
}

/**
 * 获取日历数据
 * @param {Date} minDate 最小日期
 * @param {Date} maxDate 最大日期
 * @param {Date} defaultDate 默认日期
 * @param {number} monthCount 渲染月数
 * @param {String} formatter 格式化
 * @param {{"2024-11-13":[{content:"XXXXXXXX",style:{},className:string}]} signs 日期标记
 */
export function getCalendarData(minDate, maxDate, defaultDate, monthCount = 12, formatter = 'YYYY-MM-DD',
	signs = {}, ) {
	const monthDatas = [];
	const months = getMonthList(minDate, maxDate, defaultDate, monthCount);
	const defaultY = utils.dayjs(defaultDate).year();
	const defaultM = utils.dayjs(defaultDate).month();
	const defaultD = utils.dayjs(defaultDate).date();
	const today = utils.dayjs().format('YYYY-MM-DD');
	months.forEach((date) => {

		const daysCount = getMonthDays(date.year(), date.month());
		// 一号的星期
		const firstDay = date.startOf('month').day();
		const monthData = {
			date,
			monthText: date.format('YYYY年MM月'),
			key: date.format('YYYY-MM'),
			month: date.month() + 1,
			weeks: [],
		};
		// 计算本月周数
		const weekNum = Math.ceil((daysCount + firstDay) / 7);
		let day = 1;
		for (let w = 0; w < weekNum; w++) {
			const week = [];
			for (let d = 0; d < 7; d++) {
				let _day;
				if ((w === 0 && d < firstDay) || day > daysCount) {
					_day = '';
				} else {
					_day = day++;
				}
				const key = _day ? utils.dayjs(`${monthData.key}-${_day}`).format(formatter) : Math.random();
				let disabled = !_day;
				if (_day) {
					disabled = (minDate && key < minDate) || (maxDate && key > maxDate);
				}
				const daySigns = _day && signs && signs[key] ? signs[key].slice(0, 3).map(item => ({
					...item,
					key: Math.random()
				})) : null;
				week.push({
					dayText: _day,
					key,
					disabled,
					weekend: d === 0 || d === 6,
					// 是否是今天
					today: _day && today === key,
					date: _day ? key : null,
					signs: daySigns,
				});
			}
			monthData.weeks.push(week);
		}
		monthDatas.push(monthData);
	});
	return {
		monthDatas,
		weekTexts: '日一二三四五六'.split('')
	};
}

/**
 * 格式化时间
 * @param {Object} date
 * @param {Object} formatter
 * @returns {String}
 */
export function formatDate(date, formatter = 'YYYY-MM-DD') {
	return utils.dayjs(date).format(formatter);
}