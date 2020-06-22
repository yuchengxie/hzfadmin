
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  var d = new Date();
  const SalesSchema = new Schema({
    goods_select: {
      type: Array,
      default: []
    },
    amount: {
      type: Number  //金额
    },
    limit: {
      type: Number  //门槛
    },
    name: {
      type: String    //活动名称
    },
    beginTime: {
      type: Number,
      default: d.getTime()     //开始时间
      // default:''
    },
    endTime: {
      type: Number,
      default: d.getTime()   //结束时间
    },
    receive: {
      type: Number  //领取次数
    },
    type: {
      type: Number  //发放权限  
    },
    description: {
      type: String       //活动说明
    },
  });

  return mongoose.model('Plat', SalesSchema, 'plat');
}