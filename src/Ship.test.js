import { Ship } from "./Ship";

test("Ship module working", () => {
  const ship = new Ship(3);
  expect(ship).toEqual({ length: 3, hits: 0, coordinates: [] });
});

test("increases the number of ‘hits’ in your ship", () => {
  const ship = new Ship(3);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship).toEqual({ length: 3, hits: 1, coordinates: [] });
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  expect(ship).toEqual({ length: 3, hits: 2, coordinates: [] });
  ship.hit();
  expect(ship).toEqual({ length: 3, hits: 3, coordinates: [] });
  expect(ship.isSunk()).toBe(true);
});


test("set coordinates", () =>{
  const ship1 = new Ship(2);
  ship1.setCoordinates(1,2,"x");
  expect(ship1.coordinates).toEqual([[1,2],[2,2]])
  const ship2 = new Ship(4);
  ship2.setCoordinates(6,4,"y");
  expect(ship2.coordinates).toEqual([[6,4],[6,5],[6,6],[6,7]])
})
