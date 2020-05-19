


var BaseController = require('./base');

class AddressController extends BaseController {
  async index() {
    let res = await this.ctx.model.Address.find({});
    this.ctx.body = {
      msg: res
    }
  }

  async detail() {
    let params = this.ctx.request.body;
    let _id = params.id;
    if (!_id) {
      this.ctx.body = {
        success: false,
        msg: 'id invalid',

      }
      return;
    }
    let res = await this.ctx.model.Address.find({ _id });
    this.ctx.body = {
      success: true,
      msg: res
    }
  }
}

module.exports = AddressController;