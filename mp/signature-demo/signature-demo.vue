<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="滑块"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-signature height="300" ref="signature1" />
				<ste-button @click="clear">清除</ste-button>
				<ste-button @click="upstep">上一步</ste-button>
				<ste-button @click="save">保存</ste-button>
			</view>
			<image v-if="base64" :src="base64" mode="widthFix" style="width: 100%"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			base64: '',
		};
	},
	methods: {
		clear() {
			this.$refs.signature1.clear();
		},
		upstep() {
			this.$refs.signature1.back();
		},
		save() {
			this.$refs.signature1.save((base64) => {
				this.base64 = base64;
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
			}
		}
	}
}
</style>
