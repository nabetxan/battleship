import { Player } from "./Player";
import { BattleShip } from "./BattleShip";
import { Gameboard } from "./Gameboard";

// test("create new player", () => {
//   const player1 = new Player("Perry", "platypus", false);
//   expect(player1).toEqual({
//     name: "Perry",
//     character: "platypus",
//     isAI: false,
//     gameboard: {
//       ships: [
//         {
//           coordinates: [
//             [0, 0],
//             [1, 0],
//           ],
//           hits: 0,
//           length: 2,
//         },
//         {
//           coordinates: [
//             [3, 0],
//             [3, 1],
//             [3, 2],
//           ],
//           hits: 0,
//           length: 3,
//         },
//       ],
//       attacks: [],
//       size: 10,
//     },
//   });
//   const player2 = new Player("Minochan", "monkey", true);
//   expect(player2).toEqual({
//     name: "Minochan",
//     character: "monkey",
//     isAI: true,
//     gameboard: {
//       ships: [
//         {
//           coordinates: [
//             [0, 0],
//             [1, 0],
//           ],
//           hits: 0,
//           length: 2,
//         },
//         {
//           coordinates: [
//             [3, 0],
//             [3, 1],
//             [3, 2],
//           ],
//           hits: 0,
//           length: 3,
//         },
//       ],
//       attacks: [],
//       size: 10,
//     },
//   });
// });

test("AI random move", () => {
  const player1 = new Player("Perry", "platypus", false);
  const player2 = new Player("Minochan", "monkey", true);
  new BattleShip(player1, player2);
  const gameboard = new Gameboard();

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const attack = [x, y];
      gameboard.attacks.push(attack);
    }
  }
  gameboard.attacks.shift();
  const randomAttack = player2.doAIMove(gameboard);
  const isRandom = gameboard.attacks.some(
    (attack) => attack[0] !== randomAttack[0] && attack[1] !== randomAttack[1]
  );
  expect(randomAttack).toEqual([0, 0]);
  expect(isRandom).toEqual(true);
});
