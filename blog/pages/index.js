import React, { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import { Row, Col, List, Icon } from "antd";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import api from "../config/api";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "../static/style/pages/index.css";
const Home = list => {
  const [mylist, setMylist] = useState(list.data);
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

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div
                    className="list-title"
                    onClick={() =>
                      Router.push({
                        pathname: "/detailed",
                        query: {
                          id: item.id
                        }
                      })
                    }
                  >
                    {item.title}
                  </div>
                  <div className="list-icon">
                    <span>
                      <Icon type="calendar" /> {item.addTime}
                    </span>
                    <span>
                      <Icon type="folder" /> {item.typeName}
                    </span>
                    <span>
                      <Icon type="fire" /> {item.viewCount}人
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

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <Advert />
        </Col>
      </Row>
      <Footer></Footer>
    </>
  );
};
Home.getInitialProps = async () => {
  const res = await api.getArticleList();
  return res;
};
export default Home;
