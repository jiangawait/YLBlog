import React, { useContext } from "react";
import { ColorContext } from "./color";
const ShowArea = props => {
  // return <div style={{ color: "blue" }}>字体颜色展示为blue</div>;
  const { color } = useContext(ColorContext);
  return <div style={{ color: color }}>字体颜色展示为{color}</div>;
};

export default ShowArea;
