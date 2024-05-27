<template>
	<view class="ste-read-more-root">
		<view class="content-box" :style="[cmpContentStyle]">
			<view class="content">
				<slot></slot>
			</view>
		</view>
		<view class="action-box" :style="[cmpActionStyle]" v-if="cmpShowAction">
			<view @click="handleToggleStatus">{{ open ? openText : closeText }}</view>
			<ste-icon :code="open ? '&#xe678;' : '&#xe676;'" size="28" marginBottom="3"></ste-icon>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
export default {
	group: '展示组件',
	title: 'ReadMore 阅读更多',
	name: 'ste-read-more',
	props: {
		showHeight: {
			type: [String, Number],
			default: 400,
		},
		// 展开后是否显示收起按钮
		toggle: {
			type: Boolean,
			default: false,
		},
		closeText: {
			type: String,
			default: '展开阅读全文',
		},
		openText: {
			type: String,
			default: '收起',
		},
		fontSize: {
			type: [String, Number],
			default: 28,
		},
		color: {
			type: String,
			default: '#666666',
		},
	},
	data() {
		return {
			open: false,
			showToggle: false,
		};
	},
	watch: {},
	computed: {
		cmpContentStyle() {
			let style = {};
			if (this.showToggle) {
				style.height = this.open ? 'auto' : utils.addUnit(this.showHeight);
			}

			return style;
		},
		cmpActionStyle() {
			let style = {
				color: this.color,
				fontSize: utils.addUnit(this.fontSize),
				background: this.open
					? ''
					: 'linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 80%)',
			};
			return style;
		},
		cmpShowAction() {
			let show = true;
			if (!this.showToggle) {
				show = false;
			}

			if (this.open && !this.toggle) {
				show = false;
			}

			return show;
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			utils.sleep(200).then(() => {
				utils.querySelector('.content', this).then((rect) => {
					this.showToggle = parseInt(rect.height) > parseInt(utils.formatPx(this.showHeight));
				});
			});
		},
		handleToggleStatus() {
			this.open = !this.open;
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-read-more-root {
	.content-box {
		overflow: hidden;
	}

	.action-box {
		display: flex;
		justify-content: center;
		align-items: center;

		position: relative;
		padding-top: 200rpx;
		margin-top: -200rpx;
		margin-bottom: 20rpx;

		text {
			cursor: pointer;
			font-size: 28rpx;
			margin-right: 16rpx;
		}
	}
}
</style>
