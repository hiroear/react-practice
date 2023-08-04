import React from "react";

export const ColorMessage = ({ color, message, children }) => {
  // ↑propsの中身を引数に、分割代入しておく事で以降 {props.color} と書く所を propsを省略し {color} と書く事ができる
  // console.log("カラフル");
  // console.log(props);

  const contentStyle = {
    color: color, // props.color
    fontSize: "18px"
  };

  return (
    <>
      <p style={contentStyle}>{message}</p> {/* {props.message} */}
      {/* HTML内に javascriptを書く場合は {} で囲う */}
      <p style={contentStyle}>{children}</p> {/* {props.children} */}
    </>
  );
};
