<template>
	<view class="ste-table-checkbox-icon">
		<ste-icon
			code="&#xe6ae;"
			:color="iconColorConfig.disabled || selectionColor.disabled"
			:size="checkIconSize"
			v-if="disabled"
		/>
		<ste-icon
			code="&#xe6ac;"
			:color="iconColorConfig.readonly || selectionColor.readonly"
			:size="checkIconSize"
			v-else-if="readonly"
		/>
		<template v-else>
			<ste-icon
				code="&#xe6ac;"
				:color="iconColorConfig.main || selectionColor.main"
				:size="checkIconSize"
				v-if="checked"
			/>
			<ste-icon
				code="&#xe6af;"
				:color="iconColorConfig.unSelected || selectionColor.unSelected"
				:size="checkIconSize"
				v-else
			/>
		</template>
	</view>
</template>

<script>
import { selectionColorConfig } from '../ste-table/common';
export default {
	options: {
		virtualHost: true,
	},
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
		iconColorConfig: {
			type: Object,
			default: () => selectionColorConfig,
		},
	},
	data() {
		return {
			checkIconSize: 36,
			selectionColor: selectionColorConfig,
		};
	},
};
</script>

<style lang="scss" scoped></style>
