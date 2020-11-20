
var BaseController = require('./base.js');

class OrderController extends BaseController {

  // async preOrder() {
  //   console.log('preOrder....');
  //   let msg = this.ctx.request.body;
  //   console.log('msg:', msg);
  //   if (msg) {
  //     await this.service.mqtt.push({ type: "preOrder", body: msg });
  //   }
  //   this.success(msg);
  //   // this.ctx.body = {
  //   //   code: 20000,
  //   //   msg: msg
  //   // }
  // }

  async index() {
    //这里更改为已经付款成功的
    // let filter = 
    let state = this.ctx.query.state;
    console.log('state:', state);
    let filter = {};
    if (state) {
      filter = {
        state: state
      }
    }
    console.log('filter:', filter);
    let res = await this.ctx.model.Order.find(filter);
    console.log('res:', res);
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