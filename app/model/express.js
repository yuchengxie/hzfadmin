module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d = new Date();

  const ExpressSchema = new Schema({
    express_no: { type: String },
    detail: { type: String }
  });

  return mongoose.model("Express", ExpressSchema, "express");
};
