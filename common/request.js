import config from './config.js';
export default function(url, data, method = "GET") {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${config.BASE_URL}${url}`,
			method,
			data,
			success({
				data
			}) {
				if (data.code === 0) {
					resolve(data.data)
					return
				}
				reject(data.message)
			},
			fail(e) {
				reject(e)
			}
		});
	})
}