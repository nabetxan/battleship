import "./App.css";
import { useEffect, useState } from "react";
import { Player } from "./Player";
import { BattleShip } from "./BattleShip";
import platypus from "./vector-platypus.png";
import platypusFoot from "./platypus-foot.png";
import divRefsize2 from "./platypus-size2.png";

const P1 = new Player("Platypus", "platypus", false);
const P2 = new Player("Monkey", "monkey", true);
const battleship = new BattleShip(P1, P2);

function App() {
  const [counter, setCounter] = useState(0);
  const [gameStatus, setGameStatus] = useState("not-started");
  const [direction, setDirection] = useState("y");
  const [currentCell, setCurrentCell] = useState([]);

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
      // console.log(getHit, getHit[0], getHit[1]);
      battleship.P1.gameboard.receiveAttack(getHit[0], getHit[1]);
      updateCounter();
    }
  };

  const currentGBP1 = battleship.P1.gameboard.currentGameboard();
  const currentGBP2 = battleship.P2.gameboard.currentGameboard();

  const nextShipLength = battleship.P1.gameboard.getShipLength();
  useEffect(() => {
    if (!nextShipLength) {
      setGameStatus("ready-to-play");
    }
  }, [nextShipLength]);

  return (
    <div className="App">
      <header id="App-header">
        <div id="title" className="font-xxLarge">
          KAKURENBO GAME
        </div>
        <div id="players-info-field" className="margin20">
          <div className="name font-large">{battleship.P1.name}</div>
          <div className="font-large">vs</div>
          <div className="name font-large">{battleship.P2.name}</div>
        </div>
      </header>

      <div id="App-body">
        {/* <div id="instruction-field" className="flex-justify-center"> */}
        {/* when the game is "not-started", show instruction. */}

        {gameStatus === "not-started" ? (
          <div className="font-normal height80 margin20">
            <div>Are you ready to play hide-and-seek ("Kakurenbo") game? </div>
            <div> Decide where to hide and place your piece anywhere.</div>
            <div>
              You can rotate the piece by clicking the button on the left side{" "}
            </div>
          </div>
        ) : null}

        {/* when all the pieces are in place, the Start button appears. */}

        {gameStatus === "ready-to-play" ? (
          <div className="height80 margin20">
            <button
              id="start-btn"
              className="font-xLarge"
              onClick={() => {
                battleship.P2.placeShipCoordinatesForAI();
                setGameStatus("on-game");
              }}
            >
              Start
            </button>
          </div>
        ) : null}
        <div id="gameboard-field" className="flex-justify-center">
          {gameStatus === "not-started" || gameStatus === "ready-to-play" ? (
            <div
              id="gameboard-field-for-preparation"
              className="flex-justify-center"
            >
              <div id="rotate" className="flex-justify-center margin20">
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
                  <div className="row flex-justify-center" key={y}>
                    {row.map((cell, x) => {
                      console.log(cell, x);
                      if (cell.ship) {
                        if (
                          cell.ship.coordinates[0][0] === x &&
                          cell.ship.coordinates[0][1] === y
                        ) {
                          return (
                            <div className="cell font-normal">
                              <img
                                src={divRefsize2}
                                className="cell-image-size2"
                                alt="platypus size2"
                              ></img>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="cell font-normal flex-justify-center"
                              key={`${x}${y}`}
                            ></div>
                          );
                        }
                      } else {
                        const isHighlightCell = currentCell.some(
                          (cell) => cell[0] === x && cell[1] === y
                        );

                        // if (cell.ship) {
                        //   return (
                        //     <div
                        //       className="cell font-normal flex-justify-center"
                        //       key={`${x}${y}`}
                        //     >
                        //       🐒
                        //     </div>
                        //   );
                        // } else {
                        //   const isHighlightCell = currentCell.some(
                        //     (cell) => cell[0] === x && cell[1] === y
                        //   );

                        return (
                          <div
                            className={`cell ${
                              isHighlightCell
                                ? "highlight font-normal flex-justify-center"
                                : "font-normal flex-justify-center"
                            }`}
                            key={`${x}${y}`}
                            onClick={() => {
                              battleship.P1.placeShip(x, y, direction);
                              updateCounter();
                            }}
                            onMouseEnter={() => {
                              const coordinatesToBeSet =
                                battleship.P1.placeShipCoordinates(
                                  x,
                                  y,
                                  direction
                                );

                              setCurrentCell(coordinatesToBeSet);
                            }}
                            onMouseLeave={() => {
                              setCurrentCell([]);
                            }}
                          ></div>
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
              <div id="on-game-field" className="flex-justify-center">
                <div id="gameboard-p1" className="flex-justify-center margin20">
                  {currentGBP1.map((row, y) => {
                    return (
                      <div className="row flex-justify-center">
                        {row.map((cell, x) => {
                          if (cell.ship && cell.attacked) {
                            return (
                              <div
                                className="cell font-normal flex-justify-center"
                                key={`${x}${y}`}
                              >
                                👨🏿‍🦲
                              </div>
                            );
                          } else if (cell.ship && !cell.attacked) {
                            return (
                              <div
                                className="cell font-normal flex-justify-center"
                                key={`${x}${y}`}
                              >
                                🐒
                              </div>
                            );
                          } else if (!cell.ship && cell.attacked) {
                            return (
                              <div
                                className="cell font-normal flex-justify-center"
                                key={`${x}${y}`}
                              >
                                ➰
                              </div>
                            );
                          } else {
                            return (
                              <div
                                className="cell font-normal flex-justify-center"
                                key={`${x}${y}`}
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

                <div id="gameboard-p2" className="flex-justify-center margin20">
                  {currentGBP2.map((row, y) => {
                    return (
                      <div className="row flex-justify-center">
                        {row.map((cell, x) => {
                          if (cell.ship?.isSunk()) {
                            return (
                              <div
                                className="cell font-normal flex-justify-center"
                                key={`p2${x}${y}`}
                              >
                                👨🏿‍🦲
                              </div>
                            );
                          }

                          if (cell.ship && cell.attacked) {
                            return (
                              <div
                                className="cell font-normal flex-justify-center"
                                key={`p2${x}${y}`}
                              >
                                <img
                                  src={platypusFoot}
                                  alt="platypus-foot"
                                  className="cell-image"
                                ></img>
                              </div>
                            );
                          } else if (!cell.ship && cell.attacked) {
                            return (
                              <div
                                className="cell font-normal flex-justify-center"
                                key={`p2${x}${y}`}
                              >
                                ➰
                              </div>
                            );
                          } else {
                            return (
                              <div
                                className="cell font-normal flex-justify-center"
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
              <div>
                {/* during the game, Restart button appears. */}
                {gameStatus === "on-game" ? (
                  <button
                    id="restart-btn"
                    className="font-xLarge"
                    onClick={() => {
                      setGameStatus("not-started");
                    }}
                  >
                    Restart
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
