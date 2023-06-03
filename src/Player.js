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

  placeShip(battleship, x, y, direction) {
    const shipLength = battleship.P1.gameboard.getShipLength();

    // you cannot place a ship if it exceeds the board
    // you cannot place a ship if there's another ship

    let isOutOfBoard = false;
    let isTaken = false;
    const coordinatesToBeSet = [];
    const shipArray = battleship.P1.gameboard.ships;
    const shipArrayLength = shipArray.length;
    const gameboardSize = battleship.P1.gameboard.size;

    if (direction[shipArrayLength] === "x") {
      for (let i = x; i < shipLength + x; i++) {
        coordinatesToBeSet.push([i, y]);
        if (i > gameboardSize - 1) {
          isOutOfBoard = true;
        }
      }
    }

    if (direction[shipArrayLength] === "y") {
      for (let i = y; i < shipLength + y; i++) {
        coordinatesToBeSet.push([x, i]);
        if (i > gameboardSize - 1) {
          isOutOfBoard = true;
        }
      }
    }

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
      const ship1 = new Ship(2);
      const ship2 = new Ship(3);
      const ship3 = new Ship(3);
      const ship4 = new Ship(4);
      const ship5 = new Ship(5);

      // add ship
      if (shipArrayLength === 0) {
        ship1.setCoordinates(x, y, direction[0]);
        battleship.P1.gameboard.addShip(ship1);
      } else if (shipArrayLength === 1) {
        ship2.setCoordinates(x, y, direction[1]);
        battleship.P1.gameboard.addShip(ship2);
      } else if (shipArrayLength === 2) {
        ship3.setCoordinates(x, y, direction[2]);
        battleship.P1.gameboard.addShip(ship3);
      } else if (shipArrayLength === 3) {
        ship4.setCoordinates(x, y, direction[3]);
        battleship.P1.gameboard.addShip(ship4);
      } else if (shipArrayLength === 4) {
        ship5.setCoordinates(x, y, direction[4]);
        battleship.P1.gameboard.addShip(ship5);
      }

      console.log("p1 ships coordinates", battleship.P1.gameboard.ships);
    }
  }

  getReady(battleship) {
    console.log("Prepare");

    // const ship1 = new Ship(2);
    // const ship2 = new Ship(3);
    // const ship3 = new Ship(3);
    // const ship4 = new Ship(4);
    // const ship5 = new Ship(5);

    // ship2.setCoordinates(3, 0, "y");
    // battleship.P1.gameboard.addShip(ship2);
    // ship3.setCoordinates(4, 3, "x");
    // battleship.P1.gameboard.addShip(ship3);
    // ship4.setCoordinates(1, 3, "y");
    // battleship.P1.gameboard.addShip(ship4);
    // ship5.setCoordinates(2, 9, "x");
    // battleship.P1.gameboard.addShip(ship5);

    // P2
    // const p2ship1 = new Ship(2);
    // p2ship1.setCoordinates(0, 0, "x");
    // battleship.P2.gameboard.addShip(p2ship1);

    // const p2ship2 = new Ship(3);
    // p2ship2.setCoordinates(3, 0, "y");
    // battleship.P2.gameboard.addShip(p2ship2);

    // const p2ship3 = new Ship(3);
    // p2ship3.setCoordinates(4, 3, "x");
    // battleship.P2.gameboard.addShip(p2ship3);

    // const p2ship4 = new Ship(4);
    // p2ship4.setCoordinates(1, 3, "y");
    // battleship.P2.gameboard.addShip(p2ship4);

    // const p2ship5 = new Ship(5);
    // p2ship5.setCoordinates(2, 9, "x");
    // battleship.P2.gameboard.addShip(p2ship5);

    console.log(battleship.P1.gameboard);
  }
}
