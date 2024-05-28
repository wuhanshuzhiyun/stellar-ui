<template>
	<view class="ste-upload-root" :style="[cmpRootStyle]">
		<view class="upload-list">
			<block v-if="previewImage">
				<view class="image-item" v-for="(item, index) in dataValue" :key="index">
					<image
						class="image"
						:src="item.thumbPath || item.url || item.path"
						mode="aspectFit"
						@click="previewItem(index, item)"
					/>
					<view class="uploading" v-if="item.status === 'uploading'">
						<view class="icon"><ste-icon code="&#xe69f;" size="48" color="#fff" /></view>
						<view class="text">上传中</view>
					</view>
					<view class="error" v-if="item.status === 'error'">
						<view class="icon"><ste-icon code="&#xe6a0;" size="48" color="#fff" /></view>
						<view class="text">上传失败</view>
					</view>
					<view class="delete" v-if="deletable && item.status !== 'uploading'" @click.stop="deleteItem(index)">
						<view class="icon">
							<ste-icon code="&#xe67b;" size="20" color="#fff" />
						</view>
					</view>
					<block v-if="!item.status || item.status === 'success'">
						<slot name="preview-cover" :item="item"></slot>
					</block>
				</view>
			</block>
			<view class="add-file" v-if="cmpShowUpload" @click="selectFile">
				<slot>
					<view class="image-item add-file">
						<view class="upload-btn">
							<ste-icon :code="uploadIcon" :size="60" color="#ddd"></ste-icon>
							<view class="upload-text">{{ uploadText }}</view>
						</view>
						<!-- #ifdef MP-ALIPAY -->
						<view class="delete" v-if="accept === 'media'" @click.stop="setMediaType">
							<view class="icon">
								<view :class="{ video: mediaType === 'video' }">
									<ste-icon :code="mediaType === 'video' ? '&#xe6a1;' : '&#xe69b;'" size="20" color="#fff" />
								</view>
							</view>
						</view>
						<!-- #endif -->
					</view>
				</slot>
			</view>
		</view>
		<ste-media-preview
			:show="previewIndex || previewIndex === 0"
			:urls="cmpPreviewList"
			:index.sync="previewIndex"
			@close="previewIndex = null"
		/>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { readMediaFile, readFile } from './ReadFile.js';
/**
 * ste-upload 文件上传
 * @description 文件上传组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-ste-upload
 * @property {Array} 	value  已经上传的文件列表 {url:string;type:string;name?:string;status?:"uploading"|"error"|"success";path?:string;thumbPath?:string}[]
 * @property {String} accept 文件类型, 可选值为all media image file video
 * @value image 图片类型（默认）
 * @value video 视频类型
 * @value media 媒体类型（可选择图片和视频）
 * @value file 从聊天记录中选取图片视频之外的文件类型（仅微信小程序生效）
 * @value all 从聊天记录中选取全部类型文件（仅微信小程序和H5生效）
 * @property {Array} capture 图片或者视频选取模式，当accept为image | media 类型时生效 类型：("album" | "camera")[]
 * @property {String} camera 相机类型 当 accept 为 image | video | media 时生效，可选值为 back-后置 front-前置
 * @value back 后置（默认）
 * @value front 前置
 * @property {Boolean} compressed 当 accept 为 image | video | media 时生效，是否压缩视频、图片默认为true
 * @property {Number} maxDuration 当 accept 为 video | media 时生效，拍摄视频最长拍摄时间，单位秒
 * @property {Number | String} previewWidth 预览图和上传区域的宽度，单位为rpx
 * @property {Number | String} previewHeight 预览图和上传区域的高度，单位为rpx
 * @property {Boolean} previewImage 是否在上传完成后展示预览图
 * @property {Boolean} previewFullImage 是否在点击预览图后展示全屏图片预览
 * @property {Boolean} multiple 是否支持多选文件，部分安卓机型不支持
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} showUpload 是否展示文件上传按钮
 * @property {Boolean} deletable 是否展示删除文件按钮
 * @property {Number} maxSize 文件大小限制，单位为kb，0为不限制
 * @property {Number} maxCount 最大上传文件数量,默认为9
 * @property {String} uploadIcon 上传按钮图标,同icon组件code
 * @property {String} uploadText 上传按钮文字
 * @property {Number | String} radius 圆角弧度，单位rpx
 * @event {Function} beforeRead 文件读取前的触发
 * @event {Function} read 文件读取后的回调函数
 * @event {Function} oversize 文件大小超出限制的回调函数
 * @event {Function} beforeDelete 文件删除前的回调函数
 * @event {Function} delete 文件删除后的回调函数
 * */
