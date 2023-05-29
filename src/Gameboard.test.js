import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";

test("create gameboard", () => {
  const gameboard = new Gameboard();
  expect(gameboard).toEqual({ ships: [], missedShots: [] });
});

test("addShip", () => {
  const ship1 = new Ship(3);
  const gameboard = new Gameboard();
  gameboard.addShip(ship1);
  expect(gameboard).toEqual({
    ships: [{ length: 3, hits: 0, coordinates: [] }],
    missedShots: [],
  });

  const ship2 = new Ship(4);
  gameboard.addShip(ship2);
  expect(gameboard).toEqual({
    ships: [
      { length: 3, hits: 0, coordinates: [] },
      { length: 4, hits: 0, coordinates: [] },
    ],
    missedShots: [],
  });
});

test("receiveAttack", () => {
  const ship1 = new Ship(2);
  const ship2 = new Ship(4);
  const gameboard = new Gameboard();

  gameboard.addShip(ship1);
  gameboard.addShip(ship2);
  ship1.setCoordinates(1, 2, "x");
  ship2.setCoordinates(6, 4, "y");
  gameboard.receiveAttack(6, 5);
  gameboard.receiveAttack(4, 4);
  expect(gameboard).toEqual({
    ships: [
      {
        length: 2,
        hits: 0,
        coordinates: [
          [1, 2],
          [2, 2],
        ],
      },
      {
        length: 4,
        hits: 1,
        coordinates: [
          [6, 4],
          [6, 5],
          [6, 6],
          [6, 7],
        ],
      },
    ],
    missedShots: [[4, 4]],
  });
});

test("is all ships sunk", () => {
  const ship1 = new Ship(2);
  const ship2 = new Ship(4);
  const gameboard = new Gameboard();

  gameboard.addShip(ship1);
  gameboard.addShip(ship2);
  ship1.setCoordinates(1, 2, "x");
  ship2.setCoordinates(6, 4, "y");
  gameboard.receiveAttack(6, 5);
  gameboard.receiveAttack(6, 6);
  gameboard.receiveAttack(6, 7);
  gameboard.receiveAttack(6, 4);
  gameboard.receiveAttack(1, 2);
  gameboard.receiveAttack(2, 2);
  expect(gameboard.isAllShipSunk()).toBe(true);
});
