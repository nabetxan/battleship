import IMAGE from "../Image/IMAGE";

function OpponentGameboard({ player, updateOnAttack }) {
  const opponentCurrentGameboard = player.gameboard.currentGameboard();
  return (
    <div>
      <div
        id="opponent-gameboard"
        className="flex-justify-center margin20 col"
        key="opponent-gameboard"
      >
        {opponentCurrentGameboard.map((row, y) => {
          return (
            <div className="row flex-justify-center" key={`p2-row${y}`}>
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
                      <div className="cell attacked" key={`p2${x}${y}`}>
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
                        src={IMAGE.PLATYPUS_FOOT}
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
  );
}

export default OpponentGameboard;
