import config from './config.js';
console.log(config.BASE_URL);
export default function (url, data, method = 'GET') {
	return new Promise((resolve, reject) => {
		console.log('----request-start==>', url);
		uni.request({
			url: `${config.BASE_URL}${url}`,
			method,
			data,
			success({ data }) {
				console.log('----request-success==>', url, data);
				if (data.code === 0) {
					resolve(data.data);
					return;
				}
				reject(data.message);
			},
			fail(e) {
				console.log('----request-error==>', url, e);
				reject(e);
			},
		});
	});
}
