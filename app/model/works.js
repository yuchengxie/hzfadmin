module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d = new Date();

  const WorksSchema = new Schema({
    name: {
      type: String, default: ''
    },
    brief: {
      type: String, default: ''
    },
    workimg: {
      type: String, default: ''
    },
    add_time: {
      type: Number,
      default: d.getTime()
    },
  });
  return mongoose.model('Works', WorksSchema, 'works');
}