export default {
	group: '表单组件',
	title: 'Upload 上传',
	name: 'ste-upload',
	props: {
		/**
		 * 已上传的文件列表
		 * @type {{url:string;name?:string;type?:string;status?:"uploading"|"error"|"success";path?:string}[]}
		 */
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
			type: Array,
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
			default: () => 200,
		},
		// 预览图和上传区域的高度，默认单位为rpx
		previewHeight: {
			type: [String, Number],
			default: () => 200,
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

		// 文件大小限制，单位为kb，0为不限制
		maxSize: {
			type: Number,
			default: () => 0,
		},
		// 文件上传数量限制,0为不限制
		maxCount: {
			type: Number,
			default: () => 9,
		},

		// 上传区域图标，可选值见 Icon 组件
		uploadIcon: {
			type: String,
			default: () => '&#xe69b;',
		},
		// 上传区域文字提示
		uploadText: {
			type: String,
			default: () => '点击上传',
		},
		// 圆角弧度
		radius: {
			type: [String, Number],
			default: () => 9,
		},
	},
	data() {
		return {
			dataValue: [],
			previewIndex: null,
			// #ifdef MP-ALIPAY
			mediaType: 'image',
			// #endif
			menuButtonBounding: null,
			reading: null,
			deleting: null,
		};
	},
	computed: {
		cmpRootStyle() {
			const style = {
				'--ste-upload-width': utils.formatPx(this.previewWidth),
				'--ste-upload-height': utils.formatPx(this.previewHeight),
				'--ste-upload-radius': utils.formatPx(this.radius),
			};
			return style;
		},
		cmpShowUpload() {
			let bool = this.showUpload && (this.maxCount == 0 || this.dataValue.length < this.maxCount);
			return bool;
		},
		cmpPreviewList() {
			return this.dataValue
				.filter((item) => ['video', 'image'].indexOf(item.type) !== -1)
				.map((item) => item.thumbPath || item.url || item.path);
		},
	},
	watch: {
		value: {
			handler(val) {
				if (this.maxCount > 0 && val.length > this.maxCount) {
					this.dataValue = [...val].splice(this.maxCount);
				} else {
					this.dataValue = [...val];
				}
			},
			immediate: true,
		},
	},
	methods: {
		selectFile() {
			if (this.disabled) return;
			let accept = this.accept, // 文件类型, 可选值为all media image file video
				capture = this.capture, //  图片或者视频选取模式，当accept为image | media 类型时设置capture可选值为camera可以直接调起摄像头
				camera = this.camera, // 相机类型 当 accept 为 image | video | media 时生效，可选值为 back-后置 front-前置
				compressed = this.compressed, // 是否压缩
				maxDuration = this.maxDuration, // 录制时长
				multiple = this.multiple,
				maxCount = this.maxCount;
			let count = 1;
			if (multiple) {
				if (maxCount === 0) {
					count = 9;
				} else {
					count = maxCount - this.dataValue.length > 9 ? 9 : maxCount - this.dataValue.length;
				}
			}
			if (count === 0) return;
			// #ifdef MP-ALIPAY
			if (accept === 'media') {
				accept = this.mediaType;
			}
			// #endif
			if (['image', 'video', 'media'].indexOf(accept) >= 0) {
				readMediaFile({
					accept,
					capture,
					camera,
					compressed,
					maxDuration,
					multiple,
					count,
				}).then((fileList) => {
					this.readNext(fileList);
				});
			} else {
				readFile(accept, count, multiple).then((fileList) => {
					this.readNext(fileList);
				});
			}
		},

		async readNext(fileList) {
			if (this.reading) return;
			this.reading = true;
			let next = true;
			const stop = new Promise((resolve, reject) => {
				this.$emit(
					'beforeRead',
					fileList,
					() => (next = false),
					() => resolve(),
					() => reject()
				);
			});
			if (!next) {
				try {
					await stop;
				} catch (e) {
					this.reading = false;
					return;
				}
			}
			this.reading = false;
			if (this.maxSize > 0) {
				for (let item of fileList) {
					if (item.size / 1024 > this.maxSize) {
						console.error(`文件大小${Math.floor(item.size / 1024)}kb超过${this.maxSize}kb限制`);
						this.$emit('oversize', item, fileList);
						return;
					}
				}
			}
			fileList.forEach((item) => (item.status = 'uploading'));
			if (this.dataValue.length + fileList.length > this.maxCount) {
				fileList.splice(this.maxCount - this.dataValue.length);
			}
			this.dataValue = this.dataValue.concat(fileList);
			this.$emit('input', this.dataValue);
			this.$emit('read', fileList);
		},
		async deleteItem(index) {
			if (this.disabled) return;
			if (this.deleting) return;
			this.deleting = true;
			let next = true;
			const stop = new Promise((resolve, reject) => {
				this.$emit(
					'beforeDelete',
					index,
					() => (next = false),
					() => resolve(),
					() => reject()
				);
			});
			if (!next) {
				try {
					await stop;
				} catch (e) {
					//TODO handle the exception
					this.deleting = false;
					return;
				}
			}
			this.deleting = false;
			this.dataValue.splice(index, 1);
			this.$emit('input', this.dataValue);
			this.$emit('delete', index, this.dataValue);
		},
		previewItem(index, item) {
			if (this.disabled) return;
			if (!this.previewFullImage) return;
			if (['video', 'image'].indexOf(item.type) === -1) return;
			this.previewIndex = index;
		},
		// #ifdef MP-ALIPAY
		setMediaType() {
			this.mediaType = this.mediaType === 'image' ? 'video' : 'image';
		},
		// #endif
	},
};
</script>

