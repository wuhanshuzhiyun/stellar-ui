<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="上传"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-upload v-model="fileList" @read="onRead" />
			</view>

			<view class="demo-item">
				<view class="title">文件类型、多选</view>
				<ste-upload v-model="fileList1" @read="onRead1" accept="media" multiple />
			</view>
			<view class="demo-item">
				<view class="title">限制上传数量2</view>
				<ste-upload v-model="fileList2" :maxCount="2" />
			</view>
			<view class="demo-item">
				<view class="title">限制文件大小2M</view>
				<ste-upload v-model="fileList3" :maxSize="2048" />
			</view>
			<view class="demo-item">
				<view class="title">自定义上传样式</view>
				<ste-upload v-model="fileList4">
					<button type="primary" size="mini" style="padding: 0 10px">上传文件</button>
				</ste-upload>
			</view>
			<view class="demo-item">
				<view class="title">自定义预览图层</view>
				<ste-upload v-model="fileList5">
					<template v-slot:preview-cover="{ item }">
						<view
							style="
								color: #000;
								font-size: 24rpx;
								background-color: rgba(255, 255, 255, 0.8);
								position: absolute;
								width: 100%;
								bottom: 0;
								text-align: center;
							"
						>
							size:{{ item.size }}b
						</view>
					</template>
				</ste-upload>
			</view>
			<view class="demo-item">
				<view class="title">上传、删除前置处理</view>
				<ste-upload @beforeRead="beforeRead"></ste-upload>
			</view>
			<view class="demo-item">
				<view class="title">删除前置处理</view>
				<ste-upload v-model="fileList6" @beforeDelete="beforeDelete"></ste-upload>
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
			fileList2: [{ url: 'https://image.whzb.com/chain/StellarUI/bg1.jpg', type: 'image' }],
			fileList3: [],
			fileList4: [],
			fileList5: [{ url: 'https://image.whzb.com/chain/StellarUI/bg1.jpg', type: 'image', size: 1234 }],
			fileList6: [],
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
			setTimeout(() => {
				v.forEach((item) => {
					item.status = 'success';
				});
			}, 1000);
		},
		fileList4(v) {
			setTimeout(() => {
				v.forEach((item) => {
					item.status = 'success';
				});
			}, 1000);
		},
		fileList5(v) {
			setTimeout(() => {
				v.forEach((item) => {
					item.status = 'success';
				});
			}, 1000);
		},
		fileList6(v) {
			setTimeout(() => {
				v.forEach((item) => {
					item.status = 'success';
				});
			}, 1000);
		},
	},
	methods: {
		onRead(fileList) {
			setTimeout(() => {
				fileList.forEach((item) => {
					if (Math.random() > 0.5) {
						item.status = 'success';
					} else {
						item.status = 'error';
					}
				});
			}, 10000);
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
		beforeRead(fileList, next) {
			uni.showToast({
				title: '阻止上传',
				icon: 'none',
			});
			next(false);
		},
		beforeDelete(index, next) {
			uni.showToast({
				title: '阻止删除',
				icon: 'none',
			});
			next(false);
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
