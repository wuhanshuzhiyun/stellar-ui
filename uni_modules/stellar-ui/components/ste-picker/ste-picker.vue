<template>
	<view class="ste-picker-root">
		<view class="ste-picker-toolbar" v-if="showToolbar">
			<text class="cancel" :style="{ color: cancelColor }">{{ cancelText }}</text>
			<text class="title">{{ title }}</text>
			<text class="confirm" :style="{ color: confirmColor }">{{ confirmText }}</text>
		</view>
		<picker-view
			@change="change"
			:indicatorStyle="cmpIndicatorStyle"
			class="ste-picker-view"
			:style="[cmpPickerViewStyle]"
			:value="innerIndex"
		>
			<picker-view-column v-for="(col, key) in innerColumns" :key="key" class="ste-picker-column">
				<view class="item" v-for="(item, index) in col" :key="index">{{ item }}</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-picker
 * @description 选择器
 * @property {Boolean}			show				是否显示picker弹窗（默认 false ）
 * @property {Boolean}			showToolbar			是否显示顶部的操作栏（默认 true ）
 * @property {String}			title				顶部标题
 * @property {Array}			columns				对象数组，设置每一列的数据
 * @property {Boolean}			loading				是否显示加载中状态（默认 false ）
 * @property {String | Number}	itemHeight			各列中，单个选项的高度（默认 44 ）
 * @property {String}			cancelText			取消按钮的文字（默认 '取消' ）
 * @property {String}			confirmText			确认按钮的文字（默认 '确定' ）
 * @property {String}			cancelColor			取消按钮的颜色（默认 '#909193' ）
 * @property {String}			confirmColor		确认按钮的颜色（默认 '#3c9cff' ）
 * @property {String | Number}	visibleItemCount	每列中可见选项的数量（默认 6 ）
 * @property {String}			keyName				选项对象中，需要展示的属性键名（默认 'text' ）
 * @property {Array}			defaultIndex		各列的默认索引
 * @event {Function} close		关闭选择器时触发
 * @event {Function} cancel		点击取消按钮触发
 * @event {Function} change		当选择值变化时触发
 * @event {Function} confirm	点击确定按钮，返回当前选择的值
 */
export default {
	props: {
		columns: {
			type: Array,
			default: () => [],
		},
		itemHeight: {
			type: [String, Number],
			default: 44,
		},
		visibleItemCount: {
			type: Number,
			default: 6,
		},
		showToolbar: {
			type: Boolean,
			default: true,
		},
		title: {
			type: String,
			default: '',
		},
		cancelText: {
			type: String,
			default: '取消',
		},
		cancelColor: {
			type: String,
			default: '#969799',
		},
		confirmText: {
			type: String,
			default: '确认',
		},
		confirmColor: {
			type: String,
			default: '#0091ff',
		},
		defaultIndex: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			// 上一次选择的列索引
			lastIndex: [],
			// 索引值 ，对应picker-view的value
			innerIndex: [],
			// 各列的值
			innerColumns: [],
			// 上一次的变化列索引
			columnIndex: 0,
		};
	},
	computed: {
		cmpIndicatorStyle() {
			let style = `height: ${utils.addUnit(this.itemHeight)}`;
			return style;
		},
		cmpPickerViewStyle() {
			let style = {
				height: utils.addUnit(this.visibleItemCount * this.itemHeight),
			};
			return style;
		},
	},
	watch: {
		// 监听默认索引的变化，重新设置对应的值
		defaultIndex: {
			immediate: true,
			handler(n) {
				this.setIndexs(n, true);
			},
		},
		// 监听columns参数的变化
		columns: {
			immediate: true,
			handler(n) {
				this.setColumns(n);
			},
		},
	},
	methods: {
		addUnit: utils.addUnit,
		change(e) {
			const { value } = e.detail;
			let index = 0,
				columnIndex = 0;
			// 通过对比前后两次的列索引，得出当前变化的是哪一列
			for (let i = 0; i < value.length; i++) {
				let item = value[i];
				if (item !== (this.lastIndex[i] || 0)) {
					// 把undefined转为合法假值0
					// 设置columnIndex为当前变化列的索引
					columnIndex = i;
					// index则为变化列中的变化项的索引
					index = item;
					break; // 终止循环，即使少一次循环，也是性能的提升
				}
			}
			this.columnIndex = columnIndex;
			const values = this.innerColumns;
			// 将当前的各项变化索引，设置为"上一次"的索引变化值
			this.setLastIndex(value);
			this.setIndexs(value);

			const changeObj = {
				value: this.innerColumns.map((item, index) => item[value[index]]),
				index,
				indexs: value,
				values,
				columnIndex, // 变化的列的索引
			};
			this.$emit('change', changeObj);
		},
		// 设置index索引，此方法可被外部调用设置
		setIndexs(index, setLastIndex) {
			this.innerIndex = utils.deepClone(index);
			if (setLastIndex) {
				this.setLastIndex(index);
			}
		},
		// 记录上一次的各列索引位置
		setLastIndex(index) {
			// 当能进入此方法，意味着当前设置的各列默认索引，即为“上一次”的选中值，需要记录，是因为changeHandler中
			// 需要拿前后的变化值进行对比，得出当前发生改变的是哪一列
			this.lastIndex = utils.deepClone(index);
		},
		// 设置整体各列的columns的值
		setColumns(columns) {
			this.innerColumns = utils.deepClone(columns);
			// 如果在设置各列数据时，没有被设置默认的各列索引defaultIndex，那么用0去填充它，数组长度为列的数量
			if (this.innerIndex.length === 0) {
				this.innerIndex = new Array(columns.length).fill(0);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-picker-root {
	// height: 500rpx;
	width: 100%;
	background-color: #fff;
	.ste-picker-view {
		width: 100%;
		// height: 100%;
	}
	.ste-picker-toolbar {
		padding: 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
		.cancel {
		}

		.title {
			font-size: 32rpx;
			font-weight: bold;
		}

		.confirm {
		}
	}
	.item {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
