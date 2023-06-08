import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";

export class Player {
  constructor(name, character, isAI) {
    this.name = name;
    this.character = character;
    this.isAI = isAI;
    this.gameboard = new Gameboard();
  }

  reset() {
    this.gameboard = new Gameboard();
  }

  doAIMove(p1gameboard) {
    const remainingCells = [];
    const hitButNotSunkCells = [];
    const possibleMoves = [];

    // Check for unattacked cells and "hit but ship is not sunk cells"
    for (let x = 0; x < this.gameboard.size; x++) {
      for (let y = 0; y < this.gameboard.size; y++) {
        if (!p1gameboard.getAttackedAtPosition(x, y)) {
          remainingCells.push([x, y]);
        } else {
          const isThereShip = p1gameboard.getShipAtPosition(x, y);
          if (isThereShip) {
            for (const ship of p1gameboard.ships) {
              const attackedShip = ship.coordinates.some(
                (coord) => coord[0] === x && coord[1] === y
              );

              if (!ship.isSunk() && attackedShip) {
                hitButNotSunkCells.push([x, y]);
              }
            }
          }
        }
      }
    }

    // Attack adjacent cells of hit cells if any
    if (hitButNotSunkCells.length > 0) {
      for (const [x, y] of hitButNotSunkCells) {
        if (x > 0 && !p1gameboard.getAttackedAtPosition(x - 1, y)) {
          possibleMoves.push([x - 1, y]);
        }
        if (
          x < this.gameboard.size - 1 &&
          !p1gameboard.getAttackedAtPosition(x + 1, y)
        ) {
          possibleMoves.push([x + 1, y]);
        }
        if (y > 0 && !p1gameboard.getAttackedAtPosition(x, y - 1)) {
          possibleMoves.push([x, y - 1]);
        }
        if (
          y < this.gameboard.size - 1 &&
          !p1gameboard.getAttackedAtPosition(x, y + 1)
        ) {
          possibleMoves.push([x, y + 1]);
        }
      }
    }

    // Attack remaining cells randomly if no hit cells or adjacent cells available
    const finalMoves =
      hitButNotSunkCells.length > 0 ? possibleMoves : remainingCells;
    const random = Math.floor(Math.random() * finalMoves.length);
    return finalMoves[random];

    // ------ Original -----------// 
    // for (let x = 0; x < this.gameboard.size; x++) {
    //   for (let y = 0; y < this.gameboard.size; y++) {
    //     if (!p1gameboard.getAttackedAtPosition(x, y)) {
    //       remainingCells.push([x, y]);
    //     }
    //   }
    // }
    // const random = Math.floor(Math.random() * (remainingCells.length - 1));
    // return remainingCells[random];
  }

  placeShipCoordinatesForAI() {
    let shipArray = this.gameboard.ships;
    let shipArrayLength = shipArray.length;
    let coordinatesToBeSet = [];
    let nextShipLength = 0;
    let shipIndex = 0;

    do {
      const randomX = Math.floor(Math.random() * this.gameboard.size);
      const randomY = Math.floor(Math.random() * this.gameboard.size);
      const randomDirection = Math.random() < 0.5 ? "x" : "y";

      coordinatesToBeSet = this.placeShipCoordinates(
        randomX,
        randomY,
        randomDirection
      );

      if (coordinatesToBeSet.length < 1) {
        continue;
      }

      const isTaken = coordinatesToBeSet.some((cooA) => {
        return shipArray.some((ship) => {
          return ship.coordinates.some((cooB) => {
            return cooA[0] === cooB[0] && cooA[1] === cooB[1];
          });
        });
      });

      if (isTaken) {
        continue;
      }

      nextShipLength = this.gameboard.getShipLength();
      const ship = new Ship(nextShipLength, shipIndex);
      ship.setCoordinates(randomX, randomY, randomDirection);
      this.gameboard.addShip(ship);
      shipArrayLength = shipArray.length;
      coordinatesToBeSet = [];
      nextShipLength = 0;
      shipIndex = shipIndex + 1;
    } while (shipArrayLength < 5);

    // Test用
    // const ship1 = new Ship(2, 0);
    // ship1.setCoordinates(0, 0, "y");
    // this.gameboard.addShip(ship1);
    // const ship2 = new Ship(3, 1);
    // ship2.setCoordinates(1, 0, "y");
    // this.gameboard.addShip(ship2);
    // const ship3 = new Ship(3, 2);
    // ship3.setCoordinates(2, 0, "y");
    // this.gameboard.addShip(ship3);
    // const ship4 = new Ship(4, 3);
    // ship4.setCoordinates(3, 0, "y");
    // this.gameboard.addShip(ship4);
    // const ship5 = new Ship(5, 4);
    // ship5.setCoordinates(4, 0, "y");
    // this.gameboard.addShip(ship5);
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

    if (isTaken || isOutOfBoard) {
      // do nothing
      return;
    } else {
      const nextShipLength = this.gameboard.getShipLength();

      if (nextShipLength) {
        const ship = new Ship(nextShipLength, shipArrayLength);
        ship.setCoordinates(x, y, direction);

        this.gameboard.addShip(ship);
      }
    }
  }
}
