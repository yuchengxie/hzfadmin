
var BaseController = require('./base.js');

class OrderController extends BaseController {
  async index() {
    let res = await this.ctx.model.Order.find({});
    this.ctx.body = {
      msg: res
    }
  }
}
module.exports = OrderController;