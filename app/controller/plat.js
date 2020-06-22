'use strict';

var BaseController = require('./base.js');
const { redis } = require('../../config/plugin.js');

class PlatController extends BaseController {

  async index() {
    let list = await this.ctx.model.Plat.find({});
    this.ctx.body = {
      list
    }
  }

  async add() {
    console.log('plat add');
    var fields = this.ctx.request.body;
    console.log('add:', fields);
    var coupon = new this.ctx.model.Plat(fields);
    await coupon.save();
    this.ctx.body = {
      code: 20000,
      msg: '增加平台活动成功'
    }
    // let item = new 
  }

  async edit() {
    var fields = this.ctx.request.body;
    console.log('plat edit:', fields);
    let _id = fields._id;
    await this.ctx.model.Plat.updateOne({ _id }, fields);
    this.ctx.body = {
      code: 20000,
      msg: '编辑平台活动成功'
    }
  }

  async push() {
    let msg = this.ctx.query;
    let res = await this.service.mqtt.push(msg);
    this.ctx.body = {
      res
    }
  }


}
module.exports = PlatController;