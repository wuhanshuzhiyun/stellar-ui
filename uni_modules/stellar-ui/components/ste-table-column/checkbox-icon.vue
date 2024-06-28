<template>
	<view class="ste-table-checkbox-icon">
		<ste-icon code="&#xe6ae;" color="#E6E6E6" size="32" v-if="disabled" />
		<ste-icon code="&#xe6ac;" color="rgba(52, 145, 250, 0.4)" size="32" v-else-if="readonly" />
		<template v-else>
			<ste-icon code="&#xe6ac;" color="#3491FA" size="32" v-if="checked" />
			<ste-icon code="&#xe6af;" color="#BBBBBB" size="32" v-else />
		</template>
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
		readonly: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
