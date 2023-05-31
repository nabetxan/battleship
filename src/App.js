import "./App.css";
import { useState } from "react";
import { Player } from "./Player";
import { BattleShip } from "./BattleShip";

const P1 = new Player("Perry", "platypus", false);
const P2 = new Player("Minochan", "monkey", true);
const battleship = new BattleShip(P1, P2);
P1.gameboard.receiveAttack(4, 6);
P1.gameboard.receiveAttack(0, 0);
P2.gameboard.receiveAttack(0, 0);
P2.gameboard.receiveAttack(1, 0);
P2.gameboard.receiveAttack(3, 0);
P2.gameboard.receiveAttack(4, 0);

function App() {
  const [counter, setCounter] = useState(0);

  const updateCounter = function () {
    setCounter(counter + 1);
  };

  const updateOnAttack = function (x, y) {
    battleship.P2.gameboard.receiveAttack(x, y);
    if (battleship.P2.gameboard.isAllShipSunk()) {
      updateCounter();
      console.log("You Win");
    } else {
      battleship.P2.doAIMove();
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
        <div id="gameboard-field">
          <div id="gameboard-p1">
            {currentGBP1.map((row, y) => {
              return (
                <div className="row">
                  {row.map((cell, x) => {
                    if (cell.ship && cell.attacked) {
                      return <div className="cell">👨🏿‍🦲</div>;
                    } else if (cell.ship && !cell.attacked) {
                      return <div className="cell">👨‍🦲</div>;
                    } else if (!cell.ship && cell.attacked) {
                      return <div className="cell">💨</div>;
                    } else {
                      return <div className="cell">🌱</div>;
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
                      return <div className="cell">👨🏿‍🦲</div>;
                    }

                    if (cell.ship && cell.attacked) {
                      return <div className="cell">👨‍🦲</div>;
                    } else if (!cell.ship && cell.attacked) {
                      return <div className="cell">💨</div>;
                    } else {
                      return (
                        <div
                          className="cell"
                          onClick={() => updateOnAttack(x, y)}
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
      </header>
    </div>
  );
}

export default App;
