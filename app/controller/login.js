'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async setMenu() {
    console.log('menu:', this.config.menu);
    this.ctx.body = {
      menu: this.config.menu
    }
  }
  async login() {
    let fields = this.ctx.request.body;
    fields.password = await this.service.tools.md5(fields.password);

    // if(fields.username==="admin"){
    //   // this.getAuthList();
    //   await this.service.admin.getAllAuthList();
    //   return;
    // }
    
    let result = await this.ctx.model.Admin.find({
      "username": fields.username,
      "password": fields.password
    });
    if (result.length > 0) {
      let role_id = result[0].role_id;
      var [accessArr, list] = await this.service.admin.getAuthList(role_id);
      this.ctx.body = {
        code: 20000,
        // msg: {
        //   msg: {
        //     userinfo: result,
        //     accessArr,
        //     list
        //   }
        // }
        msg: {
          userinfo: result,
          accessArr,
          list
        }
      }
    } else {
      this.ctx.body = {
        code: 20001,
        menu: '用户名或密码错误',
      }
    }
    // this.ctx.body = {
    //   code: 20000,
    //   menu: this.config.menu,
    // }
  }
}

module.exports = LoginController;