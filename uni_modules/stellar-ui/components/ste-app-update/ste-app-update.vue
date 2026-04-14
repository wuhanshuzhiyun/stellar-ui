<template>
	<view class="update-mask flex-center" :style="{ zIndex }" v-if="open">
		<view class="update-content">
			<image class="update-image" src="https://image.whzb.com/chain/StellarUI/font/app_update_img.png"></image>

			<view class="update-title">发现新版本</view>
			<view class="update-version">v{{ data.name }}</view>
			<scroll-view scroll-y class="update-desc">
				<view class="update-desc-title">更新内容</view>
				<view class="update-desc-message"><rich-text :nodes="data.content"></rich-text></view>
			</scroll-view>
			<view class="update-footer">
				<view class="update-progress-box" v-if="!updateBtn">
					<view class="progress-container">
						<progress class="update-progress" border-radius="35" :percent="percent" activeColor="#3DA7FF" backgroundColor="#f0f0f0" show-info stroke-width="12" />
						<view class="progress-text">{{ percent }}%</view>
					</view>
					<view class="download-info">
						<text class="update-down-msg" v-if="tempFilePath">
							<text class="success-icon">✓</text>
							下载完成，准备安装...
						</text>
						<text class="update-down-msg" v-else>正在下载，请稍后 ({{ downloadedSize }}/{{ packageFileSize }}MB)</text>
					</view>
					<button v-if="!tempFilePath && !data.isForce" class="cancel-download-btn" @click="cancelDownload">取消下载</button>
				</view>

				<template v-if="updateBtn">
					<button class="update-button primary" plain @click="confirm">{{ btnText }}</button>
					<!-- 跳过版本按钮 -->
					<button v-if="!data.isForce" class="update-button skip" plain @click="skipVersion">跳过此版本</button>
				</template>

				<button class="update-button secondary" plain @click="install" v-else-if="data.package_type === 0 && tempFilePath">立即安装</button>
			</view>

			<view class="update-close" v-if="!data.isForce" @click.stop="close">✖</view>
		</view>
	</view>
</template>
<script>
import { download, getDeviceId, getPlatform, getAppId, getVersion } from './method';

