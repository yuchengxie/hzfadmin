/* eslint valid-jsdoc: "off" */

'use strict';
// import menu from './menu';
var path = require("path");
let menu = require('./menu');
let template = require('./template');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  // const config = exports = {};
  const config = exports = {
    logger: {
      // appLogName: 'info_log.log',
      // coreLogName: 'egg-web.log',
      // agentLogName: 'egg-agent.log',
      // errorLogName: 'common-error.log',
    }
  };

  config.logger = {
    level: 'INFO',
    dir: path.join(__dirname, '../logs/prod'), // 保存路径为工程路径下`logs/prod/app`,
    appLogName: 'info.log'
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577093073011_8675';

  let abcpath = path.join(__dirname, "../");
  config.uploadDir = path.join(abcpath, "app/public/upload");

  // add your middleware config here
  config.middleware = [];

  config.menu = menu;

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.cluster = {
    listen: {
      port: 8001,
      hostname: '0.0.0.0',
    }
  }

  exports.mongoose = {
    url: "mongodb://admin:qwerty123@118.190.105.235:27017/hzfds_admin?replaceState=rs",
    // url: "mongodb://admin:qwerty123@127.0.0.1:27017/hzfds_admin?replaceState=rs",
    options: {
      // useUnifiedTopology: true,
    }
  }

  exports.redis = {
    client: {
      port: 6379,
      host: "118.190.105.235",
      // host:"127.0.0.1",
      password: "qwerty123",
      db: 0
    }
  };

  exports.jwt = {
    secret: "123456"
  };

  //跨域设置
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  config.express = {
    appCode: 'APPCODE 99a7ec151fe248f995582d2420e9a298'
  }

  // exports.io = {
  //   namespace: {
  //     '/': {
  //       connectionMiddleware: ['auth'],
  //       packetMiddleware: [], // 针对消息的处理暂时不实现
  //     },
  //   },
  // };

  // exports.security = {
  //   csrf: {
  //     // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
  //     ignore: ctx => {
  //       // if (
  //       //   ctx.request.url == "/admin/goods/goodsUploadImage" ||
  //       //   ctx.request.url == "/admin/goods/goodsUploadPhoto" ||
  //       //   ctx.request.url == "/pass/doLogin" ||
  //       //   ctx.request.url == "/user/addAddress" ||
  //       //   ctx.request.url == "/user/editAddress"
  //       // ) {
  //       //   return true;
  //       // }
  //       // return false;
  //       return true;
  //     }
  // }
  return {
    ...config,
    ...userConfig,
  };
};