import { Composite } from "matter-js";
import { MatetrObject } from "./MatterObject";

class Circle extends MatetrObject {
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
    x,
    y,
    type = "default",
    radius = this.DefaultRadius,
    option = {},
    isSpawn = false,
  ) {
    super(x, y, type);
    if (!isSpawn) {
      this.object = this.bodies.circle(x, y, radius, this.getOptionAddColor(option));
      Composite.add(this.compositeCreate, this.object);
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
    Composite.add(this.compositeCreate, circle);
  }
}

export { Circle };