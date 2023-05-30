export class Gameboard {
  constructor() {
    this.ships = [];
    this.missedShots = [];
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

  currentGameboard() {
    const board = [];
    for (let y = 0; y < this.size; y++) {
      const row = [];
      board.push(row);
      for (let x = 0; x < this.size; x++) {
        row.push({
          ship: this.getShipAtPosition(x, y),
          attacked: false,
        });
      }
    }
    console.log(board);
    return board;
  }

  addShip(ship) {
    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    for (const ship of this.ships) {
      const isHit = ship.coordinates.some(
        (coodinate) => coodinate[0] === x && coodinate[1] === y
      );

      if (isHit) {
        ship.hit();
        return;
      }
    }

    this.missedShots.push([x, y]);
  }

  isAllShipSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
