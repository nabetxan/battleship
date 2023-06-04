import "./App.css";
import { useState } from "react";
import { Player } from "./Player";
import { BattleShip } from "./BattleShip";
import platypus from "./vector-platypus.png";

const P1 = new Player("Platypus", "platypus", false);
const P2 = new Player("Monkey", "monkey", true);
const battleship = new BattleShip(P1, P2);

function App() {
  const [counter, setCounter] = useState(0);
  const [gameStatus, setGameStatus] = useState("not-started");
  const [direction, setDirection] = useState("y");

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
      <header id="App-header">
        <div id="title"> KAKURENBO BATTLE</div>
        <div id="players-info-field">
          <div className="name">{battleship.P1.name}</div>
          <div>vs</div>
          <div className="name">{battleship.P2.name}</div>
        </div>
      </header>

      <div id="App-body">
        {/* when the game is "not-started", show instruction. */}

        {gameStatus === "not-started" ? (
          <div className="instruction">
            <div>Are you ready to play hide-and-seek ("Kakurenbo") game? </div>
            <div> Decide where to hide and place your piece anywhere.</div>
            <div>
              You can rotate the piece by clicking the button on the left side{" "}
            </div>
          </div>
        ) : null}

        {/* when all the pieces are in place, the Start button appears. */}

        {gameStatus === "ready-to-play" ? (
          <button
            id="start-btn"
            onClick={() => {
              // battleship.P1.junbi(battleship);
              setGameStatus("not-started");
              updateCounter();
            }}
          >
            Start
          </button>
        ) : null}

        {/* during the game, Restart button appears. */}

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
            <div id="gameboard-field-for-preparation">
              <div id="rotate">
                <img
                  src={platypus}
                  alt="platypus"
                  id="rotate-img"
                  className={direction === "x" ? "rotated" : "not-rotated"}
                  onClick={() => {
                    direction === "x" ? setDirection("y") : setDirection("x");
                  }}
                ></img>
              </div>
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
                              battleship.P1.placeShip(x, y, direction);

                              // const copyDirection = [...direction];
                              // copyDirection.push(directionPreset);
                              // setDirection(copyDirection);
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
      </div>
    </div>
  );
}

export default App;
