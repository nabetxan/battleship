import IMAGE from "../Image/IMAGE";

export class Ship {
  // Your ‘ships’ will be objects that include their length, the number of
  // times they’ve been hit and whether or not they’ve been sunk.
  constructor(length, index) {
    this.length = length;
    this.hits = 0;
    this.coordinates = [];
    this.index = index;
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

  getImage() {
    // check for direction
    const condition1 =
      this.coordinates[0][0] === this.coordinates[1][0] ? "y" : "x";

    // check for array length
    const condition2 = this.index + 1;

    const condition = condition1 + "-" + condition2;
    const obj = {};
    switch (condition) {
      case "x-1":
        obj.src = IMAGE.PLATYPUS_SIZE2;
        obj.className = "platypus-cell-image size2";
        break;

      case "y-1":
        obj.src = IMAGE.PLATYPUS_SIZE2;
        obj.className = "platypus-cell-image size2 img-rotated";
        break;

      case "x-2":
        obj.src = IMAGE.PLATYPUS_SIZE3A;
        obj.className = "platypus-cell-image size3";
        break;

      case "y-2":
        obj.src = IMAGE.PLATYPUS_SIZE3A;
        obj.className = "platypus-cell-image size3 img-rotated";
        break;

      case "x-3":
        obj.src = IMAGE.PLATYPUS_SIZE3B;
        obj.className = "platypus-cell-image size3";
        break;

      case "y-3":
        obj.src = IMAGE.PLATYPUS_SIZE3B;
        obj.className = "platypus-cell-image size3 img-rotated";
        break;

      case "x-4":
        obj.src = IMAGE.PLATYPUS_SIZE4;
        obj.className = "platypus-cell-image size4";
        break;

      case "y-4":
        obj.src = IMAGE.PLATYPUS_SIZE4;
        obj.className = "platypus-cell-image size4 img-rotated";
        break;

      case "x-5":
        obj.src = IMAGE.PLATYPUS_SIZE5;
        obj.className = "platypus-cell-image size5";
        break;

      case "y-5":
        obj.src = IMAGE.PLATYPUS_SIZE5;
        obj.className = "platypus-cell-image size5 img-rotated";
        break;
      default:
      // Code to execute if no case matches
    }

    return obj;
  }
}
