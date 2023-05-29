export class Ship {
  // Your ‘ships’ will be objects that include their length, the number of
  // times they’ve been hit and whether or not they’ve been sunk.
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.coordinates = [];
  }

  //   Ships should have a hit() function that increases the number of ‘hits’ in your ship.

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.length <= this.hits;
  }

  setCoordinates(x, y, direction) {
    const newCoordinates = [];
    if (direction === "x") {
      for (let i = x; i < this.length + x; i++) {
        newCoordinates.push([i, y]);
      }
    }

    if (direction === "y") {
      for (let i = y; i < this.length + y; i++) {
        newCoordinates.push([x, i]);
      }
    }
    this.coordinates = newCoordinates;
  }
}
