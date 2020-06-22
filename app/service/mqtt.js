const Service = require('egg').Service;
const request = require('request');

class MqttService extends Service {
  async push(msg) {
    if (!msg.type || !msg.body) {
      console.log('不发');
      return
    };
    msg = JSON.stringify(msg);
    return send(msg);
  }
}

function send(msg) {
  return new Promise(function (resolve, reject) {
    request.post({
      url: 'http://rest-hangzhou.goeasy.io/publish', form: {
        appkey: 'BC-800e3007806442cba911388b22a3db1d', channel: 'my_channel',
        content: msg
      }
    }, function (error, response, body) {
      if (body) {
        console.log('body:', body);
        resolve(body);
      } else if (error) {
        console.log('error:', error);
        reject(error);
      }
    })
  })
}




module.exports = MqttService;