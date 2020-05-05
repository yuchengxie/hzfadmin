module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d = new Date();

  const InfoTypeSchema = new Schema({
    title: {
      type: String,
      default: ''
    },

    subtitle: {
      type: String,
      default: ''
    },
    
    type: {
      type: String,
      default: 0//活动-2，专题-1,不填-0
    },

    pic: {
      type: String,
      default: ''//图片海报
    },

    content: {
      type: String,
      default: '',//内容
    },

    add_time: {
      type: Number,
      default: d.getTime()
    },
  });
  return mongoose.model('InfoType', InfoTypeSchema, 'infotype');
}