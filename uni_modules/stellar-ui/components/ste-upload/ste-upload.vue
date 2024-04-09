<template>
	<view class="ste-upload--root" :style="[cmpRootStyle]">
		<view class="image-item" v-for="(item, index) in dataValue" :key="index">
			<ste-image :src="item.url" />
		</view>
		<view class="image-item btn" v-if="cmpShowUpload" @click="selectFile">
			<slot>
				<view class="upload-btn">
					<ste-icon :code="uploadIcon" :size="60" color="#ddd"></ste-icon>
					<view class="upload-text">{{ uploadText }}</view>
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
export default {
	group: '表单组件',
	title: 'Upload 上传',
	name: 'ste-upload',
	props: {
		// 已上传的文件列表: {url:string;name:string;type:string;status:string;message:string;}[]
		value: {
			type: Array,
			default: () => [],
		},
		// 接受的文件类型, 可选值为all media image file video
		accept: {
			type: String,
			default: () => 'image',
		},
		// 图片或者视频选取模式，当accept为image | media 类型时设置capture可选值为camera可以直接调起摄像头
		capture: {
			type: [Array, String],
			default: () => ['album', 'camera'],
		},
		// 相机类型 当 accept 为 image | video | media 时生效，可选值为 back-后置 front-前置
		camera: {
			type: String,
			default: () => 'back',
		},
		// 当 accept 为 image | video | media 时生效，是否压缩视频、图片默认为true
		compressed: {
			type: Boolean,
			default: () => true,
		},
		// 当 accept 为 video | media 时生效，拍摄视频最长拍摄时间，单位秒
		maxDuration: {
			type: Number,
			default: () => 60,
		},
		// 预览图和上传区域的宽度，默认单位为rpx
		previewWidth: {
			type: [String, Number],
			default: () => 160,
		},
		// 预览图和上传区域的高度，默认单位为rpx
		previewHeight: {
			type: [String, Number],
			default: () => 160,
		},
		// 是否在上传完成后展示预览图
		previewImage: {
			type: Boolean,
			default: () => true,
		},
		// 是否在点击预览图后展示全屏图片预览
		previewFullImage: {
			type: Boolean,
			default: () => true,
		},
		// 是否开启图片多选，部分安卓机型不支持
		multiple: {
			type: Boolean,
			default: () => false,
		},
		// 是否禁用文件上传
		disabled: {
			type: Boolean,
			default: () => false,
		},
		// 是否展示文件上传按钮
		showUpload: {
			type: Boolean,
			default: () => true,
		},
		// 是否展示删除按钮
		deletable: {
			type: Boolean,
			default: () => true,
		},

		// 文件大小限制，单位为byte，0为不限制
		maxSize: {
			type: Number,
			default: () => 0,
		},
		// 文件上传数量限制,0为不限制
		maxCount: {
			type: Number,
			default: () => 100,
		},

		// 上传区域图标，可选值见 Icon 组件
		uploadIcon: {
			type: String,
			default: () => '&#xe693;',
		},
		// 上传区域文字提示
		uploadText: {
			type: String,
			default: () => '上传图片',
		},
		// 圆角弧度
		radius: {
			type: [String, Number],
			default: () => 8,
		},
	},
	data() {
		return {
			dataValue: [],
		};
	},
	computed: {
		cmpRootStyle() {
			const style = {
				'--ste-upload-width': utils.rpx2px(this.previewWidth),
				'--ste-upload-height': utils.rpx2px(this.previewHeight),
				'--ste-upload-radius': utils.rpx2px(this.radius),
			};
			return style;
		},
		cmpShowUpload() {
			let bool = this.showUpload && (this.maxCount == 0 || this.dataValue.length < this.maxCount);
			return bool;
		},
	},
	watch: {
		value: {
			handler(val) {
				this.dataValue = val || [];
			},
			immediate: true,
		},
	},
	methods: {
		selectFile() {
			// #ifdef MP-WEIXIN
			this.wxSelectFile();
			// #endif
			// #ifdef MP-ALIPAY
			this.aliSelectFile();
			// #endif
		},
		wxSelectFile() {
			const accept = this.accept, // 文件类型, 可选值为all media image file video
				capture = this.capture, //  图片或者视频选取模式，当accept为image | media 类型时设置capture可选值为camera可以直接调起摄像头
				camera = this.camera, // 相机类型 当 accept 为 image | video | media 时生效，可选值为 back-后置 front-前置
				compressed = this.compressed, // 是否压缩
				maxDuration = this.maxDuration, // 录制时长
				multiple = this.multiple,
				maxCount = this.maxCount,
				maxSize = this.maxSize;
			let count = 1;
			if (multiple) {
				count = maxCount - this.dataValue.length > 9 ? 9 : maxCount - this.dataValue.length;
			}
			if (['media', 'image', 'video'].indexOf(accept) >= 0) {
				wx.chooseMedia({
					count,
					mediaType: accept === 'media' ? ['video', 'image'] : [accept],
					sourceType: capture,
					camera: camera,
					sizeType: [compressed ? 'compressed' : 'original'],
					maxDuration,
					success: async ({ tempFiles }) => {
						const result = tempFiles.map((item) => {
							return {
								name: null,
								size: item.size,
								path: item.tempFilePath,
								type: item.fileType,
							};
						});
						this.readNext(result);
					},
					fail: (err) => {},
				});
			} else {
				wx.chooseMessageFile({
					type: accept,
					count,
					success: ({ tempFiles }) => {
						this.readNext(tempFiles);
					},
					fail: (err) => {},
				});
			}
		},
		aliSelectFile() {
			const accept = this.accept, // 文件类型, 可选值为all media image file video
				capture = this.capture, //  图片或者视频选取模式，当accept为image | media 类型时设置capture可选值为camera可以直接调起摄像头
				camera = this.camera, // 相机类型 当 accept 为 image | video | media 时生效，可选值为 back-后置 front-前置
				compressed = this.compressed, // 是否压缩
				maxDuration = this.maxDuration, // 录制时长
				multiple = this.multiple,
				maxCount = this.maxCount,
				maxSize = this.maxSize;
			let count = 1;
			if (multiple) {
				count = maxCount - this.dataValue.length > 9 ? 9 : maxCount - this.dataValue.length;
			}
		},
		readNext(fileList) {
			let next = true;
			this.$emit('before-read', fileList, (bool) => (next = bool));
			if (!next) return;
			this.$emit('read', fileList);
		},
		deleteNext(index) {
			let next = true;
			this.$emit('before-delete', index, (bool) => (next = bool));
			if (!next) return;
			this.$emit('delete', index);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-upload--root {
	.image-item {
		width: var(--ste-upload-width);
		height: var(--ste-upload-height);
		border-radius: var(--ste-upload-radius);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 12rpx;
		margin-right: 12rpx;

		&.btn {
			background: #fafafa;
			.upload-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				.upload-text {
					color: #ccc;
					font-size: 24rpx;
				}
			}
		}
	}
}
</style>
