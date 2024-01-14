import * as PIXI from "pixi.js";
import { WIDTH_DOCK, HEIGHT_DOCK, PORT_COLOR, WIDTH_LINE } from "../constants";

export default class Dock {
  private dock: PIXI.Graphics;

  constructor(x: number, y: number) {
    this.dock = new PIXI.Graphics();
    this.dock.position.set(x, y);
    this.dock.currentShip = null;
    this.dock.full = false;
    this.drawDock();
  }

  drawDock(): void {
    const alpha = this.dock.full ? 1 : 0;
    this.dock.beginFill(PORT_COLOR, alpha);
    this.dock.lineStyle(WIDTH_LINE, PORT_COLOR);
    this.dock.drawRect(0, 0, WIDTH_DOCK, HEIGHT_DOCK);
    this.dock.endFill();
  }

  updateDock(): void {
    this.dock.clear();
    this.drawDock();
  }

  setCurrentShip(ship: any): void {
    this.dock.currentShip = ship;
  }

  arrivedShip(ship: any): void {
    this.dock.full = ship.ship.full;
    this.updateDock();
    ship.visitedDock();
  }

  unloadShip(): void {
    this.dock.currentShip = null;
  }

  initDock(container: PIXI.Container): void {
    container.addChild(this.dock);
  }
}
