import "./App.css";
import { useState } from "react";
import { Player } from "./Player";
import { BattleShip } from "./BattleShip";

const P1 = new Player("Perry", "platypus", false);
const P2 = new Player("Minochan", "monkey", true);
const battleship = new BattleShip(P1, P2);

function App() {
  const [counter, setCounter] = useState(0);

  const updateCounter = function () {
    setCounter(counter + 1);
  };

  const currentGBP1 = battleship.P1.gameboard.currentGameboard();

  return (
    <div className="App">
      <header className="App-header">
        <div className="name">{battleship.P1.name}</div>
        <div className="name">{battleship.P2.name}</div>

        <div id="gameboard">
          {currentGBP1.map((row, r) => {
            return (
              <div className="row">
                {row.map((cell, c) => {
                  if (cell.ship) {
                    return <div className="cell">🍕</div>;
                  } else {
                    return <div className="cell">🐒</div>;
                  }
                })}
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
