'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const result = await this.app.mysql.select('blog_content', {
      where: { type: '视频博客' },
      limit: 10,
      offset: 0,
    });
    console.log(result);
    this.ctx.body = result;
  }

  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  // 根据类别ID获得文章列表
  async getListById() {
    const id = this.ctx.query.id;
    const sql = `SELECT article.id as id,
      article.title as title,
      article.introduce as introduce,
      article.article_content as article_content,
      FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
      article.view_count as view_count,
      type.typeName as typeName,
      type.id as typeId from article LEFT JOIN type ON article.type_id = type.id WHERE type.id = ${id}`;
    console.log('list sql', sql);

    // const sql =
    //   'SELECT article.id as id,' +
    //   'article.title as title,' +
    //   'article.introduce as introduce,' +
    //   "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
    //   'article.view_count as view_count ,' +
    //   'type.typeName as typeName ' +
    //   'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    //   'WHERE type_id=' +
    //   id;
    const result = await this.app.mysql.query(sql);
    console.log('articleList', result);
    this.ctx.body = { data: result };
  }
  async getArticleList() {
    const sql =
      'SELECT article.id as id,' +
      'article.type_id as typeId,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      // 'article.addTime as addTime,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'article.view_count as viewCount,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type on (article.type_id = type.Id) WHERE type.typeName is not null';

    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results,
    };
  }
  async getArticleById() {
    // 先配置路由的动态传值，然后再接收值
    const id = this.ctx.query.id;
    console.log('id:', id);
    console.log('this.ctx.query.id:', this.ctx.query.id);
    const sql = `SELECT article.id as id,
      article.title as title,
      article.introduce as introduce,
      article.article_content as article_content,
      FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
      article.view_count as view_count,
      type.typeName as typeName,
      type.id as typeId
      from article LEFT JOIN type ON article.type_id = type.id WHERE article.id = ${id}`;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
