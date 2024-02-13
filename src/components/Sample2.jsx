import { useEffect, useRef, useState } from "react";
import MatterEngine from "../lib/MatterEngine";
import CollisionEvents from "../lib/CollisionEvents";
import { useNavigate } from "react-router-dom";
import MouseEvents from "../lib/MouseEvents";
import { Body } from "matter-js";
import { createObject, createObjects } from "../lib/objects/CreateObjects";

function Sample2() {
  const matterRef = useRef(null);
  const switchObjRef = useRef(null);
  const stageDataRef = useRef(null);
  // ユーザーが配置できるオブジェクト
  const placementDataRef = useRef(null);
  // 現在選択中のオブジェクト
  const selectObjRef = useRef(null);
  const [gameClear, setGameClear] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();
  const clickDiffPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setLoading(true);
    // ステージデータの読み込み
    const getStageData = async () => {
      // TODO : ここで何かしらの方法でステージ名前を取得する
      const query = "Sample2";
      const url = `${process.env.REACT_APP_SERVER_URL}?stage=${query}`;
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((res) => res.json())
        .then((data) => {
          stageDataRef.current = data;
          matterInitialize();
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getStageData();
  }, []);

  useEffect(() => {
    if (gameClear) {
      const timeoutId = setTimeout(() => {
        alert("ゲームクリア");
        clearTimeout(timeoutId);
      }, 1000);
    }
  }, [gameClear]);

  const matterInitialize = () => {
    // セットアップ
    matterRef.current = new MatterEngine();
    matterRef.current.setup(".Game");
    matterRef.current.run();

    // イベント設定
    const colEvents = new CollisionEvents(matterRef.current.getEngine());
    colEvents.pushSwitch(handleSwitch);

    // オブジェクト登録
    // スイッチ
    const switchButton = createObject(stageDataRef.current.Switch, "Switch");
    switchObjRef.current = switchButton;
    // ステージオブジェクト
    const stageObject = createObjects(stageDataRef.current.Stage);
    // ユーザーが移動できるオブジェクト
    const userObject = createObjects(stageDataRef.current.UserPlacement, "User");
    placementDataRef.current = userObject;
    // matter.jsにオブジェクト登録
    matterRef.current.registerObject([switchButton, ...stageObject, ...userObject]);

    // マウスイベント作成
    const mouseEvent = new MouseEvents(matterRef.current.getRender(), matterRef.current.getEngine());
    matterRef.current.setRenderMouse(mouseEvent.getMouse());
    matterRef.current.registerObject(mouseEvent.getMouseConstraint());
    // クリックイベント
    mouseEvent.registerClickEvent(clickEvent);
    mouseEvent.onClickEvents();

    // ドラッグイベント
    mouseEvent.registerDragEvent(dragEvent);
    mouseEvent.onDragEvents();
  }

  // ユーザーが移動できる静止オブジェクトのクリックイベント
  const clickEvent = (e) => {
    // クリックされたオブジェクトを取得
    const object = e.source.body;
    if (!object || !object.label.match(/user(.*)/g)) {
      selectObjRef.current = null;
      return;
    }
    // 選択されているオブジェクトがクリックされたオブジェクトと違うなら選択を解除して新しく選択
    selectObjRef.current = object;
    const diff_x = e.mouse.position.x - selectObjRef.current.position.x;
    const diff_y = e.mouse.position.y - selectObjRef.current.position.y;
    clickDiffPosition.current = { x: diff_x, y: diff_y };
  };

  const dragEvent = (e) => {
    const object = e.source.body;
    if (!object || object.label !== "userStatic") return;
    // ドラッグ中のオブジェクトがあるならドラッグ
    if (selectObjRef.current && selectObjRef.current === object) {
      const mouse = e.source.mouse;
      const x = mouse.position.x - clickDiffPosition.current.x;
      const y = mouse.position.y - clickDiffPosition.current.y;
      Body.setPosition(selectObjRef.current, { x: x, y: y });
    }
  };

  // スイッチ押下時のイベント
  const handleSwitch = () => {
    // スイッチ押下アニメーション
    const intervalId = setInterval(() => {
      const results = switchObjRef.current.setPositionAnimate(600, 580);
      setGameClear(results);
      if (results) {
        clearInterval(intervalId);
      }
    }, 1000 / 30); // 30FPS
  };

  const handleReset = () => {
    // TODO : ページリロードをしているので工夫が必要
    navigator(0);
  };

  // TODO : 回転をステージ作成のみなのか配置も回転できるようにするのかの確認
  // 使う機会が多いようであれば、Mouse.jsにwheel用のイベント追加
  const handleWheel = (e) => {
    // 選択中のオブジェクトがあるなら選択オブジェクトを回転
    if (selectObjRef.current && selectObjRef.current.label === "userStatic") {
      const delta = e.deltaY; // マウスホイールの回転量
      const angle = delta * 0.001; // 回転量が 100 or -100だったので調整する
      Body.rotate(selectObjRef.current, angle);
    }
  };

  return (
    <div>
      {loading ? <div>loading...</div> :
        <>
          <h2>{stageDataRef.current && stageDataRef.current.name}</h2>
          <p>青色・緑色のオブジェクトは移動できます</p>
          <button onClick={() => handleReset()}>リセット</button>
        </>}
      {/* matter.jsにホイールイベントありそう */}
      <div className="Game" onWheel={(e) => handleWheel(e)}></div>
    </div>
  );
}

export default Sample2;
