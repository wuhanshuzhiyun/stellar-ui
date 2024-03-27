<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="复选框"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-checkbox v-model="value1">复选框</ste-checkbox>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">禁用</view>
				<view class="item-block checkbox-box">
					<ste-checkbox v-model="value2" disabled>复选框1</ste-checkbox>
					<ste-checkbox v-model="value3" disabled>复选框2</ste-checkbox>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">只读</view>
				<view class="item-block checkbox-box">
					<ste-checkbox v-model="value4" readonly>复选框1</ste-checkbox>
					<ste-checkbox v-model="value5" readonly>复选框2</ste-checkbox>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义形状</view>
				<view class="item-block checkbox-box">
					<ste-checkbox v-model="value6">圆形</ste-checkbox>
					<ste-checkbox v-model="value7" shape="square">方形</ste-checkbox>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义图标大小</view>
				<view class="item-block checkbox-box">
					<ste-checkbox v-model="value11" iconSize="60">60rpx</ste-checkbox>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义图标颜色</view>
				<view class="item-block checkbox-box">
					<ste-checkbox v-model="value12" checkedColor="#ee0a24">红色</ste-checkbox>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义图标</view>
				<view class="item-block checkbox-box">
					<ste-checkbox v-model="value13">
						<template #icon="{ slotProps }">
							<ste-icon
								code="&#xe677;"
								size="50"
								:color="slotProps.checked ? '#ee0a24' : '#000000'"
							></ste-icon>
						</template>
						自定义图标
					</ste-checkbox>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">文本的位置</view>
				<view class="item-block checkbox-box">
					<ste-checkbox v-model="value8">右边</ste-checkbox>
					<ste-checkbox v-model="value9" textPosition="left">左边</ste-checkbox>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义文本</view>
				<view class="item-block checkbox-box">
					<ste-checkbox v-model="value14" textSize="50" textInactiveColor="green" textActiveColor="#d276a3">
						复选框
					</ste-checkbox>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">禁用文本点击</view>
				<view class="item-block checkbox-box">
					<ste-checkbox v-model="value15" textDisabled>复选框</ste-checkbox>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			value1: false,
			value2: true,
			value3: false,
			value4: true,
			value5: false,
			value6: true,
			value7: true,
			value8: false,
			value9: false,
			value10: false,
			value11: true,
			value12: true,
			value13: false,
			value14: false,
			value15: false,
		};
	},
	created() {},
	methods: {
		click(value) {
			console.log('value', value);
		},
		change(value) {},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.checkbox-box {
		flex-direction: column !important;
		row-gap: 20rpx;
		align-items: flex-start !important;
		justify-content: center;
	}
}
</style>
