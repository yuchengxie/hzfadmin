'use strict';

var BaseController = require('./base.js');

class InfoTypeController extends BaseController {

  async index() {
    let list = await this.ctx.model.InfoType.find({});
    // console.log('infoType list:', list);
    this.ctx.body = {
      code: 20000,
      list
    }
  }

  async add() {
    let fields = this.ctx.request.body;
    fields.type = fields.type === null ? -1 : fields.type;
    console.log('add infoType fields:', fields);
    let addInfoType = new this.ctx.model.InfoType(fields);
    await addInfoType.save();
    this.ctx.body = {
      code: 20000,
      msg: '添加资讯类型成功'
    }
  }

  async edit() {
    let fields = this.ctx.request.body;
    // console.log('edit info fields:', fields);
    console.log('edit id:', fields._id);
    let _id = fields._id;
    await this.ctx.model.InfoType.updateOne({
      _id
    }, fields);
    this.ctx.body = {
      code: 20000,
      msg: '修改成功'
    }
  }

}
module.exports = InfoTypeController;