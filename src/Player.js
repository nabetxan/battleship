import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";

export class Player {
  constructor(name, character, isAI) {
    this.name = name;
    this.character = character;
    this.isAI = isAI;
    this.gameboard = new Gameboard();

    const ship1 = new Ship(2);
    ship1.setCoordinates(0, 0, "x");
    this.gameboard.addShip(ship1);

    const ship2 = new Ship(3);
    ship2.setCoordinates(3, 0, "y");
    this.gameboard.addShip(ship2);

    const ship3 = new Ship(3);
    ship3.setCoordinates(4, 3, "x");
    this.gameboard.addShip(ship3);

    const ship4 = new Ship(4);
    ship4.setCoordinates(1, 3, "y");
    this.gameboard.addShip(ship4);

    const ship5 = new Ship(5);
    ship5.setCoordinates(2, 9, "x");
    this.gameboard.addShip(ship5);
  }

  doAIMove() {
    const gameboardSize = this.gameboard.size;
    const randomXY = [
      Math.floor(Math.random() * gameboardSize),
      Math.floor(Math.random() * gameboardSize),
    ];
    console.log(randomXY);
    return randomXY;
  }
}
