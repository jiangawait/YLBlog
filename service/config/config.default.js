/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1582881647136_3341";

  // add your middleware config here
  config.middleware = [];
  config.mysql = {
    // database configuration
    client: {
      // host
      host: "47.99.240.75",
      // port
      port: "3306",
      // username
      user: "root",
      // password
      password: "yangling2020",
      // database
      database: "yangling_blog",
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [
      "http://localhost:3000",
      "http://localhost:3002",
      "http://localhost:8080",
      "http://47.99.240.75:3000",
      "http://47.99.240.75:3002",
      "http://47.99.240.75:8080",
      "http://kobin.top",
      "http://kobin.top:3000",
    ],
  };

  config.cors = {
    // origin: '*',
    // origin: 'http://localhost:3000', // 只允许这个域进行访问接口,不能设置多个域名，多个域名需设置`security.domainWhiteList`
    credentials: true, // 开启认证
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  };

  // 长文本设置
  config.bodyParser = {
    enable: true,
    encoding: "utf8",
    formLimit: "5024kb",
    jsonLimit: "5024kb",
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
