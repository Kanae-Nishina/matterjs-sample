import { Composite } from "matter-js";
import { MatetrObject } from "./MatterObject";

class Rectangle extends MatetrObject {
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
    x = this.posX,
    y = this.posY,
    type = "default",
    width = this.DefaultWidth,
    height = this.DefaultHeight,
    option = {},
    isSpawn = false,
  ) {
    super(x, y, type);
    if (!isSpawn) {
      this.object = this.bodies.rectangle(x, y, width, height, this.getOptionAddColor(option, type));
      Composite.add(this.compositeCreate, this.object);
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
    Composite.add(this.compositeCreate, rectangle);
  }
}

export { Rectangle };