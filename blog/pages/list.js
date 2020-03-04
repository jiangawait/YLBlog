import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Row, Col, List, Icon, Breadcrumb, Spin, Affix } from "antd";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import api from "../config/api";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "../static/style/pages/list.css";

const ArticleList = list => {
  const [mylist, setMylist] = useState(list.data);
  const [loading, setLoading] = useState(false);
  const goLoading = () => {
    setLoading(true);
  };

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  useEffect(() => {
    setMylist(list.data);
  });
  return (
    <>
      <Head>
        <title>列表 | kobin blog</title>
        <link
          rel="icon"
          href="../static/favicon.ico"
          mce_href="../static/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={18}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {mylist.length > 0 ? mylist[0]["typeName"] : "视频列表"}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <List
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link
                      href={{ pathname: "/detailed", query: { id: item.id } }}
                    >
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span>
                      <Icon type="calendar" />
                      {item.addTime}
                    </span>
                    <span>
                      <Icon type="folder" /> {item.typeName}
                    </span>
                    <span>
                      <Icon type="fire" /> {item.view_count}人
                    </span>
                  </div>
                  {/* <div className="list-context">{item.introduce}</div> */}
                  <div
                    className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  ></div>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={6}>
          <Author />
          {/* <Advert /> */}
        </Col>
      </Row>
      <Footer />
    </>
  );
};

ArticleList.getInitialProps = async context => {
  let id = context.query.id;
  let res;
  if (id) {
    res = await api.getListById({ id });
    console.log("pid", id);
    console.log("result", res);
  } else {
    console.log("error.....");
    return { article_content: "Id Error" };
  }

  return res;
};

export default ArticleList;
