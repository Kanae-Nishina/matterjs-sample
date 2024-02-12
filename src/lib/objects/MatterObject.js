import getColor from "../../common/ColorSetting";
import { Bodies, Body, Composite } from "matter-js";

class MatetrObject {
  composite = null;
  compositeCreate = null;
  bodies = null;
  object = null;
  posX = 0;
  posY = 0;
  type = "default";

  /**
   * @method コンストラクタ
   * @param {Matter} Matter
   * @param {number} x X座標
   * @param {number} y Y座標
   * @description 初期化
   */
  constructor(x, y, type) {
    this.bodies = Bodies;
    this.compositeCreate = Composite.create();
    this.posX = x;
    this.posY = y;
    this.type = type;
  }

  /**
   * @method オブジェクトの静止状態設定
   * @param {bool} bool 静止ならtrue
   */
  setStatic(bool) {
    Body.setStatic(this.object, bool);
  }

  /**
   * @method オブジェクトの位置設定
   * @param {number} x X座標
   * @param {number} y Y座標
   * @description オブジェクトの位置を設定
   */
  setPosition({ x, y }) {
    Body.setPosition(this.object, { x, y });
  }

  /**
   * @method オブジェクトの移動アニメーション
   * @param {number} x X座標
   * @param {number} y Y座標
   * @returns {bool} アニメーション終了フラグ
   * @description 静止オブジェクトにおける目標座標までのアニメーション移動
   */
  setPositionAnimate(x, y) {
    // 現在の座標を取得
    const currentPosition = this.object.position;

    // 目標座標までの距離を計算
    const distanceX = x - currentPosition.x;
    const distanceY = y - currentPosition.y;

    // 移動速度を計算
    const easing = 0.05;
    const speedX = distanceX * easing;
    const speedY = distanceY * easing;
    // 目標座標を計算
    const targetPosition = { x: currentPosition.x + speedX, y: currentPosition.y + speedY };

    /*
     NOTE: 距離が一定以下なら終了とみなす処理
      ルート計算は重いので、X座標とY座標の差分が絶対値の1以下なら終了とみなす
      Math.absは絶対値を返却する関数
    */
    if (Math.abs(distanceX) < 1 && Math.abs(distanceY) < 1) {
      return true;
    }
    this.setPosition(targetPosition);
    return false;
  }

  /**
   * @method オブジェクトをスポーン
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {object} option オプション
   * @description オブジェクトを指定位置にスポーン
   */
  objectSpawn(x, y, option) { }

  /**
   * @method オブジェクトクリア
   * @description 生成したオブジェクトを全削除
   *              同じコンポジット内のオブジェクトが全て削除される
   *              コンポジット自体は削除されない
   */
  objectClear() {
    Composite.clear(this.compositeCreate, false);
  }

  /**
   * @method オブジェクト取得
   * @description 生成したオブジェクトを取得
   */
  getObject() {
    return this.object || this.compositeCreate;
  }

  /**
   *  @method オブジェクトの色設定取得
   * @param {object} option オプション
   * @description オブジェクトの色設定を取得
   *              オプションがあれば、オプションに色設定を追加して返却
   *              オプションがなければ、色設定のみ返却
   */
  getColorSetting(option) {
    let isStatic = option && option.isStatic !== undefined;
    return getColor(this.type, isStatic)
  }

  /**
   * @method オプション取得
   * @param {object} option オプション
   * @description オプションに色設定を追加して返却
   */
  getOptionAddColor(option) {
    let optionAddColor;
    if (option) {
      optionAddColor = { ...option, render: this.getColorSetting(option) };
    } else {
      optionAddColor = { render: this.getColorSetting(option) };
    }
    return optionAddColor;
  }
}

export { MatetrObject };
