'use strict';

// "bs58check": "^2.1.2",
// "create-hash": "^1.2.0",

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const {
    router,
    controller
  } = app;

  //public
  router.get('/del', controller.base.del);

  router.get('/', controller.home.index);
  router.get('/menu', controller.login.setMenu);
  router.post('/login', controller.login.login);

  //admin
  router.get('/admin', controller.admin.index);
  router.post('/admin/add', controller.admin.add);
  router.post('/admin/edit', controller.admin.edit);

  //role
  router.get('/role', controller.role.index);
  router.post('/role/add', controller.role.add);
  router.post('/role/edit', controller.role.edit);
  router.get('/role/auth', controller.role.auth);
  router.post('/role/doAuth', controller.role.doAuth);

  //access
  router.get('/access', controller.access.index);
  router.post('/access/add', controller.access.add);
  router.post('/access/edit', controller.access.edit);

  //focus
  router.get('/focus', controller.focus.index);
  router.post('/focus/add', controller.focus.add);
  router.post('/focus/edit', controller.focus.edit);

  //goodscate
  router.get('/goods/cate', controller.goodsCate.index);
  router.get('/goods/cate/top', controller.goodsCate.top);
  router.post('/goods/cate/add', controller.goodsCate.add);
  router.post('/goods/cate/edit', controller.goodsCate.edit);

  //goodstype
  router.get('/goods/type', controller.goodsType.index);
  router.post('/goods/type/add', controller.goodsType.add);
  router.post('/goods/type/edit', controller.goodsType.edit);

  //goodstypeAttr
  router.get('/goods/type/attr', controller.goodsTypeAttr.index);
  router.post('/goods/type/attr/add', controller.goodsTypeAttr.add);
  router.post('/goods/type/attr/edit', controller.goodsTypeAttr.edit);

  //goods
  // router.get('/goods', controller.goods.index);
  router.post('/goods', controller.goods.index);
  router.post('/goods/add', controller.goods.add);
  router.post('/goods/edit', controller.goods.edit);
  router.get('/goods/mix', controller.goods.mix);
  router.get('/goods/attrlist', controller.goods.getAttrs);

  //info
  router.get('/info', controller.info.index);
  router.get('/getInfoTypes', controller.info.getInfoTypes);
  router.post('/info/add', controller.info.add);
  router.post('/info/edit', controller.info.edit);

  //infoType
  router.get('/infoType', controller.infoType.index);
  router.post('/infoType/add', controller.infoType.add);
  router.post('/infoType/edit', controller.infoType.edit);

  //master
  router.get('/master', controller.master.index);
  router.post('/master/add', controller.master.add);
  router.post('/master/edit', controller.master.edit);

  //master
  router.get('/works', controller.works.index);
  router.post('/works/add', controller.works.add);
  router.post('/works/edit', controller.works.edit);

  //setting
  router.post('/system/setMenu', controller.setting.setMenu);

  // express
  router.get('/express/co', controller.express.co);
  router.get('/express/num', controller.express.num);
  router.get('/express/trace', controller.express.trace);

  //ocr
  router.post('/ocr/idVeriy', controller.ocr.idVeriy);

  //user
  router.get('/user', controller.user.index);
  router.post('/user/detail', controller.user.detail);

  //order
  router.get('/order',controller.order.index);
  router.post('/orderExpress',controller.order.bindOrderForExpress);

  //address
  router.get('/address',controller.address.index);
  router.post('/address/detail',controller.address.detail);

  // ================手机接口========================
  // router.get('/v1/home', controller.phone.home.index);
  // router.post('/v1/user', controller.phone.user.index);
  // router.get('/v1/user/list', controller.phone.user.list)
  // router.post('/v1/user/bind', controller.phone.user.bind);
  // router.post('/v1/user/unbind', controller.phone.user.unbind);
  // router.post('/v1/user/sendPhoneCode', controller.phone.user.sendPhoneCode);
  // router.post('/v1/user/register', controller.phone.user.register);
  // router.post('/v1/user/login', controller.phone.user.login);

  // router.post('/v1/orders', controller.phone.order.index);
  // router.get('/v1/order/list', controller.phone.order.getOrders);
  // router.post('/v1/orders/add', controller.phone.order.add);
  // router.post('/v1/orders/confirm', controller.phone.order.confirm);
  // router.post('/v1/orders/change', controller.phone.order.change);
};