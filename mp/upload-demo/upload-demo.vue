<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="上传"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Upload 上传</view>
				<view class="cmp-desc">用于相册读取或拉起拍照的图片上传功能。</view>
			</view>
			<view class="type-block">
				<view>01 组件类型</view>
			</view>
			<view class="demo-item">
				<view class="title">基础用法</view>
				<ste-upload v-model="fileList" @read="onRead" />
			</view>

			<view class="demo-item">
				<view class="title">文件类型、多选</view>
				<ste-upload v-model="fileList1" accept="media" multiple />
			</view>
			<view class="demo-item">
				<view class="title">上传单张图片，隐藏删除按钮和全屏预览</view>
				<ste-upload v-model="fileList7" :maxCount="1" :deletable="false"></ste-upload>
			</view>
			<view class="demo-item">
				<view class="title">自定义上传图标，限制上传数量2</view>
				<ste-upload
					v-model="fileList2"
					uploadIcon="&#xe67e;"
					:maxCount="2"
					@open-preview="openPreview"
					@close-preview="closePreview"
				/>
			</view>
			<view class="demo-item">
				<view class="title">限制文件大小2M</view>
				<ste-upload v-model="fileList3" :maxSize="2048" />
			</view>
			<view class="type-block">
				<view>01 组件状态</view>
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
						<view class="item-preview">size:{{ item.size }}b</view>
					</template>
				</ste-upload>
			</view>

			<view class="demo-item">
				<view class="title">读取文件前置处理</view>
				<ste-upload @beforeRead="beforeRead" @read="onSuccessRead"></ste-upload>
			</view>
			<view class="demo-item">
				<view class="title">删除前置处理</view>
				<ste-upload v-model="fileList6" @beforeDelete="beforeDelete" @delete="onSuccessDelete"></ste-upload>
			</view>
		</view>
	</view>
</template>

<script>
function onUpload(v) {
	setTimeout(() => {
		v.forEach((item) => {
			item.status = 'success';
		});
	}, 1000);
}
export default {
	data() {
		return {
			fileList: [],
			fileList1: [],
			fileList2: [{ url: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' }],
			fileList3: [],
			fileList4: [],
			fileList5: [{ url: 'https://image.whzb.com/chain/StellarUI/bg1.jpg', type: 'image', size: 1234 }],
			fileList6: [],
			fileList7: [],
		};
	},
	watch: {
		fileList1(v) {
			onUpload(v);
		},
		fileList2(v) {
			onUpload(v);
		},
		fileList3(v) {
			onUpload(v);
		},
		fileList4(v) {
			onUpload(v);
		},
		fileList5(v) {
			onUpload(v);
		},
		fileList6(v) {
			onUpload(v);
		},
		fileList7(v) {
			onUpload(v);
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
		beforeRead(fileList, suspend, next, stop) {
			suspend();
			this.showToast({ title: 'suspend-read', icon: 'none' });
			setTimeout(() => {
				next();
			}, 2000);
		},
		onSuccessRead(fileList) {
			this.showToast({ title: 'success-read', icon: 'none' });
		},
		beforeDelete(index, suspend, next, stop) {
			suspend();
			this.showToast({ title: 'suspend-delete', icon: 'none' });
			setTimeout(() => {
				next();
			}, 2000);
		},
		onSuccessDelete(index, fileList) {
			this.showToast({ title: 'success-delete', icon: 'none' });
		},
		openPreview() {
			console.log('openPreview');
		},
		closePreview() {
			console.log('closePreview');
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
	.item-preview {
		position: absolute;
		z-index: 10;
		bottom: 0;
		left: 0;
		width: 100%;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.5);
		color: #fff;
	}
}
</style>