const STORAGE_KEY = 'skipped_app_versions';

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
			default: '',
		},
		zIndex: {
			type: [String, Number],
			default: () => 998,
		},
		/** 兜底检查接口地址 */
		fallbackApiUrl: {
			type: String,
			default: 'https://stellar-public-prd.intecloud.com.cn/api/app-update/check',
		},
	},
	data() {
		return {
			data: {
				content: '',
				updateFile: '', // 安装包
				isForce: false, // 是否强制更新
				package_type: 0, // 0 是整包升级 1是wgt升级
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
			skippedVersions: [], // 跳过的版本列表
			timeoutTimer: null, // 超时计时器
			downloadTask: null, // 下载任务引用
		};
	},
	methods: {
		// 初始化跳过版本列表
		initSkippedVersions() {
			try {
				const stored = uni.getStorageSync(STORAGE_KEY);
				if (stored) {
					this.skippedVersions = JSON.parse(stored);
				}
			} catch (error) {
				console.warn('读取跳过版本记录失败:', error);
				this.skippedVersions = [];
			}
		},
		// 保存跳过版本记录
		saveSkippedVersions() {
			try {
				uni.setStorageSync(STORAGE_KEY, JSON.stringify(this.skippedVersions));
			} catch (error) {
				console.warn('保存跳过版本记录失败:', error);
			}
		},
		// 检查是否已跳过该版本
		isVersionSkipped(versionCode) {
			return this.skippedVersions.includes(versionCode);
		},
		// 跳过当前版本
		skipVersion() {
			if (!this.data.code) return;
			// 添加到跳过列表
			if (!this.skippedVersions.includes(this.data.code)) {
				this.skippedVersions.push(this.data.code);
				this.saveSkippedVersions();
			}
			// 关闭更新弹窗
			this.close();
			this.$emit('skip-version', this.data.code);
		},
		// 清理函数
		cleanup() {
			if (this.timeoutTimer) {
				clearTimeout(this.timeoutTimer);
				this.timeoutTimer = null;
			}
			this.downloadTask = null;
		},
		// 获取跳过版本列表
		getSkippedVersions() {
			return [...this.skippedVersions];
		},
		// 清空跳过版本记录
		clearSkippedVersions() {
			this.skippedVersions = [];
			this.saveSkippedVersions();
		},
		// 兜底检查：上报版本 + 检查是否命中兜底配置
		checkFallback() {
			return new Promise((resolve) => {
				if (!this.fallbackApiUrl) {
					resolve(false);
					return;
				}
				const requestData = {
					appId: getAppId(),
					deviceId: getDeviceId(),
					versionCode: parseInt(this.version) || 0,
					versionName: this.version,
					platform: getPlatform(),
				};

				uni.request({
					url: this.fallbackApiUrl,
					method: 'POST',
					header: { 'Content-Type': 'application/json' },
					data: requestData,
					timeout: 1000,
					success: (res) => {
						try {
							const resp = res.data;
							// 明确返回 data 且有 downloadUrl 才触发兜底
							if (resp && resp.code === 0 && resp.data && resp.data.downloadUrl) {
								this.$emit('fallback', resp.data);
								uni.showModal({
									title: resp.data.title || '发现新版本',
									content: resp.data.description || '当前版本可能存在兼容性问题，建议您前往浏览器下载最新版本。',
									confirmText: '前往下载',
									showCancel: true,
									cancelText: '暂不更新',
									success: (modalRes) => {
										if (modalRes.confirm) {
											// #ifdef APP-PLUS
											plus.runtime.openURL(resp.data.downloadUrl);
											// #endif
											// #ifndef APP-PLUS
											window.open(resp.data.downloadUrl, '_blank');
											// #endif
										}
									},
								});
								resolve(true);
								return;
							}
						} catch (e) {
							console.warn('兜底检查响应解析失败:', e);
						}
						// 接口失败或未命中兜底 → 走正常更新流程
						resolve(false);
					},
					fail: () => {
						// 接口失败 → 降级走正常更新流程
						resolve(false);
					},
				});
			});
		},
		getData(callback) {
			// 参数验证
			if (!this.apiUrl) {
				console.error('API地址不能为空');
				this.$emit('no-update');
				return;
			}

			uni.request({
				url: this.apiUrl,
				method: 'GET',
				header: {
					Authorization: `Basic ${btoa(this.clientId + ':' + this.clientSecret)}`,
				},
				success: (res) => {
					try {
						const _data = res.data;
						if (_data.code == 200 && _data.data) {
							// 数据验证
							if (!_data.data.code || !_data.data.name) {
								console.warn('返回数据缺少必要字段');
								this.$emit('no-update');
								return;
							}

							this.data.code = _data.data.code;
							this.data.name = _data.data.name;
							this.data.content = (_data.data.desc || '').replace(/\n+/g, '<br />');
							this.data.isForce = !!_data.data.isForce;
							this.data.updateFile = _data.data.entireFile ? _data.data.entireFile : _data.data.updateFile;
							this.data.package_type = _data.data.entireFile ? 0 : 1;

							// 检查是否已跳过该版本
							if (this.isVersionSkipped(this.data.code)) {
								console.log(`版本 ${this.data.code} 已被跳过`);
								this.$emit('no-update');
								return;
							}

							callback && callback({ code: _data.data.code, name: _data.data.name, updateFile: this.data.updateFile }, this.version);

							if (this.appType) {
								const nvs = this.data.name.split('.');
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
							console.log(_data.msg || '获取版本信息失败');
						}
						// 无需升级
						this.$emit('no-update');
					} catch (error) {
						console.error('数据解析错误:', error);
						this.$emit('no-update');
					}
				},
				fail: (err) => {
					console.error('网络请求失败:', err);
					uni.showToast({
						title: '网络请求失败，请检查网络连接',
						icon: 'none',
					});
					this.$emit('no-update');
				},
			});
		},

		async start(callback) {
			// 初始化跳过版本记录
			this.initSkippedVersions();

			const v = await getVersion(this.appVersion);
			if (v) this.version = v;

			// 兜底检查：如果配置了 fallbackApiUrl，先调兜底接口
			const hit = await this.checkFallback();
			if (hit) return; // 命中兜底，不继续正常流程

			// 正常更新流程
			this.getData(callback);
		},

		onProgressUpdate(res) {
			// 添加边界检查
			if (res.progress >= 0 && res.progress <= 100) {
				this.percent = res.progress;
				this.downloadedSize = (res.totalBytesWritten / Math.pow(1024, 2)).toFixed(2);
				this.packageFileSize = (res.totalBytesExpectedToWrite / Math.pow(1024, 2)).toFixed(2);
			}
		},

		confirm() {
			// 先清理之前的任务
			this.cleanup();

			// 参数验证
			if (!this.data.updateFile) {
				uni.showToast({ title: '更新文件地址不能为空', icon: 'none' });
				return;
			}

			if (this.data.package_type == 0) {
				// apk整包升级 下载地址必须以.apk结尾
				if (this.data.updateFile.includes('.apk')) {
					this.updateBtn = false;
					this.downloadTask = download(this.data, {
						onProgressUpdate: this.onProgressUpdate,
						downloadSuccess: (path) => (this.tempFilePath = path),
						error: () => {
							this.updateBtn = true;
							this.cleanup();
						},
						success: () => {
							this.cleanup();
						},
					});
				} else {
					// 外部下载 一般是手机应用市场或者其他h5页面
					plus.runtime.openURL(this.data.updateFile);
					uni.navigateBack({
						delta: 1,
					});
				}
			} else {
				this.updateBtn = false;
				// wgt资源包升级 下载地址必须以.wgt结尾
				this.downloadTask = download(this.data, {
					onProgressUpdate: this.onProgressUpdate,
					downloadSuccess: (path) => (this.tempFilePath = path),
					error: () => {
						this.updateBtn = true;
						this.cleanup();
					},
					success: () => {
						this.cleanup();
					},
				});
			}
		},

		close() {
			this.cleanup();
			this.open = false;
			this.$emit('cancel');
		},

		install() {
			if (!this.tempFilePath) {
				uni.showToast({ title: '安装文件不存在', icon: 'none' });
				return;
			}

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
					// 提示部分wgt包无法安装的问题
					uni.showModal({
						title: '安装失败',
						content: e.message || '安装过程中出现错误',
						showCancel: false,
					});
				}
			);
		},

		// 取消下载
		cancelDownload() {
			uni.showModal({
				title: '确认取消',
				content: '确定要取消下载吗？',
				success: (res) => {
					if (res.confirm) {
						// 取消下载时才 abort 下载任务
						if (this.downloadTask) {
							this.downloadTask.abort();
						}
						this.cleanup();
						this.updateBtn = true;
						this.percent = 0;
						this.downloadedSize = '0';
						this.packageFileSize = '0';
						this.tempFilePath = '';
						uni.showToast({ title: '已取消下载', icon: 'none' });
					}
				},
			});
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
	z-index: 998;
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
				.progress-container {
					position: relative;
					margin: 20rpx 0;
					.progress-text {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						font-size: 24rpx;
						color: #3da7ff;
						font-weight: 500;
					}
				}
				.download-info {
					margin: 20rpx 0;
					font-weight: 400;
					font-size: 34rpx;
					color: #a7abb0;
					.success-icon {
						color: #4caf50;
						font-weight: bold;
						margin-right: 8rpx;
					}
				}
				.cancel-download-btn {
					width: 100%;
					height: 72rpx;
					line-height: 72rpx;
					background: #f5f5f5;
					border: 2rpx solid #ddd;
					border-radius: 12rpx;
					color: #666;
					font-size: 28rpx;
					margin-top: 20rpx;
				}
			}
			.update-button {
				width: 100%;
				height: 96rpx;
				line-height: 88rpx;
				border-radius: 16rpx;
				border: 4rpx solid;
				font-weight: 500;
				font-size: 32rpx;
				margin-bottom: 20rpx;
				&.primary {
					background: #1388f7;
					border-color: #1388f7;
					color: #ffffff;
				}
				&.secondary {
					background: #4caf50;
					border-color: #4caf50;
					color: #ffffff;
				}
				&.skip {
					background: #f5f5f5;
					border-color: #ddd;
					color: #666;
				}
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
