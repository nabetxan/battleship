import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";

export class Player {
  constructor(name, character, isAI) {
    this.name = name;
    this.character = character;
    this.isAI = isAI;
    this.gameboard = new Gameboard();
  }

  doAIMove(p1gameboard) {
    const remainingCells = [];
    for (let x = 0; x < this.gameboard.size; x++) {
      for (let y = 0; y < this.gameboard.size; y++) {
        if (!p1gameboard.getAttackedAtPosition(x, y)) {
          remainingCells.push([x, y]);
        }
      }
    }
    const random = Math.floor(Math.random() * (remainingCells.length - 1));
    return remainingCells[random];
  }

  placeShipCoordinates(x, y, direction) {
    const coordinatesToBeSet = [];
    const shipLength = this.gameboard.getShipLength();
    const gameboardSize = this.gameboard.size;
    let isOutOfBoard = false;

    if (direction === "x") {
      for (let i = x; i < shipLength + x; i++) {
        coordinatesToBeSet.push([i, y]);
        if (i > gameboardSize - 1) {
          isOutOfBoard = true;
        }
      }
    }

    if (direction === "y") {
      for (let i = y; i < shipLength + y; i++) {
        coordinatesToBeSet.push([x, i]);
        if (i > gameboardSize - 1) {
          isOutOfBoard = true;
        }
      }
    }

    if (isOutOfBoard) {
      return [];
    } else {
      return coordinatesToBeSet;
    }
  }

  placeShip(x, y, direction) {
    // you cannot place a ship if it exceeds the board
    // you cannot place a ship if there's another ship
    let isTaken = false;
    const coordinatesToBeSet = this.placeShipCoordinates(x, y, direction);
    const isOutOfBoard = coordinatesToBeSet.length < 1;
    const shipArray = this.gameboard.ships;
    const shipArrayLength = shipArray.length;

    if (shipArrayLength !== 0) {
      isTaken = coordinatesToBeSet.some((cooA) => {
        return shipArray.some((ship) => {
          return ship.coordinates.some((cooB) => {
            return cooA[0] === cooB[0] && cooA[1] === cooB[1];
          });
        });
      });
    }

    console.log("coordinatesToBeSet", coordinatesToBeSet);
    console.log("isTaken", isTaken);
    console.log("isOutOfBoard", isOutOfBoard);

    if (isTaken || isOutOfBoard) {
      // do nothing
      return;
    } else {
      const nextShipLength = this.gameboard.getShipLength();

      if (nextShipLength) {
        const ship = new Ship(nextShipLength);
        ship.setCoordinates(x, y, direction);
        this.gameboard.addShip(ship);
      }

      console.log("p1 ships coordinates", this.gameboard.ships);
    }
  }
}
