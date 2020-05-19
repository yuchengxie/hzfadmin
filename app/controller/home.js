'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.app.logger.info('=====welcome use hzfds api====== ')
    this.ctx.body={
      msg:'welcome use hzfds api'
    }
  }
}

module.exports = HomeController;
