const captcha = require('svg-captcha');
const md5 = require('js-md5');
const Redis = require('./Redis');

function _createUUID() {
	return md5(Math.random().toString(36) + Date.now().toString(36));
}

class Code {
	/**
	 * 获取图形验证码
	 * @returns {Promise<{data:string;uuid:string}>}
	 */
	static getCode() {
		return new Promise(async (resolve, reject) => {
			const option = {
				size: 4,
				ignoreChars: '0oO1ilI2z',
				noise: 2,
				width: 100,
				height: 30,
				fontSize: 26,
			};
			try {
				const uuid = _createUUID();
				const svg = captcha.create(option);
				await Redis.set(`code-${uuid}`, JSON.stringify({ code: svg.text }), 'EX', 600);
				resolve({ data: svg.data, uuid });
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 校验图形验证码
	 * @param {string} uuid // 同code一起生成的UUID
	 * @param {string} code
	 * @returns {Promise<boolean>}
	 */
	static checkCode(uuid, code) {
		return new Promise(async (resolve, reject) => {
			if (!uuid) {
				reject({ code: 400, messgae: 'uuid不能为空' });
				return;
			}
			if (!code) {
				reject({ code: 400, messgae: '验证码不能为空' });
				return;
			}
			try {
				let bool = false;
				let data = await Redis.get(`code-${uuid}`);
				if (!data) {
					reject({ code: 400, messgae: '验证码已过期' });
					return;
				}
				data = JSON.parse(data);
				bool = code && data.code.toLowerCase() === code.toLowerCase();
				await Redis.del(`code-${uuid}`);
				resolve(bool);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = Code;
