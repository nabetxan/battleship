import "./App.css";
import { useState } from "react";
import { Player } from "./Player";
import { BattleShip } from "./BattleShip";

const P1 = new Player("Perry", "platypus", false);
const P2 = new Player("Minochan", "monkey", true);
const battleship = new BattleShip(P1, P2);
// P1.gameboard.receiveAttack(4, 6);
// P1.gameboard.receiveAttack(0, 0);
// P2.gameboard.receiveAttack(0, 0);
// P2.gameboard.receiveAttack(1, 0);
// P2.gameboard.receiveAttack(3, 0);
// P2.gameboard.receiveAttack(4, 0);

function App() {
  const [counter, setCounter] = useState(0);
  const [gameStatus, setGameStatus] = useState("not-started");
  // eslint-disable-next-line
  const [direction, setDirection] = useState(["x", "y", "x", "y", "x"]);

  const updateCounter = function () {
    setCounter(counter + 1);
  };

  const updateOnAttack = function (x, y) {
    battleship.P2.gameboard.receiveAttack(x, y);
    if (battleship.P2.gameboard.isAllShipSunk()) {
      updateCounter();
      console.log("You Win");
    } else {
      const getHit = battleship.P2.doAIMove(battleship.P1.gameboard);
      console.log(getHit, getHit[0], getHit[1]);
      battleship.P1.gameboard.receiveAttack(getHit[0], getHit[1]);
      updateCounter();
    }
  };

  const currentGBP1 = battleship.P1.gameboard.currentGameboard();
  const currentGBP2 = battleship.P2.gameboard.currentGameboard();

  return (
    <div className="App">
      <header className="App-header">
        <div className="name">{battleship.P1.name}</div>
        <div className="name">{battleship.P2.name}</div>

        {gameStatus !== "on-game" ? (
          <button
            id="get-ready-btn"
            onClick={() => {
              battleship.P1.getReady(battleship);
              setGameStatus("on-game");
              updateCounter();
            }}
          >
            START
          </button>
        ) : null}

        {gameStatus === "on-game" ? (
          <button
            id="start-btn"
            onClick={() => {
              // battleship.P1.junbi(battleship);
              setGameStatus("not-started");
              updateCounter();
            }}
          >
            Restart
          </button>
        ) : null}

        <div id="gameboard-field">
          {gameStatus === "not-started" ? (
            <div id="gameboard-preparation">
              {currentGBP1.map((row, y) => (
                <div className="row" key={y}>
                  {row.map((cell, x) => {
                    if (cell.ship) {
                      return (
                        <div className="cell" key={`${x}${y}`}>
                          🐒
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="cell"
                          key={`${x}${y}`}
                          onClick={() => {
                            battleship.P1.placeShip(
                              battleship,
                              x,
                              y,
                              direction
                            );
                            updateCounter();
                          }}
                        >
                          -
                        </div>
                      );
                    }
                  })}
                </div>
              ))}
            </div>
          ) : null}

          {gameStatus === "on-game" ? (
            <div>
              <div id="gameboard-p1">
                {currentGBP1.map((row, y) => {
                  return (
                    <div className="row">
                      {row.map((cell, x) => {
                        if (cell.ship && cell.attacked) {
                          return (
                            <div className="cell" key={`${x}${y}`}>
                              👨🏿‍🦲
                            </div>
                          );
                        } else if (cell.ship && !cell.attacked) {
                          return (
                            <div className="cell" key={`${x}${y}`}>
                              🐒
                            </div>
                          );
                        } else if (!cell.ship && cell.attacked) {
                          return (
                            <div className="cell" key={`${x}${y}`}>
                              ✷
                            </div>
                          );
                        } else {
                          return (
                            <div className="cell" key={`${x}${y}`}>
                              🌱
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                })}
              </div>

              <div id="gameboard-p2">
                {currentGBP2.map((row, y) => {
                  return (
                    <div className="row">
                      {row.map((cell, x) => {
                        if (cell.ship?.isSunk()) {
                          return (
                            <div className="cell" key={`p2${x}${y}`}>
                              👨🏿‍🦲
                            </div>
                          );
                        }

                        if (cell.ship && cell.attacked) {
                          return (
                            <div className="cell" key={`p2${x}${y}`}>
                              ❗️
                            </div>
                          );
                        } else if (!cell.ship && cell.attacked) {
                          return (
                            <div className="cell" key={`p2${x}${y}`}>
                              ✷
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="cell"
                              onClick={() => updateOnAttack(x, y)}
                              key={`p2${x}${y}`}
                            >
                              🌱
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </header>
    </div>
  );
}

export default App;
