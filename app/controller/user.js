

var BaseController = require('./base.js');

class UserController extends BaseController {
  async index() {
    let res = await this.ctx.model.User.find({});
    this.ctx.body = {
      msg: res
    }
  }

  async detail() {
    let params = this.ctx.request.body;
    console.log('params:', params);
    let _id = params.id;
    if (!_id) {
      this.ctx.body = {
        success: false,
        msg: 'id invalid',
      }
      return;
    }
    let res = await this.ctx.model.User.find({ _id });
    console.log('res:',res);
    this.ctx.body = {
      success: true,
      msg: res
    }
  }
}

module.exports = UserController;