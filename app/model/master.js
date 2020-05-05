module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d = new Date();

  const MasterSchema = new Schema({
    name: {
      type: String, default: ''
    },
    sub: {
      type: String, default: ''
    },
    avatar: {
      type: String, default: ''
    },
    add_time: {
      type: Number,
      default: d.getTime()
    },
  });
  return mongoose.model('Mater', MasterSchema, 'master');
}