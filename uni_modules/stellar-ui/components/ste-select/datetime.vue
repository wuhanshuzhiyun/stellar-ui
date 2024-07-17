<template>
	<picker-view
		style="height: 450rpx; width: 100%"
		indicator-style="height: 43px"
		immediate-change
		:value="selectedIndex"
		@change="onChange"
	>
		<picker-view-column v-for="(col, index) in dataOptions" :key="index">
			<view class="time-item" v-for="(item, i) in col" :key="item.title">
				<text>
					{{ dateUnit ? item.title : item.value }}
				</text>
			</view>
		</picker-view-column>
	</picker-view>
</template>

<script>
import { getDateOptions, getFormatStr, getNowDate } from './defaultDate';
export default {
	name: 'date-time',
	props: {
		value: { type: [String, Number, Array], default: () => [] },
		mode: { type: String, default: () => 'date' },
		minDate: { type: [Number, String, Date], default: () => null },
		maxDate: { type: [Number, String, Date], default: () => null },
		dateUnit: { type: Boolean, default: () => true },
	},
	data() {
		return {
			dataOptions: [],
			selectedValue: [],
			selectedIndex: [],
		};
	},
	computed: {
		cmpDateUnits() {
			if (['date', 'datetime', 'month'].includes(this.mode)) {
				return ['年', '月', '日', '时', '分', '秒'];
			} else {
				return ['时', '分', '秒'];
			}
		},
	},
	watch: {
		value: {
			handler(v) {
				let values = [];
				if (Array.isArray(v)) {
					values = [...v];
				} else {
					const str = ['date', 'datetime', 'month'].includes(this.mode) ? 'YYYY MM DD HH mm ss' : 'HH mm ss';
					const value = utils.dayjs(v).format(str).split(' ');
					values = value.map((item) => Number(item));
				}
				this.selectedValue = values;
			},
			immediate: true,
		},
		minDate() {
			this.initOptions();
			this.initSelectIndex();
		},
		maxDate() {
			this.initOptions();
			this.initSelectIndex();
		},
	},
	created() {
		this.initOptions();
		this.initSelectIndex();
	},
	methods: {
		initOptions(values = this.selectedValue) {
			const { options, value } = getDateOptions(values, this.mode, this.minDate, this.maxDate);
			this.dataOptions = options;
		},
		initSelectIndex(values = this.selectedValue) {
			this.$nextTick(() => {
				const indexs = [];
				const _values = getNowDate(values, this.mode);
				this.dataOptions.forEach((item, index) => {
					let i = item.map(({ value }) => value).indexOf(_values[index]);
					if (i === -1) {
						i = _values[index] > item[item.length - 1].value ? item.length - 1 : 0;
					}
					indexs.push(i);
				});
				this.selectedIndex = indexs;
				this.selectedValue = indexs.map((i, index) => this.dataOptions[index][i].value);
				this.$emit('change', this.selectedValue);
				this.$emit('input', this.selectedValue);
			});
		},
		onChange(e) {
			const indexs = e.detail.value;
			const newValues = indexs.map((i, index) => this.dataOptions[index][i].value);
			this.initOptions(newValues);
			this.initSelectIndex(newValues);
		},
	},
};
</script>

<style scoped lang="scss">
.time-item {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
