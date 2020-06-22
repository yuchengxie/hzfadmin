'use strict';

var BaseController = require('./base.js');
const { redis } = require('../../config/plugin.js');

class CacheController extends BaseController {

  async flushall() {
    // let list = await this.ctx.model.Info.find({});
    // console.log('info list:', list);
    // this.app.redis.client()
    // this.ctx.body = {
    //   code: 20000,
    //   list
    // }
    await this.app.redis.flushall();
    this.ctx.body = {
    res: '清理完成'
    }
  }

}
module.exports = CacheController;