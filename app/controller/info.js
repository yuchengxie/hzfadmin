'use strict';

var BaseController = require('./base.js');

class InfoController extends BaseController {

  async index() {
    let list = await this.ctx.model.Info.find({});
    // console.log('info list:', list);
    this.ctx.body = {
      code: 20000,
      list
    }
  }

  async add() {
    let fields = this.ctx.request.body;
    fields.type = fields.type === null ? -1 : fields.type;
    let addInfo = new this.ctx.model.Info(fields);
    await addInfo.save();
    //添加数据更新，发出消息
    await this.service.mqtt.push("info_add");
    //是否考虑，新增后，清一次对应数据缓存 ---todo 
    
    this.ctx.body = {
      code: 20000,
      msg: '添加资讯成功'
    }
  }

  async getInfoTypes() {
    let list = await this.ctx.model.InfoType.find({});
    this.ctx.body = {
      code: 20000,
      list,
      msg: '获取所有资讯类型'
    }
  }

  async edit() {
    let fields = this.ctx.request.body;
    // console.log('edit info fields:', fields);
    console.log('edit id:', fields._id);
    let _id = fields._id;
    await this.ctx.model.Info.updateOne({
      _id
    }, fields);
    this.ctx.body = {
      code: 20000,
      msg: '修改成功'
    }
  }

}
module.exports = InfoController;