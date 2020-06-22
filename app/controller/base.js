'use strict';

const Controller = require('egg').Controller;
const CacheMangerKey = require('../../config/CacheMangerKey');

class BaseController extends Controller {
  async del() {
    let model = this.ctx.request.query.model;
    let _id = this.ctx.request.query.id;
    //推送消息
    if (model === 'Info') {
      await this.service.mqtt.push({ type: "info_delete", body: {} });
      await this.service.cache.set(CacheMangerKey.XIN_CACHE_KEY, null);
    }
    await this.ctx.model[model].deleteOne({
      _id
    });
    this.ctx.body = {
      code: 20000,
      msg: '删除成功'
    }
  }

  // async menu() {
  //   this.ctx.body = {
  //     code: 20000,
  //     msg: this.config.menu
  //   }
  // }

  async success(msg = {}) {
    this.ctx.body = {
      code: 0,
      msg
    };
  }

  async error(msg = "服务器错误") {
    this.ctx.body = {
      code: 1,
      msg
    };
  }
  async awaitWrap(promise) {
    return promise.then(res => {
      return {
        code: 0,
        msg: res
      }
    })
      .catch(err => {
        return {
          code: 1,
          msg: err
        }
      })
  }

}

module.exports = BaseController;