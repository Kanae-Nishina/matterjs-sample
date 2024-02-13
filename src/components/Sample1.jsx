import { useEffect, useRef, useState } from "react";
import MatterEngine from "../lib/MatterEngine";
import CollisionEvents from "../lib/CollisionEvents";
import { useNavigate } from "react-router-dom";
import { Circle } from "../lib/objects/Circle";
import { createObject, createObjects } from "../lib/objects/CreateObjects";
import { Composite } from "matter-js";

function Sample1() {
  // useStateは非同期で値を返すため、useRefを使って参照を保持する
  // TODO : useStateを使うとしたらゲーム開始時までに色々取得している必要がある
  const matterRef = useRef(null);
  const spawnBallRef = useRef(null);
  const switchObjRef = useRef(null);
  const stageDataRef = useRef(null);
  // 非同期でも問題ない（すぐに使うものではない）のでuseStateを使う
  const [gameClear, setGameClear] = useState(false);
  const [loading, setLoading] = useState(true);
  // React Routerのページ遷移
  const navigator = useNavigate();

  // 初回レンダリング時にのみ実行
  useEffect(() => {
    setLoading(true);
    // ステージデータの読み込み
    const getStageData = async () => {
      // TODO : ここで何かしらの方法でステージ名前を取得する
      const query = "Sample1";
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

          /* スポーン用オブジェクトのコンポジットを作成 */
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

  // ゲームクリア時の処理
  // 今回は「スイッチのアニメーションが終わったら」ゲームクリアとなっている
  useEffect(() => {
    if (gameClear) {
      // なんとなくゆとりを持たせるために1秒待つ
      const timeoutId = setTimeout(() => {
        alert("ゲームクリア");
        clearTimeout(timeoutId);
      }, 1000);
    }
  }, [gameClear]);

  // matter.js周りの初期化処理
  const matterInitialize = () => {
    // セットアップ
    matterRef.current = new MatterEngine();
    matterRef.current.setup(".Game");

    // イベント設定
    const colEvents = new CollisionEvents(matterRef.current.getEngine());
    colEvents.pushSwitch(handleSwitch);

    // オブジェクト登録
    // スイッチオブジェクトの取得
    const switchButton = createObject(stageDataRef.current.Switch, "Switch");
    switchObjRef.current = switchButton;
    // ステージオブジェクトの取得
    const stageObject = createObjects(stageDataRef.current.Stage);

    // matter.jsに登録
    matterRef.current.registerObject([switchButton, ...stageObject]);
    matterRef.current.run();
  }

  // スイッチ押下時のイベント
  const handleSwitch = () => {
    // スイッチ押下アニメーション
    const intervalId = setInterval(() => {
      // アニメーションが終わったらtrueを返す
      const results = switchObjRef.current.setPositionAnimate(600, 580);
      setGameClear(results);
      // アニメーションが終わったらsetIntervalを解除
      if (results) {
        clearInterval(intervalId);
      }
    }, 1000 / 30); // 30FPS
  };

  // クリックでボール生成
  const handleSpawnBall = (e) => {
    // 画面全体ではなくmatter.jsを描画している要素のサイズを取得
    const rect = e.target.getBoundingClientRect();
    // 画面全体の座標から要素内の座標に変換
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // 生成されるボールの半径
    const radius = 25;
    // 生成されるボールのオプション
    const option = {
      label: "ball", // ラベル。スイッチとの識別に必要
      density: 10, // 密度
      render: {
        fillStyle: "cyan" // 塗りつぶす色
      }
    }
    // 初期化時に用意したボールのコンポジットに登録し、ボールを生成
    Composite.add(spawnBallRef.current, new Circle(x, y, "ball", radius, option).getObject());
  };

  // リセットボタン
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

export default Sample1;
