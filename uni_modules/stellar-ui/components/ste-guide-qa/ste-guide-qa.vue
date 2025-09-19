<template>
	<view class="ste-quide-qa-root">
		<view :class="['qa-box', compModeClass]" v-if="mode === '1'">
			<view class="title-box">
				<view class="title">
					<text>{{ title }}</text>
					<text v-if="showNum">({{ data.length }})</text>
				</view>
				<view class="action" @click="handleActionClick">
					<text style="margin-right: 8rpx">{{ actionTitle }}</text>
					<ste-icon code="&#xe674;" :size="24" color="#858585" />
				</view>
			</view>
			<view class="show-box">
				<view class="item question">
					<view class="item-icon">
						<slot name="prefix-q">
							<ste-image
								src="https://image.whzb.com/chain/StellarUI/image/guide-q.png"
								:width="32"
								mode="widthFix"
							/>
						</slot>
					</view>
					<view class="item-text">{{ data[0].question }}</view>
				</view>
				<view class="item answer">
					<view class="item-icon">
						<slot name="prefix-a">
							<ste-image
								src="https://image.whzb.com/chain/StellarUI/image/guide-a.png"
								:width="32"
								mode="widthFix"
							/>
						</slot>
					</view>
					<view class="item-text">{{ data[0].answer }}</view>
				</view>
			</view>
		</view>
		<view class="qa-box" :class="[compModeClass]" v-else>
			<view v-for="(value, index) in data" :key="index" class="show-box">
				<view class="item question" @click="handleItemClick('q', value)">
					<view class="item-icon">
						<slot name="prefix-q">
							<ste-image
								src="https://image.whzb.com/chain/StellarUI/image/guide-q.png"
								mode="widthFix"
								:width="32"
							/>
						</slot>
					</view>
					<view class="item-text">{{ value.question }}</view>
				</view>
				<view class="item answer" @click="handleItemClick('a', value)">
					<view class="item-icon">
						<slot name="prefix-a">
							<ste-image
								src="https://image.whzb.com/chain/StellarUI/image/guide-a.png"
								mode="widthFix"
								:width="32"
							/>
						</slot>
					</view>
					<view class="item-text">{{ value.answer }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * ste-guide-qa 引导服务区
 * @description 问答组件，用于展示常见问题和答案
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-guide-qa
 * @property {Array} data 问答数据列表 默认 []
 * @property {Boolean} hideTitleIcon 是否隐藏标题图标 默认 false
 * @property {String} mode 显示模式 默认 1
 * @value 1 简单模式 {String}
 * @value 2 完整模式 {String}
 * @property {String} title 标题文本 默认 常见问题
 * @property {String} actionTitle 操作按钮文本 默认 全部
 * @property {Boolean} showNum 是否显示问答数量 默认 true
 * @event {Function} click-item 点击问题或答案时触发 (type: 'q' | 'a', item: GuideQaItem) => void
 * @event {Function} click-all 点击查看全部时触发 () => void
 * @example <ste-guide-qa :data="data"></ste-guide-qa>
 */
export default {
	group: '业务组件',
	title: 'GuideQA 引导服务区',
	name: 'ste-guide-qa',
	props: {
		// 问答数据列表
		data: {
			type: Array,
			default: () => [],
		},
		// 是否隐藏标题图标
		hideTitleIcon: {
			type: Boolean,
			default: false,
		},
		// 显示模式：'1' 简单模式，'2' 完整模式
		mode: {
			type: String,
			default: '1',
			validator: (value) => ['1', '2'].includes(value),
		},
		// 标题文本
		title: {
			type: String,
			default: '常见问题',
		},
		// 操作按钮文本
		actionTitle: {
			type: String,
			default: '全部',
		},
		// 是否显示问答数量
		showNum: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		compModeClass() {
			let classStr = '';

			if (this.mode === '1') {
				classStr += 'mode-1';
			} else {
				classStr += 'mode-2';
			}

			return classStr;
		},
	},
	methods: {
		handleActionClick() {
			/**
			 * 点击查看全部按钮时触发
			 */
			this.$emit('click-all');
		},

		handleItemClick(type, item) {
			/**
			 * 点击问题或答案时触发
			 * @param {string} type - 点击类型：'q' 问题，'a' 答案
			 * @param {object} item - 点击的数据项
			 */
			this.$emit('click-item', type, item);
		},
	},
};
</script>

<style lang="scss" scoped>
// 单行文本超出省略号
@mixin single-row-ellipsis {
	text-overflow: ellipsis; // 文本超出省略号
	overflow: hidden; // 超出部分隐藏
	white-space: nowrap; // 超出不换行
}

.ste-quide-qa-root {
	.qa-box {
		.title-box {
			margin-bottom: 24rpx;
			display: flex;
			align-items: center;
			.title {
				font-size: 32rpx;
				font-weight: bold;
				@include single-row-ellipsis;
				flex: 1;
			}

			.action {
				text-align: right;
				@include single-row-ellipsis;
				color: #858585;
				font-size: 28rpx;
				width: 108rpx;
			}
		}

		.show-box {
			.item {
				display: flex;
				align-items: flex-start;
				.item-icon {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 32rpx;
					min-height: 40rpx; // 设置最小高度，与文字首行高度匹配
					margin-right: 16rpx;
					flex-shrink: 0;
				}
				.item-text {
					font-size: 28rpx;
					line-height: 40rpx; // 设置行高，与图标容器高度匹配
					flex: 1;
				}

				&.question {
					.item-text {
						font-weight: bold;
					}
				}

				&.answer {
					color: #666666;
					margin-top: 16rpx;
				}
			}
		}

		&.mode-1 {
			background: #ffffff;
			border-radius: 16rpx;
			padding: 24rpx;
			font-size: 28rpx;
			.item-text {
				@include single-row-ellipsis;
			}
		}

		&.mode-2 {
			.show-box {
				background: #ffffff;
				border-radius: 16rpx;
				padding: 24rpx;
				margin-bottom: 16rpx;
				.item.question {
					.item-text {
						font-size: 32rpx;
					}
				}
			}
		}
	}
}
</style>
