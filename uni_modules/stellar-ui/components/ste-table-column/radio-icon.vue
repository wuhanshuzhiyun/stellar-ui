<template>
	<view class="radio-icon-root" :class="[cmpRootClass]">
		<view class="icon-1"></view>
	</view>
</template>

<script>
export default {
	props: {
		checked: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {};
	},
	computed: {
		cmpRootClass() {
			let classArr = [];
			if (this.checked) {
				classArr.push('checked');
			}
			if (this.disabled) {
				classArr.push('disabled');
			}

			return classArr.join(' ');
		},
	},
};
</script>

<style lang="scss" scoped>
$default-color: #3491fa;
.radio-icon-root {
	width: 32rpx;
	height: 32rpx;

	border-radius: 50%;
	border: 2rpx solid #dddddd;
	position: relative;

	&.checked {
		border: none;
		background-color: rgba(52, 145, 250, 0.2);
		.icon-1 {
			background-color: rgba(52, 145, 250, 1);
		}
	}
	&.disabled {
		border: none;
		background-color: #e6e6e6;
	}
	.icon-1 {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;

		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
