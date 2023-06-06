import "./App.css";
import { useEffect, useState } from "react";
import { Player } from "./Player";
import { BattleShip } from "./BattleShip";
import platypusFoot from "./platypus-foot.png";
import lostPlatypus from "./lost-platypus.png";
import platypusButton from "./platypusbutton.png";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import sign from "./sign.png";

const P1 = new Player("(Your name)", "platypus", false);
const P2 = new Player("Computer", "monkey", true);
const battleship = new BattleShip(P1, P2);

function App() {
  const [counter, setCounter] = useState(0);
  const [gameStatus, setGameStatus] = useState("not-started");
  const [direction, setDirection] = useState("y");
  const [currentCell, setCurrentCell] = useState([]);
  const [isAboutLabOpen, setisAboutLabOpen] = useState(false);
  const [result, setResult] = useState();

  const updateCounter = function () {
    setCounter(counter + 1);
  };

  const handleisAboutLabOpen = function () {
    isAboutLabOpen ? setisAboutLabOpen(false) : setisAboutLabOpen(true);
  };

  const updateOnAttack = function (x, y) {
    battleship.P2.gameboard.receiveAttack(x, y);
    if (battleship.P2.gameboard.isAllShipSunk()) {
      setResult("p1-win");
      updateCounter();
    } else {
      const getHit = battleship.P2.doAIMove(battleship.P1.gameboard);
      battleship.P1.gameboard.receiveAttack(getHit[0], getHit[1]);
      updateCounter();
      if (battleship.P1.gameboard.isAllShipSunk()) {
        setResult("p2-win");
        updateCounter();
      }
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
          Platypus Research Game
        </div>
        <div id="players-info-field" className="margin20">
          <div className="name font-large cursor">{battleship.P1.name}</div>
          <div className="font-large">vs</div>
          <div className="name font-large">{battleship.P2.name}</div>
        </div>
      </header>

      <div id="App-body">
        {/* when the game is "not-started", show instruction. */}

        {gameStatus === "not-started" ? (
          <div className="font-normal height80 margin20">
            <div>
              Welcome to our Platypus Research Lab!! Can you find the hidden
              platypus faster than us?
            </div>
            <div>
              Strategically place your piece on the board and rotate it using
              the button on the left.
            </div>
            <div>Let the race begin!</div>
          </div>
        ) : null}

        {isAboutLabOpen === true ? (
          <div className="aboutLab">
            <div>
              <IconButton
                aria-label="close"
                onClick={handleisAboutLabOpen}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <div className="font-normal">
                <p>
                  <b>Welcome to our top-secret Platypus Research Lab!</b>
                </p>
                <p>
                  Our team of renowned scientists has been studying these
                  elusive creatures for years. We have a challenge for you: can
                  you outsmart us and locate the platypus before we do? To
                  begin, you'll need to strategically hide the platypus on the
                  game board. Use the provided pieces to camouflage the
                  platypus, carefully considering your placement. Click the
                  rotation button on the left side to adjust the orientation of
                  the piece, ensuring the platypus remains hidden from our keen
                  eyes. But be warned, our team is equipped with advanced
                  technology and extensive knowledge of the platypus habitat.
                  We'll be searching diligently, analyzing every move you make.
                  The race is on to see who can locate the platypus first - you
                  or our team of expert researchers. Remember, the platypus is a
                  master of disguise, blending seamlessly with its surroundings.
                  The success of our research and your victory depend on your
                  ability to outwit us. Will you be able to outmaneuver our team
                  and locate the platypus faster? Get ready to dive into the
                  exciting world of platypus research. The fate of this unique
                  species lies in your hands. Good luck!
                </p>
              </div>
            </div>
            <div className="to-right">
              <div>Lab Director Signiture </div>
              <img id="sign" src={sign} alt="sign of director"></img>
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
              <div>
                <div
                  id="rotate"
                  className="flex-justify-center margin20 cursor"
                >
                  <img
                    src={platypusButton}
                    alt="platypus"
                    id="rotate-img"
                    className={direction === "x" ? "rotated" : "not-rotated"}
                    onClick={() => {
                      direction === "x" ? setDirection("y") : setDirection("x");
                    }}
                  ></img>
                </div>

                <div className="cursor" onClick={handleisAboutLabOpen}>
                  About the Lab
                  <span className="material-symbols-outlined lab-icon">
                    science
                  </span>
                </div>
              </div>
              <div id="gameboard-preparation">
                {currentGBP1.map((row, y) => (
                  <div className="row flex-justify-center" key={y}>
                    {row.map((cell, x) => {
                      if (cell.ship) {
                        if (
                          cell.ship.coordinates[0][0] === x &&
                          cell.ship.coordinates[0][1] === y
                        ) {
                          const data = cell.ship.getImage();
                          const imageSrc = data.src;
                          const imageClassName = data.className;

                          return (
                            <div className="cell platypus-cell">
                              <img
                                src={imageSrc}
                                className={imageClassName}
                                alt="platypus piece"
                              ></img>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="cell font-normal flex-justify-center platypus-cell"
                              key={`${x}${y}`}
                            ></div>
                          );
                        }
                      } else {
                        const isHighlightCell = currentCell.some(
                          (cell) => cell[0] === x && cell[1] === y
                        );
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
                          if (cell.ship !== undefined) {
                            const data = cell.ship.getImage();
                            const imageSrc = data.src;
                            const imageClassName = data.className;
                            if (
                              cell.ship.coordinates[0][0] === x &&
                              cell.ship.coordinates[0][1] === y &&
                              cell.attacked
                            ) {
                              // console.log("aaa");
                              return (
                                <div className="cell attacked">
                                  <img
                                    src={imageSrc}
                                    className={imageClassName}
                                    alt="platypus piece"
                                  ></img>
                                </div>
                              );
                            } else if (
                              cell.ship.coordinates[0][0] === x &&
                              cell.ship.coordinates[0][1] === y &&
                              cell.attacked === false
                            ) {
                              // console.log("bbb");
                              return (
                                <div className="cell platypus-cell">
                                  <img
                                    src={imageSrc}
                                    className={imageClassName}
                                    alt="platypus piece"
                                  ></img>
                                </div>
                              );
                            } else if (cell.attacked === true) {
                              // console.log("ccc");
                              return (
                                <div
                                  className="cell font-normal flex-justify-center attacked"
                                  key={`${x}${y}`}
                                ></div>
                              );
                            } else if (cell.attacked === false) {
                              // console.log("ddd");
                              return (
                                <div
                                  className="cell font-normal flex-justify-center platypus-cell"
                                  key={`${x}${y}`}
                                ></div>
                              );
                            } else {
                              // console.log("eee");
                              return (
                                <div
                                  className="cell font-normal flex-justify-center"
                                  key={`${x}${y}`}
                                ></div>
                              );
                            }
                          }
                          if (!cell.ship && cell.attacked) {
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
                            if (
                              cell.ship.coordinates[0][0] === x &&
                              cell.ship.coordinates[0][1] === y
                            ) {
                              const data = cell.ship.getImage();
                              const imageSrc = data.src;
                              const imageClassName = data.className;
                              return (
                                <div
                                  className="cell attacked"
                                  key={`p2${x}${y}`}
                                >
                                  <img
                                    src={imageSrc}
                                    className={imageClassName}
                                    alt="platypus piece"
                                  ></img>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className="cell font-normal flex-justify-center attacked"
                                  key={`p2${x}${y}`}
                                ></div>
                              );
                            }
                          }

                          if (cell.ship && cell.attacked) {
                            return (
                              <div
                                className="cell font-normal flex-justify-center attacked"
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
                {result === "p1-win" ? (
                  <div className="result">
                    <div className="font-xxLarge winner">{P1.name} Wins!</div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : null}

                {result === "p2-win" ? (
                  <div className="result">
                    <div className="font-xxLarge winner">{P2.name} Win!</div>
                    <div>
                      {" "}
                      <img
                        src={lostPlatypus}
                        className="result-image"
                        alt="platypus lost"
                      ></img>
                    </div>
                    <div></div>
                    <div></div>
                  </div>
                ) : null}
              </div>

              <div>
                {/* during the game, Restart button appears. */}
                {gameStatus === "on-game" ? (
                  <button
                    id="restart-btn"
                    className="font-xLarge"
                    onClick={() => {
                      setGameStatus("not-started");
                      setDirection("y");
                      setCurrentCell([]);
                      setResult("");
                      P1.reset();
                      P2.reset();
                      battleship.reset(P1, P2);
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
