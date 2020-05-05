'use strict';

var BaseController = require('./base.js');

class MasterController extends BaseController {

  async index() {
    let list = await this.ctx.model.Master.find({});
    this.ctx.body = {
      code: 20000,
      list
    }
  }

  async add() {
    var fields = this.ctx.request.body;
    console.log('master add:', fields);
    let master = new this.ctx.model.Master(fields);
    await master.save();
    this.ctx.body = {
      code: 20000,
      msg: '添加大师成功'
    }
  }

  async edit() {
    let fields = this.ctx.request.body;
    let _id = fields._id;
    console.log('master edit:', fields);
    await this.ctx.model.Master.updateOne({
      _id
    }, fields);
    this.ctx.body = {
      code: 20000,
      msg: '编辑艺术家成功'
    }
  }
}
module.exports = MasterController;