<style lang="scss" scoped>
@keyframes ste-upload-rotate {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
.ste-upload-root {
	.image {
		width: 100%;
		height: 100%;
		max-width: 100%;
		max-height: 100%;
	}
	.upload-list {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;

		.image-item {
			width: var(--ste-upload-width);
			height: var(--ste-upload-height);
			border-radius: var(--ste-upload-radius);
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 18rpx;
			margin-right: 18rpx;
			position: relative;
			background: #f7f7f7;
			overflow: hidden;

			&.add-file {
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
				.icon {
					.video {
						transform: rotateZ(-90deg);
					}
				}
			}
			.uploading,
			.error {
				position: absolute;
				z-index: 5;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.45);
				color: #fff;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;

				.icon {
					width: 48rpx;
					height: 48rpx;
					display: flex;
					align-items: center;
					text-align: center;
				}
				.text {
					margin-top: 16rpx;
					font-size: 28rpx;
					line-height: 40rpx;
				}
			}

			.uploading .icon {
				animation: ste-upload-rotate 1s linear infinite;
			}
			.delete {
				position: absolute;
				z-index: 10;
				width: 90rpx;
				height: 90rpx;
				background-color: rgba(0, 0, 0, 0.7);
				color: #fff;
				font-size: 12rpx;
				top: -45rpx;
				right: -45rpx;
				border-radius: 50%;
				.icon {
					position: absolute;
					left: 16rpx;
					bottom: 16rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
}
</style>
