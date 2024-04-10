/**
 * @type {{accept: "image" | "video";capture:("album" | "camera")[];camera:"back" | "front";compressed:boolean;maxDuration:number;multiple:boolean;count:number;maxSize:number}}
 */
const _options = {
	accept: "image",
	capture: ["album", "camera"],
	camera: "back",
	compressed: true,
	maxDuration: 60,
	multiple: false,
	count: 9,
	maxSize: 0
}

/**
 * 读取本地媒体文件
 * @param {{accept: "image" | "video";capture:("album" | "camera")[];camera:"back" | "front";compressed:boolean;maxDuration:number;multiple:boolean;count:number;maxSize:number}} options 参数
 * @returns {Promise<{path:string;name:string;type:string;size:number;height?:number;width?:number;thumbPath?:string}[]>}
 */
export function readMediaFile(options = {}) {
	const {
		accept,
		capture,
		camera,
		compressed,
		maxDuration,
		multiple,
		count,
		maxSize
	} = Object.assign(_options, options)
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN
		if (accept === "video") {
			wx.chooseVideo({
				sourceType: capture,
				camera,
				compressed,
				maxDuration,
				success(e) {
					resolve([{
						name: null,
						size: e.size,
						path: e.tempFilePath,
						type: "video",
						duration: e.duration,
						height: e.height,
						width: e.width,
						thumbPath: e.thumbTempFilePath,
					}])
				},
			})
		} else {
			wx.chooseMedia({
				count,
				mediaType: ['image'],
				sourceType: capture,
				camera: camera,
				sizeType: [compressed ? 'compressed' : 'original'],
				maxDuration,
				success({
					tempFiles
				}) {
					const result = tempFiles.map((item) => {
						return {
							name: null,
							size: item.size,
							path: item.tempFilePath,
							type: item.fileType,
						};
					});
					resolve(result)
				},
				fail: (err) => {
					reject(err)
				},
			});
		}
		// #endif

		// #ifdef MP-ALIPAY
		if (accept === "video") {
			my.chooseVideo({
				sourceType: capture,
				camera,
				compressed,
				maxDuration,
				success(e) {
					console.log(e)
				},
				fail(err) {
					reject(err)
				}
			})
		} else {
			my.chooseImage({
				count,
				useFrontCamera: camera === "front",
				sizeType: [compressed ? 'compressed' : 'original'],
				sourceType: capture,
				success(e) {
					console.log(e)
				},
				fail(err) {
					reject(err)
				}
			})
		}
		// #endif
	})
}

/**
 * @param {"all" | "file"} accept 
 * @param {Number} count
 */
export function readFile(accept = "all", count = 9) {
	console.log("选择文件")
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN
		wx.chooseMessageFile({
			type: accept,
			count,
			success: ({
				tempFiles
			}) => {
				resolve(tempFiles);
			},
			fail: (err) => {
				reject(err)
			},
		});
		// #endif
		// #ifdef MP-ALIPAY
		my.chooseImage({
			count,
			success(e) {
				console.log(e)
			},
			fail(err) {
				reject(err)
			}
		})
		// #endif
	})
}