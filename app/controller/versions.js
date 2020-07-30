
const BaseController = require('./base');

class VersionController extends BaseController {
  async index() {
    let list = await this.ctx.model.Versions.find({});
    this.ctx.body = {
      list
    }
  }


  async add() {
    let fields = this.ctx.request.body;
    let phone_version = new this.ctx.model.Versions(fields);
    await phone_version.save();
    console.log('phone version edit:', fields);
    this.ctx.body = {
      msg: 'version add success'
    }
  }

  async edit() {
    let fields = this.ctx.request.body;
    console.log('phone version edit:', fields);
    await this.ctx.model.PVersion.updateOne({ _id: fields._id }, fields);
    this.ctx.body = {
      msg: 'version edit success'
    }
  }
}

module.exports = VersionController;