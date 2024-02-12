import { Composite } from "matter-js";
import { MatetrObject } from "./MatterObject";

class Polygon extends MatetrObject {
  DefaultSides = 5;
  DefaultRadius = 50;
  constructor(
    x,
    y,
    type = "default",
    sides = this.DefaultSides,
    radius = this.DefaultRadius,
    option = {},
    isSpawn = false,
  ) {
    super(x, y, type);
    if (!isSpawn) {
      this.object = this.bodies.polygon(x, y, sides, radius, this.getOptionAddColor(option, type));
      Composite.add(this.compositeCreate, this.object);
    } else {
      this.object = null;
    }
  }

  objectSpawn(x, y, sides, height, option) {
    const triangle = this.bodies.polygon(x, y, sides, height, option);
    Composite.add(this.compositeCreate, triangle);
  }
}

export { Polygon };