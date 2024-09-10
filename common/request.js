import config from './config.js';
import {
	getToken,
	removeToken
} from './token.js';

export default function(url, data, method = 'GET', header = {}) {
	return new Promise((resolve, reject) => {
		console.log('----request-start==>', url);
		const token = getToken();

		const _header = {}
		if (token) _header.token = token
		uni.request({
			url: `${config.BASE_URL}${url}`,
			method,
			header: Object.assign(_header, header),
			data,
			success({
				data
			}) {
				console.log('----request-success==>', url, data);
				if (data.code === 200) {
					resolve(data.data);
					return;
				} else if (data.code === 401) {
					removeToken()
				} else if (data.code === 402) {
					uni.showToast({
						title: `内容涉及${data.message}信息，请修改后重新评论`,
						icon: 'none'
					})
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