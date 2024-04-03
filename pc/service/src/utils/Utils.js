const fs = require('fs');
const path = require('path');

class Utils {
	// 生成uuid
	static generateUUID() {
		let uuid = Date.now().toString(32);
		for (let i = 0; i < 10; i++) {
			uuid += Math.floor(Math.random() * 32).toString(32);
		}
		return uuid;
	}

	static filePath(filePath) {
		return path.resolve(process.cwd(), filePath);
	}

	static findFile(filePath) {
		return new Promise((resolve, reject) => {
			const fp = filePath(filePath);
			fs.access(fp, fs.constants.F_OK, (err) => {
				if (err) {
					return reject(err);
				}
				return resolve(true);
			});
		});
	}
}

module.exports = Utils;
