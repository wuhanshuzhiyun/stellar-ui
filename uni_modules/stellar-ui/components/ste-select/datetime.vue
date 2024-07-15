<template>
	<picker-view style="height: 600rpx" indicator-style="height: 43px" :value="selectedIndex" @change="onChange">
		<picker-view-column v-for="(col, index) in options" :key="index">
			<view class="time-item" v-for="(item, i) in col" :key="item">
				<text>
					{{ item }}
				</text>
				<text v-if="dateUnit">{{ cmpDateUnits[index] }}</text>
			</view>
		</picker-view-column>
	</picker-view>
</template>

<script>
import { formatDate, getDateOptions, getFormatStr, getNowDate } from './defaultDate';
export default {
	name: 'datetime',
	props: {
		value: { type: [String, Number, Array], default: () => [] },
		mode: { type: String, default: () => 'date' },
		minDate: { type: [Number, String, Date], default: () => null },
		maxDate: { type: [Number, String, Date], default: () => null },
		dateUnit: { type: Boolean, default: () => true },
	},
	data() {
		return {
			selectedValue: [],
			selectedIndex: [],
		};
	},
	computed: {
		options() {
			return getDateOptions(this.selectedValue, this.mode, this.minDate, this.maxDate);
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
		options: {
			handler(v) {
				this.initSelectIndex();
			},
			immediate: true,
		},
	},
	methods: {
		initSelectIndex() {
			const indexs = [];
			this.options.forEach((item, index) => {
				let i = item.indexOf(this.selectedValue[index]);
				if (i === -1) {
					i = 0;
				}

				indexs.push(i);
			});
			this.selectedIndex = indexs;
		},
		onChange({ detail: { value } }) {
			const newValues = value.map((i, index) => {
				this.options[index][i];
			});
			this.selectedValue = newValues;
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
