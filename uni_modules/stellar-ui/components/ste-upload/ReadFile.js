const fileType = {
	all: "*",
	image: ".PNG,.JPG,.WEBP,.SVG,.GIF",
	video: ".mp4,.mov,.m4v,.3gp,.avi,.m3u8,.webm",
}
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
							type: "image",
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
					resolve([{
						name: null,
						size: e.size,
						path: e.tempFilePath,
						type: "video",
						duration: e.duration,
						height: e.height,
						width: e.width,
						thumbPath: e.tempVideoThumbPath,
					}])
				},
				fail(err) {
					reject(err)
				}
			})
		} else {
			aliReadImage({
				count,
				useFrontCamera: camera === "front",
				sizeType: [compressed ? 'compressed' : 'original'],
				sourceType: capture,
			}).then(res => resolve(res)).catch(e => reject(e))
		}
		// #endif

		// #ifdef H5
		h5ReadFile({
			accept,
			multiple
		}).then(res => resolve(res)).catch(e => reject(e))
		// #endif
	})
}

/**
 * @param {"all" | "file"} accept 
 * @param {Number} count
 */
export function readFile(accept = "all", count = 9, multiple = false) {
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
		aliReadImage({
			count
		}).then(res => resolve(res)).catch(e => reject(e))
		// #endif
		// #ifdef H5
		h5ReadFile({
			accept,
			multiple,
		}).then(res => resolve(res)).catch(e => reject(e))
		// #endif
	})
}



function aliReadImage({
	count,
	useFrontCamera,
	sizeType,
	sourceType
}) {
	return new Promise((resolve, reject) => {
		my.chooseImage({
			count,
			useFrontCamera,
			sizeType,
			sourceType,
			success({
				tempFiles
			}) {
				const result = tempFiles.map(item => {
					return {
						name: null,
						path: item.path,
						size: item.size,
						type: "image",
					}
				})
				resolve(result);
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

function h5ReadFile({
	accept = "image",
	multiple = false
}) {
	return new Promise((resolve, reject) => {
		let ipt = document.createElement("input");
		ipt.style.display = "none";
		ipt.setAttribute("type", "file")
		ipt.setAttribute("multiple", multiple)
		ipt.setAttribute("accept", fileType[accept])
		document.body.appendChild(ipt);
		ipt.click()
		ipt.addEventListener("change", async (e) => {
			const files = e.target.files;
			const result = []
			for (let i = 0; i < files.length; i++) {
				const file = files[i]
				const resultItem = {
					name: file.name,
					path: URL.createObjectURL(file),
					type: accept,
					size: file.size,
					file,
				};
				if (file.type.indexOf("video") !== -1) {
					const data = await getVideoFirstFrame(resultItem.path)
					Object.assign(resultItem, data)
				}
				result.push(resultItem)
			}

			resolve(result);
			document.body.removeChild(ipt);
			ipt = null;
		})
	})
}

/**
 * 获取视频首帧
 */
function getVideoFirstFrame(path) {
	return new Promise((resolve, reject) => {
		let video = document.createElement("video");
		video.src = path;
		video.onloadedmetadata = function() {
			video.currentTime = 0.5;
			video.addEventListener("canplay", function() {
				video.pause();
				const width = video.videoWidth,
					height = video.videoHeight,
					duration = video.duration;

				setTimeout(() => {
					let canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;
					canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
					let thumbPath = canvas.toDataURL('image/png');
					resolve({
						thumbPath,
						width,
						height,
						duration
					});
					video = null
				}, 50)
			})
		}
	})
}