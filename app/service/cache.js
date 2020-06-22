
/*
 * @Date: 2020-02-12 19:13:42
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-05-17 12:43:12
 */
const Service = require('egg').Service;

const EXDEFAULT = 60 * 60 * 2;//秒为单位
// const EXDEFAULT = 10;//秒为单位
class CacheService extends Service {
  async set(key, value, seconds) {
    const {
      redis
    } = this.app;
    value = JSON.stringify(value);
    if (!seconds) {
      console.log('设置缓存:', key);
      await redis.set(key, value, 'EX', EXDEFAULT);
    } else {
      await redis.set(key, value, 'EX', seconds);
    }
  }

  async setToken(key, value) {
    if (this.app.redis) {
      value = JSON.stringify(value);
      this.app.redis.set(key, value, "EX", this.config.REDIS_EX_TOKEN);
    }
  }

  async get(key) {
    const {
      redis
    } = this.app;
    let data = await redis.get(key);
    if (!data) return;
    data = JSON.parse(data);
    return data;
  }

}

module.exports = CacheService;