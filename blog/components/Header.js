import React, { useState, useEffect } from "react";
import Router from "next/router";
import { Row, Col, Menu, Icon } from "antd";
import Link from "next/link";
import api from "../config/api";

import "../static/style/components/header.css";

const Header = () => {
  const [navArray, setNavArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios(servicePath.getTypeInfo).then(res => {
      //   setNavArray(res.data.data);
      //   return res.data.data;
      // });
      const result = await api.getTypeInfo();
      setNavArray(result.data);
    };
    fetchData();
  }, []);
  //跳转到列表页
  const handleClick = e => {
    if (e.key == 0) {
      Router.push("/index");
    } else {
      Router.push("/list?id=" + e.key);
    }
  };
  return (
    <div className="header">
      <div className="header-center">
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={13}>
            <span className="header-logo">
              <Link href={{ pathname: "/index" }}>
                <a> 技术胖</a>
              </Link>
            </span>
            <span className="header-txt">专注前端开发,每年100集免费视频。</span>
          </Col>

          <Col className="memu-div" xs={0} sm={0} md={11}>
            <Row type="flex">
              <Col xs={0} sm={0} md={6}>
                <Link href={{ pathname: "/" }}>
                  <a>
                    <Icon type="home" /> 博客首页
                  </a>
                </Link>
              </Col>
              {navArray.map(item => {
                return (
                  <Col xs={0} sm={0} md={6} key={item.id}>
                    <Link href={{ pathname: "/list", query: { id: item.id } }}>
                      <a>
                        <Icon type={item.icon} /> {item.typeName}
                      </a>
                    </Link>
                  </Col>
                );
              })}
            </Row>
            {/* <Menu mode="horizontal" onClick={handleClick}>
              <Menu.Item key="0">
                <Icon type="home" />
                首页
              </Menu.Item> */}

            {/* <Menu.Item key="video">
              <Icon type="youtube" />
              视频
            </Menu.Item>
            <Menu.Item key="life">
              <Icon type="smile" />
              生活
            </Menu.Item> */}
            {/* </Menu> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Header;
