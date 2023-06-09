import "./App.css";
import { useEffect, useState } from "react";
import { Player } from "../Player";
import { BattleShip } from "../BattleShip";
import platypusFoot from "./platypus-foot.png";
import lostPlatypus from "./lost-platypus.png";
import platypusCaptured from "./platypusCaptured.png";
import platypusButton from "./platypusbutton.png";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import sign from "./sign.png";
import SetupGameboard from "./SetupGameboard";

const P1 = new Player("Minochan", "platypus", false);
const P2 = new Player("Computer", "monkey", true);
const battleship = new BattleShip(P1, P2);

function App() {
  const [counter, setCounter] = useState(0);
  const [isAboutLabOpen, setisAboutLabOpen] = useState(false);
  const [gameStatus, setGameStatus] = useState("not-started");
  const [direction, setDirection] = useState("y");
  const [result, setResult] = useState();

  const updateCounter = function () {
    setCounter(counter + 1);
  };

  const handleisAboutLabOpen = function () {
    isAboutLabOpen ? setisAboutLabOpen(false) : setisAboutLabOpen(true);
  };

  const handleChangeName = (e, player) => {
    player.name = e.target.value;
    updateCounter();
  };

  const updateOnAttack = function (x, y) {
    battleship.P2.gameboard.receiveAttack(x, y);
    if (battleship.P2.gameboard.isAllShipSunk()) {
      setGameStatus("game-finished");
      setResult("p1-win");
      updateCounter();
    } else {
      const getHit = battleship.P2.doAIMove(battleship.P1.gameboard);
      battleship.P1.gameboard.receiveAttack(getHit[0], getHit[1]);
      updateCounter();
      if (battleship.P1.gameboard.isAllShipSunk()) {
        setGameStatus("game-finished");
        setResult("p2-win");
        updateCounter();
      }
    }
  };

  const handleClickRestartButton = function () {
    setGameStatus("not-started");
    setDirection("y");
    setResult("");
    P1.reset();
    P2.reset();
    battleship.reset(P1, P2);
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
          {gameStatus === "not-started" || gameStatus === "ready-to-play" ? (
            <TextField
              id="standard-basic"
              label="Your name"
              variant="filled"
              spellCheck={false}
              sx={{
                input: {
                  color: "var(--color-white)",
                  fontSize: "25px",
                  fontFamily: "Shadows Into Light",
                },
                label: {
                  color: "var(--color-white)",
                  fontFamily: "Shadows Into Light",
                  "&.Mui-focused": {
                    color: "var(--color-start-button)", // Customize the label color when focused
                  },
                },
                minWidth: "150px",

                "& .MuiFilledInput-underline:before": {
                  borderBottomColor: "var(--color-white)", // Customize the underline color
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "var(--color-start-button)", // Customize the highlight color
                },
                "& .MuiFilledInput-underline:hover:before": {
                  borderBottomColor: "var(--color-start-button)", // Customize the hover color
                },
              }}
              defaultValue={P1.name !== "" ? P1.name : "Minochan"}
              onChange={(e) => handleChangeName(e, P1)}
            />
          ) : (
            <div className="name font-large">{battleship.P1.name}</div>
          )}

          <div className="font-large">vs</div>
          <div className="name font-large">{battleship.P2.name}</div>
        </div>
      </header>

      <div id="App-body">
        {/* when the game is "not-started", show below short instruction. */}

        {gameStatus === "not-started" ? (
          <div className="font-normal height80 margin20">
            <div>
              Hello {P1.name === "Minochan" ? "there" : <b>{P1.name}</b>}!!{" "}
            </div>
            <div>
              Welcome to our Platypus Research Lab. Can you find the hidden
              platypus faster than us?
            </div>
            <div>
              Place your piece on the board and rotate it using the button on
              the left.
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
                  color: "var(--color-white)",
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
            <div>
              <div
                id="gameboard-field-for-preparation"
                className="flex-justify-center"
              >
                <div>
                  <IconButton aria-label="rotate">
                    <div
                      id="rotate"
                      className="flex-justify-center margin20 cursor"
                    >
                      <img
                        src={platypusButton}
                        alt="platypus"
                        id="rotate-img"
                        className={
                          direction === "x" ? "rotated" : "not-rotated"
                        }
                        onClick={() => {
                          setTimeout(() => {
                            direction === "x"
                              ? setDirection("y")
                              : setDirection("x");
                          }, 100);
                        }}
                      ></img>
                    </div>
                  </IconButton>
                  <div className="cursor" onClick={handleisAboutLabOpen}>
                    About the Lab
                    <span className="material-symbols-outlined lab-icon">
                      science
                    </span>
                  </div>
                </div>
                <SetupGameboard
                  player={P1}
                  direction={direction}
                  updateCounter={updateCounter}
                />
              </div>
            </div>
          ) : null}

          {gameStatus === "on-game" || gameStatus === "game-finished" ? (
            <div>
              <div
                id="on-game-field"
                className="flex-justify-center"
                key="on-game-field"
              >
                <div
                  id="gameboard-p1"
                  className="flex-justify-center margin20"
                  key="gameboard-p1"
                >
                  {currentGBP1.map((row, y) => {
                    return (
                      <div
                        className="row flex-justify-center"
                        key={`p1-row${y}`}
                      >
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
                              return (
                                <div
                                  className="cell attacked"
                                  key={`p1${x}${y}`}
                                >
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
                              return (
                                <div
                                  className="cell platypus-cell"
                                  key={`p1${x}${y}`}
                                >
                                  <img
                                    src={imageSrc}
                                    className={imageClassName}
                                    alt="platypus piece"
                                  ></img>
                                </div>
                              );
                            } else if (cell.attacked === true) {
                              return (
                                <div
                                  className="cell font-normal flex-justify-center attacked"
                                  key={`p1${x}${y}`}
                                ></div>
                              );
                            } else if (cell.attacked === false) {
                              return (
                                <div
                                  className="cell font-normal flex-justify-center platypus-cell"
                                  key={`p1${x}${y}`}
                                ></div>
                              );
                            } else {
                              return (
                                <div
                                  className="cell font-normal flex-justify-center"
                                  key={`p1${x}${y}`}
                                ></div>
                              );
                            }
                          }
                          if (!cell.ship && cell.attacked) {
                            return (
                              <div
                                className="cell font-normal flex-justify-center"
                                key={`p1${x}${y}`}
                              >
                                ➰
                              </div>
                            );
                          } else {
                            return (
                              <div
                                className="cell font-normal flex-justify-center"
                                key={`p1${x}${y}`}
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

                <div
                  id="gameboard-p2"
                  className="flex-justify-center margin20"
                  key="gameboard-p2"
                >
                  {currentGBP2.map((row, y) => {
                    return (
                      <div
                        className="row flex-justify-center"
                        key={`p2-row${y}`}
                      >
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
                {/* during the game, Restart button appears. */}
                {gameStatus === "on-game" ? (
                  <button
                    id="restart-btn-on-game"
                    className="font-xLarge"
                    onClick={handleClickRestartButton}
                  >
                    Restart
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
        <div>
          {result === "p1-win" ? (
            <div className="result">
              <div className="font-xLarge winner">{P1.name} Wins!!</div>
              <div>
                <img
                  src={platypusCaptured}
                  className="win-result-image"
                  alt="platypus captured"
                ></img>
              </div>
              <div></div>
              <div>
                <button
                  id="restart-btn"
                  className="font-xLarge"
                  onClick={handleClickRestartButton}
                >
                  Restart
                </button>
              </div>
            </div>
          ) : null}
          {result === "p2-win" ? (
            <div className="result">
              <div className="font-xLarge winner">{P2.name} Wins</div>
              <div>
                <img
                  src={lostPlatypus}
                  className="lost-result-image"
                  alt="platypus lost"
                ></img>
              </div>
              <div></div>
              <div>
                <button
                  id="restart-btn"
                  className="font-xLarge"
                  onClick={handleClickRestartButton}
                >
                  Restart
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
