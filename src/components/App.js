import "./App.css";
import { useEffect, useState } from "react";
import { Player } from "./Player";
import { BattleShip } from "./BattleShip";
import IconButton from "@mui/material/IconButton";
import SetupGameboard from "./SetupGameboard";
import MyGameboard from "./MyGameboard";
import OpponentGameboard from "./OpponentGameboard";
import AboutLab from "./AboutLab";
import SetupPlayers from "./SetupPlayers";
import SwitchAi from "./SwitchAI";
import Introduction from "./Intoduction";
import IMAGE from "../Image/IMAGE";

const P1 = new Player("Minochan", "platypus", false);
const P2 = new Player("Kamachan", "monkey", true);
const battleship = new BattleShip(P1, P2);

const STATUS = {
  NOT_STARTED: "NOT_STARTED", // Hello view, select 1P or 2P
  SETUP_P1: "SETUP_P1", // 1P, 2P -> P1 setup view. If 1P => READY_TO_PLAY. If 2P => SETUP_P2
  SETUP_P2: "SETUP_P2", // 2P -> P2 setup view. => READY_TO_PLAY
  READY_TO_PLAY: "READY_TO_PLAY", // ships placed, before start => ON_GAME_P1
  ON_GAME_P1: "ON_GAME_P1", // 1P, 2P -> P1 play screen. After making a move, if 1P => AI => ON_GAME_P1. if 2P => ON_GAME_SWITCH_P2
  ON_GAME_P2: "ON_GAME_P2", // 2P -> P2 play screen. After making a move => ON_GAME_SWITCH
  ON_GAME_SWITCH_P1: "ON_GAME_SWITCH_P1", // 2P -> Next player waiting screen. If next is P1 => ON_GAME_P1, if next is P2 => ON_GAME_P2
  ON_GAME_SWITCH_P2: "ON_GAME_SWITCH_P2",
  GAME_FINISHED: "GAME_FINISHED",
};

