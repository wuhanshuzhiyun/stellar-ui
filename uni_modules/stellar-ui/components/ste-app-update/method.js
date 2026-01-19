export function download(data, { success, error, onProgressUpdate, downloadSuccess }) {
	const package_type = data.package_type;
	const downloadTask = uni.downloadFile({
		url: data.updateFile,
		success: (res) => {
			if (res.statusCode === 200) {
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
						//提示部分wgt包无法安装的问题
						uni.showModal({
							title: '提示',
							content: e.message,
							showCancel: false,
							success: () => {
								error && error(e);
							},
						});
					}
				);
			}
		},
	});
	// 下载进度
	downloadTask.onProgressUpdate((res) => {
		onProgressUpdate && onProgressUpdate(res);
	});
}
