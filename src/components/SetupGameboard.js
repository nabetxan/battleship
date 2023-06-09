import { useState } from "react";

function SetupGameboard({ player, direction, updateCounter }) {
  const [currentCell, setCurrentCell] = useState([]);

  const currentGameboard = player.gameboard.currentGameboard();
  return (
    <div id="gameboard-preparation">
      {currentGameboard.map((row, y) => (
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
                  <div className="cell platypus-cell" key={`${x}${y}`}>
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
                    key={`prep${x}${y}`}
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
                  key={`prep${x}${y}`}
                  onClick={() => {
                    player.placeShip(x, y, direction);
                    updateCounter();
                  }}
                  onMouseEnter={() => {
                    const coordinatesToBeSet = player.placeShipCoordinates(
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
  );
}

export default SetupGameboard;
