import React, { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import { Row, Col, List, Icon, Affix, BackTop, Spin, Tag } from "antd";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import api from "../config/api";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "../static/style/pages/index.css";
const Home = res => {
  const [mylist, setMylist] = useState(res.list);
  const [topList, setTopList] = useState(res.topList);
  const [type, setType] = useState(res.type);
  const [loading, setLoading] = useState(false);
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
  const goLoading = () => {
    setLoading(true);
  };
  return (
    <>
      <Head>
        <title>首页 | kobin blog</title>
        <meta name="description" content="首页 | kobin blog"></meta>
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
        <Col xs={24} sm={24} md={18}>
          <div className="comm-left">
            <List
              itemLayout="vertical"
              dataSource={topList}
              renderItem={item => (
                <List.Item>
                  <Spin spinning={loading}>
                    <div className="list-title" onClick={goLoading}>
                      <Link
                        href={{ pathname: "/detailed", query: { id: item.id } }}
                      >
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span>
                        <Tag color="#f50">置顶</Tag>
                      </span>
                      <span>
                        <Icon type="calendar" /> {item.addTime}
                      </span>
                      <span>
                        <Icon type="folder" /> {item.typeName}
                      </span>
                      <span>
                        <Icon type="fire" />
                        {item.view_count}人
                        {/* <CountUp end={item.view_count} />人 */}
                      </span>
                    </div>
                    <div
                      className="list-context"
                      dangerouslySetInnerHTML={{ __html: item.introduce_html }}
                    ></div>
                    <div className="list-go">
                      <Icon type="file" /> &nbsp;
                      <span onClick={goLoading} onClick={goLoading}>
                        <Link
                          href={{
                            pathname: "/detailed",
                            query: { id: item.id }
                          }}
                        >
                          <a>查看全文 </a>
                        </Link>
                      </span>
                    </div>
                  </Spin>
                </List.Item>
              )}
            />
          </div>
          <div className="comm-left">
            <List
              header={<div className="list-header">最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <Spin spinning={loading}>
                    <div
                      className="list-title"
                      onClick={goLoading}
                      // onClick={() =>
                      //   Router.push({
                      //     pathname: "/detailed",
                      //     query: {
                      //       id: item.id
                      //     }
                      //   })
                      // }
                    >
                      <Link
                        href={{ pathname: "/detailed", query: { id: item.id } }}
                      >
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span>
                        <Icon type="calendar" /> {item.addTime}
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
                      dangerouslySetInnerHTML={{
                        __html: marked(item.introduce_html)
                      }}
                    ></div>
                  </Spin>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={6}>
          <Author></Author>
          {/* <Advert /> */}
        </Col>
      </Row>
      <Footer></Footer>
    </>
  );
};
Home.getInitialProps = async () => {
  const res = await api.getArticleList();
  console.log("getArticleList:", res);

  return res;
};
export default Home;
