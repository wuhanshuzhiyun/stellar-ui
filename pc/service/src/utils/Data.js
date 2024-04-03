const fs = require('fs');
const dayjs = require('dayjs');
const path = require('path');

const interval = ' ## ';

function filePath(name) {
	return path.resolve(process.cwd(), `./datas/${name}.txt`);
}

function findFile(name) {
	return new Promise((resolve, reject) => {
		const fp = filePath(name);
		fs.access(fp, fs.constants.F_OK, (err) => {
			if (err) {
				return resolve(false);
			}
			return resolve(true);
		});
	});
}

async function initFiles() {
	try {
		const d = path.join(process.cwd(), '/datas');
		await fs.promises.mkdir(d, { recursive: true });
		console.log('datas目录已创建');
		const s = path.join(process.cwd(), '/static');
		await fs.promises.mkdir(s, { recursive: true });
		console.log('static目录已创建');
	} catch (err) {
		console.error('创建目录失败:', err);
	}
}
initFiles();

class Data {
	static getData(name) {
		return new Promise(async (resolve, reject) => {
			const fp = filePath(name);
			try {
				const bool = await findFile(name);
				if (!bool) {
					return resolve([]);
				}
				const data = await fs.promises.readFile(fp, 'utf8');
				const strs = data.split('\n');
				const list = strs
					.filter((s) => !!s)
					.map((str) => {
						const [time, conents, user] = str.split(interval);
						return { time, conents, user };
					});
				resolve(list);
			} catch (error) {
				reject(error);
			}
		});
	}

	static setData(name, { content, user, openid }) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!content || content.indexOf(interval) >= 0) return reject('缺失内容');
				const data = `${dayjs().format('YYYY-MM-DD HH:mm:ss')}${interval}${content}${interval}${
					user || '未知用户'
				}${interval}${openid}\n`;
				const fp = filePath(name);
				const bool = await findFile(name);
				if (bool) {
					await fs.promises.appendFile(fp, data);
					resolve('success');
				} else {
					await fs.promises.writeFile(fp, data);
					resolve('success');
				}
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = Data;
