import * as PIXI from "pixi.js";
import Dock from "./Dock";
import Fence from "./Fence";
import Gate from "./Gate";

import {
  OFFSET_BETWEEN_DOCKS,
  HEIGHT_DOCK,
  SIZE_PORT,
  NUMBER_DOCKS,
  SIZE_GATE,
} from "../constants";

export default class Port {
  private portContainer: PIXI.Container;
  private docks: Dock[];
  private gate: Gate | null;

  constructor(app: PIXI.Application) {
    this.portContainer = new PIXI.Container();
    this.docks = [];
    this.gate = null;

    // Додавання доків
    for (let i = 0; i < NUMBER_DOCKS; i++) {
      const dock = new Dock(0, (HEIGHT_DOCK + OFFSET_BETWEEN_DOCKS) * i);
      dock.initDock(this.portContainer);
      this.docks.push(dock);
    }

    // Додавання воріт
    const centerHeight = (app.renderer.height - SIZE_GATE) / 2;
    this.gate = new Gate(SIZE_PORT, centerHeight);
    this.gate.initGate(this.portContainer);

    const fenceTop = new Fence(SIZE_PORT, 0, 5, centerHeight);
    const fenceBottom = new Fence(
      SIZE_PORT,
      app.renderer.height - centerHeight,
      5,
      centerHeight
    );
    fenceTop.initFence(this.portContainer);
    fenceBottom.initFence(this.portContainer);

    app.stage.addChild(this.portContainer);
  }
}
