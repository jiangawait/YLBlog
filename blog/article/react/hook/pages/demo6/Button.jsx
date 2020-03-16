import React, { useContext } from "react";
import { ColorContext, UPDATE_COLOR, UPDATE_SIZE } from "./Color";

const Button = props => {
  const { state, dispatch } = useContext(ColorContext);
  return (
    <>
      <button onClick={() => dispatch({ type: UPDATE_COLOR, color: "red" })}>
        红色
      </button>
      <button onClick={() => dispatch({ type: UPDATE_COLOR, color: "yellow" })}>
        黄色
      </button>
      <button
        onClick={() => dispatch({ type: UPDATE_SIZE, size: state.size + 1 })}
      >
        字体
      </button>
    </>
  );
};
export default Button;
