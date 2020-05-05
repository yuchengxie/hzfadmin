'use strict';

let fs = require('fs');
var BaseController = require('./base.js');

class OcrController extends BaseController {
  async simple() {

  }

  async idVeriy() {
    let body = this.ctx.request.body;
    let res = await this.ctx.service.ocr.getCardInfoAli(body);
    this.ctx.body = {
      res: res
    }
  }
}

module.exports = OcrController;