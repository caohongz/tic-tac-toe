import React from "react";
// 改为函数式组件
export default function Square(props) {
  // console.log(props);
  const { winner, num } = props;
  // const { num } = props;
  let className = "";

  if (winner.includes(num)) {
    className = "winner-button";
  } else {
    className = "square";
  }
  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
