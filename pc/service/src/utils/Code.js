const md5 = require('js-md5');
const Redis = require('./Redis');

class Code {
	/**
	 * 生成验证码
	 * @param {String} uuid
	 * @param {String} openid
	 * @returns {Promise<{code:string;openid:string}>}
	 */
	static createCode(uuid, openid) {
		return new Promise(async (resolve, reject) => {
			try {
				let code = '';
				for (let i = 0; i < 6; i++) {
					code += Math.floor(Math.random() * 32).toString(32);
				}
				code = code.toLocaleUpperCase();
				await Redis.set(`code-${uuid}`, JSON.stringify({ code, openid }));
				resolve(code);
			} catch (error) {
				reject(error);
			}
		});
	}
	/**
	 * 获取验证码
	 * @param {String} uuid
	 * @returns {Promise<{code:string;openid:string}>}
	 */
	static getCode(uuid) {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await Redis.get(`code-${uuid}`);
				if (!data) {
					reject({ code: 400, message: '验证码不存在' });
					return;
				}
				resolve(JSON.parse(data));
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 校验验证码
	 */
	static checkCode(uuid, code) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!uuid || !code) {
					reject({ code: 400, message: '验证码不存在' });
					return;
				}
				const data = await Code.getCode(uuid);
				if (!data || data.code !== code.toLocaleUpperCase()) {
					reject({ code: 400, message: '验证码不正确' });
					return;
				}
				await Redis.del(`code-${uuid}`);
				resolve(data.openid);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = Code;
