import { memo } from "react";

// css
const style = {
  width: "100%",
  height: "200px",
  backgroundColor: "khaki"
};

// アロー関数以下を memo()で囲う事により、親のコンポーネントが再レンダリングされても、この子コンポーネントの propsが変更しない限り再レンダリングしない、という意味に(コンポーネントの memo化)
// 親コンポーネントでテキストエリアに入力する度に子コンポーネントも再レンダリングが起きていたが、memo化により起きなくなる (不要な再レンダリングが起きない)
export const ChildArea = memo(({ open, onClickClose }) => {
  const data = [...Array(50).keys()]; // 配列dataに 50件の値が入る
  data.forEach(() => console.log(data)); // 配列の中身を順番に取り出す

  return (
    <>
      {/* open が trueだったら <div>エリアを表示、 falseだったら表示しない */}
      {open ? (
        <div style={style}>
          <p>子コンポーネント</p>
          <button onClick={onClickClose}>閉じる</button>
        </div>
      ) : null}
    </>
  );
});
