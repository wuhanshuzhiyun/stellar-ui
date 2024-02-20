<template>
	<div class="ste-button" @click="click" :style="{ width: auto ? '100%' : 'auto' }">
		<div class="button_box" :class="[computedMode, computedType]" :style="[computedBtnCss]">
			<div class="inner-box" :style="{ marginTop: marginTop + 'rpx' }">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
import utils from '@/common/utils';
export default {
	group: '基础组件',
	name: 'ste-button',
	props: {
		mode: {
			type: String,
			default: 'small',
		},
		type: {
			type: String,
			default: 'normal',
		},
		color: {
			type: String,
			default: '',
		},
		backgroundColor: {
			type: String,
			default: '',
		},
		auto: {
			type: Boolean,
			default: false,
		},
		marginTop: {
			type: Number,
			default: 0,
		},
		fontWeight: {
			type: Number,
			default: 0,
		},
		borderRadius: {
			type: Number,
			default: 48,
		},
		// 是否使用皮肤 0 使用皮肤 1 自定义
		isTheme: {
			type: Number,
			default: 1,
		},
	},
	data() {
		return {
			version: '1.0',
		};
	},
	created() {},
	methods: {
		click(e) {
			if (this.computedType != 'disabled') {
				this.$emit('click', e);
			}
		},
	},
	computed: {
		computedMode() {
			console.log('modesss');
			if (!['mini', 'small', 'middle', 'large'].includes(this.mode)) {
				return 'small';
			} else {
				return this.mode;
			}
		},
		computedType() {
			if (!['normal', 'line', 'disabled'].includes(this.type)) {
				return 'normal';
			} else {
				return this.type;
			}
		},
		computedBtnCss() {
			let style = {};

			style.borderRadius = utils.addUnit(this.borderRadius);

			if (this.auto > 0) {
				style.display = 'flex';
			}

			// 暂不提供主题功能
			// if (this.isTheme == 0) {
			// 	style.backgroundImage = this.systemTheme.mainColorGradient;
			// 	style.backgroundColor = 'transparent';
			// 	style.color = this.color || '#FFFFFF';
			// } else {

			// }

			if (this.computedType == 'line') {
				style.borderColor = this.backgroundColor || '#0090FF';
				style.color = this.color || this.backgroundColor || '#0090FF';
			} else if (this.computedType == 'disabled') {
				style.backgroundColor = '#666666';
				style.color = '#FFFFFF';
			} else {
				if (this.backgroundColor.indexOf('linear-gradient') > -1) {
					style.backgroundImage = this.backgroundColor;
				} else {
					style.backgroundColor = this.backgroundColor || '#0090FF';
				}
				style.color = this.color || '#FFFFFF';
			}

			if (this.computedMode == 'middle' || this.computedMode == 'large') {
				style.fontWeight = this.fontWeight > 0 ? this.fontWeight : 'bold';
			}

			return style;
		},
		computedBtnInnerCss() {
			let style = {};
			if (this.width > 0) {
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-button {
	display: inline-block;
	.button_box {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		.inner-box {
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			text-align: center;
		}

		&.line {
			background-color: #ffffff;
			border: solid 2rpx;
		}

		&.mini {
			padding: 0 30rpx;
			height: 48rpx;
			font-size: 24rpx;
		}

		&.small {
			padding: 0 40rpx;
			height: 58rpx;
			font-size: 28rpx;
		}

		&.middle {
			padding: 0 72rpx;
			height: 80rpx;
			font-size: 32rpx;

			// font-weight: bold;
		}

		&.large {
			padding: 0 72rpx;
			height: 96rpx;
			font-size: 60rpx;
			// font-weight: bold;
		}
	}
}
</style>
