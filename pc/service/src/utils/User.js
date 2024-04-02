const Redis = require('./Redis');
const wx = require('./WeiXin');
const Utils = require('./Utils');

class User {
	static login(code) {
		return new Promise(async (resolve, reject) => {
			try {
				const openid = await wx.getOpenid(code);
				if (!openid) {
          reject("getopenid error")
					return;
				}
				const token = Utils.generateToken();
				await Redis.set(`token-${token}`, openid, 'EX', 60 * 60 * 24 * 7);
				resolve(token);
			} catch (error) {
				reject(error);
			}
		});
	}

	static getOpenidByToken(token) {
		return new Promise(async (resolve, reject) => {
			try {
				const openid = await Redis.get(`token-${token}`);
				resolve(openid);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = User;
