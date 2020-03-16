import React, { createContext, useReducer } from "react";

export const ColorContext = createContext();

export const UPDATE_COLOR = "UPDATE_COLOR";
export const UPDATE_SIZE = "UPDATE_SIZE";
const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return {
        ...state,
        color: action.color
      };
    case UPDATE_SIZE:
      return {
        ...state,
        size: action.size
      };
    default:
      return state;
  }
};
export const Color = props => {
  const [state, dispatch] = useReducer(reducer, { color: "blue", size: 14 });
  return (
    <ColorContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ColorContext.Provider>
  );
};
