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
                <a> 扬舲BLOG</a>
              </Link>
            </span>
            <span className="header-txt">专注前端开发</span>
          </Col>

          <Col className="memu-div" xs={0} sm={0} md={11}>
            <Menu mode="horizontal">
              <Menu.Item key="0">
                <Link href={{ pathname: "/" }}>
                  <a>
                    <Icon type="home" />
                    首页
                  </a>
                </Link>
              </Menu.Item>
              {navArray.map(item => {
                return (
                  <Menu.Item key={item.id}>
                    <Link href={{ pathname: "/list", query: { id: item.id } }}>
                      <a>
                        <Icon type={item.icon} />
                        {item.typeName}
                      </a>
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Header;