function App() {
  const [counter, setCounter] = useState(0);
  const [isAboutLabOpen, setisAboutLabOpen] = useState(false);
  const [gameStatus, setGameStatus] = useState(STATUS.NOT_STARTED);
  const [direction, setDirection] = useState("y");
  const [result, setResult] = useState();
  const [computerMode, setComputerMode] = useState(true);
  const [moved, setMoved] = useState(false);

  const handleChangeComputerMode = (event) => {
    setComputerMode(event.target.checked);
    P2.isAI = event.target.checked;
  };

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

  const handleClickRestartButton = function () {
    setGameStatus(STATUS.NOT_STARTED);
    setDirection("y");
    setResult("");
    P1.reset();
    P2.reset();
    battleship.reset(P1, P2);
  };

  const nextShipLengthP1 = P1.gameboard.getShipLength();
  const nextShipLengthP2 = P2.gameboard.getShipLength();

  useEffect(() => {
    if (computerMode && !nextShipLengthP1) {
      setGameStatus(STATUS.READY_TO_PLAY);
    }
  }, [computerMode, nextShipLengthP1]);

  const updateOnAttack = function (x, y) {
    if (computerMode) {
      battleship.P2.gameboard.receiveAttack(x, y);
      if (battleship.P2.gameboard.isAllShipSunk()) {
        setGameStatus(STATUS.GAME_FINISHED);
        setResult("p1-win");
        updateCounter();
      } else {
        const getHit = battleship.P2.doAIMove(battleship.P1.gameboard);
        battleship.P1.gameboard.receiveAttack(getHit[0], getHit[1]);
        updateCounter();
        if (battleship.P1.gameboard.isAllShipSunk()) {
          setGameStatus(STATUS.GAME_FINISHED);
          setResult("p2-win");
          updateCounter();
        }
      }
    } else if (gameStatus === STATUS.ON_GAME_P1) {
      battleship.P2.gameboard.receiveAttack(x, y);
      if (battleship.P2.gameboard.isAllShipSunk()) {
        setGameStatus(STATUS.GAME_FINISHED);
        setResult("p1-win");
        updateCounter();
      } else {
        setMoved(true);
      }
    } else if (gameStatus === STATUS.ON_GAME_P2) {
      battleship.P1.gameboard.receiveAttack(x, y);
      if (battleship.P1.gameboard.isAllShipSunk()) {
        setGameStatus(STATUS.GAME_FINISHED);
        setResult("p2-win");
        updateCounter();
      } else {
        setMoved(true);
      }
    }
  };

  return (
    <div className="App">
      <div className="flex-col-center">
        {/* title stays there always */}
        <div id="title" className="font-xxLarge">
          Platypus Research Game
        </div>

        <div id="players-info-field" className="">
          {gameStatus === STATUS.NOT_STARTED ||
          gameStatus === STATUS.READY_TO_PLAY ? (
            <SetupPlayers player={P1} handleChangeName={handleChangeName} />
          ) : (
            //after the game started, name shows up
            <div className="name font-large">{P1.name}</div>
          )}

          <div className="vs font-large">vs</div>

          {gameStatus === STATUS.NOT_STARTED ||
          gameStatus === STATUS.READY_TO_PLAY ? (
            !computerMode ? (
              <>
                <SetupPlayers player={P2} handleChangeName={handleChangeName} />
                <SwitchAi
                  computerMode={computerMode}
                  handleChangeComputerMode={handleChangeComputerMode}
                />
              </>
            ) : (
              <>
                <div className="name font-large">(Computer)</div>
                <SwitchAi
                  computerMode={computerMode}
                  handleChangeComputerMode={handleChangeComputerMode}
                />
              </>
            )
          ) : (
            <div className="name font-large">{P2.name}</div>
          )}
        </div>
      </div>

      <div>
        {/* when the game is "not-started", show below short Introduction. */}

        {gameStatus === STATUS.NOT_STARTED ? (
          <Introduction player1={P1} computerMode={computerMode} />
        ) : null}

        {isAboutLabOpen === true ? (
          <AboutLab handleisAboutLabOpen={handleisAboutLabOpen} />
        ) : null}

        {/* when all the pieces are in place, the Start button appears. */}

        {gameStatus === STATUS.READY_TO_PLAY && computerMode ? (
          <div className="height80 margin20">
            <button
              id="start-btn"
              className="font-xLarge"
              onClick={() => {
                battleship.P2.placeShipCoordinatesForAI();
                setGameStatus(STATUS.ON_GAME_P1);
              }}
            >
              Start
            </button>
          </div>
        ) : null}

        {/* flex-justify-center class can be deleted maybe */}
        <div id="gameboard-field" className="flex-justify-center">
          {/* This is the side bar. Hide it when it's "on-game"/"game-finished" status with Computer mode */}
          {(gameStatus === STATUS.ON_GAME_P1 && computerMode) ||
          (gameStatus === STATUS.GAME_FINISHED && computerMode) ? (
            <></>
          ) : (
            <div className="flex-justify-center">
              <div id="sidebar">
                <div className="space-between-col">
                  <IconButton aria-label="rotate">
                    <div
                      id="rotate"
                      className="flex-justify-center margin20 cursor"
                    >
                      <img
                        src={IMAGE.PLATYPUS_BUTTON}
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

                  {/* SETUP_P1 */}
                  {(gameStatus === STATUS.SETUP_P1 &&
                    nextShipLengthP1 === undefined) ||
                  (gameStatus === STATUS.ON_GAME_P1 && moved) ? (
                    <button
                      id="twoPlayer-mode-p1-ready-btn"
                      className="font-normal"
                      onClick={() => {
                        if (gameStatus === STATUS.ON_GAME_P1) {
                          setGameStatus(STATUS.ON_GAME_SWITCH_P2);
                        } else {
                          setGameStatus(STATUS.SETUP_P2);
                        }
                        setMoved(false);
                        // SetCurrentPlayer(P2);
                      }}
                    >
                      Click here and pass the device to {P2.name}
                    </button>
                  ) : null}

                  {/* "twoPlayer-mode-P1-ready-P2-not-ready" */}

                  {(gameStatus === STATUS.SETUP_P2 &&
                    nextShipLengthP2 === undefined) ||
                  (gameStatus === STATUS.ON_GAME_P2 && moved) ? (
                    <button
                      id="twoPlayer-mode-p2-ready-btn"
                      className="font-normal"
                      onClick={() => {
                        setGameStatus(STATUS.ON_GAME_SWITCH_P1);
                        setMoved(false);
                        // SetCurrentPlayer(P1);
                      }}
                    >
                      Click here and pass the device to {P1.name}
                    </button>
                  ) : null}

                  <div className="cursor" onClick={handleisAboutLabOpen}>
                    About the Lab
                    <span className="material-symbols-outlined lab-icon">
                      science
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* This is the board area. Depends on the status and game mode, it changes what to show*/}

          {gameStatus === STATUS.ON_GAME_SWITCH_P1 ? (
            <div>
              <div>
                This is the screen when you switch the device from P2 to P1
              </div>
              <button
                id="twoPlayer-mode-p1-btn"
                className="font-normal"
                onClick={() => {
                  setGameStatus(STATUS.ON_GAME_P1);
                  // SetCurrentPlayer(P1);
                }}
              >
                {P1.name}, click here to make a move
              </button>
            </div>
          ) : null}

          {gameStatus === STATUS.ON_GAME_SWITCH_P2 ? (
            <div>
              <div>
                This is the screen when you switch the device from P1 to P2
              </div>
              <button
                id="twoPlayer-mode-p1-btn"
                className="font-normal"
                onClick={() => {
                  setGameStatus(STATUS.ON_GAME_P2);
                  // SetCurrentPlayer(P1);
                }}
              >
                {P2.name}, click here to make a move
              </button>
            </div>
          ) : null}

          {/* When it's not "on-game" or "game-finished" status and it's a computer mode, it shows preparation board for P1 */}
          {gameStatus !== STATUS.ON_GAME_P1 &&
          computerMode &&
          gameStatus !== STATUS.GAME_FINISHED &&
          computerMode ? (
            <SetupGameboard
              player={P1}
              direction={direction}
              updateCounter={updateCounter}
            />
          ) : null}

          {/* When it's NOT_STARTED status and it's 2 players mode, it shows a message for P1 */}
          {gameStatus === STATUS.NOT_STARTED && !computerMode ? (
            <div id="mask">
              This is a <b>2 players Mode</b>.{" "}
              <div>Now, {P1.name}, are you ready? </div>
              <div>
                <button
                  id="twoPlayer-mode-btn"
                  className="font-xLarge margin20"
                  onClick={() => {
                    setGameStatus(STATUS.SETUP_P1);
                    // SetCurrentPlayer(P1);
                  }}
                >
                  Yes! I'm ready
                </button>
                <div className="font-large">
                  Again, make sure your opponent won't see your screen while you
                  are playing.
                </div>
              </div>
            </div>
          ) : null}

          {/* When it's SETUP_P1 status, it shows a board for P1 to get ready */}
          {gameStatus === STATUS.SETUP_P1 ? (
            <SetupGameboard
              player={P1}
              direction={direction}
              updateCounter={updateCounter}
            />
          ) : null}

          {/* When it's SETUP_P2 status, it shows a board for P2 to get ready */}
          {gameStatus === STATUS.SETUP_P2 ? (
            <SetupGameboard
              player={P2}
              direction={direction}
              updateCounter={updateCounter}
            />
          ) : null}

          {/* When */}
          {gameStatus === STATUS.ON_GAME_P1 ||
          (gameStatus === STATUS.GAME_FINISHED && computerMode) ? (
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
                {gameStatus === STATUS.ON_GAME_P1 ||
                gameStatus === STATUS.ON_GAME_P2 ? (
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

          {gameStatus === STATUS.ON_GAME_P2 ? (
            <div>
              <div
                id="on-game-field"
                className="flex-justify-center"
                key="on-game-field"
              >
                <MyGameboard player={P2} />
                <OpponentGameboard
                  player={P1}
                  updateOnAttack={updateOnAttack}
                />
              </div>
              <div>
                {/* during the game, Restart button appears. */}
                {gameStatus === STATUS.ON_GAME_P1 ||
                gameStatus === STATUS.ON_GAME_P2 ? (
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

          {gameStatus === STATUS.GAME_FINISHED && !computerMode ? (
            <div>
              <div
                id="on-game-field"
                className="flex-justify-center"
                key="on-game-field"
              >
                <MyGameboard player={P1} />
                <MyGameboard player={P2} />
              </div>
              <div>
                {/* during the game, Restart button appears. */}
                {gameStatus === STATUS.ON_GAME_P1 ||
                gameStatus === STATUS.ON_GAME_P2 ? (
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
                  src={IMAGE.PLATYPUS_CAPTURED}
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
            computerMode ? (
              <div className="result">
                <div className="font-xLarge winner">{P2.name} Wins</div>
                <div>
                  <img
                    src={IMAGE.LOST_PLATYPUS}
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
            ) : (
              <div className="result">
                <div className="font-xLarge winner">{P2.name} Wins!!</div>
                <div>
                  <img
                    src={IMAGE.PLATYPUS_CAPTURED}
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
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
