import React, { useContext } from "react";
import { ColorContext } from "./Color";

const ShowArea = props => {
  const { state } = useContext(ColorContext);
  return (
    <div style={{ color: state.color, fontSize: state.size }}>
      字体颜色展示为{state.color}
    </div>
  );
};
export default ShowArea;
