
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

  async purchaseSuc() {
    console.log('purchaseSuc....');
    let msg = this.ctx.request.body;
    console.log('msg:', msg);
    if (msg) {
      await this.service.mqtt.push({ type: "purchase_success", body: msg });
    }
    this.ctx.body = {
      code: 20000,
      msg: msg
    }
  }
}
module.exports = OrderController;