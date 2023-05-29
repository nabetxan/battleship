export class Gameboard {
  constructor() {
    this.ships = [];
    this.missedShots = [];
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
