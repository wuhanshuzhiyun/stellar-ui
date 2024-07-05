<template>
	<view class="ste-rate-root">
		<view class="list" :style="[cmpListStyle]">
			<view v-for="index in cmpCount" class="item">
				<view class="icon-box inactive" @click="onSelect(index)">
					<ste-icon :code="cmpInactiveCode" :color="inactiveColor" :size="size"></ste-icon>
				</view>
				<view class="icon-box active" @click="onSelect(index)" :style="{ width: getWidth(index) }">
					<ste-icon :code="cmpActiveCode" :color="disabled ? '#C8C9CC' : activeColor" :size="size"></ste-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-rate 评分
 * @description 评分组件,用于对事物进行评级操作。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-rate
 * @property {Number} value 当前评分数（支持v-model双向绑定）默认 0
 * @property {Number} count 图标总数 默认 5
 * @property {Number} score 每颗星星代表的分数 默认 1
 * @property {Boolean} disabled 禁用 默认 false
 * @property {Boolean} readonly 只读（不置灰） 默认 false
 * @property {Number|String} size 评分图标的大小，单位rpx 默认 44
 * @property {String} inactiveColor 未选中的颜色 默认 #dddddd
 * @property {String} activeColor 选中的颜色 默认 #fa5014
 * @property {String} inactiveCode 未选中的图标code 默认 &#xe681;
 * @property {String} activeCode 选中的图标code 默认 &#xe684;
 * @property {Number|String} gutter 每个图标之间的距离，单位rpx 默认 10
 * @property {Array} iconData 每个分值对应的图标code
 * @event {Function} change 当前分值变化时触发的事件
 */

export default {
	group: '表单组件',
	title: 'Rate 评分',
	name: 'ste-rate',
	props: {
		value: {
			type: Number,
			default: 0,
		},
		count: {
			type: Number,
			default: 5,
		},
		score: {
			type: Number,
			default: 1,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		size: {
			type: [String, Number],
			default: 44,
		},
		inactiveColor: {
			type: String,
			default: '#dddddd',
		},
		activeColor: {
			type: String,
			default: '#fa5014',
		},
		inactiveCode: {
			type: String,
			default: '&#xe681;',
		},
		activeCode: {
			type: String,
			default: '&#xe684;',
		},
		gutter: {
			type: [String, Number],
			default: 10,
		},
		iconData: {
			type: Array,
			default: () => [],
		},
	},
	model: {
		prop: 'value',
		// 派发事件名，更新父组件数据
		event: 'input',
	},
	data() {
		return {};
	},
	computed: {
		cmpListStyle() {
			let style = {};
			style['columnGap'] = utils.formatPx(this.gutter);
			// #ifdef H5
			if (this.disabled || this.readonly) {
				style['cursor'] = 'not-allowed';
			} else {
				style['cursor'] = 'pointer';
			}
			// #endif
			return style;
		},
		cmpCount() {
			// 兼容浏览器和微信 对数字循环的处理不同
			return Array.from({ length: this.count }, (_, index) => index);
		},
		cmpActiveCode() {
			let code = this.getIconCode();
			if (code) return code;
			return this.activeCode;
		},
		cmpInactiveCode() {
			let code = this.getIconCode();
			if (code) return code;
			return this.inactiveCode;
		},
	},
	methods: {
		onSelect(index) {
			if (!this.disabled && !this.readonly) {
				let value = (index + 1) * this.score;
				if (this.value != value) {
					// 更新 model
					this.$emit('input', value);
					// change回调
					this.$emit('change', value);
				}
			}
		},
		// 计算已评分占未评分的宽度
		getWidth(index) {
			let value = (index + 1) * this.score;
			let diff = this.value - value;
			// 全部占据
			if (diff >= 0) {
				return '100%';
			}
			// 部分占据
			else if (Math.abs(diff) > 0 && Math.abs(diff) < this.score) {
				return (1 - Math.abs(diff) / this.score).toFixed(2) * 100 + '%';
			}
			// 未占据
			else {
				return 0;
			}
		},
		// 根据iconData来算出每个分值对应的iconCode
		getIconCode() {
			if (!this.iconData || this.iconData.length === 0) return;

			let curScroeIndex = Math.ceil(this.value / this.score) - 1;
			// 如果索引在数组范围内且对应的值不为空，直接返回该值
			if (curScroeIndex < this.iconData.length && this.iconData[curScroeIndex] !== '') {
				return this.iconData[curScroeIndex];
			}

			// 否则，从索引位置向左搜索最近的非空值
			for (let i = curScroeIndex; i >= 0; i--) {
				if (this.iconData[i] !== '') {
					return this.iconData[i];
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-rate-root {
	.list {
		display: flex;

		.item {
			position: relative;

			.active {
				position: absolute;
				overflow: hidden;
				top: 0;
			}
		}
	}
}
</style>
