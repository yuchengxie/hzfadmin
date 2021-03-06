'use strict';

const Controller = require('egg').Controller;

class GoodsController extends Controller {


  async spu() {
    //获取所有spu标准单元产品
    let params = this.ctx.request.body;
    let tj = {}
    console.log('params:', params);
    if (params.master_id) {
      tj = {
        master_id: params.master_id
      }
    }
    let list = await this.ctx.model.Goods.aggregate([{
      $lookup: {
        from: "goods",
        localField: "_id",
        foreignField: "spu",
        as: "items",
      }
    },
    {
      $match: {
        spu: "",
        master_id: params.master_id
      },
    },
    {
      $sort: {
        sort: 1
      }
    }
    ]);
    // console.log('list:', list);
    var modules = await this.ctx.model.Goods.find({
      "spu": ""
    }, '_id title').sort({ "sort": 1 });

    let goodsColor = await this.ctx.model.GoodsColor.find({});
    this.ctx.body = {
      code: 20000,
      msg: {
        list,
        modules,
        goodsColor
      }
    }
  }

  async list() {
    let goodsResult = await this.ctx.model.Goods.find({});
    this.ctx.body = {
      code: 20000,
      msg: {
        goodsResult,
      }
    }
  }

  async index() {
    let params = this.ctx.request.body;
    let tj = {}
    if (params.master_id) {
      tj = {
        master_id: params.master_id
      }
    }
    console.log('params:', params);
    let goodsResult = await this.ctx.model.Goods.find(tj);

    console.log('goodsResult:', goodsResult);

    let goodsColor = await this.ctx.model.GoodsColor.find({});
    this.ctx.body = {
      code: 20000,
      msg: {
        goodsResult,
        goodsColor
      }
    }
  }

  async add() {
    let formFields = this.ctx.request.body;
    console.log('add good formFields', formFields);
    //解决cate_id为空
    if (formFields.cate_id === '') {

    }

    // let master = await this.ctx.model.Admin.find({ master_id: formFields.master_id });
    // formFields.master_nickname = master[0].nickname;
    // console.log('ormFields.master_nickname:', formFields.master_nickname);
    if (formFields.cate_id_1 && typeof formFields.cate_id_1 === 'string') {
      formFields.cate_id_1 = this.app.mongoose.Types.ObjectId(formFields.cate_id_1);
    }

    if (formFields.cate_id_2 && typeof formFields.cate_id_2 === 'string') {
      formFields.cate_id_2 = this.app.mongoose.Types.ObjectId(formFields.cate_id_2);
    }

    formFields.goods_sn = await this.service.tools.getRFID();//临时数据测试，随机生成

    if (formFields.spu && typeof formFields.spu === 'string') {
      formFields.spu = this.app.mongoose.Types.ObjectId(formFields.spu);
    }
    console.log('goods add formFields:', formFields);

    if (formFields.goods_type_id && typeof formFields.goods_type_id === 'string') {
      formFields.goods_type_id = this.app.mongoose.Types.ObjectId(formFields.goods_type_id);
    }
    let goods_color = this.service.tools.arrToStr(formFields.goods_color || "");
    formFields.goods_color = goods_color || "";
    //1.增加商品信息
    let goodsRes = await this.ctx.model.Goods(formFields);
    let result = await goodsRes.save();
    //2.增加商品图库信息
    // //2.1将原有数据删除
    // let goods_id = formFields.id || "";
    // console.log('goods_id:', goods_id);
    // if (goods_id) {
    //   let rrrr = await this.ctx.model.GoodsImage.deleteMany({
    //     goods_id: goods_id
    //   })
    //   console.log('rrrr:', rrrr);
    // }
    //2.2写入新数据
    let goods_image_list = formFields.goods_image_list || "";
    if (result._id && goods_image_list) {
      if (typeof goods_image_list === 'string') {
        goods_image_list = new Array(goods_image_list);
      }
      for (let i = 0; i < goods_image_list.length; i++) {
        let goodsImageRes = new this.ctx.model.GoodsImage({
          goods_id: result._id,
          img_url: goods_image_list[i]
        })
        await goodsImageRes.save();
      }
    }
    //3.增加商品类型信息
    let attr_value_list = formFields.attr_value_list;
    let attr_id_list = formFields.attr_id_list;
    if (result._id && attr_value_list && attr_id_list) {
      if (typeof attr_id_list === 'string' || typeof attr_value_list === 'string') {
        attr_id_list = new Array(attr_id_list);
        attr_value_list = new Array(attr_value_list);
      }
      for (let i = 0; i < attr_value_list.length; i++) {
        if (attr_value_list[i]) {
          let goodsTypeAttributeRes = await this.ctx.model.GoodsTypeAttribute.find({
            _id: attr_id_list[i]
          });
          let goodsAttRes = new this.ctx.model.GoodsAttr({
            goods_id: result.id,
            cate_id: formFields.cate_id,
            type_id: formFields.goods_type_id,
            attribute_id: attr_id_list[i],
            attribute_type: goodsTypeAttributeRes[0].attr_type,
            attribute_title: goodsTypeAttributeRes[0].title,
            attribute_value: attr_value_list[i]
          })
          await goodsAttRes.save();
        }
      }
    }
    this.ctx.body = {
      code: 20000,
      msg: '添加商品成功'
    }
  }

