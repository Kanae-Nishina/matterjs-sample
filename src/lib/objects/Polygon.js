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
  ) {
    super(x, y, type);
    this.object = this.bodies.polygon(x, y, sides, radius, this.getOptionAddColor(option, type));
  }
}

export { Polygon };