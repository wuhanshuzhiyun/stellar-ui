const Redis = require('./Redis');
const Applet = require('./Applet');
const Utils = require('./Utils');

class User {
	static login(code) {
		return new Promise(async (resolve, reject) => {
			try {
				const openid = await Applet.getOpenid(code);
				if (!openid) {
					reject('getopenid error');
					return;
				}
				let token = await User.getTokenByOpenid(openid);
				if (!token) {
					token = Utils.generateUUID();
				}
				await Redis.set(`token-${token}`, openid, 'EX', 60 * 60 * 24);
				await Redis.set(`openid-${openid}`, token, 'EX', 60 * 60 * 24);
				resolve(token);
			} catch (error) {
				reject(error);
			}
		});
	}

	static getTokenByOpenid(openid) {
		return new Promise(async (resolve, reject) => {
			try {
				const token = await Redis.get(`openid-${openid}`);
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

	static logout(token) {
		return new Promise(async (resolve, reject) => {
			try {
				const openid = await User.getOpenidByToken(token);
				if (openid) {
					await Redis.del(`token-${token}`);
					await Redis.del(`openid-${openid}`);
				}
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = User;
