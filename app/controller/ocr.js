'use strict';

let fs = require('fs');
var BaseController = require('./base.js');

class OcrController extends BaseController {
  async simple() {

  }

  async front() {
    console.log('front1111');
    
    let img=fs.readFileSync('WechatIMG5.jpeg','utf-8');
    console.log('img:',img);
    this.ctx.body = {
      res: '11'
    }
  }
}

module.exports = OcrController;