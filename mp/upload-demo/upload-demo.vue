<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="上传"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-upload v-model="fileList" @read="onRead" />
			</view>
			<view class="demo-item">
				<view class="title">文件类型</view>
				<ste-upload v-model="fileList1" @read="onRead1" accept="media" />
			</view>
			<view class="demo-item">
				<view class="title">限制上传数量2</view>
				<ste-upload v-model="fileList2" :maxCount="2" />
			</view>
			<view class="demo-item">
				<view class="title">限制文件大小2M</view>
				<ste-upload v-model="fileList3" :maxSize="2048" />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			fileList: [],
			fileList1: [],
			fileList2: [{ url: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' }],
			fileList3: [],
		};
	},
	watch: {
		fileList2(v) {
			setTimeout(() => {
				v.forEach((item) => {
					item.status = 'success';
				});
			}, 1000);
		},
		fileList3(v) {
			v.forEach((item) => {
				item.status = 'success';
			});
		},
	},
	mounted() {
		const info = uni.getMenuButtonBoundingClientRect();
		console.log(info);
	},
	methods: {
		beforeRead(fileList, next) {
			next(false);
		},
		onRead(fileList) {
			setTimeout(() => {
				fileList.forEach((item) => {
					if (Math.random() > 0.5) {
						item.status = 'success';
					} else {
						item.status = 'error';
					}
				});
			}, 1000);
		},
		onDelete(i) {
			this.fileList.splice(i, 1);
		},
		onRead1(fileList) {
			setTimeout(() => {
				fileList.forEach((item) => {
					item.status = 'success';
				});
			}, 1000);
		},
		onDelete1(i) {
			this.fileList1.splice(i, 1);
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.item-rate {
		display: flex;
		flex-direction: column;

		text {
			font-size: 30rpx;
		}
	}
}
</style>
