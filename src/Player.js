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
  }
}
