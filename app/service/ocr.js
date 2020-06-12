const Service = require('egg').Service;
const mineType = require("mime-types");
const request = require('request');

class OCRService extends Service {
  // async getAllExpressComp() {//快递公司查询
  //   let res = await this.ctx.curl('https://api09.aliyun.venuscn.com/express/com', { method: 'GET', data: {}, headers: { Authorization: this.config.express.appCode }, dataType: 'json' });
  //   return res;
  // }

  // async getCardInfoAli(base64Str, side) {
  async getCardInfoAli(body) {
    let url = 'https://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json';
    // let base64Str = this.imgToBase64Filter(imgUrl);
    let options = {
      method: 'post',
      url: url,
      headers:
      {
        'content-type': 'application/json',
        'authorization': 'APPCODE 99a7ec151fe248f995582d2420e9a298'
      },
      // body: {
      //   "image": base64Str,
      //   "configure": { "side": side }//side:face/back
      // },
      body,
      json: true
    }


    return new Promise((resolve, reject) => {
      request(options, (err, res, data) => {
        if (err) {
          reject(err);
        }
        if (data) {
          resolve(data);
        }
      })
    })

    // request(options, (err, res, data) => {
    //   if (err) throw new Error(err);
    //   console.log(data);
    //   return data;
    // })
    // let d = await request(options);
    // console.log('d:',d);
  }

  async getCardInfoService1(imgUrl) {
    let base64Str = this.imgToBase64(imgUrl);
    let url = 'https://zidv2.market.alicloudapi.com/thirdnode/ImageAI/idcardfrontrecongnition';
    let options = {
      method: 'post',
      url: url,
      headers:
      {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': 'APPCODE 99a7ec151fe248f995582d2420e9a298'
      },
      form: { base64Str: base64Str }
    }

    // request(options, (err, res, body) => {
    //   if (err) throw new Error(err);
    //   // console.log(body);
    //   return body;
    // })
  }

}

function imgToBase64(imgUrl) {
  try {
    let imageData = fs.readFileSync(imgUrl);
    if (!imageData) return "";
    let bufferData = Buffer.from(imageData).toString("base64");
    let base64 = "data:" + mineType.lookup(imgUrl) + ";base64," + bufferData;
    // let base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    // let dataBuffer = new Buffer(base64Data, 'base64');
    // fs.writeFileSync('111.jpg', dataBuffer);
    return base64;
  } catch (error) {
    return error;
  }
}

function imgToBase64Filter(imgUrl) {
  try {
    let imageData = fs.readFileSync(imgUrl);
    if (!imageData) return "";
    let bufferData = Buffer.from(imageData).toString("base64");
    let base64 = "data:" + mineType.lookup(imgUrl) + ";base64," + bufferData;
    let base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    // let dataBuffer = new Buffer(base64Data, 'base64');
    // fs.writeFileSync('111.jpg', dataBuffer);
    return base64Data;
  } catch (error) {
    return error;
  }
}

module.exports = OCRService;