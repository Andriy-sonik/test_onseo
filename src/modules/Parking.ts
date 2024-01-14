import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";
import {
  PORT_COLOR,
  SHIP_HEIGHT,
  OFFSET_BETWEEN_DOCKS,
  SHIP_WIDTH,
  TIME_TWEEN_ANIMATION,
} from "../constants";

export default class Parking {
  private parking: PIXI.Graphics;
  private ships: any[];
  private rows: number;
  private columns: number;

  constructor(x: number, y: number, app: PIXI.Application) {
    this.parking = new PIXI.Graphics();
    this.parking.position.set(x, y);
    this.parking.beginFill(PORT_COLOR, 0);
    this.parking.drawRect(0, 0, 400, 200);
    this.parking.endFill();
    this.ships = [];
    this.rows = 6;
    this.columns = Infinity;

    app.stage.addChild(this.parking);
  }

  addShip(ship: any): void {
    this.ships.push(ship);
    this.updateShipLayout();
  }

  removeShip(ship: any): void {
    const index = this.ships.indexOf(ship);
    if (index !== -1) {
      this.ships.splice(index, 1);
      this.updateShipLayout();
    }
  }

  updateShipLayout(): void {
    for (let i = 0; i < this.ships.length; i++) {
      const row = i % this.rows;
      const column = Math.floor(i / this.rows);

      const ship = this.ships[i];
      const x = this.parking.x + column * (SHIP_WIDTH + OFFSET_BETWEEN_DOCKS);
      const y = this.parking.y + row * (SHIP_HEIGHT + OFFSET_BETWEEN_DOCKS);

      const tween = new TWEEN.Tween({
        x: ship.getShip().x,
        y: ship.getShip().y,
      });
      tween.to({ x, y }, TIME_TWEEN_ANIMATION);
      tween.onUpdate((obj) => {
        ship.getShip().x = obj.x;
        ship.getShip().y = obj.y;
      });
      tween.start();
    }
  }
}
