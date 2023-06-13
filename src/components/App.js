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
import Result from "./Result";
import SwitchPlayerButton from "./SwitchPlayerButton";

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

  const handleGameStatusChange = (status) => {
    setGameStatus(status);
  };

  const handleMoved = (boolean) => {
    setMoved(boolean);
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
    // vs Computer
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
      // 2 Players Mode
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
        {/* title stays there always. If you click, the game restarts */}
        <div
          id="title"
          className="font-xxLarge cursor"
          onClick={handleClickRestartButton}
        >
          Platypus Research Game
        </div>

        {/* This is where Player names are displayed. You can choose vs Computer or 2 Player Mode */}

        <div id="players-info-field" className="">
          {gameStatus === STATUS.NOT_STARTED ||
          gameStatus === STATUS.READY_TO_PLAY ? (
            <SetupPlayers player={P1} handleChangeName={handleChangeName} />
          ) : (
            //after the game started, name shows up and cannot edit.
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

        <div>
          {/* when the game is "not-started", show below short Introduction. */}

          {gameStatus === STATUS.NOT_STARTED ? (
            <Introduction player1={P1} computerMode={computerMode} />
          ) : null}

          {/* when it's a Computer mode and P1 put all the pieces in place, the Start button appears. */}
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
        </div>

        <div id="side-bar-and-gameboard-field" className="flex-justify-center">
          <div className="flex-justify-center">
            {/* This is the side bar */}
            <div id="sidebar">
              <div className="space-between-col">
                {/* Show the rotate button  */}
                {gameStatus === STATUS.ON_GAME_P1 ||
                gameStatus === STATUS.ON_GAME_P2 ||
                gameStatus === STATUS.GAME_FINISHED ||
                gameStatus === STATUS.ON_GAME_SWITCH_P1 ||
                gameStatus === STATUS.ON_GAME_SWITCH_P2 ? (
                  <div></div>
                ) : (
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
                )}

                {/* When SETUP_P1 or SETUP_P2 completes, Button to switch appear at bottom left*/}

                {(gameStatus === STATUS.SETUP_P1 &&
                  nextShipLengthP1 === undefined) ||
                (gameStatus === STATUS.SETUP_P2 &&
                  nextShipLengthP2 === undefined) ? (
                  <SwitchPlayerButton
                    gameStatus={gameStatus}
                    STATUS={STATUS}
                    handleGameStatusChange={handleGameStatusChange}
                    handleMoved={handleMoved}
                    P1={P1}
                    P2={P2}
                    classNameValue="font-normal upper-left"
                  />
                ) : null}

                {/* About the lab button appears */}
                {gameStatus === STATUS.NOT_STARTED ? (
                  <div className="cursor" onClick={handleisAboutLabOpen}>
                    About the Lab
                    <span className="material-symbols-outlined lab-icon">
                      science
                    </span>
                  </div>
                ) : null}

                {/* When About Lab is clicked, long greetings appear */}
                {isAboutLabOpen === true ? (
                  <AboutLab handleisAboutLabOpen={handleisAboutLabOpen} />
                ) : null}
              </div>
            </div>
          </div>

          {/* This is the board area. Depends on the status and game mode, it changes what to show*/}
          <div className="flex-col-center">
            <div>
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
                        P1.reset();
                        P2.reset();
                        battleship.reset(P1, P2);
                      }}
                    >
                      Yes! I'm ready
                    </button>
                    <div className="font-large">
                      Again, make sure your opponent won't see your screen while
                      you are playing.
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

              {gameStatus === STATUS.ON_GAME_SWITCH_P1 ? (
                <div>
                  <div id="swimming-area">
                    <img
                      src={IMAGE.SWIMMING_PLATYPUS}
                      alt="swimming platypus"
                      id="swimming-platypus"
                    ></img>
                  </div>
                  <div>
                    Pass the device from {P2.name} to {P1.name}
                  </div>
                  <button
                    id="twoP-mode-p1-btn"
                    className="font-large margin20"
                    onClick={() => {
                      setGameStatus(STATUS.ON_GAME_P1);
                    }}
                  >
                    {P1.name}, click here to make a move
                  </button>
                </div>
              ) : null}

              {gameStatus === STATUS.ON_GAME_SWITCH_P2 ? (
                <div>
                  <div id="swimming-area">
                    <img
                      src={IMAGE.SWIMMING_PLATYPUS}
                      alt="swimming platypus"
                      id="swimming-platypus"
                    ></img>
                  </div>
                  <div>
                    Pass the device from {P1.name} to {P2.name}
                  </div>
                  <button
                    id="twoP-mode-p1-btn"
                    className="font-large margin20"
                    onClick={() => {
                      setGameStatus(STATUS.ON_GAME_P2);
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

              {/* When P1 is on game or P1 played computerMode*/}
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
                </div>
              ) : null}

              {/* When P2 is on game */}
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
                </div>
              ) : null}
            </div>

            {/* When 2 playes mode finishes, board of both players show up */}
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
              </div>
            ) : null}

            <div className="flex-justify-center spacearound">
              {/* during the game, Restart button appears. */}
              <div>
                {gameStatus === STATUS.ON_GAME_P1 ||
                gameStatus === STATUS.ON_GAME_P2 ? (
                  <button
                    id="restart-btn-on-game"
                    className="font-normal"
                    onClick={handleClickRestartButton}
                  >
                    Restart
                  </button>
                ) : null}
              </div>
              {/* When P1 or P2 Moved, Button to switch to the Switch view appear at upper left*/}

              {(gameStatus === STATUS.ON_GAME_P1 && moved) ||
              (gameStatus === STATUS.ON_GAME_P2 && moved) ? (
                <SwitchPlayerButton
                  gameStatus={gameStatus}
                  STATUS={STATUS}
                  handleGameStatusChange={handleGameStatusChange}
                  handleMoved={handleMoved}
                  P1={P1}
                  P2={P2}
                  classNameValue="font-normal bottom-left font-large"
                />
              ) : null}
            </div>
          </div>

          <div>
            {gameStatus === STATUS.GAME_FINISHED && result === "p1-win" ? (
              <Result
                result={result}
                player={P1}
                handleClickRestartButton={handleClickRestartButton}
                src={IMAGE.PLATYPUS_CAPTURED}
                className="win-result-image"
                alt="platypus captured"
              />
            ) : null}
            {gameStatus === STATUS.GAME_FINISHED &&
            result === "p2-win" &&
            !computerMode ? (
              <Result
                result={result}
                player={P2}
                handleClickRestartButton={handleClickRestartButton}
                src={IMAGE.PLATYPUS_CAPTURED}
                className="win-result-image"
                alt="platypus captured"
              />
            ) : null}
            {gameStatus === STATUS.GAME_FINISHED &&
            result === "p2-win" &&
            computerMode ? (
              <Result
                result={result}
                player={P2}
                handleClickRestartButton={handleClickRestartButton}
                src={IMAGE.LOST_PLATYPUS}
                className="lost-result-image"
                alt="platypus lost"
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