  async edit() {
    let formFields = this.ctx.request.body;
    // formFields.goods_sn=await this.service.tools.getRFID()
    console.log('>>>>edit:', formFields);
    if (formFields.goods_type_id && typeof formFields.goods_type_id === 'string') {
      formFields.goods_type_id = this.app.mongoose.Types.ObjectId(formFields.goods_type_id);
    }

    // if(formFields.goods_content && type formFields.goods_content === 'Array'){
      
    // }

    // let master = await this.ctx.model.Admin.find({ _id: this.app.mongoose.Types.ObjectId(formFields.master_id) });
    // console.log('master:',master);
    // formFields.master_nickname = master[0].nickname;
    // console.log('ormFields.master_nickname:', formFields.master_nickname);

    if (formFields.spu && typeof formFields.spu === 'string') {
      formFields.spu = this.app.mongoose.Types.ObjectId(formFields.spu);
    }


    formFields.goods_color = this.service.tools.arrToStr(formFields.goods_color) || "";
    let goods_id = formFields._id;
    await this.ctx.model.Goods.updateOne({
      _id: goods_id
    }, formFields);

    //修改图库信息(增加操作)
    //2.1将原有数据删除
    if (goods_id) {
      let rrrr = await this.ctx.model.GoodsImage.deleteMany({
        goods_id: goods_id
      })
    }
    let goods_image_list = formFields.goods_image_list;
    if (goods_id && goods_image_list) {
      if (typeof goods_image_list === 'string') {
        goods_image_list = new Array(goods_image_list);
      }
      for (let i = 0; i < goods_image_list.length; i++) {
        let goodsImageRes = new this.ctx.model.GoodsImage({
          goods_id: goods_id,
          img_url: goods_image_list[i]
        })
        await goodsImageRes.save();
      }
    }
    //修改商品类型数据
    //1.删除之前的数据
    await this.ctx.model.GoodsAttr.deleteMany({
      goods_id: goods_id
    })
    //2.增加修改了的数据
    let attr_value_list = formFields.attr_value_list;
    let attr_id_list = formFields.attr_id_list;
    if (goods_id && attr_value_list && attr_id_list) {
      if (typeof attr_id_list === 'string' || typeof attr_value_list === 'string') {
        attr_id_list = new Array(attr_id_list);
        attr_value_list = new Array(attr_value_list);
      }
      for (let i = 0; i < attr_value_list.length; i++) {
        let goodsTypeAttributeRes = await this.ctx.model.GoodsTypeAttribute.find({
          _id: attr_id_list[i]
        });
        let goodsAttrRes = new this.ctx.model.GoodsAttr({
          goods_id: goods_id,
          cate_id: formFields.cate_id,
          type_id: formFields.goods_type_id,
          attribute_id: attr_id_list[i],
          attribute_type: goodsTypeAttributeRes[0].attr_type,
          attribute_title: goodsTypeAttributeRes[0].title,
          attribute_value: attr_value_list[i]
        })
        await goodsAttrRes.save();
      }
    }
    this.ctx.body = {
      code: 20000,
      msg: '修改商品数据成功'
    }
  }

  async getAttrs() {
    let params = this.ctx.request.query;
    let type_id = params.type_id;
    let goods_id = params.goods_id;
    let goodsAttrs = await this.ctx.model.GoodsAttr.find({
      type_id: type_id,
      goods_id: goods_id
    })
    this.ctx.body = {
      code: 20000,
      msg: {
        goodsAttrs
      }
    }
  }

  async mix() {
    let goods_id = this.ctx.request.query.id;
    console.log('mix goods_id:', goods_id);
    //获取所有颜色
    let goodsColor = await this.ctx.model.GoodsColor.find();
    //获取所有商品类型
    let goodsType = await this.ctx.model.GoodsType.find({});
    console.log('goodsType:', goodsType);
    //获取商品相册
    let goodsPhoto = await this.ctx.model.GoodsImage.find({
      goods_id: goods_id
    });
    //获取商品分类
    let goodsCate = await this.ctx.model.GoodsCate.aggregate([{
      $lookup: {
        from: "goods_cate",
        localField: "_id",
        foreignField: "pid",
        as: "items"
      }
    },
    {
      $match: {
        pid: "0"
      }
    }
    ]);

    this.ctx.body = {
      code: 20000,
      msg: {
        goodsColor,
        goodsType,
        goodsCate,
        goodsPhoto
      }
    }
  }
}

module.exports = GoodsController;