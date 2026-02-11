<template>
	<view class="update-mask flex-center" v-if="open">
		<view class="update-content">
			<image class="update-image" src="../../static/app_update_img.png"></image>

			<view class="update-title">发现新版本</view>
			<view class="update-version">v{{ data.name }}</view>
			<scroll-view scroll-y class="update-desc">
				<view class="update-desc-title">更新内容</view>
				<view class="update-desc-message"><rich-text :nodes="data.content"></rich-text></view>
			</scroll-view>
			<view class="update-footer">
				<view class="update-progress-box" v-if="!updateBtn">
					<progress class="update-progress" border-radius="35" :percent="percent" activeColor="#3DA7FF" show-info stroke-width="10" />
					<view>
						<text class="update-down-msg" v-if="tempFilePath">下载完成</text>
						<text class="update-down-msg" v-else>正在下载，请稍后 ({{ downloadedSize }}/{{ packageFileSize }}M)</text>
					</view>
				</view>
				<button class="update-button" plain @click="confirm" v-if="updateBtn">{{ btnText }}</button>
				<button class="update-button" plain @click="install" v-else-if="data.package_type === 0 && tempFilePath">安装</button>
			</view>

			<view class="update-close" v-if="!data.isForce" @click.stop="close">✖</view>
		</view>
	</view>
</template>
<script>
import { download } from './method';

export default {
	group: '业务组件',
	title: 'AppUpdate APP更新',
	name: 'SteAppUpdate',
	props: {
		/** 应用编码 */
		clientId: {
			type: String,
			default: '',
		},
		/** 应用密钥 */
		clientSecret: {
			type: String,
			default: '',
		},
		/** API地址 */
		apiUrl: {
			type: String,
			default: 'https://zboa.whzb.com/inte-cloud-dev/blade-system/api/inte/client/ver/currentDetail',
		},
		/** APP环境,版本号的最后一位为环境标识 */
		appType: {
			type: String,
			default: '',
		},
		/** 立即体验按钮文本 */
		btnText: {
			type: String,
			default: '立即体验',
		},
		appVersion: {
			type: String,
		},
	},
	data() {
		return {
			data: {
				content: '',
				updateFile: '', //安装包
				isForce: false, //是否强制更新 0代表否 1代表是
				package_type: 0, //0 是整包升级 1是wgt升级
				name: '1.0.1', // 版本名称
				code: '100', // 版本号
			},
			open: false,
			version: uni.getSystemInfoSync().version,
			percent: 0,
			updateBtn: true,
			downloadedSize: '0',
			packageFileSize: '0',
			tempFilePath: '',
		};
	},
	methods: {
		getData(callback) {
			uni.request({
				url: this.apiUrl,
				method: 'GET',
				header: {
					Authorization: `Basic ${btoa(this.clientId + ':' + this.clientSecret)}`,
				},
				success: (res) => {
					const _data = res.data;
					if (_data.code == 200) {
						this.data.code = _data.data.code;
						this.data.name = _data.data.name;

						this.data.content = (_data.data.desc || '').replace(/\n+/g, '<br />');

						this.data.isForce = _data.data.isForce;
						this.data.updateFile = _data.data.entireFile ? _data.data.entireFile : _data.data.updateFile;
						this.data.package_type = _data.data.entireFile ? 0 : 1;
						callback && callback({ code: _data.data.code, name: _data.data.name, updateFile: this.data.updateFile }, this.version);
						if (this.appType) {
							const nvs = this.data.name.split('.');
							// 版本号的最后一位是环境，比较版本号最后一位版本号是否一致，不一致弹错误窗口提示
							const nevn = nvs[nvs.length - 1];
							if (this.appType !== nevn) {
								uni.showModal({
									title: '提示',
									content: `新版本环境：${nevn}和当前环境${this.appType}不一致`,
									showCancel: false,
								});
								return;
							}
							nvs.splice(nvs.length - 1);
							this.data.name = nvs.join('.');
						}
						if (this.data.updateFile && this.data.code !== this.version) {
							this.open = true;
							this.$emit('update');
							// 如果是强制更新，直接开始下载
							if (this.data.isForce) this.confirm();
							return;
						}
					} else {
						console.log(_data.msg);
					}
					// 无需升级
					this.$emit('no-update');
				},
				fail: (err) => {
					console.log('err===========', err);
					this.$emit('no-update');
				},
			});
		},

		start(callback) {
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid || '', (inf) => {
				this.version = inf.version || '';
				if (this.appVersion) {
					this.version = this.appVersion;
				}
				this.getData(callback);
			});
			// #endif
			// #ifndef APP-PLUS
			if (this.appVersion) {
				this.version = this.appVersion;
			}
			this.getData(callback);
			// #endif
		},

		onProgressUpdate(res) {
			this.percent = res.progress;
			this.downloadedSize = (res.totalBytesWritten / Math.pow(1024, 2)).toFixed(2);
			this.packageFileSize = (res.totalBytesExpectedToWrite / Math.pow(1024, 2)).toFixed(2);
		},

		confirm() {
			if (this.data.package_type == 0) {
				//apk整包升级 下载地址必须以.apk结尾
				if (this.data.updateFile.includes('.apk')) {
					this.updateBtn = false;
					download(this.data, {
						onProgressUpdate: this.onProgressUpdate,
						downloadSuccess: (path) => (this.tempFilePath = path),
					});
				} else {
					//外部下载 一般是手机应用市场或者其他h5页面
					plus.runtime.openURL(this.data.updateFile);
					uni.navigateBack({
						delta: 1,
					});
				}
			} else {
				this.updateBtn = false;
				//wgt资源包升级 下载地址必须以.wgt结尾
				download(this.data, {
					onProgressUpdate: this.onProgressUpdate,
					downloadSuccess: (path) => (this.tempFilePath = path),
				});
			}
		},

		close() {
			this.open = false;
			this.$emit('cancel');
		},

		install() {
			plus.runtime.install(
				this.tempFilePath,
				{ force: true },
				() => {
					// wgt升级
					if (this.data.package_type == 1) {
						uni.showModal({
							title: '提示',
							content: '升级成功，请重新启动！',
							confirmText: '确定',
							showCancel: false,
							success: () => {
								plus.runtime.restart();
							},
						});
					}
				},
				(e) => {
					//提示部分wgt包无法安装的问题
					uni.showModal({
						title: '提示',
						content: e.message,
						showCancel: false,
						success: () => {},
					});
				}
			);
		},
	},
};
</script>

