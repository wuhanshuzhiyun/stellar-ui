export function download(data, { success, error, onProgressUpdate, downloadSuccess }) {
	const package_type = data.package_type;
	let timeout;

	// 参数验证
	if (!data.updateFile) {
		const errorMsg = '更新文件地址不能为空';
		uni.showToast({ title: errorMsg, icon: 'none' });
		error && error(new Error(errorMsg));
		throw new Error(errorMsg);
	}

	const downloadTask = uni.downloadFile({
		url: data.updateFile,
		success: (res) => {
			clearTimeout(timeout);

			if (res.statusCode === 200) {
				// 文件完整性检查
				if (!res.tempFilePath) {
					const errorMsg = '下载文件路径为空';
					uni.showToast({ title: errorMsg, icon: 'none' });
					error && error(new Error(errorMsg));
					return;
				}

				downloadSuccess && downloadSuccess(res.tempFilePath);

				plus.runtime.install(
					res.tempFilePath,
					{ force: true },
					() => {
						// wgt升级
						if (package_type == 1) {
							uni.showModal({
								title: '提示',
								content: '升级成功，请重新启动！',
								confirmText: '确定',
								showCancel: false,
								success: () => {
									success && success();
									plus.runtime.restart();
								},
							});
						} else {
							// 整包升级
							success && success();
						}
					},
					(e) => {
						// 提示部分wgt包无法安装的问题
						const errorMsg = e.message || '安装失败';
						uni.showModal({
							title: '提示',
							content: errorMsg,
							showCancel: false,
							success: () => {
								error && error(e);
							},
						});
					}
				);
			} else {
				const errorMsg = `下载失败，状态码：${res.statusCode}`;
				uni.showToast({ title: errorMsg, icon: 'none' });
				error && error(new Error(errorMsg));
			}
		},
		fail: (err) => {
			clearTimeout(timeout);
			const errorMsg = `网络请求失败：${err.errMsg || '未知错误'}`;
			uni.showToast({ title: errorMsg, icon: 'none' });
			error && error(err);
		}
	});

	// 下载进度监控
	downloadTask.onProgressUpdate((res) => {
		// 添加进度验证
		if (res.progress >= 0 && res.progress <= 100) {
			onProgressUpdate && onProgressUpdate(res);
		}

		// 重置超时计时器
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			downloadTask.abort();
			const errorMsg = '下载超时，请检查网络连接';
			uni.showToast({ title: errorMsg, icon: 'none' });
			error && error(new Error(errorMsg));
		}, 300000); // 5分钟超时
	});

	// 初始超时设置
	timeout = setTimeout(() => {
		downloadTask.abort();
		const errorMsg = '下载超时，请检查网络连接';
		uni.showToast({ title: errorMsg, icon: 'none' });
		error && error(new Error(errorMsg));
	}, 300000);

	return downloadTask;
}

// 获取设备唯一标识
export const getDeviceId = () => {
	// #ifdef APP-PLUS
	return plus.device.uuid || '';
	// #endif
	// #ifndef APP-PLUS
	return '';
	// #endif
};

// 获取当前平台
export const getPlatform = () => {
	// #ifdef APP-PLUS
	return plus.os.name?.toLowerCase() || 'android';
	// #endif
	// #ifndef APP-PLUS
	return 'unknown';
	// #endif
};

// 获取APPID
export const getAppId = () => {
	// #ifdef APP-PLUS
	return plus.runtime.appid || '';
	// #endif
	// #ifndef APP-PLUS
	return '';
	// #endif
};

// 获取当前版本号
export const getVersion = (appVersion) => {
	return new Promise((resolve) => {
		if (appVersion) {
			resolve(appVersion);
		} else {
			plus.runtime.getProperty(plus.runtime.appid || '', (inf) => {
				resolve(inf.version || '');
			});
		}
	});
};
