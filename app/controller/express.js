'use strict';

var BaseController = require('./base.js');

class ExpressController extends BaseController {

  async co() {
    let res = await this.service.express.getAllExpressComp();
    if (res && res.data) {
      this.ctx.body = {
        list: res.data
      }
    }
  }

  async num() {
    let number = this.ctx.query.number;
    console.log('number:', number);
    if (!number) {
      this.ctx.body = {
        msg: 'invailid number'
      }
      return;
    }
    let res = await this.service.express.queryExpressByNumber(number);
    if (res && res.data) {
      this.ctx.body = {
        list: res.data
      }
    }
  }

  async trace() {
    let number = this.ctx.query.number;
    console.log('number:', number);
    if (!number) {
      this.ctx.body = {
        msg: 'invailid number'
      }
      return;
    }
    let res = await this.service.express.queryTraceByNumber(number);
    // console.log('res:', res.data.list.traces);
    // if (res.data.list.traces && res.data.list.traces.length === 15) {
    //   //存入数据库 - express_no / traces
    //   let express = {
    //     express_no:number,
    //     detail:res.data.list
    //   };
    //   //先查找是否存在
    //   await this.ctx.model.Express.save(express);
    // }
    if (res && res.data) {
      this.ctx.body = {
        list: res.data
      }
    }
  }

}
module.exports = ExpressController;