<style lang="scss" scoped>
.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}

.update-mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999999;
	.update-content {
		width: 694rpx;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 72rpx 40rpx 40rpx 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: 1.5;
		position: relative;
		.update-image {
			width: 201rpx;
			height: 201rpx;
		}
		.update-title {
			margin-top: 28rpx;
			font-weight: 500;
			font-size: 48rpx;
			color: #000000;
		}
		.update-version {
			font-weight: 400;
			font-size: 34rpx;
			color: #a7abb0;
		}
		.update-desc {
			width: 100%;
			max-height: 350rpx;
			margin-top: 24rpx;
			.update-desc-title {
				font-weight: 500;
				font-size: 32rpx;
				color: #000000;
			}
			.update-desc-message {
				font-weight: 400;
				font-size: 28rpx;
				color: #555a61;
			}
		}

		.update-footer {
			width: 100%;
			margin-top: 48rpx;
			.update-progress-box {
				text-align: center;
				font-weight: 400;
				font-size: 34rpx;
				color: #a7abb0;
			}
			.update-button {
				width: 100%;
				height: 96rpx;
				line-height: 88rpx;
				background: #1388f7;
				border-radius: 16rpx;
				border: 4rpx solid #1388f7;
				font-weight: 500;
				font-size: 32rpx;
				color: #ffffff;
			}
		}
		.update-close {
			position: absolute;
			top: 0;
			right: 0;
			font-size: 30rpx;
			color: #555a61;
			width: 104rpx;
			height: 96rpx;
			line-height: 96rpx;
			text-align: center;
		}
	}
}
</style>
