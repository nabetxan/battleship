import { Player } from "./Player";

test("create new player", () => {
  const player1 = new Player("Perry", "platypus", false);
  expect(player1).toEqual({
    name: "Perry",
    character: "platypus",
    isAI: false,
    gameboard: {
      ships: [
        {
          coordinates: [
            [0, 0],
            [1, 0],
          ],
          hits: 0,
          length: 2,
        },
        {
          coordinates: [
            [3, 0],
            [3, 1],
            [3, 2],
          ],
          hits: 0,
          length: 3,
        },
      ],
      missedShots: [],
      size: 10,
    },
  });
  const player2 = new Player("Minochan", "monkey", true);
  expect(player2).toEqual({
    name: "Minochan",
    character: "monkey",
    isAI: true,
    gameboard: {
      ships: [
        {
          coordinates: [
            [0, 0],
            [1, 0],
          ],
          hits: 0,
          length: 2,
        },
        {
          coordinates: [
            [3, 0],
            [3, 1],
            [3, 2],
          ],
          hits: 0,
          length: 3,
        },
      ],
      missedShots: [],
      size: 10,
    },
  });
});
