const Redisio = require('ioredis');
const getConfig = require('./getConfig');

const redis = new Redisio(getConfig('redis'));

// 连接成功后执行的回调函数
redis.on('connect', () => {
	console.log('Redis connected!');
});

// 连接出错时执行的回调函数
redis.on('error', (error) => {
	console.error('Redis error: ', error);
});

class Redis {
	static set(...args) {
		return redis.set(...args);
	}
	static get(key) {
		return redis.get(key);
	}
	static del(key) {
		console.log('key', key);
		return redis.del(key);
	}
	static expire(key, seconds) {
		return redis.expire(key, seconds);
	}
	static keys(pattern) {
		return redis.keys(pattern);
	}
}

module.exports = Redis;
