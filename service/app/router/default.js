'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/default/index', controller.default.home.index);
  // router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
  // router.get('/default/getArticleList', controller.default.home.getArticleList);
  // router.get('/default/getArticleById', controller.default.home.getArticleById);
  // router.get('/default/getListById', controller.default.home.getListById);
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  router.get('/default/getArticleById', controller.default.home.getArticleById);
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
  router.get('/default/getListById', controller.default.home.getListById);
  router.get(
    '/default/getAllPartCount',
    controller.default.home.getAllPartCount
  );
  router.get('/default/getListBBD', controller.default.home.getListBBD);
};
