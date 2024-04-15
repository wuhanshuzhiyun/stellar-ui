/**
 * @type {{accept: "image" | "video";capture:("album" | "camera")[];camera:"back" | "front";compressed:boolean;maxDuration:number;multiple:boolean;count:number;}}
 */
const _options = {
	accept: "image",
	capture: ["album", "camera"],
	camera: "back",
	compressed: true,
	maxDuration: 60,
	multiple: false,
	count: 9,
}

/**
 * 读取本地媒体文件
 * @param {{accept: "image" | "video" | "media";capture:("album" | "camera")[];camera:"back" | "front";compressed:boolean;maxDuration:number;multiple:boolean;count:number;}} options 参数
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
	} = Object.assign(_options, options)
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN
		wx.chooseMedia({
			count,
			mediaType: [accept],
			sourceType: capture,
			camera: camera,
			sizeType: [compressed ? 'compressed' : 'original'],
			maxDuration,
			success(res) {
				const tempFiles = res.tempFiles
				const result = tempFiles.map((item) => {
					const m = {
						name: null,
						size: item.size,
						path: item.tempFilePath,
						type: res.type,
					};
					if (m.type === "video") {
						m.duration = item.duration
						m.height = item.height
						m.width = item.width
						m.thumbPath = item.thumbTempFilePath
					}
					return m
				});
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			},
		});
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


// #ifdef MP-ALIPAY
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
// #endif
// #ifdef H5
const h5FileType = {
	all: "*",
	file: "*",
	image: ".PNG,.JPG,.WEBP,.SVG,.GIF",
	video: ".mp4,.mov,.m4v,.3gp,.avi,.m3u8,.webm",
	media: ".PNG,.JPG,.WEBP,.SVG,.GIF,.mp4,.mov,.m4v,.3gp,.avi,.m3u8,.webm",
}

function h5ReadFile({
	accept = "image",
	multiple = false
}) {
	return new Promise((resolve, reject) => {
		let ipt = document.createElement("input");
		ipt.style.display = "none";
		ipt.setAttribute("type", "file")
		if (multiple) {
			ipt.setAttribute("multiple", multiple)
		}
		ipt.setAttribute("accept", h5FileType[accept])
		document.body.appendChild(ipt);
		ipt.click()
		ipt.addEventListener("change", async (e) => {
			const files = e.target.files;

			const result = []
			for (let i = 0; i < files.length; i++) {
				const file = files[i]
				let type = file.type;
				if (["image", "video", "media"].indexOf(accept) !== -1) {
					type = type.indexOf("video") !== -1 ? "video" : "image"
				}
				const resultItem = {
					name: file.name,
					path: URL.createObjectURL(file),
					type,
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
// #endif