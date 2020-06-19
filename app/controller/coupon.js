'use strict';

var BaseController = require('./base.js');
const { redis } = require('../../config/plugin.js');

class CouponController extends BaseController {

  async index() {
    console.log('coupon index');
    let list = await this.app.model.Coupon.find({});
    this.ctx.body = {
      list
    }
  }

  async add() {
    console.log('coupon add');
    var fields = this.ctx.request.body;
    console.log('add:', fields);
    var coupon = new this.ctx.model.Coupon(fields);
    coupon.save();
    this.ctx.body = {
      code: 20000,
      msg: '增加优惠券成功'
    }
    // let item = new 
  }

  async edit() {
    var fields = this.ctx.request.body;
    let _id = fields._id;
    await this.ctx.model.Coupon.updateOne({ _id }, fields);
    this.ctx.body = {
      code: 20000,
      msg: '编辑优惠券成功'
    }
  }



}
module.exports = CouponController;