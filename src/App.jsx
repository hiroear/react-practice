//↓ このファイルの中では eslintをオフにします
/* eslint react-hooks/exhaustive-deps: off*/

import React, { useEffect, useState, useCallback, useMemo } from "react";

//↓ 子コンポーネントで default exportではなく export constした際はコンポーネント名を {分割代入} で importする
import { ColorMessage } from "./components/ColorMessage";
import { ChildArea } from "./components/ChildArea";

const App = () => {
  console.log("最初");
  // useState関数の中から配列の分割代入で取り出す。 useStateの()の中は Stateの初期値を設定できる
  const [num, setNum] = useState(0);
  const [faceFlag, setFaceFlag] = useState(false);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  //⬇︎ CSS(style)
  const contentStyle = {
    color: "blue",
    fontSize: "18px"
  };
  const contentLadyStyle = {
    color: "pink",
    fontSize: "18px"
  };

  // [カウントアップ]ボタンを押すと 1 づつ num の値が増える
  const onClickCountUp = () => setNum(num + 1);

  // !faceFlag: 現在の逆の値に変更
  const switchFaceFlag = () => setFaceFlag(!faceFlag);

  /* useEffectは()の中に関数(アロー関数)をとり、その中に処理を書く
  ()内の第二引数に空の配列 [] をとった場合: そのコンポーネント内で最初の１回目だけ処理を実行する。関心の分離。
  ()内の第二引数に、例[num] と入れた場合: そのコンポーネント内で setNumが更新され numの値が変更された時のみ処理を実行する。 */
  useEffect(() => {
    /*↓ numが 3の倍数の時だけ setFaceFlagを true/false に更新 → 顔文字を表示させる
      numが 0の初めの時点では顔文字を表示させないよう numが0より大きい場合にネストされた if文を実行 */
    if (num > 0) {
      if (num % 3 === 0) {
        /* ↓ ||を使用せず setFaceFlag(true)のみだと Stateの更新が都度行われ再レンダリングが過剰に行われてしまう。既に FaceFlagが trueに設定されている場合は Stateを再度 trueに変更する必要はないので...⬇︎
        ||の左側が falseの場合だけ右側を返すようにする。 faceFlagが false以外の時は　set関数を更新させないようにする */
        faceFlag || setFaceFlag(true);
      } else {
        // ↓︎ &&の左側が trueの場合は右側を返す。 faceFlagが trueの場合だけ set関数を走らせてそれ以外は　set関数を更新させないようにする
        faceFlag && setFaceFlag(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);

  // テキスト入力欄に入力する毎に serTextが更新され 再レンダリングされる
  const onChangeText = (e) => setText(e.target.value);

  // [表示]ボタンを押すと setOpenが現在の逆の値に変更
  const onClickOpen = () => setOpen(!open);

  /* この onClickClose関数を propsで子コンポーネントに渡す前は memo化によって、親のテキストエリアに入力しても 子コンポーネントが再レンダリングされる事はなかったが
  この関数を propsで渡したら、再度テキストエリアに入力する度に子コンポーネントが再レンダリングされるようになってしまった。
  原因は、アロー関数で書いた関数は、毎回新しい関数を生成しているという判断がされてしまうから。結果、毎回違う関数として propsが子コンポーネントに渡されるため
  子コンポーネントで memo化していても、memo化は propsが変更された時のみレンダリングするというものなので、再度レンダリングが起きてしまう。
  関数の処理内容が毎回変わらない内容であれば、同じものを使い回すという指示を出す必要がある。それが useCallback()。 アロー関数全体を useCallback()で囲う
  useEffectと同様に useCallbackも見張る値として第二引数を取ることができ、例えば第二引数に [open] を指定した場合、openが変更された時のみこの関数を再生成する
  第二引数を空の配列[]で指定した場合は、useEffectと同様 最初に生成したものを使い回す、と言う意味になる。(関数の memo化) */
  const onClickClose = useCallback(() => setOpen(false), []);

  /* コンポーネントのmemo化、関数のmemo化、その他に、変数のmemo化も存在する。 それが useMemo()。アロー関数全体を囲い、第二引数をとる
  第一引数のアロー関数で値を返却 → 変数temp に計算結果の 4 が入り、第二引数に空配列[]を設定しているので、 tempは 4 という値を持ったまま使い回される
  変数に設定する際の処理が複雑な場合など useMemoを使うと再レンダリングせず、都度計算も走らないので、そのような際に使用する */
  const temp = useMemo(() => 1 + 3, []);
  console.log(temp);

  return (
    <>
      <h1 style={{ color: "red" }}>こんにちは！</h1>
      {/*⬆ ︎style={{}}: 外側の{}は今から javascriptを書きますよ〜。　内側の{}は javascriptのオブジェクトの波括弧(CSSを直接文字列で書く) */}

      <p style={contentStyle}>お元気ですか？</p>
      <p style={contentLadyStyle}>元気です！</p>
      {/*⬆︎ 一度オブジェクトの定数を定義し、そのオブジェクトの中に CSSを定義しておく方法 */}

      <p>{num}</p>
      <button onClick={onClickCountUp}>カウントアップ</button>
      <br />

      {/* ⬇︎&&の左側が trueの場合は右側を返す　*/}
      {faceFlag && <p>٩( ᐛ )و</p>}

      <button onClick={switchFaceFlag}>on / off</button>

      <ColorMessage color="blue" message="こんにちは" />
      <ColorMessage color="pink">こんばんは</ColorMessage>
      {/* ⬆︎ コンポーネントのタグを HTMLのように囲うと、その中身をコンポ-ネント先で props.children として渡す事ができる */}

      <input value={text} onChange={onChangeText} />
      <br />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} onClickClose={onClickClose} />
    </>
  );
};

export default App;

/* 再レンダリングされる時の条件
① Stateを変更した時
② コンポーネント先の propsの中身が変わった時
③ 親のコンポーネントが再レンダリングされた場合、追従して子のコンポーネントも再レンダリングされる。*/
