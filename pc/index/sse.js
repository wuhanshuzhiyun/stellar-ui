import config from '@/common/config';

class SSE {
	sse;
	constructor(url = `/pclogin`) {
		let uuid = uni.getStorageSync('uuid');
		this.sse = new EventSource(`${config.SSE_URL}${url}?uuid=${uuid}`);
	}
	// 监听数据
	onmessage(callback) {
		this.sse.addEventListener('message', function (event) {
			callback(event.data);
		});
	}

	// 关闭sse连接
	close() {
		this.sse.close();
	}
}

export default SSE;
