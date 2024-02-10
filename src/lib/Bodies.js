import "matter-js";
import getColor from "../common/ColorSetting";
import { Body } from "matter-js";

class Bodies {
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
  constructor(matter, x, y, type) {
    this.bodies = matter.Bodies;
    this.composite = matter.Composite;
    this.compositeCreate = this.composite.create();
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
    this.composite.clear(this.compositeCreate, false);
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

class Rectangle extends Bodies {
  DefaultWidth = 100;
  DefaultHeight = 100;

  /**
   * @method 初期化
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} width 幅
   * @param {number} heigth 高さ
   * @param {object} option オプション
   * @param {bool} isSpawn スポーンオブジェクトか否か
   */
  constructor(
    matter,
    x = this.posX,
    y = this.posY,
    type = "default",
    width = this.DefaultWidth,
    height = this.DefaultHeight,
    option = {},
    isSpawn = false,
  ) {
    super(matter, x, y, type);
    if (!isSpawn) {
      this.object = this.bodies.rectangle(x, y, width, height, this.getOptionAddColor(option, type));
      this.composite.add(this.compositeCreate, this.object);
    } else {
      this.object = null;
    }
  }

  /**
   * @method スポーンオブジェクト生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} width 幅
   * @param {number} height 高さ
   * @param {object} option オプション
   */
  objectSpawn(x, y, width = this.DefaultWidth, height = this.DefaultHeight, option = {}) {
    const rectangle = this.bodies.rectangle(x, y, width, height, option)
    this.composite.add(this.compositeCreate, rectangle);
  }
}

class Circle extends Bodies {
  DefaultRadius = 25;
  /**
   * @method 円生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} radius 半径
   * @param {object} option オプション
   * @description 円を生成
   */
  constructor(
    matter,
    x,
    y,
    type = "default",
    radius = this.DefaultRadius,
    option = {},
    isSpawn = false,
  ) {
    super(matter, x, y, type);
    if (!isSpawn) {
      this.object = this.bodies.circle(x, y, radius, this.getOptionAddColor(option));
      this.composite.add(this.compositeCreate, this.object);
    } else {
      this.object = null;
    }
  }

  /**
   * @method スポーンオブジェクト生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {object} option オプション
   */
  objectSpawn(x, y, radius = this.DefaultRadius, option = {}) {
    const circle = this.bodies.circle(x, y, radius, option);
    this.composite.add(this.compositeCreate, circle);
  }
}

class Triangle extends Bodies {
  DefaultHeight = 100;
  /**
   * @method 三角形生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} height 高さ
   * @param {object} option オプション
   * @description 三角形を生成
   */
  constructor(
    matter,
    x,
    y,
    type = "default",
    height = this.DefaultHeight,
    option = {},
    isSpawn = false,
  ) {
    super(matter, x, y, type);
    if (!isSpawn) {
      this.object = this.bodies.polygon(x, y, 3, height, this.getOptionAddColor(option, type));
      this.composite.add(this.compositeCreate, this.object);
    } else {
      this.object = null;
    }
  }

  objectSpawn(x, y, height, option) {
    const triangle = this.bodies.polygon(x, y, 3, height, option);
    this.composite.add(this.compositeCreate, triangle);
  }
}

class Polygon extends Bodies {
  DefaultSides = 5;
  DefaultRadius = 50;
  constructor(
    matter,
    x,
    y,
    type = "default",
    sides = this.DefaultSides,
    radius = this.DefaultRadius,
    option = {},
    isSpawn = false,
  ) {
    super(matter, x, y, type);
    if (!isSpawn) {
      this.object = this.bodies.polygon(x, y, sides, radius, this.getOptionAddColor(option, type));
      this.composite.add(this.compositeCreate, this.object);
    } else {
      this.object = null;
    }
  }

  objectSpawn(x, y, sides, height, option) {
    const triangle = this.bodies.polygon(x, y, sides, height, option);
    this.composite.add(this.compositeCreate, triangle);
  }
}

// 引数作成のマッパー
const mapper = {
  Rectangle: (stage, type) => {
    return [stage.x, stage.y, type, stage.width, stage.height, stage.option, false];
  },

  Circle: (stage, type) => {
    return [stage.x, stage.y, type, stage.radius, stage.option, false];
  },

  Triangle: (stage, type) => {
    return [stage.x, stage.y, type, stage.height, stage.option, false];
  },

  Polygon: (stage, type) => {
    return [stage.x, stage.y, type, stage.sides, stage.radius, stage.option, false];
  },
};

// 複数オブジェクト作成
const createObjects = (matter, datas, type = "default") => {
  const stageObjects = [];

  for (let data of datas) {
    const object = createObject(matter, data, type);
    stageObjects.push(object);
  }
  return stageObjects;
};

// 単数オブジェクト作成
const createObject = (matter, data, type = "default") => {
  const Class = {
    Rectangle,
    Circle,
    Triangle,
    Polygon,
  }[data.bodiesType];
  const args = mapper[data.bodiesType](data, type);
  return new Class(matter, ...args);
}

export { Bodies, Rectangle, Circle, Triangle, Polygon, createObjects, createObject };
