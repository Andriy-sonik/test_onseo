import * as PIXI from "pixi.js";
import { SIZE_GATE, PORT_COLOR, WIDTH_LINE } from "../constants";

export default class Gate {
  private gate: PIXI.Graphics;

  constructor(x: number, y: number) {
    this.gate = new PIXI.Graphics();
    this.gate.position.set(x, y);
    this.gate.beginFill(PORT_COLOR, 0.1);
    this.gate.drawRect(0, 0, WIDTH_LINE, SIZE_GATE);
    this.gate.endFill();
  }

  initGate(container: PIXI.Container): void {
    container.addChild(this.gate);
  }
}
