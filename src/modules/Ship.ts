import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";
import {
  SHIP_WIDTH,
  SHIP_HEIGHT,
  SHIP_COLORS,
  OFFSET_BETWEEN_DOCKS,
  WIDTH_DOCK,
  HEIGHT_DOCK,
  TIME_TWEEN_ANIMATION,
} from "../constants";
import { validationInGate, validationInDock } from "../main";

export default class Ship {
  private ship: PIXI.Graphics;

  constructor(x: number, y: number, full: boolean) {
    this.ship = new PIXI.Graphics();
    this.ship.position.set(x, y);
    this.ship.wasInDock = false;
    this.ship.full = full;
    this.ship.dock = null;
    this.generateRandomFillShip();
  }

  getShip(): PIXI.Graphics {
    return this.ship;
  }

  initShip(app: PIXI.Application): void {
    app.stage.addChild(this.ship);
  }

  visitedDock(): void {
    this.ship.full = !this.ship.full;
    this.ship.wasInDock = true;
    this.updateShip();
  }

  setDock(dock: any): void {
    this.ship.dock = dock;
  }

  generateRandomFillShip(): void {
    const configShip = {
      alpha: this.ship.full ? 1 : 0,
      color: this.ship.full ? SHIP_COLORS.RED : SHIP_COLORS.GREEN,
    };

    this.drawShip(configShip);
  }

  drawShip({ alpha, color }: { alpha: number; color: number }): void {
    this.ship.beginFill(color, alpha);
    this.ship.lineStyle(2, color);
    this.ship.drawRect(0, 0, SHIP_WIDTH, SHIP_HEIGHT);
    this.ship.endFill();
  }

  updateShip(): void {
    const configShip = {
      alpha: this.ship.full ? 1 : 0,
      color: !this.ship.full ? SHIP_COLORS.RED : SHIP_COLORS.GREEN,
    };
    this.ship.clear();
    this.drawShip(configShip);
  }

  move(posX: number, posY: number, callback: (ship: Ship) => void): void {
    const tween = new TWEEN.Tween({
      x: this.ship.position.x,
      y: this.ship.position.y,
    });
    tween.to({ x: posX, y: posY }, TIME_TWEEN_ANIMATION);
    tween.onUpdate(({ x, y }) => {
      this.ship.position.x = x;
      this.ship.position.y = y;
    });
    tween.onComplete(() => {
      if (typeof callback !== "function") return;
      callback(this);
    });
    tween.start();
  }

  moveToGate({ gate }: { gate: any }): void {
    this.move(
      gate.x + OFFSET_BETWEEN_DOCKS,
      gate.y + (gate.height - SHIP_HEIGHT) / 2,
      (ship) => validationInGate(ship)
    );
  }

  moveToDock(dock: any): void {
    this.move(
      dock.dock.x + WIDTH_DOCK,
      dock.dock.y + (HEIGHT_DOCK - SHIP_HEIGHT) / 2,
      (ship) => validationInDock(ship, dock)
    );
  }

  moveToBack(app: PIXI.Application): void {
    this.move(
      app.renderer.width - SHIP_WIDTH,
      app.renderer.height / 2 + SHIP_HEIGHT,
      (ship) => app.stage.removeChild(ship.getShip())
    );
  }
}
