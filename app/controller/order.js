
var BaseController = require('./base.js');

class OrderController extends BaseController {
  async index() {
    let res = await this.ctx.model.Order.find({});
    this.ctx.body = {
      msg: res
    }
  }

  async bindOrderForExpress() {
    let { out_trade_no, express_no } = this.ctx.request.body;
    let res = await this.ctx.model.Order.updateOne({ out_trade_no: out_trade_no }, { express_no: express_no })
    console.log('res:', res);
    this.ctx.body = {
      msg: res
    }
  }

}
module.exports = OrderController;