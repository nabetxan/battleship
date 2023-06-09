import "./App.css";
import { useEffect, useState } from "react";
import { Player } from "../Player";
import { BattleShip } from "../BattleShip";
import lostPlatypus from "./lost-platypus.png";
import platypusCaptured from "./platypusCaptured.png";
import platypusButton from "./platypusbutton.png";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SetupGameboard from "./SetupGameboard";
import MyGameboard from "./MyGameboard";
import OpponentGameboard from "./OpponentGameboard";
import AboutLab from "./AboutLab";

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
                width: "180px",

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

      <div>
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
          <AboutLab handleisAboutLabOpen={handleisAboutLabOpen} />
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
                <MyGameboard player={P1} />
                <OpponentGameboard
                  player={P2}
                  updateOnAttack={updateOnAttack}
                />
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