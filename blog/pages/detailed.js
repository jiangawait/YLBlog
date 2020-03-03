import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Row, Col, Affix, Icon, Breadcrumb, BackTop, Skeleton } from "antd";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import api from "../config/api";

import Tocify from "../components/tocify.tsx";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "markdown-navbar/dist/navbar.css";
import "../static/style/pages/detailed.css";

const Detailed = props => {
  let articleContent = props.article_content;
  if (articleContent == "id ERROR") {
    console.log("渲染完成，但什么都没有");

    return false;
  }

  const tocify = new Tocify();
  const renderer = new marked.Renderer();
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  let html = marked(articleContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.title}></meta>
        <link
          rel="icon"
          href="../static/favicon.ico"
          mce_href="../static/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      {/* <Affix offsetTop={0}> */}
      <Header />
      {/* </Affix> */}
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={18}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">{props.title}</div>

              <div className="list-icon center">
                <span>
                  <Icon type="calendar" /> {props.addTime}
                </span>
                <span>
                  <Icon type="folder" /> {props.typeName}
                </span>
                <span>
                  <Icon type="fire" /> {props.view_count}人
                </span>
              </div>
              {/* <div
                className="detailed-content"
                dangerouslySetInnerHTML={{ __html: props.introduce_html }}
              ></div> */}
              <div
                className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              >
                {/* <ReactMarkdown source={markdown} escapeHtml={false} /> */}
              </div>
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={6}>
          <Author />
          {/* <Advert /> */}
          {/* <Affix offsetTop={5}> */}
          <div>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
                <div className="toc-list">{tocify && tocify.render()}</div>
              </Skeleton>
              {/* <MarkNav className="article-menu" source={html} ordered={false} /> */}
              {/* <div className="toc-list">{tocify && tocify.render()}</div> */}
            </div>
          </div>
          {/* </Affix> */}
        </Col>
      </Row>
      <Footer />
      <BackTop />
    </>
  );
};
Detailed.getInitialProps = async context => {
  console.log(context.query.id);
  let id = parseInt(context.query.id);
  let res;
  if (id) {
    res = await api.getArticleById({ id: id });
    if (res.data === "id error") {
      return { article_content: "id ERROR" };
    }
  } else {
    console.log("error......");
    return { article_content: "id ERROR" };
  }

  return res.data[0];
};
export default Detailed;
