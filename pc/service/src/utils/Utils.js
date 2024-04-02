const strs = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
class Utils {
	// 生成token
	static generateToken(payload) {
		let token = '';
		for (let i = 0; i < 32; i++) {
			let index = Math.floor(Math.random() * strs.length);
			token += strs[index];
		}
		return token;
	}
}

module.exports = Utils;
