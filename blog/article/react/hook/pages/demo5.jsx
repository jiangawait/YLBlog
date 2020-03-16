import React, { useReducer } from "react";

function ReducerDemo() {
  const [count, dispatch] = useReducer((state, action) => {
    switch (action) {
      case "add":
        return state + 10;
      case "sub":
        return state - 10;
      default:
        return state;
    }
  }, 100);
  return (
    <div>
      <h2>现在的分数是{count}</h2>
      <button onClick={() => dispatch("add")}>Increment</button>
      <button onClick={() => dispatch("sub")}>Decrement</button>
    </div>
  );
}

export default ReducerDemo;
