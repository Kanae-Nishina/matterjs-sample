import { useEffect, useRef, useState } from "react";
import MatterEngine from "../lib/MatterEngine";
import CollisionEvents from "../lib/CollisionEvents";
import { useNavigate } from "react-router-dom";
import { Body, Composite, Constraint } from "matter-js";
import { Rectangle } from "../lib/objects/Rectangle";
import { Circle } from "../lib/objects/Circle";
import { createObject, createObjects } from "../lib/objects/CreateObjects";
import { MatterEvents } from "../lib/MatterEvents";

function Sample3() {
  const matterRef = useRef(null);
  const spawnBallRef = useRef(null);
  const switchObjRef = useRef(null);
  const stageDataRef = useRef(null);
  const [gameClear, setGameClear] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getStageData = async () => {
      // TODO : ここで何かしらの方法でステージ名前を取得する
      const query = "Sample3";
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

          /* 回転オブジェクトの生成
            TODO : ギミック要素は何を作るか決まってから用意したいのでクラス化していません
          */
          const rotateObj = new Rectangle(500, 200, "default", 300, 30);
          const pivot = new Circle(500, 200, "default", 5, { isStatic: true });
          const constraint = Constraint.create({
            bodyA: rotateObj.getObject(),
            pointA: { x: 0, y: 0 },
            bodyB: pivot.getObject(),
            pointB: { x: 0, y: 0 },
          });

          matterRef.current.registerObject([rotateObj, constraint]);

          // 更新前処理の登録
          const updateEvents = new MatterEvents(matterRef.current.getEngine());
          updateEvents.registerBeforeUpdateEvent(() => {
            Body.setAngularVelocity(rotateObj.getObject(), 0.05);
          });
          updateEvents.onBeforeUpdateEvent();

          // スポーンボールの生成
          spawnBallRef.current = Composite.create();
          matterRef.current.registerObject(spawnBallRef.current);
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
    matterRef.current = new MatterEngine();
    matterRef.current.setup(".Game");

    const colEvents = new CollisionEvents(matterRef.current.getEngine());
    colEvents.pushSwitch(handleSwitch);

    const switchButton = createObject(stageDataRef.current.Switch, "Switch");
    switchObjRef.current = switchButton;
    const stageObject = createObjects(stageDataRef.current.Stage);

    matterRef.current.registerObject([switchButton, ...stageObject]);
    matterRef.current.run();
  }

  const handleSwitch = () => {
    console.log("switch");
    const intervalId = setInterval(() => {
      const results = switchObjRef.current.setPositionAnimate(400, 580);
      setGameClear(results);
      if (results) {
        clearInterval(intervalId);
      }
    }, 1000 / 30);
  };

  const handleSpawnBall = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const radius = 25;
    const option = {
      label: "ball",
      density: 10,
      render: {
        fillStyle: "cyan"
      }
    }
    Composite.add(spawnBallRef.current, new Circle(x, y, "ball", radius, option).getObject());
  };

  const handleReset = () => {
    // TODO : ページリロードをしているので工夫が必要
    navigator(0);
  };

  return (
    <div>
      {loading ? <div>loading...</div> :
        <>
          <h2>{stageDataRef.current && stageDataRef.current.name}</h2>
          <p>クリックでボール生成できます。生成されたボールでスイッチを押すと、アニメーションのあとアラートが表示されます。</p>
          <button onClick={() => handleReset()}>リセット</button>
        </>}
      <div className="Game" onClick={(e) => handleSpawnBall(e)}></div>
    </div>
  );
}

export default Sample3;
