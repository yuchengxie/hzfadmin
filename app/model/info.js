module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d = new Date();

  const InfoSchema = new Schema({
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    cate_id: {
      type: Schema.Types.Mixed
    },
    cate_name: {
      type: String
    },
    mainpic: {
      type: String,
      default: ''//图片海报
    },

    detailpics: {
      type: String,
      default: ''//详细图片组
    },

    content: {
      type: String,
      default: '',//内容
    },

    detail: {
      type: String,
      default: ''
    },

    location: {
      type: String,
      default: '',//地理信息
    },

    comment: {
      type: Schema.Types.Mixed,
    },
    add_time: {
      type: Number,
      default: d.getTime()
    },
  });
  return mongoose.model('Info', InfoSchema, 'info');
}