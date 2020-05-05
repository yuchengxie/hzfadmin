'use strict';

var BaseController = require('./base.js');

class AccessController extends BaseController {

  async index() {
    let list = await this.ctx.model.Works.find({});
    this.ctx.body = {
      code: 20000,
      list
    }
  }

  async add() {
    var fields = this.ctx.request.body;
    console.log('master add:', fields);
    let master = new this.ctx.model.Works(fields);
    await master.save();
    this.ctx.body = {
      code: 20000,
      msg: '添加作品成功'
    }
  }

  async edit() {
    let fields = this.ctx.request.body;
    let _id = fields._id;
    console.log('master edit:', fields);
    await this.ctx.model.Works.updateOne({
      _id
    }, fields);
    this.ctx.body = {
      code: 20000,
      msg: '编辑作品成功'
    }
  }
}
module.exports = AccessController;