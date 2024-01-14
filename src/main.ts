import "./style.css";
import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";

import Ship from "./modules/Ship";
import Port from "./modules/Port";
import Parking from "./modules/Parking";

import {
  SHIP_WIDTH,
  SHIP_GENERATION_INTERVAL,
  SHIP_STAY_TIME_IN_PORT,
  SIZE_PORT,
  OFFSET_BETWEEN_DOCKS,
} from "./constants";

const app = new PIXI.Application({
  width: 1000,
  height: 600,
  background: "#1099bb",
});
document.body.appendChild(app.view);

const port = new Port(app);
const parking = new Parking(SIZE_PORT + OFFSET_BETWEEN_DOCKS, 0, app);

const animate = () => {
  requestAnimationFrame(animate);
  TWEEN.update();
};

const checkShipsInParking = () => {
  const fDock = port.docks.filter((dock) => !dock.dock.currentShip);
  const pShips = parking.ships;

  if (fDock) {
    for (let dock of fDock) {
      const availibleShip = parking.ships.find(
        (s) => s.ship.full !== dock.dock.full
      );
      if (availibleShip) {
        availibleShip.moveToGate(port.gate);
        parking.removeShip(availibleShip);
        break;
      }
    }
  }
};

export const validationInDock = (ship, dock) => {
  dock.arrivedShip(ship);
  setTimeout(() => {
    ship.moveToGate(port.gate);
  }, SHIP_STAY_TIME_IN_PORT);
};

export const validationInGate = (ship) => {
  if (ship.ship.wasInDock) {
    ship.ship.dock.unloadShip();
    ship.moveToBack(app);
    checkShipsInParking();
    return;
  } else {
    const dockCondition = ship.ship.full
      ? (dock) => !dock.dock.currentShip && !dock.dock.full
      : (dock) => !dock.dock.currentShip && dock.dock.full;
    const freeDock = port.docks.find(dockCondition);

    if (freeDock) {
      freeDock.setCurrentShip(ship);
      ship.setDock(freeDock);
      ship.moveToDock(ship.ship.dock);
    } else {
      parking.addShip(ship);
    }
  }
};

const generateShip = () => {
  const INITIAL_COORDINATES = {
    x: app.renderer.width - SHIP_WIDTH,
    y: app.renderer.height / 2,
  };
  const full = Math.random() < 0.5;

  const ship = new Ship(INITIAL_COORDINATES.x, INITIAL_COORDINATES.y, full);

  ship.initShip(app);

  ship.moveToGate(port.gate);
};

animate();
generateShip();

setInterval(generateShip, SHIP_GENERATION_INTERVAL);
