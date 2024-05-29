<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="文本"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础使用</view>
				<view class="item-block">
					<view>
						<ste-code-input
							v-model="value1"
							:maxlength="4"
							@change="change"
							@finish="finish"
						></ste-code-input>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">横线模式</view>
				<view class="item-block">
					<view>
						<ste-code-input v-model="value2" mode="line" :maxlength="4" :bold="true"></ste-code-input>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">设置长度</view>
				<view class="item-block">
					<view>
						<ste-code-input v-model="value3" :maxlength="5"></ste-code-input>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">设置间距</view>
				<view class="item-block">
					<view>
						<ste-code-input v-model="value4" mode="box" :space="0" :maxlength="4"></ste-code-input>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">调整颜色</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-code-input
							v-model="value7"
							mode="box"
							:space="0"
							:maxlength="4"
							fontColor="#f56c6c"
							borderColor="#f56c6c"
						></ste-code-input>
					</view>
					<view style="width: 100%">
						<ste-code-input
							v-model="value10"
							mode="line"
							:maxlength="4"
							fontColor="#3c9cff"
							borderColor="#3c9cff"
						></ste-code-input>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义显示</view>
				<view class="item-block">
					<view style="width: 100%">
						<ste-code-input
							v-model="value8"
							mode="box"
							formatter="·"
							fontSize="100"
							:space="0"
							:maxlength="4"
						></ste-code-input>
					</view>
					<view style="width: 100%">
						<ste-code-input
							v-model="value11"
							mode="box"
							formatter="*"
							:space="0"
							:maxlength="4"
						></ste-code-input>
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">预置内容</view>
				<view class="item-block">
					<view>
						<ste-code-input v-model="value9" mode="box" :space="0" :maxlength="4"></ste-code-input>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			value1: '',
			value2: '',
			value3: '',
			value4: '',
			value5: '',
			value6: '',
			value7: '',
			value8: '',
			value9: '123',
			value10: '34',
			value11: '',
		};
	},
	created() {},
	methods: {
		change(e) {
			console.log('change', e);
		},
		finish(e) {
			console.log('finish', e);
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				> view {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
