export class Gameboard {
  constructor() {
    this.ships = [];
    this.attacks = [];
    this.size = 10;
  }

  getShipAtPosition(x, y) {
    const ship = this.ships.find((ship) =>
      ship.coordinates.some(
        (coordinate) => coordinate[0] === x && coordinate[1] === y
      )
    );
    return ship;
  }

  getAttackedAtPosition(x, y) {
    const attackedPosition = this.attacks.some(
      (attack) => attack[0] === x && attack[1] === y
    );
    return attackedPosition;
  }

  currentGameboard() {
    const board = [];
    for (let y = 0; y < this.size; y++) {
      const row = [];
      board.push(row);
      for (let x = 0; x < this.size; x++) {
        row.push({
          ship: this.getShipAtPosition(x, y),
          attacked: this.getAttackedAtPosition(x, y),
        });
      }
    }
    return board;
  }

  addShip(ship) {
    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    this.attacks.push([x, y]);
    for (const ship of this.ships) {
      const isHit = ship.coordinates.some(
        (coodinate) => coodinate[0] === x && coodinate[1] === y
      );
      if (isHit) {
        ship.hit();
        return;
      }
    }
  }

  isAllShipSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
