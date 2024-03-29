const axios = require('axios');

const wx = require('./getConfig')('wx');

const labelMap = {
	100: '正常',
	10001: '广告',
	20001: '时政',
	20002: '色情',
	20003: '辱骂',
	20006: '违法犯罪',
	20008: '欺诈',
	20012: '低俗',
	20013: '版权',
	21000: '其他',
};

class WX {
	static appid = wx.appid;
	static secret = wx.secret;
	static openid = '';
	static tokens = {
		access_token: '',
		endTime: 0,
	};
	constructor() {}

	// 获取access_token
	static getAccessToken(appid = WX.appid, secret = WX.secret) {
		return new Promise((resolve, reject) => {
			if (WX.tokens.endTime > Date.now()) {
				resolve(WX.tokens.access_token);
				return;
			}
			axios
				.get(
					`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
				)
				.then(({ data }) => {
					WX.tokens.access_token = data.access_token;
					WX.tokens.endTime = Date.now() + data.expires_in;
					resolve(WX.tokens.access_token);
				})
				.catch((err) => reject(err));
		});
	}

	static getOpenid(code, appid = WX.appid, secret = WX.secret) {
		return new Promise(async (resolve, reject) => {
			axios
				.get(
					`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
				)
				.then(({ data }) => {
					WX.openid = data.openid;
					resolve(data.openid);
				})
				.catch((err) => reject(err));
		});
	}

	/**
	 * 敏感词检测
	 * @param {String} content 需检测的文本内容，文本字数的上限为2500字，需使用UTF-8编码
	 * @returns
	 */
	static sensitiveWords(content, openid = WX.openid, appid = WX.appid, secret = WX.secret, scene = 2) {
		return new Promise(async (resolve, reject) => {
			if (!openid) {
				reject('not openid');
				return;
			}
			const access_token = await WX.getAccessToken(appid, secret);
			axios
				.post(`https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${access_token}`, {
					content,
					openid,
					scene,
					version: 2,
				})
				.then(({ data }) => {
					const result = data?.detail || [];
					const value = result.find((item) => item.label);
					if (value.label === 100) {
						resolve(true);
						return;
					}
					reject({ code: 400, message: labelMap[value.label] });
				})
				.catch((err) => reject(err));
		});
	}
}

module.exports = WX;
