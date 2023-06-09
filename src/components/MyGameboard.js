function MyGameboard({ player }) {
  const myCurrentGameboard = player.gameboard.currentGameboard();
  return (
    <div>
      <div
        id="my-gameboard"
        className="flex-justify-center margin20"
        key="my-gameboard"
      >
        {myCurrentGameboard.map((row, y) => {
          return (
            <div className="row flex-justify-center" key={`p1-row${y}`}>
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
                      <div className="cell attacked" key={`p1${x}${y}`}>
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
                      <div className="cell platypus-cell" key={`p1${x}${y}`}>
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
    </div>
  );
}

export default MyGameboard;
