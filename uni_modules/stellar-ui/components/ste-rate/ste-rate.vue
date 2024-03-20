<template>
	<view class="ste-rate--root">
		<view class="list" :style="[cmpListStyle]">
			<view v-for="index in count" class="item">
				<view class="inactive" @click="onSelect(index)">
					<ste-icon :code="inactiveCode" :color="inactiveColor" :size="size"></ste-icon>
				</view>
				<view class="active" @click="onSelect(index)">
					<ste-icon :code="activeCode" :color="activeColor" :size="size"></ste-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-rate 评分
 * @description 评分组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-rate
 * @property {Number} value 当前评分数（支持v-model双向绑定）
 * @property {Number} count 图标总数 默认 5
 * @property {Number} score 每颗星星代表的分数 默认 1
 * @property {Boolean} disabled 禁用 默认 false
 * @property {Boolean} readonly 只读（不置灰） 默认 false
 * @property {Number|String} size 评分图标的大小，单位rpx 默认 50
 * @property {String} inactiveColor 未选中的颜色 默认 #dddddd
 * @property {String} activeColor 选中的颜色 默认 #fa5014
 * @property {String} inactiveCode 未选中的图标code 默认 &#xe681;
 * @property {String} activeCode 选中的图标code 默认 &#xe684;
 * @property {Number|String} gutter 每个图标之间的距离，单位rpx 默认 5
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
			ttype: [String, Number],
			default: 50,
		},
		inactiveColor: {
			ttype: String,
			default: '#dddddd',
		},
		activeColor: {
			ttype: String,
			default: '#fa5014',
		},
		inactiveCode: {
			ttype: String,
			default: '&#xe681;',
		},
		activeCode: {
			ttype: String,
			default: '&#xe684;',
		},
		gutter: {
			ttype: [String, Number],
			default: 5,
		},
	},
	data() {
		return {};
	},
	computed: {
		cmpListStyle() {
			let style = {};
			style['columnGap'] = this.gutter + 'rpx';
			return style;
		},
	},
	methods: {
		onSelect(index) {
			console.log('index', index);
			return;
			var score = event.currentTarget.dataset.score;
			if (!this.disabled && !this.readonly) {
				this.this.setData({ innerValue: score + 1 });
				if ((0, version_1.canIUseModel)()) {
					this.setData({ value: score + 1 });
				}
				wx.nextTick(function () {
					_this.$emit('input', score + 1);
					_this.$emit('change', score + 1);
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-rate--root {
	.list {
		display: flex;
	}
}
</style>
