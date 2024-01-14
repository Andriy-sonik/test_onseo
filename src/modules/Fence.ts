import * as PIXI from "pixi.js";
import { PORT_COLOR } from "../constants";

export default class Fence {
  private fence: PIXI.Graphics;

  constructor(x: number, y: number, width: number = 5, height: number = 100) {
    this.fence = new PIXI.Graphics();
    this.fence.beginFill(PORT_COLOR);
    this.fence.drawRect(x, y, width, height);
    this.fence.endFill();
  }

  initFence(container: PIXI.Container): void {
    container.addChild(this.fence);
  }
}
