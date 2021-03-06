module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d = new Date();
  const GoodsSchema = new Schema({
    spu: { type: Schema.Types.Mixed },
    master: { type: String, default: '' },//唯一 对应admin 中的username
    master_id: { type: Schema.Types.Mixed },////唯一 对应admin 中的username对应的id
    master_nickname:{type:String},
    owner: { type: String, default: '' },
    title: { type: String },
    goods_brief: { type: String },
    sub_title: { type: String },
    goods_sn: { type: String, default: "00000000000000000000000000000000" },
    cate_id_1: { type: Schema.Types.ObjectId},
    cate_id_2: { type: Schema.Types.ObjectId},
    cate_id: { type: String, default: '' },
    click_count: {
      type: Number,
      default: 100
    },
    total_count: {
      type: Number,
      default: 1000000 //总预售数量
    },
    goods_number: {//库存
      type: Number,
      default: 1000
    },
    shop_price: {
      type: Number,
      defautl: 0
    },
    market_price: {
      type: Number,
      default: 0
    },
    relation_goods: {
      type: String
    },
    goods_attrs: {
      type: String
    },
    goods_version: {
      /*版本*/
      type: String
    },
    goods_img: {
      type: String
    },
    
    goods_gift: {
      type: String
    },
    goods_fitting: {
      type: String
    },
    goods_color: {
      type: String,
      defult: ""
    },
    goods_keywords: {
      type: String,
      default: ''
    },
    goods_desc: {
      type: String,
      default: ''
    },
    goods_content: {
      type: String
    },
    sort: { type: Number, default: 100 },
    is_delete: {
      type: Number
    },
    is_hot: {
      type: Number,
      default: 0
    },
    is_best: {
      type: Number,
      default: 0
    },
    is_new: {
      type: Number,
      default: 0
    },
    goods_type_id: {
      type: Schema.Types.Mixed
    },
    status: { type: Number, default: 1 },
    add_time: {
      type: Number,
      default: d.getTime()
    },
    publish_startime: {//发布开始时间
      type: Number,
      default: d.getTime()
    },
    publish_endtime: {//发布截止时间
      type: Number,
      default: d.getTime()
    },
    deliver_time: {//出货时间
      type: Number,
      default: d.getTime()
    },
    cart_status: {
      type: Number,
      default: 0
    },
    cart_num: {
      type: Number,
      default: 0
    }
  });
  return mongoose.model("Goods", GoodsSchema, "goods");
};
